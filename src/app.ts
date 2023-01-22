import express, { Request, Response } from "express";
import cors from "cors";
import { checkWord, ICheckWord } from "./checkWord";

const server = express();
const port = 3001;

export const wordBank = [
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

server.use(cors());
server.use(express.json());

function getRandomElement<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

export let theWord = getRandomElement(wordBank);

server.get("/newWord", (req: Request, res: Response) => {
	theWord = getRandomElement(wordBank);
	res.status(200).send(theWord);
});

server.get("/word", (req: Request, res: Response) => {
	res.status(200).send(theWord);
});

server.post("/checkWord", (req: Request, res: Response) => {
	const data = req.body;
	try {
		const checkResult: ICheckWord = checkWord(data.userGuess, theWord);
		res.json(checkResult);
	} catch (e) {
		res.status(400).send({ message: "error" });
	}
});

server.listen(port, () => {
	console.log(`server is listening in http://localhost:${port}`);
});
