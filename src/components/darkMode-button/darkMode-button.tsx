import { Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import './darkMode-button.css';

const DarkModeToggle = () => {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', dark);
  }, [dark]);

  const toggle = () => {
    setDark(prev => !prev);
  };

  return (
    <Button className="darkmode" onClick={toggle}>
      {dark ? '☀️' : '🌙'}
    </Button>
  );
}

export default DarkModeToggle;
