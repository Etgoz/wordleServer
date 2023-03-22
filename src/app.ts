import express, { Request, Response } from 'express';
import cors from 'cors';
import { checkWord, ICheckWord } from './checkWord';

const server = express();
const port = process.env.PORT || 3001;

export const wordBank = ['אלבום', 'קליפה', 'פריצה', 'פתאום', 'ביטוח', 'סידור', 'הבטחה', 'וירוס', 'מילים', 'ארגון', 'אתמול', 'מחמצת', 'תמריץ', 'תרגיל', 'ניתוח'];

server.use(cors());
server.use(express.json());

server.get('/', (req: Request, res: Response) => {
  res.send('server is running');
});

server.get('/wordnum', (req: Request, res: Response) => {
  res.status(200).send(String(Math.floor(Math.random() * wordBank.length)));
});

server.get('/theword/:wordnum', (req: Request, res: Response) => {
  const wordnum = Number(req.params.wordnum);
  res.status(200).send(wordBank[wordnum]);
});

server.post('/checkWord', (req: Request, res: Response) => {
  const data = req.body;
  try {
    const checkResult: ICheckWord = checkWord(data.userGuess, data.wordNum);
    res.json(checkResult);
  } catch (e) {
    res.status(400).send({ message: 'error' });
  }
});

server.listen(port, () => {
  console.log(`server is listening in https://wordleserver-production.up.railway.app`);
});
