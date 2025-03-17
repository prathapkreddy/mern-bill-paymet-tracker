import { RootState } from '@/store/store.ts';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button.tsx';
import { logoutFirebaseUser } from '../../../firebase.config.ts';
import { useNavigate } from 'react-router-dom';

export default function Account() {
    const accountInfo = useSelector((state: RootState) => state.accountInfo);

    const navigate = useNavigate();

    const logoutUser = async () => {
        await logoutFirebaseUser();
        navigate('/login');
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Account Info</h2>

            <div className="space-y-2 mb-4">
                <div>
                    <strong className="text-gray-600">Name:</strong>
                    <p className="text-gray-800">{accountInfo.name}</p>
                </div>
                <div>
                    <strong className="text-gray-600">Email:</strong>
                    <p className="text-gray-800">{accountInfo.email}</p>
                </div>
            </div>

            <Button variant={'secondary'} className={'py-4'} onClick={logoutUser}>
                Logout
            </Button>
        </div>
    );
}
