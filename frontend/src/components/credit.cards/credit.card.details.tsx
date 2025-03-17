import { useParams } from 'react-router';
import { useGetCreditCardDetailsByIdQuery } from '@/store/slices/api.slice.ts';
import { useDispatch } from 'react-redux';
import { billsCreateModalToggle, paymentsCreateModalToggle } from '@/store/slices/modals.slice.ts';

export default function CreditCardDetails() {
    const { cardId } = useParams();
    const dispatch = useDispatch();

    const { data: creditCardDetails, isLoading, isError } = useGetCreditCardDetailsByIdQuery(cardId);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading posts.</div>;

    const addBillDispatch = () => {
        dispatch(billsCreateModalToggle());
    };

    const addPaymentDispatch = () => {
        dispatch(paymentsCreateModalToggle());
    };

    return (
        <div>
            <div>Name: {creditCardDetails.data.cardName}</div>
            <div>Type: {creditCardDetails.data.cardType}</div>
            <div>Credit Limit: {creditCardDetails.data.creditLimit}</div>
            <div onClick={addBillDispatch}>Add a Bill</div>
            <div onClick={addPaymentDispatch}>Add a Payment</div>

            <div>
                <div>Latest Bill</div>
            </div>
            <div>
                <div>Payments</div>
            </div>
        </div>
    );
}
