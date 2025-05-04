import { react as React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Style from './home.module.css';
import Vector from '../assets/images/Vector.png'
import Logo1 from '../assets/images/Company logo (1).png';
import Logo2 from '../assets/images/Company logo (2).png';
import Logo3 from '../assets/images/Company logo (3).png';
import Logo4 from '../assets/images/Company logo (4).png';
import Logo5 from '../assets/images/Company logo.png';
import Bucket from '../assets/images/bucket.png';
import Bucket1 from '../assets/images/fb.png';
import Vector1 from '../assets/images/Vector (1).png';
import Group1 from '../assets/images/Group1.png';
import Group2 from '../assets/images/Group2.png';
import Group3 from '../assets/images/Group3.png';
import Iconstatus from '../assets/images/dashboard/Iconstatus.png';
import Message from '../assets/images/dashboard/message.png';
import Chatbot from './chatbot/chatboat'; // Import the Chatbot component
import { botget } from '../service/chatservices';


export default function Home() {
    const [showChatbot, setShowChatbot] = useState(false);
    const [welcomeMessage, SetwelcomeMessage] = useState("")

    useEffect(() => {
        fetchbotdata();
    }, []);

    const toggleChatbot = () => {
        setShowChatbot(prev => !prev);
    };
    const navigate = useNavigate();
    const handleLogin = (login) => {
        navigate('/login');
    }
    const handleSignup = (login) => {
        navigate('/signup');
    }
    const fetchbotdata = async () => {
        try {
            const res = await botget();
            console.log('Bot data response:', res.data);
            SetwelcomeMessage  (

                res.data[0].welcome
            );
        }
        catch (err) {
            console.log("Error loading chat history", err);
        }
    };


    return (
        <div className={Style.home}>
            <div className={Style.navbar}>
                <div className={Style.logo}>
                    <img src={Vector} alt="Logo" className="logo" />
                    <h1>Hubly</h1>
                </div>
                <div className={Style.navbar_button}>
                    <button className={Style.navbar_button_login} onClick={handleLogin}>Login</button>
                    <button className={Style.navbar_button_signup} onClick={handleSignup}>Sign up</button>

                </div>
            </div>
            <div className={Style.main}>


                <div className={Style.div1}>

                    <h1>Grow Your Business Faster with Hubly CRM</h1>


                    <p>
                        Manage leads, automate workflows, and close deals effortlessly—all in one
                        powerful platform.
                    </p>

                    <div style={{ display: 'flex', gap: '20px', width: '371px', height: '49px', paddingLeft: '25px' }}>
                        <button
                            style={{
                                height: '49px',
                                width: '116px',
                                backgroundColor: '#244779',
                                color: 'white',
                                fontSize: '18px',
                                border: 'none',
                                borderRadius: '5px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                // padding: '10px 20px',
                            }}
                        >
                            Get started →
                        </button>
                        <button
                            style={{
                                height: '49px',
                                width: '140px',
                                backgroundColor: 'transparent',
                                color: '#244779',
                                fontSize: '18px',
                                border: '2px solid #244779',
                                borderRadius: '5px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                // padding: '10px 20px',
                            }}
                        >
                            <span style={{ marginRight: '8px', display: 'flex', alignItems: 'center' }}>▶</span>
                            Watch Video
                        </button>
                    </div>

                </div>
                <div className={Style.div2}>
                    <img src={Group1} alt="Group" />
                    <img style={{
                        position: 'absolute',
                        zIndex: '5',
                        right: "-50px",
                        bottom: "0px",
                    }} src={Group2} alt="Group" />
                    <img style={{
                        position: 'absolute',
                        zIndex: '5',
                        right: "-50px",
                        top: "-129px",
                    }} src={Group3} alt="Group" />

                </div>

            </div>
            <div className={Style.div3}>
                <img src={Logo5} alt="Logo 5" />
                <img src={Logo1} alt="Logo 1" />
                <img src={Logo2} alt="Logo 2" />
                <img src={Logo3} alt="Logo 3" />
                <img src={Logo1} alt="Logo 1" />
                <img src={Logo4} alt="Logo 4" />

            </div>
            <div className={Style.div5}>
                <div className={Style.div4}>
                    <h1>At its core, Hubly is a robust CRM <br /> solution.</h1>
                    <p>Hubly helps businesses streamline customer interactions, track leads, and automate tasks — saving you time and maximizing revenue. Whether you’re a startup or an enterprise, Hubly adapts to your needs, giving you the tools to scale efficiently.</p>
                </div>
                <div className={Style.div6}>
                    <img style={{ height: "512px" }} src={Bucket} alt="Bucket" />

                </div>
            </div>
            <section className={Style.pricing}>
                <h1>We have plans for everyone!</h1>
                <p>We started with a strong foundation, then simply built all of the sales and </p>
                <p>
                    marketing tools ALL businesses need under one platform.</p>
                <div className={Style.plans}>
                    <div className={Style.planCard}>
                        <h3>STARTER</h3>
                        <p>Best for local businesses needing to improve their online reputation.</p>
                        <h4>$199 <span>/monthly</span></h4>
                        <ul>
                            <li>Unlimited Users</li>
                            <li>GMB Messaging</li>
                            <li>Reputation Management</li>
                            <li>GMB Call Tracking</li>
                            <li>24/7 Award Winning Support</li>
                        </ul>
                        <button>Sign up for Starter</button>
                    </div>

                    <div className={Style.planCard}>
                        <h3>GROW</h3>
                        <p>
                            Best for all businesses that want to take full control of their marketing
                            automation and track their leads, click to close.
                        </p>
                        <h4>$399 <span>/monthly</span></h4>
                        <ul>
                            <li>Pipeline Management</li>
                            <li>Marketing Automation Campaigns</li>
                            <li>Live Call Transfer</li>
                            <li>GMB Messaging</li>
                            <li>Embed-able Form Builder</li>
                            <li>Reputation Management</li>
                            <li>24/7 Award Winning Support</li>
                        </ul>
                        <button>Sign up for Starter</button>
                    </div>
                </div>
            </section>

            <footer className={Style.footer}>
                <div className={Style.footerCols}>
                    <div className={Style.footerLogo}>
                        <img src={Vector} alt="Logo" />
                        <h1>Hubly</h1></div>
                    <div>
                        <h5>Product</h5>
                        <ul>
                            <li>Universal checkout</li>
                            <li>Payment workflows</li>
                            <li>Observability</li>
                            <li>UpliftAI</li>
                            <li>Apps & integrations</li>
                        </ul>
                    </div>
                    <div>
                        <h5>Why Primer</h5>
                        <ul>
                            <li>Expand to new markets</li>
                            <li>Boost payment success</li>
                            <li>Improve conversion rates</li>
                            <li>Reduce payments fraud</li>
                            <li>Recover revenue</li>
                        </ul>
                    </div>
                    <div>
                        <h5>Developers</h5>
                        <ul>
                            <li>Primer Docs</li>
                            <li>API Reference</li>
                            <li>Payment methods guide</li>
                            <li>Service status</li>
                            <li>Community</li>
                        </ul>
                    </div>
                    <div>
                        <h5>Resources</h5>
                        <ul>
                            <li>Blogs</li>
                            <li>Success Stories</li>
                            <li>News Room</li>
                            <li>Privacy</li>
                            <li>Policy</li>
                        </ul>
                    </div>
                    <div>
                        <h5>Resources</h5>
                        <ul>
                            <li>Blogs</li>
                        </ul>
                    </div>
                </div>

            </footer>
            {/* <div style={{width:"60px", height:"60px", borderRadius:""}}>
                        <img src={Message} alt="Message" />
            </div>
            <div className={Style.chatbotContainer}>

                <Chatbot />
            </div> */}

            {/* <div className={Style.chatbotContainer}>
                {showChatbot ? (
                    // Render chatbot only
                    <div>
                        <Chatbot />
                    </div>
                ) : (
                    // Render message icon only
                    <div
                        style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            cursor: "pointer",
                            backgroundColor: "#33475B",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        onClick={toggleChatbot}
                    >
                        <img src={Message} alt="Message" style={{ width: "30px", height: "29px" }} />
                    </div>
                )}
            </div> */}

            {showChatbot ? (
                <div className={Style.chatbotContainer}>


                    <Chatbot />
                </div>
            ) : (


                <div
                    style={{
                        position: "fixed", 
                        bottom: "20px", 
                        right: "20px", 
                        zIndex: "1000", 
                        overflow: "hidden",
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        cursor: "pointer",
                        backgroundColor: "#33475B",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    onClick={toggleChatbot}
                >
                    <img src={Message} alt="Message" style={{ width: "30px", height: "29px" }} />
                </div>

            )}
            {!showChatbot &&
            <div className="floatbox" style={{ position: "fixed", 
                bottom: "100px", 
                right: "20px", 
                zIndex: "1000", 
                height: "116px", width: "240px", 
                 boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)', 
                borderRadius: '16px', backgroundColor: "#F6F7F5" }}>
                <img src={Iconstatus} style={{ height: "48px", width: "48px", position: "absolute", top: "-20px", left: "40%" }} alt="Icon" />
                <div style={{ height: "100px", width: "100%", padding: "30px 20px", marginTop: "10px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <p>{welcomeMessage}</p>

                </div>

            </div>
}
        </div>




    )
};