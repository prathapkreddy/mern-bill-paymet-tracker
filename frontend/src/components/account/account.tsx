import { RootState } from '@/store/store.ts';
import { useSelector } from 'react-redux';

export default function Account() {
    const accountInfo = useSelector((state: RootState) => state.accountInfo);

    return (
        <div>
            <p>Account Info</p>
            <p>Name: {accountInfo.name}</p>
            <p>Email: {accountInfo.email}</p>
        </div>
    );
}
