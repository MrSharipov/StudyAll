const net = require("net");
const readline = require("readline/promises");

const PORT = 4020;
const HOST = "52.199.96.126";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

let id;
const socket = net.createConnection({ host: HOST, port: PORT }, async () => {
  console.log("Connected to the server!");

  const ask = async () => {
    const message = await rl.question("Enter a message > ");
    //Move cursor one line up
    await moveCursor(0, -1);

    // clear all in current cursor
    await clearLine(0);

    socket.write(`${id}-message-${message}`);
  };

  socket.on("data", async (data) => {
    console.log();
    await moveCursor(0, -1);
    // clear all in current cursor
    await clearLine(0);

    if (data.toString("utf-8").substring(0, 2) === "id") {
      // When we are getting id

      //everything from the third character up till the end
      id = data.toString("utf-8").substring(3);
      console.log(`Your id is: ${id}`);
    } else {
      // When we are getting message
      console.log(data.toString("utf-8"));
    }

    ask();
  });

  ask();
});

socket.on("end", () => {
  console.log("Connection was ended!");
});
