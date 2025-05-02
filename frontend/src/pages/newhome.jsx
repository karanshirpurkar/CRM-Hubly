import React from 'react';
import { useNavigate } from 'react-router-dom';
import Style from './home.module.css';

import Vector from '../assets/images/Vector.png';
import Logo1 from '../assets/images/Company logo (1).png';
import Logo2 from '../assets/images/Company logo (2).png';
import Logo3 from '../assets/images/Company logo (3).png';
import Logo4 from '../assets/images/Company logo (4).png';
import Logo5 from '../assets/images/Company logo.png';
import Bucket from '../assets/images/Frame.png';
import Bucket1 from '../assets/images/fb.png';
import Vector1 from '../assets/images/Vector (1).png';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className={Style.home}>
            {/* Navbar */}
            <div className={Style.navbar}>
                <div className={Style.logo}>
                    <img src={Vector} alt="Logo" />
                    <h1>Hubly</h1>
                </div>
                <div className={Style.navbar_button}>
                    <button onClick={() => navigate('/login')}>Login</button>
                    <button className={Style.signup} onClick={() => navigate('/signup')}>Sign up</button>
                </div>
            </div>

            {/* Hero Section */}
            <div className={Style.hero}>
                <div className={Style.hero_left}>
                    <h1>Grow Your Business Faster with Hubly CRM</h1>
                    <p>
                        Manage leads, automate workflows, and close deals effortlessly—all in one powerful platform.
                    </p>
                    <div className={Style.hero_buttons}>
                        <button className={Style.primary}>Get started</button>
                        <button className={Style.secondary}>Watch Video</button>
                    </div>
                </div>
                <div className={Style.hero_right}>
                    {/* Placeholder for animated UI block */}
                </div>
            </div>

            {/* Company Logos */}
            <div className={Style.logos}>
                <img src={Logo5} alt="Adobe" />
                <img src={Logo1} alt="Elastic" />
                <img src={Logo2} alt="Opendoor" />
                <img src={Logo3} alt="Airtable" />
                <img src={Logo1} alt="Elastic" />
                <img src={Logo4} alt="Framer" />
            </div>

            {/* Features Section */}
            <div className={Style.features}>
                <h2>At its core, Hubly is a robust CRM solution.</h2>
                <p>
                    Hubly helps businesses streamline customer interactions, track leads, and automate tasks—saving you time and maximizing revenue. Whether you’re a startup or an enterprise, Hubly adapts to your needs, giving you the tools to scale efficiently.
                </p>
            </div>

            {/* Funnel Section */}
            <div className={Style.funnel}>
                <div className={Style.funnel_text}>
                    <h3>MULTIPLE PLATFORMS TOGETHER!</h3>
                    <p>Email communication is a breeze with our fully integrated, drag & drop email builder.</p>
                    <h4>Close</h4>
                    <p>Capture leads using our landing pages, surveys, forms, calendars, inbound phone system & more!</p>
                    <h4>Nurture</h4>
                    <p>Capture leads using our landing pages, surveys, forms, calendars, inbound phone system & more!</p>
                    <img src={Vector1} alt="Steps" />
                </div>
                <div className={Style.funnel_graphics}>
                    <img src={Bucket1} alt="Social Icons" />
                    <img src={Bucket} alt="Funnel Graphic" />
                </div>
            </div>
        </div>
    );
}
