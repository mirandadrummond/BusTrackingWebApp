import { TextField, Button } from '@mui/material';
import { Container } from '@mui/system';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { getLink } from '../utils';
import { useEffect, useState } from 'react';
import axios from 'axios'

export function SearchByBus(props) {
    const location = useLocation();
    const [busNumber, setNumber] = useState(props.searchVal);
    const [buses, setBuses] = useState([]);
    const [loading, isLoading] = useState(true);
    const [error, isError] = useState(false);

    const handleChange = (event) => {
        const re = /^[0-9\b]+$/;

        if (event.target.value === '' || re.test(event.target.value)) {
            setNumber(event.target.value)
        }
    }

    useEffect(() => {
        axios('http://localhost:4000/buses').then(response => {
            setBuses(response.data)
        }).catch(err => {
            console.error(`Error fetching data: `, err)
            isError(true);
        }).finally(res => isLoading(false))
    }, [])

    return (
        <>
            {
                loading ? <p>Loading please wait.</p> : error ? <p>Error loading data please refresh the page.</p> :
                    <Container id="searchByBus" className="actionBlock">
                        <div>
                            <TextField onChange={handleChange} value={busNumber} id="outlined-basic" label="Enter Bus Number" variant="outlined" />
                            <Link to={getLink(location, 'bus_status')} state={{ busNum: parseInt(busNumber), buses: buses, exists: true }}>
                                <Button>Search</Button>
                            </Link>
                        </div>
                        <div id="activeBusText">
                            <span>Active Buses:   </span>
                            {
                                buses.map(bus => {
                                    return (
                                        <span>Bus: {bus.bus_number} </span>
                                    )
                                })
                            }
                        </div>
                    </Container>
            }
        </>
    )
}