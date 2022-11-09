import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { trpc } from "./trpc";
import { Main } from "./components/pages/Main";
import "./index.scss";

const client = new QueryClient();

const App = () => {
    const [trpcClient] = useState(() =>
        trpc.createClient({
            url: "http://localhost:2000/trpc",
        })
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={client}>
            <QueryClientProvider client={client}>
                <Main />
            </QueryClientProvider>
        </trpc.Provider>
    );
};

const container = document.getElementById("app");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);

// import { createRoot } from 'react-dom/client';
// const container = document.getElementById('app');
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(<App tab="home" />);
