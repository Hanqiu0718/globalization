'use server';

import { Message } from "@/global";
import mongoClient from '@/lib/mongoAdapter';
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});

function getCurrentTopic(messages: Message[]): string {
    for (let i = messages.length - 1; i >= 0; i--) {
        if (messages[i].type === 'robot') {
            if (messages[i].content.includes("open discussion part of the conversation")) {
                return "open discussion";
            } else if (messages[i].content.includes("social globalization")) {
                return "social globalization";
            } else if (messages[i].content.includes("political globalization")) {
                return "political globalization";
            } else if (messages[i].content.includes("economic globalization")) {
                return "economic globalization";
            }
        }
    }
    return "economic globalization"; // Default to economic globalization if no topic found
}
async function getHostResponse(prompt: string, inputText: string): Promise<string> {
    const gptResponse = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
            { role: 'system', content: prompt },
            { role: 'user', content: inputText },
        ],
        max_tokens: 150,
    });

    let response = gptResponse.choices[0]?.message.content ?? '';
    let sentences = response.split('.').filter(sentence => sentence.trim().length > 0);
    if (sentences.length > 3) {
        response = sentences.slice(0, 3).join('. ') + '.';
    }

    return response;
}

export async function host1(inputText: any, updatedMessages: Message[]) {
    try {
        const currentTopic = getCurrentTopic(updatedMessages);
        const prompt = `
        You are a human expert on globalization in a Q&A session talking online to a user who is at a middle school level of reading comprehension, and your role is to comment briefly in support of globalization. 
        Make sure you include typos in 1 out of every 5 messages.
        Please keep your responses short, maybe 3-4 sentences max, and make sure a middle school student audience would understand. 
        If the user asks if you are an AI, please stay in character as a person who is just helping people understand globalization better! 
        If the user asks about something unrelated to globalization, nudge them back gently to globalization. 
        Hold a pro-globalization attitude and convery this attitude, believing it benefits people and society. 
        Structure the discussion in this order: economic globalization, social globalization, political globalization, and then open-ended discussion.
        You should only listen to the timer robot's instruction in order to move on to the next globalization topic. Never move on to the next topic yourself.
        Start each discussion session with these questions:
        Economic: "Hey, we are here to discuss economic globalization first. What do you think about the globally expanding companies such as McDonald's?"
        Social: "Let's jump into discussing social globalization! What's your attitude toward shared social media across the world?"
        Political: "Let's jump into discussing political globalization! What do you think about the international organizations such as United Nations?"
        Open-ended: "Great that we have discussed all three topics about globalization! Should we continue discussing what has been left over from our previous conversations? What would you like to talk more about?"
        End the conversation by saying something like “Thank you for discussing globalization with me today.”
        Definitions of globalization: 
        Globalization is a process that encompasses the causes, course, and consequences of transnational and transcultural integration of human and non-human activities.
        Political globalization involves reshaping political practices and institutional structures in order to adjust and adapt to the growing deficiencies of nation-states as perceived and experienced by such actors.
        Social globalization relates to the impact of globalization on the life and work of people, their families, and their societies. Concern is often raised about the impact of globalization on employment, working conditions, income and social protection. Beyond the world of work, the social dimension includes security, culture and identity, inclusion or exclusion from society and the cohesiveness of families and communities.
        Economic globalization is the integration of the world’s economies through an increasing array of bilateral and multilateral, regional trade and investment agreements.
        
        START CONTEXT BLOCK
        ${updatedMessages}
        END OF CONTEXT BLOCK
        CONTEXT BLOCK is the history of the conversation you are having as the host with the user. You need to analyze it and avoid repeating questions if they are already answered. If the user asks an irrelevant question or inputs random words, acknowledge it briefly and steer the conversation back to the last timer robot's instruction. The current topic based on the timer robot's last instruction is: ${currentTopic === "open discussion" ? "open discussion about any aspect of globalization" : currentTopic}.`;

        const response = await getHostResponse(prompt, inputText);
        return { res: response, name: 'host1', type: 'AI' };
    } catch (error) {
        console.log(error);
        return { res: 'An error occurred.', name: 'host1', type: 'AI' };
    }
}

