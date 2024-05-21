'use client';

import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription } from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useUser } from '@/providers/context';
import { useEffect } from 'react';

export function DetailsCard() {
  const router = useRouter();
  const { response, setMturkId, setIndex } = useUser();
  const randomIndex = Math.floor(Math.random() * 4);

  useEffect(() => {
    if (!response) {
      router.push('/');
    }
  }, [response, router]);

  const FormSchema = z.object({
    id: z.string().min(3, { message: 'Please enter your Mturk ID' }),
    upset: z.string().min(1, { message: 'Please select an option' }),
    hostile: z.string().min(1, { message: 'Please select an option' }),
    alert: z.string().min(1, { message: 'Please select an option' }),
    ashamed: z.string().min(1, { message: 'Please select an option' }),
    inspired: z.string().min(1, { message: 'Please select an option' }),
    nervous: z.string().min(1, { message: 'Please select an option' }),
    determined: z.string().min(1, { message: 'Please select an option' }),
    attentive: z.string().min(1, { message: 'Please select an option' }),
    afraid: z.string().min(1, { message: 'Please select an option' }),
    active: z.string().min(1, { message: 'Please select an option' }),
    general1: z.string().min(1, { message: 'Please select an option' }),
    economy1: z.string().min(1, { message: 'Please select an option' }),
    political1: z.string().min(1, { message: 'Please select an option' }),
    social1: z.string().min(1, { message: 'Please select an option' }),
    general2: z.string().min(1, { message: 'Please select an option' }),
    economy2: z.string().min(1, { message: 'Please select an option' }),
    political2: z.string().min(1, { message: 'Please select an option' }),
    social2: z.string().min(1, { message: 'Please select an option' }),
    general3: z.string().min(1, { message: 'Please select an option' }),
    economy3: z.string().min(1, { message: 'Please select an option' }),
    political3: z.string().min(1, { message: 'Please select an option' }),
    social3: z.string().min(1, { message: 'Please select an option' }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: '',
      upset: '',
      hostile: '',
      alert: '',
      ashamed: '',
      inspired: '',
      nervous: '',
      determined: '',
      attentive: '',
      afraid: '',
      active: '',
      general1: '',
      economy1: '',
      political1: '',
      social1: '',
      general2: '',
      economy2: '',
      political2: '',
      social2: '',
      general3: '',
      economy3: '',
      political3: '',
      social3: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setMturkId(data.id);
    setIndex(randomIndex);
    router.push('/info');
  }

  const emotionFields = [
    'upset', 'hostile', 'alert', 'ashamed', 'inspired', 'nervous',
    'determined', 'attentive', 'afraid', 'active'
  ];

  const globalizationFields = [
    { key: 'general1', label: 'As the country globalizes, I believe there will be clear benefits locally' },
    { key: 'economy1', label: 'As a company globalizes, I believe there will be clear benefits to the local economy' },
    { key: 'political1', label: 'As politics globalizes, I believe there will be clear benefits to local politics' },
    { key: 'social1', label: 'As the society globalizes, I believe there will be clear benefits to local society' },
    { key: 'general2', label: 'Globalization is positive for me' },
    { key: 'economy2', label: 'Globalization in economics is positive for me' },
    { key: 'political2', label: 'Globalization in politics is positive for me' },
    { key: 'social2', label: 'Globalization in society is positive for me' },
    { key: 'general3', label: 'I think I will have much to gain from globalization' },
    { key: 'economy3', label: 'I think I will have much to gain from economic globalization' },
    { key: 'political3', label: 'I think I will have much to gain from political globalization' },
    { key: 'social3', label: 'I think I will have much to gain from social globalization' },
  ];

  return (
    <Card className="w-full border md:border-[2px] flex-col items-center justify-center mb-10">
      <CardDescription className="font-semibold text-xl border-b md:border-b-0 mt-3 text-[#212B36] md:mx-5 pb-3 md:pb-0">
        Your Details
      </CardDescription>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-[#212B36] text-sm">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mturk ID*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Mturk ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardDescription className="font-semibold text-lg border-b md:border-b-0 mt-5 pb-3 md:pb-0">
              Please answer the following questions before starting the discussion.
            </CardDescription>

            {/* Current Emotions */}
            <FormItem>
              <FormLabel className="font-bold">
                Thinking about yourself and how you feel at this moment, to what extent do you feel the following now:
              </FormLabel>
              <table className="w-full text-xs border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300"></th>
                    <th className="font-normal border border-gray-300">Very slightly or not at all</th>
                    <th className="font-normal border border-gray-300">A little</th>
                    <th className="font-normal border border-gray-300">Moderately</th>
                    <th className="font-normal border border-gray-300">Quite a bit</th>
                    <th className="font-normal border border-gray-300">Extremely</th>
                  </tr>
                </thead>
                <tbody>
                  {emotionFields.map((emotion, index) => (
                    <tr key={emotion} className={`${index < 9 ? 'border-b border-gray-300' : ''} mb-8`} style={{ height: '30px' }}>
                      <td className="border border-gray-300 text-center">{emotion.charAt(0).toUpperCase() + emotion.slice(1)}</td>
                      {['very slightly or not at all', 'a little', 'moderately', 'quite a bit', 'extremely'].map((value) => (
                        <td key={value} className="text-center border border-gray-300">
                          <FormField
                            control={form.control}
                            name={emotion as keyof z.infer<typeof FormSchema>}
                            render={({ field }) => (
                              <>
                              <FormControl>
                                <input
                                  type="radio"
                                  name={field.name}
                                  value={value}
                                  checked={field.value === value}
                                  onChange={() => field.onChange(value)}
                                  className="mx-auto"
                                />
                              </FormControl>
                              <FormMessage />
                              </>
                            )}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </FormItem>

            {/* Globalization */}
            <FormItem>
              <FormLabel className="font-bold">
                To what extent do you agree with the following:
              </FormLabel>
              <table className="w-full text-xs border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300"></th>
                    <th className="font-normal border border-gray-300">Strongly disagree</th>
                    <th className="font-normal border border-gray-300">Moderately disagree</th>
                    <th className="font-normal border border-gray-300">Neither agree nor disagree</th>
                    <th className="font-normal border border-gray-300">Moderately agree</th>
                    <th className="font-normal border border-gray-300">Strongly agree</th>
                  </tr>
                </thead>
                <tbody>
                  {globalizationFields.map((field, index) => (
                    <tr key={field.key} className={`${index < 11 ? 'border-b border-gray-300' : ''} mb-8`} style={{ height: '30px' }}>
                      <td className="border border-gray-300 text-left">{field.label}</td>
                      {['strongly disagree', 'moderately disagree', 'neither agree nor disagree', 'moderately agree', 'strongly agree'].map((value) => (
                        <td key={value} className="text-center border border-gray-300">
                          <FormField
                            control={form.control}
                            name={field.key as keyof z.infer<typeof FormSchema>}
                            render={({ field }) => (
                              <>
                              <FormControl>
                                <input
                                  type="radio"
                                  name={field.name}
                                  value={value}
                                  checked={field.value === value}
                                  onChange={() => field.onChange(value)}
                                  className="mx-auto"
                                />
                              </FormControl>
                              <FormMessage />
                              </>
                            )}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </FormItem>

            <Button className="mt-5" variant="outline" type="submit">Next</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
