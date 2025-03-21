import { createContext, useState, useEffect } from "react";
import { useUserProfile } from "./UserProfileContext";
import { message } from "antd";

export const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  const userProfile = useUserProfile();
  const earnDi = userProfile?.earnDi || (() => {});

  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem("habits");
    return savedHabits
      ? JSON.parse(savedHabits)
      : [
          { title: "Code", timeSpent: 0, totalTime: 60, icon: "https://www.svgrepo.com/show/473140/code.svg" },
          { title: "Read Books", timeSpent: 0, totalTime: 30, icon: "https://www.svgrepo.com/show/496860/book.svg" },
          { title: "Practice Yoga", timeSpent: 0, totalTime: 15, icon: "https://cdn-icons-png.flaticon.com/512/3773/3773928.png" },
          { title: "Take A Break From The Phone", timeSpent: 0, totalTime: 60, icon: "https://www.svgrepo.com/show/359247/smartphone-noaccess.svg" },
          { title: "Run", timeSpent: 0, totalTime: 30, icon: "https://www.svgrepo.com/show/189314/running-run.svg" },
        ];
  });

  const [completedHabits, setCompletedHabits] = useState(() => {
    return JSON.parse(localStorage.getItem("completedHabits")) || {};
  });

  const [lastResetDate, setLastResetDate] = useState(() => {
    return localStorage.getItem("lastResetDate") || new Date().toISOString().split("T")[0];
  });

  const resetHabitsDaily = () => {
    const today = new Date().toISOString().split("T")[0];
    if (lastResetDate !== today) {
      setHabits((prevHabits) =>
        prevHabits.map((habit) => ({ ...habit, timeSpent: 0 }))
      );

      setLastResetDate(today);
      localStorage.setItem("lastResetDate", today);
    }
  };

  useEffect(() => {
    resetHabitsDaily();
    localStorage.setItem("habits", JSON.stringify(habits));
    localStorage.setItem("completedHabits", JSON.stringify(completedHabits));
  }, [habits, completedHabits]);

  const updateHabitTime = (habitTitle, time) => {
    setHabits((prevHabits) => {
      const updatedHabits = prevHabits.map((habit) => {
        if (habit.title === habitTitle) {
          const newTimeSpent = habit.timeSpent + time;
          if (newTimeSpent >= habit.totalTime && habit.timeSpent < habit.totalTime) {
            earnDi(10);
            message.success(`Habit ${habitTitle} completed! +10 Di earned!`); 
          }
          return { ...habit, timeSpent: Math.min(newTimeSpent, habit.totalTime) };
        }
        return habit;
      });
      return updatedHabits;
    });
  };

  const markHabitCompleted = (date, habitTitle) => {
    setCompletedHabits((prev) => ({
      ...prev,
      [date]: [...(prev[date] || []), habitTitle],
    }));
  };

  return (
    <HabitContext.Provider
      value={{ habits, setHabits, updateHabitTime, completedHabits, markHabitCompleted }}
    >
      {children}
    </HabitContext.Provider>
  );
};