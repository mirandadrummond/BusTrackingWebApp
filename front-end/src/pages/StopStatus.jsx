import { SearchByStops } from "../components/SearchByStops";
import { useLocation } from 'react-router-dom'

export default function StopStatus() {
    const loc = useLocation();

    return (
        <div>
            <SearchByStops startStop={loc.state.startStop} endStop={loc.state.endStop} bStops={loc.state.busStops} loading={false} />
            Stop Status
        </div>
    )
}