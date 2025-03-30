import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [isNewUser, setIsNewUser] = useState<boolean | null>(null);

  useEffect(() => {
    // Get token and username from URL parameters
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const username = params.get('username');
    const isNew = params.get('isNewUser') === 'true';
    
    if (token && username) {
      // Store in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      
      // Set status for feedback
      setStatus('success');
      setIsNewUser(isNew);
      
      // Redirect to dashboard after a short delay to show feedback
      setTimeout(() => {
        navigate('/Dashboard');
      }, 1500);
    } else {
      // Handle error
      setStatus('error');
      setTimeout(() => {
        navigate('/Signin?error=auth_failed');
      }, 2000);
    }
  }, [navigate]);
  
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center p-8 rounded-lg shadow-md bg-gray-50 max-w-md">
        {status === 'processing' && (
          <>
            <h2 className="text-xl font-semibold mb-2">Processing authentication...</h2>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          </>
        )}
        
        {status === 'success' && (
          <>
            <div className="text-green-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">
              {isNewUser ? 'Welcome to Conscious!' : 'Welcome back!'}
            </h2>
            <p className="text-gray-600">
              {isNewUser 
                ? 'Your account has been created successfully.' 
                : 'You have been logged in successfully.'}
            </p>
            <p className="text-gray-500 mt-2">Redirecting to dashboard...</p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <div className="text-red-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Authentication Failed</h2>
            <p className="text-gray-600">Unable to authenticate with Google.</p>
            <p className="text-gray-500 mt-2">Redirecting to sign in page...</p>
          </>
        )}
      </div>
    </div>
  );
}