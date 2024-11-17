import styles from './Home.module.scss'
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignOutButton, UserButton, SignedOut, SignInButton } from "@clerk/clerk-react";
import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

export default function Home() {
    const navigate = useNavigate();
    const { isSignedIn } = useUser();
    console.log(useUser());
    
    // if user not signed in, return to login page
    useEffect(() => {
        if (!isSignedIn) {
            navigate('/login');
        }
    }, [isSignedIn]);

    return(
        <>

        <SignedIn>
            <div>
                {/* use bracket notation for class names */}

                <div className={styles['top']}>
                    <div className={styles['header-and-button']}>
                        <h1 className={styles['header-text']}>SemPlan</h1>
                        
                        
                    
                    </div>
                    
                </div>

                <h1 className={styles['someClass']}> from Home page </h1>
                <SignOutButton />
                <h2>profile: <UserButton /> </h2>
            </div>
        </SignedIn>
        </>
    )
}