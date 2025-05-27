import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import axios from 'axios';
import { Dialog } from 'primereact/dialog'; // ייבוא המודאל
import { useSelector } from "react-redux";

export default function CardApartmen
    () {
    const [apartments, setApartments] = useState([]); // State לאחסון רשימת הדירות
    const [myApartments, setMyApartments] = useState([]); // State לאחסון רשימת הדירות

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
    const handleDelete = async (apartmentId) => {
        try {
            await axios.delete('http://localhost:1111/api/apartment/delete', {
                data: { _id: apartmentId },
                headers: { Authorization: `Bearer ${token}` }
            }

            );
            setApartments(apartments.filter(ap => ap._id !== apartmentId));
        } catch (error) {
            alert('מחיקה נכשלה');
        }
    };

 const { token, role, user } = useSelector((state) => state.token);

// const createMyApartment = async (apartment) => { 
//     try {
//         const response = await axios.post('http://localhost:1111/api/myapartments',{     
//             user: user._id, // החלף ב-ID של המשתמש הנוכחי    
//             apartment: apartment._id // החלף ב-ID של הדירה שנבחרה
//         },{headers:{Authorization:`Bearer ${token}`}});
        
//         console.log('MyApartment created:', response.data);
//     } catch (error) {   
//         if(error.response && error.response.status === 401) {
//             alert('דירה זו כבר קיימת ברשימת הדירות שלך.'); // הודעה למשתמש במקרה של שגיאה 401
//         console.error('Error creating MyApartment:', error);
//     }   
// }}
    return (
        <div className="card flex justify-content-center flex-wrap gap-3">
            {console.log("jjjjjjjjjjjjjj")
            }
            {apartments.map((apartment) => (
                <Card
            
                    key={apartment._id} // ודא שלכל דירה יש מזהה ייחודי
                    title={`דירה ב${apartment.city}`}
                    subTitle={`שכונה: ${apartment.neighborhood || 'לא צוינה'}, רחוב: ${apartment.street}, מספר: ${apartment.building}`}
                    footer={
                        <div className="flex justify-content-between">
                           <Button label="מחיקה" icon="pi pi-trash" severity="danger"
                                onClick={() => handleDelete(apartment._id)} />
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
                        <p><strong>תיאור:</strong> {selectedApartment.description}</p>
                    </div>
                )}
            </Dialog>
        </div>
    );
}