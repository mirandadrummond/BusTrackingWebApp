import { SearchByStops } from "../components/SearchByStops";
import { Container } from '@mui/material/';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { formatTimes } from '../utils'
import axios from 'axios';

export default function StopStatus() {
    const loc = useLocation();
    const busStops = loc.state.busStops

    return (
        <>
            <SearchByStops startStop={loc.state.startStop} endStop={loc.state.endStop} bStops={busStops} loading={false} routes={loc.state.routes} />
            <ExpectedTimes line={loc.state.line} start={loc.state.startStop} end={loc.state.endStop} stops={busStops} />

        </>
    )
}

function ExpectedTimes(props) {
    const [loading, isLoading] = useState(true);
    const [screenTimes, setTimes] = useState([]);
    const [error, isError] = useState(false);
    const [buses, setBuses] = useState([])

    useEffect(() => {
        const lineStr = props.line === 0 ? "one" : "two"
        axios(`http://localhost:4000/time_screen_${lineStr}`).then(response => {
            axios('http://localhost:4000/buses').then(response => {
                setBuses(response.data)
            }).catch(err => {
                console.error(`Error fetching data: `, err)
                isError(true);
            })
            setTimes(response.data)
        }).catch(err => {
            console.error(`Error fetching data: `, err)
            isError(true);
        }).finally(r => isLoading(false));
    }, [])

    const startStopId = props.stops.find(stop => stop.stop_name === props.startStop)
    const endStopId = props.stops.find(stop => stop.stop_name === props.endStop)

    // const timeToStart = formatTimes(times[startStopId - 1].bus_1) < 0;

    // in utils!
    // const formatTimes = (t1) => { }

    return (
        <Container>
            {
                loading ? <p>Loading data please wait</p> : error ? <p>Error loading data please refresh the page</p> :
                    <div>
                        <div>
                            Time to {props.start}:
                            {
                                {/* Object.keys(times[startStopId - 1]).slice(1, ) */}
                            }
                        </div>
                        <div>

                        </div>
                    </div>
            }
        </Container>
    )
}