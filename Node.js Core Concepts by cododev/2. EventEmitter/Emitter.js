import EventEmitter from "events";

class Emitter extends EventEmitter{}

const myEmitter = new Emitter();

myEmitter.once("foo", ()=>{
    console.log("An event occured 1")
}) // self delete after executing once

// myEmitter.on("foo", ()=>{
//     console.log("An event occured 2")
// })

// myEmitter.on("foo", (x, y)=>{
//     console.log("An event occured: ")
//     console.log(x)
//     console.log(y)
// })

myEmitter.emit("foo", 'some text');
myEmitter.emit("foo", 'some text');
myEmitter.emit("foo", 'some text');