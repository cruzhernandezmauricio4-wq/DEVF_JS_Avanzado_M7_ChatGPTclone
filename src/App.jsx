import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizontal } from "lucide-react";

// Reglas de validación del mensaje
const messageSchema = z.object({
  text: z
    .string()
    .trim()
    .min(3, "El mensaje debe tener al menos 3 caracteres")
    .max(200, "El mensaje es demasiado largo"),
});

export default function App() {
  const [messages, setMessages] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(messageSchema) });

  // Solo se ejecuta si la validación pasa
  const onSubmit = (data) => {
    setMessages((prev) => [...prev, { text: data.text, sender: "user" }]);
    reset();

    // Respuesta simulada; en la parte de Ollama se cambia por la IA real
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "Respuesta generada...", sender: "bot" },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-900 text-white">
      <div className="flex-1 overflow-y-auto p-4 space-y-2 flex flex-col">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-md px-4 py-2 rounded-lg ${
              msg.sender === "user"
                ? "bg-blue-600 self-end"
                : "bg-gray-700 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 flex flex-col gap-2 bg-gray-800"
      >
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            autoComplete="off"
            className="flex-1 p-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
            {...register("text")}
          />
          <button type="submit" className="ml-2 p-2 bg-blue-600 hover:bg-blue-500 rounded-lg">
            <SendHorizontal size={20} />
          </button>
        </div>
        {errors.text && (
          <span className="text-red-400 text-sm">{errors.text.message}</span>
        )}
      </form>
    </div>
  );
}

