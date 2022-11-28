import { SearchByStops } from "../components/SearchByStops";
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';

export default function StopStatus() {
    const loc = useLocation();
    cons

    return (
        <div>
            <SearchByStops startStop={loc.state.startStop} endStop={loc.state.endStop} bStops={loc.state.busStops} loading={false} />
            Stop Status
        </div>
    )
}