import styles from "./framework.module.css";

import { Link, Outlet } from "@tanstack/react-router";
const Framework = () => {
  return (
    <div className={styles.frameworkContainer}>
      <div id="nav" className={styles.nav}>
        <h3>Schedule Goose</h3>
        <span className={styles.navGroup}>
          <Link className={styles.link} to="/">
            Schedule
          </Link>{" "}
          <Link className={styles.link} to="/posts">
            Posts
          </Link>
          <Link className={styles.link} to="/analytics">
            Analytics
          </Link>
        </span>
      </div>
      <div id="schedule" className={styles.schedule}>
        Schedule
      </div>
      <div id="content" className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Framework;
