import { useContext } from "react";
import { HabitContext } from "../Contexts/HabitContext";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

const Progress = () => {

  const { habits } = useContext(HabitContext);

  const data = habits.map((habit) => ({
    name: habit.title,
    progress: Math.round((habit.timeSpent / habit.totalTime) * 100) || 0,
  }));

  return (
    <div className="progress-container">
    <LineChart width={1600} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="progress" stroke="#1677ff" />
    </LineChart>
  </div>
  )
}

export default Progress;