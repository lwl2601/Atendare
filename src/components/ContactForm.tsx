import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import api from "../services/api";

interface Contact {
  id: number;
  name: string;
  email: string;
}

interface Props {
  contact?: Contact;
  onSubmit: (contact: Contact) => void;
}

const ContactForm: React.FC<Props> = ({ contact, onSubmit }) => {
  const [name, setName] = useState(contact?.name || "");
  const [email, setEmail] = useState(contact?.email || "");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newContact = { name, email };
    if (contact) {
      await api.put(`/contacts/${contact.id}`, newContact);
    } else {
      await api.post("/contacts", newContact);
    }
    onSubmit(newContact);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Nome"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <TextField
        label="E-mail"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        {contact ? "Editar" : "Criar"}
      </Button>
    </form>
  );
};

export default ContactForm;
