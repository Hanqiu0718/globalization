'use client';

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Card, CardTitle } from "../ui/card";
import { useEffect, useState  } from "react";
import { useUser } from "@/providers/context";

export function InfoCard() {
    const router = useRouter();
    const { mturkId, response, index } = useUser();
    const types = ['another person who is an expert in globalization', 'a specialized AI in globalization', 'a specialized AI in globalization']
    const type = types[index];
    const [partner, setPartner] = useState('');

    useEffect(() => {
        if (!mturkId || !response) {
            router.push('/');
        }
    }, [mturkId, response, router]);

    const nextButtonHandler = () => {
        if (partner.trim() !== '') {
            router.push('/chatbot');
        } else {
            alert('Please answer the question about your discussion partner before continuing.');
        }
    };

    return (
        <Card className="w-full border-0 md:border md:border-[2px] flex-col items-center justify-center mb-10">
            <div className="mt-3 mx-5">
                <CardTitle className="block text-sm font-medium text-[#212B36]">
                    You will be chatting with <strong>{type}</strong> to discuss your incident.<br /><br /> 
                    Please read the following instructions thoroughly, as they are very important for the conversation you are about to have.<br /><br /><br />
                    <strong>Instructions for Structured Discussion:</strong><br /><br />

                    We have randomly assigned your discussion partner to start the conversation.<br /><br />
                    Please note that each of you can only send <strong>one message</strong> at a time, so whenever it is your turn to send a message, please type all you want to say in one message, without hitting return. <br /><br />
                    After sending your message, you will not be able to send another until your discussion partner replies. <br /><br />
                    You and the discussion partner will discuss <strong>three</strong> topics of globalization in order: economics globalization, social globalization, and political globalization.<br /><br />
                    You will need to have several rounds of conversation with your discussion partner for each topic. The timer robot will let you know when it is time to move on to the next topic.<br /><br />
                    Once you have discussed the three topics, the open discussion phase of the conversation will start. During the open discussion you will have additional time to talk with your discussion partner, but you can also end the discussion at any time if you feel the conversation has concluded.<br /><br /><br />
                    </CardTitle>
            </div>
            <div className="mt-3 mx-5">
                <label htmlFor="partnerInput" className="block text-sm font-medium text-[#212B36]">
                Now, answer the following question and click &quot;Next&quot; to continue to the chat page.<br /><br /> 
                <strong>According to the instruction above, who are you chatting with?</strong>
                </label>
                <input
                    type="text"
                    id="partnerInput"
                    className="mt-1 block w-full px-3 py-2 border border-[#CBD5E1] shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Type your answer here..."
                    value={partner}
                    onChange={(e) => setPartner(e.target.value)}
                />
            </div>
            <Button className="mt-5 mx-5 mb-5" variant="outline" onClick={nextButtonHandler}>Next</Button>
        </Card>
    );
}
