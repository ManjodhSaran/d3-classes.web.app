import React, { useEffect, useState } from 'react'
import Clock from 'react-clock';

import './Time.css'
import './Clock.css';

const Time = () => {

    const [value, setValue] = useState(new Date());

    const dayCode = value.getUTCDay();
    const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayString = daysInWeek[dayCode];

    useEffect(() => {
        const interval = setInterval(
            () => setValue(new Date()),
            1000
        );

        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <div className="time noselect">
            <div className="clock">
                <Clock size={window.innerWidth < 500 ? 80 : 150} renderNumbers={true} value={value} />
                <p className="timeString">{value.toTimeString().slice(0, 9)}</p>
            </div>

            <div className="dayDate">
                <h3 className="dayString">{dayString}</h3>
                <h4 className="dateString">{value.toISOString().substring(0, 10)}</h4>
            </div>
        </div>
    )
}

export default Time
