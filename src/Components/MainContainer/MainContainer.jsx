import "@fortawesome/fontawesome-free/css/all.min.css";
import "./MainContainer.css";
import { Tooltip, message } from "antd";
import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import SortableHabitItem from "./SortableHabitItem";
import useHabits from "../../hooks/useHabits";
import AddHabitModal from "./modals/AddHabitModal";
import LogTimeModal from "./modals/LogTimeModal";
import { Progress } from "antd";

const MainContainer = () => {
  const {
    habits,
    setHabits,
    newHabit,
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
  } = useHabits();

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const [isAddHabitModalOpen, setIsAddHabitModalOpen] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setHabits((prevHabits) => {
        const oldIndex = prevHabits.findIndex(habit => habit.title === active.id);
        const newIndex = prevHabits.findIndex(habit => habit.title === over.id);
        
        const newOrder = arrayMove(prevHabits, oldIndex, newIndex);
        localStorage.setItem("habits", JSON.stringify(newOrder));
        return newOrder;
      });
    }
    
    setActiveId(null);
  };

  const activeHabit = habits.find(habit => habit.title === activeId);

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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={filteredHabits.map(habit => habit.title)}
            strategy={verticalListSortingStrategy}
          >
            {filteredHabits.length <= 0 ? (
              <h2>You don&apos;t have high-priority habits yet.</h2>
            ) : (
              filteredHabits.map((habit) => (
                <SortableHabitItem
                  key={habit.title}
                  habit={habit}
                  openModal={openModal}
                  handleHabitPriorityChange={handleHabitPriorityChange}
                  handleHabitDelete={handleHabitDelete}
                />
              ))
            )}
          </SortableContext>
          
          <DragOverlay>
            {activeId ? (
              <div className="habit-item overlay">
                <div className="drag-handle">
                  <i className="fa-solid fa-grip-vertical" style={{ color: "#1677ff" }}></i>
                </div>
                <div className="habit-info">
                  <img src={activeHabit?.icon} alt="icons" style={{ width: "50px", height: "50px" }} />
                  <div>
                    <h5>{activeHabit?.title}</h5>
                    <p>
                      {activeHabit?.timeSpent}/{activeHabit?.totalTime} min
                    </p>
                    <div className="progress-bar">
                      <Progress
                        strokeLinecap="butt"
                        percent={((activeHabit?.timeSpent / activeHabit?.totalTime) * 100).toFixed(0)}
                        strokeWidth={4}
                        size={[220, 5]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      <AddHabitModal
        isOpen={isAddHabitModalOpen}
        onOk={() => {
          if (addNewHabit()) {
            setIsAddHabitModalOpen(false);
          }
        }}
        onCancel={() => setIsAddHabitModalOpen(false)}
        newHabit={newHabit}
        handleNewHabitChange={handleNewHabitChange}
        handlePriorityChange={handlePriorityChange}
      />

      <LogTimeModal
        isOpen={isModalOpen}
        onOk={() => {
          if (handleLogTime()) {
            setIsModalOpen(false);
          }
        }}
        onCancel={() => setIsModalOpen(false)}
        selectedHabit={selectedHabit}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
    </div>
  );
};

export default MainContainer;