import { addMinutes, format, setHours, setMinutes } from 'date-fns';

export function generateDayTimeList(date: Date) {
  const startTime = setMinutes(setHours(date, 9), 0); //set start time do 09:00;
  const endtime = setMinutes(setHours(date, 21), 0); //set start time do 21:00;
  const intervalInMinutes = 45;
  const timeList: string[] = [];

  let currentTime = startTime;

  while (currentTime <= endtime) {
    timeList.push(format(currentTime, 'HH:mm'));
    currentTime = addMinutes(currentTime, intervalInMinutes);
  }

  return timeList;
}
