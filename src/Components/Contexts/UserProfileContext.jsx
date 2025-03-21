import { createContext, useContext, useState, useEffect } from "react";

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const [di, setDi] = useState(() => {
    return parseInt(localStorage.getItem("di")) || 0;
  });

  const [skills, setSkills] = useState(() => {
    const savedSkills = localStorage.getItem("skills");
    return savedSkills
      ? JSON.parse(savedSkills)
      : { strength: 0, intelligence: 0, discipline: 0 }; 
  });

  const [skin, setSkin] = useState(() => {
    return localStorage.getItem("skin") || "default";
  });

  const earnDi = (amount) => {
    setDi((prev) => prev + amount);
  };

  const upgradeSkill = (skill, cost) => {
    if (di >= cost) {
      setSkills((prev) => ({ ...prev, [skill]: prev[skill] + 1 }));
      setDi((prev) => prev - cost);
    }
  };

  const buySkin = (skinName, cost) => {
    if (di >= cost) {
      setSkin(skinName);
      setDi((prev) => prev - cost);
    }
  };

  useEffect(() => {
    localStorage.setItem("di", di);
    localStorage.setItem("skills", JSON.stringify(skills)); 
    localStorage.setItem("skin", skin);
  }, [di, skills, skin]);

  return (
    <UserProfileContext.Provider
      value={{ di, earnDi, skills, upgradeSkill, skin, buySkin }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);