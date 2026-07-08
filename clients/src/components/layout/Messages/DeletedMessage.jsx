import { Ban } from "lucide-react";

const DeletedMessage = () => {
  return (
    <div className="flex justify-center">

      <div className="bg-gray-100 rounded-full px-5 py-2 flex items-center gap-2 text-gray-500">

        <Ban size={16} />

        <span>This message was deleted</span>

      </div>

    </div>
  );
};

export default DeletedMessage;