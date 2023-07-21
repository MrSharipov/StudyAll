/* Simple TCP server */
const net = require("net");

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    console.log(data);
    // console.log(data.toString("utf8"));
  });
});

/*
  Default port for localhost: 80;
*/

server.listen(3033, "127.0.0.1", () => {
  console.log("opened server on", server.address());
});

/* END */
