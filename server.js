import express from 'express';
import cors from 'cors';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
// import 'express-async-errors'
import morgan from 'morgan'

// db and authenticateUser
import connectDB from './db/connect.js';

// routers
import shoesRouter from './routes/shoesRouter.js';

// middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from './middleware/auth.js';

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use(cors())
app.use(express.json()); // makes json data available

app.get('/', (req, res, next) => {
  res.json({ msg: 'Welcome!' })
});

app.use('/api', shoesRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT

async function start() {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    });
  } catch(error) {
    console.log(error)
  }
}

start();