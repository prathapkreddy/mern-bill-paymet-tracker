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
import DashboardTableCard from '@/components/dashboard/dashboard.table.card.tsx';
import { currencyFormatter } from '@/shared.components/common.utils.ts';
import { format } from 'date-fns';

export default function Dashboard() {
    const { data: dashBoardData, isLoading, isError } = useGetDashboardDetailsQuery(undefined);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading posts.</div>;

    const getMinimumDueCardChildren = (data: any) => {
        const childRows: any[] = [];
        if (!data) return { rows: childRows };

        Object.keys(data).forEach((key: any) => {
            const row = [
                dashBoardData.data.creditCardsMap[data[key].cardId].name,
                format(data[key].dueDate, 'PP'),
                currencyFormatter(Number(data[key].minimumDue - data[key].sumOfPayments)),
            ];

            childRows.push(row);
        });
        return { rows: childRows };
    };

    const getTotalDueCardChildren = (data: any) => {
        const childRows: any[] = [];
        if (!data) return { rows: childRows };

        Object.keys(data).forEach((key: any) => {
            const row = [
                dashBoardData.data.creditCardsMap[data[key].cardId].name,
                format(data[key].dueDate, 'PP'),
                currencyFormatter(Number(data[key].totalDue - data[key].sumOfPayments)),
            ];

            childRows.push(row);
        });
        return { rows: childRows };
    };

    const getFullyPaidCardChildren = (data: any) => {
        const childRows: any[] = [];
        if (!data) return { rows: childRows };

        Object.keys(data).forEach((key: any) => {
            const row = [dashBoardData.data.creditCardsMap[data[key].cardId].name];
            childRows.push(row);
        });
        return { rows: childRows };
    };

    const getFutureStatementCardChildren = (data: any) => {
        const childRows: any[] = [];
        if (!data) return { rows: childRows };

        Object.keys(data).forEach((key: any) => {
            const row = [dashBoardData.data.creditCardsMap[data[key].cardId].name, dashBoardData.data.creditCardsMap[data[key].cardId].expectedStatementDate];
            childRows.push(row);
        });
        return { rows: childRows };
    };

    return (
        <div className="lg:columns-2 gap-0 lg:p-4 lg:space-y-4">
            <DashboardTableCard
                noDataCopy={"All minimum dues are paid. Let's focus on clearing total dues. 🙌🙌"}
                cardLabel={'Minimum due balance'}
                headers={['Card Name', 'Due Date', 'Rem. Min. Due']}
                headerClasses={['']}
                childrenClasses={['', '', 'text-red-500']}
                children={getMinimumDueCardChildren(dashBoardData.data.minimumDueUnpaidMap)}
            />
            <DashboardTableCard
                noDataCopy={"All Total dues are paid. It's time to celebrate. 🥳🥳"}
                cardLabel={'Total due balance'}
                headers={['Card Name', 'Due Date', 'Rem. Total Due']}
                headerClasses={['']}
                childrenClasses={['', '', 'text-red-500']}
                children={getTotalDueCardChildren(dashBoardData.data.totalDueUnpaidMap)}
            />
            <DashboardTableCard
                noDataCopy={'oh hooo! No bills are fully paid. 🥲🥲'}
                cardLabel={'Fully Paid'}
                headers={['Card Name']}
                headerClasses={['']}
                childrenClasses={['bg-green-100 border-1']}
                children={getFullyPaidCardChildren(dashBoardData.data.fullyPaidMap)}
            />

            <DashboardTableCard
                noDataCopy={'All the latest statements are added, cheers 🥂'}
                cardLabel={'Future statements'}
                headers={['Card Name', 'Expected Statement Date']}
                headerClasses={['']}
                childrenClasses={['bg-orange-100 border-1', ' border-1 bg-orange-100']}
                children={getFutureStatementCardChildren(dashBoardData.data.statementNotUpdatedMap)}
            />
        </div>
    );
}
