
export const getLink = (loc, defaultLink) => {
    if (loc.pathname !== '/') {
        return '.'
    }
    return defaultLink
}

export const getStops = (arr) => {
    return arr.map((currentStop, i, arr) => {
        let stopName = currentStop.name;
        return { id: currentStop.bus_stop_id, name: cleanStopString(stopName) }
    })
}

export const cleanStopString = (str) => {
    if (!isNaN(parseInt(str.charAt(str.length - 1)) && isNaN(parseInt(str.charAt(str.length - 2))))) {
        let direction = parseInt(str.charAt(str.length - 1)) === 1 ? ' (Outbound)' : ' (Inbound)'
        return str.slice(0, str.length - 1) + direction
    }
    return str
}

export const formatTimes = (time, time2) => {
    console.log(time, time2)
    const currentTime = new Date(Date.now()).getTime();
    const arrivalTime = new Date(time).getTime();
    if (time2 === undefined) {
        let diff = new Date(arrivalTime - currentTime).getTime() / 60000
        if (diff < 1) diff *= -1
        return diff.toFixed(0);
    } else {
        const endStopTime = new Date(time2).getTime()
        let diff = new Date((arrivalTime - currentTime) + (endStopTime - arrivalTime)).getTime() / 60000

        if (diff < 1) diff *= -1
    
        return diff.toFixed(0);
    }
}