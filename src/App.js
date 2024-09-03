import React, { useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import Home from './pages/Home';
import DreamStreamer from './components/DreamStreamer/DreamStreamer';

Amplify.configure(awsExports);

function App({ signOut }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically redirect to /dreamstreamer after successful login
    navigate('/dreamstreamer');
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dreamstreamer" element={<DreamStreamer signOut={signOut} />} />
    </Routes>
  );
}

function AppWithAuth() {
  return (
    <Router>
      <Authenticator>
        {({ signOut }) => <App signOut={signOut} />}
      </Authenticator>
    </Router>
  );
}

export default withAuthenticator(AppWithAuth);
