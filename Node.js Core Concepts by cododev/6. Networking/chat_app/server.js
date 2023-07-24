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

  const clientId = clients.length + 1;

  //Broadcasting everyone when somenody joined the chat
  clients.map((client) => {
    client.socket.write(`User ${clientId} joined!`);
  });
  socket.write(`id-${clientId}`);

  socket.on("data", (data) => {
    const stringData = data.toString("utf-8");
    const id = stringData.substring(0, stringData.indexOf("-"));
    const message = stringData.substring(stringData.indexOf("-message-") + 9);
    clients.map((client) => {
      client.socket.write(`User: ${id}: ${message}`);
    });
  });

  //Broadcasting everyone when somenody left the chat
  socket.on("end", () => {
    clients.map((client) => {
      client.socket.write(`User ${clientId} left!`);
    });
  });

  clients.push({ id: clientId.toString(), socket });
});

server.listen(3008, "127.0.0.1", () => {
  console.log("Opened server on ", server.address());
});
