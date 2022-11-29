import { SearchByStops } from "../components/SearchByStops";
import { Container } from '@mui/material/';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function StopStatus() {
    const loc = useLocation();
    const busStops = loc.state.busStops
    const [loading, isLoading] = useState(true);
    const [screenTimes, setTimes] = useState([]);
    const [error, isError] = useState(false);

    console.log(loc.state, screenTimes)

    useEffect(() => {
        axios('http://localhost:4000/time_screen').then(response => {
            setTimes(response.data)
        }).catch(err => {
            console.error(`Error fetching data: `, err)
            isError(true);
        }).finally(r => isLoading(false));
    }, [])

    return (
        <>
            {
                loading ?
                <SearchByStops startStop={loc.state.startStop} endStop={loc.state.endStop} bStops={busStops} loading={false} /> :
                <ExpectedTimes start={loc.state.startStop} end={loc.state.endStop} stops={busStops} times={screenTimes}/>
            }
        </>
    )
}

function ExpectedTimes(props) {

    const timeToStart = () => {
        return 10
    }

    const timeToStop = () => {
        return 30
    }

    return (
        <Container>

        </Container>
    )
}