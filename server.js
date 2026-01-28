// ============================================
// FEBRUARY CELEBRATION - AI-POWERED SERVER
// With Rate Limit Handling & Smart Fallbacks
// ============================================

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const OpenAI = require('openai');
const path = require('path');

const app = express();

// Enable gzip compression for faster loading
app.use(compression());

app.use(cors());
app.use(express.json());

// Serve static files with caching headers
app.use(express.static('.', {
    maxAge: '1h',
    setHeaders: (res, path) => {
        // Cache CSS and JS for longer
        if (path.endsWith('.css') || path.endsWith('.js')) {
            res.setHeader('Cache-Control', 'public, max-age=3600');
        }
        // Cache videos even longer
        if (path.endsWith('.mp4')) {
            res.setHeader('Cache-Control', 'public, max-age=86400');
        }
    }
}));

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Cache for AI responses
const responseCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Rate limiting tracker
let lastApiCall = 0;
const MIN_API_INTERVAL = 3000; // 3 seconds between calls (safe for free tier)

// Pre-generated fallback dialogues by intensity level
const FALLBACK_DENIALS = {
    1: [
        "Come on, just one little yes? I promise to behave... mostly 😘",
        "You're playing hard to get, and I love it 💕",
        "My heart skips a beat every time you make me try harder 🦋",
        "Is that a no? How about now... *puppy eyes* 🥺",
        "You can't resist this forever, trust me ✨"
    ],
    2: [
        "Every 'no' just makes the 'yes' sweeter... I'm patient 💋",
        "You're testing my devotion, and I'm passing with flying colors 🔥",
        "I see that smile hiding behind your refusal... 😏",
        "The tension is building, and I'm here for it 🌹",
        "Playing hard to get only makes me want you more 💕"
    ],
    3: [
        "My pulse races every time you say no... it's intoxicating 🔥",
        "You're driving me wild with those denials... in the best way 💋",
        "I can feel the chemistry even through your resistance 😈",
        "Each refusal only fuels my desire for that yes 💕",
        "The chase is making my heart pound... don't stop 🌶️"
    ],
    4: [
        "My body aches for your acceptance... say yes 🔥💋",
        "The anticipation is torture in the most delicious way 😈",
        "I'm burning up just thinking about when you finally give in 💕",
        "Every fiber of my being craves your surrender 🌶️",
        "You're awakening something primal in me... 💋🔥"
    ],
    5: [
        "I'm completely undone by your teasing... claim me 🔥😈",
        "My desire for you is beyond words now... just say yes 💋",
        "I'll do anything... absolutely anything for that yes 🌶️💕",
        "You own me completely... now take what's yours 😈🔥",
        "I surrender... but only if you accept me 💋🌹"
    ]
};

const FALLBACK_REWARDS = {
    easy: [
        "Finally! My heart is yours completely 💕",
        "Yes! This is everything I've been dreaming of 🥰",
        "You made my whole year in that single moment ✨"
    ],
    medium: [
        "The wait made this moment so much sweeter 💋",
        "You drove me crazy, but it was worth every second 🔥",
        "That yes hit different after all those no's 😏💕"
    ],
    hard: [
        "You absolute tease! But now you're finally mine 😈💋",
        "I've never wanted anyone more than right now 🔥🔥",
        "The chase was thrilling, but this... this is everything 💕🌶️"
    ],
    extreme: [
        "You broke me down and built me back up with that yes 🔥😈💋",
        "I'm trembling... you have no idea what you do to me 💕🌶️",
        "Worth. Every. Single. Denial. Now come here 😈🔥💋"
    ]
};

