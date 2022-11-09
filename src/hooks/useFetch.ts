import { useEffect, useState } from "react";
import { trpc } from "../trpc";

// import axios from 'axios';

type Date = {
    month: string;
    year: string;
}

export const useFetch = (date: Date) => {

    const { month, year } = date;

    // const [data, setData] = useState(null)

    const trips = trpc.useQuery(["getGoogleData", { month, year }]);

    // console.log('useFetch', trips.data)

    return {
        trips
    }

}

export const useCreateLocations = (date: Date) => {

    // const { month, year } = date;

    // // const [data, setData] = useState(null)

    // const trips = trpc.useQuery(["createLocations", { month, year }]);

    // // console.log('useFetch', trips.data)

    // return {
    //     trips
    // }

}