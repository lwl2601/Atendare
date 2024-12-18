import React from "react";
import Header from "@/app/components/Header"
const ContactPage: React.FC<{ contact: Contact }> = ({ contact }) => {
  return (
    <div>
      <Header />
      <h1>{contact.name}</h1>
      <p>{contact.email}</p>
      <p>{contact.phone}</p>
    </div>
  );
};

export default ContactPage;
