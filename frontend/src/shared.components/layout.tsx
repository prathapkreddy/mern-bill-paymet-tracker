import { Outlet, useNavigate } from 'react-router-dom';
import Header from './header.tsx';
import { useEffect } from 'react';
import SideBar from './side.bar.tsx';
import ModalContainer from '../components/modals/modal.container.tsx';

export default function Layout() {
    const styles = {
        contianer: {
            display: 'grid',
            gridTemplateColumns: '1fr 3fr',
        },
    };

    const navigate = useNavigate();

    useEffect(() => {
        navigate('/dashboard');
    }, []);

    return (
        <div>
            <ModalContainer />
            <Header />
            <div style={styles.contianer}>
                <SideBar />
                <Outlet />
            </div>
        </div>
    );
}
