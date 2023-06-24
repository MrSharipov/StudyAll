const {Transform} = require("node:stream");
const fs = require("node:fs/promises");

class Decrypt extends Transform {
    _transform(chunk, encoding, callback){
        //this.push(chunk);
        console.log(chunk.toString('utf-8'));
        for(let i = 0; i < chunk.length; i++){
            if(chunk[i] !== 255) {
                chunk[i] -= 1;
            }
        }
        callback(null, chunk)
    }
}

(async ()=> {
    const readFileHandle = await fs.open("encrypted.txt", "r");
    const writeFileHandle = await fs.open("decrypted.txt", "w");

    const readStream = readFileHandle.createReadStream();
    const writeStream = writeFileHandle.createWriteStream();

    const encrypt = new Decrypt();

    readStream.pipe(encrypt).pipe(writeStream);
})();

//5:24:19