import "./App.css";
import { HabitProvider } from "./Components/Contexts/HabitContext";
import { ThemeProvider } from "./Components/Contexts/ThemeContext";
import { UserProfileProvider } from "./Components/Contexts/UserProfileContext";
import AppWrapper from "./Components/AppWrapper";

function App() {
  return (
    <UserProfileProvider> 
      <HabitProvider> 
        <ThemeProvider>
          <AppWrapper />
        </ThemeProvider>
      </HabitProvider>
    </UserProfileProvider>
  );
}

export default App;