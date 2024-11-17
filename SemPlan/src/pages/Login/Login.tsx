import styles from './Login.module.scss'
import { useNavigate } from 'react-router-dom';
import { SignedOut, SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";
import { useEffect } from 'react';

export default function Login() {
    const navigate = useNavigate();
    const { isSignedIn } = useUser();

    // if user HAS signed in, navigate to home
    useEffect(() => {
        if (isSignedIn) {
            navigate('/home');
        }
    }, [isSignedIn]);

    return(
        <>
            {/* this h1 is debug. */}
            <h1 style={{backgroundColor: 'green'}}>  !!! may not see login contents if signed in !!! </h1>
            <SignedOut>
                <div>
                    {/* use bracket notation for class names */}
                    <h1 className={styles['someClass']}> from login page </h1>
                    <SignInButton />
                </div>
            </SignedOut>
        </>
    )
}