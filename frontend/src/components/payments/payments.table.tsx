import { format } from 'date-fns';
import { currencyFormatter } from '@/shared.components/common.utils.ts';
import { EditIcon, TrashIcon } from 'lucide-react';
import { paymentDeleteModalToggle, paymentsUpdateModalToggle } from '@/store/slices/modals.slice.ts';
import { useDispatch } from 'react-redux';
import { useGetCreditCardsQuery } from '@/store/slices/api.slice.ts';

export default function PaymentsTable(props: any) {
    const dispatch = useDispatch();
    const { payments, showCardName } = props;
    const { data: creditCards, isLoading: creditCardsIsLoading, isError: creditCardsIsError } = useGetCreditCardsQuery(undefined);

    let cardNameMap = new Map<string, string>();
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
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                            <th className="px-4 py-3">Date</th>
                            {showCardName && <th className="px-4 py-3">Card Name</th>}
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment: any, index: number) => (
                            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 whitespace-nowrap`}>
                                <td className={'px-4 py-3'}>{format(payment?.date, 'PP')}</td>
                                {showCardName && <td className={'px-4 py-3'}>{cardNameMap.get(payment?.cardId)}</td>}
                                <td className={'px-4 py-3'}>{currencyFormatter(Number(payment?.amount))}</td>
                                <td className={'px-4 py-3 flex'}>
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
        </>
    );
}
