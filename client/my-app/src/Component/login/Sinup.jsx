
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';


export default function Sinup() {
    const [visible, setVisible] = useState(false); // ניהול מצב הדיאלוג
    const [name, setName] = useState(''); // ניהול שם מלא
    const [username, setUsername] = useState(''); // ניהול שם משתמש
    const [password, setPassword] = useState(''); // ניהול סיסמה
    const [phone, setPhone] = useState(''); // ניהול טלפון
    const [email, setEmail] = useState(''); // ניהול אימייל
    const [roles, setRoles] = useState('User'); // ניהול תפקיד (ברירת מחדל: User)

 
//     const handleSignUp = () => {
//         // שליחת בקשה לשרת
//        fetch('http://localhost:1111/api/user', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ name, username, password, phone, email, roles }),
// })
//     .then((response) => {
//         console.log('Response:', response);
//         if (!response.ok) {
//             throw new Error(`Failed to sign up: ${response.status} ${response.statusText}`);
//         }
//         return response.json();
//     })
//     .then((data) => {
//         console.log('Sign Up successful:', data);
//         resetFields();
//         setVisible(false);
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//         alert(`Error: ${error.message}`);
//     });
// };
// פונקציה לאיפוס השדות
const resetFields = () => {
    setName('');
    setUsername('');
    setPassword('');
    setPhone('');
    setEmail('');
    setRoles('User');
};

const handleSignUp = () => {
    axios.post('http://localhost:1111/api/auth/register', {
        name,
        username,
        password,
        phone,
        email,
        roles,
    })
    .then((response) => {
        console.log('Sign Up successful:', response.data);
        resetFields(); // איפוס השדות לאחר הצלחה
        setVisible(false); // סגירת הדיאלוג
    })
    .catch((error) => {
        console.error('Error:', error);
        if (error.response) {
            // שגיאה מהשרת
            alert(`Error: ${error.response.data.message}`);
        } else {
            // שגיאה אחרת (לדוגמה, בעיית רשת)
            alert(`Error: ${error.message}`);
        }
    });
   
};
   
    return (
        <div className="card flex justify-content-center">
            <Button label="Sign Up" icon="pi pi-user-plus" onClick={() => setVisible(true)} />
            <Dialog
                header="Sign Up"
                visible={visible}
                modal
                onHide={() => setVisible(false)}
            >
                <div className="flex flex-column px-8 py-5 gap-4">
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="name">Full Name</label>
                        <InputText
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)} // עדכון שם מלא
                            className="w-full"
                        />
                    </div>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="username">Username</label>
                        <InputText
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} // עדכון שם משתמש
                            className="w-full"
                        />
                    </div>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="password">Password</label>
                        <InputText
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // עדכון סיסמה
                            className="w-full"
                        />
                    </div>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="phone">Phone</label>
                        <InputText
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)} // עדכון טלפון
                            className="w-full"
                        />
                    </div>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="email">Email</label>
                        <InputText
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // עדכון אימייל
                            className="w-full"
                        />
                    </div>
                
                    <div className="flex align-items-center gap-2">
                        <Button label="Sign Up" onClick={handleSignUp} />
                        <Button label="Cancel" className="p-button-secondary" onClick={() => setVisible(false)} />
                    </div>
                </div>
            </Dialog>
        </div>
    );
}