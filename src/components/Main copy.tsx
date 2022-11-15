import React, { useState, useEffect, createContext } from "react";

import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

import { trpc } from "../trpc";

import {
    createBrowserRouter,
    RouterProvider,
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import { UserProvider } from "./UserContext";

import AllJourneys from "./pages/AllJourneys";
import { Settings } from "./pages/Settings";
import { Upload } from "./pages/Upload";
import { Search } from "./pages/Search";

import Header from "./UI/organisms/Header";

const Main = () => {
    const [googleProfile, setGoogleProfile] = useState(null);
    const clientId =
        "694567626339-5hp8amnkfjvir4csh9g2ij63oc05vn01.apps.googleusercontent.com";
    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: "",
            });
        };
        gapi.load("client:auth2", initClient);
    });

    const onSuccess = (res) => {
        setGoogleProfile(res.profileObj);
    };

    const onFailure = (err) => {
        console.log("failed", err);
    };

    const logOut = () => {
        setGoogleProfile(null);
    };

    return (
        <>
            {googleProfile ? (
                <UserProvider>
                    <Header></Header>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<AllJourneys />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/upload" element={<Upload />} />
                            <Route path="/search" element={<Search />} />
                        </Routes>
                    </BrowserRouter>

                    <div className="flex justify-center content-center mt-5">
                        <GoogleLogout
                            clientId={clientId}
                            buttonText="Log out"
                            onLogoutSuccess={logOut}
                        />
                    </div>
                </UserProvider>
            ) : (
                <>
                    <Header></Header>
                    <div className="flex justify-center content-center mt-5">
                        <GoogleLogin
                            clientId={clientId}
                            buttonText="Sign in with Google"
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            cookiePolicy={"single_host_origin"}
                            isSignedIn={true}
                        />
                    </div>
                </>
            )}
        </>
    );
};

export { Main };
