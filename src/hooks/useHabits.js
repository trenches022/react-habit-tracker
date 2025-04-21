import { useState, useContext } from "react";
import { HabitContext } from "../Components/Contexts/HabitContext";
import { message } from "antd";

const useHabits = () => {
  const { habits, setHabits, updateHabitTime } = useContext(HabitContext);

  const [newHabit, setNewHabit] = useState({ title: "", totalTime: "", priority: "Low" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleNewHabitChange = (e) => {
    setNewHabit({ ...newHabit, [e.target.name]: e.target.value });
  };

  const handlePriorityChange = (value) => {
    setNewHabit({ ...newHabit, priority: value });
  };

  const addNewHabit = () => {
    if (!newHabit.title.trim()) {
      message.error("Habit name cannot be empty");
      return false;
    }
    if (!newHabit.totalTime || newHabit.totalTime <= 0) {
      message.error("Minutes per day must be greater than 0");
      return false;
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
    return true;
  };

  const handleHabitPriorityChange = (title, value) => {
    const updatedHabits = habits.map((habit) =>
      habit.title === title ? { ...habit, priority: value } : habit
    );
    setHabits(updatedHabits);
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
    message.success(`Priority for "${title}" updated to ${value}`);
  };

  const openModal = (habit) => {
    setSelectedHabit(habit);
    setInputValue("");
    setIsModalOpen(true);
  };

  const handleLogTime = () => {
    if (selectedHabit && inputValue.trim() !== "" && inputValue > 0) {
      updateHabitTime(selectedHabit.title, Number(inputValue));
    }
    if (inputValue <= 0) {
      message.error("Minutes per day must be greater than 0");
      return false;
    }
    setIsModalOpen(false);
    return true;
  };

  const handleHabitDelete = (title) => {
    const filteredHabits = habits.filter((habit) => habit.title !== title);
    setHabits(filteredHabits);
    localStorage.setItem("habits", JSON.stringify(filteredHabits));
    message.success('Habit deleted!');
  };

  return {
    habits,
    setHabits,
    newHabit,
    setNewHabit,
    handleNewHabitChange,
    handlePriorityChange,
    addNewHabit,
    handleHabitPriorityChange,
    openModal,
    isModalOpen,
    setIsModalOpen,
    selectedHabit,
    inputValue,
    setInputValue,
    handleLogTime,
    handleHabitDelete,
  };
};

export default useHabits;