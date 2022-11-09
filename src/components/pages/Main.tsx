import ViewAllJourneys from "../templates/ViewAllJourneys";

import React, { useState, useEffect } from "react";

import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

import { trpc } from "../../trpc";
import { string } from "zod";

const User = ({ profile, children }: any) => {
    const user = trpc.useQuery([
        "getUser",
        {
            googleId: profile.googleId,
            name: profile.name,
            email: profile.email,
            imageUrl: profile.imageUrl,
        },
    ]);

    return <div>{children}</div>;
};

const Main = () => {
    const [profile, setProfile] = useState(null);
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

    console.log("profile main", profile);

    const onSuccess = (res) => {
        console.log("logged in", res);
        setProfile(res.profileObj);
    };

    const onFailure = (err) => {
        console.log("failed", err);
    };

    const logOut = () => {
        setProfile(null);
    };

    return (
        <>
            {profile ? (
                <>
                    {/* <div>
                        //     <img src={profile.imageUrl} alt="user image" />
                        //     <h3>User Logged in</h3>
                        //     <p>Name: {profile.name}</p>
                        //     <p>Email Address: {profile.email}</p>
                        // </div> */}
                    <User profile={profile}>
                        {/* {console.log("profile inside", profile)} */}
                        <ViewAllJourneys />
                        <GoogleLogout
                            clientId={clientId}
                            buttonText="Log out"
                            onLogoutSuccess={logOut}
                        />
                    </User>
                </>
            ) : (
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={"single_host_origin"}
                    isSignedIn={true}
                />
            )}
        </>
    );
};

export { Main };
