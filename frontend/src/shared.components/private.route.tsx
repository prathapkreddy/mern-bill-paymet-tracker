import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import Layout from './layout.tsx';
import { useDispatch } from 'react-redux';
import { setAccountInfo } from '@/store/slices/account.info.slice.ts';

const PrivateRoutes = () => {
    const auth = getAuth();
    const dispatch = useDispatch();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
            dispatch(setAccountInfo({ name: currentUser?.displayName, email: currentUser?.email }));
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <div>Loading...</div>;

    return user ? <Layout /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
