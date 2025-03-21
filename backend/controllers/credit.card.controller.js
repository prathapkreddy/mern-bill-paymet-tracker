import CreditCard from "../models/credit.card.model.js";
import mongoose from "mongoose";
import Payment from "../models/payment.model.js";
import Bill from "../models/bill.model.js";

export const addCreditCard = async (req, res) => {
  const creditCard = req.body;
  if (!creditCard.name || !creditCard.type || !creditCard.creditLimit) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newCreditCard = new CreditCard({ ...creditCard, userId: req.userId });

  try {
    await newCreditCard.save();
    res.status(201).json({ success: true, data: newCreditCard });
  } catch (error) {
    console.error("Error in adding credit card:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getCreditCards = async (req, res) => {
  try {
    const creditCards = await CreditCard.find({ userId: req.userId });
    res.status(200).json({ success: true, data: creditCards });
  } catch (error) {
    console.log("error in fetching CreditCards:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getCreditCardsById = async (req, res) => {
  const { cardId } = req.params;

  try {
    const creditCard = await CreditCard.find({
      _id: cardId,
      userId: req.userId,
    });
    const payments = await Payment.find({ cardId, userId: req.userId });
    const bills = await Bill.find({ cardId, userId: req.userId });

    const data = {
      cardName: creditCard[0].name,
      cardType: creditCard[0].type,
      creditLimit: creditCard[0].creditLimit,
      payments,
      bills,
    };

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log("error in fetching CreditCards:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updatedCreditCard = async (req, res) => {
  const { id } = req.params;

  const creditCard = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid CreditCard Id" });
  }

  try {
    const updatedCreditCard = await CreditCard.findByIdAndUpdate(
      {
        _id: id,
        userId: req.userId,
      },
      creditCard,
      { new: true },
    );
    res.status(200).json({ success: true, data: updatedCreditCard });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteCreditCard = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    await CreditCard.findByIdAndDelete({ _id: id, userId: req.userId });
    await Payment.deleteMany({ cardId: id, userId: req.userId });
    await Bill.deleteMany({ cardId: id, userId: req.userId });

    res.status(200).json({ success: true, message: "CreditCard deleted" });
  } catch (error) {
    console.log("error in deleting CreditCard:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
