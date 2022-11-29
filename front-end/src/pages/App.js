import { useState } from 'react';
import Container from '@mui/material/Container';
import { ToggleButton, ToggleButtonGroup, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, DialogContentText } from '@mui/material';
import { SearchByBus } from '../components/SearchByBus';
import { SearchByStops } from '../components/SearchByStops';
import AdminLogin from "../components/AdminLogin";

function App() {
  const [selectedButton, updatedSelected] = useState('');
  const [isAdmin, setAdmin] = useState(false)

  const showSelectedSearch = (event, newSearch) => {
    updatedSelected(newSearch);
  }

  return (
    <div className="App">
      <Container id="search">
        <ToggleButtonGroup
          value={selectedButton}
          exclusive
          onChange={showSelectedSearch}
          id="mainAppActions"
        >
          <ToggleButton value='byBus'>Search by Bus</ToggleButton>
          <ToggleButton value='byStop'>Search by Stops</ToggleButton>
          <AdminLogin setAdmin={setAdmin} loggedIn={isAdmin} />
        </ToggleButtonGroup>
      </Container>
      <Container id="searchBar">
        {
          selectedButton === '' ? <></> :
            <SearchBar selected={selectedButton} />
        }
      </Container>
      <AdminControls isAdmin={isAdmin}/>
    </div>
  );
}

function SearchBar(props) {
  return (
    <div id="searchType">
      {
        props.selected === 'byBus' ? <SearchByBus searchVal={''} /> : <SearchByStops startStop='' endStop='' bStops={['Not Loaded']} loading={true} />
      }
    </div>
  )
}

function AdminControls(props) {

  return (
    <Container id="adminControls">
      {
        !props.isAdmin ? <></> :
          <div>
            <AddBusButton />
          </div>
      }
    </Container>
  )
}

function AddBusButton() {

  const [addBusVisible, updateBusButton] = useState(false);
  const [newBusNum, setNewBusNum] = useState('')

  const handleClickOpen = () => {
    updateBusButton(true)
  }

  const handleClose = () => {
    updateBusButton(false)
  }

  const handleNewBusNumber = (event) => {
    const re = /^[0-9\b]+$/;

    if (event.target.value === '' || re.test(event.target.value)) {
      setNewBusNum(event.target.value)
    }
  }

  const handleBusAdd = () => {

  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Bus
      </Button>
      <Dialog open={addBusVisible} onClose={handleClose}>
        <DialogTitle>Admin Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the bus number you'd like to add
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="add-bus"
            label="Enter Bus Number"
            variant="standard"
            value={newBusNum}
            onChange={handleNewBusNumber}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleBusAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default App;
