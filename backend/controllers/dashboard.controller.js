import CreditCard from '../models/credit.card.model.js';
import Bill from '../models/bill.model.js';


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

export const getDashboardDetails = async (req,res)=>{
    try {
        const creditCards = await CreditCard.find({ userId: req.userId });

        const latestRecords = await Bill.aggregate([
            {
                $sort: { generateDate: -1 }, // Sort by generateDate in descending order
            },
            {
                $group: {
                    _id: "$cardId", // Group by cardId
                    latestRecord: { $first: "$$ROOT" }, // Get the first record after sorting (latest)
                },
            },
            {
                $replaceRoot: { newRoot: "$latestRecord" }, // Replace the root to get the record itself
            },
        ]);
        
        const allCurrentPayments = '';
        let minimumDueUnpaidMap = '';
        let totalDueUnpaidMap = '';
        let fullyPaidMap = '';
        let statementNotUpdatedMap = '';

        console.log({latestRecords})

        res.status(200).json({ success: true, data: {
            allCreditCards:creditCards,
            lastBills:latestRecords,
                allCurrentPayments,
                minimumDueUnpaidMap,totalDueUnpaidMap,fullyPaidMap,statementNotUpdatedMap
            } });
    } catch (error) {
        console.log('error in fetching CreditCards:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}