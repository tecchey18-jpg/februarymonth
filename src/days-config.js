// ============================================
// FABULOUS FEBRUARY - CONFIGURATION
// ============================================

// Global pool of playful persuasive messages for the "Infinite Loop"
const DENIAL_POOL = [
    // Flirty & Playful
    "Playing hard to get? You know that just turns me on. 😏",
    "I can see that smirk. You want to click Yes. 😘",
    "You're testing my patience... and I kind of like it. 😈",
    "Is this your way of asking me to beg? Because I might. 🫦",
    "Denial looks good on you, but surrender would look better. 🔥",

    // Romantic & Intense
    "My heart is literally in your hands. Squeeze it gently? ❤️",
    "I'm not going anywhere. I'll wait for you forever. 🕰️",
    "Every 'No' just makes the 'Yes' sweeter. try me. 🍯",
    "You can run, but you can't hide from this chemistry. 🧪",
    "Look into my eyes and tell me you don't feel it. I dare you. 👁️",

    // Spicy & Lusty (Safe for Work but Suggestive)
    "Oh, you want me to work for it? I can do that. 🥵",
    "That button is just a tease. Just like you. 😉",
    "I promise the reward is worth it. Trust me. 🎁",
    "Stop resisting. Give in to the temptation. 🍎",
    "I know what you really want. It's not the 'No' button. 🤫",
    "You're making it hot in here with all this resistance. 🌡️",
    "Be a good girl/boy and click the right button. ⛓️",
    "I love it when you're stubborn. It's sexy. 💋",
    "Come on, let's stop fighting and start... celebrating. 🥂",
    "Your fingers are trembling. Just do it. 👉",

    // Persistent
    "I have infinite stamina. Try me. 🔋",
    "I'm not leaving until I get what I came for. (Your heart). 💘",
    "Error 404: Rejection not found in my dictionary. 🚫",
    "You're just delaying the inevitable pleasure. ✨",
    "One click. That's all it takes to make magic happen. 🪄"
];

// Pexels Video Map
// SHUFFLED CONFIGURATION:
// Feb 1-6: Anticipation/Prep (Old filler days)
// Feb 7-14: Valentine's Week (Shifted from 1-9)
// Feb 15-22: Anti-Valentine/Self (Old 15-22)
// Feb 23-28: Post-Valentine Wrap (Old 25-28 + fillers)

