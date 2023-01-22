"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.theWord = exports.wordBank = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const checkWord_1 = require("./checkWord");
const server = (0, express_1.default)();
const port = 3001;
exports.wordBank = [
    "אלבום",
    "קליפה",
    "פריצה",
    "פתאום",
    "ביטוח",
    "סידור",
    "הבטחה",
    "וירוס",
    "מילים",
    "ארגון",
    "אתמול",
    "מחמצת",
];
server.use((0, cors_1.default)());
server.use(express_1.default.json());
function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
exports.theWord = getRandomElement(exports.wordBank);
server.get("/newWord", (req, res) => {
    exports.theWord = getRandomElement(exports.wordBank);
    res.status(200).send(exports.theWord);
});
server.get("/word", (req, res) => {
    res.status(200).send(exports.theWord);
});
server.post("/checkWord", (req, res) => {
    const data = req.body;
    try {
        const checkResult = (0, checkWord_1.checkWord)(data.userGuess, exports.theWord);
        res.json(checkResult);
    }
    catch (e) {
        res.status(400).send({ message: "error" });
    }
});
server.listen(port, () => {
    console.log(`server is listening in http://localhost:${port}`);
});
