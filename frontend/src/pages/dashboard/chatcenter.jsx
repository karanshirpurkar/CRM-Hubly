import React, { useEffect, useState } from 'react';
import { Updatechat, GetChat as Getchat, UpdateStatus, Assigned, GetAllChats } from '../../service/chatservices';
import { Getbyid, GetAllUsers } from '../../service/services';
import PP from '../../assets/images/dashboard/profile1.png';
import Home from '../../assets/images/dashboard/dashboard.png';
import Ticket from '../../assets/images/dashboard/ticket.png';



function ChatCenter({ selectedChatId }) {
    // User
    const [userInfo, setUserInfo] = useState({ name: '', email: '' });
    const [userData, setUserData] = useState({ firstName: '', lastName: '', email: '', designation: '' });

    // Chat
    const [chats, setChats] = useState([]);
    const [allchats, setAllChats] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    // UI Controls
    const [showmember, setShowMember] = useState(false);
    const [showstatus, setShowStatus] = useState(false);

    // Assignment
    const [AllMembers, setAllMembers] = useState([]);
    const [member, setMember] = useState(null);
    const [date, setDate] = useState(null);



    useEffect(() => {
        if (selectedChatId) {
            fetchChatHistory(selectedChatId);
        }
    }, [selectedChatId]);

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



    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await GetAllChats(); // Call the API to fetch all chats
                if (response.status === 200) {
                    setAllChats(response.data); // Store chats in state
                } else {
                    console.error('Error fetching chats:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };

        fetchChats(); // Call the function
    }, []);

    // Filter chats based on the active tab


    const fetchChatHistory = async (id) => {
        try {
            setLoading(true);
            const res = await Getchat(id);
            // console.log('Chat history response:', res);
            // console.log("setchats", res.data.chats)
            setUserInfo({
                name: res.data.name,
                email: res.data.email,

            });
            formatDateTime(res.data.createdAt); // Format the date and time
            setChats(Array.isArray(res.data.chats) ? res.data.chats : []);

        } catch (err) {
            console.error('Error loading chat history:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSend = async () => {
        if (input.trim() === '') return;

        const userMessage = { type: 'text', senderType: 'Member', message: input };
        const newChats = [...chats, userMessage];
        // console.log("newchats", newChats)
        // console.log("userMessage", userMessage)
        setChats(newChats);
        setInput('');

        try {
            if (selectedChatId) {
                await Updatechat({ ticketId: selectedChatId, userMessage });
            }
        } catch (err) {
            console.error('Error sending message:', err);
        }
    };
    const handleshowStatus = () => {
        setShowStatus(true);
    }

    const handleStatusButtonClick = async (status) => {
        console.log("ticketstatus", status)
        await UpdateStatus({ ticketId: selectedChatId, T_status: status });
        setShowStatus(false);
        setTicketStatus(null);
    };

    const handleShowMember = async () => {
        if (userData.designation === "Admin") {
            setShowMember(true);
            try {
                const res = await GetAllUsers();
                console.log("allmembers", res.data);
                setAllMembers(res.data); // save them in state
            } catch (err) {
                console.error('Error fetching all members:', err);
            }
        }
        else {
            alert("You are not authorized to assign members")
        }

        // const firstMessage = chat.chats && chat.chats.length > 0 ? chat.chats[0].message : 'No messages available'; // Get the first message

    };


    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    };

    const handleMemberClick = async (memberId) => {
        console.log("memberId", memberId)
        try {
            const resticket = await Assigned({ ticketId: selectedChatId, MemberId: memberId });
            console.log("Assigned successfully", resticket);
        } catch (err) {
            console.error('Error assigning member:', err);
        }
        setShowMember(false);

    }
    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        const formattedDate = `${year}-0${month}${day}`;
        setDate(formattedDate)

    };

    return (
        <div >

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', backgroundColor: "#FAFBFC" }}>
                <div style={{ flex: 1, marginRight: '20px', width: "296px", gap: "10px" }}>
                    <h1>Chat Center</h1>
                    <h2 style={{ marginTop: "17px", fontSize: "14px" }}>Chats</h2>
                    <div style={{ height: "46px", width: "284px" }}>
                        {allchats.map((allchats, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', cursor: 'pointer', gap: "10px" }}>
                                <div>
                                    <img src={PP} alt="PP" />
                                </div>
                                <div>
                                    <p style={{ fontSize: "13.5", color: "#5E9BD5" }}>Chat {index + 1}</p>
                                    <p style={{ fontSize: "11px", color: "#9A9B9D" }}>{allchats.chats[0].message}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
                <div className="chat-container" style={{ flex: 2, border: '1px solid #ccc', padding: '10px', width: "550px", height: "100vh", backgroundColor: "White" }}>
                    <div className="chatheader" style={{ display: 'flex', alignItems: 'center', gap: "10px", borderBottom: '1px solid #ccc', padding: '10px' }}>
                        <div style={{
                            width: "25px", height: "25px", borderRadius: "50%"
                            , backgroundColor: "#F8A534"
                        }}>

                        </div>
                        <p>Ticket {date}</p>
                        <img src={Home} alt="Home" style={{ height: "20px", width: "20px", left: "10px" }} />
                    </div>
                    <div
                        className="chat-box"
                        style={{ border: '1px black', height: '85vh', overflowY: 'scroll' }}
                    >

                        {chats.map((chat, index) => {
                            const chatType = chat.type || 'text'; // fallback for older data

                            return (
                                <div
                                    key={index}
                                    style={{
                                        textAlign: chat.senderType === 'Member' ? 'right' : 'left',
                                        margin: '10px 0'
                                    }}
                                ><div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

                                    </div>

                                    {chatType === 'text' ? (
                                        <div
                                            style={{
                                                display: 'inline-block',
                                                background: chat.senderType === 'user' ? '#dcf8c6' : '#f1f0f0',
                                                padding: '8px 12px',
                                                borderRadius: '15px'
                                            }}
                                        >
                                            {chat.message}
                                        </div>
                                    ) : null}
                                </div>
                            );
                        })}
                    </div>
                    <div className="chat-input" style={{ display: 'flex', marginTop: '10px' }}>
                        <input
                            type="text"
                            placeholder="Write a message"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            style={{ flex: 1, padding: '8px' }}
                        />
                        <button onClick={handleSend} style={{ padding: '8px 12px' }}>➤</button>
                    </div>
                </div>
                <div className="info" style={{ flex: 1, border: '1px #ccc', padding: '10px', width: "550px" }}>
                    <div className="profile" style={{ display: 'flex', alignItems: 'center', gap: "10px", padding: '10px' }}>
                        <img src={PP} alt="Profile" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                        <p>Chat</p>
                    </div>
                    <div className="details" style={{ gap: "10px" }}>
                        <h2 style={{ fontSize: "14px", color: "#184E7F" }}>Details</h2>
                        <div style={{ height: "38px", width: "490px", gap: "23px", border: "1px solid #ccc", borderRadius: "13px", fontSize: "16px", backgroundColor: "#FFFFFF", color: "#808080", display: "flex", alignItems: "center", marginBottom: "10px", padding: "10px" }}>
                            <p >{userInfo.name}</p>
                        </div>
                        <div style={{ height: "38px", width: "490px", gap: "23px", border: "1px solid #ccc", borderRadius: "13px", fontSize: "16px", backgroundColor: "#FFFFFF", color: "#808080", display: "flex", alignItems: "center", marginBottom: "10px", padding: "10px" }}>

                            <p>{userInfo.email}</p>
                        </div>
                        <div style={{ height: "38px", width: "490px", gap: "23px", border: "1px solid #ccc", borderRadius: "13px", fontSize: "16px", backgroundColor: "#FFFFFF", color: "#808080", display: "flex", alignItems: "center", marginBottom: "10px", padding: "10px" }}>

                            <p>+91 0000000000</p>
                        </div>
                        <h2 style={{ color: "#184E7F", fontSize: "14px" }}>Teammates</h2>
                        <div style={{ height: "38px", width: "490px", gap: "23px", border: "1px solid #ccc", borderRadius: "13px", fontSize: "13.5px", backgroundColor: "#FFFFFF", color: "#808080", display: "flex", alignItems: "center", marginBottom: "10px", padding: "10px" }}>
                            <img src={PP} alt="Profile" />
                            <h3 onClick={handleShowMember}>{userData.firstName} {userData.lastName}</h3>
                        </div>
                        {showmember && (
                            <div className="all-members" style={{ width: "490px", gap: "23px", border: "1px solid #ccc", borderRadius: "13px", fontSize: "13.5px", backgroundColor: "#FFFFFF", color: "#808080", display: "flex", alignItems: "center", padding: "10px" }}>
                                <ul>
                                    {AllMembers.map((member, index) => (<div style={{ width: "480px", gap: "23px", borderBottom: "1px solid #ccc", fontSize: "13.5px", backgroundColor: "#FFFFFF", color: "#808080", display: "flex", alignItems: "center", padding: "5px" }}>
                                        <img src={PP} alt="Profile" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />

                                        <p
                                            key={index}
                                            onClick={() => handleMemberClick(member._id)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {member.firstName} {member.lastName}
                                        </p>
                                    </div>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {/* <h3 onClick={handleShowMember}>Assign Member</h3> */}
                        {/* {showmember ? (
                        <div className="status">
                            <button onClick={() => handleShowMember("Assigned")}>Assigned</button>
                            <button onClick={() => handleShowMember("Unassigned")}>Unassigned</button>
                        </div>
                    ) : null} */}
                        <div style={{ height: "38px", width: "490px", gap: "23px", border: "1px solid #ccc", borderRadius: "13px", fontSize: "13.5px", backgroundColor: "#FFFFFF", color: "#808080", display: "flex", alignItems: "center", marginTop: "10px", padding: "10px" }}>
                            <img src={Ticket} alt="Profile" style={{ width: '20px', height: '20px' }} />
                            <h3 onClick={handleshowStatus}>Ticket Status</h3>
                        </div>
                        {showstatus ? (
                            <div className="status" >
                                <div style={{ height: "38px", width: "490px", gap: "23px", border: "1px solid #ccc", borderRadius: "13px", fontSize: "13.5px", backgroundColor: "#FFFFFF", color: "#808080", display: "flex", alignItems: "center", marginTop: "10px", padding: "10px" }}>

                                    <p onClick={() => handleStatusButtonClick("Resolved")}>Resolved</p>
                                </div>
                                <div style={{ height: "38px", width: "490px", gap: "23px", border: "1px solid #ccc", borderRadius: "13px", fontSize: "13.5px", backgroundColor: "#FFFFFF", color: "#808080", display: "flex", alignItems: "center", padding: "10px" }}>

                                    <p onClick={() => handleStatusButtonClick("Unresolved")}>Unresolved</p>
                                </div>
                            </div>
                        ) : null}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ChatCenter;
