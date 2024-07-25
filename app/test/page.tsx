"use client";

import React, { useState, useEffect } from 'react';

const Counter = () => {
    const [count, setCount] = useState(0);

    // Side effect with cleanup
    useEffect(() => {
        console.log('Counter mounted');

        // Cleanup function that runs on unmount
        return () => {
            console.log('Counter unmounted');
        };
    }, []); // Empty dependency array means this runs only once on mount and unmount

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
};

const App = () => {
    const [showCounter, setShowCounter] = useState(true);

    return (
        <div>
            <button onClick={() => setShowCounter(!showCounter)}>
                Toggle Counter
            </button>
            {showCounter && <Counter />}
        </div>
    );
};

export default App;