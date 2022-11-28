import { MenuItem, InputLabel, Select, Button } from "@mui/material";
import { Container } from "@mui/system";
import * as React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from "react-router-dom";

export function SearchByStops() {
    const [startStop, updateStartStop] = useState('');
    const [endStop, updateEndStop] = useState('');
    const [stops, setStops] = useState(['Not Loaded']);
    const [loading, isLoading] = useState(true);
    const [error, isError] = useState(false);

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
                    error ? <div>Encountered Error when loading. Please refresh the page.</div> :
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
                                        return <MenuItem value={filteredStop}>{filteredStop}</MenuItem>
                                    })
                                }
                            </Select>
                            <Link to="stop_status">
                                <Button>Search</Button>
                            </Link>
                        </Container>
            }
        </div>
    )
}