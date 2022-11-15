import React from "react";
import { GoogleAuthProvider, useGoogleProfile } from "./GoogleAuthContext";
import { UserProvider, useUser } from "./UserContext";
import { Router } from "./Router";
import Header from "./UI/organisms/Header";
const Main = () => {
    return (
        <GoogleAuthProvider>
            {useGoogleProfile() ? (
                <UserProvider>
                    {useUser() ? (
                        <>
                            <Header></Header>
                            <Router></Router>
                        </>
                    ) : null}
                </UserProvider>
            ) : null}
        </GoogleAuthProvider>
    );
};

export { Main };
