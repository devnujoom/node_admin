import express from 'express';
import cors from 'cors';

require('dotenv').config()
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5000"]
}));

app.get('/',(req, res) => {
  res.send("hello world!");
});

app.listen(port,()=>{
  console.log(`listening on port ${port}`);
});
