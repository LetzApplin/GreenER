import { useEffect, useState } from "react";

export default function App() {
  const [mensagem, setMensagem] = useState("Carregando...");

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    fetch(`${apiUrl}/health`)
      .then((response) => response.json())
      .then((data) => {
        setMensagem(data.message);
      })
      .catch(() => {
        setMensagem("Erro ao conectar com o backend");
      });
  }, []);

  return (
    <>
      <h1>GreenER</h1>
      <p>{mensagem}</p>
    </>
  );
}