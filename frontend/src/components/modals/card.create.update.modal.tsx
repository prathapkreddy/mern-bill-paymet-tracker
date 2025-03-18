import { useState } from 'react';
import { Button } from '@/components/ui/button';
import NumberInput from '@/shared.components/form.elements/number.input.tsx';
import TextInput from '@/shared.components/form.elements/text.input.tsx';
import SelectInput from '@/shared.components/form.elements/select.input.tsx';
import { useAddCreditCardMutation, useUpdateCreditCardMutation } from '@/store/slices/api.slice.ts';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog.tsx';

export default function CardCreateUpdateModal(props: any) {
    const { hide, isCreate, values } = props;
    const isFixedCard = values?.isFixedCard ?? false;
    const [addCreditCard] = useAddCreditCardMutation();
    const [updateCreditCard] = useUpdateCreditCardMutation();

    const [name, setName] = useState(values?.name ?? '');
    const [cardType, setCardType] = useState(values?.cardType ?? 'amex');
    const [creditLimit, setCreditLimit] = useState(values?.creditLimit ?? '');
    const [expectedStatementDate, setExpectedStatementDate] = useState(values?.statementDate ?? '');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if (isCreate) {
                await addCreditCard({ name, type: cardType, creditLimit, expectedStatementDate });
            } else {
                await updateCreditCard({ id: values._id, data: { name, type: cardType, creditLimit, expectedStatementDate } });
            }
        } catch (e) {
            console.error(e);
        }

        hide();
    };

    const monthOptions = Array.from({ length: 31 }, (_, i) => String(i + 1));

    return (
        <Dialog defaultOpen={true} onOpenChange={hide}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{!isCreate ? <> Update existing card details</> : <>Create a new card</>}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <TextInput label={'Card Name'} placeholder={'Enter Card Name'} value={name} onChange={(e: any) => setName(e.target.value)} disabled={isFixedCard} />
                        <SelectInput label={'Card Type'} options={['amex', 'masterCard', 'visa']} value={cardType} onChange={(value: any) => setCardType(value)} />
                        <NumberInput label={'Credit Limit'} placeholder={'5000'} value={creditLimit} onChange={(e: any) => setCreditLimit(e.target.value)} />
                        <SelectInput
                            value={expectedStatementDate}
                            onChange={(value: any) => setExpectedStatementDate(value)}
                            label={'Expected Statement Date'}
                            options={monthOptions}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
