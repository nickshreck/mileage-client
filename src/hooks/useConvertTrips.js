import { useEffect, useState } from "react";
import axios from 'axios';

export const useConvertTrips = (date) => {

    const [data, setData] = useState(null)

    useEffect(() => {

        console.log('posting to the file server', JSON.stringify(date.timelineObjects))

        axios.post('http://localhost:2000/mileageData/', { title: "Hello World!", body: JSON.stringify(date.timelineObjects) })
            .then(response => this.setState({ articleId: response.data.id }));

    }, [date])

    return {

        data,
    }

}