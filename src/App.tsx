import React, { useState } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import classes from "./App.module.scss";

const App: React.FC = () => {
  const [background, setBackground] = useState<string>("pomodoro");
  const handleContainerBgClass = (backgroundColor: string) => {
    setBackground(backgroundColor);
  };
  return (
    <div className={`${classes.container} ${classes[background]}`}>
      <Header />
      <Main handleBackgroundColor={handleContainerBgClass} />
      <footer></footer>
    </div>
  );
};

export default App;
