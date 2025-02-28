import React, { useState } from 'react';

// Separamos la función de la API del componente
async function createContactAPI(user, contact) {
    try {
        const response = await fetch('https://playground.4geeks.com/contact/agendas/' + user + '/contacts', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: contact.name || "",
                phone: contact.phone || "",
                email: contact.email || "",
                address: contact.address || ""
            })
        });

        if (!response.ok) {
            throw new Error('Error al crear el contacto');
        }

        return await response.json();
    } catch (error) {
        console.error("Error al crear contacto:", error);
        throw error;
    }
}

// Creamos el componente
function CreateNewContact({ user }) {
    const [contact, setContact] = useState({
        name: '',
        phone: '',
        email: '',
        address: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setContact(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createContactAPI(user, contact);
            // Limpiar el formulario después de crear el contacto
            setContact({
                name: '',
                phone: '',
                email: '',
                address: ''
            });
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nombre Contacto:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={contact.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="phone">Teléfono:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={contact.phone}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={contact.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="address">Dirección:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={contact.address}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Crear Contacto</button>
            </form>
        </>
    );
}

export default CreateNewContact;