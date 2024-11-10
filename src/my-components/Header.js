import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Header() {
    const headerStyle = {
        minHeight: '15vh',
        backgroundColor: '#2C3E50'
    };
    const taglineStyle = {
        minHeight: '15vh',
        backgroundColor: '#2C3E50',
        paddingTop: '30px',  
        fontWeight: 'bold'
    };

    // State to track the active button, defaulting to "home"
    const [activeButton, setActiveButton] = useState("home");

    // Handler to update the active button
    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    // Component UI: HTML Rendering
    return (
        <>
            <header className="row" style={headerStyle}>
                <div className="col-12 col-md-12 col-lg-8 text-center text-white display-5" style={taglineStyle}>
                    Phone Fix Booking System
                </div>

                <div className="col-12 col-md-12 col-lg-4">
                    <div className="row">
                        {/* Button 1: HOME */}
                        <Link 
                            to="/" 
                            onClick={() => handleButtonClick("home")}
                            className="col-12 col-md-6 col-lg-6 p-0 m-0 border border-dark text-center text-white" 
                            style={{
                                backgroundColor: activeButton === "home" ? 'darkolivegreen' : '#17a2b8', // DarkOliveGreen for active button
                                textDecoration: 'none'
                            }}
                        >
                            HOME
                        </Link>                 
                        {/* Button 2: EXTENSION */}
                        <Link 
                            to="/advancedJS" 
                            onClick={() => handleButtonClick("extension")}
                            className="col-12 col-md-6 col-lg-6 p-0 m-0 border border-dark text-center text-white" 
                            style={{
                                backgroundColor: activeButton === "extension" ? 'darkolivegreen' : '#17a2b8', // DarkOliveGreen for active button
                                textDecoration: 'none'
                            }}
                        >
                            EXTENSION
                        </Link>              
                    </div>
                </div>
            </header>
        </>
    );
}

// Export this component to be used in other components
export default Header;
