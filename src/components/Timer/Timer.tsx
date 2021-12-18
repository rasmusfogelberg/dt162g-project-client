import React, { useEffect, useRef, useState } from "react";

// Formating the time that is displayed
export const formatTime = (timer: any) => {
  const getSeconds: any = `0${(timer % 60)}`.slice(-2)
  const minutes: any = `${Math.floor(timer / 60)}`
  const getMinutes = `0${minutes % 60}`.slice(-2)
  const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

  return `${getHours}:${getMinutes}:${getSeconds}`
}

// Setting up the timer
const useTimer = (offset = 0, autostart = true) => {
  const [timer, setTimer] = useState(offset);
  const [isActive, setIsActive] = useState(autostart);
  const countRef = useRef<any>(null);

  // Autostarting the timer
  useEffect(() => {
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);

    return () => clearInterval(countRef.current);
  }, [isActive]);

  return {
    timer,
    isActive,
  };
};

export const Timer: React.FC<any> = ({offset}) => {
  const { timer } = useTimer(offset || 0);

  // JSX code
  return (
    <div>
      <div>{formatTime(timer)}</div>
    </div>
  );
};
