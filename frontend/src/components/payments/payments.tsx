import { useGetPaymentsQuery } from '@/store/slices/api.slice.ts';
import { paymentsCreateModalToggle } from '@/store/slices/modals.slice.ts';

import { useDispatch } from 'react-redux';
import { CirclePlusIcon } from 'lucide-react';
import PaymentsTable from '@/components/payments/payments.table.tsx';

export default function Payments() {
    const dispatch = useDispatch();
    const { data: payments, isLoading: paymentsIsLoading, isError: paymentsIsError } = useGetPaymentsQuery(undefined);

    if (paymentsIsLoading) {
        return <div>Loading...</div>;
    }

    if (paymentsIsError) {
        return <div>Error...</div>;
    }

    return (
        <div>
            <div
                onClick={() => dispatch(paymentsCreateModalToggle())}
                className="w-[75%] lg:w-[50%] text-xl font-bold flex mx-[12.5%] lg:mx-[25%] justify-center p-4 mb-4 rounded-xl  shadow-lg cursor-pointer transition border-1"
            >
                <CirclePlusIcon size={'30'} /> <span className={'pl-2'}>Add a payment</span>
            </div>

            <PaymentsTable payments={payments.data} showCardName={true} />
        </div>
    );
}
