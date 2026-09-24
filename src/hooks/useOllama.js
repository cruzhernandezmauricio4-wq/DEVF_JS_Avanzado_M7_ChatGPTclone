import useGlobal from "./useGlobal";

const OLLAMA_URL = "http://localhost:11434/api/chat";
const MODEL = "deepseek-r1:1.5b";

// DeepSeek R1 "piensa en voz alta" dentro de <think>...</think>; lo ocultamos
const removeThinking = (text) =>
  text.replace(/<think>[\s\S]*?(<\/think>|$)/g, "").trim();

// El estado de carga y los errores viven en el contexto global,
// así cualquier componente puede saber si la IA está respondiendo.
export default function useOllama() {
  const { state, dispatch } = useGlobal();

  const sendMessage = async (prompt) => {
    // Mandamos la conversación completa para que el modelo recuerde el contexto
    const conversation = [
      ...state.currentChat,
      { text: prompt, sender: "user" },
    ].map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text,
    }));

    dispatch({ type: "@add_message", payload: { text: prompt, sender: "user" } });
    dispatch({ type: "@add_message", payload: { text: "", sender: "bot" } });
    dispatch({ type: "@set_loading", payload: true });
    dispatch({ type: "@set_error", payload: null });

    try {
      const res = await fetch(OLLAMA_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: MODEL, messages: conversation, stream: true }),
      });
      if (!res.ok) throw new Error(`Ollama respondió con estado ${res.status}`);

      // Ollama manda la respuesta en pedazos: un JSON por línea
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let fullText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop(); // la última línea puede venir incompleta

        for (const line of lines) {
          if (!line.trim()) continue;
          const chunk = JSON.parse(line);
          fullText += chunk.message?.content ?? "";
          dispatch({ type: "@update_last_message", payload: removeThinking(fullText) });
        }
      }
    } catch (err) {
      dispatch({
        type: "@set_error",
        payload: "No se pudo conectar con Ollama. Revisa que esté abierto.",
      });
      dispatch({ type: "@update_last_message", payload: `Error: ${err.message}` });
    } finally {
      dispatch({ type: "@set_loading", payload: false });
    }
  };

  return { sendMessage };
}
