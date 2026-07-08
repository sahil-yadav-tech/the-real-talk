import TextMessage from "./TextMessage";
import ImageMessage from "./ImageMessage";
import VideoMessage from "./VideoMessage";
import AudioMessage from "./AudioMessage";
import FileMessage from "./FileMessage";
import LinkMessage from "./LinkMessage";
import ReplyMessage from "./ReplyMessage";
import CallMessage from "./CallMessage";

const MessageItem = ({ message }) => {

    switch (message.type) {

        case "text":
            return <TextMessage message={message} />;

        case "image":
            return <ImageMessage message={message} />;

        case "video":
            return <VideoMessage message={message} />;

        case "audio":
            return <AudioMessage message={message} />;

        case "file":
            return <FileMessage message={message} />;

        case "link":
            return <LinkMessage message={message} />;

        case "reply":
            return <ReplyMessage message={message} />;

        case "call":
            return <CallMessage message={message} />;

        default:
            return null;
    }
};

export default MessageItem;