import { useDispatch } from 'react-redux';
import { billsCreateModalToggle, cardsCreateModalToggle, paymentsCreateModalToggle } from '../../store/slices/modals.slice.ts';

export default function CreditCards() {
    const dispatch = useDispatch();

    return (
        <div>
            <button onClick={() => dispatch(billsCreateModalToggle())}> ADD a new Bill</button>
            <br />
            <button onClick={() => dispatch(cardsCreateModalToggle())}> ADD a new Card</button>
            <br />
            <button onClick={() => dispatch(paymentsCreateModalToggle())}> ADD a new payment</button>
        </div>
    );
}
