'use client';

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Card, CardTitle } from "../ui/card";
import { useEffect } from "react";
import { useUser } from "@/providers/context";

export function InfoCard() {
    const router = useRouter();
    const { mturkId, response, index } = useUser();
    const types = ['person who is an expert in globalization','person who is an expert in globalization', 'Generative AI that is an expert in globalization', 'Generative AI that is an expert in globalization']
    const type = types[index];

    useEffect(() => {
        if (!mturkId || !response) {
            router.push('/');
        }
    }, [mturkId, response, router]);

    const nextButtonHandler = () => {
        router.push('/chatbot');
    }

    return (
        <Card className="w-full border-0 md:border md:border-[2px] flex-col items-center justify-center mb-10">
            <div className="flex items-center justify-between">
                <CardTitle className="text-base mt-5 mb-5 text-[#212B36] md:mx-5">
                Now we have reached the part of the study in which you will be using an online chat to discuss globalization. 

                Your conversational partner for this discussion will be a <strong>{type}</strong>. 
                
                There will also be a timer robot that will monitor the conversation and let you know when it’s time to proceed to the next topic.
                
                Please click &quot;Next&quot; when you are ready to continue to the chat page.
                </CardTitle>
            </div>
            <Button className="mt-5 mx-5 mb-5" variant="outline" onClick={nextButtonHandler}>Next</Button>
        </Card>
    )
}