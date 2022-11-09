import React, { useEffect, useState } from "react";
import DateSelector from "../UI/molecules/DateSelector";
import Stats from "../UI/organisms/Stats";
import Header from "../UI/organisms/Header";
import Journeys from "../UI/organisms/Journeys";
import { useFetch } from "../../hooks/useFetch";
import { trpc } from "../../trpc";

export default function ViewAllJourneys() {
    const [date, setDate] = useState({ month: 1, year: 2022 });

    // const user = trpc.useQuery(["getUsers"]);

    const user = "2caa2218-7816-433e-978b-81cd086b72fd";

    console.log("date", date);

    const data = trpc.useQuery([
        "getTrips",
        { userId: user, month: date.month, year: date.year },
    ]);

    console.log("data", data);

    const createLocations = trpc.useMutation("createDatabaseData");

    const locations = () => {
        // console.log("users", user.data);
        createLocations.mutate({
            userId: user,
        });
    };

    const deleteAll = trpc.useMutation("deleteAll");

    const deleteAllFromDB = () => {
        // console.log("users", user.data);
        deleteAll.mutate({
            userId: user,
        });
    };

    const addUser = trpc.useMutation("addUser");

    const addUserToDB = () => {
        // console.log("users", user);
        addUser.mutate({
            userId: "1",
            name: "Nicholas",
        });
    };

    return (
        <>
            <Header setDate={setDate}></Header>

            {/* <div className="flex justify-center content-center">
                <Stats></Stats>
            </div> */}

            <div className="flex justify-center content-center mt-5">
                <button className="btn btn-wide" onClick={() => locations()}>
                    Create Locations
                </button>
            </div>

            <div className="flex justify-center content-center mt-5">
                <button
                    className="btn btn-wide"
                    onClick={() => deleteAllFromDB()}
                >
                    Delete All
                </button>
            </div>

            <div className="flex justify-center content-center mt-5">
                <button className="btn btn-wide" onClick={() => addUserToDB()}>
                    Add User
                </button>
            </div>

            {/* <div className="container mx-auto">
                <div className="flex justify-center content-center">
                    <DateSelector setDate={setDate} />
                </div>
            </div> */}

            <div className="container mx-auto">
                <div className="flex flex-col">
                    <Journeys>{data.data}</Journeys>
                </div>
            </div>
        </>
    );
}
