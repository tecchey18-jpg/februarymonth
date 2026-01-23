// ============================================
// FABULOUS FEBRUARY - CONFIGURATION
// ============================================

// Global pool of playful persuasive messages for the "Infinite Loop"
const DENIAL_POOL = [
    "Are you sure? Look at my puppy eyes... 🥺",
    "My heart just cracked a little. Try again? 💔",
    "Computing error: 'No' is not a valid option for someone this cute. 🤖",
    "But I bought virtual flowers! 🌹",
    "I'm not leaving until I get a smile. 😏",
    "Playing hard to get? I can play that game. 😎",
    "Wrong button. The 'Yes' button is the one glowing with love. ✨",
    "If you say no, I'll have to sing. And you don't want that. 🎤",
    "I bet you're smiling right now. Just say yes! 😊",
    "Denial is the first stage of falling in love. 😉",
    "I have all day. Literally. 🕰️",
    "You know you want to say yes... 💕",
    "Breaking news: Local cutie resists charm. Film at 11. 📰",
    "Ouch. That was cold. Warm me up with a yes? 🥶",
    "I'm stubborn. You're stubborn. Let's be stubborn together. ❤️"
];

// Pexels Video Map (Matches download-videos.js)
const DAYS_CONFIG = {
    1: {
        name: "Rose Day", emoji: "🌹", theme: "romantic",
        videoUrl: "https://videos.pexels.com/video-files/5533100/5533100-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/day-1.mp4",
        rewardImage: "https://images.pexels.com/photos/196666/pexels-photo-196666.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "You deserve a garden, but here is a single rose to start.",
        dialogue: { start: { text: "I brought you a rose. Will you accept it?", subtext: "Be honest with me...", options: [{ text: "Yes, I'd love to 💕", next: "acceptance" }, { text: "No thanks", next: "denial_loop" }] } }
    },
    2: {
        name: "Propose Day", emoji: "💍", theme: "passionate",
        videoUrl: "https://videos.pexels.com/video-files/5699623/5699623-uhd_2560_1440_30fps.mp4",
        localVideo: "assets/videos/day-2.mp4",
        rewardImage: "https://images.pexels.com/photos/265732/pexels-photo-265732.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "It’s not just a question. It’s a promise.",
        dialogue: { start: { text: "I have a question that might change everything...", subtext: "Heart racing... 💓", options: [{ text: "I'm listening 💍", next: "acceptance" }, { text: "I'm scared", next: "denial_loop" }] } }
    },
    3: {
        name: "Chocolate Day", emoji: "🍫", theme: "sweet",
        videoUrl: "https://videos.pexels.com/video-files/4109858/4109858-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/day-3.mp4",
        rewardImage: "https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Sweeter than any candy (but not as sweet as you).",
        dialogue: { start: { text: "Life is like a box of chocolates...", options: [{ text: "That was smooth... Yes! 🍫", next: "acceptance" }, { text: "Cheesy...", next: "denial_loop" }] } }
    },
    4: {
        name: "Teddy Day", emoji: "🧸", theme: "sweet",
        videoUrl: "https://videos.pexels.com/video-files/5459344/5459344-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/day-4.mp4",
        rewardImage: "https://images.pexels.com/photos/708767/pexels-photo-708767.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Something to hug when I'm not there.",
        dialogue: { start: { text: "I found this guy looking for a home.", options: [{ text: "Aww yes! 🧸", next: "acceptance" }, { text: "I have enough", next: "denial_loop" }] } }
    },
    5: {
        name: "Promise Day", emoji: "🤝", theme: "emotional",
        videoUrl: "https://videos.pexels.com/video-files/3205799/3205799-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/day-5.mp4",
        rewardImage: "https://images.pexels.com/photos/888899/pexels-photo-888899.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Cross my heart.",
        dialogue: { start: { text: "I want to make a pact with you.", options: [{ text: "I promise too 🤝", next: "acceptance" }, { text: "Depends...", next: "denial_loop" }] } }
    },
    6: {
        name: "Hug Day", emoji: "🤗", theme: "emotional",
        videoUrl: "https://videos.pexels.com/video-files/4554865/4554865-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/day-6.mp4",
        rewardImage: "https://images.pexels.com/photos/1805505/pexels-photo-1805505.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Sending a virtual squeeze.",
        dialogue: { start: { text: "Open your arms. Incoming!", options: [{ text: "Catch me! 🤗", next: "acceptance" }, { text: "No hugs", next: "denial_loop" }] } }
    },
    7: {
        name: "Kiss Day", emoji: "💋", theme: "passionate",
        videoUrl: "https://videos.pexels.com/video-files/3202166/3202166-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/day-7.mp4",
        rewardImage: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Mwah! 💋",
        dialogue: { start: { text: "Hypothetically... if I kissed you right now...", options: [{ text: "Do it 💋", next: "acceptance" }, { text: "Start over", next: "denial_loop" }] } }
    },
    8: {
        name: "Valentine's Eve", emoji: "🌃", theme: "dreamy",
        videoUrl: "https://videos.pexels.com/video-files/3123847/3123847-uhd_2560_1440_30fps.mp4",
        localVideo: "assets/videos/day-8.mp4",
        rewardImage: "https://images.pexels.com/photos/3312676/pexels-photo-3312676.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "The calm before the love storm.",
        dialogue: { start: { text: "Can't sleep. Too excited for tomorrow.", options: [{ text: "Me too! 🌃", next: "acceptance" }, { text: "Go to sleep", next: "denial_loop" }] } }
    },
    9: {
        name: "Valentine's Day", emoji: "❤️", theme: "passionate",
        videoUrl: "https://videos.pexels.com/video-files/855787/855787-hd_1920_1080_25fps.mp4",
        localVideo: "assets/videos/day-9.mp4",
        rewardImage: "https://images.pexels.com/photos/326612/pexels-photo-326612.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Happy Valentine's Day! You are my everything.",
        dialogue: { start: { text: "It's today. The day I tell you...", options: [{ text: "Be my Valentine ❤️", next: "acceptance" }, { text: "Tell me what?", next: "denial_loop" }] } }
    },
    10: {
        name: "Self-Love Day", emoji: "💖", theme: "party",
        videoUrl: "https://videos.pexels.com/video-files/6393527/6393527-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/day-10.mp4",
        rewardImage: "https://images.pexels.com/photos/3764568/pexels-photo-3764568.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "You are enough.",
        dialogue: { start: { text: "Look in the mirror. See that beauty?", options: [{ text: "I see it! 💖", next: "acceptance" }, { text: "Not today", next: "denial_loop" }] } }
    },
    11: {
        name: "Friendship Day", emoji: "👯", theme: "party",
        videoUrl: "https://videos.pexels.com/video-files/3252277/3252277-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/day-11.mp4",
        rewardImage: "https://images.pexels.com/photos/1646953/pexels-photo-1646953.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Partners in crime.",
        dialogue: { start: { text: "Who has your back no matter what?", options: [{ text: "Besties forever 👯", next: "acceptance" }, { text: "Who are you?", next: "denial_loop" }] } }
    },
    12: {
        name: "Flirt Day", emoji: "😏", theme: "sweet",
        videoUrl: "https://videos.pexels.com/video-files/4933931/4933931-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/day-12.mp4",
        rewardImage: "https://images.pexels.com/photos/2535905/pexels-photo-2535905.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Did it hurt? When you fell from heaven? 😉",
        dialogue: { start: { text: "Is it hot in here, or is it just you?", options: [{ text: "Oh stop it 😏", next: "acceptance" }, { text: "Old line...", next: "denial_loop" }] } }
    },
    13: {
        name: "Date Night Day", emoji: "🌙", theme: "romantic",
        videoUrl: "https://videos.pexels.com/video-files/5630654/5630654-uhd_2560_1440_24fps.mp4",
        localVideo: "assets/videos/day-13.mp4",
        rewardImage: "https://images.pexels.com/photos/626154/pexels-photo-626154.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Table for two.",
        dialogue: { start: { text: "Pick you up at 8?", options: [{ text: "It's a date 🌙", next: "acceptance" }, { text: "I'm busy", next: "denial_loop" }] } }
    },
    14: {
        name: "Valentine's Redux", emoji: "🎬", theme: "passionate",
        videoUrl: "https://videos.pexels.com/video-files/3201448/3201448-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/day-14.mp4",
        rewardImage: "https://images.pexels.com/photos/2526935/pexels-photo-2526935.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Our love is cinematic.",
        dialogue: { start: { text: "Scene 1, Take 2. Action!", options: [{ text: "Starring Us 🎬", next: "acceptance" }, { text: "Cut!", next: "denial_loop" }] } }
    },
    15: {
        name: "Slap Day", emoji: "👋", theme: "fierce",
        videoUrl: "https://videos.pexels.com/video-files/4492728/4492728-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/day-15.mp4",
        rewardImage: "https://images.pexels.com/photos/6320015/pexels-photo-6320015.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Wake up call!",
        dialogue: { start: { text: "Sometimes we need a little shock to the system.", options: [{ text: "I'm awake! 👋", next: "acceptance" }, { text: "Ouch", next: "denial_loop" }] } }
    },
    16: {
        name: "Kick Day", emoji: "👟", theme: "fierce",
        videoUrl: "https://videos.pexels.com/video-files/4904146/4904146-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/day-16.mp4",
        rewardImage: "https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Kicking bad vibes away.",
        dialogue: { start: { text: "Bad vibes? Not here.", options: [{ text: "Kick 'em out! 👟", next: "acceptance" }, { text: "I like bad vibes", next: "denial_loop" }] } }
    },
    17: {
        name: "Breakup Day", emoji: "💔", theme: "sad",
        videoUrl: "https://videos.pexels.com/video-files/5409160/5409160-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/day-17.mp4",
        rewardImage: "https://images.pexels.com/photos/1003816/pexels-photo-1003816.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "It's not you, it's... negativity.",
        dialogue: { start: { text: "Wait... are we breaking up with NEGATIVITY today?", options: [{ text: "Yes, goodbye gloom! 💔", next: "acceptance" }, { text: "I'm sad", next: "denial_loop" }] } }
    },
    18: {
        name: "Patch-Up Day", emoji: "🩹", theme: "emotional",
        videoUrl: "https://videos.pexels.com/video-files/5200378/5200378-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/day-18.mp4",
        rewardImage: "https://images.pexels.com/photos/2253835/pexels-photo-2253835.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Better together.",
        dialogue: { start: { text: "Let's fix what's broken.", options: [{ text: "Heal it 🩹", next: "acceptance" }, { text: "It's too late", next: "denial_loop" }] } }
    },
    19: {
        name: "Missing Day", emoji: "💭", theme: "nostalgic",
        videoUrl: "https://videos.pexels.com/video-files/5533100/5533100-uhd_2560_1440_25fps.mp4", // Re-using Rose as placeholder if URL missing
        localVideo: "assets/videos/day-19.mp4",
        rewardImage: "https://images.pexels.com/photos/2253835/pexels-photo-2253835.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Wishing you were here.",
        dialogue: { start: { text: "Space feels empty without you.", options: [{ text: "I'm coming! 💭", next: "acceptance" }, { text: "Stay there", next: "denial_loop" }] } }
    },
    20: {
        name: "Confession Day", emoji: "📱", theme: "romantic",
        videoUrl: "https://videos.pexels.com/video-files/4057313/4057313-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/day-20.mp4",
        rewardImage: "https://images.pexels.com/photos/785265/pexels-photo-785265.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Truth time.",
        dialogue: { start: { text: "I have a secret...", options: [{ text: "Tell me 📱", next: "acceptance" }, { text: "Keep it", next: "denial_loop" }] } }
    },
    21: {
        name: "Forgive Day", emoji: "🕊️", theme: "fresh",
        videoUrl: "https://videos.pexels.com/video-files/4763326/4763326-uhd_2560_1440_30fps.mp4",
        localVideo: "assets/videos/day-21.mp4",
        rewardImage: "https://images.pexels.com/photos/3354336/pexels-photo-3354336.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Peace at last.",
        dialogue: { start: { text: "Slate clean?", options: [{ text: "Forgiven 🕊️", next: "acceptance" }, { text: "Nope", next: "denial_loop" }] } }
    },
    22: {
        name: "Single's Day", emoji: "🥂", theme: "party",
        videoUrl: "https://videos.pexels.com/video-files/3163534/3163534-uhd_3840_2160_30fps.mp4",
        localVideo: "assets/videos/day-22.mp4",
        rewardImage: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Cheers to me!",
        dialogue: { start: { text: "Who needs drama when you have freedom?", options: [{ text: "Cheers to that! 🥂", next: "acceptance" }, { text: "I'm lonely", next: "denial_loop" }] } }
    },
    23: {
        name: "Glow-Up Day", emoji: "✨", theme: "party",
        videoUrl: "https://videos.pexels.com/video-files/2711124/2711124-uhd_3840_2160_25fps.mp4",
        localVideo: "assets/videos/day-23.mp4",
        rewardImage: "https://images.pexels.com/photos/2033997/pexels-photo-2033997.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Shine bright.",
        dialogue: { start: { text: "New look, who dis?", options: [{ text: "Stunning! ✨", next: "acceptance" }, { text: "Same old", next: "denial_loop" }] } }
    },
    24: {
        name: "Crush Day", emoji: "🦋", theme: "sweet",
        videoUrl: "https://videos.pexels.com/video-files/5532766/5532766-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/day-24.mp4",
        rewardImage: "https://images.pexels.com/photos/1374551/pexels-photo-1374551.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Butterflies everywhere.",
        dialogue: { start: { text: "I think I like you...", options: [{ text: "I like you too 🦋", next: "acceptance" }, { text: "Eww", next: "denial_loop" }] } }
    },
    25: {
        name: "Chaos Love Day", emoji: "🔥", theme: "passionate",
        videoUrl: "https://videos.pexels.com/video-files/2956214/2956214-hd_1920_1080_24fps.mp4",
        localVideo: "assets/videos/day-25.mp4",
        rewardImage: "https://images.pexels.com/photos/2228580/pexels-photo-2228580.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Beautiful disaster.",
        dialogue: { start: { text: "We're trouble together.", options: [{ text: "Let's burn 🔥", next: "acceptance" }, { text: "Too risky", next: "denial_loop" }] } }
    },
    26: {
        name: "Destiny Day", emoji: "🌠", theme: "dreamy",
        videoUrl: "https://videos.pexels.com/video-files/2646255/2646255-hd_1920_1080_30fps.mp4",
        localVideo: "assets/videos/day-26.mp4",
        rewardImage: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Written in the stars.",
        dialogue: { start: { text: "It was always meant to be.", options: [{ text: "I believe 🌠", next: "acceptance" }, { text: "Coincidence", next: "denial_loop" }] } }
    },
    27: {
        name: "Eternal Love Day", emoji: "♾️", theme: "romantic",
        videoUrl: "https://videos.pexels.com/video-files/3205799/3205799-uhd_2560_1440_25fps.mp4",
        localVideo: "assets/videos/day-27.mp4",
        rewardImage: "https://images.pexels.com/photos/6393527/pexels-photo-6393527.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Forever and always.",
        dialogue: { start: { text: "Not just now. Forever.", options: [{ text: "Forever ♾️", next: "acceptance" }, { text: "Too long", next: "denial_loop" }] } }
    },
    28: {
        name: "New Beginnings Day", emoji: "🌅", theme: "fresh",
        videoUrl: "https://videos.pexels.com/video-files/856860/856860-hd_1920_1080_30fps.mp4",
        localVideo: "assets/videos/day-28.mp4",
        rewardImage: "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800",
        message: "Our story starts here.",
        dialogue: { start: { text: "February ends. We begin.", options: [{ text: "Let's go 🌅", next: "acceptance" }, { text: "I'm staying", next: "denial_loop" }] } }
    }
};

if (typeof module !== 'undefined') {
    module.exports = { DAYS_CONFIG, DENIAL_POOL };
}
