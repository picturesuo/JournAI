import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./lib/client";


import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NewEntry from "./pages/NewEntry";
import Journal from "./pages/Journal";
import Insights from "./pages/Insights";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    }

    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <BrowserRouter>

      <nav style={{ padding: 20}}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/new-entry">New Entry</Link> |{" "}
        <Link to="/journal">Journal</Link> |{" "}
        <Link to="/auth">Auth</Link> | {" "}
        <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
      </nav>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-entry" element={<NewEntry />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>

      
    </BrowserRouter>
  );
}