import { MessageCirclePlus } from "lucide-react";
import useGlobal from "../hooks/useGlobal";

export default function History() {
  const { state, dispatch } = useGlobal();

  return (
    <aside className="flex flex-col h-screen w-64 bg-gray-950 text-white p-4">
      <span className="text-lg font-bold mb-4">DevfSeek</span>

      {/* Mientras la IA responde, bloqueamos el cambio de chat */}
      <button
        onClick={() => dispatch({ type: "@save_history" })}
        disabled={state.loading}
        className="flex items-center gap-2 p-2 bg-blue-600 hover:bg-blue-500 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <MessageCirclePlus size={20} />
        Nuevo chat
      </button>

      <ul className="flex-1 overflow-y-auto mt-6 space-y-2 text-sm">
        {state.history.map((chat, index) => (
          <li key={index}>
            <button
              onClick={() => dispatch({ type: "@open_chat", payload: index })}
              disabled={state.loading}
              className="w-full text-left p-2 bg-gray-800 hover:bg-gray-700 rounded-lg truncate cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {chat.title}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
