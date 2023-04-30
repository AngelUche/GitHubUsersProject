import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { GithubProvider } from './context/context'
import { Auth0Provider } from "@auth0/auth0-react";



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
       domain="dev-qgagcss7z0yb05dn.us.auth0.com"
      clientId="Gr9rps42wkCuJjs9m9yQUJ6T78R5KjiB"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>,
)
