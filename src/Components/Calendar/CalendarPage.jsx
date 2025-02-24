import { useContext, useState, useEffect } from "react";
import { Calendar, Modal, Select, Badge } from "antd";
import { HabitContext } from "../Contexts/HabitContext";
import './CalendarPage.css';

const CalendarPage = () => {
  const { habits } = useContext(HabitContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [completedHabits, setCompletedHabits] = useState(() => {
    return JSON.parse(localStorage.getItem("completedHabits")) || {};
  });

  useEffect(() => {
    localStorage.setItem("completedHabits", JSON.stringify(completedHabits));
  }, [completedHabits]);

  const handleSelectDate = (value) => {
    setSelectedDate(value.format("YYYY-MM-DD"));
    setIsModalOpen(true);
  };

  const handleCompleteHabit = () => {
    if (selectedHabit) {
      setCompletedHabits((prev) => ({
        ...prev,
        [selectedDate]: [...(prev[selectedDate] || []), selectedHabit],
      }));
    }
    setIsModalOpen(false);
  };

  const cellRender = (value) => {
    const date = value.format("YYYY-MM-DD");
    const habitsForDate = completedHabits[date] || [];

    return (
      <div>
        {habitsForDate.map((habit, index) => (
          <Badge key={index} status="success" text={habit} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2 style={{color: 'var(--text-color)'}}>Habits calendar</h2>
      <Calendar onSelect={handleSelectDate} cellRender={cellRender} />

      <Modal
        title="Choose habit"
        open={isModalOpen}
        onOk={handleCompleteHabit}
        onCancel={() => setIsModalOpen(false)}
        keyboard="true"
      >
        <Select
          style={{ width: "100%" }}
          onChange={(value) => setSelectedHabit(value)}
        >
          {habits.map((habit) => (
            <Select.Option key={habit.title} value={habit.title}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <img
                  src={habit.icon}
                  alt={habit.title}
                  style={{ width: "20px", height: "20px" }}
                />
                <span>{habit.title}</span>
              </div>
            </Select.Option>
          ))}
        </Select>
      </Modal>
    </div>
  );
};

export default CalendarPage;
