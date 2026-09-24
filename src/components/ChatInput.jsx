import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizontal } from "lucide-react";
import useGlobal from "../hooks/useGlobal";
import useOllama from "../hooks/useOllama";

// Reglas de validación del mensaje
const messageSchema = z.object({
  text: z
    .string()
    .trim()
    .min(3, "El mensaje debe tener al menos 3 caracteres")
    .max(200, "El mensaje es demasiado largo"),
});

// No recibe props: toma "loading" y "error" del contexto
export default function ChatInput() {
  const { state } = useGlobal();
  const { sendMessage } = useOllama();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(messageSchema) });

  const onSubmit = (data) => {
    sendMessage(data.text);
    reset();
  };

  return (
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
        <button
          type="submit"
          disabled={state.loading}
          className="ml-2 p-2 bg-blue-600 hover:bg-blue-500 rounded-lg disabled:opacity-50"
        >
          <SendHorizontal size={20} />
        </button>
      </div>
      {errors.text && (
        <span className="text-red-400 text-sm">{errors.text.message}</span>
      )}
      {state.error && <span className="text-red-400 text-sm">{state.error}</span>}
    </form>
  );
}
