import { useDispatch } from 'react-redux';
import { cardsCreateModalToggle, cardsUpdateModalToggle } from '@/store/slices/modals.slice.ts';
import { useDeleteCreditCardMutation, useGetCreditCardsQuery } from '@/store/slices/api.slice.ts';
import RandomGradientCards from '@/shared.components/random.gradient.cards.tsx';
import { useNavigate } from 'react-router';

export default function CreditCards() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { data: creditCards, isLoading, isError } = useGetCreditCardsQuery(undefined);
    const [deleteCreditCard] = useDeleteCreditCardMutation();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading posts.</div>;

    const handleEditCallBack = (item: any) => {
        dispatch(cardsUpdateModalToggle(item));
    };

    const handleDeleteCallBack = async (item: any) => {
        await deleteCreditCard(item._id);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            <h2>Credit Cards</h2> <></>
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
                    deleteCallBack={() => handleDeleteCallBack(item)}
                    editCallBack={() => handleEditCallBack(item)}
                    moreDetailsCallBack={() => navigate(`/credit-cards/${item._id}`)}
                />
            ))}
        </div>
    );
}
