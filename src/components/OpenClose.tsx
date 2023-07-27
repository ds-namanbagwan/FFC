import * as React from "react";

type Hours = {
  title?: string;
  hours: Week;
  deliveryHours: any;
  children?: React.ReactNode;
  timezone?: any;
};

interface Week extends Record<string, any> {
  monday?: Day;
  tuesday?: Day;
  wednesday?: Day;
  thursday?: Day;
  friday?: Day;
  saturday?: Day;
  sunday?: Day;
}

type Day = {
  isClosed: boolean;
  openIntervals: OpenIntervals[];
};

type OpenIntervals = {
  start: string;
  end: string;
};

var openDays: any = [];

const todayIndex = new Date().getDay();

function getSorterForCurrentDay(): { [key: string]: number } {
  const dayIndexes = [0, 1, 2, 3, 4, 5, 6];

  const updatedDayIndexes = [];
  for (let i = 0; i < dayIndexes.length; i++) {
    let dayIndex = dayIndexes[i];
    if (dayIndex - todayIndex >= 0) {
      dayIndex = dayIndex - todayIndex;
    } else {
      dayIndex = dayIndex + 7 - todayIndex;
    }
    updatedDayIndexes[i] = dayIndex;
  }

  return {
    sunday: updatedDayIndexes[0],
    monday: updatedDayIndexes[1],
    tuesday: updatedDayIndexes[2],
    wednesday: updatedDayIndexes[3],
    thursday: updatedDayIndexes[4],
    friday: updatedDayIndexes[5],
    saturday: updatedDayIndexes[6],
  };
}

const defaultSorter: { [key: string]: number } = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

function sortByDay(week: Week): Week {
  const tmp = [];
  for (const [k, v] of Object.entries(week)) {
    tmp[getSorterForCurrentDay()[k]] = { key: k, value: v };
  }

  const orderedWeek: Week = {};
  tmp.forEach((obj) => {
    orderedWeek[obj.key] = obj.value;
  });

  return orderedWeek;
}

const renderHours = (week: Week, deliveryHours: any) => {
  const dayDom: JSX.Element[] = [];
  let sortDeliveryHours = sortByDay(deliveryHours);
  let allDays = Object.entries(sortByDay(week));

  for (let [k, v] of allDays) {
    if (!v.isClosed) {
      openDays.push({ key: k, openIntervals: v.openIntervals });
    }
  }

  for (let [k, v, i = 0] of allDays) {
    i++;
    let delTime: any = "";
    let delk: any = "";
    for (let [dk, dv] of Object.entries(sortDeliveryHours)) {
      if (dk == k) {
        delTime = dv;
        delk = dk;
      }
    }

    dayDom.push(
      <DayRow
        key={k}
        dayName={k}
        day={v}
        isToday={isDayToday(k)}
        delKey={delk}
        delDayName={delk}
        delDay={delTime}
        delIsToday={isDayToday(delk)}
      />
    );
  }

  return <>{dayDom}</>;
};

function isDayToday(dayName: string) {
  return defaultSorter[dayName] === todayIndex;
}

type DayRow = {
  dayName: string;
  day: Day;
  isToday?: boolean;
  delKey: string;
  delDayName: string;
  delDay: Day;
  delIsToday?: boolean;
  key: any;
};

const DayRow = (props: DayRow) => {
  const { dayName, day, isToday, delKey, delDayName, delDay, delIsToday } =
    props;

  const date = new Date();
  var status = null;

  if (!props.day.isClosed) {
    let currentTime = date.toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/London",
    });
    if (props?.day.openIntervals[0].start > currentTime) {
      if (props.isToday == true) {
        status = (
          <>
            <strong>
              <span>CLOSED</span>
            </strong>{" "}
            - <span>OPENS AT {props.day?.openIntervals[0].start} </span>
          </>
        );
      }
    } else if ( 
        (props?.day.openIntervals[0].start < currentTime && openDays[0].openIntervals[0].end < currentTime) ||
        (props?.day.openIntervals[0].start < currentTime && props?.day.openIntervals[0].start > props?.day.openIntervals[0].end ) 
    ) {
      if (props.isToday == true) {
        status = (
          <>
            <strong>
              <span>CLOSED</span>
            </strong>{" "}
            - <span>OPENS AT {props.day?.openIntervals[0].start} </span>
          </>
        );
      }
    } else if (
      props?.day.openIntervals[0].start < currentTime ||
      openDays[0].openIntervals[0].start == currentTime
    ) {
      if (props.isToday == true) {
        status = (
          <>
            <strong>
              <span>OPEN</span>{" "}
            </strong>
            - <span>CLOSES AT {props.day?.openIntervals[0].end} </span>
          </>
        );
      }
    } else {
      if (props.isToday == true) {
        status = (
          <>
            <strong>
              <span>OPEN</span>{" "}
            </strong>
            - <span>CLOSES AT {props.day?.openIntervals[0].end} </span>
          </>
        );
      }
    }
  } else {
    if (props.isToday == true) {
      status = openDays.length ? (
        <>
          <strong>
            <span>CLOSED</span>{" "}
          </strong>
          -{" "}
          <span>
            OPENS ON {openDays[0].key} at {openDays[0].openIntervals[0].start}
          </span>
        </>
      ) : (
        <>
          <strong>
            <span>CLOSED</span>
          </strong>
        </>
      );
    }
  }

  return <>{status}</>;
};

const OpenClose = (props: Hours) => {
  const { hours, deliveryHours } = props;

  return (
    <>
      {props.hours && props.hours.reopenDate ? (
        <span>Temp Closed</span>
      ) : (
        <> {renderHours(hours, deliveryHours)}</>
      )}
    </>
  );
};

export default OpenClose;
