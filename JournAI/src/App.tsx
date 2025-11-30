import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NewEntry from "./pages/NewEntry";
import Journal from "./pages/Journal";
import Insights from "./pages/Insights";

export default function App() {
  return (
    <BrowserRouter>

      <nav style={{ padding: 20}}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/new-entry">New Entry</Link> |{" "}
        <Link to="/journal">Journal</Link>
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