import { useGetCreditCardsQuery, useGetPaymentsQuery } from '@/store/slices/api.slice.ts';
import { paymentDeleteModalToggle, paymentsCreateModalToggle, paymentsUpdateModalToggle } from '@/store/slices/modals.slice.ts';

import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { EditIcon, TrashIcon } from 'lucide-react';

export default function Payments() {
    const dispatch = useDispatch();
    const { data: payments, isLoading: paymentsIsLoading, isError: paymentsIsError } = useGetPaymentsQuery(undefined);
    const { data: creditCards, isLoading: creditCardsIsLoading, isError: creditCardsIsError } = useGetCreditCardsQuery(undefined);

    let cardNameMap = new Map<string, string>();

    if (paymentsIsLoading) {
        return <div>Loading...</div>;
    }

    if (paymentsIsError) {
        return <div>Error...</div>;
    }

    if (!creditCardsIsError && !creditCardsIsLoading) {
        creditCards.data.forEach((card: any) => {
            cardNameMap.set(card._id, card.name);
        });
    }

    const editPaymentDispatch = (payment: any) => {
        dispatch(paymentsUpdateModalToggle(payment));
    };

    const deletePaymentDispatch = async (id: any) => {
        dispatch(paymentDeleteModalToggle({ id }));
    };

    return (
        <div>
            <div className="flex items-center justify-center p-6 rounded-xl text-gray-500 shadow-lg bg-gray-100 hover:bg-gray-200 cursor-pointer transition">
                <button onClick={() => dispatch(paymentsCreateModalToggle())} className="text-3xl font-bold text-gray-400 hover:text-gray-600">
                    +
                </button>
            </div>

            <table className="table-auto">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Card Name</th>
                        <th>Amount</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {payments.data.map((payment: any) => (
                        <tr className={'my-4'} key={payment.cardId}>
                            <td className={'p-2'}>{format(payment?.date, 'PPP')}</td>
                            <td className={'p-2'}>{cardNameMap.get(payment?.cardId)}</td>
                            <td className={'p-2'}>{payment?.amount}</td>
                            <td className={'p-2'}>
                                <EditIcon
                                    onClick={() =>
                                        editPaymentDispatch({
                                            name: cardNameMap.get(payment?.cardId),
                                            amount: payment?.amount,
                                            date: payment?.date,
                                            id: payment?._id,
                                        })
                                    }
                                />
                            </td>
                            <td className={'p-2'}>
                                <TrashIcon onClick={() => deletePaymentDispatch(payment._id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
