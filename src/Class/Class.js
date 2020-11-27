import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import db from '../firebase';

import './Class.css'
const Class = () => {

    const [data, setData] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [timeTable, setTimeTable] = useState([]);
    const [zoomLinks, setZoomLinks] = useState([]);

    const [subjectID, setSubjectID] = useState('');
    const [classType, setClassType] = useState('');
    const [attendanceBaseUrl, setAttendanceBaseUrl] = useState('');
    const [attendanceID, setAttendanceID] = useState('');
    const [pAttendanceID, setPAttendanceID] = useState('');
    const [elective, setElective] = useState([]);

    const [date, setDate] = useState(new Date());

    useEffect(() => {
        db
            .collection("D3Classes")
            .doc("d3classes")
            .get()
            .then(doc => {
                setData(doc.data())
            });

        const interval = setInterval(() => setDate(new Date()), 1000);//1 second

        return () => {
            clearInterval(interval);
        }
    }, [])

    useEffect(() => {
        if (data) {
            setSubjects(data.subject)
            setTimeTable(data.timeTable)
            setZoomLinks(data.zoomLinks)
            setAttendanceBaseUrl(data.attendanceBaseUrl)
        }
    }, [data])

    const dayCode = date.getUTCDay();
    const hour = date.getHours()

    useEffect(() => {
        if (timeTable) {
            try {
                setSubjectID(timeTable[dayCode][hour].subjectID)
                setClassType(timeTable[dayCode][hour].classType)
                setElective(data.subject["ELECTIVE"])
            }
            catch (err) {
            }

            if (!subjectID == "") {
                try {
                    setAttendanceID(subjects[subjectID]['attendanceID']);
                    setPAttendanceID(subjects[subjectID]['pAttendanceID']);
                } catch (err) {
                    console.log(err)
                }
            }
        }
    }, [date, subjects, hour, subjectID, data.subject, dayCode, timeTable])

    return (
        <div className={`class noselect ${subjectID === 'ELECTIVE' && "class-elective"}`}>
            {!attendanceBaseUrl && <CircularProgress className="class__progress" color="secondary" />}
            {subjectID === "" ?
                attendanceBaseUrl &&
                <div className="noClass">
                    <p>NO CLASS GOING ON</p>
                </div>
                :
                <>
                    {subjectID === 'ELECTIVE' ?
                        <div className='classDiv elective'>
                            <h2>Class: {`${subjectID} ${classType === 'l' ? "Lecture" : "Practical"}`}</h2>
                            <hr />

                            <div className="elective__classLinks">
                                {subjects && Object.keys(elective).map((keyName, i) =>
                                    <div key={`elective__classLink elective__${i}`} className={`elective__classLink elective__${i}`}>
                                        <h2>{keyName}</h2>
                                        <div className='classLink__join classLink'>
                                            <h3>Join Class:</h3>
                                            <a href={zoomLinks[elective[keyName]['classLink']]} target='_blank' rel="noopener noreferrer">
                                                <h3>{elective[keyName]['classLink']}</h3>
                                            </a>
                                        </div>

                                        <h3>Subject Teacher: {elective[keyName]['subjectTeacher']}</h3>
                                        {elective[keyName]['attendanceID'] !== 'inClass' ?
                                            <a href={attendanceBaseUrl + elective[keyName]['attendanceID']} target='_blank' rel="noopener noreferrer">
                                                <div className="attendenceLink attendenceLink--hover">
                                                    <h3>Mark Attendence</h3>
                                                </div>
                                            </a>
                                            :
                                            <>
                                                <div className="attendenceLink attendenceLink--inClass">
                                                    <h3>Attendence in Class</h3>
                                                </div>
                                            </>
                                        }
                                    </div>

                                )}
                            </div>
                        </div>
                        :
                        <div className='classDiv nonElective'>
                            <h2>{`${subjectID} ${classType === 'l' ? "Lecture" : "Practical"}`}</h2>
                            <hr />

                            <div className='classLink'>
                                <h3>Join Class: </h3>
                                <a href={zoomLinks[subjects[subjectID]['classLink']]} target='_blank' rel="noopener noreferrer">
                                    <h3>{subjects[subjectID]['classLink']}</h3>
                                </a>
                            </div>


                            <h3>Subject Teacher: {subjects[subjectID]['subjectTeacher']}</h3>
                            {attendanceID !== 'inClass' ?
                                <a href={`${attendanceBaseUrl} + ${classType === 'l' ? attendanceID : pAttendanceID}`} target='_blank' rel="noopener noreferrer">
                                    <div className="attendenceLink attendenceLink--hover">
                                        <h3>Mark Attendence</h3>
                                    </div>
                                </a>
                                :
                                <p>
                                    <div className="attendenceLink attendenceLink--inClass">
                                        <h3>Attendence in Class</h3>
                                    </div>
                                </p>
                            }
                        </div>
                    }
                </>
            }

        </div>
    )
}

export default Class