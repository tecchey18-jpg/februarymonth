const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure assets directory exists
const assetsDir = path.join(__dirname, '..', 'assets', 'videos');
if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

// Reliable Pexels Video URLs
const dayVideos = {
    1: "https://videos.pexels.com/video-files/5533100/5533100-uhd_2560_1440_25fps.mp4",
    2: "https://videos.pexels.com/video-files/5699623/5699623-uhd_2560_1440_30fps.mp4",
    3: "https://videos.pexels.com/video-files/4109858/4109858-uhd_2560_1440_25fps.mp4",
    4: "https://videos.pexels.com/video-files/5459344/5459344-uhd_2560_1440_25fps.mp4",
    5: "https://videos.pexels.com/video-files/3205799/3205799-uhd_2560_1440_25fps.mp4",
    6: "https://videos.pexels.com/video-files/4554865/4554865-uhd_2560_1440_25fps.mp4",
    7: "https://videos.pexels.com/video-files/3202166/3202166-uhd_2560_1440_25fps.mp4",
    8: "https://videos.pexels.com/video-files/3123847/3123847-uhd_2560_1440_30fps.mp4",
    9: "https://videos.pexels.com/video-files/855787/855787-hd_1920_1080_25fps.mp4",
    10: "https://videos.pexels.com/video-files/6393527/6393527-uhd_2560_1440_25fps.mp4",
    11: "https://videos.pexels.com/video-files/3252277/3252277-uhd_2560_1440_25fps.mp4",
    12: "https://videos.pexels.com/video-files/4933931/4933931-uhd_2560_1440_25fps.mp4",
    13: "https://videos.pexels.com/video-files/5630654/5630654-uhd_2560_1440_24fps.mp4",
    14: "https://videos.pexels.com/video-files/3201448/3201448-uhd_2560_1440_25fps.mp4",
    15: "https://videos.pexels.com/video-files/4492728/4492728-uhd_2560_1440_25fps.mp4",
    16: "https://videos.pexels.com/video-files/4904146/4904146-uhd_2560_1440_25fps.mp4",
    17: "https://videos.pexels.com/video-files/5409160/5409160-uhd_2560_1440_25fps.mp4",
    18: "https://videos.pexels.com/video-files/5200378/5200378-uhd_2560_1440_25fps.mp4",
    19: "https://videos.pexels.com/video-files/4057313/4057313-uhd_2560_1440_25fps.mp4",
    20: "https://videos.pexels.com/video-files/4057313/4057313-uhd_2560_1440_25fps.mp4",
    21: "https://videos.pexels.com/video-files/4763326/4763326-uhd_2560_1440_30fps.mp4",
    22: "https://videos.pexels.com/video-files/3163534/3163534-uhd_3840_2160_30fps.mp4",
    23: "https://videos.pexels.com/video-files/2711124/2711124-uhd_3840_2160_25fps.mp4",
    24: "https://videos.pexels.com/video-files/5532766/5532766-uhd_2560_1440_25fps.mp4",
    25: "https://videos.pexels.com/video-files/2956214/2956214-hd_1920_1080_24fps.mp4",
    26: "https://videos.pexels.com/video-files/2646255/2646255-hd_1920_1080_30fps.mp4",
    27: "https://videos.pexels.com/video-files/3205799/3205799-uhd_2560_1440_25fps.mp4",
    28: "https://videos.pexels.com/video-files/856860/856860-hd_1920_1080_30fps.mp4"
};

const downloadWithCurl = (url, dest) => {
    return new Promise((resolve, reject) => {
        // Use -L to follow redirects, -A to set User Agent
        const command = `curl -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" -o "${dest}" "${url}"`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            // Check if file exists and has size
            if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
                resolve();
            } else {
                reject(new Error("File empty or not downloaded"));
            }
        });
    });
};

async function downloadAll() {
    console.log('Starting downloads using system CURL tool...');
    console.log('This bypasses most bot checks.');

    for (const [day, url] of Object.entries(dayVideos)) {
        const filename = `day-${day}.mp4`;
        const dest = path.join(assetsDir, filename);

        // Skip if already exists and big enough
        if (fs.existsSync(dest) && fs.statSync(dest).size > 5000) {
            console.log(`Skipping Day ${day} (Already downloaded)`);
            continue;
        }

        try {
            console.log(`Downloading Day ${day}...`);
            await downloadWithCurl(url, dest);
            console.log(`Success: Day ${day}`);
        } catch (error) {
            console.error(`Failed Day ${day}:`, error.message);
        }
    }

    console.log('All downloads processed.');
}

downloadAll();
