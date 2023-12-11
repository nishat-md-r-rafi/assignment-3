import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app: Application = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.json('He aaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
});

export default app;
