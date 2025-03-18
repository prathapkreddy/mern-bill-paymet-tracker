/*
 *
 * Pending Min Payment Dues
 *
 * Pending Total bal > min due
 *
 * Completely Paid ot over paid
 *
 * Statements generated more than 5 days back
 *
 * */

import { useGetDashboardDetailsQuery } from '@/store/slices/api.slice';

export default function Dashboard() {
    const { data, isLoading, isError } = useGetDashboardDetailsQuery(undefined);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading posts.</div>;

    console.log({ data });

    return (
        <div className="lg:columns-2 gap-0 lg:p-4 lg:space-y-4">
            <div className={`break-inside-avoid bg-red-300 text-white rounded-2xl p-4 m-2 shadow-md h-auto`}>
                <div className="text-lg font-bold">Un Paid Min Due</div>
                <div className="text-lg ">Un Paid Min Due</div>
                <div className="text-lg ">Un Paid Min Due</div>
            </div>
            <div className={`break-inside-avoid bg-blue-500 text-white rounded-2xl p-4 m-2 shadow-md h-auto`}>
                <div className="text-lg font-bold">Balance Total Due</div>
                <div className="text-lg font-bold">Balance Total Due</div>
                <div className="text-lg font-bold">Balance Total Due</div>
                <div className="text-lg font-bold">Balance Total Due</div>
                <div className="text-lg font-bold">Balance Total Due</div>
            </div>

            <div className={`break-inside-avoid bg-blue-500 text-white rounded-2xl p-4 m-2 shadow-md h-auto`}>
                <div className="text-lg font-bold">Paid off Bills</div>
                <div className="text-lg font-bold">Paid off Bills</div>
            </div>

            <div className={`break-inside-avoid bg-blue-500 text-white rounded-2xl p-4 m-2 shadow-md h-auto`}>
                <div className="text-lg font-bold">Scheduled Payments</div>
            </div>

            <div className={`break-inside-avoid bg-blue-500 text-white rounded-2xl p-4 m-2 shadow-md h-auto`}>
                <div className="text-lg font-bold">Statements generated more than 5 days back</div>
            </div>
        </div>
    );
}
