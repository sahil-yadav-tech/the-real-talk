import { SendHorizontal } from "lucide-react";

const SendButton = () => {
  return (
    <button className="w-12 h-12 rounded-full bg-violet-600 hover:bg-violet-700 text-white flex items-center justify-center transition">

      <SendHorizontal size={20} />

    </button>
  );
};

export default SendButton;