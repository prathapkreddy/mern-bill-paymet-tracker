import Bill from "../models/bill.model.js";
import mongoose from "mongoose";

export const addBill = async (req, res) => {
  const bill = req.body;
  if (
    !bill.cardId ||
    !bill.statementDate ||
    !bill.dueDate ||
    !bill.minimumDue ||
    !bill.totalDue
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newBill = new Bill({ ...bill, userId: req.userId });

  try {
    await newBill.save();
    res.status(201).json({ success: true, data: newBill });
  } catch (error) {
    console.error("Error in adding bill:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getBills = async (req, res) => {
  try {
    const bills = await Bill.find({ userId: req.userId });
    res.status(200).json({ success: true, data: bills });
  } catch (error) {
    console.log("error in fetching bills:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateBill = async (req, res) => {
  const { id } = req.params;

  const payment = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Payment Id" });
  }

  try {
    const updatedPayment = await Bill.findByIdAndUpdate(
      { _id: id, userId: req.userId },
      payment,
      { new: true },
    );
    res.status(200).json({ success: true, data: updatedPayment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteBill = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Bill Id" });
  }

  try {
    await Bill.findByIdAndDelete({ _id: id, userId: req.userId });
    res.status(200).json({ success: true, message: "Bill deleted" });
  } catch (error) {
    console.log("error in deleting Bill:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
