import { signInWithGoogle } from "../../firebase.config";
import { useNavigate} from "react-router-dom";

export default function ContinueWithGoogle() {

    const navigate = useNavigate();

    const googleLogin = async () => {
        const userData = await signInWithGoogle();
        if(userData){
            navigate("/");
        }
    };

    return <button onClick={googleLogin}>Continue with google</button>;
}
