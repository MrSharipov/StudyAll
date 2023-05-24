const fs = require("fs/promises");

// File descriptor is ID of the file
// To read/write any file, we should OPEN it first
// When we OPEN a file, we must CLOSE it at the end for making memory free
// Decoder -> 01010101 => hello
// Encoder -> hello => 01010101

(async ()=>{

    const commandFileHandler = await fs.open("./command.txt", "r");

    async function createFile(path){
        //Check whether file already exist or not
        try{
            const ExistingFile = await fs.open(path, "r");
            ExistingFile.close()

            // File already exist
            return console.log(`The file path ${path} is already exist. `);
        } 
        catch(err){
            //File doesn't exist, now create it
            const newFileHandle = await fs.open(path, "w");
            console.log("File was successfully created!");
            newFileHandle.close();
        }
    }

     // Commands:
     const CREATE_FILE = 'create a file';

    commandFileHandler.on("change", async () => {
        // get the size of our file
        const size = (await (commandFileHandler.stat())).size;
        // allocate our buffer with the size of the file
        const buff = Buffer.alloc(size);
        // the location which we want to start filling our buffer
        const offset = 0;
        // how many bytes we want to read
        const length = buff.byteLength;
        // the position that we want to start reading the file from
        const position = 0;

        // we always want to read the whole content (from beginning all the way to the end)
        await commandFileHandler.read(
            buff, 
            offset, 
            length, 
            position
        );
       const command = buff.toString('utf-8');

       // Create a file
       // Create a path
       if(command.includes(CREATE_FILE)){
            const filePath = command.substring(CREATE_FILE.length + 1);
            createFile(filePath);
       }
    });
    const watcher = fs.watch("./command.txt");
        for await(const event of watcher) {
            if(event.eventType === "change"){
                // console.log("The file was changed");
               commandFileHandler.emit("change");
            }
            
        }
})();