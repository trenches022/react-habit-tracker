import { createContext, useState, useEffect } from "react";

export const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem("habits");
    return savedHabits
      ? JSON.parse(savedHabits)
      : [
          { title: 'Code', timeSpent: 0, totalTime: 60, icon: 'https://www.svgrepo.com/show/473140/code.svg' },
          { title: 'Read Books', timeSpent: 0, totalTime: 30, icon: 'https://www.svgrepo.com/show/496860/book.svg' },
          { title: 'Practice Yoga', timeSpent: 0, totalTime: 15, icon: 'https://cdn-icons-png.flaticon.com/512/3773/3773928.png' },
          { title: 'Take A Break From The Phone', timeSpent: 0, totalTime: 60, icon: 'https://www.svgrepo.com/show/359247/smartphone-noaccess.svg' },
          { title: 'Run', timeSpent: 0, totalTime: 30, icon: 'https://www.svgrepo.com/show/189314/running-run.svg' },
        ];
  });

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  return (
    <HabitContext.Provider value={{ habits, setHabits }}>
      {children}
    </HabitContext.Provider>
  );
};
