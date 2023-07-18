const fs = require("fs/promises");

// File descriptor is ID of the file
// To read/write any file, we should OPEN it first
// When we OPEN a file, we must CLOSE it at the end for making memory free
// Decoder -> 01010101 => hello
// Encoder -> hello => 01010101
/*
Node Promise API -> try/catch
Node Callback API -> callback (err)=>{clg(err)}
*/

(async ()=>{

    // Commands:
    const CREATE_FILE = 'create a file';
    const DELETE_FILE = 'delete the file';
    const RENAME_FILE = 'rename the file';
    const ADD_to_FILE = 'add to the file';



    async function createFile(path){
        //Check whether file already exist or not
        try{
            const ExistingFile = await fs.open(path, "r");
            ExistingFile.close()
            // File already exist
            return console.log(`The file path ${path} is already created. `);
        } 
        catch(err){
            //File doesn't exist, now create it
            if(err.code === "ENOENT") {
                const newFileHandle = await fs.open(path, "w");
                console.log("File was successfully created!");
                newFileHandle.close();
            }
        }
    }

    async function deleteFile(path){
        // fs.rm -> removes multple files, directories
        // fs.unlink -> removes only file

        console.log(`Deleting ${path} ...`);
        try {
            const ExistingFile = await fs.open(path, "r");
            await fs.unlink(path);
            console.log("File was successfully deleted")
            ExistingFile.close();
        }
        catch(err) {
            if(err.code === "ENOENT") {
                console.log("File has been already deleted")
            } else {
            console.log(err)
        }
        }
    }

    async function renameFile(oldPath, newPath){
        console.log(`Renaming ${oldPath} to ${newPath}`);
        try {
            const ExistingFile = await fs.open(oldPath, "r");
            await fs.rename(oldPath, newPath);
            console.log("File was successfully renamed")
            ExistingFile.close();
        }
        catch(err) {
            if(err.code === "ENOENT") {
                console.log("File has been already renamed, or there is no such a path here")
            } else {
            console.log(err)
        }
        }
    }

    async function addToFile (path, content) {
        console.log(`Adding to ${path}`)
        console.log(`Content: ${content}`)
        try {
            // "a" flag for adding content
            // "w" flag for replacing content
            const fileHandle = await fs.open(path, "w");
            await fileHandle.write(content);
            fileHandle.close();
        }
        catch(err) {
            console.log(err)
        }
    }

    const commandFileHandler = await fs.open("./command.txt", "r");

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
       // Create a <path>
       if(command.includes(CREATE_FILE)){
            const filePath = command.substring(CREATE_FILE.length + 1);
            createFile(filePath);
       }

       // Delete the file
       // Delete the file <path>
       if(command.includes(DELETE_FILE)) {
            const filePath = command.substring(DELETE_FILE.length + 1);
            deleteFile(filePath);
       }

       // Rename the file
       //rename the file <path> to <new-path>
       if(command.includes(RENAME_FILE)) {
        const _idx = command.indexOf(" to ");
        const oldPath = command.substring(RENAME_FILE.length + 1, _idx);
        const newPath = command.substring(_idx + 4)

        renameFile(oldPath, newPath);
       }

       // Add to file
       // add to the file <path> this content: <content>
       if(command.includes(ADD_to_FILE)) {
            const _idx = command.indexOf(" this content: ");
            const filePath = command.substring(ADD_to_FILE.length + 1, _idx);
            const content = command.substring(_idx + 15);
            addToFile(filePath, content);           
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

// const originalString = 'Hello, world!';
// const base64Encoded = btoa(originalString);
// console.log(base64Encoded);

// // const base64Encoded = 'SGVsbG8sIHdvcmxkIQ==';
// const decodedString = atob(base64Encoded);
// console.log(decodedString); // Output: Hello, world!