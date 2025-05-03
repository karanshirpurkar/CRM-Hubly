const URL = import.meta.env.VITE_BACKEND_URL;
const token = localStorage.getItem('token');

export async function Register({firstName, lastName, email, password}) {
    try {
        const res = await fetch(`${URL}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({firstName, lastName, email, password})
        });
        const data = await res.json();
        const status = res.send("User registered successfully");
        return { data, status };
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }   
}

export async function Signin({email, password}) {
    try {
        const res = await fetch(`${URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}` // Include the token here

            },
            body: JSON.stringify({email, password})
        });
        const data = await res.json();
        const status = res.status;
        return { data, status };
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function GetAllUsers() {
    try {
        if (!token) {
            throw new Error("Token is required");
        }

        const res = await fetch(`${URL}/employee/all`, {
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
        throw error;
    }
}

export async function AddMember({name, email, designation}) {
    try {
        if (!token) {
            throw new Error("Token is required");
        }

        const res = await fetch(`${URL}/employee/addmember`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}` // Include the token here
            },
            body: JSON.stringify({name, email, designation})
        });
        const data = await res.json();
        const status = res.status;
        return { data, status };
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}   

export async function Getbyid() {
    try {
        if (!token) {
            throw new Error("Token is required");
        }

        const res = await fetch(`${URL}/employee/update`, {
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
        throw error;
    }
}

export async function Update({firstName,lastName,email,password}) {

try {
        if (!token) {
            throw new Error("Token is required");
        }

        const res = await fetch(`${URL}/employee/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}` // Include the token here
            },
            body: JSON.stringify({name, email, designation})
        });
        const data = await res.json();
        const status = res.status;
        return { data, status };
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}   

export async function UpdateMember(updatedUserData) {
    try {
        if (!token) {
            throw new Error("Token is required");
        }

        const res = await fetch(`${URL}/employee/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}` // Include the token here
            },
            body: JSON.stringify({updatedUserData})
        });
        const data = await res.json();
        const status = res.status;
        return { data, status };
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}