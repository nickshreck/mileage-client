import React, { useState, useEffect } from "react";
import DropDown from "../atoms/DropDown";

export default function DateSelector({
    date,
    setDate,
}: {
    date: { month: number; year: number };
    setDate: any;
}) {
    const years = [
        { label: "2012", value: 2012 },
        { label: "2013", value: 2013 },
        { label: "2014", value: 2014 },
        { label: "2015", value: 2015 },
        { label: "2016", value: 2016 },
        { label: "2017", value: 2017 },
        { label: "2018", value: 2018 },
        { label: "2019", value: 2019 },
        { label: "2020", value: 2020 },
        { label: "2021", value: 2021 },
        { label: "2022", value: 2022 },
    ];

    const months = [
        { label: "January", value: 1 },
        { label: "February", value: 2 },
        { label: "March", value: 3 },
        { label: "April", value: 4 },
        { label: "May", value: 5 },
        { label: "June", value: 6 },
        { label: "July", value: 7 },
        { label: "August", value: 8 },
        { label: "September", value: 9 },
        { label: "October", value: 10 },
        { label: "November", value: 11 },
        { label: "December", value: 12 },
    ];

    const [month, setMonth] = useState(date.month);
    const [year, setYear] = useState(date.year);

    useEffect(() => {
        setDate({ month, year });
    }, [month, year]);

    return (
        <>
            <DropDown startValue={year} data={years} setChange={setYear} />
            <DropDown startValue={month} data={months} setChange={setMonth} />
        </>
    );
}
