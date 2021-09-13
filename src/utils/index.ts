
import * as fs from 'fs';

export const getLatestUri = function(fileName: string) {
    const dbpool = fs.readFileSync(fileName, 'utf8');
    const allLines = dbpool.split(/\r\n|\n/);
    let latestLine;
    let latestLineIndex = 0;
    for(let i=0;i<allLines.length;i++) {
        const line = allLines[i];
        const items = line.split(' ');
        if(items.length >= 2) {
            latestLine = items;
            latestLineIndex = i;
        }
    }   
    if(latestLine) {
        return latestLine[0];
    }
    return '';
}