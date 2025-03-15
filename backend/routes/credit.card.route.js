import express from 'express';

import {
    addCreditCard,
    deleteCreditCard,
    getCreditCards,
    getCreditCardsById,
    updatedCreditCard,
} from '../controllers/credit.card.controller.js';

const router = express.Router();

router.post('/add', addCreditCard);
router.put('/:id', updatedCreditCard);
router.delete('/:id', deleteCreditCard);
router.get('/', getCreditCards);
router.get('/:cardId', getCreditCardsById);


export default router;
