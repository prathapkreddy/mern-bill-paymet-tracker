import TextInput from '../../shared.components/form.elements/text.input.tsx';
import SelectInput from '../../shared.components/form.elements/select.input.tsx';
import NumberInput from '../../shared.components/form.elements/number.input.tsx';
import CancelButton from '../../shared.components/form.elements/cancel.button.tsx';
import SubmitButton from '../../shared.components/form.elements/submit.button.tsx';
import { useState } from 'react';
import { useCreditCardApi } from '../../api.service/credit.card.api.service.ts';

export default function CardCreateUpdateModal(props: any) {
    const { hide, isCreate, values } = props;

    const [name, setName] = useState(values?.name ?? '');
    const [cardType, setCardType] = useState(values?.cardType ?? '');
    const [creditLimit, setCreditLimit] = useState(values?.creditLimit ?? 0);

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
                <TextInput label={'Card Name'} placeholder={'Enter Card Name'} value={name} onChange={(e: any) => setName(e.target.value)} />
                <SelectInput label={'Card Type'} options={['Amex', 'Visa', 'MasterCard']} value={cardType} onChange={(e: any) => setCardType(e.target.value)} />
                <NumberInput label={'Credit Limit'} step={100} placeholder={'1000'} value={creditLimit} onChange={(e: any) => setCreditLimit(e.target.value)} />
                <div className="flex justify-between">
                    <CancelButton onClick={hide} label={'Cancel'} />
                    <SubmitButton label={'Save'} />
                </div>
            </form>
        </div>
    );
}
