'use client';

import { Card } from '@/components/ui/card';
import React, { useEffect, useRef, useState } from 'react';
import vector from '../../public/vector.svg';
import Image from 'next/image';
import PulseLoader from "react-spinners/PulseLoader";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Message } from '@/global';
import { useRouter } from 'next/navigation';
import { useUser } from '@/providers/context';
import { host1, host2, host3, setMessagesInDB } from '@/server-actions';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

export function ChatbotCard() {
    const router = useRouter();
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([{ type: 'robot', content: `Hello, I am a timer robot. I will remind you when time is up for each topic and you need to move on to the next topic. In this conversation, you will be discussing <strong>three aspects of globalization - economic, social, and political</strong>. Then there'll be an opportunity for open discussion at the end. <strong>Please only discuss the specific topic for each part of the conversation</strong>. If you have any further thoughts or questions about a topic after time is up, you can bring them up in the open discussion section. You may now begin the conversation with one another - please start by discussing economic globalization. We randomly assigned your discussion partner to start the conversation.`, timestamp: Date.now() }]);
    const { response, mturkId, index } = useUser();
    const [inputDisabled, setInputDisabled] = useState(false);
    const [openDiscussion, setOpenDiscussion] = useState(false);
    const [resetCount, setResetCount] = useState<number>(0);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const hosts = [host1, host2, host3];
    const host = hosts[index];

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);


    useEffect(() => {
        if (!response || !mturkId) {
            router.push('/');
        } else {
            handleChatSubmit();
        }
    }, [response, mturkId, router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
        setErrorMessage('');
    };

    const handleChatSubmit = async (alert?: any) => {
        const text = alert ? alert : inputText;
        let updatedMessages = [...messages];
        let messageToSend!: Message;
        let isFirstMessage = messages.filter(msg => msg.type === 'user').length === 0;

        if (!isFirstMessage) {
            const wordCount = text.trim().split(/\s+/).length;
            if (wordCount < 11) {
                setErrorMessage('Please note that you can only send one message at a time, so make sure you type out your full and complete response before hitting send. You need to type more words to proceed.');
                return;
            }
        }

        const currentTime = Date.now();

        if (text === alert) {
            const robotMessage: Message = {
                type: 'robot',
                content: text,
                timestamp: currentTime,
            };
            updatedMessages = [...updatedMessages, robotMessage];
            messageToSend = robotMessage;
            setMessages(updatedMessages);
        }
        if (text === inputText) {
            const userMessage: Message = {
                type: 'user',
                content: text,
                userId: mturkId,
                timestamp: currentTime,
            };
            updatedMessages = [...updatedMessages, userMessage];
            messageToSend = userMessage;
            setMessages(updatedMessages);
        }
        setInputText('');
        setInputDisabled(true);
        setLoading(true);
        try {
            const response: any = await host(text, updatedMessages);
            const hostMessage: Message = {
                type: 'host',
                content: response?.res ?? '',
                userId: response.name,
                timestamp: Date.now(),
            };
            updatedMessages = [...updatedMessages, hostMessage];
            await setMessagesInDB(mturkId, updatedMessages);
            setTimeout(async () => {
                setMessages(updatedMessages);
                setLoading(false);
                setInputDisabled(false);
            }, 30000);
        } catch (error) {
            console.error('Error fetching data from OpenAI:', error);
            const errorMessage: Message = {
                type: 'robot',
                content: 'An error occurred while fetching the response. Please try again.',
                timestamp: Date.now(),
            };
            setMessages([...messages, errorMessage]);
            setLoading(false);
            setInputDisabled(false);
        }
    };


    useEffect(() => {
        const hostMessages = messages.filter(message => message.type === 'host');
        const userMessages = messages.filter(message => message.type === 'user');

        if (resetCount === 3) {
            setOpenDiscussion(true);
        }
        if (resetCount === 3 && hostMessages.length === 16 && userMessages.length === 16) {
            setInputDisabled(true);
            const nextSectionMessage: Message = {
                type: 'robot',
                content: "The total time is now up, and the conversation is over. Please click 'Next' at the bottom right of the page, to move on to the final part of the study.",
                timestamp: Date.now(),
            };
            setMessages(prevMessages => [...prevMessages, nextSectionMessage]);
            setMessagesInDB(mturkId, [...messages, nextSectionMessage]);
        }

        if (resetCount === 0 && hostMessages.length === 4 && userMessages.length === 4) {
            const content = "Time is up for this topic. It is now time to discuss <strong>social globalization</strong>.";
            handleChatSubmit(content);
            setResetCount(prevCounter => prevCounter + 1);
        }

        if (resetCount === 1 && hostMessages.length === 8 && userMessages.length === 8) {
            const content = "Time is up for this topic. It is now time to discuss <strong>political globalization</strong>.";
            handleChatSubmit(content);
            setResetCount(prevCounter => prevCounter + 1);
        }

        if (resetCount === 2 && hostMessages.length === 12 && userMessages.length === 12 && !openDiscussion) {
            const content = `Time is up, and it is now time for the open discussion part of the conversation. <strong>Please stay on the topic of globalization</strong>, and feel free to discuss any thoughts or questions you have left over from the previous topic discussions. If you no longer want to chat, at any time, you can click "Next" at the bottom right of your page and move on to the final part of the study.`;
            handleChatSubmit(content);
            setResetCount(prevCounter => prevCounter + 1);
        }
    }, [resetCount]);

    const nextButtonHandler = () => {
        router.push('/exit');
    }

    const handleEmojiClick = (emojiData: EmojiClickData) => {
        setInputText(prevInputText => prevInputText + emojiData.emoji);
        setShowEmojiPicker(false);
    };

    const toggleEmojiPicker = () => {
        setShowEmojiPicker(prevState => !prevState);
    };

    return (
        <Card className="w-full border-0 md:border md:border-[2px] flex-col items-center justify-center mb-10">
            <Card className="w-full md:w-[650px] mt-10 mb-10 mx-auto border-0 md:border">
                <Card
                    style={{
                        border: 'solid white',
                        overflowY: 'auto',
                    }}
                    ref={messagesContainerRef}
                    className="w-full md:w-[620px] h-[442px] mx-auto mb-5 mt-5"
                >
                    <div className="flex flex-col space-y-5">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={message.type === 'user' ? 'text-right' : 'text-left'}
                            >
                                {message.type === 'user' && (
                                    <div className="mr-5">
                                        <div
                                            style={{
                                                display: 'inline-block',
                                                padding: '12px 20px',
                                                borderRadius: '16px 16px 0px 16px',
                                                gap: '10px',
                                                backgroundColor: '#00A08799',
                                                marginLeft: 'auto',
                                                maxWidth: '100%',
                                            }}
                                        >
                                            <p
                                                style={{
                                                    fontSize: '14px',
                                                    color: '#ffffff',
                                                }}
                                            >
                                                {message.content}
                                            </p>
                                        </div>
                                        <p style={{ fontSize: '10px', color: '#637381' }}>
                                            {new Date(message.timestamp).toLocaleTimeString('en-US', {
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: true,
                                            })}
                                        </p>
                                    </div>
                                )}
                                {message.type === 'robot' && (
                                    <div>
                                        <p style={{ fontSize: '12px', color: '#637381' }}>
                                            Timer Robot
                                        </p>
                                        <div
                                            style={{
                                                top: '629px',
                                                left: '596.56px',
                                                padding: '12px 20px',
                                                borderRadius: '0px 16px 16px 16px',
                                                gap: '10px',
                                                backgroundColor: '#DC000099',
                                            }}
                                            className="w-full md:w-[351px]"
                                        >
                                            <p style={{ fontSize: '14px', color: '#ffffff' }} dangerouslySetInnerHTML={{ __html: message.content }}>
                                            </p>
                                        </div>
                                        <p
                                            style={{
                                                fontSize: '10px',
                                                color: '#637381',
                                            }}
                                        >
                                            {new Date(message.timestamp).toLocaleTimeString('en-US', {
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: true,
                                            })}
                                        </p>
                                    </div>
                                )}
                                {message.type === 'host' && (
                                    <div>
                                        <p style={{ fontSize: '12px', color: '#637381' }}>
                                            Discussion Partner
                                        </p>
                                        <div
                                            style={{
                                                top: '629px',
                                                left: '596.56px',
                                                padding: '12px 20px',
                                                borderRadius: '0px 16px 16px 16px',
                                                gap: '10px',
                                                backgroundColor: '#3C548899',
                                            }}
                                            className="w-full md:w-[351px]"
                                        >
                                            <p style={{ fontSize: '14px', color: '#ffffff' }} dangerouslySetInnerHTML={{ __html: message.content }}>
                                            </p>
                                        </div>
                                        <p
                                            style={{
                                                fontSize: '10px',
                                                color: '#637381',
                                            }}
                                        >
                                            {new Date(message.timestamp).toLocaleTimeString('en-US', {
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: true,
                                            })}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                        {loading && <PulseLoader size={5} />}
                    </div>
                </Card>

                <hr className="w-full mt-10" />
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="flex items-center space-x-3 md:space-x-0 justify-between mb-5 mt-5 w-full"
                >
                    <Input
                        style={{ backgroundColor: '#F4F7FF' }}
                        className="w-full md:w-[550px] md:mx-5"
                        placeholder="Type something here..."
                        required={true}
                        value={inputText}
                        onChange={handleInputChange}
                        disabled={inputDisabled}
                    />
                    <Button
                        style={{ backgroundColor: 'green' }}
                        className="md:mx-5"
                        type="submit"
                        onClick={() => handleChatSubmit()}
                        disabled={inputDisabled}
                    >
                        <Image
                            src={vector}
                            className="mb-5 mt-5"
                            alt="Vector Icon"
                            width={20}
                            height={20}
                        />
                    </Button>
                    <Button
                        style={{ backgroundColor: 'gray' }}
                        className="md:mx-5"
                        type="button"
                        onClick={toggleEmojiPicker}
                    >
                        😊
                    </Button>
                </form>
                {showEmojiPicker && (
                    <div className="emoji-picker">
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </div>
                )}
                {errorMessage && (
                    <div className="text-red-500 text-center mb-2">{errorMessage}</div>
                )}
            </Card>
            {openDiscussion && (
                <div className="flex justify-end -mt-20 mx-5 mb-5">
                    <Button className="mr-44" variant="outline" onClick={nextButtonHandler}>
                        Next
                    </Button>
                </div>
            )}
        </Card>
    );
}
