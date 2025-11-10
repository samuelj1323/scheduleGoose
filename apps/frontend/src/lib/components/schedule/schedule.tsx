import { useState } from "react";
import styles from "./schedule.module.css";

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setSelectedDate(date);
  };

  const formatSelectedDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className={styles.scheduleContainer}>
      <div className={styles.calendarWrapper}>
        <label htmlFor="date-picker" className={styles.label}>
          Select Date
        </label>
        <input
          id="date-picker"
          type="date"
          value={selectedDate.toISOString().split("T")[0]}
          onChange={handleDateChange}
          className={styles.dateInput}
          min={getTodayDateString()}
        />
        <div className={styles.selectedDate}>
          <span className={styles.dateLabel}>Selected:</span>
          <span className={styles.dateValue}>{formatSelectedDate(selectedDate)}</span>
        </div>
      </div>
    </div>
  );
};

export default Schedule;

