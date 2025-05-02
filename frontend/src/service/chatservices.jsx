const URL = import.meta.env.VITE_BACKEND_URL;
const token = localStorage.getItem('token');


export async function Createchat({ name, email, phone, chats }) {
  try {
    const res = await fetch(`${URL}/ticket/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, phone, chats })
    });
    const data = await res.json();
    const status = res.status;
    return { data, status };
  } catch (error) {
    console.error('Error:', error);
  }}

  export async function Updatechat({ ticketId, userMessage }) {
    try {
      const token = localStorage.getItem('token');
      console.log("userMessage update", userMessage)


      const res = await fetch(`${URL}/ticket/${ticketId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`// Include the token here

        },
        body: JSON.stringify({ userMessage })
      });
      const data = await res.json();
      const status = res.status;
      return { data, status };
    } catch (error) {
      console.error('Error:', error);
    }
  }

export async function GetChat(ticketId) {
  try {
    const token = localStorage.getItem('token');

    if (!ticketId) {
        throw new Error("Ticket ID is required");
      }
      if (!token) {
        throw new Error("Token is required");
      }
    
    console.log('Fetching chat history for ticket ID:', ticketId); 
    console.log('Token:', token); // Log the token to check if it's being set correctly
    const res = await fetch(`${URL}/ticket/${ticketId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`// Include the token here
      }
    });
    const data = await res.json();
    const status = res.status;
    return { data, status };
  } catch (error) {
    console.error('Error:', error);
  }
};

export async function GetAllChats() {
  try {
    const res = await fetch(`${URL}/ticket/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}` // Include the token here

      }
    });
    const data = await res.json();
    const status = res.status;
    return { data, status };
  } catch (error) {
    console.error('Error:', error);
  }
}
//for employees

export async function Assigned({ticketId,MemberId}) {
  try {
    if(!MemberId){
      throw new Error("Member ID is required");
    }
    const res = await fetch(`${URL}/update/reassign/${ticketId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`// Include the token here
      },
    body: JSON.stringify({MemberId })

    });
    const data = await res.json();
    const status = res.status;
    return { data, status };
  } catch (error) {
    console.error('Error:', error);
  }
};

export async function UpdateStatus({ ticketId, T_status }) {
  try {
    if (!ticketId) {
      throw new Error("Ticket ID is required");
    }
    if (!T_status) {
      throw new Error("Status is required");
    }
    console.log("status", T_status);
    const res = await fetch(`${URL}/update/${ticketId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify({ T_status })
    });
    const data = await res.json();
    const status = res.status;
    return { data, status };
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function allTickets() {
  try {
    const res = await fetch(`${URL}/update/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}` // Include the token here
      }
    });
    const data = await res.json();
    const status = res.status;
    return { data, status };
  } catch (error) {
    console.error('Error:', error);
  }
} 