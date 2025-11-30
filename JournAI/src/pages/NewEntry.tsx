import { useState } from "react";
import { supabase } from "../lib/client";

export default function NewEntry() {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function handleSubmit() {
        setLoading(true);
        setMessage("");

        const { data, error } = await supabase
        .from("journal_entries")
        .insert({
            user_id: "00000000-0000-0000-0000-000000000000",
            content: content,
        });

    if (error) {
        setMessage("Error saving entry.");
        console.error(error);
    }
    else {
        setMessage("Entry saved");
        setContent("");
    }

    setLoading(false);
    }

    return (
        <div style={{ padding: 20 }}>
            <h1>New Entry</h1>
        
        <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your journal entry..."
            style={{ width: "100%", height: 150 }}
        />

        <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save Entry"}
        </button>

        <p>{message}</p>
        </div>
    );
}