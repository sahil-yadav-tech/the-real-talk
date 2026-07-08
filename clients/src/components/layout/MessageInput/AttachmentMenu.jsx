import { Paperclip } from "lucide-react";

const AttachmentButton = () => {
  return (
    <button className="w-12 h-12 rounded-full hover:bg-gray-100 flex items-center justify-center transition">

      <Paperclip
        size={22}
        className="text-gray-500"
      />

    </button>
  );
};

export default AttachmentButton;