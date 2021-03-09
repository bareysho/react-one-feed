import { useCallback, useEffect, useState } from 'react';
import { useTimer } from 'use-timer';
import { DECREMENTAL } from 'constants/timerType';
import { TIMER_STATE } from 'constants/timerState';

export const useCountdown = (countDownSeconds, timerName) => {
  const getCurrentTime = useCallback(() => {
    const timeFromLS = localStorage.getItem(timerName);

    if (!timeFromLS) return 0;

    const timePast = (new Date().getTime() - Number(timeFromLS)) / 1000;
    const timeLeft = Math.round(countDownSeconds - timePast);

    return timeLeft > 0 ? timeLeft : 0;
  }, [])

  const [timerState, setTimerState] = useState(TIMER_STATE.initial);

  const { start, advanceTime, time, reset } = useTimer({
    timerType: DECREMENTAL,
    endTime: 0,
    onTimeOver: () => {
      setTimerState(TIMER_STATE.ended);
    },
  });

  useEffect(() => {
    reset();
    start();
    advanceTime(-getCurrentTime());
  }, [advanceTime, timerState, start]);


  const handleStart = useCallback(() => {
    localStorage.setItem(timerName, `${new Date().getTime()}`);

    setTimerState(TIMER_STATE.started);
  }, [advanceTime, start]);

  return {
    time,
    start: handleStart
  }
}
