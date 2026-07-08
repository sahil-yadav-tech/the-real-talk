import { Mic } from "lucide-react";

const VoiceRecorder = () => {
  return (
    <button className="w-12 h-12 rounded-full hover:bg-gray-100 flex items-center justify-center transition">

      <Mic
        size={22}
        className="text-gray-500"
      />

    </button>
  );
};

export default VoiceRecorder;