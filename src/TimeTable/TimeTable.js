import { CircularProgress } from '@material-ui/core'
import React, { useState } from 'react'

import './TimeTable.css'
const TimeTable = () => {
    const [progress, setProgress] = useState(true);
    return (
        <div className='timeTable'>
            <h1>Time Table D3 CSE C</h1>
            <div className="timeTable__imgHeader">
                <img src="\assets\TT_novHeader.jpg" alt="timeTable" />
            </div>
            <div className="timeTable__img">
                <img src="\assets\TT_novBody.jpg" onLoad={() => setProgress(false)} alt="timeTable" />
            </div>
            {progress && <CircularProgress className="class__progress" color="secondary" />}
        </div>
    )
}

export default TimeTable
