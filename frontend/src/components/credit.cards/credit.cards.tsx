import { useDispatch } from 'react-redux';
import { cardDeleteModalToggle, cardsCreateModalToggle, cardsUpdateModalToggle } from '@/store/slices/modals.slice.ts';
import { useGetCreditCardsQuery } from '@/store/slices/api.slice.ts';
import RandomGradientCards from '@/shared.components/random.gradient.cards.tsx';
import { useNavigate } from 'react-router';

export default function CreditCards() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { data: creditCards, isLoading, isError } = useGetCreditCardsQuery(undefined);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading posts.</div>;

    const handleEditCallBack = (event: any, item: any) => {
        event.stopPropagation();
        dispatch(cardsUpdateModalToggle(item));
    };

    const handleDeleteCallBack = async (event: any, item: any) => {
        event.stopPropagation();
        dispatch(cardDeleteModalToggle({ id: item._id }));
    };

    return (
        <>
            <div className={'text-xl font-medium'}>Credit Cards</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                <div className="flex items-center justify-center p-6 rounded-xl text-gray-500 shadow-lg bg-gray-100 hover:bg-gray-200 cursor-pointer transition">
                    <button onClick={() => dispatch(cardsCreateModalToggle())} className="text-3xl font-bold text-gray-400 hover:text-gray-600">
                        +
                    </button>
                </div>
                {creditCards.data.map((item: any) => (
                    <RandomGradientCards
                        key={item._id}
                        cardName={item.name}
                        creditLimit={item.creditLimit}
                        cardType={item.type}
                        deleteCallBack={(event: any) => handleDeleteCallBack(event, item)}
                        editCallBack={(event: any) => handleEditCallBack(event, item)}
                        moreDetailsCallBack={() => navigate(`/credit-cards/${item._id}`)}
                    />
                ))}
            </div>
        </>
    );
}
