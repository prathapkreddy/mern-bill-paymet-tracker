import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store.ts';
import {
    billDeleteModalToggle,
    billsCreateModalToggle,
    billsUpdateModalToggle,
    cardDeleteModalToggle,
    cardsCreateModalToggle,
    cardsUpdateModalToggle,
    paymentDeleteModalToggle,
    paymentsCreateModalToggle,
    paymentsUpdateModalToggle,
} from '@/store/slices/modals.slice.ts';
import BillCreateUpdateModal from './bill.create.update.modal.tsx';
import PaymentCreateUpdateModal from './payment.create.update.modal.tsx';
import CardCreateUpdateModal from './card.create.update.modal.tsx';
import DeleteModal from '@/components/modals/delete.modal.tsx';

export default function ModalContainer() {
    const dispatch = useDispatch();
    const modals = useSelector((state: RootState) => state.modals);

    const hideBillsCreateModal = () => {
        dispatch(billsCreateModalToggle());
    };

    const hidePaymentsCreateModal = () => {
        dispatch(paymentsCreateModalToggle());
    };

    const hideCardsCreateModal = () => {
        dispatch(cardsCreateModalToggle());
    };

    const hideBillUpdateModal = () => {
        dispatch(billsUpdateModalToggle({}));
    };

    const hidePaymentUpdateModal = () => {
        dispatch(paymentsUpdateModalToggle({}));
    };

    const hideCardUpdateModal = () => {
        dispatch(cardsUpdateModalToggle({}));
    };

    const hideCardDeleteModal = () => {
        dispatch(cardDeleteModalToggle({}));
    };

    const hidePaymentDeleteModal = () => {
        dispatch(paymentDeleteModalToggle({}));
    };

    const hideBillDeleteModal = () => {
        dispatch(billDeleteModalToggle({}));
    };

    return (
        <>
            {modals.bills.updateModal.open && <BillCreateUpdateModal hide={hideBillUpdateModal} isCreate={false} values={modals.bills.updateModal.values} />}
            {modals.bills.createModal.open && <BillCreateUpdateModal hide={hideBillsCreateModal} isCreate={true} />}

            {modals.payments.updateModal.open && <PaymentCreateUpdateModal hide={hidePaymentUpdateModal} isCreate={false} values={modals.payments.updateModal.values} />}
            {modals.payments.createModal.open && <PaymentCreateUpdateModal hide={hidePaymentsCreateModal} isCreate={true} />}

            {modals.cards.updateModal.open && <CardCreateUpdateModal hide={hideCardUpdateModal} isCreate={false} values={modals.cards.updateModal.values} />}
            {modals.cards.createModal.open && <CardCreateUpdateModal hide={hideCardsCreateModal} isCreate={true} />}

            {modals.bills.deleteModal.open && <DeleteModal hide={hideBillDeleteModal} type="bill" id={modals.bills.deleteModal.id} />}
            {modals.cards.deleteModal.open && <DeleteModal hide={hideCardDeleteModal} type="card" id={modals.cards.deleteModal.id} />}
            {modals.payments.deleteModal.open && <DeleteModal hide={hidePaymentDeleteModal} type="payment" id={modals.payments.deleteModal.id} />}
        </>
    );
}
