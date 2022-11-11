import React, { useEffect, useState } from "react";
import DateSelector from "../../UI/molecules/DateSelector";

export const DateHeader = ({
    date,
    setDate,
}: {
    date: { month: number; year: number };
    setDate: any;
}) => {
    return (
        <div className="navbar-center z-10">
            <div className="container mx-auto">
                <div className="flex justify-center content-center">
                    <DateSelector date={date} setDate={setDate} />
                </div>
            </div>
        </div>
    );
};
