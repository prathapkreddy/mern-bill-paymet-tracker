import { useState } from 'react';
import DateInput from '../../shared.components/form.elements/date.input.tsx';
import { Button } from '@/components/ui/button.tsx';
import NumberInput from '@/shared.components/form.elements/number.input.tsx';
import SelectInput from '@/shared.components/form.elements/select.input.tsx';
import { useGetCreditCardsQuery } from '@/store/slices/api.slice.ts';
import { useParams } from 'react-router';

export default function BillCreateUpdateModal(props: any) {
    const { data: creditCards, isLoading, isError } = useGetCreditCardsQuery(undefined);
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error...</div>;

    const {cardId} = useParams();
    const cardName = cardId ? creditCards.data.filter((item: any) => item._id === cardId)[0]?.name ?? '' : undefined;

    const { hide, isCreate, values } = props;
    const isFixedCard = values?.isFixedCard ?? false;
    const [name, setName] = useState(cardName ?? values?.name ?? '');
    const [statementDate, setStatementDate] = useState(values?.statementDate ?? '');
    const [dueDate, setDueDate] = useState(values?.dueDate ?? '');
    const [minimumPayment, setMinimumPayment] = useState(values?.minimumPayment ?? '');
    const [totalPayment, setTotalPayment] = useState(values?.totalPayment ?? '');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (isCreate) {

        } else {

        }
        hide();
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm" onSubmit={handleSubmit}>
                <SelectInput
                    label={'Card Name'}
                    placeholder={'Enter Card Name'}
                    value={name}
                    onChange={(value: any) => setName(value)}
                    options={creditCards.data.map((item: any) => item.name)}
                    disabled={isFixedCard}
                />

                <NumberInput label={'Minimum Payment'} placeholder={'10'} value={minimumPayment} onChange={(e: any) => setMinimumPayment(e.target.value)} />

                <NumberInput label={'Total Payment'} placeholder={'500'} value={totalPayment} onChange={(e: any) => setTotalPayment(e.target.value)} />

                <DateInput value={statementDate} onChange={(value: any) => setStatementDate(value)} label={'Statement Date'} />
                <DateInput label={'Due Date'} value={dueDate} onChange={(value: any) => setDueDate(value)} />

                <div className="flex justify-between my-4">
                    <Button variant={'secondary'} onClick={hide}>
                        Cancel
                    </Button>
                    <Button type={'submit'}>Save</Button>
                </div>
            </form>
        </div>
    );
}
