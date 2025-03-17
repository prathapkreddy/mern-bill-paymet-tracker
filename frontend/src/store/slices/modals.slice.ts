import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
    bills: {
        updateModal: { open: boolean; values: any };
        createModal: { open: boolean };
        deleteModal: { open: boolean; id?: string };
    };
    payments: {
        updateModal: { open: boolean; values: any };
        createModal: { open: boolean };
        deleteModal: { open: boolean; id?: string };
    };
    cards: {
        updateModal: { open: boolean; values: any };
        createModal: { open: boolean };
        deleteModal: { open: boolean; id?: string };
    };
}

const initialState: ModalState = {
    bills: {
        updateModal: { open: false, values: {} },
        createModal: { open: false },
        deleteModal: { open: false, id: '' },
    },
    payments: {
        updateModal: { open: false, values: {} },
        createModal: { open: false },
        deleteModal: { open: false, id: '' },
    },
    cards: {
        updateModal: { open: false, values: {} },
        createModal: { open: false },
        deleteModal: { open: false, id: '' },
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
        billDeleteModalToggle: (state, action) => {
            state.bills.deleteModal = { open: !state.bills.deleteModal.open, id: action?.payload?.id };
        },
        paymentDeleteModalToggle: (state, action) => {
            state.payments.deleteModal = { open: !state.payments.deleteModal.open, id: action?.payload?.id };
        },
        cardDeleteModalToggle: (state, action) => {
            state.cards.deleteModal = { open: !state.cards.deleteModal.open, id: action?.payload?.id };
        },
    },
});

export const {
    billsUpdateModalToggle,
    paymentsUpdateModalToggle,
    billsCreateModalToggle,
    paymentsCreateModalToggle,
    cardsUpdateModalToggle,
    cardsCreateModalToggle,
    billDeleteModalToggle,
    paymentDeleteModalToggle,
    cardDeleteModalToggle,
} = ModalsSlice.actions;
export default ModalsSlice.reducer;
