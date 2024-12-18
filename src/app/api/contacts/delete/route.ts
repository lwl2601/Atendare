import { NextResponse } from "next/server";
import { ContactManager } from "../../../../services/ContactManager";

export async function DELETE(
  request: Request
) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") || "";

  // Verificação básica para garantir que o ID está presente
  if (!id) {
    return NextResponse.json(
      { message: "ID do contato não fornecido!" },
      { status: 400 }
    );
  }

  try {
    const accessToken = process.env.NEXT_PUBLIC_API_TOKEN; // Usando a variável de ambiente
    if (!accessToken) {
      // Se o token não estiver configurado
      return NextResponse.json(
        { message: "Access token não configurado!" },
        { status: 500 }
      );
    }

    const contactManager = new ContactManager();
    const result = await contactManager.delete(id, accessToken);

    if (result) {
      // Se a exclusão foi bem-sucedida
      return NextResponse.json(
        { message: "Contato excluído com sucesso!" },
        { status: 200 }
      );
    } else {
      // Se o contato não foi encontrado
      return NextResponse.json(
        { message: "Contato não encontrado!" },
        { status: 404 }
      );
    }
  } catch (err) {
    console.error("Erro ao excluir o contato:", err);

    // Retorna uma resposta de erro genérico
    return NextResponse.json(
      { message: "Ocorreu um erro ao excluir o contato." },
      { status: 500 }
    );
  }
}
