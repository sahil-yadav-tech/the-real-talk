import { UserRound } from "lucide-react";
import MessageTime from "./MessageTime";

const ContactMessage = ({ message }) => {
  return (
    <div className="flex justify-start">

      <div className="bg-white rounded-3xl shadow-sm p-5 w-[320px]">

        <div className="flex gap-4 items-center">

          <div className="w-14 h-14 rounded-full bg-violet-100 flex items-center justify-center">

            <UserRound />

          </div>

          <div>

            <h3 className="font-semibold">
              {message.contactName}
            </h3>

            <p className="text-gray-500">
              {message.phone}
            </p>

          </div>

        </div>

        <div className="flex justify-end mt-4">

          <MessageTime time={message.time} />

        </div>

      </div>

    </div>
  );
};

export default ContactMessage;