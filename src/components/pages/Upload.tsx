import React, { useState, useEffect } from "react";
import { useUser, useGoogleProfile } from "../UserContext";
import axios from "axios";

import { URL } from "../../App";

const endpoint = `${URL}/upload`;

export const Upload = () => {
    const profile = useUser();
    const [file, setFile] = useState({ selectedFile: null });
    const [progress, setProgress] = useState({ loaded: 0 });
    // this.state = { selectedFile: null, loaded: 0 };
    const handleselectedFile = (event: any) => {
        const newFile = event.target.files[0];
        newFile.googleId = profile.googleId;

        setFile({
            selectedFile: newFile,
        });
    };

    useEffect(() => {
        console.log("progress", progress.loaded);
    }, [progress.loaded]);

    console.log("googleId", profile);

    const handleUpload = () => {
        const data = new FormData();
        console.log("file", file.selectedFile);
        // return;
        data.append("file", file.selectedFile, file.selectedFile.name);
        axios
            .post(endpoint, data, {
                params: {
                    googleId: profile.googleId,
                },
                onUploadProgress: (ProgressEvent) => {
                    setProgress({
                        loaded:
                            (ProgressEvent.loaded / ProgressEvent.total) * 100,
                    });
                },
            })
            .then((res) => {
                console.log(
                    "This is the reply from the upload POST:",
                    res.statusText
                );
            });
    };

    return (
        <>
            <div className="flex justify-center content-center mt-5">
                <input
                    type="file"
                    name=""
                    id=""
                    onChange={handleselectedFile}
                />
            </div>
            <div className="flex justify-center content-center mt-5">
                <button className="btn btn-wide" onClick={handleUpload}>
                    Upload
                </button>
            </div>
            <div className="flex justify-center content-center mt-5">
                Upload Progress: {parseInt(Number(progress.loaded))}%
            </div>
        </>
    );
};
