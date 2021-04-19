const express = require('express');
const router = express.Router();

const ytdl = require('ytdl-core');
const youtubedl = require('youtube-dl');
const ffmpeg = require('ffmpeg-static');

const cp = require('child_process');
const fs = require('fs');
const path = require('path');

const server = require('../../server');

const { authenticateJWT } = require('middlewares/authorize');

let processes = {};

const convertToFullHD = (req, res) => {
  const { downloadUrl } = req.body;

  return async () => {
    youtubedl.getInfo(downloadUrl, ['-f', 'best'], (err, info) => {
      const tracker = {
        start: Date.now(),
        audio: { downloaded: 0, total: Infinity },
        video: { downloaded: 0, total: Infinity },
      };

      try {
        fs.statSync(`videos/${info.id}.mp4`);

        server.ioObject.sockets.emit("msg", { audioProcessed: 0, videoProcessed: 0, convertedVideoId: info.id });
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
          `videos/${info.id}.mp4`,
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
              fs.statSync(path.join(__dirname, '../../videos/', `${info.id}.mp4`));

              server.ioObject.sockets.emit("msg", { audioProcessed: 0, videoProcessed: 0, convertedVideoId: info.id });
            } catch (error) {
              server.ioObject.sockets.emit("msg", { audioProcessed: 0, videoProcessed: 0, convertedVideoId: null });
            }

          }, 1000)
        });

        video.on('error', () => {
          try {
            fs.unlinkSync(path.join(__dirname, '../../videos/', `${info.id}.mp4`));
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

        processes = { ...processes, [info.id]: { ffmpegProcess } }
      }

      res.send();
    });
  }
}

const getVideoInformation = (req, res) => {
  const { downloadUrl } = req.query;

  return async () => {
    youtubedl.getInfo(downloadUrl, ['-f', 'best'], (err, info) => {
      if (err) throw err

      res.json(info);
    })
  }
}

const downloadVideo = (req, res) => {
  const { downloadUrl } = req.query;

  return async () => {
    const movieFileName = `${downloadUrl}.mp4`;

    const filePath = path.join(__dirname, '../../videos/');

    res.download(filePath + movieFileName, filePath);
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
      fs.unlinkSync(path.join(__dirname, '../../videos/', `${downloadUrl}.mp4`));
    } catch (error) {
      console.log("File to delete no found");
    }

    childProcess.ffmpegProcess.kill('SIGINT');

    delete processes[downloadUrl];

    res.send();
  }
}

const getCredentials = (req, res, next) => {
  return async () => {
    cp.exec('node ./controllers/youTube/getCreds.js', function (err, stdout, stderr) {
      if (err) {
        return next(err);
      }
      // send result to the view
      res.render('veiw', { res:  stdout});
    });
  }
}

router.get('/get-credentials', authenticateJWT(getCredentials));
router.post('/convert-cancel', authenticateJWT(convertCancel));
router.get('/download-video', authenticateJWT(downloadVideo));
router.get('/get-video-information', authenticateJWT(getVideoInformation));
router.post('/convert-to-full-hd', authenticateJWT(convertToFullHD));

module.exports = router;
