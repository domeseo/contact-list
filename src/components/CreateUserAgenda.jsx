import React, { useState } from "react";

export function CreateUser() {
    const [user, setUser] = useState('dome');
    const [userContacts, setUserContacts] = useState({ contacts: [] });
    const [contact, setContact] = useState(null);
    const url = 'https://playground.4geeks.com/contact/agendas/' + user;

    async function fetchUserContacts() {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setUserContacts(data);
            console.log(data);
        } catch (error) {
            console.error("Error al obtener contactos:", error);
        }
    }

    return (
        <>
            <h1>Contactos de {user}</h1>
            <button onClick={fetchUserContacts}>Descargar Contactos</button>
            <div className="contacts-list">
                {userContacts.contacts.length === 0 ? (
                    <p>No hay contactos disponibles</p>
                ) : (
                    userContacts.contacts.map((contact, index) => (
                        <div key={index} className="contact-card">
                            <h3>{contact.full_name}</h3>
                            <p><strong>Email:</strong> {contact.email}</p>
                            <p><strong>Teléfono:</strong> {contact.phone}</p>
                            <p><strong>Dirección:</strong> {contact.address}</p>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}
