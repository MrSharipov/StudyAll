// ***** Promise API ****** //

// const fs = require("fs/promises");

// (async ()=> {
//     try {
//         await fs.copyFile("file.txt", "copied-promise.txt");
//     } catch (error) {
//         console.log(error)
//     }
// })();

// ***** Callback API ****** //

// const fs = require("fs");
    
// fs.copyFile("file.txt", "copied-callback.txt", (err)=> {
//     console.log(err)
// });
   

// ***** Synchronous API ****** //

const fs = require("fs");
    
fs.copyFileSync("file.txt", "copied-sync.txt");