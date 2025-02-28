import React, { useState } from "react";

function GetContact() {
    const [contact, setContact] = useState({});

    const url = 'https://playground.4geeks.com/contact/agendas?offset=0&limit=10';

    async function getUserContact() {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setContact(data);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    }

    return (
        <>
            <h1>Lista de Agendas</h1>
            <button onClick={getUserContact}>Cargar Agendas</button>
            {contact && (
                <div className="contact-list">
                    {Array.isArray(contact.agendas) && contact.agendas.map((item) => (
                        <div key={item.id} className="contact-card">
                            <h3>Agenda #{item.id}</h3>
                            <p><strong>Slug:</strong> {item.slug}</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default GetContact; 