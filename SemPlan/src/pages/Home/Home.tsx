import styles from './Home.module.scss'
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignOutButton, UserButton } from "@clerk/clerk-react";
import { useEffect, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';

export default function Home() {
    const fileRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { isSignedIn } = useUser();
    const {user} = useUser();

    // if user not signed in, return to login page
    useEffect(() => {
        if (!isSignedIn) {
            navigate('/login');
        }
    }, [isSignedIn]);

    async function handleUpload() {
        const success = await uploadFile();
        if (success) {
            navigate('/calendar')
        }
    }

    const uploadFile = async () => {
        try {
          // Check if a file is selected
          if (!fileRef.current?.files || fileRef.current.files.length === 0) {
            console.error("No file selected");
            return;
          }
      
          const file = fileRef.current.files[0]; // Get the file from the file input
          const email = user?.emailAddresses[0].emailAddress!;
      
          // Check if the file is a Blob (it should be a File, which is a type of Blob)
          if (!(file instanceof Blob)) {
            console.error("Selected file is not a Blob");
            return;
          }
      
          // Create FormData to send to the backend
          const formData = new FormData();
          formData.set("file", file); // set the file
          formData.append("email", email); // Add the email
      
          // Send the file and email to the backend
          const response = await fetch("http://localhost:3000/uploadFile", {
            method: "POST",
            body: formData
          });   
      
          if (response.ok) {
            const data = await response.json();

            sessionStorage.setItem('token', data.token);
            console.log("File uploaded successfully:", data);
            alert('File uploaded successfully!');
          } else {
            console.error("File upload failed");
            alert('File upload failed.');
          }
          return true;
        } catch (error) {
          console.error("Error uploading file:", error);
          alert('Error uploading file.');
        }
        return false;
      };
  

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
                <input type="file" ref={fileRef}/>
                <button onClick={handleUpload}> upload file </button>

                
            </div>
        </SignedIn>
        </>
    )
}