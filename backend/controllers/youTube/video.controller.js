const express = require('express');
const router = express.Router();

const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg-static');

const cp = require('child_process');
const fs = require('fs');
const path = require('path');

const server = require('../../server');

const { authenticateJWT } = require('middlewares/authorize');

let processes = {};

const videosPath = path.join(__dirname, '../../../build/static/videos/');

const convertToFullHD = (req, res) => {
  const { downloadUrl } = req.body;

  return async () => {
    const info = await ytdl.getInfo(downloadUrl);

    const { videoDetails: { videoId }} = info;

    const videoFilePath = path.join(videosPath, `${videoId}.mp4`);

    const tracker = {
      start: Date.now(),
      audio: { downloaded: 0, total: Infinity },
      video: { downloaded: 0, total: Infinity },
    };

    try {
      fs.statSync(videoFilePath);

      server.ioObject.sockets.emit("msg", { audioProcessed: 0, videoProcessed: 0, convertedVideoId: videoId });
    } catch (error) {
      server.ioObject.sockets.emit("msg", { audioProcessed: 1, videoProcessed: 1 });

      const audio = ytdl(downloadUrl, { quality: 'highestaudio' })
      .on('progress', (_, downloaded, total) => {
        tracker.audio = { downloaded, total };
      });

      const video = ytdl(downloadUrl, { quality: 'highestvideo' })
      .on('progress', (_, downloaded, total) => {
        tracker.video = { downloaded, total };
      });

      const progressbar = setInterval(() => {
        const audioProcessed = Math.floor(tracker.audio.downloaded / tracker.audio.total * 100);
        const videoProcessed = Math.floor(tracker.video.downloaded / tracker.video.total * 100);

        if (audioProcessed && videoProcessed) {
          server.ioObject.sockets.emit("msg", { audioProcessed, videoProcessed });
        }
      }, 5000);

      const ffmpegProcess = cp.spawn(ffmpeg, [
        '-loglevel', '0', '-hide_banner',
        '-i', 'pipe:3',
        '-i', 'pipe:4',
        // Map audio & video from streams
        '-map', '0:a',
        '-map', '1:v',
        // Keep encoding
        '-c:v', 'copy',
        // Define output file
        videoFilePath,
      ], {
        windowsHide: true,
        stdio: [
          /* Standard: stdin, stdout, stderr */
          'inherit', 'inherit', 'inherit',
          /* Custom: pipe:3, pipe:4, pipe:5, pipe:6 */
          'pipe', 'pipe', 'pipe'
        ],
      });

      ffmpegProcess.on('close', () => {
        tracker.video = { ...tracker.video, downloaded: tracker.video.total };
        tracker.audio = { ...tracker.audio, downloaded: tracker.audio.total };

        setTimeout(() => {
          clearInterval(progressbar);

          try {
            fs.statSync(videoFilePath);

            server.ioObject.sockets.emit("msg", { audioProcessed: 0, videoProcessed: 0, convertedVideoId: videoId });
          } catch (error) {
            server.ioObject.sockets.emit("msg", { audioProcessed: 0, videoProcessed: 0, convertedVideoId: null });
          }

        }, 1000)
      });

      video.on('error', () => {
        try {
          fs.unlinkSync(videoFilePath);
        } catch (error) {
          console.log("Video not converting to 1080p");
        }

        server.ioObject.sockets.emit("msg", {
          audioProcessed: 0,
          videoProcessed: 0,
          convertedVideoId: null,
          convertingError: true
        });
      })

      audio.pipe(ffmpegProcess.stdio[3]);
      video.pipe(ffmpegProcess.stdio[4]);

      processes = { ...processes, [videoId]: { ffmpegProcess } }
    }

    res.send();
  }
}

const getVideoInformation = (req, res) => {
  const { downloadUrl } = req.query;

  return async () => {
    const info = await ytdl.getInfo(downloadUrl);
    const format  = ytdl.chooseFormat(info.formats, { quality: '22'});

    res.json({ ...info, videoDetails: { ...info.videoDetails, ...format } });
  }
}

const convertCancel = (req, res) => {
  const { downloadUrl } = req.body;

  return async () => {
    const childProcess = processes[downloadUrl];

    if (!childProcess) {
      return res.send();
    }

    childProcess.ffmpegProcess.stdio[3].destroy();
    childProcess.ffmpegProcess.stdio[4].destroy();

    try {
      fs.unlinkSync(path.join(videosPath, `${downloadUrl}.mp4`));
    } catch (error) {
      console.log("File to delete no found");
    }

    childProcess.ffmpegProcess.kill('SIGINT');

    delete processes[downloadUrl];

    res.send();
  }
}

router.post('/convert-cancel', authenticateJWT(convertCancel));
router.get('/get-video-information', authenticateJWT(getVideoInformation));
router.post('/convert-to-full-hd', authenticateJWT(convertToFullHD));

module.exports = router;
