// open the directory /static/media/capsules/color/blues and change all file names with "Blook" in it to "Blue"

const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'static/media/capsules/color/blues');

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    files.forEach(function (file) {
        const newFile = file.replace('Blook', 'Blue');
        fs.renameSync(
            path.join(directoryPath, file),
            path.join(directoryPath, newFile)
        );
    });
});