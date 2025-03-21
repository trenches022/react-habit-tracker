import { ConfigProvider } from "antd";
import { useTheme } from "../Components/Contexts/ThemeContext";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainContainer from "../Components/MainContainer/MainContainer";
import Sidebar from "../Components/Sidebar/Sidebar";
import Progress from "../Components/Progress/Progress";
import Settings from "../Components/Settings/Settings";
import CalendarPage from "../Components/Calendar/CalendarPage";
import Profile from "./Profile/Profile";
import Onboarding from "../Components/Onboarding/Onboarding";
import useOnboarding from "../hooks/useOnboarding";

const AppWrapper = () => {
  const { currentAlgorithm, themeMode } = useTheme();
  const [showOnboarding, setShowOnboarding] = useOnboarding();

  return (
    <ConfigProvider theme={{ algorithm: currentAlgorithm }}>
      <div data-theme={themeMode}>
        <Router>
          {showOnboarding ? (
            <Routes>
              <Route
                path="/onboarding"
                element={<Onboarding onClose={() => setShowOnboarding(false)} />}
              />
              <Route path="*" element={<Navigate to="/onboarding" replace />} />
            </Routes>
          ) : (
            <div className="app-container">
              <Sidebar />
              <div className="main-content">
                <Routes>
                  <Route path="/" element={<MainContainer />} />
                  <Route path="/calendar" element={<CalendarPage />} />
                  <Route path="/progress" element={<Progress />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </div>
          )}
        </Router>
      </div>
    </ConfigProvider>
  );
};

export default AppWrapper;