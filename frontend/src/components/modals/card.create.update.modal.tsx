import { useState } from 'react';
import { useCreditCardApi } from '@/api.service/credit.card.api.service.ts';
import { Button } from '@/components/ui/button';
import NumberInput from '@/shared.components/form.elements/number.input.tsx';
import TextInput from '@/shared.components/form.elements/text.input.tsx';
import SelectInput from '@/shared.components/form.elements/select.input.tsx';

export default function CardCreateUpdateModal(props: any) {
    const { hide, isCreate, values } = props;
    const isFixedCard = values?.isFixedCard ?? false;

    const [name, setName] = useState(values?.name ?? '');
    const [cardType, setCardType] = useState(values?.cardType ?? 'amex');
    const [creditLimit, setCreditLimit] = useState(values?.creditLimit ?? '');

    const { addNewCreditCard } = useCreditCardApi();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (isCreate) {
            try {
                await addNewCreditCard({
                    name,
                    type: cardType,
                    creditLimit,
                });
            } catch (e) {
                console.error(e);
            }
        } else {
        }

        hide();
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm" onSubmit={handleSubmit}>
                <TextInput label={'Card Name'} placeholder={'Enter Card Name'} value={name} onChange={(e: any) => setName(e.target.value)} disabled={isFixedCard} />

                <SelectInput label={'Card Type'} options={['amex', 'masterCard', 'visa']} value={cardType} onChange={(value: any) => setCardType(value)} />

                <NumberInput label={'Credit Limit'} placeholder={'5000'} value={creditLimit} onChange={(e: any) => setCreditLimit(e.target.value)} />

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
