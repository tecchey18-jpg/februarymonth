// ============================================
// FEBRUARY CELEBRATION - MAIN APP
// AI-Powered Playful Persuasion Game Engine v3.0
// ============================================

class FebruaryApp {
    constructor() {
        this.currentDay = this.getCurrentDay();
        this.currentDialogueNode = 'start';
        this.dayConfig = null;
        this.calendarOpen = false;

        // AI Tracking
        this.denialCount = 0;
        this.sessionId = this.generateSessionId();
        this.isLoadingAI = false;
        this.apiBase = 'http://localhost:3000';

        this.init();
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    getCurrentDay() {
        const now = new Date();
        const month = now.getMonth() + 1; // 0-indexed
        const day = now.getDate();

        // If February, use actual day; otherwise default to day 1
        if (month === 2 && day >= 1 && day <= 28) {
            return day;
        }
        return 1;
    }

    init() {
        // Access globals from days-config.js
        this.config = typeof DAYS_CONFIG !== 'undefined' ? DAYS_CONFIG : {};
        this.denialPool = typeof DENIAL_POOL !== 'undefined' ? DENIAL_POOL : ["Please? 🥺"];

        // Check if we need to show landing page (If not Feb, or forced for demo)
        const isFeb = this.isFebruary();

        this.setupEventListeners(); // Always setup listeners so nav works

        if (!isFeb) {
            this.initLandingPage();
        } else {
            document.getElementById('landing-page').style.display = 'none';
            this.loadDay(this.currentDay);
            this.updateNavDate();
        }
    }

    isFebruary() {
        // Strict check: Only return true if actual month is February
        const now = new Date();
        return now.getMonth() === 1; // 0-indexed (Jan=0, Feb=1)
    }

    initLandingPage() {
        const landing = document.getElementById('landing-page');
        const app = document.getElementById('app');
        const enterBtn = document.getElementById('landing-enter-btn');
        const realDateEl = document.getElementById('landing-date-real');
        const febPreviewEl = document.getElementById('landing-feb-preview');
        const holidayRow = document.getElementById('landing-holiday-row');
        const holidayNameEl = document.getElementById('landing-holiday-name');

        if (!landing || !enterBtn) return;

        // 1. Show Landing, Hide App
        landing.style.display = 'flex';
        app.style.display = 'none';

        // 2. Set Real Date
        const now = new Date();
        const options = { month: 'long', day: 'numeric' };
        realDateEl.textContent = now.toLocaleDateString('en-US', options);

        // 3. Calculate "February Equivalent" Preview
        // Even if it's Jan 24, we show Feb 24 (Crush Day)
        let previewDay = now.getDate();
        if (previewDay > 28) previewDay = 28; // Cap at 28
        if (previewDay < 1) previewDay = 1;

        const previewConfig = this.config[previewDay];
        if (previewConfig) {
            febPreviewEl.textContent = `${previewConfig.emoji} ${previewConfig.name}`;
        }

        // 4. Check for Holidays / Special Observances (Simple manual map for key dates)
        const month = now.getMonth(); // 0 = Jan
        const day = now.getDate();

        const holidays = {
            "0-1": "New Year's Day",
            "0-26": "Republic Day",
            "2-8": "International Women's Day", // Mar 8
            "7-15": "Independence Day", // Aug 15
            "9-2": "Gandhi Jayanti", // Oct 2
            "11-25": "Christmas"    // Dec 25
        };

        const key = `${month}-${day}`;
        if (holidays[key]) {
            holidayRow.style.display = 'flex';
            holidayNameEl.textContent = holidays[key];
        } else {
            // Priority: Love/Hate text if no holiday
            // We can add cheeky commentary about waiting
        }

        // 5. Handle "Enter" Click
        enterBtn.addEventListener('click', () => {
            // Fade out landing
            landing.style.opacity = '0';
            landing.style.transition = 'opacity 0.8s ease';

            setTimeout(() => {
                landing.style.display = 'none';
                app.style.display = 'block';

                // Initialize App with Preview Day
                this.currentDay = previewDay;
                this.loadDay(previewDay);
                this.updateNavDate();
            }, 800);
        });

        // 6. Update Nav Header to match Preview Context (Delayed to safe-guard against overwrites)
        setTimeout(() => {
            const navDay = document.getElementById('nav-day');
            if (navDay && previewConfig) {
                navDay.innerHTML = `<span style="opacity:0.8">Preview:</span> Feb ${previewDay} • ${previewConfig.name}`;
            } else if (navDay) {
                navDay.textContent = "Welcome • Select a Date";
            }
        }, 0);

        // Build Calendar Grid
        this.renderCalendarGrid();
    }

    loadDay(dayNumber) {
        this.currentDay = dayNumber;
        this.currentDialogueNode = 'start';
        this.dayConfig = this.config[dayNumber];
        this.denialCount = 0; // Reset denial count for new day

        // Hide game immediately for fresh intro animation
        const gameContainer = document.getElementById('game');
        if (gameContainer) gameContainer.classList.remove('visible');

        if (!this.dayConfig) {
            console.error(`Day ${dayNumber} not found in config`);
            return;
        }

        // Update Theme
        this.updateTheme();

        // Update Video Background
        this.updateVideoBackground();

        // Update Particles
        this.updateParticles();

        // Render the Game (with AI initial dialogue)
        this.renderGameWithAI();

        // Update Calendar UI (Active State)
        this.updateCalendar();

        // Update URL Hash
        window.location.hash = `day-${dayNumber}`;

        // Fix: Update header date
        this.updateNavDate();

        // Reset any existing reward overlay
        const existingReward = document.getElementById('reward-overlay');
        if (existingReward) existingReward.remove();

        // Trigger Auto Reveal to restart animation cycle
        this.initAutoReveal();
    }

    updateTheme() {
        const body = document.body;
        // Clean up old theme
        body.className = body.className.replace(/theme-\w+/g, '');
        body.classList.add(`theme-${this.dayConfig.theme}`);
    }

    updateVideoBackground() {
        const videoContainer = document.getElementById('video-bg');
        if (!videoContainer) return;

        const remoteUrl = this.dayConfig.videoUrl;
        const localUrl = this.dayConfig.localVideo;

        videoContainer.innerHTML = `
            <video autoplay muted loop playsinline id="bg-video">
                <source src="${localUrl}" type="video/mp4">
                <source src="${remoteUrl}" type="video/mp4">
            </video>
            <div class="video-overlay"></div>
        `;
    }

    updateParticles() {
        const container = document.getElementById('particles');
        if (!container) return;

        container.innerHTML = '';
        const particleEmoji = this.dayConfig.particle || this.dayConfig.emoji || '❤️';

        // Create floating particles
        for (let i = 0; i < 15; i++) {
            this.createParticle(container, particleEmoji);
        }
    }

    createParticle(container, content) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = content;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.animationDuration = `${6 + Math.random() * 4}s`;
        container.appendChild(particle);
    }

