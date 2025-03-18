import { useDispatch } from 'react-redux';
import { cardDeleteModalToggle, cardsCreateModalToggle, cardsUpdateModalToggle } from '@/store/slices/modals.slice.ts';
import { useGetCreditCardsQuery } from '@/store/slices/api.slice.ts';
import RandomGradientCards from '@/shared.components/random.gradient.cards.tsx';
import { useNavigate } from 'react-router';
import { CirclePlusIcon } from 'lucide-react';

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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:p-6 pt-4">
                <div
                    onClick={() => dispatch(cardsCreateModalToggle())}
                    className="w-[75%] lg:w-[100%] text-xl font-bold flex mx-[12.5%] lg:mx-[0%] justify-center items-center p-4 mb-4 rounded-xl  shadow-lg cursor-pointer transition border-1"
                >
                    <CirclePlusIcon size={'30'} /> <span className={'pl-2'}>Add a card</span>
                </div>

                {creditCards.data.map((item: any, index: number) => (
                    <RandomGradientCards
                        key={item._id}
                        cardName={item.name}
                        creditLimit={item.creditLimit}
                        cardType={item.type}
                        deleteCallBack={(event: any) => handleDeleteCallBack(event, item)}
                        editCallBack={(event: any) => handleEditCallBack(event, item)}
                        moreDetailsCallBack={() => navigate(`/credit-cards/${item._id}`)}
                        index={index}
                    />
                ))}
            </div>
        </>
    );
}
