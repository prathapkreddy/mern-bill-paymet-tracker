export default function DashboardTableCard(props: any) {
    const { headers, children, headerClasses, childrenClasses, cardLabel, noDataCopy } = props;
    console.log({ headers, children, headerClasses, childrenClasses, cardLabel });

    console.log(children.rows.length);

    return (
        <div className={`break-inside-avoid  rounded-xl p-4 m-2 shadow-md h-auto overflow-x-auto`}>
            <div className="text-lg font-bold pb-2">{cardLabel}</div>

            {children?.rows?.length === 0 ? (
                <div className={'p-2'}>{noDataCopy}</div>
            ) : (
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                            {headers?.map((item: any, index: number) => (
                                <th className={`px-4 py-3 ${headerClasses[index]}`} key={index}>
                                    {item}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {children?.rows?.map((item: any, index: number) => (
                            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 whitespace-nowrap`}>
                                {item?.map((cell: string, cellIndex: number) => <td className={`px-4 py-3 ${childrenClasses[cellIndex]}`}>{cell}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
