const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const config = require('./config.json');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const csv2json = require('csvjson-csv2json');

const yargs = require('yargs')
    .version("1.0.0")
    .command({
        command: 'gss',
        describe: '불러올 구글 스프레드 시트를 설정합니다',
        builder: {
            csv: {
                describe: 'csv파일로 뽑기',
                type: 'boolean'
            },
            json: {
                describe: 'json파일로 뽑기',
                type: 'boolean'
            }
        },
    });

const googleSpreadSheetToCSVOrJSON = async (docID) => {
    const doc = new GoogleSpreadsheet(docID);
    await doc.useServiceAccountAuth(require('./serviceAccountJson.json'));
    await doc.loadInfo();
    const sheetNames = Object.keys(config[docID]);

    const csvDictionary = {}
    for (let i=0; i<doc.sheetCount; i++) {
        const sheet = doc.sheetsByIndex[i];
        if (sheetNames.includes(sheet.title)) { // config의 설정한 sheets 만 찾는다.
            const rows = await sheet.getRows();
            const headerValues = sheet.headerValues + "\n";
            let csv = headerValues;
            Array.from(rows)
                .map((row)=>row._rawData.join(','))
                .forEach((row)=>{
                    csv += row + "\n";
                });
            csvDictionary[sheet.title] = csv;
        }
    }

    Object.keys(csvDictionary).forEach(async (title)=>{
        const csv = csvDictionary[title];
        const json = csv2json(csv, {parseNumbers: true, parseJSON: true, separator:","});
        if (yargs.argv.json) {
            const jsonPath = config[docID][title].hasOwnProperty("json") ? config[docID][title]["json"] : title + ".json";
            await fsPromises.writeFile(jsonPath, JSON.stringify(json));
            console.log(jsonPath);
        }
        if (yargs.argv.csv) {
            const csvPath = config[docID][title].hasOwnProperty("csv") ? config[docID][title]["csv"] : title + ".csv";
            await fsPromises.writeFile(csvPath, csv);
            console.log(csvPath);
        }
    });
};

Object.keys(config).forEach((docID) => googleSpreadSheetToCSVOrJSON(docID));