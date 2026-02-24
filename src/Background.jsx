import React from 'react';
// 1. Make sure this variable name matches...
import hotelImg from "./hotel-facade.png";

const Background = () => {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1,

                // 2. ...the variable name you use here!
                backgroundImage: `url(${hotelImg})`,
                // --- CHANGE THIS LINE ---
                // 'auto 80%' means: Calculate width automatically, set Height to 80% of screen.
                // Try 60%, 70%, or 90% to see what looks best.
                backgroundSize: '50% auto',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Future lights go here */}
        </div>
    );
};

// ... (your animation code)
export default Sky; // This is fine, but the file name must change.