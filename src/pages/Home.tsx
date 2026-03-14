import { useState } from "react";
import { Link } from "react-router";
import { CodeErrorBoundary } from "../components/errors/CodeErrorBoundary";
import { UserProfile } from "@features/user";
import { UserActions } from "@features/examples";

function ProblematicComponent() {
    const [shouldThrow, setShouldThrow] = useState(false);

    if (shouldThrow) {
        throw new Error("This is a simulated component render error!");
    }

    return (
        <button
            onClick={() => setShouldThrow(true)}
            style={{
                marginTop: "1rem",
                padding: "0.5rem 1rem",
                background: "#ffefef",
                border: "1px solid red",
                color: "red",
                borderRadius: "4px",
                cursor: "pointer"
            }}
        >
            Simulate Component Error
        </button>
    );
}

export default function Home() {
    return (
        <CodeErrorBoundary>
            <div>
                <h1>Home Page</h1>
                <p>Welcome to the MFE Base Template!</p>
                
                <div style={{ margin: "2rem 0", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
                    <h2>MSW Example</h2>
                    <UserProfile />
                    <UserActions />
                </div>

                <nav style={{ display: "flex", gap: "1rem", flexDirection: "column", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", gap: "1rem" }}>
                        <Link to="/about">Go to About</Link>
                        <Link to="/unmapped-route">Trigger an Error (404)</Link>
                    </div>
                </nav>
                <ProblematicComponent />
            </div>
        </CodeErrorBoundary>
    );
}
