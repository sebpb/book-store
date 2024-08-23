import express from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js"
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());


app.use(cors());
// app.use(
// 	cors({
// 		origin: 'http://localhost:5173',
// 		methods: ['GET', 'POST', 'PUT', 'DELETE'],
// 		allowedHeaders: ['Content-Type']
// 	})
// )

app.use('/books', booksRoute);

app.get('/', (request, response) => {
	console.log(request);
	return response.status(234).send('Welcome');
});

mongoose
	.connect(mongoDBURL)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`App is listening to port: ${PORT}`);
		})
	})
	.catch((error) => {
		console.log(error);
	})