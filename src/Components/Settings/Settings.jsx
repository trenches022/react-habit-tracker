import './Settings.css';
import { useTheme } from '../Contexts/ThemeContext'; 

const Settings = () => {
  const { themeMode, toggleTheme } = useTheme(); 

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <div className="setting-dark-mode">
        <h3>Dark Mode</h3>
        <button className="theme-switch-btn" onClick={toggleTheme}>
          Switch to {themeMode === "light" ? "Dark" : "Light"} Theme
        </button>
      </div>
    </div>
  );
};

export default Settings;