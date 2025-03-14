import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
    bills: {
        updateModal: { open: boolean; values: any };
        createModal: { open: boolean };
    };
    payments: {
        updateModal: { open: boolean; values: any };
        createModal: { open: boolean };
    };
    cards: {
        updateModal: { open: boolean; values: any };
        createModal: { open: boolean };
    };
}

const initialState: ModalState = {
    bills: {
        updateModal: { open: false, values: {} },
        createModal: { open: false },
    },
    payments: {
        updateModal: { open: false, values: {} },
        createModal: { open: false },
    },
    cards: {
        updateModal: { open: false, values: {} },
        createModal: { open: false },
    },
};

export const ModalsSlice = createSlice({
    name: 'Modals',
    initialState,
    reducers: {
        billsUpdateModalToggle: (state, action) => {
            state.bills.updateModal = {
                open: !state.bills.updateModal.open,
                values: action?.payload,
            };
        },
        paymentsUpdateModalToggle: (state, action) => {
            state.payments.updateModal = {
                open: !state.payments.updateModal.open,
                values: action.payload,
            };
        },
        cardsUpdateModalToggle: (state, action) => {
            state.cards.updateModal = {
                open: !state.cards.updateModal.open,
                values: action.payload,
            };
        },
        billsCreateModalToggle: state => {
            state.bills.createModal = { open: !state.bills.createModal.open };
        },
        paymentsCreateModalToggle: state => {
            state.payments.createModal = { open: !state.payments.createModal.open };
        },
        cardsCreateModalToggle: state => {
            state.cards.createModal = { open: !state.cards.createModal.open };
        },
    },
});

export const { billsUpdateModalToggle, paymentsUpdateModalToggle, billsCreateModalToggle, paymentsCreateModalToggle, cardsUpdateModalToggle, cardsCreateModalToggle } = ModalsSlice.actions;
export default ModalsSlice.reducer;
