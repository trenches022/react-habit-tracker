import './App.css';
import MainContainer from './Components/MainContainer/MainContainer';
import Sidebar from './Components/Sidebar/Sidebar';
import Calendar from './Components/Calendar/Calendar';
import Progress from './Components/Progress/Progress';
import Settings from './Components/Settings/Settings';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path='/' element={<MainContainer />} />
            <Route path='/calendar' element={<Calendar />} />
            <Route path='/progress' element={<Progress />} />
            <Route path='/settings' element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
