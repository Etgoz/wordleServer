import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { checkWord, IGussedLetters, IRefMatrix, ICheckWord } from "./checkWord";

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
];

interface ICheckWordParams {
	userGuess: IRefMatrix[];
	curRow: number;
	guessedLetters: IGussedLetters;
}

server.use(cors());

function getRandomElement<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

export let theWord = "";

server.get("/word", (req: Request, res: Response) => {
	theWord = getRandomElement(wordBank);
	res.send(theWord);
});

server.post("/checkWord", bodyParser, (req: Request, res: Response) => {
	const data: ICheckWordParams = req.body;
	try {
		const checkResult: ICheckWord = checkWord(
			data.userGuess,
			data.curRow,
			data.guessedLetters
		);
		res.json(checkResult);
	} catch (e) {
		res.status(400).send({ message: "error" });
	}
});

server.listen(port, () => {
	console.log(`server is listening in http://localhost:${port}`);
});
