import { Link } from "react-router";

export default function Home() {
    return (
        <div>
            <h1>Home Page</h1>
            <p>Welcome to the MFE Base Template!</p>
            <nav style={{ display: "flex", gap: "1rem" }}>
                <Link to="/about">Go to About</Link>
                <Link to="/unmapped-route">Trigger an Error (404)</Link>
            </nav>
        </div>
    );
}
