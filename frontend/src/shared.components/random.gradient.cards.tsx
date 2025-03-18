import { PencilIcon, TrashIcon } from 'lucide-react';
import PaymentCardIcons from '@/shared.components/payment.card.icon.tsx';
import { currencyFormatter } from '@/shared.components/common.utils.ts';

export default function RandomGradientCards(props: any) {
    const { cardName, creditLimit, cardType, index, editCallBack, deleteCallBack, moreDetailsCallBack } = props;

    const lightBackgrounds = ['bg-red-100', 'bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-purple-100', 'bg-pink-100', 'bg-teal-100'];

    const bgClass = lightBackgrounds[index];

    return (
        <div key={index} className={`p-4 rounded-xl  border-1 shadow-lg ${bgClass} cursor-pointer`} style={{ borderBottom: '15px solid #ccc' }} onClick={moreDetailsCallBack}>
            <div className="text-xl font-bold">{cardName}</div>
            <div className={'py-2'}>Credit Limit: {currencyFormatter(creditLimit)}</div>
            <div className={'flex justify-between pt-2'}>
                <div className={'flex justify-center items-center space-x-2'} onClick={editCallBack}>
                    <PencilIcon size={15} />
                    <span>Edit</span>
                </div>
                <div className={'flex justify-center items-center space-x-2'} onClick={deleteCallBack}>
                    <TrashIcon size={15} />
                    <span>Delete</span>
                </div>
                <PaymentCardIcons type={cardType} />
            </div>
        </div>
    );
}
