import { useEffect, useState } from "react";
import "./App.css"
import ActivityText from "./ActivityText.jsx";


export default function App() {
  const [activity, setActivity] = useState("Click the button and get advice!");

  const getActivity = async () => {
    const response = await fetch("https://bored.api.lewagon.com/api/activity");
    const data = await response.json();
    setActivity(data.activity);
  };

  useEffect(() => {
    getActivity();
  }, []);

  return (
    <div className="container" >
      <h2>Bored? The universe thinks you should do this!</h2>

      <ActivityText text={activity} />

      <button onClick={getActivity} >
        Next Activity
      </button>
    </div>
  );
}


