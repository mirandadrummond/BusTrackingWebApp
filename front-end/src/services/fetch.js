
export async function getBusStops() {
    fetch('http://localhost:4000/bus_stop').then(response => {
        if (response.ok) {
            console.log(response.json)
            return response.json
        }
        throw response
    }).catch(err => {
        console.error(`Error fetching data ${err}`)
    })
}