import { signInWithGoogle } from "../../firebase.config";

export default function ContinueWithGoogle() {
    const googleLogin = async () => {
        const userData = await signInWithGoogle();
        console.log({ userData });
    };

    return <button onClick={googleLogin}>Continue with google</button>;
}
