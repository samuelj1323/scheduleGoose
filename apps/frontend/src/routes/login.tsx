import { createFileRoute, redirect } from "@tanstack/react-router";
import { authClient } from "../lib/auth-client";

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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Welcome to ScheduleGoose</h1>
      <p>Sign in to start managing your content.</p>
      <button 
        onClick={handleGoogleSignIn}
        style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
        }}
      >
        <img src="https://authjs.dev/img/providers/google.svg" alt="Google" width="20" />
        Sign in with Google
      </button>
    </div>
  );
}

