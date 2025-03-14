import { logoutFirebaseUser } from '../../firebase.config.ts';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();

    const logoutUser = async () => {
        await logoutFirebaseUser();
        navigate('/login');
    };

    return (
        <div className="grid grid-cols-[1fr_100px] gap-4 my-2">
            <div>Header</div>

            <button
                onClick={logoutUser}
                className="bg-transparent cursor-pointer hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
                Logout
            </button>
        </div>
    );
}
