import React, { useEffect, useState } from 'react';
import { GetAllUsers } from '../../service/services';
import One from '../../assets/images/dashboard/profile1.png';
import Two from '../../assets/images/dashboard/profile2.png';
import Three from '../../assets/images/dashboard/profile3.png';
import Four from '../../assets/images/dashboard/profile4.png';
import Edit from '../../assets/images/dashboard/edit.png';
import Delete from '../../assets/images/dashboard/delete.png';
import Plus from '../../assets/images/dashboard/plus.svg';
import './AddMember.css';
import { AddMember as addmember } from '../../service/services'; // Adjust the import path as needed

function AddMember() {
    const [users, setUsers] = useState([]);
    const images = [One, Two, Three, Four];
    const [addbutton, setAddButton] = useState(false);

    const [members, setMembers] = useState({
        name: '',
        email: '',
        designation: ''
      });

    const handleChange = async(e) => {
        setMembers({
            ...members,[e.target.name]: e.target.value});
 
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(members);
        if (members.name === '' || members.email === '' || members.designation === '') {
            alert('Please fill in all fields');
            return;
        }
        
        const res = await addmember(members)
        alert(res.data.message)
        setAddButton(false);
        setMembers({
            name: '',
            email: '',
            designation: ''
        });
        const response = await GetAllUsers();
        setUsers(response.data);

    }


    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    };

    const handleAddButtonClick = () => {
        setAddButton(true);

    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await GetAllUsers();
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="table-container">
            <h1>Teams</h1>
            <table className="my-table">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td  className="name-cell">
                                <img src={getRandomImage()} alt="Profile" className="profile-img" />
                                {user.firstName} {user.lastName}
                            </td>
                            <td>{user.phone || "+1 (000) 000-0000"}</td>
                            <td>{user.email}</td>
                            <td>{user.designation}</td>
                            <td className="action-icons">
                                {user.designation === "Member" && (
                                    <>
                                        <img src={Edit} alt="Edit" />
                                        <img src={Delete} alt="Delete" />
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
                <button className="add-member-button" onClick={handleAddButtonClick}><img src={Plus} alt="plus" />  Add Team Member</button>
                {addbutton && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>Add Team members</h2>
      <p>
        Talk with colleagues in a group chat. Messages in this group are only visible to its
        participants. New teammates may only be invited by the administrators.
      </p>
      <form>
        <label>User name</label>
        <input type="text" placeholder="User name" name='name' value={members.name} onChange={handleChange}  />

        <label>Email ID</label>
        <input type="email" placeholder="Email ID" name='email' value={members.email} onChange={handleChange}  />

        <label>Designation</label>
        <select onChange={handleChange} name='designation' value={members.designation}> 
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Member">Member</option>
        </select>

        <div className="form-buttons">
          <button type="button" className="cancel-btn" onClick={() => setAddButton(false)}>
            Cancel
          </button>
          <button onClick={handleSubmit} type="submit" className="save-btn">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
)}

        </div>);
}

export default AddMember;
