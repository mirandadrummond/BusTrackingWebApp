import { useLocation } from 'react-router-dom'
import { useEffect } from 'react';

export default function BusStatus() {
    const location = useLocation();

    useEffect(() => {
        
    })

    return (
        <div>
            Bus Status
            <div>{location.state.busNum}</div>
        </div>
    )
}