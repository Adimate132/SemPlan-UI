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

    
    
    

    return (
        <div className={styles['Login-container']}>
            <div className={styles['background']}>
                <div className={styles['top']}>
                    <div className={styles['header-and-button']}>
                        <h1 className={styles['header-text']}>SemPlan</h1>
                        
                        <SignedOut>
                             <SignInButton className={styles['sign-in-button']} />
                        </SignedOut>
                    
                    </div>
                    
                </div>

                
            </div>
        </div>
    );
}
    