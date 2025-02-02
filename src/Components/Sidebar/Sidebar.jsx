import { CalendarOutlined, FormOutlined, SettingOutlined, AreaChartOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const items = [
    {
      key: '/',
      label: 'All Habits',
      icon: <FormOutlined style={{fontSize: '18px'}} />,
      onClick: () => navigate('/'),
    },
    {
      key: '/calendar',
      label: 'Calendar',
      icon: <CalendarOutlined style={{fontSize: '18px'}} />,
      onClick: () => navigate('/calendar'),
    },
    {
      key: '/progress',
      label: 'Progress',
      icon: <AreaChartOutlined style={{fontSize: '18px'}} />,
      onClick: () => navigate('/progress'),
    },
    {
      key: '/settings',
      label: 'Settings',
      icon: <SettingOutlined style={{fontSize: '18px'}} />,
      onClick: () => navigate('/settings'),
    },
  ];

  return (
    <div className="sidebar">
      <Menu
        style={{
          width: 256,
          height: '100vh',
          fontSize: '17px',
          paddingTop: '25px',
        }}
        mode="inline"
        items={items}
      />
    </div>
  );
};

export default Sidebar;
