import CreditCard from "../models/credit.card.model.js";
import Bill from "../models/bill.model.js";
import Payments from "../../frontend/src/components/payments/payments.js";

/*
 *
 * Get the list of credit cards
 *
 * Get last Generated bill -> Get all bills of a card sort by date
 * Get all the payments made after bill is generated
 *
 * Compare sum of payments with minDue and totalDue and sort the cards into 3 cats: minDue not paid, totalDue not paid, fullyPaid
 *
 * Check last statement generated date is not more than 3 days from bill expected generation date and bill is not added yet.
 *
 * */

export const getDashboardDetails = async (req, res) => {
  try {
    const creditCards = await CreditCard.find({ userId: req.userId });

    const lastBills = await Bill.aggregate([
      { $sort: { generateDate: -1 } },
      { $group: { _id: "$cardId", latestRecord: { $first: "$$ROOT" } } },
      { $replaceRoot: { newRoot: "$latestRecord" } },
    ]);

    const payments = await Payments.aggregate([
      {
        $addFields: {
          filteredBills: {
            $filter: {
              input: "$lastBills",
              as: "bill",
              cond: {
                $and: [
                  { $eq: ["$$bill.cardId", "$cardId"] },
                  { $lt: ["$$bill.generatedDate", "$paymentDate"] },
                ],
              },
            },
          },
        },
      },
      {
        $match: {
          filteredBills: { $ne: [] }, // Only include records with matching bills
        },
      },
    ]);

    const allCurrentPayments = "";
    let minimumDueUnpaidMap = "";
    let totalDueUnpaidMap = "";
    let fullyPaidMap = "";
    let statementNotUpdatedMap = "";

    console.log({ latestRecords: lastBills });

    res.status(200).json({
      success: true,
      data: {
        allCreditCards: creditCards,
        lastBills,
        allCurrentPayments,
        minimumDueUnpaidMap,
        totalDueUnpaidMap,
        fullyPaidMap,
        statementNotUpdatedMap,
      },
    });
  } catch (error) {
    console.log("error in fetching CreditCards:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
