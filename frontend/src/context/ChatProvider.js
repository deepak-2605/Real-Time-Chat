import React from "react";

const ChatContext = React.createContext();

const ChatProvider = ChatContext.Provider
const ChatConsumer = ChatContext.Consumer

export {ChatProvider, ChatConsumer}
