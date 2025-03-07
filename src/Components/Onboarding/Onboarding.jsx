import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
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
      className="onboarding-overlay"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="onboarding-content"
      >
        <h1>Welcome to Habits Tracker!</h1>
        <p>
          This app helps you track your habits, monitor your progress, and achieve your goals!
        </p>
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delayChildren: 0.5, staggerChildren: 0.2 }}
        >
          <motion.li initial={{ x: -100 }} animate={{ x: 0 }}>
            Add and remove habits easily. Log the time spent on each habit.
          </motion.li>
          <motion.li initial={{ x: -100 }} animate={{ x: 0 }}>
            Log the time spent on each habit.
          </motion.li>
          <motion.li initial={{ x: -100 }} animate={{ x: 0 }}>
            Mark completions on the calendar.
          </motion.li>
          <motion.li initial={{ x: -100 }} animate={{ x: 0 }}>
            View your progress with beautiful charts.
          </motion.li>
          <motion.li initial={{ x: -100 }} animate={{ x: 0 }}>
            Switch between light and dark themes.
          </motion.li>
        </motion.ul>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button type="primary" onClick={handleStart} style={{ marginTop: "1rem" }}>
            Start Now!
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Onboarding;