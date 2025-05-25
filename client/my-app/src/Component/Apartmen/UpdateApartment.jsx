// import React, { useState } from "react";
// import { Button } from 'primereact/button';
// import { Dialog } from 'primereact/dialog';
// import { InputText } from 'primereact/inputtext';
// import axios from 'axios';


// export default function UpdateApartment() {
//     const [visible, setVisible] = useState(false); // ניהול מצב הדיאלוג
//     const [name, setName] = useState(''); // ניהול שם מלא
//     const [username, setUsername] = useState(''); // ניהול שם משתמש
//     const [password, setPassword] = useState(''); // ניהול סיסמה
//     const [phone, setPhone] = useState(''); // ניהול טלפון
//     const [email, setEmail] = useState(''); // ניהול אימייל
//     const [roles, setRoles] = useState('User'); // ניהול תפקיד (ברירת מחדל: User)





// const handleSignUp = () => {
//     axios.put('http://localhost:1111/api/auth/register', {
//         name,
//         username,
//         password,
//         phone,
//         email,
//         roles,
//     })
//     .then((response) => {
//         console.log('Sign Up successful:', response.data);

//         setVisible(false); // סגירת הדיאלוג
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//         if (error.response) {
//             // שגיאה מהשרת
//             alert(`Error: ${error.response.data.message}`);
//         } else {
//             // שגיאה אחרת (לדוגמה, בעיית רשת)
//             alert(`Error: ${error.message}`);
//         }
//     });

// };

//     return (
//         <div className="card flex justify-content-center">
//             <Button label="Sign Up" icon="pi pi-user-plus" onClick={() => setVisible(true)} />
//             <Dialog
//                 header="Sign Up"
//                 visible={visible}
//                 modal
//                 onHide={() => setVisible(false)}
//             >
//                 <div className="flex flex-column px-8 py-5 gap-4">
//                     <div className="inline-flex flex-column gap-2">
//                         <label htmlFor="name">Full Name</label>
//                         <InputText
//                             id="name"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)} // עדכון שם מלא
//                             className="w-full"
//                         />
//                     </div>
//                     <div className="inline-flex flex-column gap-2">
//                         <label htmlFor="username">Username</label>
//                         <InputText
//                             id="username"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)} // עדכון שם משתמש
//                             className="w-full"
//                         />
//                     </div>
//                     <div className="inline-flex flex-column gap-2">
//                         <label htmlFor="password">Password</label>
//                         <InputText
//                             id="password"
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)} // עדכון סיסמה
//                             className="w-full"
//                         />
//                     </div>
//                     <div className="inline-flex flex-column gap-2">
//                         <label htmlFor="phone">Phone</label>
//                         <InputText
//                             id="phone"
//                             value={phone}
//                             onChange={(e) => setPhone(e.target.value)} // עדכון טלפון
//                             className="w-full"
//                         />
//                     </div>
//                     <div className="inline-flex flex-column gap-2">
//                         <label htmlFor="email">Email</label>
//                         <InputText
//                             id="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)} // עדכון אימייל
//                             className="w-full"
//                         />
//                     </div>

//                     <div className="flex align-items-center gap-2">
//                         <Button label="Sign Up" onClick={handleSignUp} />
//                         <Button label="Cancel" className="p-button-secondary" onClick={() => setVisible(false)} />
//                     </div>
//                 </div>
//             </Dialog>
//         </div>
//     );
// }
import React, { useState, useEffect } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';

export default function UpdateApartment({ apartment, onClose }) {
    const [city, setCity] = useState('');
const [street, setStreet] = useState('');
// const [building, setBuilding] = useState('');
// const [neighborhood, setNeighborhood] = useState('');
const [price, setPrice] = useState('');
const [size, setSize] = useState('');
const [numOfRooms, setNumOfRooms] = useState('');
const [airDirections, setAirDirections] = useState('');
const [options, setOptions] = useState('');      // אם זה מערך: useState([])
const [description, setDescription] = useState('');
// const [email, setEmail] = useState('');
// const [phone, setPhone] = useState('');
    // כשמגיעה דירה לעריכה – עדכן את השדות
    const { token, role, user } = useSelector((state) => state.token);
    useEffect(() => {
        if (apartment) {
            setCity(apartment.city || '');
    setStreet(apartment.street || '');
    // setBuilding(apartment.building || '');
    // setNeighborhood(apartment.neighborhood || '');
    setPrice(apartment.price || '');
    setSize(apartment.size || '');
    setNumOfRooms(apartment.numOfRooms || '');
    setAirDirections(apartment.airDirections || '');
    setOptions(apartment.options ? apartment.options.join(', ') : '');
    setDescription(apartment.description || '');
        }
    }, [apartment]);

    axios.put(
        "http://localhost:1111/api/apartment/",
        {
          user: user,
          city,
          street,
          price,
          description,
          options,
          airDirections,
          numOfRooms,
          size
        },
        {
            headers:{Authorization:`Bearer ${token}`}
        }
      )
      .then((response) => {
        // טיפול בתגובה מוצלחת
        console.log("Updated successfully:", response.data);
      })
      .catch((error) => {
        // טיפול בשגיאה
        console.error("Error updating apartment:", error);
      });
    }
    return (
        <div>
          <Dialog
            header="עריכת דירה"
            visible={true}
            modal
            onHide={onClose}
          >
            <div className="flex flex-column gap-3">
              <label>עיר</label>
              <InputText value={city} onChange={e => setCity(e.target.value)} />
    
              <label>רחוב</label>
              <InputText value={street} onChange={e => setStreet(e.target.value)} />
    
              <label>מחיר</label>
              <InputText value={price} onChange={e => setPrice(e.target.value)} />
    
              <label>גודל</label>
              <InputText value={size} onChange={e => setSize(e.target.value)} />
    
              <label>מספר חדרים</label>
              <InputText value={numOfRooms} onChange={e => setNumOfRooms(e.target.value)} />
    
              <label>כיווני אוויר</label>
              <InputText value={airDirections} onChange={e => setAirDirections(e.target.value)} />
    
              <label>אפשרויות נוספות</label>
              <InputText value={options} onChange={e => setOptions(e.target.value)} />
    
              <label>תיאור</label>
              <InputText value={description} onChange={e => setDescription(e.target.value)} />
    
              <div className="flex gap-2">
                <Button label="שמור" onClick={handleUpdate} />
                <Button label="ביטול" className="p-button-secondary" onClick={onClose} />
              </div>
            </div>
          </Dialog>
        </div>
      );
    
