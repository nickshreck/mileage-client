import React, { useState, useEffect } from "react";
import { trpc } from "../../trpc";

export const Settings = ({ profile }: any) => {
    const deleteAll = trpc.useMutation("deleteAll");

    const deleteAllFromDB = () => {
        deleteAll.mutate({
            userId: profile.id,
        });
    };

    return (
        <>
            <TriggerScan></TriggerScan>

            <div className="flex justify-center content-center mt-5">
                <button
                    className="btn btn-wide"
                    onClick={() => deleteAllFromDB()}
                >
                    Delete All
                </button>
            </div>
        </>
    );
};

export const TriggerScan = ({ profile }: any) => {
    const createLocations = trpc.useMutation("dataTransfer");

    const locations = () => {
        createLocations.mutate({ googleId: "109063712585037189369" });
    };

    return (
        <>
            <div className="flex justify-center content-center mt-5">
                <button className="btn btn-wide" onClick={() => locations()}>
                    Google Data Transfer
                </button>
            </div>
        </>
    );
};
