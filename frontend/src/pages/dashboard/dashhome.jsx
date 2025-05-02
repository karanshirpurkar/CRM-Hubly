import React, { useEffect, useState } from 'react';
import { GetAllChats } from '../../service/chatservices';
import PP from '../../assets/images/dashboard/profile1.png';
import Style from './dashhome.module.css'; // Import your CSS file for styling

function DashHome({ setDashboardActiveTab, setSelectedChatId }) {

    const [chats, setChats] = useState([]); // All chats
    const [filteredChats, setFilteredChats] = useState([]); // Chats filtered by active tab
    const [activeTab, setActiveTab] = useState(() => {
        return localStorage.getItem('activeTabticket') || 'alltickets'; // Default tab is 'alltickets'
    });

    useEffect(() => {
        localStorage.setItem('activeTabticket', activeTab);
    }, [activeTab]);

    const tabs = [
        { name: 'All Tickets', className: 'tab-alltickets', key: 'alltickets' },
        { name: 'Resolved', className: 'tab-resolved', key: 'resolved' },
        { name: 'Unresolved', className: 'tab-unresolved', key: 'unresolved' },
    ];

    useEffect(() => {
        const fetchChats = async () => {
            const response = await GetAllChats();
            if (response.status === 200) {
                setChats(response.data);
                setFilteredChats(response.data); // Initially show all chats
            } else {
                console.error('Error fetching chats:', response.data.message);
            }
        };

        fetchChats();

    }, []);
    console.log("chats", chats);

    // Filter chats based on the active tab
    useEffect(() => {
        if (activeTab === 'alltickets') {
            setFilteredChats(chats); // Show all chats
        } else if (activeTab === 'resolved') {
            setFilteredChats(chats.filter((chat) => chat.status === 'Resolved')); // Filter resolved chats
        } else if (activeTab === 'unresolved') {
            setFilteredChats(chats.filter((chat) => chat.status === 'Unresolved')); // Filter unresolved chats
        }
    }, [activeTab, chats]);


    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        const formattedDate = `${year}-0${month}${day}`;

        const formattedTime = new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        }).format(date); // e.g., "4:53:55 PM"

        return { formattedDate, formattedTime };
    };
    const calculateTimePassed = (isoString) => {
        const createdAt = new Date(isoString);
        const now = new Date();

        const diffInMilliseconds = now - createdAt; // Difference in milliseconds
        const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60)); // Convert to minutes
        const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60)); // Convert to hours

        const remainingMinutes = diffInMinutes % 60; // Minutes left after calculating hours

        return `${diffInHours}:${remainingMinutes}`;
    };
    // style={{ backgroundColor: activeTab === tab.key ? '#007bff' : '#f0f0f0', color: activeTab === tab.key ? '#fff' : '#000' }} // Change color based on active tab

    return (
        <div className="dashhome">
            <h1>Dashboard Home</h1>
            <div className={Style.tab}>
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.key)}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>
            <div className={Style.chatList}>
                {filteredChats.length > 0 ? (
                    filteredChats.map((chat) => {
                        const { formattedDate, formattedTime } = formatDateTime(chat.createdAt);
                        const firstMessage = chat.chats && chat.chats.length > 0 ? chat.chats[0].message : 'No messages available'; // Get the first message
                        const timePassed = calculateTimePassed(chat.createdAt);

                        return (
                           
                            <div key={chat._id} className="chat-item" style={{
                                background: "#fff",
                                border: "1px solid #eee",
                                borderRadius: "8px",
                                padding: "20px",
                                margin: "20px 0",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                width: "1295px",
                              }}>
                                {/* Header */}
                                <div style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center"
                                }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <div style={{
                                      width: "25px",
                                      height: "25px",
                                      borderRadius: "50%",
                                      backgroundColor: "#F8A534"
                                    }}></div>
                                    <p style={{ fontWeight: "bold", fontSize: "16px", margin: 0 }}>
                                      Ticket# {formattedDate}
                                    </p>
                                  </div>
                                  <p style={{ fontSize: "12px", color: "#888", margin: 0 }}>
                                    Posted at {formattedTime}
                                  </p>
                                </div>
                              
                                {/* Message */}
                                <div style={{
                                  margin: "20px 0",
                                  fontSize: "18px"
                                }}>
                                  {firstMessage}
                                </div>
                              
                                {/* Time */}
                                <div style={{
                                  fontWeight: "bold",
                                  fontSize: "16px",
                                  textAlign: "right"
                                }}>
                                  {timePassed}
                                </div>
                              
                                <hr style={{ margin: "20px 0", borderColor: "#eee" }} />
                              
                                {/* Footer */}
                                <div style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center"
                                }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <img
                                      src={PP}
                                      alt="Profile Photo"
                                      style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover" }}
                                    />
                                    <div style={{ fontSize: "13px", color: "#444" }}>
                                      <div><strong>{chat.name}</strong></div>
                                      <div>+91 0000000000</div>
                                      <div>{chat.email}</div>
                                    </div>
                                  </div>
                              
                                  <button
                                    style={{
                                      textDecoration:"Underline",
                                    backgroundColor: "transparent",
                                      color: "#184E7F",
                                      border: "none",
                                      borderRadius: "8px",
                                      padding: "10px 16px",
                                      cursor: "pointer"
                                    }}
                                    onClick={() => {
                                      setSelectedChatId(chat._id);
                                      setDashboardActiveTab('chat');
                                    }}
                                  >
                                    Open Ticket
                                  </button>
                                </div>
                              </div>
                              
                        );
                    })
                ) : (
                    <p>No chats available for this category.</p>
                )}
            </div>
        </div>
    );
}

export default DashHome;