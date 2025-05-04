import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import S_style from './login.module.css';
import Vector from '../assets/images/Vector.png';
import Loginpng from '../assets/images/lohin.png';
import { Register } from '../service/services';

const Signup = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [acceptTerms, setAcceptTerms] = useState(false);
    const handleChange = (e) => {
        setUser({
            ...user, [e.target.name]: e.target.value
        });
    };
    const handlesubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        console.log(acceptTerms);
        if (!acceptTerms) {
            alert('Please accept the terms and conditions');
            return;

        }
        if (user.firstName === '' || user.lastName === '' || user.email === '' || user.password === '') {
            alert('Please fill in all fields');
            return;
        }
        if (user.password.length < 8) {
            alert('Password must be at least 6 characters long');
            return;
        }
        if (user.password !== user.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        const res = await Register(user)
        alert("User registered successfully");
        localStorage.setItem('token', res.data.token);
        console.log('Token saved to localStorage:', res.data.token);

        navigate(`/dashboard`);

    }
    return (

        <div>
            <div className={S_style.logo}>
                <img src={Vector} alt="Logo" className="logo" />
                <h1>Hubly</h1>
            </div>

            <div className={S_style.Signup}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                    <h1>Create an account</h1>
                    <a href="/login">Sign in instead</a>
                </div>
                <form style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3px',
                    width: '300px',
                    margin: 'auto'
                }}>
                    <label htmlFor="Firstname">First name</label>
                    <input type="text" name='firstName' value={user.firstName} onChange={handleChange} />
                    <label htmlFor="Lastname">Last name</label>
                    <input type="text" name='lastName' value={user.lastName} onChange={handleChange} />
                    <label htmlFor="Email">Email</label>
                    <input type="text" name='email' value={user.email} onChange={handleChange} />
                    <label htmlFor="Password">Password</label>
                    <input type="Password" name='password' value={user.password} onChange={handleChange} />
                    <label htmlFor="Confirmpassword">Confim Password</label>
                    <input type="Password" name='confirmPassword' value={user.confirmPassword} onChange={handleChange} />
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px' // Add some spacing between the checkbox and the text
                    }}>
                        <input
                            style={{
                                height: '16px', // Adjust height for better alignment
                                width: '16px' // Optional: Set width for consistency
                            }}
                            type="checkbox"
                            name="checked"
                            onChange={(e) => setAcceptTerms(e.target.checked)}
                        />
                        <p style={{ margin: 0 }}>I agree to the <span style={{ fontWeight: 'bold' }}>Terms of Service</span> and <span style={{ fontWeight: 'bold' }}>Privacy Policy</span></p>
                    </div>
                    <button type="submit" onClick={handlesubmit}>Create an account</button>


                </form>
            </div>

            <p style={{ marginTop: '275px', marginLeft: "130px" }}>This si
                te is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>

            <img style={{
                width: '570px',
                height: '1024px',
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: -1,
                objectFit: 'cover'
            }} src={Loginpng} alt="Poster" />
        </div>
    );
};

export default Signup;