import { useEffect, useState } from "react";
import {supabase, supabase } from "../lib/client";

export default function Journal() {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        fetchEntries();
    }, []);

    async function fetchEntries() {
        const { data, error } = await supabase
            .from("journal_entries")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) console.error(error);
        else setEntries(data);
    }

    return (
        <div style={{ padding: 20 }}>
            <h1>Your Journal Entries</h1>

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