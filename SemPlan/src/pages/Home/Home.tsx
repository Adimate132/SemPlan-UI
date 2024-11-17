import styles from './Home.module.scss';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignOutButton, UserButton } from "@clerk/clerk-react";
import { useEffect, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useDropzone } from 'react-dropzone';

export default function Home() {
    const fileRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { isSignedIn } = useUser();
<<<<<<< Updated upstream
    const {user} = useUser();

    // if user not signed in, return to login page
=======

    // Redirect to login if not signed in
>>>>>>> Stashed changes
    useEffect(() => {
        if (!isSignedIn) {
            navigate('/login');
        }
    }, [isSignedIn, navigate]);

<<<<<<< Updated upstream
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
          formData.set("pdf", file); // set the file
          formData.append("email", email); // Add the email
      
          // Send the file and email to the backend
          const response = await fetch("http://localhost:3000/uploadFile", {
            method: "POST",
            body: formData
          });   
      
          if (response.ok) {
            const data = await response.json();
            console.log("File uploaded successfully:", data);
            alert('File uploaded successfully!');
          } else {
            console.error("File upload failed");
            alert('File upload failed.');
          }
        } catch (error) {
          console.error("Error uploading file:", error);
          alert('Error uploading file.');
        }
      };

    return(
=======
    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps,
    } = useDropzone({
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false, // Restrict to a single file
    });

    const acceptedFileItems = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
            <ul>
                {errors.map(e => (
                    <li key={e.code}>{e.message}</li>
                ))}
            </ul>
        </li>
    ));

    return (
>>>>>>> Stashed changes
        <>
            <SignedIn>
                <div className={styles['top']}>
                    <div className={styles['header-and-button']}>
                        <h1 className={styles['header-text']}>SemPlan</h1>
                        <UserButton />
                    </div>
                </div>

<<<<<<< Updated upstream
                <h1 className={styles['someClass']}> from Home page </h1>
                <SignOutButton />
                <h2>profile: <UserButton /> </h2>
                <input type="file" ref={fileRef}/>
                <button onClick={uploadFile}> upload file </button>
            </div>
        </SignedIn>
=======
                <section className={styles['dropzone-container']}>
                    <div {...getRootProps({ className: styles['dropzone'] })}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                        <em>(Only PDF documents will be accepted)</em>
                    </div>
                    <aside>
                        <h4>Accepted files</h4>
                        <ul>{acceptedFileItems}</ul>
                        <h4>Rejected files</h4>
                        <ul>{fileRejectionItems}</ul>
                    </aside>
                </section>
            </SignedIn>
>>>>>>> Stashed changes
        </>
    );
}
