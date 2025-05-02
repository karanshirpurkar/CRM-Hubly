import { react as React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Child from './addmember.jsx'; // Import the Child component
import Vector from '../../assets/images/Vector.png';
import Dash from '../../assets/images/dashboard/dashboard.png';
import Chat from '../../assets/images/dashboard/chats.png';
import Insights from '../../assets/images/dashboard/Insights.png';
import Team from '../../assets/images/dashboard/team.png';
import Setting from '../../assets/images/dashboard/setting.png';
import Bot from '../../assets/images/dashboard/bot.png';
import Style from './dashboard.module.css';
import AddMember from './addmember.jsx';
import SettingTab from './setting.jsx'
import DashHome from './dashhome.jsx';
import ChatCenter from './chatcenter.jsx';
import Custombot from './custombot.jsx';
import Analytics from './analytics.jsx';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState(() => {
        return localStorage.getItem('activeTab') || 'dashboard'; // default is 'dashboard'
    });
    const [selectedChatId, setSelectedChatId] = useState(null); // State to store the selected chat ID

    useEffect(() => {
        localStorage.setItem('activeTab', activeTab);
    }, [activeTab]);

    const tabs = [
        { name: 'Dashboard', img: Dash, key: 'dashboard' },
        { name: 'Contact Center', img: Chat, key: 'chat' },
        { name: 'Analytics', img: Insights, key: 'insights' },
        { name: 'Chat Bot', img: Bot, key: 'bot' },
        { name: 'Team', img: Team, key: 'team' },
        { name: 'Settings', img: Setting, key: 'setting' },
    ];
    return (
        <div className={Style.container}>
            <div className={Style.dashboard}>
                <div className={Style.navbar}>
                    <img style={{ height: "45px", width: "45px" }} src={Vector} alt="Vector" />
                    {tabs.map(tab => (
                        <div className={Style.navbar_button} key={tab.key}>
                            <img src={tab.img} alt={tab.name} onClick={() => setActiveTab(tab.key)} />
                            {activeTab === tab.key && <p>{tab.name}</p>}
                        </div>
                    ))}
                </div>
            </div>
            <div className={Style.main}>
                <div className={Style.main_div}>
                    {activeTab === 'team' && < AddMember />}
                    {activeTab === 'setting' && < SettingTab />}
                    {activeTab === 'dashboard' &&<DashHome setDashboardActiveTab={setActiveTab} setSelectedChatId={setSelectedChatId} />}
                    {activeTab === 'chat' &&(
                        <ChatCenter 
                            selectedChatId={selectedChatId} 
                        />)}
                    {activeTab === 'bot' && <Custombot />}
                    {activeTab === 'insights' && <Analytics />}
                </div>
            </div>
        </div>
    );
}
