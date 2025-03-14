import NumberInput from '../../shared.components/form.elements/number.input.tsx';
import { useState } from 'react';
import DateInput from '../../shared.components/form.elements/date.input.tsx';
import SelectInput from '@/shared.components/form.elements/select.input.tsx';
import { Button } from '@/components/ui/button.tsx';

export default function PaymentCreateUpdateModal(props: any) {
    const { hide, isCreate, values } = props;
    const isFixedCard = values?.isFixedCard ?? false;

    const [name, setName] = useState(values?.name ?? '');
    const [creditLimit, setCreditLimit] = useState(values?.creditLimit ?? '');
    const [paymentDate, setPaymentDate] = useState(values?.paymentDate ?? '');

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
                    options={['card1', 'card2', 'card3']}
                    disabled={isFixedCard}
                />

                <DateInput value={paymentDate} onChange={(value: any) => setPaymentDate(value)} label={'Payment Date'} />
                <NumberInput label={'Payment Amount'} placeholder={'1000'} value={creditLimit} onChange={(e: any) => setCreditLimit(e.target.value)} />

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
