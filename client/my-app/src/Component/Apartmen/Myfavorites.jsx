import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import AddApartment from './AddApartment';
import { useDispatch, useSelector } from 'react-redux';
import UpdateApartment from './UpdateApartment';

export default function MyApartment() {
    const [myapartments, setApartments] = useState([]);
    const [apartment, setApartment] = useState();

    const [selectedApartment, setSelectedApartment] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    // const { token, role, user } = useSelector((state) => state.token);
    const [visibleUpdate, setVisibleUpdate] = useState(false);

    const { token, role, user } = useSelector((state) => state.token);
    const getApartments = async () => {
        try {
            const { data } = await axios.get(`http://localhost:1111/api/myapartments/${user._id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )

            setApartments(data);
            console.log(data);
        }
        catch (error) {
            console.error('Error fetching myapartments:', error);
        }
    }


    useEffect(() => {
        if (user._id)
            getApartments();

    }, [])

   
    // מחיקה
    const handleDelete = async (myapartmentId) => {
        console.log('Deleting apartment with ID:', myapartmentId);
        try {
            await axios.delete(`http://localhost:1111/api/myapartments/${myapartmentId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setApartments(myapartments.filter(ap => ap._id !== myapartmentId));
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
            {/* <AddApartment getApartments={getApartments}/> */}
            {/* <UpdateApartment apartment={apartment} visibleUpdate={visibleUpdate} setVisibleUpdate={setVisibleUpdate} getApartments={getApartments} ></UpdateApartment> */}
            {myapartments.length === 0 && <p>אין לך דירות להצגה.</p>}
            {myapartments.map((apartment) => (
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