
import React, { useState, useEffect } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import { useSelector } from "react-redux";
import MyApartment from "./MyApartment";

export default function UpdateApartment({ apartment, onClose, visibleUpdate, setVisibleUpdate ,getApartments}) {
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

  
  const handleUpdateApartment = () => {

    axios.put(
      "http://localhost:1111/api/apartment",
      {
        _id: apartment._id,
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
        headers: { Authorization: `Bearer ${token}` }
      }

    )
      .then((response) => {
        getApartments()
        setVisibleUpdate(false)
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
        visible={visibleUpdate}
        modal
        onHide={() => (setVisibleUpdate(false))}
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
            <Button label="שמור" onClick={() => handleUpdateApartment()} />
            <Button label="ביטול" className="p-button-secondary" onClick={() => setVisibleUpdate(false)} />
          </div>
        </div>
      </Dialog>

    </div>
  );

}
