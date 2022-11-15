import React, { useState, useEffect, useContext, createContext } from "react";

import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

const googleProfile = {
    name: "name",
    email: "email",
    imageUrl: "imageUrl",
    givenName: "givenName",
    googleId: "googleId",
};

const GoogleProfileContext = createContext(googleProfile);

export function useGoogleProfile() {
    return useContext(GoogleProfileContext);
}

export function GoogleAuthProvider({ children }) {
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
    }, []);

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
                <>
                    <GoogleProfileContext.Provider value={googleProfile}>
                        {children}
                    </GoogleProfileContext.Provider>
                    <div className="flex justify-center content-center mt-5">
                        <GoogleLogout
                            clientId={clientId}
                            buttonText="Log out"
                            onLogoutSuccess={logOut}
                        />
                    </div>
                </>
            ) : (
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
            )}
        </>
    );
}
