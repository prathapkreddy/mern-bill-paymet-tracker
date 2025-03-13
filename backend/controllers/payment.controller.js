import Payment from '../models/payment.model.js';
import mongoose from 'mongoose';

export const addPayment = async (req, res) => {
    const payment = req.body;
    if (!payment.cardId || !payment.date || !payment.amount) {
        return res.status(400).json({ success: false, message: 'Please provide all fields' });
    }

    const newPayment = new Payment({ ...payment, userId: req.userId });

    try {
        await newPayment.save();
        res.status(201).json({ success: true, data: newPayment });
    } catch (error) {
        console.error('Error in adding credit card:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find({ userId: req.userId });
        res.status(200).json({ success: true, data: payments });
    } catch (error) {
        console.log('error in fetching payments:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const updatePayment = async (req, res) => {
    const { id } = req.params;

    const payment = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid Payment Id' });
    }

    try {
        const updatedPayment = await Payment.findByIdAndUpdate({
            _id: id,
            userId: req.userId,
        }, payment, { new: true });
        res.status(200).json({ success: true, data: updatedPayment });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const deletePayment = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid Payment Id' });
    }

    try {
        await Payment.findByIdAndDelete({ _id: id, userId: req.userId });
        res.status(200).json({ success: true, message: 'Payment deleted' });
    } catch (error) {
        console.log('error in deleting Payment:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
