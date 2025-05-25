// // import React from 'react'; 
// // import { Divider } from 'primereact/divider';
// // import { InputText } from 'primereact/inputtext';
// // import { Button } from 'primereact/button';

// // export default function LoginDemo() {



// //     return (
// //         <div className="card">
// //             <div className="flex flex-column md:flex-row">
// //                 <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
// //                     <div className="flex flex-wrap justify-content-center align-items-center gap-2">
// //                         <label className="w-6rem">Username</label>
// //                         <InputText id="username" type="text" className="w-12rem" />
// //                     </div>
// //                     <div className="flex flex-wrap justify-content-center align-items-center gap-2">
// //                         <label className="w-6rem">Password</label>
// //                         <InputText id="password" type="password" className="w-12rem" />
// //                     </div>
// //                     <Button label="Login" icon="pi pi-user" className="w-10rem mx-auto"></Button>
// //                 </div>
// //                 <div className="w-full md:w-2">
// //                     <Divider layout="vertical" className="hidden md:flex">
// //                         <b>OR</b>
// //                     </Divider>
// //                     <Divider layout="horizontal" className="flex md:hidden" align="center">
// //                         <b>OR</b>
// //                     </Divider>
// //                 </div>
// //                 <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
// //                     <Button label="Sign Up" icon="pi pi-user-plus" severity="success" className="w-10rem"></Button>
// //                 </div>
// //             </div>
// //         </div>
// //     )
// // }
// import React, { useState } from 'react';
// import { Divider } from 'primereact/divider';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import Sinup from './Sinup';

// export default function LoginDemo() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const handleLogin = () => {
//         // שליחת בקשה לשרת
//         fetch('http://localhost:5000/api/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ username, password }),
//         })
//             // .then((response) => response.json())
//             // .then((data) => {
//             //     console.log('Login successful:', data);
//             // })
//             // .catch((error) => {
//             //     console.error('Error:', error);
//             // });
//     };

//     return (
//         <div className="card">
//             <div className="flex flex-column md:flex-row">
//                 <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
//                     <div className="flex flex-wrap justify-content-center align-items-center gap-2">
//                         <label className="w-6rem">Username</label>
//                         <InputText
//                             id="username"
//                             type="text"
//                             className="w-12rem"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                         />
//                     </div>
//                     <div className="flex flex-wrap justify-content-center align-items-center gap-2">
//                         <label className="w-6rem">Password</label>
//                         <InputText
//                             id="password"
//                             type="password"
//                             className="w-12rem"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>
//                     <Button
//                         label="Login"
//                         icon="pi pi-user"
//                         className="w-10rem mx-auto"
//                         onClick={handleLogin}
//                     ></Button>
//                 </div>
//                 <div className="w-full md:w-2">
//                     <Divider layout="vertical" className="hidden md:flex">
//                         <b>OR</b>
//                     </Divider>
//                     <Divider layout="horizontal" className="flex md:hidden" align="center">
//                         <b>OR</b>
//                     </Divider>
//                 </div>
//                 <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
//                     <Button label="Sign Up" icon="pi pi-user-plus" severity="success" className="w-10rem"onClick={Sinup}> </Button>
//                 </div>
//             </div>
//         </div>
//     );
// }
import React, { useState } from 'react';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Sinup from './Sinup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ייבוא useNavigate
import { useDispatch,useSelector } from 'react-redux';
import { setToken, setUser,setRole } from '../../redux/tokenSlice';

export default function LoginDemo() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const [showCardApartmen, setShowCardApartmen] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false); // ניהול הצגת קומפוננטת ההרשמה
    const navigate = useNavigate(); // יצירת פונקציה לניווט
    const handleLogin = () => {
        // שליחת בקשה לשרת
       axios.post('http://localhost:1111/api/auth/login', {

            username, password
        })
            .then((response) => {
                dispatch(setUser(response.data.user));
                dispatch(setRole(response.data.role));
                dispatch(setToken(response.data.accessToken));
                // localStorage.setItem('token', response.data.accessToken); // שמירת טוקן הגישה ב-localStorage
                console.log('Token:', response.data.accessToken);
            //    setShowCardApartmen(true); // הצגת קומפוננטת כרטיס הדירה
                 navigate('/cardApartmen'); // ניווט לדף הבית לאחר התחברות מוצלחת
                
                 if (!response.ok) {
                    throw new Error('Invalid credentials');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Login successful:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="card">
            <div className="flex flex-column md:flex-row">
                <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">Username</label>
                        <InputText
                            id="username"
                            type="text"
                            className="w-12rem"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">Password</label>
                        <InputText
                            id="password"
                            type="password"
                            className="w-12rem"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button
                        label="Login"
                        icon="pi pi-user"
                        className="w-10rem mx-auto"
                        onClick={handleLogin}
                    ></Button>
                </div>
                <div className="w-full md:w-2">
                    <Divider layout="vertical" className="hidden md:flex">
                        <b>OR</b>
                    </Divider>
                    <Divider layout="horizontal" className="flex md:hidden" align="center">
                        <b>OR</b>
                    </Divider>
                </div>
                <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
                    {/* <Button
                        label="Sign Up"
                        icon="pi pi-user-plus"
                        severity="success"
                        className="w-10rem"
                        onClick={() => setShowSignUp(true)} // הצגת קומפוננטת ההרשמה
                    ></Button> */}
                    <Sinup />
                </div>
            </div>
            {/* הצגת קומפוננטת ההרשמה */}
        </div>
    );
}