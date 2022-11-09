import moment from 'moment'

type durationTime = {
    startTime: string;
    endTime: string;
}

export function getDuration(durationTime:durationTime) {

    if (!durationTime.startTime) {
        return 'nan'
    }

    var end = moment(durationTime.startTime); //todays date
    var now = moment(durationTime.endTime); // another date
    var duration = moment.duration(now.diff(end));
    var hours = duration.asHours();
    var minutes = duration.asMinutes();

    if (hours < 1) {

        return minutes.toFixed(0) + 'mins'

    }

    return hours.toFixed(0) + 'hrs';

}