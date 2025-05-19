// import React, { useState, useEffect } from 'react';
// import { Card } from 'primereact/card';
// import { Button } from 'primereact/button';
// import axios from 'axios';
// import { Dialog } from 'primereact/dialog'; // ייבוא המודאל

// export default function MyApartment
// () {
//     const [apartments, setApartments] = useState([]); // State לאחסון רשימת הדירות
//     const [selectedApartment, setSelectedApartment] = useState(null); // דירה שנבחרה
//     const [isModalVisible, setIsModalVisible] = useState(false); // ניהול הצגת המודאל
//     // שליפת נתונים מהשרת
//     useEffect(() => {
//         axios.get('http://localhost:1111/api/apartment')
//             .then((response) => {
//                 console.log('Data fetched:', response.data); // בדוק אם הנתונים נשלפים
//                 setApartments(response.data);
//             })
//             .catch((error) => {
//                 console.error('Error fetching apartments:', error);
//             });
//     }, []);

//     return (
//         <div className="card flex justify-content-center flex-wrap gap-3">
//             {apartments.map((apartment) => (
                
//                 <Card
//                     key={apartment._id} // ודא שלכל דירה יש מזהה ייחודי
//                     title={`דירה ב${apartment.city}`}
//                     subTitle={`שכונה: ${apartment.neighborhood || 'לא צוינה'}, רחוב: ${apartment.street}, מספר: ${apartment.building}`}
//                     footer={
//                         <div className="flex justify-content-between">
//                            <Button 
//                              label="הצגת נתונים" 
//                                 icon="pi pi-info" 
//                                 onClick={() => {
//         setSelectedApartment(apartment); // שמירת הדירה שנבחרה
//         setIsModalVisible(true); // הצגת המודאל
//     }} 
// />
//                             <Button 
//                                 label="יצירת קשר" 
//                                 severity="secondary" 
//                                 icon="pi pi-envelope" 
//                                 onClick={() => alert(`צור קשר עם המשתמש: ${apartment.user}`)} 
//                             />
//                         </div>
//                     }
                   
//                     className="md:w-25rem"
//                 >
                    
//                 </Card>
//             ))}
     
//             {/* מודאל להצגת פרטי הדירה */}
//             <Dialog 
//                 header={`פרטי דירה ב${selectedApartment?.city || ''}`} 
//                 visible={isModalVisible} 
//                 style={{ width: '50vw' }} 
//                 onHide={() => setIsModalVisible(false)}
//             >
//                 {selectedApartment && (
//                     <div>
//                         <p><strong>שכונה:</strong> {selectedApartment.neighborhood || 'לא צוינה'}</p>
//                         <p><strong>רחוב:</strong> {selectedApartment.street}, מספר: {selectedApartment.building}</p>
//                         <p><strong>מחיר:</strong> {selectedApartment.price} ₪</p>
//                         <p><strong>גודל:</strong> {selectedApartment.size} מ"ר</p>
//                         <p><strong>מספר חדרים:</strong> {selectedApartment.numOfRooms}</p>
//                         <p><strong>כיווני אוויר:</strong> {selectedApartment.airDirections}</p>
//                         <p><strong>אפשרויות נוספות:</strong> {selectedApartment.options.join(', ')}</p>
//                         <p><strong>תיאור:</strong> {selectedApartment.discreption}</p>
//                     </div>
//                 )}
//             </Dialog>
//         </div>
//     );
// }
import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';

export default function MyApartment() {
    const [apartments, setApartments] = useState([]);
    const [selectedApartment, setSelectedApartment] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // שליפת כל הדירות
    useEffect(() => {
        axios.get('http://localhost:1111/api/apartment')
            .then((response) => setApartments(response.data))
            .catch((error) => console.error('Error fetching apartments:', error));
    }, []);

    // מזהה המשתמש הנוכחי
    const userId = localStorage.getItem('userId');

    // רק הדירות שלך
    const myApartments = apartments.filter(apartment => apartment.user === userId);

    // מחיקה
    const handleDelete = async (apartmentId) => {
        try {
            await axios.delete(`http://localhost:1111/api/apartment/${apartmentId}`);
            setApartments(apartments.filter(ap => ap._id !== apartmentId));
        } catch (error) {
            alert('מחיקה נכשלה');
        }
    };

    return (
        
        <div className="card flex justify-content-center flex-wrap gap-3">
            {myApartments.map((apartment) => (
                <Card
                    key={apartment._id}
                    title={`דירה ב${apartment.city}`}
                    subTitle={`שכונה: ${apartment.neighborhood || 'לא צוינה'}, רחוב: ${apartment.street}, מספר: ${apartment.building}`}
                    footer={
                        <div className="flex justify-content-between">
                            <Button label="הצגת נתונים" icon="pi pi-info"
                                onClick={() => { setSelectedApartment(apartment); setIsModalVisible(true); }} />
                            <Button label="מחיקה" icon="pi pi-trash" severity="danger"
                                onClick={() => handleDelete(apartment._id)} />
                            <Button label="עריכה" icon="pi pi-pencil" severity="info"
                                onClick={() => { /* כאן תממש פתיחת מודאל או מעבר לעמוד עריכה */ }} />
                        </div>
                    }
                    className="md:w-25rem"
                />
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