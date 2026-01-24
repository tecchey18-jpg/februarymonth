// ============================================
// FEBRUARY CELEBRATION - MAIN APP
// Playful Persuasion Game Engine v2.0
// ============================================

class FebruaryApp {
    constructor() {
        this.currentDay = this.getCurrentDay();
        this.currentDialogueNode = 'start';
        this.dayConfig = null;
        this.calendarOpen = false;

        this.init();
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
    }

    // Old initScrollReveal removed in favor of initAutoReveal defined below

    loadDay(dayNumber) {
        this.currentDay = dayNumber;
        this.currentDialogueNode = 'start';
        this.dayConfig = this.config[dayNumber];

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

        // Render the Game
        this.renderGame();

        // Update Calendar UI
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
        const localUrl = `assets/videos/day-${this.currentDay}.mp4`;

        // EXTREME SIMPLIFICATION:
        // No wrappers. No swapping. No transitions.
        // Just put the video there.
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

    renderGame(customMessage = null) {
        const gameContainer = document.getElementById('game');
        if (!gameContainer) return;

        // Logic check: Are we in a loop or start?
        let dialogueNode = this.dayConfig.dialogue[this.currentDialogueNode];

        // If we are in "denial_loop", generate a dynamic node
        if (this.currentDialogueNode === 'denial_loop') {
            const randomPlea = this.denialPool[Math.floor(Math.random() * this.denialPool.length)];
            dialogueNode = {
                text: customMessage || randomPlea,
                subtext: "I can do this all day...",
                options: [
                    { text: "Okay, fine! Yes! 💕", next: "acceptance" },
                    { text: "Still No", next: "denial_loop" } // Infinite loop
                ]
            };
        }

        const dateStr = `February ${this.currentDay}`;

        gameContainer.innerHTML = `
            <div class="game-emoji">${this.dayConfig.emoji}</div>
            
            <div class="game-day-info">
                <div class="game-date">${dateStr}</div>
                <div class="game-title">${this.dayConfig.name}</div>
            </div>
            
            <div class="game-dialogue">
                <div class="game-text">"${dialogueNode.text}"</div>
                ${dialogueNode.subtext ? `<div class="game-subtext">${dialogueNode.subtext}</div>` : ''}
            </div>
            
            <div class="game-buttons">
                ${dialogueNode.options.map((opt, idx) => `
                    <button class="game-btn" data-next="${opt.next}" data-index="${idx}">
                        ${opt.text}
                    </button>
                `).join('')}
            </div>
        `;

        // Add click handlers
        gameContainer.querySelectorAll('.game-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const nextNode = e.currentTarget.dataset.next;
                this.handleChoice(nextNode);
            });
        });

        // Animate in
        this.animateGameIn();
    }

    handleChoice(nextNode) {
        // Animation out
        const gameContainer = document.getElementById('game');
        gameContainer.style.opacity = '0';
        gameContainer.style.transform = 'translateY(-20px)';

        setTimeout(() => {
            if (nextNode === 'acceptance') {
                this.renderReward();
            } else {
                this.currentDialogueNode = nextNode;
                this.renderGame();
            }
        }, 300);
    }

    renderReward() {
        // Create or get the reward overlay
        let overlay = document.getElementById('reward-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'reward-overlay';
            overlay.className = 'reward-overlay';
            document.body.appendChild(overlay);
        }

        const rewardImg = this.dayConfig.rewardImage || 'https://images.unsplash.com/photo-1518199266791-5375a83190b7';

        overlay.innerHTML = `
            <div class="reward-card">
                <div class="reward-image-container">
                    <img src="${rewardImg}" alt="Reward" class="reward-image">
                    <div class="reward-overlay-gradient"></div>
                </div>
                <div class="reward-content">
                    <div class="reward-emoji">${this.dayConfig.emoji}</div>
                    <h2 class="reward-title">She Said Yes!</h2>
                    <p class="reward-message">"${this.dayConfig.message || "You made my day special."}"</p>
                    <button class="reward-btn" id="close-reward">See You Tomorrow ✨</button>
                    <button class="reward-replay-btn" id="replay-game">Replay</button>
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
            // Close the game experience and open calendar for next steps
            overlay.remove();
            document.getElementById('game').style.display = 'none'; // Hide game

            // Open calendar to encourage checking other days or coming back
            const calendar = document.getElementById('calendar');
            if (calendar) calendar.classList.add('open');
        });

        document.getElementById('replay-game').addEventListener('click', () => {
            overlay.remove();
            document.getElementById('game').style.display = 'block';
            this.currentDialogueNode = 'start';
            this.renderGame();
        });

        // Animate In
        requestAnimationFrame(() => {
            overlay.classList.add('active');
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

        // Reset Animation State:
        // We do NOT remove .visible here anymore because it breaks the loop.
        // We only handle hiding in loadDay for the initial intro.

        // Clear inline styles that might interfere
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

        // Calendar Day Clicking
        document.querySelectorAll('.calendar-day[data-day]').forEach(dayEl => {
            dayEl.addEventListener('click', () => {
                const day = parseInt(dayEl.dataset.day);

                // 1. Close Menu Immediately
                calendar.classList.remove('open');

                // 2. Hide Landing Page if open
                const landing = document.getElementById('landing-page');
                const app = document.getElementById('app');
                if (landing) {
                    landing.style.display = 'none';
                    landing.style.opacity = '0';
                }
                if (app) app.style.display = 'block';

                // 3. Load Day IMMEDIATETLY (User wants nanosecond response)
                this.loadDay(day);
            });
        });
    }

    updateCalendar() {
        document.querySelectorAll('.calendar-day[data-day]').forEach(dayEl => {
            const day = parseInt(dayEl.dataset.day);
            dayEl.classList.toggle('active', day === this.currentDay);
        });
    }

    initAutoReveal() {
        // Simple Timer Logic: Reveal game after 2.8 seconds
        // No scrolling, just appearing.

        const gameContainer = document.getElementById('game');

        // Clear any existing timer if re-initializing
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
