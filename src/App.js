
import './App.css';

import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News  from './components/News';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App=()=> {

  const [pageSize] = useState(9)
  const [progress, setProgress] = useState(0)
  const [apiKey] = useState(process.env.REACT_APP_NEWS_API)
  // apiKey= process.env.REACT_APP_NEWS_API;
  // state={
  //   progress:0
  // }
  // setProgress = (progress) => {
  //   this.setState({progress: progress})
  // }
  
  
    return (
      <div>
        <Router>

        <NavBar/>
        <LoadingBar
        height= '3px'
        color='#f11946'     
        progress={progress}
       />
        <Routes>
          <Route path="/" element={<News setProgress={setProgress} apiKey={apiKey}  key="general" pageSize={pageSize} country="in" category="General"/>}/>
         <Route path="/business" element={<News setProgress={setProgress} apiKey={apiKey}  key="business" pageSize={pageSize} country="in" category="Business"/>}/>
           <Route path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey}  key="entertainment" pageSize={pageSize} country="in" category="Entertainment"/>}/>
           <Route path="/general" element={<News setProgress={setProgress} apiKey={apiKey}  key="general" pageSize={pageSize} country="in" category="General"/>}/>
           <Route path="/health" element={<News setProgress={setProgress} apiKey={apiKey}  key="health" pageSize={pageSize} country="in" category="Health"/>}/>
           <Route path="/science" element={<News setProgress={setProgress} apiKey={apiKey}  key="science" pageSize={pageSize} country="in" category="Science"/>}/>
           <Route path="/technology" element={<News setProgress={setProgress} apiKey={apiKey}  key="technology" pageSize={pageSize} country="in" category="Technology"/>} />
           <Route path="/sports" element={<News setProgress={setProgress} apiKey={apiKey}  key="sports" pageSize={pageSize} country="in" category="Sports"/>}/>
        </Routes>
        </Router>
      </div>
    )
  
}
export default App
