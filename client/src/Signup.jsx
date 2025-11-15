import React, { useState } from "react";

// Component name should start with an uppercase letter
function Signup() {
    // 1. State to hold form data
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    // 2. Handler to update state on input change
    const handleInput = (event) => {
        // Use the input's 'name' attribute to set the correct key in the 'values' object
        setValues(prev => ({...prev, [event.target.name]: event.target.value}));
    }

    // 3. Handler for form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Stop the default page refresh
        console.log("User attempting to register:", values);
        // *** Your API call or validation logic goes here ***
        alert(`Registered: Name: ${values.name}, Email: ${values.email}`);
    }

    return(
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}> {/* Attach the submit handler here */}
                    {/* --- Name Field --- */}
                    <div className="mb-3">
                        <label htmlFor="name">
                            <strong>Name</strong>
                        </label>
                        <input 
                            type="text"
                            placeholder="Enter Name"
                            autoCapitalize="off"
                            name="name" // Changed to "name" for state mapping
                            value={values.name} // Controlled component: Value is state
                            onChange={handleInput} // Update state
                            className="form-control rounded-0" 
                        />
                    </div>
                    {/* --- Email Field --- */}
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input 
                            type="email"
                            placeholder="Enter Email"
                            autoCapitalize="off"
                            name="email" // Changed to "email" for state mapping
                            value={values.email} // Controlled component: Value is state
                            onChange={handleInput} // Update state
                            className="form-control rounded-0"
                        />
                    </div>
                    {/* --- Password Field --- */}
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input 
                            type="password"
                            placeholder="Enter Password"
                            name="password" // Changed to "password" for state mapping
                            value={values.password} // Controlled component: Value is state
                            onChange={handleInput} // Update state
                            className="form-control rounded-0"
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Register
                    </button>
                    <p className="mt-2 text-center">Already Have An Account?</p>
                    {/* In a real app, this would be a link component */}
                    <button className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;