import './Settings.css';
import { useTheme } from '../Contexts/ThemeContext'; 
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { changelog } from '../../data/changelog';

const { Panel } = Collapse

const Settings = () => {
  const { themeMode, toggleTheme } = useTheme(); 

  return (
    <div className="settings-container">
      <div className="setting-dark-mode">
        <button className="theme-switch-btn" onClick={toggleTheme}>
          Switch to {themeMode === "light" ? "Dark" : "Light"} Theme
        </button>
      </div>
      <div className="features">
        <h3>
          <i className="fa-solid fa-history" style={{ marginRight: "8px" }}></i>
          What's New in Habits Tracker
        </h3>
        <Collapse
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} style={{ color: "#1677ff" }} />
          )}
          className="changelog-collapse"
        >
          {changelog.map((entry, index) => (
            <Panel
              header={
                <span>
                  <strong>Version {entry.version}</strong> - {entry.date}
                </span>
              }
              key={index}
            >
              <ul className="changelog-list">
                {entry.changes.map((change, idx) => (
                  <li key={idx}>
                    <i className="fa-solid fa-check" style={{ marginRight: "8px", color: "#1677ff" }}></i>
                    {change}
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
};

export default Settings;