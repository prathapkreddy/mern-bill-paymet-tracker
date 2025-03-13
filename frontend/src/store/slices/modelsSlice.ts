import { createSlice } from '@reduxjs/toolkit';

interface ModelsState {
    bills: {
        updateModel: boolean,
        createModal: boolean,
    },
    payments: {
        updateModel: boolean,
        createModal: boolean,
    },
    cards: {
        updateModel: boolean,
        createModal: boolean,
    },
}

const initialState: ModelsState = {
    bills: {
        updateModel: false,
        createModal: false,
    },
    payments: {
        updateModel: false,
        createModal: false,
    },
    cards: {
        updateModel: false,
        createModal: false,
    },
};

export const modelsSlice = createSlice({
    name: 'models',
    initialState,
    reducers: {
        billsUpdateModelToggle: (state) => {
            state.bills.updateModel = !state.bills.updateModel;
        },
        paymentsUpdateModelToggle: (state) => {
            state.payments.updateModel = !state.payments.updateModel;
        },
        cardsUpdateModelToggle: (state) => {
            state.cards.updateModel = !state.cards.updateModel;
        },
        billsCreateModalToggle: (state) => {
            state.bills.createModal = !state.bills.createModal;
        },
        paymentsCreateModalToggle: (state) => {
            state.payments.createModal = !state.payments.createModal;
        },
        cardsCreateModalToggle: (state) => {
            state.cards.createModal = !state.cards.createModal;
        },
    },
});

export const {
    billsUpdateModelToggle,
    paymentsUpdateModelToggle,
    billsCreateModalToggle,
    paymentsCreateModalToggle,
    cardsUpdateModelToggle,
    cardsCreateModalToggle,
} = modelsSlice.actions;
export default modelsSlice.reducer;