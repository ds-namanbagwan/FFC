import * as React from "react";
import { AdditionalHoursText, changeDateFormat } from "../constants";
type Hours = {
  title?: string;
  hours: Week;
  deliveryHours: any;
  children?: React.ReactNode;
  timezone?: any;
  additionalHoursText?: string
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

  for (let [k, v, i = 0] of Object.entries(sortByDay(week))) {
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

function convertTo12HourFormat(time: string, includeMeridiem: boolean): string {
  const timeParts = time.split(":");
  let hour: any = Number(timeParts[0]);
  const minutesString = timeParts[1];

  const meridiem = hour < 12 || hour === 24 ? "" : ""; // Set AM/PM
  hour = hour % 24 || 24; // Adjust hours

  if (hour == 24) {
    hour = "00";
    return (
      hour.toString() + ":" + minutesString + (includeMeridiem ? meridiem : "")
    );
  }

  if (hour < 10) {
    hour = "0" + hour;
    return (
      hour.toString() + ":" + minutesString + (includeMeridiem ? meridiem : "")
    );
  } else {
    return (
      hour.toString() + ":" + minutesString + (includeMeridiem ? meridiem : "")
    );
  }
}

type DayRow = {
  dayName: string;
  day: Day;
  isToday?: boolean;
  delKey: string;
  delDayName: string;
  delDay: Day;
  delIsToday?: boolean;
};

const DayRow = (props: DayRow) => {
  const { dayName, day, isToday, delKey, delDayName, delDay, delIsToday } =
    props;

  let both = false;
  if (day && day.isClosed) {
    if (delDay && delDay.isClosed) {
      both = true;
    }
  }

  return (
    <div className={`${isToday ? "currentDay" : ""} time-row`}>
      <div className="capitalize day">{dayName}</div>
      {day && !day.isClosed ? (
        <>
          <div className="store-time flex flex-col">
            <span>
              {" "}
              {convertTo12HourFormat(day.openIntervals[0].start, true)} -{" "}
              {convertTo12HourFormat(day.openIntervals[0].end, true)}
            </span>
            {day.openIntervals[1] && (
              <span>
                {convertTo12HourFormat(day.openIntervals[1].start, true)} -{" "}
                {convertTo12HourFormat(day.openIntervals[1].end, true)}
              </span>
            )}
          </div>
        </>
      ) : !both ? (
        <div className="store-time closed">
          <span>Closed</span>
        </div>
      ) : (
        ""
      )}

      {delDay && !delDay.isClosed ? (
        <>
          <div className="store-time flex flex-col">
            <span>
              {" "}
              {convertTo12HourFormat(
                delDay.openIntervals[0].start,
                true
              )} - {convertTo12HourFormat(delDay.openIntervals[0].end, true)}
            </span>
            {delDay.openIntervals[1] && (
              <span>
                {convertTo12HourFormat(delDay.openIntervals[1].start, true)} -{" "}
                {convertTo12HourFormat(delDay.openIntervals[1].end, true)}
              </span>
            )}
          </div>
        </>
      ) : (
        <>
          {Object.keys(delDay).length > 0 ? (
            !both ? (
              <div className="store-time closed">
                <span>Closed</span>
              </div>
            ) : (
              ""
            )
          ) : (
            <></>
          )}
        </>
      )}

      {both ? (
        <div className="store-time closed both-closed">
          <span>Closed</span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

const Hours = (props: Hours) => {
  const { hours, deliveryHours, additionalHoursText } = props;


  React.useEffect(() => {
    const collection = document.getElementsByClassName("time-row");
    for (var i = 0; i < collection.length; i++) {
      let para = document.querySelector(".both-closed");

      let check = collection[i].contains(para);

      if (check) {
        collection[i].classList.add("mt-2.5");
      }
    }
  });


  return (
    <>
      <div className="box store-timing">
        <div className="inner-box">
          <h4>Store Timing</h4>{

          }{props.hours && props.hours.reopenDate ? <>

            <p>{additionalHoursText ? additionalHoursText : AdditionalHoursText}</p>
            <p>The Store will repon on {changeDateFormat(props.hours.reopenDate)}</p>
          </> : <div className="hours">
            <div className="time-row">
              <div className="day"></div>
              <div className="store-time">In-Store</div>
              {props.deliveryHours ? (
                <>
                  {" "}
                  {Object.keys(props.deliveryHours).length > 0 ? (
                    <div className="delivery-time">Delivery</div>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
            {renderHours(hours, deliveryHours)}
          </div>


          }

        </div>
      </div>
    </>
  );
};

export default Hours;
