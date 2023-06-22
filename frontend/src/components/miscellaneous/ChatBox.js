import React from 'react';
import classNames from 'classnames';

const ChatBox = () => {
    // Example data for chat messages
    const chatMessages = [
        { id: 1, sender: 'Alice', content: 'Hello!', timestamp: '10:00 AM' },
        { id: 2, sender: 'Bob', content: 'Hi there!', timestamp: '10:01 AM' },
        { id: 3, sender: 'Alice', content: 'How are you?', timestamp: '10:02 AM' },
        { id: 4, sender: 'Bob', content: 'I am good, thanks!', timestamp: '10:03 AM' },
        { id: 1, sender: 'Alice', content: 'Hello!', timestamp: '10:04 AM' },
        { id: 2, sender: 'Bob', content: 'Hi there!', timestamp: '10:05 AM' },
        { id: 3, sender: 'Alice', content: 'How are you?', timestamp: '10:10 AM' },
        { id: 4, sender: 'Bob', content: 'I am good, thanks!', timestamp: '10:15 AM' },
        { id: 1, sender: 'Alice', content: 'Hello!', timestamp: '10:20 AM' },
        { id: 2, sender: 'Bob', content: 'Hi there!', timestamp: '10:25 AM' },
        { id: 3, sender: 'Alice', content: 'How are you?', timestamp: '10:27 AM' },
        { id: 4, sender: 'Bob', content: 'I am good, thanks!', timestamp: '10:30 AM' },

        // Add more chat messages here...
    ];

    return (
        <div className="flex h-screen">
            <div className="w-1/5 bg-gray-100 p-4">
                {/* Sidebar */}
                {/* Add your sidebar content here */}
            </div>
            <div className="w-4/5">
                <header className="bg-gray-200 p-4">
                    {/* Header */}
                    {/* Add your header content here */}
                </header>
                <div className="flex flex-col justify-end h-half p-4 pb-16 ">
                    {/* Chat Messages */}
                    <div className="flex flex-col">
                        {chatMessages.map((message) => (
                            <div
                                key={message.id}
                                className={classNames('p-2 rounded-lg mb-2', {
                                    'bg-gray-200 self-end': message.sender === 'Alice',
                                    'bg-blue-200 self-start': message.sender === 'Bob',
                                })}
                            >
                                <span className="font-bold">{message.sender}:</span> {message.content}
                                <span className="text-xs text-gray-500 ml-1">{message.timestamp}</span>
                            </div>
                        ))}
                    </div>
                    <div className="fixed bottom-0 left-50 w-4/5 bg-gray-200 p-4">
                        {/* Message Box */}
                        <form className="flex">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                className="flex-1 bg-white border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-r-lg px-4 py-2 ml-2"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
