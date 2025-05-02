import React, { useEffect, useState } from 'react';
import { Getbyid } from '../../service/services';

function SettingTab() {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        designation: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await Getbyid(); // Fetch user data
                console.log('User data:', response.data);
                setUserData(response.data); // Set the fetched data to state
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData(); // Call the function
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value // Dynamically update the corresponding field
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Updated user data:', userData);
        // TODO: Add API call to update user data
    };

    return (
        <div>
            <h1>Settings</h1>
            {userData ? (
                <div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={userData.firstName} // Prefill with user data
                            onChange={handleChange} // Handle changes
                        />

                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={userData.lastName} // Prefill with user data
                            onChange={handleChange} // Handle changes
                        />

                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userData.email} // Prefill with user data
                            onChange={handleChange} // Handle changes
                        />

                        <label htmlFor="designation">Designation</label>
                        <select
                            id="designation"
                            name="designation"
                            value={userData.designation} // Prefill with user data
                            onChange={handleChange} // Handle changes
                        >
                            <option value="">Select Role</option>
                            <option value="Admin">Admin</option>
                            <option value="Member">Member</option>
                        </select>

                        <button type="submit">Save Changes</button>
                    </form>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}

export default SettingTab;