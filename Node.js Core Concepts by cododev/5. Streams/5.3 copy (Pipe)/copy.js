//Memory usage : size of the file (Huge)
//Space: 900 ms

// const fs = require("node:fs/promises");

// (async () => {
//     const destFile = await fs.open("text-copy.txt", "w");
//      // reads the whole file in one Buffer
//     const result = await fs.readFile("test.txt");
//      //writes huge sized Buffer into the file
//    await destFile.write(result)
// })();


// //File size: 1 GB
// //Memory usage : 30 MB (memory effecient)
// //Space: 2 s
// const fs = require("node:fs/promises");
// (async () => {
//     console.time("copy")
//     const srcFile = await fs.open("test.txt", "r");
//     const destFile = await fs.open("text-copy.txt", "w");
   
//     let bytesRead = -1;
//     while(bytesRead !== 0) {
//          // always returns small default chunk (16384);
//         const readResult = await srcFile.read();
//         bytesRead = readResult.bytesRead;
//         if(bytesRead !== 16384) {
//             const indexOfNotFilled = readResult.buffer.indexOf(0);
//             const newBuffer = Buffer.alloc(indexOfNotFilled);
//             readResult.buffer.copy(newBuffer, 0, 0, indexOfNotFilled);
//             destFile.write(newBuffer);
//         } else {
//             destFile.write(readResult.buffer);
//         }
//     }
//     console.timeEnd("copy")
// })();



//File size: 1 GB
//Memory usage : 25 MB (memory effecient)
//Space: 25 ms
// const fs = require("node:fs/promises");
// (async () => {
//     console.time("copy")
//     const srcFile = await fs.open("test.txt", "r");
//     const destFile = await fs.open("text-copy.txt", "w");
   
//     const readStream = srcFile.createReadStream();
//     const writeStream = destFile.createWriteStream();
    
//     // Automatic pause at drain 
//     readStream.pipe(writeStream);

//     readStream.on("end", ()=> {
//         console.timeEnd("copy")
//     })
   
// })();



// pump is the package  for pipe to  make it pipeline
// Use pipeline instead of pipe in prod. 
// Because pipeline has error handling.
// stream.finished is for prod to check errors

const {pipeline} = require("node:stream");
const fs = require("node:fs/promises");
(async () => {
    console.time("copy")
    const srcFile = await fs.open("test.txt", "r");
    const destFile = await fs.open("text-copy.txt", "w");
   
    const readStream = srcFile.createReadStream();
    const writeStream = destFile.createWriteStream();

    pipeline(readStream, writeStream, (err)=> {
        if(err){
            console.log(err)
        }
        console.timeEnd("copy")
    })
   
})();

