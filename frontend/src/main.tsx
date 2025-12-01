import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { StrictMode } from "react";
import { ApolloProvider } from "@apollo/client/react"; // Using react subpath to fix package issue
import client from "./apollo.ts";
import { AuthProvider } from "./context/AuthContext";

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      {/* Makes GraphQL accessible throughout the app */}
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>,
);
