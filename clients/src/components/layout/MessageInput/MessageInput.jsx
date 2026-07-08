import EmojiButton from "./EmojiPicker";
import AttachmentButton from "./AttachmentMenu";
import VoiceRecorder from "./VoiceRecorder";
import SendButton from "./SendButton";

const MessageInput = () => {
  return (
    <footer className="bg-white border-t border-gray-200 px-8 py-5">

      <div className="flex items-center gap-4">

        <EmojiButton />

        <AttachmentButton />

        <div className="flex-1">

          <textarea
            rows={1}
            placeholder="Type your message..."
            className="w-full resize-none rounded-2xl bg-gray-100 px-5 py-3 outline-none"
          />

        </div>

        <VoiceRecorder />

        <SendButton />

      </div>

    </footer>
  );
};

export default MessageInput;