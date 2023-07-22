/*
Two types of servers in net module

1. TCP server -> has IP address and Port
2. IPC server -> has path to file

*/
const net = require("net");
const server = net.createServer();

const clients = [];

server.on("connection", (socket) => {
  console.log("New connection to the server");

  socket.on("data", (data) => {
    clients.map((s) => {
      s.write(data);
    });
  });

  clients.push(socket);
});

server.listen(3008, "127.0.0.1", () => {
  console.log("Opened server on ", server.address());
});
