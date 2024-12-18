// src/app/not-found.tsx
"use client"; // Adicione esta linha para marcar o componente como Client Component

import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation"; // Agora pode usar useRouter corretamente

const NotFound: React.FC = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/"); // Redireciona para a página inicial
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - Página Não Encontrada</h1>
      <p>A página que você está procurando não existe.</p>
      <Button variant="contained" color="primary" onClick={handleGoHome}>
        Voltar para a Página Inicial
      </Button>
    </div>
  );
};

export default NotFound;
