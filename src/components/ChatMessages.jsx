import useGlobal from "../hooks/useGlobal";

// No recibe props: lee los mensajes directamente del contexto
export default function ChatMessages() {
  const { state } = useGlobal();

  if (!state.currentChat.length) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        ¿En qué puedo ayudarte hoy?
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2 flex flex-col">
      {state.currentChat.map((msg, index) => (
        <div
          key={index}
          className={`max-w-2xl px-4 py-2 rounded-lg whitespace-pre-wrap ${
            msg.sender === "user"
              ? "bg-blue-600 self-end"
              : "bg-gray-700 self-start"
          }`}
        >
          {msg.text || <span className="animate-pulse">Pensando...</span>}
        </div>
      ))}
    </div>
  );
}
