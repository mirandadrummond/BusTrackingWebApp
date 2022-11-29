
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
        let direction = parseInt(str.charAt(str.length - 1)) === 1 ? ' (Inbound)' : ' (Outbound)'
        return str.slice(0, str.length - 1) + direction
    }
    return str
}