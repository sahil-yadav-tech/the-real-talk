import MessageTime from "./MessageTime";

const StickerMessage = ({ message }) => {
  return (
    <div className="flex justify-start">

      <div>

        <img
          src={message.sticker}
          alt=""
          className="w-40 h-40 object-contain"
        />

        <div className="flex justify-center mt-2">

          <MessageTime time={message.time} />

        </div>

      </div>

    </div>
  );
};

export default StickerMessage;