    // Fetch AI-generated initial dialogue
    async fetchInitialDialogue() {
        try {
            const response = await fetch(`${this.apiBase}/api/dialogue/initial`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ day: this.currentDay })
            });

            if (!response.ok) throw new Error('API Error');
            return await response.json();
        } catch (error) {
            console.warn('AI unavailable, using fallback:', error);
            // Fallback to config
            const dialogue = this.dayConfig.dialogue.start;
            return {
                text: dialogue.text,
                subtext: dialogue.subtext || '',
                yesOption: dialogue.options[0].text,
                noOption: dialogue.options[1].text
            };
        }
    }

    // Fetch AI-generated denial dialogue
    async fetchDenialDialogue() {
        try {
            const response = await fetch(`${this.apiBase}/api/dialogue/denial`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    day: this.currentDay,
                    denialCount: this.denialCount,
                    sessionId: this.sessionId
                })
            });

            if (!response.ok) throw new Error('API Error');
            const data = await response.json();
            return data.dialogue;
        } catch (error) {
            console.warn('AI unavailable, using fallback:', error);
            // Fallback to denial pool
            return this.denialPool[Math.floor(Math.random() * this.denialPool.length)];
        }
    }

    // Fetch AI-generated reward message
    async fetchRewardMessage() {
        try {
            const response = await fetch(`${this.apiBase}/api/dialogue/reward`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    day: this.currentDay,
                    denialCount: this.denialCount
                })
            });

            if (!response.ok) throw new Error('API Error');
            const data = await response.json();
            return data.message;
        } catch (error) {
            console.warn('AI unavailable, using fallback:', error);
            return this.dayConfig.message || "You made my heart sing! 💕";
        }
    }

    // Render game with AI-generated initial dialogue
    async renderGameWithAI() {
        const gameContainer = document.getElementById('game');
        if (!gameContainer) return;

        // Show loading state
        this.showLoadingState(gameContainer);

        // Fetch AI dialogue
        const aiDialogue = await this.fetchInitialDialogue();

        const dateStr = `February ${this.currentDay}`;

        gameContainer.innerHTML = `
            <div class="game-emoji">${this.dayConfig.emoji}</div>
            
            <div class="game-day-info">
                <div class="game-date">${dateStr}</div>
                <div class="game-title">${this.dayConfig.name}</div>
            </div>
            
            <div class="game-dialogue">
                <div class="game-text">"${aiDialogue.text}"</div>
                ${aiDialogue.subtext ? `<div class="game-subtext">${aiDialogue.subtext}</div>` : ''}
            </div>
            
            <div class="game-buttons">
                <button class="game-btn game-btn-yes" data-next="acceptance">
                    ${aiDialogue.yesOption}
                </button>
                <button class="game-btn game-btn-no" data-next="denial_loop">
                    ${aiDialogue.noOption}
                </button>
            </div>
        `;

        // Add click handlers
        this.attachButtonHandlers(gameContainer);

        // Animate in
        this.animateGameIn();
    }

    // Render denial dialogue with AI escalation
    async renderDenialWithAI() {
        const gameContainer = document.getElementById('game');
        if (!gameContainer) return;

        // Show loading state briefly
        const textEl = gameContainer.querySelector('.game-text');
        if (textEl) textEl.innerHTML = '<span class="loading-dots">Thinking</span>';

        // Fetch AI denial dialogue
        const denialText = await this.fetchDenialDialogue();

        // Calculate intensity indicator
        const intensity = Math.min(this.denialCount + 1, 5);
        const intensityEmoji = '🔥'.repeat(intensity);

        const dateStr = `February ${this.currentDay}`;

        gameContainer.innerHTML = `
            <div class="game-emoji">${this.dayConfig.emoji}</div>
            
            <div class="game-day-info">
                <div class="game-date">${dateStr}</div>
                <div class="game-title">${this.dayConfig.name}</div>
                <div class="game-intensity">${intensityEmoji} Level ${intensity}</div>
            </div>
            
            <div class="game-dialogue">
                <div class="game-text">"${denialText}"</div>
                <div class="game-subtext">I can do this all day... and it only gets spicier 🌶️</div>
            </div>
            
            <div class="game-buttons">
                <button class="game-btn game-btn-yes" data-next="acceptance">
                    Okay, fine! Yes! 💕
                </button>
                <button class="game-btn game-btn-no" data-next="denial_loop">
                    Still No 😏
                </button>
            </div>
        `;

        // Add click handlers
        this.attachButtonHandlers(gameContainer);

        // Animate in
        this.animateGameIn();
    }

    showLoadingState(container) {
        container.innerHTML = `
            <div class="game-emoji">${this.dayConfig?.emoji || '💕'}</div>
            <div class="game-dialogue">
                <div class="game-text loading-pulse">✨ Crafting something special... ✨</div>
            </div>
        `;
    }

    attachButtonHandlers(container) {
        container.querySelectorAll('.game-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const nextNode = e.currentTarget.dataset.next;
                this.handleChoice(nextNode);
            });
        });
    }

    handleChoice(nextNode) {
        // Prevent spam clicking
        if (this.isLoadingAI) return;
        this.isLoadingAI = true;

        // Animation out
        const gameContainer = document.getElementById('game');
        gameContainer.style.opacity = '0';
        gameContainer.style.transform = 'translateY(-20px)';

        setTimeout(async () => {
            if (nextNode === 'acceptance') {
                await this.renderRewardWithAI();
            } else {
                // Increment denial count for escalation
                this.denialCount++;
                this.currentDialogueNode = 'denial_loop';
                await this.renderDenialWithAI();
            }
            this.isLoadingAI = false;
        }, 300);
    }

    async renderRewardWithAI() {
        // Create or get the reward overlay
        let overlay = document.getElementById('reward-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'reward-overlay';
            overlay.className = 'reward-overlay';
            document.body.appendChild(overlay);
        }

        // Show loading
        overlay.innerHTML = `
            <div class="reward-card">
                <div class="reward-content">
                    <div class="reward-emoji">${this.dayConfig.emoji}</div>
                    <h2 class="reward-title loading-pulse">Generating your reward... 🔥</h2>
                </div>
            </div>
        `;
        overlay.classList.add('active');

        // Fetch AI reward message
        const rewardMessage = await this.fetchRewardMessage();
        const rewardImg = this.dayConfig.rewardImage || 'https://images.unsplash.com/photo-1518199266791-5375a83190b7';

        // Determine title based on denial count
        let titleText = "She Said Yes!";
        if (this.denialCount > 5) {
            titleText = "Finally Surrendered! 🔥";
        } else if (this.denialCount > 3) {
            titleText = "Couldn't Resist! 💋";
        } else if (this.denialCount > 1) {
            titleText = "You Gave In! 😏";
        }

        overlay.innerHTML = `
            <div class="reward-card">
                <div class="reward-image-container">
                    <img src="${rewardImg}" alt="Reward" class="reward-image">
                    <div class="reward-overlay-gradient"></div>
                </div>
                <div class="reward-content">
                    <div class="reward-emoji">${this.dayConfig.emoji}</div>
                    <h2 class="reward-title">${titleText}</h2>
                    <p class="reward-message">"${rewardMessage}"</p>
                    ${this.denialCount > 0 ? `<p class="reward-denial-count">You made me work for it: ${this.denialCount} denial${this.denialCount > 1 ? 's' : ''} 😈</p>` : ''}
                    <button class="reward-btn" id="close-reward">See You Tomorrow ✨</button>
                    <button class="reward-replay-btn" id="replay-game">Replay 🔄</button>
                </div>
                <div class="confetti-container" id="reward-confetti"></div>
            </div>
        `;

        // Confetti Effect
        this.triggerConfetti(overlay.querySelector('#reward-confetti'));

        // Hide main game
        document.getElementById('game').style.display = 'none';

        // Event Listeners
        document.getElementById('close-reward').addEventListener('click', () => {
            overlay.remove();
            document.getElementById('game').style.display = 'none';
            const calendar = document.getElementById('calendar');
            if (calendar) calendar.classList.add('open');
        });

        document.getElementById('replay-game').addEventListener('click', () => {
            overlay.remove();
            document.getElementById('game').style.display = 'block';
            this.denialCount = 0; // Reset for replay
            this.currentDialogueNode = 'start';
            this.renderGameWithAI();
        });
    }

    triggerConfetti(container) {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.animationDelay = `${Math.random() * 2}s`;
            confetti.style.backgroundColor = this.getRandomColor();
            container.appendChild(confetti);
        }
    }

    getRandomColor() {
        const colors = ['#ff6b9d', '#ffd700', '#ffffff', '#e63946', '#20c997'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animateGameIn() {
        const gameContainer = document.getElementById('game');
        gameContainer.style.display = 'block';
        gameContainer.style.transition = '';
        gameContainer.style.opacity = '';
        gameContainer.style.transform = '';
    }

    updateNavDate() {
        const navDay = document.getElementById('nav-day');
        if (navDay && this.dayConfig) {
            navDay.textContent = `Feb ${this.currentDay} • ${this.dayConfig.name}`;
        }
    }

    setupEventListeners() {
        // Calendar Toggle
        const calendarBtn = document.getElementById('calendar-btn');
        const calendar = document.getElementById('calendar');
        const calendarClose = document.getElementById('calendar-close');

        if (calendarBtn) {
            calendarBtn.addEventListener('click', () => calendar.classList.toggle('open'));
        }
        if (calendarClose) {
            calendarClose.addEventListener('click', () => calendar.classList.remove('open'));
        }
    }

    renderCalendarGrid() {
        const grid = document.querySelector('.calendar-grid');
        if (!grid) return;

        // Keep headers, remove existing days
        const headers = grid.querySelectorAll('.calendar-weekday');
        grid.innerHTML = '';
        headers.forEach(h => grid.appendChild(h));

        // Generate days from 1 to 28
        for (let i = 1; i <= 28; i++) {
            const dayConfig = this.config[i];
            const isActive = i === this.currentDay;

            const dayEl = document.createElement('div');
            dayEl.className = `calendar-day ${isActive ? 'active' : ''}`;
            dayEl.dataset.day = i;

            dayEl.innerHTML = `
                <span class="num">${i}</span>
                <span class="emoji">${dayConfig ? dayConfig.emoji : '❓'}</span>
            `;

            dayEl.addEventListener('click', () => {
                const calendar = document.getElementById('calendar');
                calendar.classList.remove('open');

                // 2. Hide Landing Page if open
                const landing = document.getElementById('landing-page');
                const app = document.getElementById('app');
                if (landing) {
                    landing.style.display = 'none';
                    landing.style.opacity = '0';
                }
                if (app) app.style.display = 'block';

                // 3. Load Day IMMEDIATELY (User wants nanosecond response)
                this.loadDay(i);
            });

            grid.appendChild(dayEl);
        }
    }

    updateCalendar() {
        document.querySelectorAll('.calendar-day[data-day]').forEach(dayEl => {
            const day = parseInt(dayEl.dataset.day);
            dayEl.classList.toggle('active', day === this.currentDay);
        });
    }

    initAutoReveal() {
        const gameContainer = document.getElementById('game');

        if (this.revealTimer) clearTimeout(this.revealTimer);

        this.revealTimer = setTimeout(() => {
            if (gameContainer) {
                gameContainer.classList.add('visible');
            }
        }, 2800);
    }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    window.app = new FebruaryApp();
});
