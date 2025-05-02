import React from 'react';
import { useState } from 'react';
import Style from './login.module.css';
import Vector from '../assets/images/Vector.png';
import Loginpng from '../assets/images/lohin.png';
import { useNavigate } from 'react-router-dom';
import { Signin } from '../service/services';

const Login = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const handleChange = (e) => {
        setUser({
            ...user,[e.target.name]: e.target.value});
    }
    const handlesubmit = async(e) => {
        e.preventDefault();
        console.log(user);
        if (user.email === '' || user.password === '') {
            alert('Please fill in all fields');
            return;
        }
        if (user.password.length < 8) {
            alert('Password must be at least 8 characters long');
            return;
        }
        const res = await Signin(user);
        if (res.data.message !== 'Unauthorized') {
        alert(res.data.message)
        localStorage.setItem('token', res.data.token);
        console.log('Token saved to localStorage:', res.data.token);

        navigate('/dashboard');
    }
    else {
        alert('Invalid email or password');
    }
    };
    return (

        <div>
            <div className={Style.logo}>
                <img src={Vector} alt="Logo" className="logo" />
                <h1>Hubly</h1>
            </div>
                <form>
                <div className={Style.login}>
                    <h1>Sign in to your Plexify</h1>
                    <label htmlFor="email">Username</label>
                    <input type="text" name="email" value={user.email} onChange={handleChange} />
                    <label htmlFor="Passeord">Password</label>

                    <input type="password" name='password' value={user.password} onChange={handleChange}/>
                    <button style={{
                        marginTop: '50px',
                    }} type="submit" onClick={handlesubmit}>Login</button>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        gap: '10px',
                        marginTop: '20px'
                    }}>
                    <p>Forgot Password?</p>
                    <p>Don't have an account? <a href="/signup">Sign up</a></p>
                    </div>
                </div>
                </form>

            <p style={{
                marginTop: '289px',
                marginLeft: '170px',
                fontSize: '12px',
                color: '#676B5F',
            }}>This site is protected by reCAPTCHA and the <a href="#"> Google Privacy Policy</a> and <a href="#"> Terms of Service</a> apply.</p>

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

export default Login;