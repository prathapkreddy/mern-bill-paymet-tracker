import Bill from '../models/bill.model.js';
import CreditCard from '../models/credit.card.model.js';
import Payment from '../models/payment.model.js';

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

const getCreditCardsMap = async(userId)=>{
  const creditCards = await CreditCard.find({ userId});
   return creditCards.reduce((map, card) => {
    map.set(card._id, card);
    return map;
  }, new Map());
}

const getLatestBillsMap = async(userId)=>{
  const lastBillsArray = await Bill.aggregate([
    { $match: { userId: userId } },
    { $sort: { statementDate: -1 } },
    { $group: { _id: "$cardId", latestRecord: { $first: "$$ROOT" } } },
    { $replaceRoot: { newRoot: "$latestRecord" } },
  ]);

  return lastBillsArray.reduce((map, bill) => {
    map.set(bill.cardId, bill);
    return map;
  }, new Map());
}

const getPaymentsMap = async (userId,latestBillsMap) =>{
  const allCurrentPaymentsMap = new Map();
  const lastBillsArray = Array.from(latestBillsMap.values());
  await Promise.all(
      lastBillsArray.map(async (item) => {
        const currentCardId = item.cardId;
        const statementDate = item.statementDate;

        const payment = await Payment.find({
          userId: userId,
          cardId: currentCardId,
          $expr: { $gt: ["$date", statementDate] },
        });
        allCurrentPaymentsMap.set(currentCardId, payment);
      }),
  );
  return allCurrentPaymentsMap;
}

export const getDashboardDetails = async (req, res) => {
  try {
    const creditCardsMap = await getCreditCardsMap(req.userId)
    const latestBillsMap =await getLatestBillsMap(req.userId)
    const paymentsMap= await getPaymentsMap(req.userId,latestBillsMap)

    let minimumDueUnpaidMap = new Map();
    let totalDueUnpaidMap = new Map();
    let fullyPaidMap = new Map();
    let statementNotUpdatedMap = new Map();

    paymentsMap.forEach((values, cardId) => {
      const sumOfPayments = values.reduce((aggregate, payment) => {
        aggregate = aggregate + payment.amount;
        return aggregate;
      }, 0);

      const newBillObject = { ...latestBillsMap.get(cardId), sumOfPayments };

      if (sumOfPayments < latestBillsMap.get(cardId).minimumDue) {
        minimumDueUnpaidMap.set(cardId, newBillObject);
      }

      if (
        sumOfPayments > latestBillsMap.get(cardId).minimumDue &&
        sumOfPayments < latestBillsMap.get(cardId).totalDue
      ) {
        totalDueUnpaidMap.set(cardId, newBillObject);
      }

      if (sumOfPayments >= latestBillsMap.get(cardId).totalDue) {
        fullyPaidMap.set(cardId, newBillObject);
      }

      if (
        new Date().getDate() >=
        latestBillsMap.get(cardId).statementDate.getDate() + 3
      ) {
        statementNotUpdatedMap.set(cardId, newBillObject);
      }
    });

    res.status(200).json({
      success: true,
      data: {
        creditCardsMap: Object.fromEntries(creditCardsMap),
        latestBillsMap: Object.fromEntries(latestBillsMap),
        paymentsMap: Object.fromEntries(paymentsMap),
        minimumDueUnpaidMap: Object.fromEntries(minimumDueUnpaidMap),
        totalDueUnpaidMap: Object.fromEntries(totalDueUnpaidMap),
        fullyPaidMap: Object.fromEntries(fullyPaidMap),
        statementNotUpdatedMap: Object.fromEntries(statementNotUpdatedMap),
      },
    });
  } catch (error) {
    console.log("error in fetching CreditCards:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
