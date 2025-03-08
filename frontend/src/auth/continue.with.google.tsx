import { signInWithGoogle } from "../../firebase.config";
import api from "../api.service/axios.init";

export default function ContinueWithGoogle() {
    const googleLogin = async () => {
        const userData = await signInWithGoogle();
        console.log({ userData });

        const response = await api.post("http://localhost:5000/api/auth/protected");

        console.log("Protected API Response:", response.data);
    };

    return <button onClick={googleLogin}>Continue with google</button>;
}
