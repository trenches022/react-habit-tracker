import './App.css';
import { HabitProvider } from './Components/Contexts/HabitContext';
import { ThemeProvider } from './Components/Contexts/ThemeContext'; 
import AppWrapper from './Components/AppWrapper';


function App() {
  return (
    <HabitProvider>
      <ThemeProvider>
        <AppWrapper /> 
      </ThemeProvider>
    </HabitProvider>
  );
}

export default App;