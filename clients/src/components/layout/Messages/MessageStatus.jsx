import {
  Check,
  CheckCheck
} from "lucide-react";

const MessageStatus = ({ status }) => {

  if (status === "sent") {
    return (
      <Check
        size={14}
        className="text-violet-100"
      />
    );
  }

  if (status === "delivered") {
    return (
      <CheckCheck
        size={14}
        className="text-violet-100"
      />
    );
  }

  return (
    <CheckCheck
      size={14}
      className="text-sky-300"
    />
  );
};

export default MessageStatus;