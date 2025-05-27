import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Dialog } from 'primereact/dialog';


export default function UnconfirmedApartments() {
    const [apartments, setApartments] = useState([]);
    const [owner, setOwner] = useState(null);
    const [visible, setVisible] = useState(false);

    const { token, role, user } = useSelector((state) => state.token);
 
    useEffect(() => {
        axios.get('http://localhost:1111/api/apartment/nc')
            .then((response) => {
                console.log('Data fetched:', response.data); // בדוק אם הנתונים נשלפים
                setApartments(response.data);
            })
            .catch((error) => {
                console.error('Error fetching apartments:', error);
            });
    }, []);
    //אישור דירה
    const permition = async (rowData) => {
        try {
          await axios.post('http://localhost:1111/api/apartment/login', {
                _id: rowData._id
            },
       {headers: { Authorization: `Bearer ${token}` }
    });
            alert("הדירה אושרה בהצלחה");
            setApartments(prev => prev.filter(a => a._id !== rowData._id));

        } catch (error) {
            alert("אירעה שגיאה באישור הדירה");
        }
    };
    // פונקציה שמביאה את פרטי בעל הדירה
    const showOwnerDetails = async (rowData) => {
        try {
            const res = await axios.get(`http://localhost:1111/api/users/${rowData.user}`);
            setOwner(res.data);
            setVisible(true);
        } catch (error) {
            alert('לא נמצאו פרטי בעל הדירה');
        }
    };
    const ownerButtonTemplate = (rowData) => (
        <Button 
            label="פרטי בעל הדירה" 
            icon="pi pi-user" 
            onClick={() => showOwnerDetails(rowData)} 
            className="p-button-info"
        />
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => permition(rowData)} />
                
            </React.Fragment>
        );
    };

    // דוגמת עמודות (להתאים למה שיש במודל שלך)
    return (
        <div className="card">
            <DataTable value={apartments} tableStyle={{ minWidth: '60rem' }}>

                <Column field="city" header="עיר"></Column>
                <Column field="street" header="רחוב"></Column>
                <Column field="price" header="מחיר"></Column>
                <Column field="numOfRooms" header="חדרים"></Column>
                <Column field="size" header="גודל"></Column>
                
                <Column header="בעל הדירה" body={ownerButtonTemplate} />
                <Column  body={actionBodyTemplate} exportable={false}  header="לאישור"></Column>
           

            {/* Dialog להצגת פרטי בעל הדירה */}
            <Dialog >
                {owner ? (
                    <div>
                        <p><b>שם:</b> {owner.name}</p>
                        <p><b>אימייל:</b> {owner.email}</p>
                        {/* הוספת פרטים נוספים לפי הצורך */}
                    </div>
                ) : (
                    <p>לא נמצאו פרטים</p>
                )}
            </Dialog>
           </DataTable>
        </div>
    );}