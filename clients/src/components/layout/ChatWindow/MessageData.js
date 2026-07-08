// messageData.js

export const conversation = {
  id: 1,

  user: {
    id: 101,
    name: "Edward Lietz",
    avatar: "https://i.pravatar.cc/150?img=13",
    status: "Online",
    lastSeen: "last seen 2 min ago",
  },

  messages: [
    {
      id: 1,
      type: "text",
      sender: "other",
      text: "Hello Jacob 😊",
      time: "09:20 AM",
      status: "seen",
    },

    {
      id: 2,
      type: "text",
      sender: "me",
      text: "Hello! How are you?",
      time: "09:21 AM",
      status: "seen",
    },

    {
      id: 3,
      type: "image",
      sender: "other",
      images: [
        "https://picsum.photos/300/250?1",
        "https://picsum.photos/300/250?2",
        "https://picsum.photos/300/250?3",
      ],
      caption: "Vacation Images",
      time: "09:25 AM",
      status: "delivered",
    },

    {
      id: 4,
      type: "video",
      sender: "me",
      thumbnail: "https://picsum.photos/500/280?4",
      duration: "01:45",
      time: "09:30 AM",
      status: "seen",
    },

    {
      id: 5,
      type: "audio",
      sender: "other",
      duration: "00:36",
      time: "09:35 AM",
      status: "seen",
    },

    {
      id: 6,
      type: "file",
      sender: "me",
      fileName: "Ecommerce_UI.fig",
      fileSize: "12 MB",
      extension: "FIG",
      time: "09:45 AM",
      status: "seen",
    },

    {
      id: 7,
      type: "link",
      sender: "other",
      url: "https://react.dev",
      title: "React Official Documentation",
      description: "The library for web and native user interfaces.",
      image: "https://picsum.photos/400/220?6",
      time: "09:50 AM",
      status: "seen",
    },

    {
      id: 8,
      type: "call",
      sender: "me",
      callType: "video",
      duration: "07:42",
      statusText: "Outgoing Call",
      time: "10:10 AM",
      status: "seen",
    },

    {
      id: 9,
      type: "reply",
      sender: "other",

      replyTo: {
        text: "Hello! How are you?",
      },

      text: "I'm good 😊",

      time: "10:15 AM",

      status: "seen",
    },

    {
      id: 10,
      type: "text",
      sender: "me",
      text: "Great ❤️",
      reactions: ["👍", "🔥"],
      time: "10:18 AM",
      status: "seen",
    },

    {
      id: 11,
      type: "text",
      sender: "me",
      text: "Great ❤️",

      reactions: ["👍", "🔥"],

      time: "10:18 AM",

      status: "seen",
    },
  ],
};
