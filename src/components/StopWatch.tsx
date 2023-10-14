import React, { useState, useEffect } from "react";

function Stopwatch() {
  const [run, setRun] = useState(false);
  const [stopTime, setStopTime] = useState(0);

  useEffect(() => {
    let interval: any;

    if (run) {
      interval = setInterval(() => {
        setStopTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [run]);

  const handleStartStop = () => {
    setRun(!run);
  };

  const handleReset = () => {
    // Reset only if the stopwatch is not running
    if (!run) {
      setStopTime(0);
    }
  };

  return (
    <div>
      <div>Time: {stopTime}s</div>
      <button onClick={handleStartStop}>{run ? "Stop" : "Start"}</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default Stopwatch;
