import express from 'express';
import cors from 'cors';
import {routes} from './routes';
import cookieParser from 'cookie-Parser';

require('dotenv').config()
const port = process.env.PORT || 3000;

import {createConnection} from 'typeorm';

createConnection().then(connection => {
  console.log("Connection established");
});

const app = express();

// load middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials:true,
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
