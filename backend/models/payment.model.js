import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
    {
        cardId: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const Payment = mongoose.model("Payment", PaymentSchema);

export default Payment;
