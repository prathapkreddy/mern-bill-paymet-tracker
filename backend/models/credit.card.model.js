import mongoose from "mongoose";

const CreditCardSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        creditLimit: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const CreditCard = mongoose.model("CreditCard", CreditCardSchema);

export default CreditCard;
