import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { trpc } from "./trpc";
import { Main } from "./components/pages/Main";
import "./index.scss";

const client = new QueryClient();

export const App = () => {
    const [trpcClient] = useState(() =>
        trpc.createClient({
            url: "http://13.42.46.122:2000/trpc",
            // url: "http://localhost:2000/trpc",
        })
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={client}>
            <QueryClientProvider client={client}>
                <Main></Main>
            </QueryClientProvider>
        </trpc.Provider>
    );
};

const root = createRoot(document.getElementById("app")!);
root.render(<App />);