const DAYS_CONFIG = {
    // --- INTRO / WARM UP ---
    1: {
        name: "Self-Love Day", emoji: "💖", theme: "party",
        videoUrl: "https://videos.pexels.com/video-files/6393527/6393527-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/feb-01-self-love-day.mp4",
        rewardImage: "https://images.pexels.com/photos/3764568/pexels-photo-3764568.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "You are enough. Start the month loving YOU.",
        dialogue: { start: { text: "Before we love anyone else, we start here.", subtext: "Look in the mirror...", options: [{ text: "I love me! 💖", next: "acceptance" }, { text: "Not yet", next: "denial_loop" }] } }
    },
    2: {
        name: "Friendship Day", emoji: "👯", theme: "party",
        videoUrl: "https://videos.pexels.com/video-files/3252277/3252277-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/feb-02-friendship-day.mp4",
        rewardImage: "https://images.pexels.com/photos/1646953/pexels-photo-1646953.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Partners in crime.",
        dialogue: { start: { text: "Who has your back no matter what?", options: [{ text: "Besties forever 👯", next: "acceptance" }, { text: "Solo rider", next: "denial_loop" }] } }
    },
    3: {
        name: "Crush Day", emoji: "🦋", theme: "sweet",
        videoUrl: "https://videos.pexels.com/video-files/5532766/5532766-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/feb-03-crush-day.mp4",
        rewardImage: "https://images.pexels.com/photos/1374551/pexels-photo-1374551.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Butterflies everywhere.",
        dialogue: { start: { text: "I think I like you...", options: [{ text: "I like you too 🦋", next: "acceptance" }, { text: "Eww", next: "denial_loop" }] } }
    },
    4: {
        name: "Charm Day", emoji: "✨", theme: "sweet",
        videoUrl: "https://videos.pexels.com/video-files/3201448/3201448-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/feb-04-charm-day.mp4",
        rewardImage: "https://images.pexels.com/photos/2535905/pexels-photo-2535905.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "You are enchanting.",
        dialogue: { start: { text: "You have a sparkle today.", options: [{ text: "I know ✨", next: "acceptance" }, { text: "Whatever", next: "denial_loop" }] } }
    },
    5: {
        name: "Destiny Day", emoji: "🌠", theme: "dreamy",
        videoUrl: "https://videos.pexels.com/video-files/2646255/2646255-hd_1920_1080_30fps.mp4",
        localVideo: "assets/videos/feb-05-destiny-day.mp4",
        rewardImage: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Written in the stars.",
        dialogue: { start: { text: "It was always meant to be.", options: [{ text: "I believe 🌠", next: "acceptance" }, { text: "Coincidence", next: "denial_loop" }] } }
    },
    6: {
        name: "Anticipation Day", emoji: "🌃", theme: "dreamy",
        videoUrl: "https://videos.pexels.com/video-files/3123847/3123847-uhd_2560_1440_30fps.mp4",
        localVideo: "assets/videos/feb-06-anticipation-day.mp4",
        rewardImage: "https://images.pexels.com/photos/3312676/pexels-photo-3312676.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "The calm before the love storm.",
        dialogue: { start: { text: "Can't sleep. Too excited for tomorrow.", options: [{ text: "Me too! 🌃", next: "acceptance" }, { text: "Go to sleep", next: "denial_loop" }] } }
    },

    // --- VALENTINE WEEK (STRICT) ---
    7: {
        name: "Rose Day", emoji: "🌹", theme: "romantic",
        videoUrl: "https://videos.pexels.com/video-files/5533100/5533100-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/feb-07-rose-day.mp4",
        rewardImage: "https://images.pexels.com/photos/196666/pexels-photo-196666.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "You deserve a garden, but here is a single rose.",
        dialogue: { start: { text: "I brought you a rose. Will you accept it?", subtext: "Be honest with me...", options: [{ text: "Yes, I'd love to 💕", next: "acceptance" }, { text: "No thanks", next: "denial_loop" }] } }
    },
    8: {
        name: "Propose Day", emoji: "💍", theme: "passionate",
        videoUrl: "https://videos.pexels.com/video-files/5699623/5699623-uhd_2560_1440_30fps.mp4",
        localVideo: "assets/videos/feb-08-propose-day.mp4",
        rewardImage: "https://images.pexels.com/photos/265732/pexels-photo-265732.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "It’s not just a question. It’s a promise.",
        dialogue: { start: { text: "I have a question that might change everything...", subtext: "Heart racing... 💓", options: [{ text: "I'm listening 💍", next: "acceptance" }, { text: "I'm scared", next: "denial_loop" }] } }
    },
    9: {
        name: "Chocolate Day", emoji: "🍫", theme: "sweet",
        videoUrl: "https://videos.pexels.com/video-files/4109858/4109858-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/feb-09-chocolate-day.mp4",
        rewardImage: "https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Sweeter than any candy (but not as sweet as you).",
        dialogue: { start: { text: "Life is like a box of chocolates...", options: [{ text: "That was smooth... Yes! 🍫", next: "acceptance" }, { text: "Cheesy...", next: "denial_loop" }] } }
    },
    10: {
        name: "Teddy Day", emoji: "🧸", theme: "sweet",
        videoUrl: "https://videos.pexels.com/video-files/5459344/5459344-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/feb-10-teddy-day.mp4",
        rewardImage: "https://images.pexels.com/photos/708767/pexels-photo-708767.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Something to hug when I'm not there.",
        dialogue: { start: { text: "I found this guy looking for a home.", options: [{ text: "Aww yes! 🧸", next: "acceptance" }, { text: "I have enough", next: "denial_loop" }] } }
    },
    11: {
        name: "Promise Day", emoji: "🤝", theme: "emotional",
        videoUrl: "https://videos.pexels.com/video-files/3205799/3205799-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/feb-11-promise-day.mp4",
        rewardImage: "https://images.pexels.com/photos/888899/pexels-photo-888899.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Cross my heart.",
        dialogue: { start: { text: "I want to make a pact with you.", options: [{ text: "I promise too 🤝", next: "acceptance" }, { text: "Depends...", next: "denial_loop" }] } }
    },
    12: {
        name: "Hug Day", emoji: "🤗", theme: "emotional",
        videoUrl: "https://videos.pexels.com/video-files/4554865/4554865-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/feb-12-hug-day.mp4",
        rewardImage: "https://images.pexels.com/photos/1805505/pexels-photo-1805505.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Sending a virtual squeeze.",
        dialogue: { start: { text: "Open your arms. Incoming!", options: [{ text: "Catch me! 🤗", next: "acceptance" }, { text: "No hugs", next: "denial_loop" }] } }
    },
    13: {
        name: "Kiss Day", emoji: "💋", theme: "passionate",
        videoUrl: "https://videos.pexels.com/video-files/3202166/3202166-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/feb-13-kiss-day.mp4",
        rewardImage: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Mwah! 💋",
        dialogue: { start: { text: "Hypothetically... if I kissed you right now...", options: [{ text: "Do it 💋", next: "acceptance" }, { text: "Start over", next: "denial_loop" }] } }
    },
    14: {
        name: "Valentine's Day", emoji: "❤️", theme: "passionate",
        videoUrl: "https://videos.pexels.com/video-files/855787/855787-hd_1920_1080_25fps.mp4",
        localVideo: "assets/videos/feb-14-valentines-day.mp4",
        rewardImage: "https://images.pexels.com/photos/326612/pexels-photo-326612.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Happy Valentine's Day! You are my everything.",
        dialogue: { start: { text: "It's today. The day I tell you...", options: [{ text: "Be my Valentine ❤️", next: "acceptance" }, { text: "Tell me what?", next: "denial_loop" }] } }
    },

    // --- ANTI-VALENTINE WEEK (STRICT) ---
    15: {
        name: "Slap Day", emoji: "👋", theme: "fierce",
        videoUrl: "https://videos.pexels.com/video-files/4492728/4492728-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/feb-15-slap-day.mp4",
        rewardImage: "https://images.pexels.com/photos/6320015/pexels-photo-6320015.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Wake up call!",
        dialogue: { start: { text: "Sometimes we need a little shock to the system.", options: [{ text: "I'm awake! 👋", next: "acceptance" }, { text: "Ouch", next: "denial_loop" }] } }
    },
    16: {
        name: "Kick Day", emoji: "👟", theme: "fierce",
        videoUrl: "https://videos.pexels.com/video-files/4904146/4904146-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/feb-16-kick-day.mp4",
        rewardImage: "https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Kicking bad vibes away.",
        dialogue: { start: { text: "Bad vibes? Not here.", options: [{ text: "Kick 'em out! 👟", next: "acceptance" }, { text: "I like bad vibes", next: "denial_loop" }] } }
    },
    17: {
        name: "Perfume Day", emoji: "🌸", theme: "party",
        videoUrl: "https://videos.pexels.com/video-files/2711124/2711124-uhd_3840_2160_25fps.mp4",
        localVideo: "assets/videos/feb-17-perfume-day.mp4",
        rewardImage: "https://images.pexels.com/photos/2033997/pexels-photo-2033997.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Scent of success.",
        dialogue: { start: { text: "Smelling good is feeling good.", options: [{ text: "Fresh! 🌸", next: "acceptance" }, { text: "No thanks", next: "denial_loop" }] } }
    },
    18: {
        name: "Flirting Day", emoji: "😏", theme: "sweet",
        videoUrl: "https://videos.pexels.com/video-files/4933931/4933931-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/feb-18-flirting-day.mp4",
        rewardImage: "https://images.pexels.com/photos/2535905/pexels-photo-2535905.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Did it hurt? When you fell from heaven? 😉",
        dialogue: { start: { text: "Is it hot in here, or is it just you?", options: [{ text: "Oh stop it 😏", next: "acceptance" }, { text: "Old line...", next: "denial_loop" }] } }
    },
    19: {
        name: "Confession Day", emoji: "�", theme: "romantic",
        videoUrl: "https://videos.pexels.com/video-files/4057313/4057313-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/feb-19-confession-day.mp4",
        rewardImage: "https://images.pexels.com/photos/785265/pexels-photo-785265.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Truth set me free.",
        dialogue: { start: { text: "I have a secret...", options: [{ text: "Tell me �", next: "acceptance" }, { text: "Keep it", next: "denial_loop" }] } }
    },
    20: {
        name: "Missing Day", emoji: "�", theme: "nostalgic",
        videoUrl: "https://videos.pexels.com/video-files/5533100/5533100-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/feb-20-missing-day.mp4",
        rewardImage: "https://images.pexels.com/photos/2253835/pexels-photo-2253835.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Wishing you were here.",
        dialogue: { start: { text: "Space feels empty without you.", options: [{ text: "I'm coming! �", next: "acceptance" }, { text: "Stay there", next: "denial_loop" }] } }
    },
    21: {
        name: "Breakup Day", emoji: "�", theme: "sad",
        videoUrl: "https://videos.pexels.com/video-files/5409160/5409160-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/feb-21-breakup-day.mp4",
        rewardImage: "https://images.pexels.com/photos/1003816/pexels-photo-1003816.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "It's not you, it's... negativity.",
        dialogue: { start: { text: "Wait... are we breaking up with NEGATIVITY today?", options: [{ text: "Yes, goodbye gloom! �", next: "acceptance" }, { text: "I'm sad", next: "denial_loop" }] } }
    },

    // --- WRAP UP / HEALING ---
    22: {
        name: "Single's Day", emoji: "🥂", theme: "party",
        videoUrl: "https://videos.pexels.com/video-files/3163534/3163534-uhd_3840_2160_30fps.mp4",
        localVideo: "assets/videos/feb-22-singles-day.mp4",
        rewardImage: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Cheers to freedom!",
        dialogue: { start: { text: "Who needs drama when you have freedom?", options: [{ text: "Cheers! 🥂", next: "acceptance" }, { text: "Lonely...", next: "denial_loop" }] } }
    },
    23: {
        name: "Healing Day", emoji: "🕊️", theme: "fresh",
        videoUrl: "https://videos.pexels.com/video-files/4763326/4763326-uhd_2560_1440_30fps.mp4",
        localVideo: "assets/videos/feb-23-healing-day.mp4",
        rewardImage: "https://images.pexels.com/photos/3354336/pexels-photo-3354336.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Peace at last.",
        dialogue: { start: { text: "Time to heal.", options: [{ text: "Breathe in 🕊️", next: "acceptance" }, { text: "Nope", next: "denial_loop" }] } }
    },
    24: {
        name: "Chaos Love Day", emoji: "🔥", theme: "passionate",
        videoUrl: "https://videos.pexels.com/video-files/2956214/2956214-hd_1920_1080_24fps.mp4",
        localVideo: "assets/videos/feb-24-chaos-love-day.mp4",
        rewardImage: "https://images.pexels.com/photos/2228580/pexels-photo-2228580.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Beautiful disaster.",
        dialogue: { start: { text: "We're trouble together.", options: [{ text: "Let's burn 🔥", next: "acceptance" }, { text: "Too risky", next: "denial_loop" }] } }
    },
    25: {
        name: "Eternal Love Day", emoji: "♾️", theme: "romantic",
        videoUrl: "https://videos.pexels.com/video-files/3205799/3205799-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/feb-25-eternal-love-day.mp4",
        rewardImage: "https://images.pexels.com/photos/6393527/pexels-photo-6393527.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Forever and always.",
        dialogue: { start: { text: "Not just now. Forever.", options: [{ text: "Forever ♾️", next: "acceptance" }, { text: "Too long", next: "denial_loop" }] } }
    },
    26: {
        name: "Self-Date Day", emoji: "🌙", theme: "romantic",
        videoUrl: "https://videos.pexels.com/video-files/5630654/5630654-uhd_2560_1440_24fps.mp4",
        localVideo: "assets/videos/feb-26-self-date-day.mp4",
        rewardImage: "https://images.pexels.com/photos/626154/pexels-photo-626154.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Defining my own romance.",
        dialogue: { start: { text: "Taking myself out tonight.", options: [{ text: "You go! 🌙", next: "acceptance" }, { text: "Stay home", next: "denial_loop" }] } }
    },
    27: {
        name: "New Beginnings", emoji: "🌅", theme: "fresh",
        videoUrl: "https://videos.pexels.com/video-files/856860/856860-hd_1920_1080_30fps.mp4",
        localVideo: "assets/videos/feb-27-new-beginnings.mp4",
        rewardImage: "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Our story continues.",
        dialogue: { start: { text: "February is ending. We are just starting.", options: [{ text: "Let's go 🌅", next: "acceptance" }, { text: "I'm staying", next: "denial_loop" }] } }
    },
    28: {
        name: "Season Finale", emoji: "🎬", theme: "passionate",
        videoUrl: "https://videos.pexels.com/video-files/3201448/3201448-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/day-28.mp4", // Reuse 28 or 14? Let's use 28 video here or 14. 14 was used in Day 4. Let's use Day 14 video.
        // Wait, I assigned Day 14 video to Day 4 (Charm).
        // I should check if I have a spare.
        // I have Day 28 assigned to Day 27.
        // Where did I put Day 14? -> Day 4.
        // What about Day 28? -> Day 27.
        // I need a video for Day 28 "Finale".
        // I used Day 8 for Day 6.
        // I will re-use Day 9 (Valentine) or just keep Day 28.
        // Let's use Day 14 video again? No, better not duplicate if possible.
        // I have video files: 1-28.
        // 1->7, 2->8, 3->9, 4->10, 5->11, 6->12, 7->13, 8->6, 9->14, 10->1, 11->2, 12->18, 13->26, 14->4, 15->15, 16->16, 17->21, 18->?, 19->20, 20->19, 21->23, 22->22, 23->17, 24->3, 25->24, 26->5, 27->25, 28->27.
        // Spare videos: 18.
        // I will use Day 18 video for Day 28 Finale.
        // (Day 18 was Patch Up). Fits Finale? "Better Together". Yes.
        localVideo: "assets/videos/feb-28-season-finale.mp4",
        rewardImage: "https://images.pexels.com/photos/2526935/pexels-photo-2526935.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "To be continued...",
        dialogue: { start: { text: "That's a wrap on Feb! Ready for next month?", options: [{ text: "Yes! 🎬", next: "acceptance" }, { text: "Cancel show", next: "denial_loop" }] } }
    }
};

if (typeof module !== 'undefined') {
    module.exports = { DAYS_CONFIG, DENIAL_POOL };
}
