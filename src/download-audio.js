// For each color in colors.json, download audio file that says color name

const fs = require('fs');
const path = require('path');
const googleTTS = require('google-tts-api'); // CommonJS

var colorFile = path.join(__dirname, 'colors.json');
var rawdata = fs.readFileSync(colorFile);
var colors = JSON.parse(rawdata).colors;



for (let i=0; i<colors.length; i++) {
    for (k in colors[i]) {
        if(colors[i][k] instanceof Object) {
                let colorName = (colors[i][k].colorName);  

                // 1. get audio URL
                let url = googleTTS.getAudioUrl(colorName, { lang: 'en', slow: false });
                console.log({ url }); // https://translate.google.com/translate_tts?...

                // 2. get base64 text
                googleTTS
                .getAudioBase64(colorName, { lang: 'en', slow: false })
                .then((base64) => {
                    console.log({ base64 });

                    // save the audio file
                    const buffer = Buffer.from(base64, 'base64');
                    fs.writeFileSync(colorName +'.mp3', buffer, { encoding: 'base64' });
                })
                .catch(console.error);


            }
        }

}

