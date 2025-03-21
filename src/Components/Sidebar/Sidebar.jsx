import { useState, useEffect } from 'react';
import { CalendarOutlined, FormOutlined, SettingOutlined, AreaChartOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuClick = (path) => {
    navigate(path); 
    if (isMobile) {
      setCollapsed(true); 
    }
  };

  const items = [
    {
      key: '/',
      label: 'All Habits',
      icon: <FormOutlined style={{ fontSize: '18px' }} />,
      onClick: () => handleMenuClick('/'), 
    },
    {
      key: '/calendar',
      label: 'Calendar',
      icon: <CalendarOutlined style={{ fontSize: '18px' }} />,
      onClick: () => handleMenuClick('/calendar'), 
    },
    {
      key: '/progress',
      label: 'Progress',
      icon: <AreaChartOutlined style={{ fontSize: '18px' }} />,
      onClick: () => handleMenuClick('/progress'), 
    },
    {
      key: '/profile',
      label: 'Profile',
      icon: <UserOutlined style={{ fontSize: '18px' }} />,
      onClick: () => handleMenuClick('/profile'), 
    },
    {
      key: '/settings',
      label: 'Settings',
      icon: <SettingOutlined style={{ fontSize: '18px' }} />,
      onClick: () => handleMenuClick('/settings'), 
    },
  ];

  return (
    <>
      {isMobile && (
        <Button
          type="primary"
          icon={<MenuOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{ position: 'fixed', top: 10, left: 10, zIndex: 1000 }}
        />
      )}
      <div className={`sidebar ${isMobile && collapsed ? 'collapsed' : ''}`}>
        <Menu
          style={{
            width: isMobile ? '100%' : 256,
            height: '100vh',
            fontSize: '17px',
            paddingTop: '25px',
          }}
          mode="inline"
          items={items}
          inlineCollapsed={isMobile && collapsed}
        />
      </div>
    </>
  );
};

export default Sidebar;