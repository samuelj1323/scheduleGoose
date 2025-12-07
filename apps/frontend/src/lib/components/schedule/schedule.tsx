import styles from "./schedule.module.css";

interface ScheduleProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

const Schedule = ({ selectedDate, onDateChange }: ScheduleProps) => {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      onDateChange(undefined);
      return;
    }
    const date = new Date(e.target.value);
    onDateChange(date);
  };

  const handleToday = () => {
      onDateChange(new Date());
  };

  const formatSelectedDate = (date: Date | undefined) => {
    if (!date) return "All Time";
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
  
  // For input value, handle undefined
  const inputValue = selectedDate ? selectedDate.toISOString().split("T")[0] : '';

  return (
    <div className={styles.scheduleContainer}>
      <div className={styles.calendarWrapper}>
        <div className={styles.headerGroup}>
            <label className={styles.label}>Viewing Content For</label>
            <div className={styles.dateDisplay}>
                {formatSelectedDate(selectedDate)}
            </div>
        </div>

        <div className={styles.controls}>
             <button onClick={handleToday} className={styles.todayButton}>
                Jump to Today
            </button>
            <input
            type="date"
            value={inputValue}
            onChange={handleDateChange}
            className={styles.dateInput}
            />
        </div>
      </div>
    </div>
  );
};

export default Schedule;
