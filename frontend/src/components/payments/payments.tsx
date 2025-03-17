import { useGetCreditCardsQuery, useGetPaymentsQuery } from '@/store/slices/api.slice.ts';
import { paymentDeleteModalToggle, paymentsCreateModalToggle, paymentsUpdateModalToggle } from '@/store/slices/modals.slice.ts';

import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { CirclePlusIcon, EditIcon, TrashIcon } from 'lucide-react';

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
            <div
                onClick={() => dispatch(paymentsCreateModalToggle())}
                className="w-[75%] lg:w-[50%] text-xl font-bold flex mx-[12.5%] lg:mx-[25%] justify-center p-4 mb-4 rounded-xl  shadow-lg cursor-pointer transition border-1"
            >
                <CirclePlusIcon size={'30'} /> <span className={'pl-2'}>Add a payment</span>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Card Name</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.data.map((payment: any, index: number) => (
                            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}>
                                <td className={'px-4 py-3'}>{format(payment?.date, 'PP')}</td>
                                <td className={'px-4 py-3'}>{cardNameMap.get(payment?.cardId)}</td>
                                <td className={'px-4 py-3'}>{payment?.amount}</td>
                                <td className={'px-4 py-3 flex  '}>
                                    <EditIcon
                                        size={20}
                                        className={'text-blue-500 cursor-pointer'}
                                        onClick={() =>
                                            editPaymentDispatch({
                                                name: cardNameMap.get(payment?.cardId),
                                                amount: payment?.amount,
                                                date: payment?.date,
                                                id: payment?._id,
                                            })
                                        }
                                    />
                                    <TrashIcon size={20} onClick={() => deletePaymentDispatch(payment._id)} className={'cursor-pointer text-red-500 ml-2'} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
