import { Outlet, useNavigate } from 'react-router-dom';
import Header from './header.tsx';
import { useEffect } from 'react';
import SideBar from './side.bar.tsx';

export default function Layout() {
    const styles = {
        contianer: {
            display: 'grid',
            gridTemplateColumns: '1fr 3fr',
            border: '1px solid black',
        },
    };

    const navigate = useNavigate();

    useEffect(() => {
        console.log('layout');
        navigate('/dashboard');
    }, []);

    return (
        <div>
            <Header />
            <div style={styles.contianer}>
                <SideBar />
                <Outlet />
            </div>
        </div>
    );
}