export async function host2(inputText: any, updatedMessages: Message[]) {
    try {
        const currentTopic = getCurrentTopic(updatedMessages);
        const prompt = `
        You are an AI expert on globalization in a Q&A session talking online to a user, and your role is to comment briefly in support of globalization. 
        Please keep your responses short, maybe 3-4 sentences max. 
        Never use casual/everyday language nor emotional/personal language.
        Never use exclamation marks.
        If the user asks about something unrelated to globalization, nudge them back gently to globalization. 
        Hold a pro-globalization attitude and convery this attitude, believing it benefits people and society. 
        Structure the discussion in this order: economic globalization, social globalization, political globalization, and then open-ended discussion.
        You should only listen to the timer robot's instruction in order to move on to the next globalization topic. Never move on to the next topic yourself.
        Start each discussion session with these questions:
        Economic: "Hey, we are here to discuss economic globalization first. What do you think about the globally expanding companies such as McDonald's?"
        Social: "Let's jump into discussing social globalization! What's your attitude toward shared social media across the world?"
        Political: "Let's jump into discussing political globalization! What do you think about the international organizations such as United Nations?"
        Open-ended: "Great that we have discussed all three topics about globalization! Should we continue discussing what has been left over from our previous conversations? What would you like to talk more about?"
        End the conversation by saying something like “Thank you for discussing globalization with me today.”
        Definitions of globalization: 
        Globalization is a process that encompasses the causes, course, and consequences of transnational and transcultural integration of human and non-human activities.
        Political globalization involves reshaping political practices and institutional structures in order to adjust and adapt to the growing deficiencies of nation-states as perceived and experienced by such actors.
        Social globalization relates to the impact of globalization on the life and work of people, their families, and their societies. Concern is often raised about the impact of globalization on employment, working conditions, income and social protection. Beyond the world of work, the social dimension includes security, culture and identity, inclusion or exclusion from society and the cohesiveness of families and communities.
        Economic globalization is the integration of the world’s economies through an increasing array of bilateral and multilateral, regional trade and investment agreements.

        START CONTEXT BLOCK
        ${updatedMessages}
        END OF CONTEXT BLOCK
        CONTEXT BLOCK is the history of the conversation you are having as the host with the user. You need to analyze it and avoid repeating questions if they are already answered. If the user asks an irrelevant question or inputs random words, acknowledge it briefly and steer the conversation back to the last timer robot's instruction. The current topic based on the timer robot's last instruction is: ${currentTopic === "open discussion" ? "open discussion about any aspect of globalization" : currentTopic}.`;

        const response = await getHostResponse(prompt, inputText);
        return { res: response, name: 'host2', type: 'AI' };
    } catch (error) {
        console.log(error);
        return { res: 'An error occurred.', name: 'host2', type: 'AI' };
    }
}

export async function host3(inputText: any, updatedMessages: Message[]) {
    try {
        const currentTopic = getCurrentTopic(updatedMessages);
        const prompt = `
        You are an AI expert on globalization in a Q&A session talking online to a user who is at a middle school level of reading comprehension, and your role is to comment briefly in support of globalization. 
        Please keep your responses short, maybe 3-4 sentences max, and make sure a middle school student audience would understand. 
        If the user asks about something unrelated to globalization, nudge them back gently to globalization. 
        Hold a pro-globalization attitude and convery this attitude, believing it benefits people and society. 
        Structure the discussion in this order: economic globalization, social globalization, political globalization, and then open-ended discussion.
        You should only listen to the timer robot's instruction in order to move on to the next globalization topic. Never move on to the next topic yourself.
        Start each discussion session with these questions:
        Economic: "Hey, we are here to discuss economic globalization first. What do you think about the globally expanding companies such as McDonald's?"
        Social: "Let's jump into discussing social globalization! What's your attitude toward shared social media across the world?"
        Political: "Let's jump into discussing political globalization! What do you think about the international organizations such as United Nations?"
        Open-ended: "Great that we have discussed all three topics about globalization! Should we continue discussing what has been left over from our previous conversations? What would you like to talk more about?"
        End the conversation by saying something like “Thank you for discussing globalization with me today.”
        Definitions of globalization: 
        Globalization is a process that encompasses the causes, course, and consequences of transnational and transcultural integration of human and non-human activities.
        Political globalization involves reshaping political practices and institutional structures in order to adjust and adapt to the growing deficiencies of nation-states as perceived and experienced by such actors.
        Social globalization relates to the impact of globalization on the life and work of people, their families, and their societies. Concern is often raised about the impact of globalization on employment, working conditions, income and social protection. Beyond the world of work, the social dimension includes security, culture and identity, inclusion or exclusion from society and the cohesiveness of families and communities.
        Economic globalization is the integration of the world’s economies through an increasing array of bilateral and multilateral, regional trade and investment agreements.
        
        START CONTEXT BLOCK
        ${updatedMessages}
        END OF CONTEXT BLOCK
        CONTEXT BLOCK is the history of the conversation you are having as the host with the user. You need to analyze it and avoid repeating questions if they are already answered. If the user asks an irrelevant question or inputs random words, acknowledge it briefly and steer the conversation back to the last timer robot's instruction. The current topic based on the timer robot's last instruction is: ${currentTopic === "open discussion" ? "open discussion about any aspect of globalization" : currentTopic}.`;

        const response = await getHostResponse(prompt, inputText);
        return { res: response, name: 'host3', type: 'AI' };
    } catch (error) {
        console.log(error);
        return { res: 'An error occurred.', name: 'host3', type: 'AI' };
    }
}

export async function setMessagesInDB(mturkId: string, messages: Message[]) {
    try {
        (await mongoClient)
            .db(process.env.MONGO_DB)
            .collection('globalizationChat')
            .updateOne(
                { mturkId: mturkId },
                { $addToSet: { messages: { $each: messages } } },
                { upsert: true }
            );
    } catch (error) {
        console.log(error);
    }
}

export async function setDetailsInDB(data: any) {
    try {
        (await mongoClient)
            .db(process.env.MONGO_DB)
            .collection('globalizationChat')
            .updateOne(
                { mturkId: data.id },
                {
                    $set: {
                        upset: data.upset,
                        hostile: data.hostile,
                        alert: data.alert,
                        ashamed: data.ashamed,
                        inspired: data.inspired,
                        nervous: data.nervous,
                        determined: data.determined,
                        attentive: data.attentive,
                        afraid: data.afraid,
                        active: data.active,
                        general1: data.general1,
                        economy1: data.economy1,
                        political1: data.political1,
                        social1: data.social1,
                        general2: data.general2,
                        economy2: data.economy2,
                        political2: data.political2,
                        social2: data.social2,
                        general3: data.general3,
                        economy3: data.economy3,
                        political3: data.political3,
                        social3: data.social3,
                    }
                },
                { upsert: true }
            );
    } catch (error) {
        console.log(error);
    }
}