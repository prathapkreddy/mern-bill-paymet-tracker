import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js';
import creditCardRoutes from './routes/credit.card.route.js';
import paymentRoutes from './routes/payments.route.js';
import billRoutes from './routes/bill.route.js';
import cors from 'cors';
import { authMiddleware } from './controllers/auth.middleware.controller.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(cors());
app.use(express.json());


app.get('/api-health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'All systems are operational',
        timestamp: new Date().toISOString(),
    });
});

app.use('/api', authMiddleware);

app.use('/api/credit-cards', creditCardRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/bills', billRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log('Server started at http://localhost:' + PORT);
});
