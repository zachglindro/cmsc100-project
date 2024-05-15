import express from 'express';
import router from './router.js';

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: false}));

router(app)

app.listen(3001, () => {console.log("API listening at port 3001.")});