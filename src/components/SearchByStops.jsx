import { MenuItem, InputLabel, Select, Button } from "@mui/material";
import { Container } from "@mui/system";
import * as React from 'react'

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