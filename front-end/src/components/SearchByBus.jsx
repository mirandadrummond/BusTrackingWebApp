import { TextField, Button } from '@mui/material';
import { Container } from '@mui/system';

export function SearchByBus() {

    return (
        <Container>
            <TextField id="outlined-basic" label="Enter Bus Number" variant="outlined" />
            <Button>Search</Button>
        </Container>
    )
}