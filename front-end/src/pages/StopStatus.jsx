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
    const [times, setTimes] = useState([]);
    const [error, isError] = useState(false);
    const [buses, setBuses] = useState([])
    const [line, updateLine] = useState(props.line);

    useEffect(() => {
        const lineStr = line === 0 ? "one" : "two"
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
    }, [line])

    const startStopId = props.stops.find(stop => stop.name === props.start)
    const endStopId = props.stops.find(stop => stop.name === props.end)

    const routeDiff = line === 0 ? 0 : 8;

    return (
        <Container>
            {
                loading ? <p>Loading data please wait</p> : error ? <p>Error loading data please refresh the page</p> :
                    <div id="betweenStops">
                        <div>
                            <h2 id="stopSeach">
                                Time to {props.start}:
                            </h2>
                            {
                                line === 0 ?
                                    <>
                                        <p>Bus 151: <strong>{formatTimes(times.find(time => time.stops_number === startStopId.id)['bus_1'])} Minutes</strong></p>
                                        <p>Bus 147: <strong>{formatTimes(times.find(time => time.stops_number === startStopId.id)['bus_2'])} Minutes</strong></p>
                                    </>
                                    :
                                    <>
                                        <p>Bus 143: <strong>{formatTimes(times.find(time => time.stops_number === (startStopId.id + routeDiff))['bus_3'])} Minutes</strong></p>
                                        <p>Bus 156: <strong>{formatTimes(times.find(time => time.stops_number === (endStopId.id + routeDiff))['bus_4'])} Minutes</strong></p>
                                    </>
                            }
                        </div>
                        <div>
                            <h2 id="stopSeach">
                                Time to {props.end}:
                            </h2>
                            {
                                line === 0 ?
                                    <>
                                        <p>Bus 151: <strong>{formatTimes(times.find(time => time.stops_number === startStopId.id)['bus_1'], times.find(time => time.stops_number === endStopId.id)['bus_1'])} Minutes</strong></p>
                                        <p>Bus 147: <strong>{formatTimes(times.find(time => time.stops_number === startStopId.id)['bus_2'], times.find(time => time.stops_number === endStopId.id)['bus_2'])} Minutes</strong></p>
                                    </>
                                    :
                                    <>
                                        <p>Bus 143: <strong>{formatTimes(times.find(time => time.stops_number === (startStopId.id + routeDiff))['bus_3'], times.find(time => time.stops_number === (endStopId.id + routeDiff))['bus_3'])} Minutes</strong></p>
                                        <p>Bus 156: <strong>{formatTimes(times.find(time => time.stops_number === (startStopId.id + routeDiff))['bus_4'], times.find(time => time.stops_number === (endStopId.id + routeDiff))['bus_4'])} Minutes</strong></p>
                                    </>
                            }
                        </div>
                    </div>
            }
        </Container>
    )
}