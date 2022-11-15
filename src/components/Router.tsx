import React from "react";

import {
    createBrowserRouter,
    RouterProvider,
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import AllJourneys from "./pages/AllJourneys";
import { Settings } from "./pages/Settings";
import { Upload } from "./pages/Upload";
import { Search } from "./pages/Search";

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AllJourneys />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/search" element={<Search />} />
            </Routes>
        </BrowserRouter>
    );
}
