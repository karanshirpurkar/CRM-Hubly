import React, { useEffect, useState } from 'react';
import Iconstatus from '../../assets/images/dashboard/Iconstatus.png';
import Mesaggecomposer from '../../assets/images/dashboard/Mesaggecomposer.png';
import Pencil from '../../assets/images/dashboard/pencil.png';
import { botget,botput } from '../../service/chatservices';




const Cut = () => {
        const [headerColor, setHeaderColor] = useState();
        const [bgColor, setBgColor] = useState('#FFFFFF');
        const [greeting, setGreeting] = useState('How can I help you?');
        const [prompt, setPrompt] = useState('Ask me anything!');
        const [form, setForm] = useState({ name: '', phone: '', email: '' });
        const [welcomeMessage, setWelcomeMessage] = useState("Want to chat about Hubly? I’m an chatbot here to help you find your way.");
        const [timer, setTimer] = useState({ hours: '00', minutes: '01', seconds: '00' });
        const [hours, setHours] = useState('00');
        const [minutes, setMinutes] = useState('00');
        const [seconds, setSeconds] = useState('00');
    const [botdata, setBotData] = useState(
        {
            header: "",
            background: "",
            prompt: "",
            greetings: "",
            name: "",
            email: "",
            phone: "",
            missed: "",
            welcome: ""
            
                   }
    )
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Fetching data...");
                const response = await botget();
                setBotData(response.data[0]);
                setHeaderColor(response.data[0].header);
                setBgColor(response.data[0].background);
                setGreeting(response.data[0].greetings);
                setPrompt(response.data[0].prompt);
                setWelcomeMessage(response.data[0].welcome);
                setForm({
                    name: response.data[0].name,
                    email: response.data[0].email,
                    phone: response.data[0].phone
                });
                const time = response.data[0].missed.split(":");
                setHours(time[0]);
                setMinutes(time[1]);
                setSeconds(time[2]);
                console.log(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }
    , []);
    const range = (start, end) =>
        Array.from({ length: end - start + 1 }, (_, i) => String(start + i).padStart(2, '0'));
    const handleSave = async () => {
        // Prepare the bot data to be sent to the backend
        const botData = {
            header: headerColor,
            background: bgColor,
            prompt,
            greetings: greeting,
            name: form.name,
            email: form.email,
            phone: form.phone,
            missed: `${hours}:${minutes}:${seconds}`,
            welcome: welcomeMessage,
        };
    
        try {
            // Use botpost to send the data to the backend
            const response = await botput(botData);
            console.log("Bot data saved successfully:", response.data);
            alert("Bot settings saved successfully!");
        } catch (error) {
            console.error("Error saving bot data:", error);
            alert("Failed to save bot settings.");
        }
    };

    return (
        <div>
            <h1>Chat Bot</h1>
            <div className="custom" style={{ display: "flex", flexDirection: "row", width: "90vw" }}>

                <div className="preview" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '20px', }}>
                    <div className="chatbot" style={{ height: '600px', width: '376px', borderRadius: '5px', overflow: 'hidden' }}>
                        <div className="header" style={{ backgroundColor: headerColor, color: '#FFFFFF', height: '68px', display: 'flex', alignItems: 'center', padding: '0 30px', gap: '10px' }}>
                            <img src={Iconstatus} alt="Iconstatus" /> <h2> Hulby</h2>
                        </div>
                        <div className="chat-window" style={{ backgroundColor: bgColor }}>
                            <div className="message" style={{ height: "48px", width: "231px", display: "flex", alignItems: "center", padding: "0 20px", gap: "10px", backgroundColor: "#ffffff", borderRadius: "10px", marginBottom: "10px", marginLeft: "20px" }}>
                                <p>{greeting}</p>
                            </div>
                            <div className="message" style={{ height: "48.67px", width: "231px", display: "flex", alignItems: "center", padding: "0 30px", gap: "10px", backgroundColor: "#ffffff", borderRadius: "10px", marginBottom: "10px", marginLeft: "20px" }}>
                                <p>{prompt}</p>
                            </div>
                            <div className="form" style={{ height: "261px", width: "280px", display: "flex", flexDirection: "column", marginLeft: "70px", backgroundColor: "#ffffff", padding:"10px", borderRadius: "10px" }}>
                                <h3>Introductionn Yourself</h3>
                                <label htmlFor="Name" style={{
                                    color: "#50505"
                                }}>Your Name</label>
                                <input type="text" placeholder={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    style={{ border: "none",height:"10px",width:"250px", borderBottom: "2px solid #ccc", borderRadius: "0px", marginBottom: "2px" }} />
                                <label htmlFor="phone" style={{
                                    color: "#50505"
                                }}>Phone</label>

                                <input type="text" placeholder={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    style={{ border: "none",width:"250px", borderBottom: "2px solid #ccc", borderRadius: "0px" }} />

                                <label htmlFor="Email" style={{
                                    color: "#50505"
                                }}>Email</label>

                                <input type="email" placeholder={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    style={{ border: "none",width:"250px", borderBottom: "2px solid #ccc", borderRadius: "0px",  }} />
                                <button style={{ height: "30px", width: "203px", backgroundColor: "#184E7F", color: "white", borderRadius: "9.12px", margin: "5px 30px" }}>Thank You</button>
                            </div>
                        </div>
                        <img src={Mesaggecomposer} alt="Mesaggecomposer" />
                    </div>
                    <div className="floatbox" style={{height:"116px",width:"240px", position:"relative",boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)',borderRadius: '16px',backgroundColor:"#F6F7F5"}}>
                        <img src={Iconstatus} style={{height:"48px",width:"48px",position:"absolute", top:"-20px",left:"40%"}} alt="Icon" />
                        <div style={{height:"100px",width:"100%",padding:"30px 20px", marginTop:"10px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                            <p>{welcomeMessage}</p>

                        </div>

                    </div>

                </div>
                <div className="custom" style={{ flex: 0.3, display: 'flex', flexDirection: 'column', gap: '20px', }}>
                    <div className="headercolor" style={{
                        display: 'flex', flexDirection: 'column',
                        gap: '10px', width: '400px', height: '200px',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)',
                        borderRadius: '16px', padding: '20px'
                    }}>
                        <h4>Header Color</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', }}>
                            {/* Predefined Color Options */}
                            <div
                                onClick={() => setHeaderColor('#FFFFFF')}
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    backgroundColor: '#FFFFFF',
                                    border: headerColor === '#FFFFFF' ? '2px solid #000' : '1px solid #ccc',
                                    cursor: 'pointer',
                                }}
                            ></div>
                            <div
                                onClick={() => setHeaderColor('#000000')}
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    backgroundColor: '#000000',
                                    border: headerColor === '#000000' ? '2px solid #000' : '1px solid #ccc',
                                    cursor: 'pointer',
                                }}
                            ></div>
                            <div
                                onClick={() => setHeaderColor('#33475B')}
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    backgroundColor: '#33475B',
                                    border: headerColor === '#33475B' ? '2px solid #000' : '1px solid #ccc',
                                    cursor: 'pointer',
                                }}
                            ></div>
                            {/* Color Picker */}

                        </div>
                        {/* Display Selected Color Hex Code */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                                type="color"
                                value={headerColor}
                                onChange={(e) => setHeaderColor(e.target.value)}
                                style={{ width: '48px', height: '48px', border: 'none', cursor: 'pointer', borderRadius: "8px" }}
                            />
                            <input
                                type="text"
                                value={headerColor}
                                readOnly
                                style={{
                                    height: '48px',
                                    width: '231px',
                                    marginTop: '10px',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                    textAlign: 'center',
                                    fontFamily: 'Inter, sans-serif',
                                }}
                            /></div>
                    </div>
                    <div className="backgroundcolor" style={{
                        display: 'flex', flexDirection: 'column',
                        gap: '10px', width: '400px', height: '200px',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)',
                        borderRadius: '16px', padding: '20px'
                    }}>
                        <h4>Background Color</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {/* Predefined Color Options */}
                            <div
                                onClick={() => setBgColor('#FFFFFF')}
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    backgroundColor: '#FFFFFF',
                                    border: bgColor === '#FFFFFF' ? '2px solid #000' : '1px solid #ccc',
                                    cursor: 'pointer',
                                }}
                            ></div>
                            <div
                                onClick={() => setBgColor('#000000')}
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    backgroundColor: '#000000',
                                    border: bgColor === '#000000' ? '2px solid #000' : '1px solid #ccc',
                                    cursor: 'pointer',
                                }}
                            ></div>
                            <div
                                onClick={() => setBgColor('#EEEEEE')}
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    backgroundColor: '#EEEEEE',
                                    border: bgColor === '#EEEEEE' ? '2px solid #000' : '1px solid #ccc',
                                    cursor: 'pointer',
                                }}
                            ></div>
                            {/* Color Picker */}

                        </div>
                        {/* Display Selected Color Hex Code */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                                type="color"
                                value={bgColor}
                                onChange={(e) => setBgColor(e.target.value)}
                                style={{ width: '48px', height: '48px', border: 'none', cursor: 'pointer', borderRadius: "8px" }}
                            />
                            <input
                                type="text"
                                value={bgColor}
                                readOnly
                                style={{
                                    height: '48px',
                                    width: '231px',
                                    marginTop: '10px',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                    textAlign: 'center',
                                    fontFamily: 'Inter, sans-serif',
                                }} />
                        </div>
                    </div>
                    <div className="message" style={{
                        display: 'flex', flexDirection: 'column',
                        gap: '10px', width: '400px', height: '200px',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)',
                        borderRadius: '16px', padding: '20px'
                    }}>
                        <h4>Customize Message</h4>
                        <div style={{ position: 'relative', width: '300px' }}>
                            <input
                                type="text"
                                value={greeting}
                                onChange={(e) => setGreeting(e.target.value)}
                                placeholder="Greeting Message"
                                style={{
                                    width: '100%',
                                    height: '48px',
                                    borderRadius: '9px',
                                    padding: '10px 40px 10px 10px', // Add padding for the icon
                                    border: '1px solid #ccc',
                                    backgroundColor: "#F6F7F5",
                                    borderColor: "#F6F7F5"
                                }}
                            />
                            <img
                                src={Pencil}
                                alt="Edit"
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    width: '12px',
                                    height: '12px',
                                    cursor: 'pointer',
                                }}
                            />
                        </div>
                        <div style={{ position: 'relative', width: '300px' }}>
                            <input
                                type="text"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Prompt Message"
                                style={{
                                    width: '100%',
                                    height: '48px',
                                    borderRadius: '9px',
                                    padding: '10px 40px 10px 10px', // Add padding for the icon
                                    border: '1px solid #ccc', backgroundColor: "#F6F7F5",
                                    borderColor: "#F6F7F5"
                                }}
                            />
                            <img
                                src={Pencil}
                                alt="Edit"
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    width: '12px',
                                    height: '12px',
                                    cursor: 'pointer',
                                }}
                            />
                        </div>
                    </div>

                    <div className="message" style={{
                        display: 'flex', flexDirection: 'column',
                        gap: '10px', width: '400px', height: 'auto',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)',
                        borderRadius: '16px', padding: '20px'
                    }}>
                        <h4>Customize Message</h4>
                        <div style={{ position: 'relative', width: '300px' }}>
                            <label htmlFor="Name" style={{width:"300px",
                                color: "#50505"
                            }}>Your Name</label>
                            <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                                style={{ border: "none", width:"300px",borderBottom: "2px solid #ccc", borderRadius: "0px", marginBottom: "2px" }} />
                            <label htmlFor="phone" style={{
                                color: "#50505"
                            }}>Phone</label>

                            <input type="text" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                style={{ border: "none",width:"300px", borderBottom: "2px solid #ccc", borderRadius: "0px" }} />

                            <label htmlFor="Email" style={{
                                color: "#50505"
                            }}>Email</label>

                            <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                                style={{ border: "none",width:"300px", borderBottom: "2px solid #ccc", borderRadius: "0px" }} />

                        </div>


                    </div>
                    <div className="message" style={{
                        display: 'flex', flexDirection: 'column',
                        gap: '10px', width: '400px', height: '150px',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)',
                        borderRadius: '16px', padding: '20px'
                    }}>
                        <h4>Welcome Message</h4>
                        <div style={{ position: 'relative', width: '300px' }}>
                            <input
                                type="text"
                                value={welcomeMessage}
                                onChange={(e) => setWelcomeMessage(e.target.value)}
                                placeholder="Prompt Message"
                                style={{
                                    width: '100%',
                                    height: '48px',
                                    borderRadius: '9px',
                                    padding: '10px 40px 10px 10px', // Add padding for the icon
                                    border: '1px solid #ccc', backgroundColor: "#F6F7F5",
                                    borderColor: "#F6F7F5"
                                }}
                            />
                            <img
                                src={Pencil}
                                alt="Edit"
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    width: '12px',
                                    height: '12px',
                                    cursor: 'pointer',
                                }}
                            />
                        </div>
                    </div>

                    <div className="message" style={{
                        display: 'flex', flexDirection: 'column',
                        gap: '10px', width: '400px', height: 'auto',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)',
                        borderRadius: '16px', padding: '20px'
                    }}>
                        <h3>Missed chat timer</h3>
                        <div >
                            <select style={{width:"300px"}} value={hours} onChange={(e) => setHours(e.target.value)} >
                                {range(0, 23).map((h) => (
                                    <option key={h} value={h}>{h}</option>
                                ))}
                            </select>
                            :
                            <select value={minutes} onChange={(e) => setMinutes(e.target.value)} >
                                {range(0, 59).map((m) => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                            :
                            <select value={seconds} onChange={(e) => setSeconds(e.target.value)} >
                                {range(0, 59).map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                        <button onClick={handleSave} >Save</button>
                    </div>
                </div>

            </div>
        </div>
    );
};




export default Cut;