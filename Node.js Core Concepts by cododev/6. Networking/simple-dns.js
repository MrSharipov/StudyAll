const dns = require("node:dns/promises");

(async () => {
  const res = await dns.lookup("daryo.uz");
  console.log(res);
})();
