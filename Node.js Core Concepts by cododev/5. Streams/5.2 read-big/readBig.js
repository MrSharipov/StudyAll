const fs = require('node:fs/promises');

(async ()=> {
    console.time("readBig");
    const fileHandlerRead = await fs.open("src.txt", "r");
    const fileHandlerWrite = await fs.open("dest.txt", "w");
    
    const streamRead = await fileHandlerRead.createReadStream({highWaterMark: 64 * 1024});
    const streamWrite = await fileHandlerWrite.createWriteStream()


    let split = '';
    streamRead.on("data", (chunk)=> {
        const numbers = chunk.toString("utf-8").split("  ");
       if(Number(numbers[0]) !== Number(numbers[1] - 1)) {
            if(split) {
                numbers[0] = split.trim() + numbers[0].trim();
            }
       }

       if(Number(numbers[numbers.length - 2]) + 1 !== Number(numbers[numbers.length - 1])) {
            split = numbers.pop();
       }

       numbers.forEach(num => {
        let n = Number(num);

        if(n % 2 === 0) {
            if(streamWrite.write(" " + num + " ")) {
                streamRead.pause();
               }
        }
       });
    });

    streamWrite.on("drain", () => {
        streamRead.resume();
    });

    streamRead.on("end", ()=>{
        console.log("Done reading");
        console.timeEnd("readBig")

    })
})();