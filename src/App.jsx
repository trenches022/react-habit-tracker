import './App.css';
import MainContainer from './Components/MainContainer/MainContainer';
import Sidebar from './Components/Sidebar/Sidebar';
import Progress from './Components/Progress/Progress';
import Settings from './Components/Settings/Settings';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CalendarPage from './Components/Calendar/CalendarPage';
import { HabitProvider } from './Components/Contexts/HabitContext';

function App() {
  return (
  <HabitProvider>
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path='/' element={<MainContainer />} />
            <Route path='/calendar' element={<CalendarPage />} />
            <Route path='/progress' element={<Progress />} />
            <Route path='/settings' element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  </HabitProvider>
  );
}

export default App;
