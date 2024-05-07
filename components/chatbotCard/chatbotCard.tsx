'use client';

import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
import vector from '../../public/vector.svg';
import Image from 'next/image';
import PulseLoader from "react-spinners/PulseLoader";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Message } from '@/global';
import { useRouter } from 'next/navigation';
import { useUser } from '@/providers/context';
import { host1, host2, host3, setMessagesInDB } from '@/server-actions';
import { MyTimer } from './timer';

export function ChatbotCard() {

    const router = useRouter();
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const { response, mturkId } = useUser();
    const [inputDisabled, setInputDisabled] = useState(false);
    const [typingStartTime, setTypingStartTime] = useState<number | null>(null);
    const [typingTime, setTypingTime] = useState<number>(0);
    const [timeLeft30, setTimeLeft30] = useState(false);
    const [timeUp, setTimeUp] = useState(false);
    const [openDiscussion, setOpenDiscussion] = useState(false);
    const { sec, min } = useUser();
    const time = new Date();
    time.setSeconds(time.getSeconds() + 840);

    useEffect(() => {
        if (!response || !mturkId) {
            router.push('/');
        }
    }, [response, mturkId, router]);


    const hosts = [host1, host2, host3];
    const randomIndex = Math.floor(Math.random() * 3);

    const host = hosts[randomIndex];

    useEffect(() => {
        handleChatSubmit();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
        if (!typingStartTime) {
            setTypingStartTime(Date.now());
        }
    };

    const handleChatSubmit = async () => {
        const submissionTime = Date.now();
        if (typingStartTime) {
            const timeDifference = submissionTime - typingStartTime;
            setTypingTime(typingTime + timeDifference);
            setTypingStartTime(null);
        }
        const userMessage: Message = {
            type: 'user',
            content: inputText,
            userId: mturkId,
        };
        let updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setLoading(true);
        setInputDisabled(true)
        try {
            const response: any = await host(inputText, updatedMessages);
            const hostMessage: Message = {
                type: 'host',
                content: response?.res ?? '',
                userId: response.name,
            };
            updatedMessages = [...updatedMessages, hostMessage];
            await setMessagesInDB([userMessage, hostMessage]);
            setTimeout(async () => {
                setInputText('');
                setMessages(updatedMessages);
                setLoading(false);
                setInputDisabled(false);
            }, 30000);
        } catch (error) {
            console.error('Error fetching data from OpenAI:', error);
            const errorMessage: Message = {
                type: 'host',
                content:
                    'An error occurred while fetching the response. Please try again.',
                userId: mturkId,
            };
            setMessages([...messages, errorMessage]);
            setLoading(false);
            setInputDisabled(false);
        }
    };

    useEffect(() => {
        return () => {
            if (typingStartTime) {
                const submissionTime = Date.now();
                const timeDifference = submissionTime - typingStartTime;
                setTypingTime(typingTime + timeDifference);
                setTypingStartTime(null);
            }
        };
    }, []);

    useEffect(() => {
        console.log(min, sec)
        if ((min === 11 && sec === 30) || (min === 8 && sec === 30) || (min === 5 && sec === 30) || (min === 0 && sec === 30)) {
            setTimeLeft30(true);
            setTimeout(() => {
                setTimeLeft30(false);
            }, 5000);
        }

        if ((min === 5 && sec === 0)) {
            setOpenDiscussion(true);
        }

        if ((min === 0 && sec === 30)) {
            const lastMessage: Message = {
                type: 'host',
                content: "Oh, it's nice discussing globalization with you today. Good Bye!",
                userId: 'Host',
            };
            setMessages(prevMessages => [...prevMessages, lastMessage]);
        }
        if ((min === 0 && sec === 0)) {
            setInputDisabled(true);
            setOpenDiscussion(false);
        }

        if ((min === 11 && sec === 0) || (min === 8 && sec === 0)) {
            setTimeUp(true);
            const nextSectionMessage: Message = {
                type: 'host',
                content: "Let's move on to the next section.",
                userId: 'Host',
            };
            setMessages(prevMessages => [...prevMessages, nextSectionMessage]);
            setTimeout(() => {
                setTimeUp(false);
            }, 5000);
        }
    }, [min, sec]);
    return (
        <Card className="w-full border-0 md:border md:border-[2px] flex-col items-center justify-center mb-10">
            <Card className="w-full md:w-[650px] mt-10 mb-10 mx-auto border-0 md:border">
                <div className="flex items-center justify-between">
                    <CardTitle className="font-semibold mt-5 mb-5 text-[#212B36] md:mx-5">
                        Let&apos;s talk about globalization
                    </CardTitle>
                    <MyTimer expiryTimestamp={time} />
                </div>
                <CardDescription className="font-semibold text-xl text-[#212B36] md:mx-5 mb-5">
                    Participant Time: {Math.floor(typingTime / 1000)} seconds
                </CardDescription>
                {openDiscussion && <CardDescription className="text-base text-[#212B36] md:mx-5 mb-5">
                    Open Discussion Time
                </CardDescription>
                }
                {timeLeft30 && <CardDescription className="text-base text-[#FF0000] md:mx-5 mb-5">
                    30 seconds left for this section
                </CardDescription>
                }
                {timeUp && <CardDescription className="text-base text-[#FF0000] md:mx-5 mb-5">
                    Time is up for this section
                </CardDescription>
                }
                <hr className="w-full mb-10" />
                <Card
                    style={{
                        border: 'solid white',
                        overflowY: 'auto',
                    }}
                    className="w-full md:w-[620px] h-[442px] mx-auto mb-5"
                >
                    <div className="flex flex-col space-y-5">
                        {messages?.slice(1).map((message, index) => (
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
                                                backgroundColor: '#3056D3',
                                                marginLeft: 'auto',
                                                maxWidth: '100%',
                                            }}
                                        >
                                            <p
                                                style={{
                                                    fontSize: '14px',
                                                    color: '#FFFFFF',
                                                }}
                                            >
                                                {message.content}
                                            </p>
                                        </div>
                                        <p style={{ fontSize: '10px', color: '#637381' }}>
                                            {new Date().toLocaleTimeString('en-US', {
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
                                            Host
                                        </p>
                                        <div
                                            style={{
                                                top: '629px',
                                                left: '596.56px',
                                                padding: '12px 20px',
                                                borderRadius: '0px 16px 16px 16px',
                                                gap: '10px',
                                                backgroundColor: '#F4F7FF',
                                            }}
                                            className="w-full md:w-[351px]"
                                        >
                                            <p style={{ fontSize: '14px', color: '#637381' }}>
                                                {message.content}
                                            </p>
                                        </div>
                                        <p
                                            style={{
                                                fontSize: '10px',
                                                color: '#637381',
                                            }}
                                        >
                                            {new Date().toLocaleTimeString('en-US', {
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
                        onClick={handleChatSubmit}
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
                </form>
            </Card>
        </Card>
    );
}
