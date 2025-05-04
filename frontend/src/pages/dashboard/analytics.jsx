import React, { useEffect, useState } from 'react';
import { allTickets } from '../../service/chatservices'; // Adjust the import path as needed
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; // Import styles for the progress bar
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Dot } from 'recharts';

function getWeekNumber(date) {
    const firstDay = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - firstDay) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + firstDay.getDay() + 1) / 7);
}

function Analytics() {
    const [tickets, setTickets] = useState([]);
    const [totalTickets, setTotalTickets] = useState(0); // State to store total tickets
    const [responseTimes, setResponseTimes] = useState([]); // State to store response times
    const [averageResponseTime, setAverageResponseTime] = useState(0); // State to store average response time
    const [resolvedPercentage, setResolvedPercentage] = useState(0); // State to store resolved tickets percentage
    const [missedChatsByWeek, setMissedChatsByWeek] = useState([]);


    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await allTickets();
                console.log('Fetched tickets:', response.data);

                // Set tickets and calculate total tickets
                setTickets(response.data);


                // Calculate missed chats (response after more than 2 hours)
                const missedChatCounts = {};
                response.data.forEach(ticket => {
                    if (ticket.createdAt && ticket.responseInfo) {
                        const created = new Date(ticket.createdAt);
                        const responded = new Date(ticket.responseInfo);
                        const diffHours = (responded - created) / (1000 * 60 * 60);

                        if (diffHours > 2) {
                            const week = `Week ${getWeekNumber(created)}`;
                            missedChatCounts[week] = (missedChatCounts[week] || 0) + 1;
                        }
                    }
                });

                // Format data for chart
                const formattedMissedChats = Object.entries(missedChatCounts).map(
                    ([week, count]) => ({
                        name: week,
                        chats: count
                    })
                );

                // Update state
                setMissedChatsByWeek(formattedMissedChats);
                console.log('Missed chats by week:', formattedMissedChats);


                setTotalTickets(response.data.length);

                // Calculate response times
                const times = response.data.map(ticket => {
                    if (ticket.responseInfo && ticket.createdAt) {
                        const createdAt = new Date(ticket.createdAt);
                        const responseInfo = new Date(ticket.responseInfo);
                        const differenceInMinutes = Math.round((responseInfo - createdAt) / (1000 * 60)); // Difference in minutes
                        return differenceInMinutes;
                    }
                    return null; // If responseInfo is null, return null
                });

                setResponseTimes(times); // Store the response times in state
                console.log('Response times (in minutes):', times);

                // Calculate average response time
                const validTimes = times.filter(time => time !== null); // Filter out null values
                const totalResponseTime = validTimes.reduce((acc, time) => acc + time, 0); // Sum up valid times
                const averageTime = validTimes.length > 0 ? Math.round(totalResponseTime / validTimes.length) : 0; // Calculate average
                setAverageResponseTime(averageTime); // Store the average response time
                console.log('Average response time (in minutes):', averageTime);

                // Calculate resolved tickets percentage
                const totalTickets = response.data.length;
                const resolvedTickets = response.data.filter(ticket => ticket.status === 'Resolved').length;
                const percentage = totalTickets > 0 ? Math.round((resolvedTickets / totalTickets) * 100) : 0;
                setResolvedPercentage(percentage);

            } catch (error) {
                console.error('Error fetching tickets:', error.response?.data || error.message);
            }
        };

        fetchTickets();
    }, []);

    return (
        <div className="analytics-container">
            <h1>Analytics</h1>
            <div className="chart">
                <h2 style={{ fontSize: "24px", color: "#00D907" }}>Missed Chats</h2>
                <div style={{ width: '100%', height: 300 }}>
                    <h2 style={{ color: 'green' }}>Missed Chats</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={missedChatsByWeek}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="chats"
                                stroke="#00FF00"
                                strokeWidth={3}
                                dot={{ stroke: 'black', strokeWidth: 2, fill: 'white' }}
                                activeDot={{ r: 8 }}

                            />
                        </LineChart>
                    </ResponsiveContainer>

                </div>

            </div>
            <div className="content" style={{ display: 'flex', alignItems: 'center', marginTop: '20px', marginLeft: '20px' }}>
                <div className="summary" style={{ flex: "1", width: '647px', height: '100%', gap: '20px', display: 'flex', flexDirection: 'column' }}>


                    <h2 style={{ fontSize: "24px", color: "#00D907" }}>Average Reply Time</h2>
                    <p>For highest customer satisfaction rates you should aim to reply to an incoming customer's message in 15 seconds or less. Quick responses will get you more conversations, help you earn customers trust and make more sales.</p>

                    <h2 style={{ fontSize: "24px", color: "#00D907" }}>Resolved Tickets</h2>
                    <p>A callback system on a website, as well as proactive invitations, help to attract even more customers. A separate round button for ordering a call with a small animation helps to motivate more customers to make calls.</p>
                    <h2 style={{ fontSize: "24px" }}>Total Chats</h2>
                    <p>This metric shows the total number of chats for all channels for the selected period.</p>
                </div>
                <div className="visuals" style={{ flex: "0.3" }}>
                    <div style={{ width: '114px', height: '114px', padding: '10px', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                        <p style={{ fontSize: "25px", fontWeight: "50%", color: "#00D907" }}>{averageResponseTime} min</p> {/* Display average response time */}
                    </div>
                    <div className="circular" style={{ width: '114px', height: '114px', padding: '10px' }}>
                        <CircularProgressbar
                            value={resolvedPercentage}
                            text={`${resolvedPercentage}%`}
                            styles={buildStyles({
                                textColor: '#00D907',
                                pathColor: '#00D907',
                                trailColor: '#d6d6d6',
                            })}
                        />
                    </div>
                    <div style={{ width: '114px', height: '114px', padding: '10px', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                        <p style={{ fontSize: "25px", fontWeight: "50%", color: "#00D907" }}>{totalTickets}</p> {/* Display total tickets */}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Analytics;