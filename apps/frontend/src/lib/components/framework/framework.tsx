import styles from "./framework.module.css";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { authClient } from "$lib/auth-client";

const Framework = () => {
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const session = authClient.useSession();

  const isActive = (path: string) => {
    return currentPath === path ? styles.activeLink : '';
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/login";
  };

  return (
    <div className={styles.frameworkContainer}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
            <div className={styles.logoGroup}>
            <div className={styles.logoIcon}>🪿</div>
            <h3>Schedule Goose</h3>
            </div>
            <div className={styles.navLinks}>
            <Link className={`${styles.link} ${isActive('/')}`} to="/">
                Dashboard
            </Link>
            <Link className={`${styles.link} ${isActive('/posts')}`} to="/posts">
                Posts
            </Link>
            <Link className={`${styles.link} ${isActive('/analytics')}`} to="/analytics">
                Analytics
            </Link>
            </div>
        </div>
        
        <div className={styles.navRight}>
            {session.data?.user && (
                <div className={styles.userMenu}>
                     {session.data.user.image && (
                        <img src={session.data.user.image} alt="Profile" className={styles.userAvatar} />
                    )}
                    <span className={styles.userName}>{session.data.user.name}</span>
                    <button onClick={handleSignOut} className={styles.signOutButton}>
                        Sign Out
                    </button>
                </div>
            )}
        </div>
      </nav>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default Framework;
