"use client";

import { useRouter } from "next/navigation"; // Import correto para o App Router
import { useEffect } from "react";

const Home: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard"); // Redireciona para /dashboard
  }, [router]);

  return null; // Nenhum conteúdo precisa ser renderizado
};

export default Home;
