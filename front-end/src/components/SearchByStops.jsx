import { MenuItem, InputLabel, Select, Button } from "@mui/material";
import { Container } from "@mui/system";
import * as React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import { getLink, getStops } from "../utils";

export function SearchByStops(props) {
    const [startStop, updateStartStop] = useState(props.startStop);
    const [endStop, updateEndStop] = useState(props.endStop);
    const [routes, setRoutes] = useState(props.bStops);
    const [stops, setStops] = useState([]);
    const [loading, isLoading] = useState(props.loading);
    const [line, updateLine] = useState(0);
    const [error, isError] = useState(false);
    const location = useLocation();

    const handleStartChange = (event, newStartStop) => {
        updateStartStop(newStartStop.props.value)
    }

    const handleEndChange = (event, newEndStop) => {
        updateEndStop(newEndStop.props.value)
    }

    const handleLineChange = (event, newLine) => {
        updateLine(newLine.props.value)
    }

    useEffect(() => {
        let busRoutes = []
        axios('http://localhost:4000/bus_stop_route_one').then(response => {
            busRoutes.push({line: 0, stops: getStops(response.data)})
        }).catch(err => {
            console.error(`Error fetching data: `, err)
            isError(true);
        })

        axios('http://localhost:4000/bus_stop_route_two').then(response => {
            busRoutes.push({line: 1, stops: getStops(response.data)})
            console.log("Table 2")
        }).catch(err => {
            console.error(`Error fetching data: `, err)
            isError(true);
        }).finally(r => {
            isLoading(false)

            setRoutes(busRoutes)
            setStops(busRoutes.filter(route => route.line === line)[0].stops)
        });
    }, [])

    useEffect(() => {
        if (!loading) {
            setStops(routes.filter(route => route.line === line)[0].stops)
        }
    }, [line])

    console.log(stops)


    return (
        <div className="actionBlock">
            {
                loading ? <div>Loading</div> :
                    error ? <div id="stop-search-error">Encountered Error when loading. Please refresh the page.</div> :
                        <Container id="stopSelect">
                            <div id="selectInputBlocks">
                                <div class="selectInput">
                                    <InputLabel className="selectStop" id="selectLineLabel">Select Line</InputLabel>
                                    <Select
                                        id="selectLine"
                                        value={line}
                                        label="Route Line"
                                        className="stopSelection"
                                        onChange={handleLineChange}
                                    >
                                        <MenuItem value={0}>Line 1</MenuItem>
                                        <MenuItem value={1}>Line 2</MenuItem>
                                    </Select>
                                </div>
                                <div class="selectInput">
                                    <InputLabel className="selectStop" id="selectStartStop">Starting Stop</InputLabel>
                                    <Select
                                        id="selectStartStop"
                                        value={startStop}
                                        label="Starting Stop"
                                        className="stopSelection"
                                        onChange={handleStartChange}
                                    >
                                        {
                                            stops.filter(stop => stop !== endStop).map(filteredStop => {
                                                return (
                                                    <MenuItem value={filteredStop.name}>{filteredStop.name}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </div>
                                <div className="selectInput">
                                    <InputLabel className="selectStop" id="selectEndStop">Ending Stop</InputLabel>
                                    <Select
                                        id="selectEndStop"
                                        className="stopSelection"
                                        value={endStop}
                                        label="Ending Stop"
                                        onChange={handleEndChange}
                                    >
                                        {
                                            stops.filter(stop => stop !== startStop).map(filteredStop => {
                                                return <MenuItem
                                                    key={`key-${filteredStop.name}`}
                                                    value={filteredStop.name}>
                                                    {filteredStop.name}
                                                </MenuItem>
                                            })
                                        }
                                    </Select>
                                </div>
                            </div>
                            <Link to={getLink(location, 'stop_status')} state={{ busStops: stops, startStop: startStop, endStop: endStop }}>
                                <Button>Search</Button>
                            </Link>
                        </Container>
            }
        </div>
    )
}