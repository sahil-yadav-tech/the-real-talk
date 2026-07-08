import { conversation } from "./MessageData";
import MessageItem from "../Messages/MessageItem";

const MessageList = () => {
    return (
        <div className="space-y-6">

            {conversation.messages.map((message) => (
                <MessageItem
                    key={message.id}
                    message={message}
                />
            ))}

        </div>
    );
};

export default MessageList;