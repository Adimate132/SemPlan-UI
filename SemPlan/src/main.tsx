import "./main.scss" // import global styles
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Routing from './routes/Routing';
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl={"/login"}>
      <Routing />
    </ClerkProvider>
  </StrictMode>
)
