'use client';

import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
import vector from '../../public/vector.svg';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Message } from '@/global';
import { useRouter } from 'next/navigation';
import { useUser } from '@/providers/context';
import { host1, host2, host3, setMessagesInDB } from '@/server-actions';

export function ChatbotCard() {

    const router = useRouter();
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([{ type: 'host', content: "Welcome to chat, let's discuss globalization." }]);
    const { response, mturkId } = useUser();
    const [selectedHostIndex, setSelectedHostIndex] = useState<number>(-1);

    useEffect(() => {
        if (!response || !mturkId) {
            router.push('/');
        }
    }, [response, mturkId]);

    useEffect(() => {
        if (selectedHostIndex === -1) {
            const randomIndex = Math.floor(Math.random() * hosts.length);
            setSelectedHostIndex(randomIndex);
        }
    }, [selectedHostIndex]);

    const hosts = [host1, host2, host3];
    const host = hosts[selectedHostIndex];
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    };

    const handleChatSubmit = async () => {
        const userMessage: Message = {
            type: 'user',
            content: inputText,
            userId: mturkId,
        };
        let updatedMessages = [...messages, userMessage];

        setLoading(true);
        try {
            const response: any = await host(inputText);
            const hostMessage: Message = {
                type: 'host',
                content: response?.res ?? '',
                userId: response.name,
            };
            console.log(response.name)
            updatedMessages = [...updatedMessages, hostMessage];
            await setMessagesInDB([userMessage, hostMessage]);
            setMessages(updatedMessages);
            setInputText('');
        } catch (error) {
            console.error('Error fetching data from OpenAI:', error);
            const errorMessage: Message = {
                type: 'host',
                content:
                    'An error occurred while fetching the response. Please try again.',
                userId: mturkId,
            };
            setMessages([...messages, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full border-0 md:border md:border-[2px] flex-col items-center justify-center mb-10">
            <Card className="w-full md:w-[650px] mt-10 mb-10 mx-auto border-0 md:border">
                <div className="flex items-center justify-between">
                    <CardTitle className="font-semibold mt-7 mb-7 text-[#212B36] md:mx-5">
                        Let's talk about globalization
                    </CardTitle>
                </div>
                <hr className="w-full mb-10" />
                <Card
                    style={{
                        border: 'solid white',
                        overflowY: 'auto',
                    }}
                    className="w-full md:w-[620px] h-[442px] mx-auto mb-5"
                >
                    <div className="flex flex-col space-y-5">
                        {messages?.map((message, index) => (
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
                        {loading && <p>Loading ...</p>}
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
                    />
                    <Button
                        style={{ backgroundColor: 'green' }}
                        className="md:mx-5"
                        type="submit"
                        onClick={handleChatSubmit}
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
