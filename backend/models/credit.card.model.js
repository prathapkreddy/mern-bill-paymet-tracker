import mongoose from 'mongoose';

const CreditCardSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        name: { type: String, required: true },
        type: { type: String, required: true },
        creditLimit: { type: Number, required: true },
        expectedStatementDate: { type: Number, required: true },
    },
    {
        timestamps: true,
    },
);

const CreditCard = mongoose.model('CreditCard', CreditCardSchema);

export default CreditCard;
