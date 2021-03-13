import React, { useState } from 'react';
import './App.css';

import VerticalDragList from './components/vertical-dnd.component';

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const [contacts, setContacts] = useState([]);

  function validatePhoneNumber(phone) {
    if (phone.length != 14) {
      if (phone.replace( /^\D+/g, '').length != 10) {
        setError("Please enter the correct phone number.")
      } else {
        setError("Please enter the phone number in the correct format-(xxx) xxx-xxxx.")
      }
      return false;
    } else {
      return true;
    }
  } 
  const savePhone = () => {
    if (validatePhoneNumber(phoneNumber)) {
      setContacts([
        {
          phoneNumber,
          name,
          id: `task-${contacts.length + 1}`
        },
        ...contacts,
      ]);
    }
  }

  return (
    <div className="App">
      <div className="title-area">
        <h1>Contact List</h1>
      </div>
      <div className="input-area">
        <p className="red-error">{error}</p>
        <div className="form-control">
          <span className="item-title">Person Name: </span>
          <input type="text" value={name} placeholder="Enter the Name" className="info-input" onChange={(e) => setName(e.target.value)}></input>
        </div>
        <div className="form-control">
          <span className="item-title">Phone Number: </span>
          <input type="phone" value={phoneNumber} placeholder="(xxx) xxx-xxxx" className="info-input" onChange={(e) => setPhoneNumber(e.target.value)}></input>
        </div>
        <div className="form-control btn-item">
          <button className="saveBtn" onClick={savePhone}>Add Contact</button>
        </div>
      </div>
      <div className="list-area">
        <VerticalDragList list={contacts}/>
      </div>
    </div>
  );
}

export default App;