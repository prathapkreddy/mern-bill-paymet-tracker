import { Outlet, useNavigate } from 'react-router-dom';
import Header from './header.tsx';
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
                <Header />
            </div>
            <div className={' grid grid-cols-6'}>
                <div className="block lg:hidden col-span-6">
                    <MobileSideBar />
                </div>
                <div className="hidden col-span-1 lg:block h-screen">
                    <DesktopSideBar />
                </div>
                <div className={'col-span-5'}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
