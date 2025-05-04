import React, { useState, useEffect } from 'react';
import { Createchat, Updatechat, GetChat as Getchat } from '../../service/chatservices'; // Add Getchat
import Iconstatus from '../../assets/images/dashboard/Iconstatus.png';
import { botget } from '../../service/chatservices';

export default function Chatbot() {
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState('');
  const [formShown, setFormShown] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState(null);
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

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // ⬇️ Load from localStorage on first render
  useEffect(() => {
    fetchbotdata();

    const savedTicketId = localStorage.getItem('ticket');
    console.log('Saved ticket ID:', savedTicketId); // Debugging line
    if (savedTicketId) {
      setTicketId(savedTicketId);
      setFormSubmitted(true);
      setFormShown(true);
      fetchChatHistory(savedTicketId);
    }
  }, []);

  const fetchbotdata = async () => {
    try {
      const res = await botget();
      console.log('Bot data response:', res.data);
      setBotData({
        header: res.data[0].header,
        background: res.data[0].background,
        prompt: res.data[0].prompt,
        greetings: res.data[0].greetings,
        name: res.data[0].name,
        email: res.data[0].email,
        phone: res.data[0].phone,
        missed: res.data[0].missed,
        welcome: res.data[0].welcome
      });
    }
    catch (err) {
      console.log("Error loading chat history", err);
    }
  };
  const fetchChatHistory = async (id) => {
    try {
      const res = await Getchat(id);
      console.log('Chat history response:', res);
      console.log("setchats", res.data.chats)
      setChats(Array.isArray(res.data.chats) ? res.data.chats : []);
    }
    catch (err) {
      console.log("Error loading chat history", err);
    }
  };


  const handleFormChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = { type: 'text', senderType: 'user', message: input };
    const newChats = [...chats, userMessage];
    setChats(newChats);
    setInput('');

    if (formSubmitted && ticketId) {
      console.log('Sending message to server:', userMessage);
      console.log('Ticket ID:', ticketId); // Debugging line
      await Updatechat({ ticketId, userMessage });

    }

    if (!formShown) {
      setTimeout(() => {
        setChats(prev => [...prev, { type: 'form', senderType: 'Bot', message: ` ${botdata.greetings} ${botdata.Prompt} ` }]);
        setFormShown(true);
      }, 500);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.email || !userInfo.phone) {
      alert("Please fill all fields.");
      return;
    }

    const payload = {
      name: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone,
      chats
    };

    try {
      const response = await Createchat(payload);

      // ✅ Save ticket ID and token
      console.log('Response from Createchat:', response);
      console.log('Response from Createchat:', response.data.ticket._id);
      const ticketId = response.data.ticket._id;
      localStorage.setItem('ticket', ticketId);
      localStorage.setItem('token', response.data.token) // Save ticket ID in localStorage


      // ✅ Add thank-you message
      const thankMessage = {
        type: 'text',
        senderType: 'Member',
        message: `${botdata.prompt} 
        ${botdata.greetings}`
      };

      setChats(prev => [...prev, thankMessage]);
      setFormSubmitted(true);
    } catch (err) {
      console.error("Error creating ticket:", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  }


  return (
    // <div className="chat-container" style={{ display: 'flex', backgroundColor: `${botdata.background}`, flexDirection: 'column', width: '400px', margin: '0 auto' }}>
    //   <div className="chat-header" style={{
    //     backgroundColor: `${botdata.header}`,
    //     padding: '10px', textAlign: 'center',
    //     fontWeight: 'bold', display: 'flex', alignItems: 'center', color: "white"
    //   }}>

    //     <img src={Iconstatus} alt="Status" style={{ width: '37px', height: '33px', marginRight: '5px' }} />
    //     <h4>Hubly</h4>
    //   </div>

    //   <div className="chat-box" style={{ height: '400px', overflowY: 'scroll' }}>
    //     {chats.map((chat, index) => {
    //       const chatType = chat.type || 'text'; // fallback for older data
    //       return (
    //         <div key={index} style={{ textAlign: chat.senderType === 'user' ? 'right' : 'left', margin: '10px 0' }}>
    //           {chatType === 'text' ? (
    //             <div style={{
    //               display: 'inline-block',
    //               backgroundColor: chat.senderType === 'user' ? '#dcf8c6' : '#6DF7FC',
    //               padding: '8px 12px',
    //               borderRadius: '15px'
    //             }}>
    //               {chat.message}
    //             </div>
    //           ) : (
                
    //             !formSubmitted && (
    //               <div className="form" style={{ height: "100%", width: "280px", display: "flex", flexDirection: "column", backgroundColor: "#ffffff", marginLeft: "10px", padding: "10px", borderRadius: "10px" }}>
    //                 <h3>Introduction Yourself</h3>
    //                 <label htmlFor="Name" style={{
    //                   color: "#50505"
    //                 }}>Your Name</label>
    //                 <input type="text" placeholder={botdata.name} onChange={handleFormChange} value={userInfo.name} name='name'
    //                   style={{ border: "none", height: "10px", width: "250px", borderBottom: "2px solid #ccc", borderRadius: "0px", marginBottom: "2px" }} />
    //                 <label htmlFor="phone" style={{ color: "#50505" }}>Phone</label>

    //                 <input type="text" placeholder={botdata.phone} onChange={handleFormChange} value={userInfo.phone} name='phone'
    //                   style={{ border: "none", width: "250px", borderBottom: "2px solid #ccc", borderRadius: "0px" }} />

    //                 <label htmlFor="Email" style={{ color: "#50505" }}>Email</label>

    //                 <input type="email" placeholder={botdata.email} onChange={handleFormChange} value={userInfo.email} name='email'
    //                   style={{ border: "none", width: "250px", borderBottom: "2px solid #ccc", borderRadius: "0px", }} />
    //                 <button onClick={handleFormSubmit} style={{ height: "30px", width: "203px", backgroundColor: "#184E7F", color: "white", borderRadius: "9.12px", margin: "5px 30px" }}>Thank You</button>
    //               </div>
    //             )
    //           )}
    //         </div>
    //       );
    //     })}
    //   </div>

    //   {/* <div className="chat-input" style={{ display: 'flex', alignItems: 'center'}}>
    //     <input
    //       type="text"
    //       placeholder="Write a message"
    //       value={input}
    //       onChange={(e) => setInput(e.target.value)}
    //       onKeyDown={handleKeyDown}
    //       style={{ flex: 1, padding: '8px' }}
    //     />
    //     <button onClick={handleSend} style={{ padding: '8px 12px' }}>➤</button>
    //   </div> */}
    //   <div
    //     className="chat-input"
    //     style={{
    //       display: 'flex',
    //       alignItems: 'center',
    //       backgroundColor: '#fff',
    //       borderRadius: '10px',
    //       padding: '10px 15px',
    //       boxShadow: '0 0 5px rgba(0,0,0,0.1)',
    //       width: '100%',
    //       maxWidth: '500px'
    //     }}
    //   >
    //     <input
    //       type="text"
    //       placeholder="Write a message"
    //       value={input}
    //       onChange={(e) => setInput(e.target.value)}
    //       onKeyDown={handleKeyDown}
    //       style={{
    //         flex: 1,
    //         border: 'none',
    //         outline: 'none',
    //         fontSize: '16px'
    //       }}
    //     />
    //     <button
    //       onClick={handleSend}
    //       style={{
    //         background: 'none',
    //         border: 'none',
    //         fontSize: '20px',
    //         cursor: 'pointer',
    //         color: '#a0aec0',
    //         marginLeft: '10px'
    //       }}
    //       title="Send"
    //     >
    //       ➤
    //     </button>
    //   </div>
    // </div>

        <div
          className="chat-container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%', // Adjust width for mobile
            maxWidth: '400px', // Limit max width for larger screens
            margin: '0 auto',
            backgroundColor: `${botdata.background}`,
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
          }}
        >
          {/* Chat Header */}
          <div
            className="chat-header"
            style={{
              backgroundColor: `${botdata.header}`,
              padding: '10px',
              textAlign: 'center',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              color: 'white',
            }}
          >
            <img
              src={Iconstatus}
              alt="Status"
              style={{
                width: '30px',
                height: '30px',
                marginRight: '10px',
              }}
            />
            <h4 style={{ fontSize: '18px', margin: 0 }}>Hubly</h4>
          </div>
    
          {/* Chat Box */}
          <div
            className="chat-box"
            style={{
              height: '300px', // Adjust height for mobile
              overflowY: 'scroll',
              padding: '10px',
              backgroundColor: '#f9f9f9',
            }}
          >
            {chats.map((chat, index) => {
              const chatType = chat.type || 'text'; // fallback for older data
              return (
                <div
                  key={index}
                  style={{
                    textAlign: chat.senderType === 'user' ? 'right' : 'left',
                    margin: '10px 0',
                  }}
                >
                  {chatType === 'text' ? (
                    <div
                      style={{
                        display: 'inline-block',
                        backgroundColor:
                          chat.senderType === 'user' ? '#dcf8c6' : '#6DF7FC',
                        padding: '8px 12px',
                        borderRadius: '15px',
                        maxWidth: '80%', // Limit message width for mobile
                        wordWrap: 'break-word', // Ensure long text wraps
                      }}
                    >
                      {chat.message}
                    </div>
                  ) : (
                    !formSubmitted && (
                      <div
                        className="form"
                        style={{
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          backgroundColor: '#ffffff',
                          padding: '10px',
                          borderRadius: '10px',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        }}
                      >
                        <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>
                          Introduce Yourself
                        </h3>
                        <label
                          htmlFor="Name"
                          style={{
                            color: '#505050',
                            fontSize: '14px',
                            marginBottom: '5px',
                          }}
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          placeholder={botdata.name}
                          onChange={handleFormChange}
                          value={userInfo.name}
                          name="name"
                          style={{
                            border: '1px solid #ccc',
                            height: '35px',
                            width: '100%',
                            borderRadius: '5px',
                            marginBottom: '10px',
                            padding: '5px',
                          }}
                        />
                        <label
                          htmlFor="phone"
                          style={{
                            color: '#505050',
                            fontSize: '14px',
                            marginBottom: '5px',
                          }}
                        >
                          Phone
                        </label>
                        <input
                          type="text"
                          placeholder={botdata.phone}
                          onChange={handleFormChange}
                          value={userInfo.phone}
                          name="phone"
                          style={{
                            border: '1px solid #ccc',
                            height: '35px',
                            width: '100%',
                            borderRadius: '5px',
                            marginBottom: '10px',
                            padding: '5px',
                          }}
                        />
                        <label
                          htmlFor="Email"
                          style={{
                            color: '#505050',
                            fontSize: '14px',
                            marginBottom: '5px',
                          }}
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          placeholder={botdata.email}
                          onChange={handleFormChange}
                          value={userInfo.email}
                          name="email"
                          style={{
                            border: '1px solid #ccc',
                            height: '35px',
                            width: '100%',
                            borderRadius: '5px',
                            marginBottom: '10px',
                            padding: '5px',
                          }}
                        />
                        <button
                          onClick={handleFormSubmit}
                          style={{
                            height: '40px',
                            width: '100%',
                            backgroundColor: '#184E7F',
                            color: 'white',
                            borderRadius: '5px',
                            marginTop: '10px',
                            fontSize: '16px',
                          }}
                        >
                          Thank You
                        </button>
                      </div>
                    )
                  )}
                </div>
              );
            })}
          </div>
    
          {/* Chat Input */}
          <div
            className="chat-input"
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderRadius: '10px',
              padding: '10px',
              boxShadow: '0 0 5px rgba(0,0,0,0.1)',
              width: '100%',
            }}
          >
            <input
              type="text"
              placeholder="Write a message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '16px',
                padding: '5px',
              }}
            />
            <button
              onClick={handleSend}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#184E7F',
                marginLeft: '10px',
              }}
              title="Send"
            >
              ➤
            </button>
          </div>
        </div>
      );
    }
