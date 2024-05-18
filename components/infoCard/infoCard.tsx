'use client';

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Card, CardTitle } from "../ui/card";
import { useEffect } from "react";
import { useUser } from "@/providers/context";

export function InfoCard() {
    const router = useRouter();
    const { mturkId, response, index } = useUser();
    const types = ['an expert in globalization research','an expert in globalization research', 'Generative AI', 'Generative AI']
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
                    You will be chatting with {type} to discuss the topic of globalization. Please click &quot;Next&quot; to continue to the chat page.
                </CardTitle>
            </div>
            <Button className="mt-5 mx-5 mb-5" variant="outline" onClick={nextButtonHandler}>Next</Button>
        </Card>
    )
}