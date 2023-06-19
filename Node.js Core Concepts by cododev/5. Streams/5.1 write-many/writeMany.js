
// const fs = require("node:fs/promises");

// // Exucution time: 20.393s
// // CPU usage: 116
// // Memory usage: 20mb
// (async ()=>{
//     console.time("write many");

//     const fileHandle = await fs.open('test.txt', "w");

//     for(let i = 0; i < 1000000; i++){
//         await fileHandle.write(` ${i} `);
//     }
//     console.timeEnd("write many");
// })();


// const fs = require("node:fs");

// // Exucution time: 0.29s
// // CPU usage: 
// // Memory usage: 842mb  // Memory leak can happen
// (async ()=>{
//     console.time("write many");
//      fs.open('test.txt', "w", (err, fd)=> {
//         for(let i = 0; i < 1000000; i++){
//             fs.write(fd, ` ${i} `, ()=>{});
//         }
//     });
  
//     console.timeEnd("write many");
// })();


// const fs = require("node:fs");

// // Exucution time: 0.29s
// // CPU usage: 
// // Memory usage: 13mb
// (async ()=>{
//     console.time("write many");
//      fs.open('test.txt', "w", (err, fd)=> {
//         for(let i = 0; i < 1000000; i++){
//             fs.writeSync(fd, ` ${i} `);
//         }
//     });
  
//     console.timeEnd("write many");
// })();



// const fs = require("node:fs");

// // Exucution time: 0.29s
// // CPU usage: 
// // Memory usage: 13mb
// (async ()=>{
//     console.time("write many");
//      fs.open('test.txt', "w", (err, fd)=> {
//         for(let i = 0; i < 1000000; i++){
//             const buff = Buffer.from(` ${i} `);
//             fs.writeSync(fd, buff);
//         }
//     });
  
//     console.timeEnd("write many");
// })();


/* ******** STREAMS ********** */

// const fs = require("node:fs/promises");
// // Don't do it this way!!!! 
// // Exucution time: 568ms
// // CPU usage: 
// // Memory usage: 209mb
// (async ()=>{
//     console.time("write many");

//     const fileHandle = await fs.open('test.txt', "w");
//     const stream = fileHandle.createWriteStream();

//     for(let i = 0; i < 1000000; i++){
//         const buff = Buffer.from(` ${i} `, 'utf-8');
//         stream.write(buff)
//     }
//     console.timeEnd("write many");
// })();



const fs = require("node:fs/promises");
// Exucution time: 678ms
// CPU usage: 
// Memory usage: 42mb
(async ()=>{
    console.time("write many");

    const fileHandle = await fs.open('test.txt', "w");
    const stream = fileHandle.createWriteStream();

    // console.log(stream.writableHighWaterMark)
    // console.log(stream.writableLength)
    let i = 0;
    function writeMany () {
        while(i < 1000000){
            const buff = Buffer.from(` ${i} `, 'utf-8');
            
            // this is our last write
            if(i === 999999) {
                return stream.end(buff)
            }
            // Write buff to the stream
            // If buff is full, stops
            if(!stream.write(buff)) {
                break;
            }
            i++;
        }
    }
    
    writeMany()
   
    //resume our loop once our stream's intenal buffer is emptied
    stream.on("drain", () => {
        writeMany()
    });

    stream.on("finish", () => {
        console.timeEnd("write many");
        fileHandle.close()
    })
    
})();