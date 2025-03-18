import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaCheckCircle, FaChartLine, FaCalendarAlt, FaMoon, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import "./Onboarding.css";

const Onboarding = ({ onClose }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    onClose();
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="onboarding-overlay"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="onboarding-content"
      >
        <h1>Welcome to Habits Tracker!</h1>
        <p>This app helps you track your habits, monitor your progress, and achieve your goals!</p>

        <VerticalTimeline layout="1-column-left" lineColor="#1890ff">
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "#333", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid #333" }}
            iconStyle={{ background: "#1890ff", color: "#fff" }}
            icon={<FaPlus />}
          >
            <h3>Add and remove habits easily. Log the time spent on each habit.</h3>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "#333", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid #333" }}
            iconStyle={{ background: "#1890ff", color: "#fff" }}
            icon={<FaCheckCircle />}
          >
            <h3>Log the time spent on each habit.</h3>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "#333", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid #333" }}
            iconStyle={{ background: "#1890ff", color: "#fff" }}
            icon={<FaCalendarAlt />}
          >
            <h3>Mark completions on the calendar.</h3>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "#333", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid #333" }}
            iconStyle={{ background: "#1890ff", color: "#fff" }}
            icon={<FaChartLine />}
          >
            <h3>View your progress with beautiful charts.</h3>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "#333", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid #333" }}
            iconStyle={{ background: "#1890ff", color: "#fff" }}
            icon={<FaMoon />}
          >
            <h3>Switch between light and dark themes.</h3>
          </VerticalTimelineElement>
        </VerticalTimeline>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button type="primary" onClick={handleStart}>
            Start Now!
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Onboarding;