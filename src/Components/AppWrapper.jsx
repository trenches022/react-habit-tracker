import { ConfigProvider } from 'antd';
import { useTheme } from '../Components/Contexts/ThemeContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainContainer from '../Components/MainContainer/MainContainer';
import Sidebar from '../Components/Sidebar/Sidebar';
import Progress from '../Components/Progress/Progress';
import Settings from '../Components/Settings/Settings';
import CalendarPage from '../Components/Calendar/CalendarPage';

const AppWrapper = () => {
  const { currentAlgorithm, themeMode } = useTheme(); 

  return (
    <ConfigProvider
      theme={{
        algorithm: currentAlgorithm, 
      }}
    >
      <div data-theme={themeMode}> 
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
      </div>
    </ConfigProvider>
  );
};

export default AppWrapper;