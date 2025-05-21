

import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import AddApartment from './AddApartment';
import { useDispatch, useSelector } from 'react-redux';

export default function MyApartment() {
    const [apartments, setApartments] = useState([]);
    const [selectedApartment, setSelectedApartment] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { token, role, user } = useSelector((state) => state.token);

    useEffect(() => {
        axios.get(`http://localhost:1111/api/apartment/${user._id}`)
            .then((response) => setApartments(response.data))
            .catch((error) => console.error('Error fetching apartments:', error));
    }, []);

    // מזהה המשתמש הנוכחי

    // הדפסת userId לבדיקה
    // console.log('userId:', userId);

    // רק הדירות שלך (השווה כמחרוזות למניעת בעיות)
    // const myApartments = apartments.filter(apartment =>
    //     String(apartment.user) === String(userId)
    // );

    // מחיקה
    const handleDelete = async (apartmentId) => {
        try {
            await axios.delete('http://localhost:1111/api/apartment/delete',{
                data: {_id: apartmentId} ,
                headers:{Authorization:`Bearer ${token}`}}
               
                );
            setApartments(apartments.filter(ap => ap._id !== apartmentId));
        } catch (error) {
            alert('מחיקה נכשלה');
        }
    };

    // יצירת קשר (דוגמה בסיסית, אפשר להחליף במייל/טלפון)
    const handleContact = (apartment) => {
        alert(`פרטי קשר:\nאימייל: ${apartment.email || 'לא קיים'}\nטלפון: ${apartment.phone || 'לא קיים'}`);
    };

    return (
        <div className="card flex justify-content-center flex-wrap gap-3">
            <AddApartment />
            {apartments.length === 0 && <p>אין לך דירות להצגה.</p>}
            {apartments.map((apartment) => (
                <Card
                    key={apartment._id}
                    title={`דירה ב${apartment.city}`}
                    subTitle={`שכונה: ${apartment.neighborhood || 'לא צוינה'}, רחוב: ${apartment.street}, מספר: ${apartment.building}`}
                    footer={
                        <div className="flex justify-content-between gap-2">
                            <Button label="הצגת נתונים" icon="pi pi-info"
                                onClick={() => { setSelectedApartment(apartment); setIsModalVisible(true); }} />
                            <Button label="מחיקה" icon="pi pi-trash" severity="danger"
                                onClick={() => handleDelete(apartment._id)} />
                            <Button label="עריכה" icon="pi pi-pencil" severity="info"
                                onClick={() => { /* כאן אפשר להוסיף עריכה */ }} />
                            <Button label="יצירת קשר" icon="pi pi-envelope" severity="success"
                                onClick={() => handleContact(apartment)} />
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
                        <p><strong>תיאור:</strong> {selectedApartment.description}</p>
                    </div>
                )}
            </Dialog>
        </div>
    );
}