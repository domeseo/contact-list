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
function CreateNewContact({ user, setContacts, isVisible, setIsVisible }) {
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
            const newContact = await createContactAPI(user, contact);
            setContacts(prevContacts => [...prevContacts, newContact]);
            setContact({
                name: '',
                phone: '',
                email: '',
                address: ''
            });
            setIsVisible(false);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div style={{ display: isVisible ? 'block' : 'none' }}>
            <form onSubmit={handleSubmit}>
                <div className="card border-primary rounded-0">
                    <div className="card-header p-0">
                        <div className="bg-info text-white text-center py-2">
                            <h3><i className="fa fa-envelope"></i> Create new contact</h3>
                            <p className="m-0">Insert Contact Data</p>
                        </div>
                    </div>
                    <div className="card-body p-3">
                        <button
                            type="button"
                            className="btn btn-sm btn-danger float-right mb-1"
                            onClick={() => setIsVisible(false)}
                        >
                            Close This
                        </button>
                        <div className="form-group">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fa fa-user text-info"></i></div>
                                </div>
                                <input
                                    className="form-control"
                                    placeholder="Contact Name"
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={contact.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fa fa-envelope text-info"></i></div>
                                </div>
                                <input
                                    className="form-control"
                                    placeholder="Insert Email Address"
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={contact.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fa fa-phone text-info"></i></div>
                                </div>
                                <input
                                    className="form-control"
                                    placeholder="Insert Phone Number"
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={contact.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fa fa-home text-info"></i></div>
                                </div>
                                <input
                                    className="form-control"
                                    placeholder="Insert address"
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={contact.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="text-center">
                            <input type="submit" value="Guardar" className="btn btn-info btn-block rounded-0 py-2" />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateNewContact;