import { createContext } from "react";

export const GlobalContext = createContext(null);

// Lee el historial guardado en el navegador
function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem("history")) ?? [];
  } catch {
    return [];
  }
}

export const initialState = {
  currentChat: [], // mensajes del chat abierto
  history: loadHistory(), // chats guardados: { title, content }
};

// El reducer nunca modifica el estado: siempre devuelve uno nuevo
export function globalReducer(state, action) {
  switch (action.type) {
    case "@add_message": {
      return { ...state, currentChat: [...state.currentChat, action.payload] };
    }
    case "@update_last_message": {
      const chat = [...state.currentChat];
      chat[chat.length - 1] = { ...chat[chat.length - 1], text: action.payload };
      return { ...state, currentChat: chat };
    }
    case "@save_history": {
      if (!state.currentChat.length) return state;
      const newChat = {
        title: state.currentChat[0].text, // el primer mensaje es el título
        content: state.currentChat,
      };
      return { history: [newChat, ...state.history], currentChat: [] };
    }
    case "@open_chat": {
      // Sacamos el chat elegido del historial para no duplicarlo al guardarlo otra vez
      const chosen = state.history[action.payload];
      const rest = state.history.filter((_, i) => i !== action.payload);
      // Si había un chat abierto con mensajes, lo guardamos antes de cambiar
      const current = state.currentChat.length
        ? [{ title: state.currentChat[0].text, content: state.currentChat }]
        : [];
      return { history: [...current, ...rest], currentChat: chosen.content };
    }
    default:
      throw new Error(`Acción no reconocida: ${action.type}`);
  }
}
