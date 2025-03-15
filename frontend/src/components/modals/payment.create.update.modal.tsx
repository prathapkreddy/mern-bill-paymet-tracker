import NumberInput from '../../shared.components/form.elements/number.input.tsx';
import { useState } from 'react';
import DateInput from '../../shared.components/form.elements/date.input.tsx';
import SelectInput from '@/shared.components/form.elements/select.input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useAddPaymentMutation, useGetCreditCardsQuery, useUpdatePaymentMutation } from '@/store/slices/api.slice.ts';
import { useParams } from 'react-router';

export default function PaymentCreateUpdateModal(props: any) {
    const { data: creditCards, isLoading, isError } = useGetCreditCardsQuery(undefined);
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error...</div>;

    const {cardId} = useParams();
    const cardName = cardId ? creditCards.data.filter((item: any) => item._id === cardId)[0]?.name ?? '' : undefined;

    const { hide, isCreate, values } = props;
    const isFixedCard = values?.isFixedCard ?? false;

    const [name, setName] = useState(cardName ?? values?.name ?? '');
    const [paymentAmount, setPaymentAmount] = useState(values?.amount ?? '');
    const [paymentDate, setPaymentDate] = useState(values?.date ?? '');

    const [addPayment] = useAddPaymentMutation();
    const [updatePayment] = useUpdatePaymentMutation();



    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const cardId = creditCards.data.filter((item: any) => item.name === name)[0]['_id'] ?? '';

        if (isCreate) {
            addPayment({
                cardId,
                date: paymentDate,
                amount: paymentAmount,
            });
        } else {
            updatePayment({
                id: values?.id,
                data: {
                    date: paymentDate,
                    amount: paymentAmount,
                },
            });
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

                <DateInput value={paymentDate} onChange={(value: any) => setPaymentDate(value)} label={'Payment Date'} />
                <NumberInput label={'Payment Amount'} placeholder={'1000'} value={paymentAmount} onChange={(e: any) => setPaymentAmount(e.target.value)} />

                <div className="flex justify-between">
                    <Button variant={'secondary'} onClick={hide}>
                        Cancel
                    </Button>
                    <Button type={'submit'}>Save</Button>
                </div>
            </form>
        </div>
    );
}
