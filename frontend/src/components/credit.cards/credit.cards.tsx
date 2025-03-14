import { useDispatch } from 'react-redux';
import { billsCreateModalToggle, cardsCreateModalToggle, paymentsCreateModalToggle } from '../../store/slices/modals.slice.ts';

export default function CreditCards() {
    const dispatch = useDispatch();

    return (
        <div>
            <button onClick={() => dispatch(cardsCreateModalToggle())}> New Card</button>
            <br />
            <button onClick={() => dispatch(billsCreateModalToggle())}> New Bill</button>
            <br />
            <button onClick={() => dispatch(paymentsCreateModalToggle())}> New Payment</button>
        </div>
    );
}
