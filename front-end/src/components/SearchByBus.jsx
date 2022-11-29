import { TextField, Button } from '@mui/material';
import { Container } from '@mui/system';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { getLink } from '../utils';
import { useState } from 'react';


export function SearchByBus(props) {
    const location = useLocation();
    const [busNumber, setNumber] = useState(props.searchVal);

    const handleChange = (event) => {
        const re = /^[0-9\b]+$/;

        if (event.target.value === '' || re.test(event.target.value)) {
            setNumber(event.target.value)
        }
    }

    return (
        <Container id="searchByBus" className="actionBlock">
            <TextField onChange={handleChange} value={busNumber} id="outlined-basic" label="Enter Bus Number" variant="outlined" />
            <Link to={getLink(location, 'bus_status')} state={{busNum: parseInt(busNumber)}}>
                <Button>Search</Button>
            </Link>
        </Container>
    )
}