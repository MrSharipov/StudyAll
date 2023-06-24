const {Duplex} = require("node:stream");
const fs = require("node:fs");

class MyDuplexStream extends Duplex {
    constructor({writableHighWaterMark,readableHighWaterMark, writeFileName, readFileName}){
        super({writableHighWaterMark, readableHighWaterMark});
        this.writeFileName = writeFileName;
        this.readFileName = readFileName;
        this.writeFd = null; 
        this.readFd = null; 
        this.chunks = [];
        this.chunkSize = 0;
    }

    _construct(callback) {
        fs.open(this.readFileName, "r", (err, readFd)=>{
            if(err) return callback(err);
                this.readFd = readFd;
                fs.open(this.writeFileName, "w", (err, writeFd)=>{
                    if(err) return callback(err);
                    this.writeFd = writeFd;
                    callback();
                })
        })
    }

    _write(chunk, encoding, callback){
        //do some operation
        // console.log(this.fd);
        this.chunks.push(chunk);
        this.chunkSize += chunk.siza;

        if(this.chunkSize > this.writableHighWaterMark){ 
            fs.write(this.writeFd, Buffer.concat(this.chunks), (err)=> {
                if(err) {
                    return callback(err);
                }
                this.chunks = [];
                this.chunkSize = 0;
                callback()
            })
        } else {
            //when we are done, we should call the callback function
            callback()
        }   
    }

    _read(size) {
        const buff = Buffer.alloc(size);
        fs.read(this.readFd, buff, 0, size, null, (err, bytesRead)=>{
            if(err) {
                return this.destroy(err);
            }
            //null is to indicate the end of the stream
            this.push(bytesRead > 0 ? buff.subarray(0, bytesRead) : null);
        })
    }

    _final(callback){
        fs.write(this.writeFd, Buffer.concat(this.chunks), (err)=>{
            if(err) return callback(err);

             this.chunks = [];
             callback();
        })
    }

    _destroy(error, calback){
        calback(error);
    }

}

const duplex = new MyDuplexStream({readFileName: "read.txt", writeFileName: "write.txt"});

//write to file using duplex
duplex.write(Buffer.from("This is a string 0\n"));
duplex.write(Buffer.from("This is a string 1\n"));
duplex.write(Buffer.from("This is a string 2\n"));
duplex.write(Buffer.from("This is a string 3"));
duplex.end(Buffer.from("This is end"));

//read from file using duplex
duplex.on("data", (chunk)=>{
    console.log(chunk.toString("utf-8"));
});