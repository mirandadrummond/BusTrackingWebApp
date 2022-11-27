import { MenuItem, InputLabel, Select, Button } from "@mui/material";
import { Container } from "@mui/system";
import * as React from 'react'
import { useEffect, useState } from 'react'; 
import { getBusStops } from "../services/fetch";

export function SearchByStops() {
    const [startStop, updateStartStop] = React.useState('');
    const [endStop, updateEndStop] = React.useState('');

    // Call List of Stops from Database!
    const listOfStops = ['A', 'B', 'C', 'D']

    const handleStartChange = (event, newStartStop) => {
        updateStartStop(newStartStop.props.value)
    }

    const handleEndChange = (event, newEndStop) => {
        updateEndStop(newEndStop.props.value)
    }

    // getBusStops().then(r => {
    //     console.log(r)
    // })

    useEffect(() => {
        console.log("test1");
        fetch('http://localhost:4000/bus_stop').then(response => {
            console.log("test2")
            if (response.ok) {
                console.log(response.json)
                return response.json
            }
            throw response
        }).catch(err => {
            console.error(`Error fetching data ${err}`)
        })
    })

    return (
        <Container>
            <InputLabel id="selectStartStop">Starting Stop</InputLabel>
            <Select
                id="selectStartStop"
                value={startStop}
                label="Starting Stop"
                onChange={handleStartChange}
            >
                {
                    listOfStops.filter(stop => stop !== endStop).map(filteredStop => {
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
                    listOfStops.filter(stop => stop !== startStop).map(filteredStop => {
                        return <MenuItem value={filteredStop}>{filteredStop}</MenuItem>
                    })
                }
            </Select>
            <Button>Search</Button>
        </Container>
    )
}