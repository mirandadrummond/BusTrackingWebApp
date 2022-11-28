import '../styles/App.css';
import { useState } from 'react';
import Container from '@mui/material/Container';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
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
      <AdminLogin setAdmin={setAdmin} loggedIn={isAdmin}/>
      <Container id="search">
        <ToggleButtonGroup
          value={selectedButton}
          exclusive
          onChange={showSelectedSearch}
        >
          <ToggleButton value='byBus'>Search by Bus</ToggleButton>
          <ToggleButton value='byStop'>Search by Stops</ToggleButton>
        </ToggleButtonGroup>
      </Container>
      <Container id="searchBar">
        {
          selectedButton === '' ? <></> :
            <SearchBar selected={selectedButton} />
        }
      </Container>
      <Container>
        {
          !isAdmin ? <></> : <div>Logged in!</div> 
        }
      </Container>
    </div>
  );
}

function SearchBar(props) {
  return (
    <div>
      {
        props.selected === 'byBus' ? <SearchByBus searchVal={''} /> : <SearchByStops startStop='' endStop='' bStops={['Not Loaded']} loading={true} />
      }
    </div>
  )
}

export default App;
