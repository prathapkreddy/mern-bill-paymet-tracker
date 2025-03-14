import TextInput from '../../shared.components/form.elements/text.input.tsx';
import NumberInput from '../../shared.components/form.elements/number.input.tsx';
import CancelButton from '../../shared.components/form.elements/cancel.button.tsx';
import SubmitButton from '../../shared.components/form.elements/submit.button.tsx';
import { useState } from 'react';
import DateInput from '../../shared.components/form.elements/date.input.tsx';

export default function BillCreateUpdateModal(props: any) {
    const { hide, isCreate, values, isFixedCard } = props;

    const [name, setName] = useState(values?.name ?? '');
    const [statementDate, setStatementDate] = useState(values?.statementDate ?? '');
    const [dueDate, setDueDate] = useState(values?.dueDate ?? '');
    const [minimumPayment, setMinimumPayment] = useState(values?.minimumPayment ?? null);
    const [totalPayment, setTotalPayment] = useState(values?.totalPayment ?? null);

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
                <TextInput label={'Card Name'} placeholder={'Enter Card Name'} value={name} onChange={(e: any) => setName(e.target.value)} disable={isFixedCard} />
                <DateInput value={statementDate} onChange={(e: any) => setStatementDate(e.target.value)} label={'Statement Date'} />
                <NumberInput label={'Minimum Payment'} placeholder={'1000'} value={minimumPayment} onChange={(e: any) => setMinimumPayment(e.target.value)} />
                <DateInput label={'Due Date'} value={dueDate} onChange={(e: any) => setDueDate(e.target.value)} />
                <NumberInput label={'Total Payment'} placeholder={'1000'} value={totalPayment} onChange={(e: any) => setTotalPayment(e.target.value)} />
                <div className="flex justify-between">
                    <CancelButton onClick={hide} label={'Cancel'} />
                    <SubmitButton label={'Save'} />
                </div>
            </form>
        </div>
    );
}
