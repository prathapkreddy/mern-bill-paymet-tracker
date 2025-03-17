import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useDeleteBillMutation, useDeleteCreditCardMutation, useDeletePaymentMutation } from '@/store/slices/api.slice.ts';

export default function DeleteModal(props: any) {
    const { hide, type, id } = props;
    const [deletePayment] = useDeletePaymentMutation();
    const [deleteBill] = useDeleteBillMutation();
    const [deleteCreditCard] = useDeleteCreditCardMutation();

    const handleSubmit = async () => {
        switch (type) {
            case 'card':
                await deleteCreditCard(id);
                break;
            case 'bill':
                await deleteBill(id);
                break;
            case 'payment':
                await deletePayment(id);
                break;
            default:
                break;
        }
        hide();
    };

    return (
        <Dialog defaultOpen={true} onOpenChange={hide}>
            <DialogContent className="sm:max-w-[500px]">
                <div>
                    <div>Are you sure, you wanna delete this card?</div>
                </div>
                <DialogFooter>
                    <Button variant={'secondary'} onClick={handleSubmit}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
