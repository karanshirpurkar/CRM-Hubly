import React, { useState, useEffect } from 'react';
import { Createchat, Updatechat, GetChat as Getchat } from '../../service/chatservices'; // Add Getchat
import Iconstatus from '../../assets/images/dashboard/Iconstatus.png';

export default function Chatbot() {
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState('');
  const [formShown, setFormShown] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState(null);

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // ⬇️ Load from localStorage on first render
  useEffect(() => {
    const savedTicketId = localStorage.getItem('ticket');
    console.log('Saved ticket ID:', savedTicketId); // Debugging line
    if (savedTicketId) {
      setTicketId(savedTicketId);
      setFormSubmitted(true);
      setFormShown(true);
      fetchChatHistory(savedTicketId);
    }
  }, []);

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
      await Updatechat({ticketId, userMessage});
      
    }

    if (!formShown) {
      setTimeout(() => {
        setChats(prev => [...prev, { type: 'form', senderType: 'Bot' }]);
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
      localStorage.setItem('token',response.data.token) // Save ticket ID in localStorage


      // ✅ Add thank-you message
      const thankMessage = {
        type: 'text',
        senderType: 'Member',
        message: `Thanks ${userInfo.name}, how can we assist you today?`
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
    <div className="chat-container" style={{ display: 'flex', flexDirection: 'column', width: '400px', margin: '0 auto' }}>
      <div className="chat-header" style={{ background: '#f1f1f1', 
        padding: '10px', textAlign: 'center', 
        fontWeight: 'bold', display: 'flex', alignItems: 'center',backgroundColor: '#33475B', color:"white" }}>
      
        <img src={Iconstatus} alt="Status" style={{ width: '37px', height: '33px', marginRight: '5px' }} />
        <h4>Hubly</h4>
      </div>

      <div className="chat-box" style={{ height: '400px', overflowY: 'scroll'}}>
        {chats.map((chat, index) => {
          const chatType = chat.type || 'text'; // fallback for older data
          return (
            <div key={index} style={{ textAlign: chat.senderType === 'user' ? 'right' : 'left', margin: '10px 0' }}>
              {chatType === 'text' ? (
                <div style={{
                  display: 'inline-block',
                  background: chat.senderType === 'user' ? '#dcf8c6' : '#f1f0f0',
                  padding: '8px 12px',
                  borderRadius: '15px'
                }}>
                  {chat.message}
                </div>
              ) : (
                !formSubmitted && (
                  <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={userInfo.name}
                      onChange={handleFormChange}
                      style={{ padding: '8px' }}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={userInfo.email}
                      onChange={handleFormChange}
                      style={{ padding: '8px' }}
                    />
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      value={userInfo.phone}
                      onChange={handleFormChange}
                      style={{ padding: '8px' }}
                    />
                    <button type="submit" style={{ padding: '8px 12px' }}>Submit</button>
                  </form>
                )
              )}
            </div>
          );
        })}
      </div>

      {/* <div className="chat-input" style={{ display: 'flex', alignItems: 'center'}}>
        <input
          type="text"
          placeholder="Write a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ flex: 1, padding: '8px' }}
        />
        <button onClick={handleSend} style={{ padding: '8px 12px' }}>➤</button>
      </div> */}
          <div
      className="chat-input"
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '10px 15px',
        boxShadow: '0 0 5px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '500px'
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
          fontSize: '16px'
        }}
      />
      <button
        onClick={handleSend}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '20px',
          cursor: 'pointer',
          color: '#a0aec0',
          marginLeft: '10px'
        }}
        title="Send"
      >
        ➤
      </button>
    </div>
    </div>

  );
}
  