import React, { useEffect, useState } from "react";
import { getDuration } from "../../../helpers/getDuration";

import moment from "moment";

export default function Journeys({ children }: any) {
    if (children === undefined) {
        console.log("not rendering", children);
        return "nothing";
    }

    const [trips, setTrips] = useState(children);

    // console.log("children", children);

    console.log("trips", trips);

    // return "nothing";

    return (
        // console.log(children)

        trips
            // .filter(trip => { return trip.activitySegment?.activityType == "IN_PASSENGER_VEHICLE" || trip.placeVisit?.location.name })
            .map((trip: any, index: any) => {
                // console.log(trip.activitySegment?.activityType);
                try {
                    return (
                        <div className="sm:container bg-zinc-700 my-5 flex flex-row font-light rounded-md">
                            <div className="flex flex-col justify-center items-center mx-5">
                                <div className="text-4xl font-extralight">
                                    {moment(trip.startTime).format("DD")}
                                </div>
                                <div>
                                    {moment(trip.startTime).format("HH:mm")}
                                </div>
                            </div>
                            <div className="stat">
                                <div className="flex flex-row">
                                    <div className="text-xl text-slate-300">
                                        {trip.startLocationId?.name
                                            ? trip.startLocationId.name
                                            : trip.startLocationId.address}{" "}
                                    </div>
                                    <div className="text-xs text-slate-400 px-2 self-center">
                                        to{" "}
                                    </div>
                                    <div className="text-xl text-slate-300">
                                        {trip.endLocationId?.name
                                            ? trip.endLocationId?.name
                                            : trip.endLocationId?.address}
                                    </div>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <div className="text- text-slate-300">
                                        {(
                                            (trip.distance / 1000) *
                                            0.621371
                                        ).toFixed(2) + " miles"}
                                    </div>
                                    <div className="self-end">
                                        {getDuration({
                                            startTime: trip.startTime,
                                            endTime: trip.endTime,
                                        })}
                                    </div>
                                </div>
                            </div>
                            {/* <div className="divider"></div> */}
                        </div>
                        // </li>
                    );
                } catch (e) {
                    console.log(e);
                }
            })
    );
}
