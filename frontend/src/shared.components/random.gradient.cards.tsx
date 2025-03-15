import { EditIcon, TrashIcon } from 'lucide-react';

export default function RandomGradientCards(props: any) {
    const { cardName, creditLimit, cardType, index, editCallBack, deleteCallBack, moreDetailsCallBack } = props;

    const lightBackgrounds = ['bg-red-100', 'bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-purple-100', 'bg-pink-100', 'bg-teal-100'];

    const bgClass = lightBackgrounds[Math.floor(Math.random() * lightBackgrounds.length)];

    return (
        <div key={index} className={`p-6 rounded-xl  shadow-lg ${bgClass}`} style={{ borderBottom: '15px solid #ccc' }} onClick={moreDetailsCallBack}>
            <h2 className="text-xl font-bold">{cardName}</h2>
            <p>Credit Limit: {creditLimit}</p>
            <p>{cardType}</p>
            <div>
                <EditIcon onClick={editCallBack} /> Edit
                <TrashIcon onClick={deleteCallBack} /> Delete
            </div>
        </div>
    );
}
