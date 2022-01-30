import express from 'express';
import cors from 'cors';
import {routes} from './routes';

require('dotenv').config()
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5000"]
}));

routes(app);

app.get('/',(req, res) => {
const x="hello world";
  res.send(x);
});



app.listen(port,()=>{
  console.log(`listening on port ${port}`);
});
