import express from 'express';
import dotenv from 'dotenv';
import webhookRoutes from './routes/webhookRoutes';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/', webhookRoutes);

export default app;
