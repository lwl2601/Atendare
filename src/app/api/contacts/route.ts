import { NextResponse } from "next/server";
import { ContactManager } from "../../../services/ContactManager";

// GET: Retorna todos os contatos
export async function GET() {
  try {
    const data = await new ContactManager().findAll();
    return NextResponse.json(data);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Erro ao buscar contatos" },
      { status: 500 }
    );
  }
}

// POST: Adiciona um novo contato
export async function POST(request: Request) {
  const body = await request.json();
  try {
    const data = await new ContactManager().create(body);
    console.log("res", data);
    return NextResponse.json(
      { message: "Contato salvo com sucesso!", contact: data },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Erro ao salvar contato" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") || "";

  try {
    const data = await new ContactManager().update(id, body);
    console.log("res", data);
    return NextResponse.json(
      { message: "Contato salvo com sucesso!", contact: data },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Erro ao salvar contato" },
      { status: 500 }
    );
  }
}
  // PUT

