import { Link, useLocation } from 'react-router';
import { CircleUserIcon, CreditCardIcon, DollarSignIcon, LayoutDashboardIcon, MenuIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function MobileSideBar() {
    const [openSideBar, setOpenSidebar] = useState(false);
    const sidebarRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (sidebarRef?.current && !sidebarRef.current.contains(event.target)) {
                setOpenSidebar(false);
            }
        }
        if (openSideBar) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openSideBar]);

    useEffect(() => {
        setOpenSidebar(false)
    }, [location]);

    return (
        <>
            <div className={'flex justify-between w-full text-2xl p-2 py-4 shadow-lg'}>
                <div>Bill Tracker</div>
                <MenuIcon onClick={() => setOpenSidebar(!openSideBar)} className={'m-0'} />
            </div>
            <div
                ref={sidebarRef}
                className={`fixed top-0 left-0 w-64 h-screen bg-white shadow-md transform ${
                    openSideBar ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 ease-in-out z-50`}
            >
                <div className={'p-2 text-xl '}>Menu</div>
                <hr className={'py-4'} />
                <Link to="/dashboard">
                    <div className="flex items-center gap-2 p-2 py-4 rounded text-sm font-medium hover:bg-gray-200">
                        <LayoutDashboardIcon size={20} />
                        <span className={'px-2'}>Dashboard</span>
                    </div>
                </Link>
                <Link to="/credit-cards">
                    <div className="flex items-center gap-2 p-2 py-4 rounded text-sm font-medium hover:bg-gray-200">
                        <CreditCardIcon size={20} /> <span className={'px-2'}>Credit Cards</span>
                    </div>
                </Link>
                <Link to="/payments">
                    <div className="flex items-center gap-2 p-2 py-4 rounded text-sm font-medium hover:bg-gray-200">
                        <DollarSignIcon size={20} /> <span className={'px-2'}>Payments</span>
                    </div>
                </Link>
                <Link to="/account">
                    <div className="flex items-center gap-2 p-2 py-4 rounded text-sm font-medium hover:bg-gray-200">
                        <CircleUserIcon size={20} /> <span className={'px-2'}>Account</span>
                    </div>
                </Link>
            </div>
        </>
    );
}
