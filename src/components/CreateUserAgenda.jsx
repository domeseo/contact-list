import React, { useState } from "react";
import DeleteContact from "./DeleteUser";

export function CreateUser() {
    const [user, setUser] = useState('dome');
    const [contacts, setContacts] = useState([]);
    const url = 'https://playground.4geeks.com/contact/agendas/' + user;

    async function fetchUserContacts() {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setContacts(data.contacts);
            console.log(data);
        } catch (error) {
            console.error("Error al obtener contactos:", error);
        }
    }

    return (
        <>
            <div className="panel">
                <div className="panel-heading">
                    <span className="title">Contactos de <strong>{user.toUpperCase()}</strong>  </span>
                    <button onClick={fetchUserContacts} className="btn btn-primary">
                        <i className="fas fa-sync-alt"></i> Actualizar
                    </button>
                    <button onClick={fetchUserContacts} className="btn btn-primary">
                        <i className="fas fa-sync-alt"></i> New Contact
                    </button>
                </div>

                <div className="contacts-list">
                    {contacts.length === 0 ? (
                        <p className="text-center p-3">No hay contactos disponibles</p>
                    ) : (
                        <ul className="list-group">
                            {contacts.map((contact, index) => (
                                <li key={index} className="list-group-item">
                                    <img
                                        src={`https://i.pravatar.cc/150?img=${index}`}
                                        alt={contact.full_name}
                                        className="img-circle"
                                    />
                                    <div className="contact-info">
                                        <h3 className="name">{contact.full_name}</h3>
                                        <div className="contact-details">
                                            <p className="text-muted">
                                                <i className="fas fa-map-marker-alt"></i> {contact.address}
                                            </p>
                                            <p className="text-muted">
                                                <i className="fas fa-phone"></i> {contact.phone}
                                            </p>
                                            <p className="text-muted">
                                                <i className="fas fa-envelope"></i> {contact.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="contact-actions">
                                        <DeleteContact contact={contact} user={user} setContacts={setContacts} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
}
