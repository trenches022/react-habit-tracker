import { Modal, Input } from "antd";

const LogTimeModal = ({
  isOpen,
  onOk,
  onCancel,
  selectedHabit,
  inputValue,
  setInputValue,
}) => {
  return (
    <Modal
      title="Log Your Time"
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
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
  );
};

export default LogTimeModal;