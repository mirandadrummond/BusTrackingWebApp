import '../styles/App.css';
import { useState } from 'react';
import Container from '@mui/material/Container';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { SearchByBus } from '../components/SearchByBus';
import { SearchByStops } from '../components/SearchByStops';

function App() {
  const [selectedButton, updatedSelected] = useState('');

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
    </div>
  );
}

function SearchBar(props) {
  return (
    <div>
      {
        props.selected === 'byBus' ? <SearchByBus searchVal={''}/> : <SearchByStops startStop='' endStop='' bStops={['Not Loaded']} loading={true} />
      }
    </div>
  )
}

export default App;
