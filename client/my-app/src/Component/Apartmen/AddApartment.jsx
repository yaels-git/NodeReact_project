// import React, { useState } from "react";
// import { Button } from 'primereact/button';
// import { Dialog } from 'primereact/dialog';
// import { InputText } from 'primereact/inputtext';
// import axios from 'axios';


// export default function Sinup() {
//     const [visible, setVisible] = useState(false); // ניהול מצב הדיאלוג
//     const [name, setUser] = useState(''); // ניהול שם מלא
//     const [username, setUsername] = useState(''); // ניהול שם משתמש
//     const [password, setPassword] = useState(''); // ניהול סיסמה
//     const [phone, setPhone] = useState(''); // ניהול טלפון
//     const [email, setEmail] = useState(''); // ניהול אימייל
//     const [roles, setRoles] = useState('User'); // ניהול תפקיד (ברירת מחדל: User)

 

// // פונקציה לאיפוס השדות
// const resetFields = () => {
//     setName('');
//     setUsername('');
//     setPassword('');
//     setPhone('');
//     setEmail('');
//     setRoles('User');
// };

// const handleSignUp = () => {
//     axios.post('http://localhost:1111/api/auth/register', {
//         name,
//         username,
//         password,
//         phone,
//         email,
//         roles,
//     })
//     .then((response) => {
//         console.log('Sign Up successful:', response.data);
//         resetFields(); // איפוס השדות לאחר הצלחה
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
//             <Button label="Add Apartment" icon="pi pi-user-plus" onClick={() => setVisible(true)} />
//             <Dialog
//                 header="Add Apartment"
//                 visible={visible}
//                 modal
//                 onHide={() => setVisible(false)}
//             >
//                 <div className="flex flex-column px-8 py-5 gap-4">
//                     <div className="inline-flex flex-column gap-2">
//                         <label htmlFor="name">Full Name</label>
//                         <InputText
//                             id="user"
//                             value={name}
//                             onChange={(e) => setUser(e.target.value)} 
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
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import { useSelector } from "react-redux";

export default function AddApartment() {
    const [visible, setVisible] = useState(false);
    const [city, setCity] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [street, setStreet] = useState('');
    const [building, setBuilding] = useState('');
    const [floor, setFloor] = useState('');
    const [price, setPrice] = useState('');
    const [size, setSize] = useState('');
    const [numOfRooms, setNumOfRooms] = useState('');
    const [airDirections, setAirDirections] = useState('');
    const [description, setDescription] = useState('');
    const [options, setOptions] = useState('');
    const [img, setImg] = useState('');
    // אפשר להוסיף עוד שדות לפי הצורך

    const resetFields = () => {
        setCity('');
        setNeighborhood('');
        setStreet('');
        setBuilding('');
        setFloor('');
        setPrice('');
        setSize('');
        setNumOfRooms('');
        setAirDirections('');
        setDescription('');
        setOptions('');
        setImg('');
    };
    const { token, role, user } = useSelector((state) => state.token);
    const handleAddApartment = () => {
        axios.post('http://localhost:1111/api/apartment', {
            user:user,
            city,
            neighborhood,
            street,
            building,
            floor,
            price,
            size,
            numOfRooms,
            airDirections,
            description,
            options: options.split(','), // במידה ורשימת אפשרויות מופרדת בפסיקים
            img: img ? img.split(',') : [],
        })
        .then((response) => {
            alert('Apartment added!');
            resetFields();
            setVisible(false);
        })
        .catch((error) => {
            alert(error.response?.data?.message || error.message);
        });
    };

    return (
        <div className="card flex justify-content-center">
            <Button label="Add Apartment" icon="pi pi-home" onClick={() => setVisible(true)} />
            <Dialog
                header="Add Apartment"
                visible={visible}
                modal
                onHide={() => setVisible(false)}
            >
                <div className="flex flex-column px-8 py-5 gap-4">
                    <InputText placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                    <InputText placeholder="Neighborhood" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} />
                    <InputText placeholder="Street" value={street} onChange={(e) => setStreet(e.target.value)} />
                    <InputText placeholder="Building" value={building} onChange={(e) => setBuilding(e.target.value)} />
                    <InputText placeholder="Floor" value={floor} onChange={(e) => setFloor(e.target.value)} />
                    <InputText placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <InputText placeholder="Size" value={size} onChange={(e) => setSize(e.target.value)} />
                    <InputText placeholder="Number of rooms" value={numOfRooms} onChange={(e) => setNumOfRooms(e.target.value)} />
                    <InputText placeholder="Air directions (0-4)" value={airDirections} onChange={(e) => setAirDirections(e.target.value)} />
                    <InputText placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <InputText placeholder="Options (comma separated)" value={options} onChange={(e) => setOptions(e.target.value)} />
                    {/* <InputText placeholder="Images (comma separated URLs)" value={img} onChange={(e) => setImg(e.target.value)} /> */}
                    <div className="flex align-items-center gap-2">
                        <Button label="Save" onClick={handleAddApartment} />
                        <Button label="Cancel" className="p-button-secondary" onClick={() => setVisible(false)} />
                    </div>
                </div>
            </Dialog>
        </div>
    );
}