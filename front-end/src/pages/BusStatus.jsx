import { SearchByBus } from "../components/SearchByBus";
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios'
import { Container } from "@mui/system";
import { cleanStopString } from '../utils'

export default function BusStatus() {
    const loc = useLocation();

    const exists = (loc.state.buses.find(bus => parseInt(bus.bus_number) === loc.state.busNum) !== undefined);

    return (
        <>
            <Container>
                <SearchByBus searchVal={loc.state.busNum} />
                {
                    !exists ? <p>The bus you searched for does not exist. Please search one of the <strong>active buses</strong>.</p> :
                        <ShowBus bus={loc.state.busNum} buses={loc.state.buses} />
                }
            </Container>

        </>
    )
}

function ShowBus(props) {
    const [busTimes, setTimes] = useState([]);
    const [loading, isLoading] = useState(true);
    const [error, isError] = useState(false);

    useEffect(() => {
        let busId = props.buses.find(bus => bus.bus_number === `${props.bus}`).bus_id
        const routeNumber = busId === 1 || busId === 2 ? "one" : "two";

        axios(`http://localhost:4000/time_screen_${routeNumber}`).then(response => {
            const times = response.data
            axios(`http://localhost:4000/bus_stop_route_${routeNumber}`).then(response => {
                const stops = response.data
                setTimes(times.map(time => {
                    return { stopName: cleanStopString(stops.find(stop => stop.bus_stop_id === time.stops_number).name), time: time[`bus_${busId}`] }
                }))
            }).catch(err => {
                console.error(`Error fetching data: `, err)
                isError(true);
            })
        }).catch(err => {
            console.error(`Error fetching data: `, err)
            isError(true);
        }).finally(r => isLoading(false));
    }, [])


    const formatTimes = (time) => {
        const currentTime = new Date(Date.now()).getTime();
        const arrivalTime = new Date(time).getTime();
        const diff = new Date(arrivalTime - currentTime)
        console.log(currentTime, arrivalTime, diff)
        return diff.getTime() / 6000;
    }

    return (
        <>
            {
                loading ? <p>Loading data please wait.</p> : error ? <p>Error loading data please refresh the page and try again.</p> :
                    <>
                        <h2>Bus {props.bus} Times:</h2>
                        {
                            busTimes.map(time => {
                                return (
                                    <p>
                                        <span className="stopName">
                                            Stop: <strong>{time.stopName}</strong>
                                        </span>
                                        <span className="stopArrivalTime">
                                            Time till Arrival: <strong>{formatTimes(time.time)} Minutes</strong>
                                        </span>
                                    </p>
                                )
                            })
                        }
                    </>
            }
        </>
    )
}