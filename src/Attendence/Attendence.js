import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import db from '../firebase';

import './Attendence.css'
const Attendence = () => {

    const [data, setData] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [attendanceBaseUrl, setAttendanceBaseUrl] = useState('');

    useEffect(() => {
        db
            .collection("D3Classes")
            .doc("d3classes")
            .get()
            .then(doc => {
                setData(doc.data())
            });
    }, []);


    useEffect(() => {
        if (data) {
            setSubjects(data.subject)
            setAttendanceBaseUrl(data.attendanceBaseUrl)
        }
    }, [data]);

    return (
        <div className="attendence">
            {!attendanceBaseUrl && <CircularProgress className="class__progress" color="secondary" />}
            <h2 className='attendence__title'>Attendence Links</h2>
            <div className="attendence__links">
                {subjects && Object.keys(subjects).map((keyName, i) =>
                    <div key={`link-${i}`} className="attendence__link">
                        {keyName === 'ELECTIVE' ?
                            <div className="attendence__link__elective ">
                                {Object.keys(subjects[keyName]).map((key, i) => (

                                    <div key={`link--${i}`} className="attendence__link--elective ">
                                        <h3>{key}</h3>
                                        <a href={(subjects[keyName][key].attendanceID !== 'inClass') ? (attendanceBaseUrl + subjects[keyName][key].attendanceID) : "#"} target='_blank' rel="noreferrer">
                                            <p className={(subjects[keyName][key].attendanceID !== 'inClass') ? 'link' : "noLink"}>
                                                {(subjects[keyName][key].attendanceID !== 'inClass') ? (attendanceBaseUrl + subjects[keyName][key].attendanceID) : "no link available"}
                                            </p>
                                        </a>
                                    </div>
                                ))}
                            </div>
                            :
                            <>
                                <h3>{keyName}</h3>
                                <a href={(subjects[keyName].attendanceID !== 'inClass') ? (attendanceBaseUrl + subjects[keyName].attendanceID) : "#"} target='_blank' rel="noreferrer">
                                    <p className={(subjects[keyName].attendanceID !== 'inClass') ? 'link' : "noLink"}>
                                        {(subjects[keyName].attendanceID !== 'inClass') ? (attendanceBaseUrl + subjects[keyName].attendanceID) : "no link available"}
                                    </p>
                                </a>
                            </>
                        }
                    </div>
                )}
            </div>
        </div>
    )
}

export default Attendence