import { format } from 'date-fns';
import { currencyFormatter } from '@/shared.components/common.utils.ts';
import { EditIcon, TrashIcon } from 'lucide-react';
import { billDeleteModalToggle, billsUpdateModalToggle } from '@/store/slices/modals.slice.ts';
import { useDispatch } from 'react-redux';
import { useGetCreditCardsQuery } from '@/store/slices/api.slice.ts';

export default function BillsTable(props: any) {
    const dispatch = useDispatch();
    const { bills } = props;

    const { data: creditCards, isLoading: creditCardsIsLoading, isError: creditCardsIsError } = useGetCreditCardsQuery(undefined);
    if (creditCardsIsError || creditCardsIsLoading) return <div>Loading...</div>;

    let cardNameMap = new Map<string, string>();
    if (!creditCardsIsError && !creditCardsIsLoading) {
        creditCards.data.forEach((card: any) => {
            cardNameMap.set(card._id, card.name);
        });
    }

    const editBillDispatch = (bill: any) => {
        dispatch(billsUpdateModalToggle(bill));
    };

    const deleteBillDispatch = async (id: any) => {
        dispatch(billDeleteModalToggle({ id }));
    };

    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                            <th className="px-4 py-3">Generation Date</th>
                            <th className="px-4 py-3">Minimum Due</th>
                            <th className="px-4 py-3">Due Date</th>
                            <th className="px-4 py-3">Total Due</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.map((bill: any, index: number) => (
                            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 whitespace-nowrap`}>
                                <td className={'px-4 py-3'}>{format(bill?.statementDate, 'PP')}</td>
                                <td className={'px-4 py-3'}>{currencyFormatter(Number(bill?.minimumDue))}</td>
                                <td className={'px-4 py-3'}>{format(bill?.dueDate, 'PP')}</td>
                                <td className={'px-4 py-3'}>{currencyFormatter(Number(bill?.totalDue))}</td>
                                <td className={'px-4 py-3 flex'}>
                                    <EditIcon
                                        size={20}
                                        className={'text-blue-500 cursor-pointer'}
                                        onClick={() =>
                                            editBillDispatch({
                                                _id:bill?._id,
                                                name: cardNameMap.get(bill?.cardId),
                                                statementDate: bill?.statementDate,
                                                dueDate: bill?.dueDate,
                                                minimumDue: bill?.minimumDue,
                                                totalDue: bill?.totalDue,
                                            })
                                        }
                                    />
                                    <TrashIcon size={20} onClick={() => deleteBillDispatch(bill._id)} className={'cursor-pointer text-red-500 ml-2'} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
