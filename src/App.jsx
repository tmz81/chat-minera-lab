import React from "react";
import MineralLogo from "./assets/MineralLogo";
import axios from "axios";

const App = () => {
  const [mineralName, setMineralName] = React.useState("");
  const [mineralDescription, setMineralDescription] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const generateMineralDescription = async () => {
    setIsLoading(true);
    setError("");
    setMineralDescription("");

    if (!mineralName.trim()) {
      setError("Por favor, digite o nome de um mineral.");
      setIsLoading(false);
      return;
    }

    try {
      const prompt = `Forneça uma descrição detalhada do mineral "${mineralName}", focando em suas propriedades físicas, químicas, condições de formação e sua ocorrência e importância em ambientes de solo. Se for um mineral comum em solos, explique brevemente como ele se forma ou se altera. Se não for comum, mencione isso.`;
      const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
      const payload = { contents: chatHistory };
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const { data: result } = await axios.post(apiUrl, payload, {
        headers: { "Content-Type": "application/json" },
      });

      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text || null;

      if (text) {
        setMineralDescription(text);
      } else {
        setError("Não foi possível gerar a descrição. Tente novamente.");
        console.error("Estrutura de resposta inesperada:", result);
      }
    } catch (err) {
      setError(
        "Ocorreu um erro ao conectar com a API. Verifique sua conexão ou tente mais tarde."
      );
      console.error("Erro na chamada da API Gemini:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 p-4 sm:p-6 font-sans">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 flex flex-col items-center max-w-md w-full">
        <div className="w-32 h-32 sm:w-40 sm:h-40 mb-6 flex items-center justify-center">
          <MineralLogo className="w-24 h-24 mx-auto mb-4" />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-xl sm:text-2xl font-light text-gray-700 leading-tight">
            Laboratório
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 leading-tight -mt-1">
            Mineralogia do Solo
          </h2>
        </div>

        <div className="w-full flex flex-col items-center">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
            ✨ Gerador de Descrição de Mineral ✨
          </h3>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite o nome do mineral (ex: Quartzo, Caulinita)"
            value={mineralName}
            onChange={(e) => setMineralName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                generateMineralDescription();
              }
            }}
          />
          <button
            onClick={generateMineralDescription}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 ease-in-out shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Gerando..." : "Gerar Descrição"}
          </button>

          {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

          {mineralDescription && (
            <div className="bg-gray-100 p-4 rounded-lg mt-6 w-full text-gray-800 text-sm sm:text-base leading-relaxed whitespace-pre-wrap shadow-inner">
              {mineralDescription}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
