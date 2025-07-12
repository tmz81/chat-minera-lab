import React from "react";
import MineralLogo from "./assets/MineralLogo";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ThemeToggle from "./components/ThemeToggle"; // 🔥 Aqui importamos

const App = () => {
  const [mineralName, setMineralName] = React.useState("");
  const [mineralDescription, setMineralDescription] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const inputRef = React.useRef(null);

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
      const prompt = `Forneça uma descrição detalhada e bem estruturada do mineral "${mineralName}" com formatação em Markdown. Use títulos com emojis, listas com ícones, destaque conceitos importantes em negrito, e organize as seções: Propriedades Físicas, Químicas, Formação, Ocorrência no Solo, e Resumo Final. A resposta deve ser clara, científica, visualmente atrativa e ideal para exibição em um site educacional.`;
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
    <div className="flex items-center justify-center min-h-screen bg-blue-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-4 sm:p-6 font-sans transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 flex flex-col items-center max-w-md w-full">
        {/* Toggle separado */}
        <ThemeToggle />
{/* <h1 className="text-2xl font-bold text-blue-600 dark:text-yellow-400">
  Teste de Tema
</h1> */}
        <div className="w-32 h-32 sm:w-40 sm:h-40 mb-6 flex items-center justify-center">
          <MineralLogo className="w-24 h-24 mx-auto mb-4" />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-xl sm:text-2xl font-light leading-tight">
            Laboratório
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold leading-tight -mt-1">
            Mineralogia do Solo
          </h2>
        </div>

        <div className="w-full flex flex-col items-center">
          <h3 className="text-base sm:text-lg font-semibold mb-4 text-center leading-tight">
            ✨ Gerador de <br className="block sm:hidden" /> Descrição de
            Mineral ✨
          </h3>
          <input
            ref={inputRef}
            type="text"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            placeholder="Digite o nome do mineral (ex: Quartzo, Caulinita)"
            value={mineralName}
            onChange={(e) => setMineralName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                inputRef.current?.blur();
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

          {error && <p className="text-red-400 mt-4 text-center">{error}</p>}

          {mineralDescription && (
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mt-6 w-full text-gray-800 dark:text-gray-100 text-sm sm:text-base leading-relaxed whitespace-pre-wrap shadow-inner">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {mineralDescription}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
