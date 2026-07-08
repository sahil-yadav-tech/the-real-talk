import { MapPin } from "lucide-react";
import MessageTime from "./MessageTime";

const LocationMessage = ({ message }) => {
  return (
    <div className="flex justify-start">

      <div className="bg-white rounded-3xl overflow-hidden shadow w-[360px]">

        <img
          src={message.mapImage}
          alt=""
          className="w-full h-44 object-cover"
        />

        <div className="p-4">

          <div className="flex items-center gap-2">

            <MapPin size={18} />

            <span>{message.address}</span>

          </div>

          <div className="flex justify-end mt-3">

            <MessageTime time={message.time} />

          </div>

        </div>

      </div>

    </div>
  );
};

export default LocationMessage;