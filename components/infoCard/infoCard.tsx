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
                    You will be chatting with <strong>{type}</strong> to discuss your incident. Please read the following instructions carefully.<br /><br /><br />
                    <strong>Instructions for Structured Discussion:</strong><br /><br />

                    Start Message: We randomly assigned your discussion partner to start the conversation.<br /><br />
                    Send your message: Please note that <strong>you can only send one message at a time</strong>, so each time when it is your turn to send a message, please type all you want to say in one message for better experience.<br /><br />
                    Wait for a Reply: After sending your message, please wait for your partner to respond before you send another.<br /><br />
                    Three topics of globalization: You and the discussion partner will discuss three topics of globalization in order: <strong>economics globalization, social globalization, and political globalization</strong>.<br /><br />
                    Complete <strong>1 minute in total of typing time for each topic</strong>: For each topic of globalization discussion, you will need to type for 1 minute in total, no matter the number of exchanged messages, in order to proceed to the next topic.<br /><br />
                    Proceed to Open Discussion: Once you have completed discussing the three topics, you can move to the open discussion phase.<br /><br /><br />
                   
                    <strong>Instructions for Open Discussion:</strong><br /><br />

                    Two-minute typing time at most: In the open discussion, you have two minutes of typing time at most.<br /><br />
                    End Anytime: You can end the discussion at any time if you feel the conversation has concluded.<br /><br /><br />
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
