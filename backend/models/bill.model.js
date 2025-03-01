import mongoose from "mongoose";

const BillSchema = new mongoose.Schema(
    {
        cardId: {
            type: String,
            required: true,
        },
        statementDate: {
            type: Date,
            required: true,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        minimumDue: {
            type: Number,
            required: true,
        },
        totalDue: {
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

const Bill = mongoose.model("Bill", BillSchema);

export default Bill;
