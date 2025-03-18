import { useLocation, useParams } from 'react-router';
import { useGetCreditCardDetailsByIdQuery } from '@/store/slices/api.slice.ts';
import { useDispatch } from 'react-redux';
import { billsCreateModalToggle, paymentsCreateModalToggle } from '@/store/slices/modals.slice.ts';
import { CirclePlusIcon, MoveLeftIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PaymentsTable from '@/components/payments/payments.table.tsx';
import { Button } from '@/components/ui/button.tsx';
import { currencyFormatter } from '@/shared.components/common.utils.ts';
import BillsTable from '@/components/bills/bills.table.tsx';

export default function CreditCardDetails() {
    const { cardId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { data: creditCardDetails, isLoading: creditCardDetailsIsLoading, isError: creditCardDetailsIsError } = useGetCreditCardDetailsByIdQuery(cardId);
    if (creditCardDetailsIsLoading) return <div>Loading...</div>;
    if (creditCardDetailsIsError) return <div>Error loading posts.</div>;

    const addBillDispatch = () => {
        dispatch(billsCreateModalToggle());
    };

    const addPaymentDispatch = () => {
        dispatch(paymentsCreateModalToggle());
    };

    const goToLastPage = () => {
        const pathSegments = location.pathname.split('/').filter(Boolean);
        pathSegments.pop();
        const newPath = `/${pathSegments.join('/')}`;
        navigate(newPath || '/');
    };

    return (
        <div>
            <div className={'flex align-middle mb-2'}>
                <MoveLeftIcon className={'cursor-pointer'} onClick={goToLastPage} />
                <div className={'text-xl font-medium px-4'}>Credit Cards</div>
            </div>

            <div className={'text-2xl py-4'}>{creditCardDetails.data.cardName}</div>

            <div className={'px-2'}>
                <div className={'grid lg:grid-cols-2 text-lg'}>
                    <div className={'col-span-1 grid grid-cols-[1.5fr_0.5fr] py-2'}>
                        <div>Type:</div>
                        <div>{creditCardDetails.data.cardType?.toLowerCase()} </div>
                        <div>Credit Limit:</div> <div>{currencyFormatter(creditCardDetails.data.creditLimit)}</div>
                        <div>Current Minimum Payment Due:</div> <div>{currencyFormatter(creditCardDetails.data.creditLimit)}</div>
                        <div>Current Total Payment Due:</div> <div>{currencyFormatter(creditCardDetails.data.creditLimit)}</div>
                    </div>
                    <div className={'grid gap-2 py-2'}>
                        <Button variant={'outline'} className={'flex justify-center items-center space-x-2'} onClick={addBillDispatch}>
                            <CirclePlusIcon size={15} />
                            <span>Add a Bill</span>
                        </Button>
                        <Button variant={'outline'} className={'flex justify-center items-center space-x-2'} onClick={addPaymentDispatch}>
                            <CirclePlusIcon size={15} />
                            <span>Add a Payment</span>
                        </Button>
                    </div>
                </div>

                <div className={'text-xl py-4'}>Statements</div>
                <BillsTable bills={creditCardDetails.data.bills} />

                <div className={'text-xl py-4'}>Payments</div>
                <PaymentsTable payments={creditCardDetails.data.payments} showCardName={false} />
            </div>
        </div>
    );
}
