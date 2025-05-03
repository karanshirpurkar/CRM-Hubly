import React, { useEffect, useState } from 'react';
import { Getbyid, UpdateMember } from '../../service/services';
import styles from './SettingTab.module.css';

function SettingTab() {
    const [userData, setUserData] = useState({
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        designation: '',
        password: '000000000', // Default password
        confirmPassword: '000000000' // Default confirm password
    });

    const [originalData, setOriginalData] = useState({
        email: '', 
        password: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await Getbyid();
                console.log('User data:', response.data);
                setUserData({
                    ...response.data,
                    password: '000000000', // Default password
                    confirmPassword: '000000000' // Default confirm password
                });
                setOriginalData({
                    email: response.data.email,
                    password: response.data.password
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const emailChanged = userData.email !== originalData.email;
        const passwordChanged = userData.password !== "000000000";
    
        if (passwordChanged && userData.password !== userData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
    
        const updatedUserData = {
            _id: userData._id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            designation: userData.designation,
            password: passwordChanged ? userData.password : undefined
        };
    
        try {
            const response = await UpdateMember(updatedUserData);
    
            if (emailChanged || passwordChanged) {
                alert('User updated successfully!\nYou will be logged out due to changes.');
                localStorage.clear();
                sessionStorage.clear();
                window.location.href = '/login';
                return; // stop further execution
            }
    
            alert('User updated successfully!');
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Something went wrong while updating.');
        }
    };
    

    return (
        <div className={styles.container}>
            <h1>Settings</h1>
            <div style={{ borderBottom: '1px solid #ccc', width: "1298px" }}>
                <h2>Edit Profile</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input
                    className={styles.input}
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                />

                <label htmlFor="lastName">Last Name</label>
                <input
                    className={styles.input}
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                />

                <label htmlFor="email">Email</label>
                <input
                    className={styles.input}
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                />

                <label htmlFor="password">Password</label>
                <input
                    className={styles.input}
                    type="password"
                    id="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                />

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    className={styles.input}
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleChange}
                />

                <button className={styles.savebutton} type="submit">
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default SettingTab;
