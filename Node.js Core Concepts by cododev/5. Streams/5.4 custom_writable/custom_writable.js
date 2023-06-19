const {Writable} = require("node:stream");
const fs = require("node:fs");

class MyFileWriteStream extends Writable {
    constructor({highWaterMark, fileName}){
        super({highWaterMark});

        this.fileName = fileName;
        this.fd = null;
        this.chunks = [];
        this.chunkSize = 0;
        this.numberOfWrites = 0;
    }

    // this will return after constructor and it will stop all calling other
    // mehtods until we call callback function
    _construct(callback) {
        const fd = fs.open(this.fileName, "w", (err, fd) => {
            if( err ) {
                //if we call the calback with argument, there is an error
                // and we cann't proceed
                callback(err);
            } else {
                this.fd = fd;
                // no argument is success
                callback(   )
            }

        })
    }

    _write(chunk, encoding, callback){
        //do some operation
        // console.log(this.fd);
        this.chunks.push(chunk);
        this.chunkSize += chunk.siza;

        if(this.chunkSize > this.writableHighWaterMark){ 
            fs.write(this.fd, Buffer.concat(this.chunks), (err)=> {
                if(err) {
                    return callback(err);
                }
                this.chunks = [];
                this.chunkSize = 0;
                ++this.numberOfWrites;
                callback()
            })
        } else {
            //when we are done, we should call the callback function
            callback()
        }   
    }

    _final(callback){
        fs.write(this.fd, Buffer.concat(this.chunks), (err)=>{
            if(err) return callback(err);

             this.chunks = [];
             this.chunkSize = 0;
             callback();
        })
    }
    _destroy(error, callback){
        console.log("Number of writes: " + this.numberOfWrites);
        if(this.fd) {
            fs.close(this.fd, (err)=> {
                callback(err || error);
            });
        } else {
            callback(error);
        }
    }
}

const stream = new MyFileWriteStream({highWaterMark: 1800, fileName: "text.txt"});
stream.write(Buffer.from("Salom dunyo"));
stream.end(Buffer.from(' The end'));
stream.on("finish", ()=> {
    console.log("Stream was finished");
})

// stream.on("drain",() => {}); 

