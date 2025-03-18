import { useState } from 'react';
import DateInput from '../../shared.components/form.elements/date.input.tsx';
import { Button } from '@/components/ui/button.tsx';
import NumberInput from '@/shared.components/form.elements/number.input.tsx';
import SelectInput from '@/shared.components/form.elements/select.input.tsx';
import { useAddBillMutation, useGetCreditCardsQuery, useUpdateBillMutation } from '@/store/slices/api.slice.ts';
import { useParams } from 'react-router';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog.tsx';

export default function BillCreateUpdateModal(props: any) {
    const { data: creditCards, isLoading, isError } = useGetCreditCardsQuery(undefined);
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error...</div>;

    const { cardId } = useParams();
    const cardName = cardId ? (creditCards.data.filter((item: any) => item._id === cardId)[0]?.name ?? '') : undefined;

    const { hide, isCreate, values } = props;
    const isFixedCard = values?.isFixedCard ?? false;
    const [name, setName] = useState(cardName ?? values?.name ?? '');
    const [statementDate, setStatementDate] = useState(values?.statementDate ?? '');
    const [dueDate, setDueDate] = useState(values?.dueDate ?? '');
    const [minimumDue, setMinimumDue] = useState(values?.minimumDue ?? '');
    const [totalDue, setTotalDue] = useState(values?.totalDue ?? '');

    const [addBill] = useAddBillMutation();
    const [updateBill] = useUpdateBillMutation();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if (isCreate) {
                await addBill({ cardId, statementDate, dueDate, minimumDue, totalDue });
            } else {
                await updateBill({ id: values._id, data: { cardId, statementDate, dueDate, minimumDue, totalDue } });
            }
        } catch (e) {
            console.error(e);
        }
        hide();
    };

    return (
        <Dialog defaultOpen={true} onOpenChange={hide}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{!isCreate ? <> Update existing bill details</> : <>Add a new bill</>}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <SelectInput
                            label={'Card Name'}
                            placeholder={'Enter Card Name'}
                            value={name}
                            onChange={(value: any) => setName(value)}
                            options={creditCards.data.map((item: any) => item.name)}
                            disabled={isFixedCard}
                        />

                        <NumberInput label={'Minimum Payment'} placeholder={'10'} value={minimumDue} onChange={(e: any) => setMinimumDue(e.target.value)} />

                        <NumberInput label={'Total Payment'} placeholder={'500'} value={totalDue} onChange={(e: any) => setTotalDue(e.target.value)} />

                        <DateInput value={statementDate} onChange={(value: any) => setStatementDate(value)} label={'Statement Date'} />
                        <DateInput label={'Due Date'} value={dueDate} onChange={(value: any) => setDueDate(value)} />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
