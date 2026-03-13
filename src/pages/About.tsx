import { Link } from "react-router";

export default function About() {
    return (
        <div>
            <h1>About Page</h1>
            <p>This is the About page for the MFE Base Template.</p>
            <Link to="/home">Go back Home</Link>
        </div>
    );
}
