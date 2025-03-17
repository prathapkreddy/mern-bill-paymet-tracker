import { Link } from 'react-router';
import { cn } from '@/lib/utils.ts';
import { CircleUserIcon, CreditCardIcon, DollarSignIcon, LayoutDashboardIcon } from 'lucide-react';

export default function DesktopSideBar() {
    return (
        <div className={cn('bg-white h-full  shadow-lg transition-transform lg:translate-x-0 p-2')}>
            <Link to="/dashboard">
                <div className="flex items-center gap-2 p-2 rounded text-sm font-medium hover:bg-gray-200">
                    <LayoutDashboardIcon size={20} />
                    <span className={'px-2'}>Dashboard</span>
                </div>
            </Link>
            <Link to="/credit-cards">
                <div className="flex items-center gap-2 p-2 rounded text-sm font-medium hover:bg-gray-200">
                    <CreditCardIcon size={20} /> <span className={'px-2'}>Credit Cards</span>
                </div>
            </Link>
            <Link to="/payments">
                <div className="flex items-center gap-2 p-2 rounded text-sm font-medium hover:bg-gray-200">
                    <DollarSignIcon size={20} /> <span className={'px-2'}>Payments</span>
                </div>
            </Link>
            <Link to="/account">
                <div className="flex items-center gap-2 p-2 rounded text-sm font-medium hover:bg-gray-200">
                    <CircleUserIcon size={20} /> <span className={'px-2'}>Account</span>
                </div>
            </Link>
        </div>
    );
}
