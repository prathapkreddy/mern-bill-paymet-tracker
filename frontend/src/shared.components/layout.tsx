import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ModalContainer from '../components/modals/modal.container.tsx';
import DesktopSideBar from '@/shared.components/desktop.side.bar.tsx';
import MobileSideBar from '@/shared.components/mobile.side.bar.tsx';

export default function Layout() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/dashboard');
    }, []);

    return (
        <div className="h-screen">
            <ModalContainer />
            <div className={'hidden lg:block'}>
                <div className={'flex justify-between w-full text-2xl p-4 shadow-lg'}>
                    <div>Bill Tracker</div>
                </div>
            </div>
            <div className={' grid grid-cols-6'}>
                <div className="block lg:hidden col-span-6">
                    <MobileSideBar />
                </div>
                <div className="hidden col-span-1 lg:block border-2 pt-4">
                    <DesktopSideBar />
                </div>
                <div className={'col-span-6 lg:col-span-5 my-2 p-4 w-full h-[90vh] gap-4'}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
