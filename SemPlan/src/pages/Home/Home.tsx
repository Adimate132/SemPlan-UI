import styles from './Home.module.scss'
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignOutButton, UserButton } from "@clerk/clerk-react";
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
        {/* this h1 is debug */}
        <h1 style={{backgroundColor: 'green'}}> !!! home content may be hidden if not signed in !!! </h1>
        <SignedIn>
            <div>
                {/* use bracket notation for class names */}
                <h1 className={styles['someClass']}> from Home page </h1>
                <SignOutButton />
                <h2>profile: <UserButton /> </h2>
            </div>
        </SignedIn>
        </>
    )
}