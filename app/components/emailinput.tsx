import { useState } from 'react';

const EmailInput = () => {
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [isTouched, setIsTouched] = useState(false); // Track if the user has interacted with the input

    // Regular expression for basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleChange = (e: { target: { value: any; }; }) => {
        const value = e.target.value;
        setEmail(value);
        if (!isTouched) {
            setIsTouched(true); // Set touched state to true after the first character
        }
        setIsValid(emailPattern.test(value)); // Validate on every input change
    };

    return (
            <input
            className={`border-solid border rounded-md bg-transparent h-10 text-lg p-2 transition duration-200 focus:bg-slate-50 focus:text-black 
                focus-visible:outline-none ${isTouched? isValid ? 'focus:border-green-500 border-slate-300/15' : 'border-red-500' : 'border-slate-300/15'}`}
            id="email"
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="You@example.com"
            required
            />

    );
};

export default EmailInput;