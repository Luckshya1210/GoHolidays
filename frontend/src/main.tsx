import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppContextProvider } from './contexts/AppContext.tsx'
import { SearchContextProvider } from './contexts/SearchContext.tsx'
import { Toaster } from 'react-hot-toast'
import { GoogleOAuthProvider } from '@react-oauth/google'
const queryClient=new QueryClient({
  defaultOptions:{
    queries:{
      retry:0
    }
  }
})
ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId='107261925659-arh9ik2s99c9ulp5kjgvepro2olg30qh.apps.googleusercontent.com'> 
  <React.StrictMode>
    <QueryClientProvider client={queryClient} >
      <AppContextProvider>
        <SearchContextProvider>
          
             
            <App /> 
          <Toaster toastOptions={{duration:5000}}/>
        </SearchContextProvider>
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
  </GoogleOAuthProvider>,
)
