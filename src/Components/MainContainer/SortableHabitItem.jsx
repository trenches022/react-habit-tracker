import { Progress, Select } from "antd";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const { Option } = Select;

const SortableHabitItem = ({ habit, openModal, handleHabitPriorityChange, handleHabitDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: habit.title });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 1 : 0
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={`habit-item ${isDragging ? 'is-dragging' : ''}`}
    >
      <div className="drag-handle" {...attributes} {...listeners}>
        <i className="fa-solid fa-grip-vertical" style={{ color: "#1677ff" }}></i>
      </div>
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
  );
};

export default SortableHabitItem;