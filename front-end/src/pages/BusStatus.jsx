import { SearchByBus } from "../components/SearchByBus";
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios'
import { Container } from "@mui/system";

export default function BusStatus() {
    const loc = useLocation();
    const [buses, setBuses] = useState([]);
    const [loading, isLoading] = useState(true)
    const [error, isError] = useState(false);

    useEffect(() => {
        axios('http://localhost:4000/buses').then(response => {
            setBuses(response.data.map(b => b.number))
        }).catch(err => {
            console.error(`Error fetching data: `, err)
            isError(true);
        }).finally(r => isLoading(false));
    }, [])

    return (
        <div>
            {
                loading ? <div>Loading Data</div> : error ? <div>Error Loading Data. Please refresh the page and try again.</div> :
                    <Container>
                        <SearchByBus searchVal={loc.state.busNum}/>
                        <ShowBus bus={loc.state.busNum} buses={buses} />
                    </Container>
            }
        </div>
    )
}

function ShowBus(props) {
    return (
        <div>Bus Num: {props.bus}</div>
    )
}