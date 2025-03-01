import React from "react";

const DeleteContact = ({ contact, user, setContacts }) => {
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/${user}/contacts/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
                alert("Contacto Borrado");
            } else {
                console.error("Error al eliminar", response.status);
                alert("Hay un error, no se puede borrar el contacto");
            }
        } catch (error) {
            console.error("Error al eliminar contacto:", error);
        }
    };

    return (
        <>
            <button className="btn btn-danger" onClick={() => handleDelete(contact.id)}> Delete Contact </button>
        </>
    );
};

export default DeleteContact; 