// Day themes for context
const DAY_THEMES = {
    1: { name: "Self-Love Day", context: "self-appreciation, self-care, self-desire", emoji: "💖" },
    2: { name: "Friendship Day", context: "close friendship turning into something more", emoji: "👯" },
    3: { name: "Crush Day", context: "butterflies, nervous flirting, secret desires", emoji: "🦋" },
    4: { name: "Charm Day", context: "enchanting, mesmerizing, irresistible attraction", emoji: "✨" },
    5: { name: "Destiny Day", context: "fated lovers, cosmic connection, meant to be together", emoji: "🌠" },
    6: { name: "Anticipation Day", context: "building tension, the night before, can't wait", emoji: "🌃" },
    7: { name: "Rose Day", context: "romantic gestures, giving roses, declaration of desire", emoji: "🌹" },
    8: { name: "Propose Day", context: "passionate proposal, commitment, intense devotion", emoji: "💍" },
    9: { name: "Chocolate Day", context: "sweet indulgence, melting chocolate, sensual treats", emoji: "🍫" },
    10: { name: "Teddy Day", context: "cuddling, warmth, soft touches, comfort and intimacy", emoji: "🧸" },
    11: { name: "Promise Day", context: "deep promises, unbreakable bonds, devoted whispers", emoji: "🤝" },
    12: { name: "Hug Day", context: "tight embraces, bodies pressed together, warmth", emoji: "🤗" },
    13: { name: "Kiss Day", context: "passionate kisses, lips meeting, breathless moments", emoji: "💋" },
    14: { name: "Valentine's Day", context: "ultimate love, peak romance, complete surrender", emoji: "❤️" },
    15: { name: "Slap Day", context: "playful punishment, feisty banter, love-hate tension", emoji: "👋" },
    16: { name: "Kick Day", context: "kicking out inhibitions, breaking free, wild energy", emoji: "👟" },
    17: { name: "Perfume Day", context: "intoxicating scents, attraction, seduction", emoji: "🌸" },
    18: { name: "Flirting Day", context: "shameless flirting, pickup lines, playful seduction", emoji: "😏" },
    19: { name: "Confession Day", context: "revealing secrets, hidden desires, truth or dare", emoji: "📱" },
    20: { name: "Missing Day", context: "longing, yearning, desperate to be together", emoji: "💭" },
    21: { name: "Breakup Day", context: "breaking up with loneliness, choosing passion", emoji: "💔" },
    22: { name: "Single's Day", context: "self-indulgence, freedom, treating yourself", emoji: "🥂" },
    23: { name: "Healing Day", context: "healing touch, tender care, emotional intimacy", emoji: "🕊️" },
    24: { name: "Chaos Love Day", context: "wild passion, messy love, uncontrollable desire", emoji: "🔥" },
    25: { name: "Eternal Love Day", context: "forever yours, infinite passion, timeless desire", emoji: "♾️" },
    26: { name: "Self-Date Day", context: "self-romance, personal pleasure, self-discovery", emoji: "🌙" },
    27: { name: "New Beginnings", context: "fresh start, new adventures together, possibilities", emoji: "🌅" },
    28: { name: "Season Finale", context: "grand finale, ultimate climax, memorable ending", emoji: "🎬" }
};

// Intensity levels based on denial count
const INTENSITY_LEVELS = [
    { level: 1, description: "sweet and flirty", style: "playful teasing with subtle hints" },
    { level: 2, description: "romantic and suggestive", style: "more forward, building tension" },
    { level: 3, description: "passionate and bold", style: "direct desire, heated language" },
    { level: 4, description: "intensely seductive", style: "very forward, burning passion" },
    { level: 5, description: "irresistibly kinky", style: "maximum heat, no holding back, dominant/submissive undertones" }
];

// Helper: Get random from array
function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Helper: Check if we can make an API call
function canMakeApiCall() {
    const now = Date.now();
    if (now - lastApiCall < MIN_API_INTERVAL) {
        return false;
    }
    lastApiCall = now;
    return true;
}

// Helper: Get cached or fallback
function getCachedOrFallback(cacheKey, fallbackFn) {
    const cached = responseCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.value;
    }
    return fallbackFn();
}

// Generate denial dialogue
app.post('/api/dialogue/denial', async (req, res) => {
    const { day, denialCount, sessionId } = req.body;
    const dayTheme = DAY_THEMES[day] || DAY_THEMES[1];
    const intensityIndex = Math.min(denialCount, 4);
    const intensity = INTENSITY_LEVELS[intensityIndex];

    // Create cache key
    const cacheKey = `denial_${day}_${intensityIndex}_${Math.floor(Date.now() / 60000)}`; // Changes every minute

    // Check cache first
    const cached = responseCache.get(cacheKey);
    if (cached) {
        console.log('Using cached denial dialogue');
        return res.json({
            dialogue: cached,
            intensity: intensity.level,
            dayName: dayTheme.name,
            source: 'cache'
        });
    }

    // Check if we can make API call
    if (!canMakeApiCall()) {
        console.log('Rate limited, using fallback');
        const fallback = getRandom(FALLBACK_DENIALS[intensity.level] || FALLBACK_DENIALS[1]);
        return res.json({
            dialogue: fallback,
            intensity: intensity.level,
            dayName: dayTheme.name,
            source: 'fallback'
        });
    }

    try {
        const prompt = `You are a romantic/seductive AI generating dialogue for a Valentine's themed game.

Context: It's ${dayTheme.name} ${dayTheme.emoji}. Theme: ${dayTheme.context}.
The player just clicked "No" for the ${denialCount + 1}th time.

Intensity Level: ${intensity.level}/5 - ${intensity.description}
Style: ${intensity.style}

Generate a UNIQUE persuasive response that:
1. Is ${intensity.description} in tone
2. References the ${dayTheme.name} theme naturally
3. Makes the player want to click "Yes"
4. Gets progressively more ${intensity.level >= 3 ? 'passionate, lusty, and suggestive' : 'flirty and romantic'}
5. Is between 1-2 sentences
6. Ends with an emoji

Respond with ONLY the dialogue line, nothing else.`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 100,
            temperature: 0.9
        });

        const dialogue = completion.choices[0].message.content.trim();
        responseCache.set(cacheKey, dialogue);

        res.json({
            dialogue,
            intensity: intensity.level,
            dayName: dayTheme.name,
            source: 'ai'
        });
    } catch (error) {
        console.error('OpenAI Error:', error.message);
        // Fallback on any error
        const fallback = getRandom(FALLBACK_DENIALS[intensity.level] || FALLBACK_DENIALS[1]);
        res.json({
            dialogue: fallback,
            intensity: intensity.level,
            dayName: dayTheme.name,
            source: 'fallback'
        });
    }
});

