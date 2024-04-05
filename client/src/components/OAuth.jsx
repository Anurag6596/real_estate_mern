import {GoogleAuthProvider, getAuth, signInWithPopup} from '@firebase/auth';
import { app } from '../firebase';
import { useState } from 'react';
// import { useNavigate }  from "react-router-dom";

export default function OAuth() {
    const setLoading = useState(false);
    const setError  = useState(null);
    const handleGoogleClick = async  () => {
        try {
            // console.log("hi");
            const Provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await  signInWithPopup(auth, Provider);

            const res = await  fetch("/api/auth/google",{
                method:'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({name: result.user.displayName, email: result.user.email, password: result.user.password, photo: result.user.photoURL})
            })
            const data = await result.json()
            setLoading(false); 
            setError(null);
        } catch (error) {
            console.log("Unable to login with google.....☹️", error);
        }
    };
  return (
    <button onClick={handleGoogleClick} type="button" className="bg-red-500 text-white p-3 rounded-lg uppercase hover:opacity-95">Continue with google</button>
  );
}

