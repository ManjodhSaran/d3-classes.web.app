import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';


import Attendence from './Attendence/Attendence';
import Class from './Class/Class';
import Header from './Header/Header';
import Time from './Time/Time';
import TimeTable from './TimeTable/TimeTable';

function App() {
  return (
    <div className="app ">
      <Router>
        <Header />
        <Switch>

          <Route path="/" exact>
            <Time />
            <Class />
          </Route>

          <Route path="/attendence">
            <Attendence />
          </Route>

          <Route path="/timetable">
            <TimeTable />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
