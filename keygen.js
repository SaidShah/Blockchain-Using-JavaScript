const Keygen = require("elliptic").ec;
const ec = new Keygen("secp256k1");

const key = ec.genKeyPair();
const publicKey = key.getPublic("hex");
const privateKey = key.getPrivate("hex");

console.log(publicKey, " PUBLIC KEY ")

console.log(privateKey, " PRIVATE KEY")