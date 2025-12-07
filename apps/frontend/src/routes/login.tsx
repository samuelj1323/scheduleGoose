import { createFileRoute, redirect } from "@tanstack/react-router";
import { authClient } from "../lib/auth-client";
import styles from "./login.module.css";

export const Route = createFileRoute("/login")({
  component: Login,
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession();
    if (session) {
        throw redirect({ to: "/" });
    }
  }
});

function Login() {
  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000/", 
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <span className={styles.icon}>🪿</span>
        <h1 className={styles.title}>Schedule Goose</h1>
        <p className={styles.subtitle}>Your playful content scheduling companion.</p>
        <button 
          onClick={handleGoogleSignIn}
          className={styles.button}
        >
          <img src="https://authjs.dev/img/providers/google.svg" alt="Google" width="20" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
