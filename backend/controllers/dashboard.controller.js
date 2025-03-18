import Bill from "../models/bill.model.js";
import CreditCard from "../models/credit.card.model.js";
import Payment from "../models/payment.model.js";

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

    const cardMap = creditCards.reduce((map, card) => {
      map[card._id] = card;
      return map;
    }, {});

    const lastBillsArray = await Bill.aggregate([
      { $sort: { statementDate: -1 } },
      { $group: { _id: "$cardId", latestRecord: { $first: "$$ROOT" } } },
      { $replaceRoot: { newRoot: "$latestRecord" } },
    ]);

    const lastBillsArrayMap = lastBillsArray.reduce((map, bill) => {
      map[bill.cardId] = bill;
      return map;
    }, {});

    const allCurrentPaymentsMap = new Map();

    await Promise.all(
      lastBillsArray.map(async (item) => {
        const currentCardId = item.cardId;
        const statementDate = item.statementDate;

        const payment = await Payment.find({
          userId: req.userId,
          cardId: currentCardId,
          $expr: { $gt: ["$date", statementDate] },
        });

        console.log(payment);

        allCurrentPaymentsMap.set(currentCardId, payment);
      }),
    );

    let minimumDueUnpaidMap = new Map();
    let totalDueUnpaidMap = new Map();
    let fullyPaidMap = new Map();
    let statementNotUpdatedMap = new Map();

    allCurrentPaymentsMap.forEach((values, cardId) => {
      const sumOfPayments = values.reduce((aggregate, payment) => {
        aggregate = aggregate + payment.amount;
        return aggregate;
      }, 0);

      const newBillObject = { ...lastBillsArrayMap.get(cardId), sumOfPayments };

      if (sumOfPayments < lastBillsArrayMap.get(cardId).minimumPayment) {
        minimumDueUnpaidMap.set(cardId, newBillObject);
      }

      if (
        sumOfPayments > lastBillsArrayMap.get(cardId).minimumPayment &&
        sumOfPayments < lastBillsArrayMap.get(cardId).totalPayment
      ) {
        totalDueUnpaidMap.set(cardId, newBillObject);
      }

      if (sumOfPayments >= lastBillsArrayMap.get(cardId).totalPayment) {
        fullyPaidMap.set(cardId, newBillObject);
      }
    });

    res.status(200).json({
      success: true,
      data: {
        allCardMap: cardMap,
        lastBillsMap: lastBillsArrayMap,
        allCurrentPaymentsMap,
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
