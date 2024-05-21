import express from 'express';
import router from './router.js';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors())
app.use(bodyParser.json())

router(app)

app.listen(3001, () => {console.log("API listening at port 3001.")});