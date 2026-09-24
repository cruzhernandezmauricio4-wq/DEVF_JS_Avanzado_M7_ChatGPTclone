import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";

// App solo acomoda las piezas. No pasa props: cada componente
// toma lo que necesita del contexto con useGlobal().
export default function App() {
  return (
    <div className="flex flex-col h-screen w-full bg-gray-900 text-white">
      <ChatMessages />
      <ChatInput />
    </div>
  );
}
