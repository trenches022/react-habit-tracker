import { Modal, Input, Select } from "antd";

const { Option } = Select;

const AddHabitModal = ({
  isOpen,
  onOk,
  onCancel,
  newHabit,
  handleNewHabitChange,
  handlePriorityChange,
}) => {
  return (
    <Modal
      title="Add New Habit"
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
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
  );
};

export default AddHabitModal;