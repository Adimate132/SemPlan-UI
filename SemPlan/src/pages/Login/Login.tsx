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
            <div className={styles['background']} >
                <div className={styles['top']}>
                    <div className={styles['header-and-button']}>
                        <h1 className={styles['header-text']}>SemPlan</h1>
                        
                        <SignedOut>
                             <SignInButton className={styles['sign-in-button']} />
                        </SignedOut>
                    
                    </div>
                    
                </div>

                <div className={styles['content-container']}>
    <div className={styles['text-container']}>
        <h1 className={styles['Welcome']}>Welcome to SemPlan!</h1>
        <p className={styles['At']}>
            At SemPlan, we understand the challenges of managing multiple class schedules and deadlines. Our tool simplifies your academic planning by automatically extracting due dates from your syllabi and syncing them directly to your Google Calendar. Stay organized and ahead of your academic commitments with ease!
        </p>
    </div>
    <img src="../assets/REAL landing icon.svg" className={styles['img']} alt="icon" />
    </div>

    <p className = {styles['allow']}>With SemPlan, you can: </p>
    <p className = {styles['One-is']}>Upload Your Syllabus: Securely upload your course syllabus through our user-friendly platform.</p>
    <p className = {styles['Two-is']}>Automatic Extraction: Our advanced chat model processes your syllabi to find and extract all key due dates and important events.</p>
    <p className = {styles['Three-is']}>Sync to Your Calendar: With just one click, add all your academic deadlines directly into your Google Calendar, perfectly organized.</p>
            
            
    <SignedOut>
    <SignInButton className={styles['sign-in-button1']}>
        Start Planning Out !
    </SignInButton>
</SignedOut>

            </div>
        </div>
    ); 
}
    