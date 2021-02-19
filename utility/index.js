export function getRelativeTime(time) {
    var current = Date.now();
    time = time * 1000;
    var difference = Math.round(current - time);
    var msMinute = 60 * 1000;
    var msHour = msMinute * 60;
    var msDay = msHour * 24;
    var msMonth = msDay * 30;
    var msYear = msMonth * 12;
    
    if(difference < msMinute)
        return `${Math.round(difference / 1000)} seconds ago`;
    if(difference < msHour)
        return `${Math.round(difference / msMinute) } minutes ago`;
    if(difference < msDay)
        return `${Math.round(difference / msHour)} hours ago`;
    if(difference < msMonth)
        return `${Math.round(difference / msDay)} days ago`;
    if(difference < msYear)
        return `${Math.round(difference / msMonth)} months ago`;
    else
        return `${Math.round(difference / msYear)} years ago`;    
}