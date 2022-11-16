import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { trpc } from "./trpc";
import { Main } from "./components/Main";
import "./index.scss";

export const URL = "http://localhost:3000/";
// export const URL = "http://13.42.46.122:3000"

export const App = () => {
    const [queryClient] = useState(() => new QueryClient());

    const [trpcClient] = useState(() =>
        trpc.createClient({
            url: `${URL}/trpc`,
        })
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <Main></Main>
            </QueryClientProvider>
        </trpc.Provider>
    );
};

const root = createRoot(document.getElementById("app")!);
root.render(<App />);
