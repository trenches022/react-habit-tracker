import "@fortawesome/fontawesome-free/css/all.min.css";
import "./MainContainer.css";
import { Progress, Modal, Input, Select, message, Tooltip } from "antd";
import { useState, useEffect, useContext } from "react";
import { HabitContext } from "../Contexts/HabitContext";

const { Option } = Select;

const MainContainer = () => {
  const { habits, setHabits, updateHabitTime } = useContext(HabitContext);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const [newHabit, setNewHabit] = useState({ title: "", totalTime: "", priority: "Low" });
  const [isAddHabitModalOpen, setIsAddHabitModalOpen] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);

  const handleNewHabitChange = (e) => {
    setNewHabit({ ...newHabit, [e.target.name]: e.target.value });
  };

  const handlePriorityChange = (value) => {
    setNewHabit({ ...newHabit, priority: value });
  };

  const addNewHabit = () => {
  if (!newHabit.title.trim()) {
    message.error("Habit name cannot be empty");
    return;
  }
  if (!newHabit.totalTime || newHabit.totalTime <= 0) {
    message.error("Minutes per day must be greater than 0");
    return;
  }
  setHabits([
    ...habits,
    {
      ...newHabit,
      timeSpent: 0,
      priority: newHabit.priority || "Low",
      icon: "https://www.svgrepo.com/show/476047/checklist.svg",
    },
  ]);
  setNewHabit({ title: "", totalTime: "", priority: "Low", icon: "" });
  setIsAddHabitModalOpen(false);
};

  const handleHabitPriorityChange = (title, value) => {
    const updatedHabits = habits.map((habit) =>
      habit.title === title ? { ...habit, priority: value } : habit
    );
    setHabits(updatedHabits);
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
    message.success(`Priority for "${title}" updated to ${value}`);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const openModal = (habit) => {
    setSelectedHabit(habit);
    setInputValue("");
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (selectedHabit && inputValue.trim() !== "" && inputValue > 0) {
      updateHabitTime(selectedHabit.title, Number(inputValue));
    }
    if (inputValue <= 0) {
    message.error("Minutes per day must be greater than 0");
    return;
  }
    setIsModalOpen(false);
  };

  const handleHabitDelete = (title) => {
    const filteredHabits = habits.filter((habit) => habit.title !== title);
    setHabits(filteredHabits);
    localStorage.setItem("habits", JSON.stringify(filteredHabits));
  };

  const handleFocus = () => {
    setIsFocusMode(!isFocusMode);
    if (!isFocusMode) {
      message.success("Focus Mode Enabled");
    } else {
      message.info("Focus Mode Disabled");
    }
  };

  const filteredHabits = isFocusMode
    ? habits.filter((habit) => habit.priority === "High")
    : habits;

  return (
    <div className="main-container">
      <h2>Today</h2>
      <h1>
        My Journal <i className="fa-solid fa-person-snowboarding" style={{ color: "#1677ff" }}></i>
      </h1>
      <button className="add-habit-btn" onClick={() => setIsAddHabitModalOpen(true)}>
        Add Habit <i className="fa-regular fa-square-plus" style={{ color: "white" }}></i>
      </button>
      <Tooltip title="Show only high-priority habits to focus on what's most important">
        <button
          className={`focus-mode-btn ${isFocusMode ? "active" : ""}`}
          onClick={handleFocus}
        >
          Focus Mode <i className="fa-solid fa-arrows-to-circle"></i>
        </button>
      </Tooltip>

      <div className="habits-list">
        {filteredHabits.map((habit, index) => (
          <div key={index} className="habit-item">
            <div className="habit-info">
              <img src={habit.icon} alt="icons" style={{ width: "50px", height: "50px" }} />
              <div>
                <h5>{habit.title}</h5>
                <p>
                  {habit.timeSpent}/{habit.totalTime} min
                </p>
                <div className="progress-bar">
                  <Progress
                    strokeLinecap="butt"
                    percent={((habit.timeSpent / habit.totalTime) * 100).toFixed(0)}
                    strokeWidth={4}
                    size={[220, 5]}
                  />
                </div>
                <Select
                  value={habit.priority || "Low"}
                  onChange={(value) => handleHabitPriorityChange(habit.title, value)}
                  style={{ width: "100%", marginTop: "10px" }}
                  className="priority-select"
                >
                  <Option value="High">High</Option>
                  <Option value="Medium">Medium</Option>
                  <Option value="Low">Low</Option>
                </Select>
              </div>
            </div>
            <div className="habit-btns">
              <button className="habit-btn" onClick={() => openModal(habit)}>
                Log
              </button>
              <button className="delete-habit-btn" onClick={() => handleHabitDelete(habit.title)}>
                Delete Habit
              </button>
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
          style={{ marginBottom: "10px" }}
        />
        <Input
          placeholder="Minutes per day"
          name="totalTime"
          type="number"
          value={newHabit.totalTime}
          onChange={handleNewHabitChange}
          style={{ marginBottom: "10px" }}
        />
        <Select
          defaultValue="Low"
          value={newHabit.priority}
          onChange={handlePriorityChange}
          style={{ width: "100%" }}
        >
          <Option value="High">High</Option>
          <Option value="Medium">Medium</Option>
          <Option value="Low">Low</Option>
        </Select>
      </Modal>

      <Modal
        title="Log Your Time"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Save"
      >
        <p>
          Enter minutes spent on <span style={{ color: "#1677ff" }}>{selectedHabit?.title}</span>
        </p>
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