const fs = require('fs');
const path = require('path');
const async = require("async");
const csv2json = require('csvtojson');

let aFiles = fs.readdirSync(path.join(__dirname, 'files'))
var j = 0, k = 0
const convertfiles = (bFiles) => {
    if (!bFiles) console.log('No files found to convert')
    async.forEach(bFiles, function (a, callback) {
        let jObj, csvfilepath, jsonfilepath;
        if (a.indexOf(".csv") > -1) {
            csvfilepath = path.join(__dirname, 'files', a)
            jsonfilepath = path.join(__dirname, 'files', path.basename(csvfilepath, '.csv') + '.json')
            csv2json().fromFile(csvfilepath).then((jData) => {
                jObj = JSON.stringify(jData, null, 2)
                try {
                    fs.writeFileSync(jsonfilepath, jObj)
                } catch (error) {
                    console.log('Error writing the file: ', jsonfilepath)
                    k = k + 1
                }
                if (k === 0) {
                    ++j
                    callback(null)
                }
                else k = k - 1
            })
        }
    }, function (error) {
        if (error) console.log(error)
        else console.log('Number of files successfully converted -', j);
    });
}
convertfiles(aFiles)