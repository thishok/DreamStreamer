import React from 'react';
import './App.css';
import { Amplify } from 'aws-amplify';
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

function App() {
  // Custom theme object for the Authenticator
  const theme = {
    name: 'custom-theme',
    tokens: {
      components: {
        button: {
          backgroundColor: { value: '#1a202c' },  // Dark gray background for buttons
          color: { value: '#ffffff' },            // White text color
          _hover: {
            backgroundColor: { value: '#2d3748' }, // Slightly lighter gray on hover
          },
        },
        input: {
          backgroundColor: { value: '#f7fafc' },  // Light gray background for input fields
          color: { value: '#2d3748' },            // Dark gray text color for inputs
        },
        card: {
          backgroundColor: { value: '#2d3748' },  // Dark gray background for cards
          color: { value: '#ffffff' },            // White text color for card content
        },
        label: {
          color: { value: '#e2e8f0' },            // Light gray color for labels
        },
        signInButton: {
          backgroundColor: { value: '#3182ce' },  // Blue background for the Sign In button
          color: { value: '#ffffff' },            // White text color
          _hover: {
            backgroundColor: { value: '#2b6cb0' }, // Darker blue on hover
          },
        },
      },
    },
  };

  return (
    <div className="App">
      <Authenticator theme={theme}>
        {({ signOut }) => (
          <main className="flex flex-col items-center justify-center h-screen bg-gray-900">
            <header className="App-header">
              <button
                onClick={signOut}
                className="mt-5 p-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
              >
                Sign Out
              </button>
            </header>
          </main>
        )}
      </Authenticator>
    </div>
  );
}

export default withAuthenticator(App);
