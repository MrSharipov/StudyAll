// const buffer = Buffer.alloc(8)
// buffer.write("umid", "utf-8");

// console.log(buffer) // hexidecimal numbers
// console.log(buffer.toJSON()) // decimal numbers

// const buff2 = Buffer.from("string", "utf-8")
// const buff3 = Buffer.from([ 115, 116, 114, 105, 110, 103], "hex")

// console.log(buff2.toJSON())
// console.log(buff3.toString())


const buf4 = Buffer.from("E4BDA0", "hex");
console.log(buf4.toString('utf-8'))