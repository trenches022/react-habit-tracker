import '@fortawesome/fontawesome-free/css/all.min.css';
import './MainContainer.css';
import { Progress, Modal, Input } from 'antd';
import { useState, useEffect, useContext } from 'react';
import { HabitContext } from '../Contexts/HabitContext';

const MainContainer = () => {
  const { habits, setHabits } = useContext(HabitContext);

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits))
  }, [habits])

  const [newHabit, setNewHabit] = useState({ title: '', totalTime: '' });
  const [isAddHabitModalOpen, setIsAddHabitModalOpen] = useState(false);
  
  const handleNewHabitChange = (e) => {
    setNewHabit({ ...newHabit, [e.target.name]: e.target.value });
  }

  const addNewHabit = () => {
    if (newHabit.title.trim() && newHabit.totalTime) {
      setHabits([...habits, { ...newHabit, timeSpent: 0, icon: 'https://www.svgrepo.com/show/476047/checklist.svg' } ]);
      setNewHabit({ title: '', totalTime: '' });
      setIsAddHabitModalOpen(false);
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const openModal = (habit) => {
    setSelectedHabit(habit);
    setInputValue(''); 
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (selectedHabit && inputValue.trim() !== '') {
      const newTimeSpent = Math.min(selectedHabit.timeSpent + Number(inputValue), selectedHabit.totalTime);
      setHabits(prevHabits =>
        prevHabits.map(habit =>
          habit.title === selectedHabit.title ? { ...habit, timeSpent: newTimeSpent } : habit
        )
      );
    }
    setIsModalOpen(false);
  };

  const handleHabitDelete = (title) => {
   const filteredHabits = habits.filter(habit => habit.title !== title);
   setHabits(filteredHabits);
   localStorage.setItem('habits', JSON.stringify(filteredHabits));
  }

  return (
    <div className="main-container">
      <h2>Today</h2>
      <h1>
        My Journal <i className="fa-solid fa-person-snowboarding" style={{ color: '#1677ff' }}></i>
      </h1>
      <button className='add-habit-btn' onClick={() => setIsAddHabitModalOpen(true)}>Add Habit <i className="fa-regular fa-square-plus" style={{color: 'white'}}></i></button>

      <div className="habits-list">
        {habits.map((habit, index) => (
          <div key={index} className="habit-item">
            <div className="habit-info">
              <img src={habit.icon} alt="icons" style={{ width: '50px', height: '50px' }} />
              <div>
                <h5>{habit.title}</h5>
                <p>{habit.timeSpent}/{habit.totalTime} min</p>
                <div className="progress-bar">
                  <Progress 
                    strokeLinecap="butt" 
                    percent={((habit.timeSpent / habit.totalTime) * 100).toFixed(0)}
                    strokeWidth={4} 
                    size={[300, 5]} 
                  />
                </div>
              </div>
            </div>
            <div className="habit-btns">
              <button className="habit-btn" onClick={() => openModal(habit)}>Log</button>
              <button className="delete-habit-btn" onClick={() => handleHabitDelete(habit.title)}>Delete Habit</button>
            </div>
          </div>
        ))}
      </div>

      <Modal 
        title="Add New Habit"
        open={isAddHabitModalOpen}
        onOk={addNewHabit}
        onCancel={() => setIsAddHabitModalOpen(false)}
        okText="Add"
      >

        <Input 
          placeholder="Habit Name" 
          name="title"
          value={newHabit.title}
          onChange={handleNewHabitChange}
        />
        <Input 
          placeholder="Minutes per day" 
          name="totalTime"
          type="number"
          value={newHabit.totalTime}
          onChange={handleNewHabitChange}
        />

      </Modal>

      <Modal
        title="Log Your Time"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Save"
      >
        <p>Enter minutes spent on <span style={{color: '#1677ff'}}>{selectedHabit?.title}</span></p>
        <Input 
          type="number" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)}
          min={0} 
        />
      </Modal>
    </div>
  );
};

export default MainContainer;
