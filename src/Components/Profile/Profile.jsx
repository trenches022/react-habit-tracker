import { useUserProfile } from "../Contexts/UserProfileContext";
import { Button } from "antd";
import "./Profile.css";

const Profile = () => {
  const { di, skills, skin, upgradeSkill, buySkin } = useUserProfile();

  const availableSkins = [
    { name: "default", cost: 0 },
    { name: "warrior", cost: 50 },
    { name: "mage", cost: 50 },
  ];

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="character">
        <img
          src={`/skins/${skin}.jpg`}
          alt="Character"
          style={{ width: "150px", height: "150px" }}
        />
        <p>Current Skin: {skin}</p>
      </div>

      <div className="currency">
        <h3>Discipline Points (Di): {di}</h3>
      </div>

      <div className="skills">
        <h3>Skills</h3>
        <p>Strength: {skills.strength}</p>
        <Button onClick={() => upgradeSkill("strength", 20)}>
          Upgrade Strength (20 Di)
        </Button>
        <p>Intelligence: {skills.intelligence}</p>
        <Button onClick={() => upgradeSkill("intelligence", 20)}>
          Upgrade Intelligence (20 Di)
        </Button>
        <p>Discipline: {skills.discipline}</p>
        <Button onClick={() => upgradeSkill("discipline", 20)}>
          Upgrade Discipline (20 Di)
        </Button>
      </div>

      <div className="skins">
        <h3>Available Skins</h3>
        {availableSkins.map((s) => (
          <div key={s.name}>
            <p>
              {s.name} - {s.cost} Di
            </p>
            <Button onClick={() => buySkin(s.name, s.cost)} disabled={skin === s.name}>
              {skin === s.name ? "Equipped" : "Buy"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;