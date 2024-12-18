"use client";

import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

// Definindo o tipo de dado "Contact"
interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

// Função para formatar número de telefone
const formatPhone = (value: string) => {
  if (!value) return ""; // Caso o número seja inválido ou vazio

  const part1 = value.slice(0, 2); // DDD
  const part2 = value.slice(2, 3); // Primeira parte do número
  const part3 = value.slice(3, 7); // Meio do número
  const part4 = value.slice(7); // Final do número

  let formatted = `(${part1})`; // Adiciona os parênteses no DDD
  if (part2) formatted += ` ${part2}`;
  if (part3) formatted += `${part3 ? " " : ""}${part3}`;
  if (part4) formatted += `-${part4}`;
  return formatted;
};

const Dashboard: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch contacts on mount
  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    setFilteredContacts(
      contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.phone.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, contacts]);

  const fetchContacts = async () => {
    try {
      const response = await axios.get("/api/contacts");
      setContacts(response.data.results);
      setFilteredContacts(response.data.results);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleOpenModal = (contact: Contact | null = null) => {
    setIsEdit(!!contact);
    setSelectedContact(contact);
    setFormData(contact || { name: "", email: "", phone: "" });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setFormData({ name: "", email: "", phone: "" });
    setSelectedContact(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveContact = async () => {
    try {
      const formattedPhone = formData.phone.replace(/\D/g, ""); // Remove caracteres não numéricos
      const updatedData = { ...formData, phone: formattedPhone };

      if (isEdit && selectedContact) {
        await axios.patch(`api/contacts?id=${selectedContact.id}`, updatedData);
      } else {
        await axios.post("api/contacts", updatedData);
      }
      fetchContacts();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving contact:", error);
    }
  };

  const handleDeleteContact = async (id) => {
    if (confirm("Tem certeza de que deseja excluir este contato?")) {
      try {
        const response = await axios.delete(`/api/contacts/delete?id=${id}`);
        console.log("Delete response:", response);
        fetchContacts(); // Atualiza a lista de contatos
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Paínel de Contato
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => handleOpenModal()}
        >
          Adicionar Contato
        </Button>
        <TextField
          label="Pesquisar"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: 300 }}
        />
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Telefone</TableCell>
            <TableCell align="right">Funções</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredContacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>{contact.name}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{formatPhone(contact.phone)}</TableCell>
              <TableCell align="right">
                <Tooltip title="Edit">
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenModal(contact)}
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteContact(contact.id)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal for Add/Edit Contact */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h8" gutterBottom>
            {isEdit ? "Editar Contato" : "Novo Contato"}
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Nome Completo"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required // Campo obrigatório
            error={!formData.name} // Exibe erro se estiver vazio
            helperText={!formData.name ? "Este campo é obrigatório." : ""} // Mensagem de erro
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Telefone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseModal}
              sx={{ marginRight: 2 }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveContact}
            >
              Salvar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Dashboard;
