// // import React from 'react'; 
// // import { Card } from 'primereact/card';
// // import { Button } from 'primereact/button';

// // export default function CardApartmen() {
// //     const header = (
// //         <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
// //     );
// //     const footer = (
// //         <>
// //             <Button label="Save" icon="pi pi-check" />
// //             <Button label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} />
// //         </>
// //     );

// //     return (
// //         <div className="card flex justify-content-center">
// //             <Card title="Advanced Card" subTitle="Card subtitle" footer={footer} header={header} className="md:w-25rem">
// //                 <p className="m-0">
// //                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
// //                     numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
// //                 </p>
// //             </Card>
// //         </div>
// //     )
// // }
// import React, { useState, useEffect } from 'react';
// import { Card } from 'primereact/card';
// import { Button } from 'primereact/button';
// import axios from 'axios';

// export default function CardApartmen() {
//     const [apartments, setApartments] = useState([]); // State לאחסון רשימת הדירות

//     // שליפת נתונים מהשרת
//     useEffect(() => {
//         axios.get('http://localhost:1111/api/apartment') // עדכן את ה-URL לנתיב הנכון בשרת שלך
//             .then((response) => {
//                 setApartments(response.data); // שמירת הנתונים ב-State
//             })
//             .catch((error) => {
//                 console.error('Error fetching apartments:', error);
//             });
//     }, []);

//     return (
//         <div className="card flex justify-content-center flex-wrap gap-3">
//             {apartments.map((apartment) => (
//                 <Card
//                     key={apartment.id} // ודא שלכל דירה יש מזהה ייחודי
//                     title={apartment.title}
//                     subTitle={apartment.location}
//                     footer={
//                         <>
//                             <Button label="Details" icon="pi pi-info" />
//                             <Button label="Contact" severity="secondary" icon="pi pi-envelope" style={{ marginLeft: '0.5em' }} />
//                         </>
//                     }
//                     header={<img alt="Apartment" src={apartment.image} />}
//                     className="md:w-25rem"
//                 >
//                     <p className="m-0">{apartment.description}</p>
//                 </Card>
//             ))}
//         </div>
//     );
// }
import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import axios from 'axios';
import { Dialog } from 'primereact/dialog'; // ייבוא המודאל

export default function CardApartmen
() {
    const [apartments, setApartments] = useState([]); // State לאחסון רשימת הדירות
    const [selectedApartment, setSelectedApartment] = useState(null); // דירה שנבחרה
    const [isModalVisible, setIsModalVisible] = useState(false); // ניהול הצגת המודאל
    // שליפת נתונים מהשרת
    useEffect(() => {
        axios.get('http://localhost:1111/api/apartment')
            .then((response) => {
                console.log('Data fetched:', response.data); // בדוק אם הנתונים נשלפים
                setApartments(response.data);
            })
            .catch((error) => {
                console.error('Error fetching apartments:', error);
            });
    }, []);

    return (
        <div className="card flex justify-content-center flex-wrap gap-3">
            {apartments.map((apartment) => (
                
                <Card
                    key={apartment._id} // ודא שלכל דירה יש מזהה ייחודי
                    title={`דירה ב${apartment.city}`}
                    subTitle={`שכונה: ${apartment.neighborhood || 'לא צוינה'}, רחוב: ${apartment.street}, מספר: ${apartment.building}`}
                    footer={
                        <div className="flex justify-content-between">
                           <Button 
                             label="הצגת נתונים" 
                                icon="pi pi-info" 
                                onClick={() => {
        setSelectedApartment(apartment); // שמירת הדירה שנבחרה
        setIsModalVisible(true); // הצגת המודאל
    }} 
/>
                            <Button 
                                label="יצירת קשר" 
                                severity="secondary" 
                                icon="pi pi-envelope" 
                                onClick={() => alert(`צור קשר עם המשתמש: ${apartment.user}`)} 
                            />
                        </div>
                    }
                   
                    className="md:w-25rem"
                >
                    
                </Card>
            ))}
     
            {/* מודאל להצגת פרטי הדירה */}
            <Dialog 
                header={`פרטי דירה ב${selectedApartment?.city || ''}`} 
                visible={isModalVisible} 
                style={{ width: '50vw' }} 
                onHide={() => setIsModalVisible(false)}
            >
                {selectedApartment && (
                    <div>
                        <p><strong>שכונה:</strong> {selectedApartment.neighborhood || 'לא צוינה'}</p>
                        <p><strong>רחוב:</strong> {selectedApartment.street}, מספר: {selectedApartment.building}</p>
                        <p><strong>מחיר:</strong> {selectedApartment.price} ₪</p>
                        <p><strong>גודל:</strong> {selectedApartment.size} מ"ר</p>
                        <p><strong>מספר חדרים:</strong> {selectedApartment.numOfRooms}</p>
                        <p><strong>כיווני אוויר:</strong> {selectedApartment.airDirections}</p>
                        <p><strong>אפשרויות נוספות:</strong> {selectedApartment.options.join(', ')}</p>
                        <p><strong>תיאור:</strong> {selectedApartment.discreption}</p>
                    </div>
                )}
            </Dialog>
        </div>
    );
}