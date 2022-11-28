import { MenuItem, InputLabel, Select, Button } from "@mui/material";
import { Container } from "@mui/system";
import * as React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import { getLink } from "../utils";

export function SearchByStops(props) {
    const [startStop, updateStartStop] = useState(props.startStop);
    const [endStop, updateEndStop] = useState(props.endStop);
    const [stops, setStops] = useState(props.bStops);
    const [loading, isLoading] = useState(props.loading);
    const [error, isError] = useState(false);
    const location = useLocation();

    const handleStartChange = (event, newStartStop) => {
        updateStartStop(newStartStop.props.value)
    }

    const handleEndChange = (event, newEndStop) => {
        updateEndStop(newEndStop.props.value)
    }

    useEffect(() => {
        if (stops[0] === 'Not Loaded') {
            axios('http://localhost:4000/bus_stop').then(response => {
                setStops(response.data.map(v => v.name))
            }).catch(err => {
                console.error(`Error fetching data: `, err)
                isError(true);
            }).finally(r => isLoading(false));
        }
    })

    return (
        <div>
            {
                loading ? <div>Loading</div> :
                    error ? <div id="stop-search-error">Encountered Error when loading. Please refresh the page.</div> :
                        <Container>
                            <InputLabel id="selectStartStop">Starting Stop</InputLabel>
                            <Select
                                id="selectStartStop"
                                value={startStop}
                                label="Starting Stop"
                                onChange={handleStartChange}
                            >
                                {
                                    stops.filter(stop => stop !== endStop).map(filteredStop => {
                                        return (
                                            <MenuItem value={filteredStop}>{filteredStop}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                            <InputLabel id="selectEndStop">Ending Stop</InputLabel>
                            <Select
                                id="selectEndStop"
                                value={endStop}
                                label="Ending Stop"
                                onChange={handleEndChange}
                            >
                                {
                                    stops.filter(stop => stop !== startStop).map(filteredStop => {
                                        return <MenuItem
                                            key={`key-${filteredStop}`}
                                            value={filteredStop}>
                                            {filteredStop}
                                        </MenuItem>
                                    })
                                }
                            </Select>
                            <Link to={getLink(location, 'stop_status')} state={{ busStops: stops, startStop: startStop, endStop: endStop }}>
                                <Button>Search</Button>
                            </Link>
                        </Container>
            }
        </div>
    )
}