// Generate initial dialogue for a day
app.post('/api/dialogue/initial', async (req, res) => {
    const { day } = req.body;
    const dayTheme = DAY_THEMES[day] || DAY_THEMES[1];
    const cacheKey = `initial_${day}`;

    // Check cache first
    const cached = responseCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        console.log('Using cached initial dialogue');
        return res.json(cached.value);
    }

    // Check rate limit
    if (!canMakeApiCall()) {
        console.log('Rate limited, using fallback for initial');
        return res.json({
            text: `It's ${dayTheme.name}... and I have something special for you ${dayTheme.emoji}`,
            subtext: "Will you accept?",
            yesOption: "Yes please! 💕",
            noOption: "Not yet..."
        });
    }

    try {
        const prompt = `You are a romantic/seductive AI generating the opening dialogue for a Valentine's themed game.

Context: It's ${dayTheme.name} ${dayTheme.emoji}. Theme: ${dayTheme.context}.

Generate an opening line that:
1. Sets up a romantic/flirty scenario for ${dayTheme.name}
2. Is playful and intriguing
3. Makes the player curious to respond
4. Is 1-2 sentences max
5. Ends with an appropriate emoji

Also generate:
- A short subtext (optional mood/feeling, 3-5 words)
- Two response options: one "Yes" option and one "No" option (both should be short, 2-4 words with emoji)

Respond in this exact JSON format:
{
  "text": "main dialogue here",
  "subtext": "mood text here",
  "yesOption": "Yes response 💕",
  "noOption": "No response"
}`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 200,
            temperature: 0.8
        });

        const response = JSON.parse(completion.choices[0].message.content.trim());
        responseCache.set(cacheKey, { value: response, timestamp: Date.now() });
        res.json(response);
    } catch (error) {
        console.error('OpenAI Error:', error.message);
        res.json({
            text: `It's ${dayTheme.name}... and I have something special for you ${dayTheme.emoji}`,
            subtext: "Are you ready?",
            yesOption: "Yes! 💕",
            noOption: "Not yet"
        });
    }
});

// Generate reward message
app.post('/api/dialogue/reward', async (req, res) => {
    const { day, denialCount } = req.body;
    const dayTheme = DAY_THEMES[day] || DAY_THEMES[1];
    const spiceLevel = Math.min(denialCount + 1, 5);

    // Determine difficulty category
    let category = 'easy';
    if (denialCount >= 8) category = 'extreme';
    else if (denialCount >= 5) category = 'hard';
    else if (denialCount >= 2) category = 'medium';

    const cacheKey = `reward_${day}_${category}`;

    // Check cache
    const cached = responseCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        console.log('Using cached reward');
        return res.json({ message: cached.value, spiceLevel, source: 'cache' });
    }

    // Check rate limit
    if (!canMakeApiCall()) {
        console.log('Rate limited, using fallback reward');
        const fallback = getRandom(FALLBACK_REWARDS[category]);
        return res.json({ message: fallback, spiceLevel, source: 'fallback' });
    }

    try {
        const prompt = `You are a romantic/seductive AI generating a reward message for a Valentine's themed game.

Context: It's ${dayTheme.name} ${dayTheme.emoji}. Theme: ${dayTheme.context}.
The player finally said "Yes" after ${denialCount} denials!

Spice Level: ${spiceLevel}/5 (${spiceLevel >= 4 ? 'very passionate and suggestive' : spiceLevel >= 2 ? 'romantic and warm' : 'sweet and appreciative'})

Generate a reward message that:
1. Celebrates their "Yes" with ${spiceLevel >= 3 ? 'passionate, lusty' : 'romantic, sweet'} energy
2. References ${dayTheme.name} theme
3. ${denialCount > 0 ? `Playfully acknowledges they made you "work for it" (${denialCount} denials)` : 'Thanks them for saying yes immediately'}
4. Is 1-2 sentences
5. Ends with fitting emoji(s)

Respond with ONLY the reward message, nothing else.`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 100,
            temperature: 0.9
        });

        const message = completion.choices[0].message.content.trim();
        responseCache.set(cacheKey, { value: message, timestamp: Date.now() });
        res.json({ message, spiceLevel, source: 'ai' });
    } catch (error) {
        console.error('OpenAI Error:', error.message);
        const fallback = getRandom(FALLBACK_REWARDS[category]);
        res.json({ message: fallback, spiceLevel, source: 'fallback' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', cacheSize: responseCache.size });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🔥 February Celebration Server running on http://localhost:${PORT}`);
    console.log(`💕 AI-powered dialogues ready with smart fallbacks!`);
    console.log(`⚡ Rate limit protection: ${MIN_API_INTERVAL}ms between API calls`);
});
