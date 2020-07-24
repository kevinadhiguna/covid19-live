import React from 'react';
import '../App.css';

export default function About() {
    return (
        <div
            style={{
                backgroundColor: "#fff",
                textAlign: "center"
            }}
        >
            <br />
            <h2>About</h2>
            <br />
            <div
                style={{
                    padding: "20px",
                    backgroundColor: "grey",
                    color: "#fff",
                    margin: "20px",
                    borderRadius: "20px"
                }}
            >
                <h4>Who built this website?</h4>
                <div>This site is created by Kevin Akbar Adhiguna</div>
                <br />
                <h4>How to connect?</h4>
                <div style={{ fontSize: "20px" }} >
                    Please feel free to get in touch with me via {" "}
                    <a 
                        href="https://www.linkedin.com/in/kevinadhiguna/" 
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#2867b2' }}
                    >
                        LinkedIn
                    </a>
                </div>
            </div>
        </div>
    );
}
