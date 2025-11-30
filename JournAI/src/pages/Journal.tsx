import { useEffect, useState } from "react";
import { supabase } from "../lib/client";

export default function Journal() {
    const [entries, setEntries] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchEntries();
    }, []);

    async function fetchEntries() {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            setMessage("You must sign in to view your journal.");
            return;
        }

        const {data, error } = await supabase
            .from("journal_entries")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

        if (error) {
            console.error(error);
            setMessage("Error loading entries.");
        } else {
            setEntries(data);
        }
    }

    return (
        <div style={{ padding: 20 }}>
            <h1>Your Journal Entries</h1>

            {message && <p>{message}</p>}

            {message === "" && entries.length === 0 && <p>No entries yet.</p>}
            
            {entries.length === 0 && <p>No Entries yet.</p>}

            {entries.map((e) => (
                <div key={e.id} style={{ marginBottom: 20 }}>
                    <strong>{new Date(e.created_at).toLocaleString()}</strong>
                    <p>{e.content}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
}