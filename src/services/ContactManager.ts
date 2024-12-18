// /services/ContactManager.ts
import API from "../lib/axios"; // Certifique-se de importar corretamente o Axios

export class ContactManager {
  // Método para criar um contato
  async create(body: object) {
    try {
      const { data } = await API.post(`/contacts`, body);
      console.log(data);
      return data;
    } catch (err) {
      console.error("Erro ao criar contato", err);
      throw new Error("Erro ao criar contato");
    }
  }

  // Método para listar todos os contatos
  async findAll() {
    try {
      const { data } = await API.get(`/contacts`);
      console.log(data);
      return data;
    } catch (err) {
      console.error("Erro ao buscar contatos", err);
      throw new Error("Erro ao buscar contatos");
    }
  }

  // Método para atualizar um contato
  async update(id: string, body: object) {
    try {
      const { data } = await API.patch(`/contacts/${id}`, body);
      console.log(data);
      return data;
    } catch (err) {
      console.error("Erro ao atualizar contato", err);
      throw new Error("Erro ao atualizar contato");
    }
  }

  // Método para deletar um contato
  async delete(id: string, accessToken: string): Promise<boolean> {
    const token = accessToken || process.env.NEXT_PUBLIC_API_TOKEN; // Usa o parâmetro ou variável de ambiente
    if (!token) {
      throw new Error("Access token is not provided.");
    }

    const response = await fetch(`https://api.atendare.com/v2/contacts/${id}`, {
      method: "DELETE",
      headers: {
        "Access-Token": token,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return true; // Sucesso
    } else if (response.status === 404) {
      return false; // Contato não encontrado
    } else {
      throw new Error(`Failed to delete contact. Status: ${response.status}`);
    }
  }
}
