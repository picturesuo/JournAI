import { Link } from "react-router-dom";

export default function Landing() {
    return (
        <div style={{ padding: 20 }}>
            <h1>Landing Page</h1>
        
            <Link to="/new-entry">
                <button>Write a Journal Entry</button>
            </Link>

            <br /><br />

            <Link to="/journal">
                <button>View Journal</button>
            </Link>
        </div>
    );
}