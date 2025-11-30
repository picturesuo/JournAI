import { useState } from "react";
import { supabase } from "../lib/client";

export default function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function handleSignUp() {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) setMessage(error.message);
        else setMessage("Check your email to comfirm your account.");
    }

    async function handleSignIn() {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) setMessage(error.message);
        else setMessage("Signed in!");
    }

    return (
        <div style={{ padding:20 }}>
            <h1>Authentication</h1>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ display: "block", marginBottom: 10 }}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ display: "block", marginBottom: 10 }}
            />

            <button onClick={handleSignIn}>Sign in</button>
            <button onClick={handleSignUp} style={{ marginLeft: "10px" }}> Sign Up </button>
            <p>{message}</p>
        </div>
    );
}