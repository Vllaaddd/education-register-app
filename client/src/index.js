import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './i18n.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={<div>Loading...</div>}>
    <GoogleOAuthProvider clientId='896941666458-tkpf4un0vov0un3n7vqvpv8m8fpkn9v5.apps.googleusercontent.com'>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
        </Provider>
      </PersistGate>
    </GoogleOAuthProvider>
  </Suspense>
);