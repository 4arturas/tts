const gTTS = require('gtts');
const fs = require('fs');

function checkForFile(fileName)
{
    fs.exists(fileName, function (exists) {
        if(exists)
        {
        }else
        {
            fs.writeFile(fileName)
        }
    });
}

function save( lang, directory, fileName, txt ) {

    fs.mkdirSync(directory, { recursive: true })

    const gtts = lang === 'ru' ?
        new gTTS(txt, 'ru') :
        new gTTS(txt, 'en');

    gtts.save(`${directory}/${fileName}`, function (err, result) {
        if (err) {
            throw new Error(err);
        }
    });
}

function numToString(num) {
    const str = `${num}`;
    return str.length === 1 ? `0${str}` : str;
}

const pathSource = '/home/arturas/IdeaProjects/locke/11 Of Discerning';
const pathDestination = '/home/arturas/Downloads/locke/11';

let directories = fs.readdirSync(pathSource);
for ( let i = 0; i < directories.length; i++ )
{
    const dir = directories[i];
    const filePathEn = `${pathSource}/${dir}/${dir}_en.txt`;
    const filePathRu = `${pathSource}/${dir}/${dir}_ru.txt`;
    const en = fs.readFileSync(filePathEn, 'utf8');
    const ru = fs.readFileSync(filePathRu, 'utf8');

    save( 'en', `${pathDestination}/${dir}`, `en${numToString(i+1)}.mp3`, en );
    save( 'ru', `${pathDestination}/${dir}`, `ru${numToString(i+1)}.mp3`, ru );
    // console.log(ru);
    // console.log( filePathEn );
} // end for i

