/*
Switch -> device to connect PCs
Networking card ->  built in PC -> Unique address = Mac address 
E.g = f1:31:87f1:5b:3c

PC -> Network card (Mac address) -> Switch -> Router(UZB) -> Router(USA) -> Switch -> Network card -> PC

ISP - internet service provider to connect to the world
Pc -> Switch -> Router -> ISP

127.0.0.1 -> loop back address -> localhost

$ ifconfig - cmd to see IP data in Pc 

 - in PC
    - Ip Address : 192.168.122.213 to use over devices in same network
    - Router: 192.168.122.91
*/

/*
    ------- Connect to Ipad -------
*/
// const http = require("http");

// const port = 3002;
// // const hostname = "127.0.0.1";
// const hostname = "192.168.122.213";

// const server = http.createServer((req, res) => {
//   const data = { message: "Hi dunya!" };

//   res.setHeader("Content-type", "application/json");
//   res.setHeader("Connection", "close");
//   res.statusCode = 200;
//   res.end(JSON.stringify(data));
// });

// server.listen(port, hostname, () => {
//   console.log(`Server is running on: http://${hostname}:${port}`);
// });

/*
    ------- Network layers -------

    TCP - UDP (Transport Layer) -> ports
    Network layer -> IP addresses
    Data Link Layer -> pocket
    Physical Layer -> cabels


    TCP - checks whether data sent over till last bit or not        low speed
          (net, http, https modules in nodejs)

    UDP - just send data not worrying about result (audio, video streaming)                                                      high speed
          (diagram module in nodejs)

*/

/*
    Info about ports and their usage

    https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml  


*/
