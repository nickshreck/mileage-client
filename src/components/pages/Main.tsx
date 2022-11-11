import React, { useState, useEffect } from "react";

import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

import { trpc } from "../../trpc";

import {
    createBrowserRouter,
    RouterProvider,
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import ViewAllJourneys from "../templates/ViewAllJourneys";
import { Settings } from "./Settings";
import { Upload } from "./Upload";
import { Search } from "./Search";

import Header from "../UI/organisms/Header";

const User = ({ googleProfile, children }: any) => {
    const user = trpc.useQuery([
        "getUser",
        {
            googleId: googleProfile.googleId,
            name: googleProfile.name,
            email: googleProfile.email,
            imageUrl: googleProfile.imageUrl,
        },
    ]);

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { profile: user.data });
        }
        return child;
    });

    return <div>{childrenWithProps}</div>;
};

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
        // console.log("logged in", res);
        setGoogleProfile(res.profileObj);
    };

    const onFailure = (err) => {
        console.log("failed", err);
    };

    const logOut = () => {
        setGoogleProfile(null);
    };
    console.log("googleProfile", googleProfile);
    return (
        <>
            {googleProfile ? (
                <>
                    {/* <div>
                        //     <img src={profile.imageUrl} alt="user image" />
                        //     <h3>User Logged in</h3>
                        //     <p>Name: {profile.name}</p>
                        //     <p>Email Address: {profile.email}</p>
                        // </div> */}
                    <Header googleProfile={googleProfile}></Header>
                    <BrowserRouter>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <User googleProfile={googleProfile}>
                                        <ViewAllJourneys
                                            profile={
                                                this?.props?.chilren?.profile
                                            }
                                        />
                                    </User>
                                }
                            />
                            <Route
                                path="/settings"
                                element={
                                    <User googleProfile={googleProfile}>
                                        <Settings
                                            profile={
                                                this?.props?.chilren?.profile
                                            }
                                        />
                                    </User>
                                }
                            />
                            <Route
                                path="/upload"
                                element={
                                    <User googleProfile={googleProfile}>
                                        <Upload
                                            profile={
                                                this?.props?.chilren?.profile
                                            }
                                        />
                                    </User>
                                }
                            />
                            <Route
                                path="/search"
                                element={
                                    <User googleProfile={googleProfile}>
                                        <Search
                                            profile={
                                                this?.props?.chilren?.profile
                                            }
                                        />
                                    </User>
                                }
                            />
                        </Routes>
                    </BrowserRouter>

                    <div className="flex justify-center content-center mt-5">
                        <GoogleLogout
                            clientId={clientId}
                            buttonText="Log out"
                            onLogoutSuccess={logOut}
                        />
                    </div>
                </>
            ) : (
                <>
                    <Header googleProfile=""></Header>
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
