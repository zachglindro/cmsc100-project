import express from 'express';
import router from './router.js';
import cors from 'cors';

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors())

router(app)

app.listen(3001, () => {console.log("API listening at port 3001.")});