'use client';

import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription } from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from '../ui/use-toast';
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

export function InfoCard() {
  const router = useRouter();
  const handleNextClick = () => {
      router.push('/chatbot');
  };
  const FormSchema = z.object({
    id: z.string().min(3, {
      message: 'Id must be at least 6 characters.',
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!data.id) return;
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Card className="w-full border md:border-[2px] flex-col items-center justify-center mb-10">
      <CardDescription className="font-semibold text-xl border-b md:border-b-0 mt-3 text-[#212B36] md:mx-5 pb-3 md:pb-0">
        Your Details
      </CardDescription>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#637381]">Mturk ID Number*</FormLabel>
                  <FormControl>
                    <Input
                      className="text-[#637381] border-0 md:border border-b"
                      placeholder="Enter Mturk ID Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <CardDescription className="font-semibold text-xl border-b md:border-b-0 mt-5 text-[#212B36] pb-3 md:pb-0">
          Answer the pre-interaction questions.
        </CardDescription>
        <Select>
          <SelectTrigger className="w-[600px] mt-5">
            <SelectValue placeholder="Indicate the extent you have felt this way at this moment." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="interested">Interested</SelectItem>
            <SelectItem value="distressed">Distressed</SelectItem>
            <SelectItem value="excited">Excited</SelectItem>
            <SelectItem value="upset">Upset</SelectItem>
            <SelectItem value="strong">Strong</SelectItem>
            <SelectItem value="guilty">Guilty</SelectItem>
            <SelectItem value="scared">Scared</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[600px] mt-5">
            <SelectValue placeholder="As the country globalizes, I believe there will be clear benefits locally." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="strongly disagree">Strongly disagree</SelectItem>
            <SelectItem value="moderately disagree">Moderately disagree</SelectItem>
            <SelectItem value="slightly disagree">Slightly disagree</SelectItem>
            <SelectItem value="neutral">Neutral</SelectItem>
            <SelectItem value="slightly agree">Slightly agree</SelectItem>
            <SelectItem value="moderately agree">Moderately agree</SelectItem>
            <SelectItem value="strongly agree">Strongly agree</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[600px] mt-5">
            <SelectValue placeholder="As a company globalizes, I believe there will be clear benefits to the local economy." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="strongly disagree">Strongly disagree</SelectItem>
            <SelectItem value="moderately disagree">Moderately disagree</SelectItem>
            <SelectItem value="slightly disagree">Slightly disagree</SelectItem>
            <SelectItem value="neutral">Neutral</SelectItem>
            <SelectItem value="slightly agree">Slightly agree</SelectItem>
            <SelectItem value="moderately agree">Moderately agree</SelectItem>
            <SelectItem value="strongly agree">Strongly agree</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[600px] mt-5">
            <SelectValue placeholder="As politics globalizes, I believe there will be clear benefits to local politics." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="strongly disagree">Strongly disagree</SelectItem>
            <SelectItem value="moderately disagree">Moderately disagree</SelectItem>
            <SelectItem value="slightly disagree">Slightly disagree</SelectItem>
            <SelectItem value="neutral">Neutral</SelectItem>
            <SelectItem value="slightly agree">Slightly agree</SelectItem>
            <SelectItem value="moderately agree">Moderately agree</SelectItem>
            <SelectItem value="strongly agree">Strongly agree</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[600px] mt-5">
            <SelectValue placeholder="As the society globalizes, I believe there will be clear benefits to local society." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="strongly disagree">Strongly disagree</SelectItem>
            <SelectItem value="moderately disagree">Moderately disagree</SelectItem>
            <SelectItem value="slightly disagree">Slightly disagree</SelectItem>
            <SelectItem value="neutral">Neutral</SelectItem>
            <SelectItem value="slightly agree">Slightly agree</SelectItem>
            <SelectItem value="moderately agree">Moderately agree</SelectItem>
            <SelectItem value="strongly agree">Strongly agree</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[600px] mt-5">
            <SelectValue placeholder="Globalization is positive for me." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="strongly disagree">Strongly disagree</SelectItem>
            <SelectItem value="moderately disagree">Moderately disagree</SelectItem>
            <SelectItem value="slightly disagree">Slightly disagree</SelectItem>
            <SelectItem value="neutral">Neutral</SelectItem>
            <SelectItem value="slightly agree">Slightly agree</SelectItem>
            <SelectItem value="moderately agree">Moderately agree</SelectItem>
            <SelectItem value="strongly agree">Strongly agree</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[600px] mt-5">
            <SelectValue placeholder="Globalization in economics is positive for me." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="strongly disagree">Strongly disagree</SelectItem>
            <SelectItem value="moderately disagree">Moderately disagree</SelectItem>
            <SelectItem value="slightly disagree">Slightly disagree</SelectItem>
            <SelectItem value="neutral">Neutral</SelectItem>
            <SelectItem value="slightly agree">Slightly agree</SelectItem>
            <SelectItem value="moderately agree">Moderately agree</SelectItem>
            <SelectItem value="strongly agree">Strongly agree</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[600px] mt-5">
            <SelectValue placeholder="Globalization in politics is positive for me." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="strongly disagree">Strongly disagree</SelectItem>
            <SelectItem value="moderately disagree">Moderately disagree</SelectItem>
            <SelectItem value="slightly disagree">Slightly disagree</SelectItem>
            <SelectItem value="neutral">Neutral</SelectItem>
            <SelectItem value="slightly agree">Slightly agree</SelectItem>
            <SelectItem value="moderately agree">Moderately agree</SelectItem>
            <SelectItem value="strongly agree">Strongly agree</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[600px] mt-5">
            <SelectValue placeholder="Globalization in society is positive for me." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="strongly disagree">Strongly disagree</SelectItem>
            <SelectItem value="moderately disagree">Moderately disagree</SelectItem>
            <SelectItem value="slightly disagree">Slightly disagree</SelectItem>
            <SelectItem value="neutral">Neutral</SelectItem>
            <SelectItem value="slightly agree">Slightly agree</SelectItem>
            <SelectItem value="moderately agree">Moderately agree</SelectItem>
            <SelectItem value="strongly agree">Strongly agree</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[600px] mt-5">
            <SelectValue placeholder="I think I will have much to gain from globalization." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="strongly disagree">Strongly disagree</SelectItem>
            <SelectItem value="moderately disagree">Moderately disagree</SelectItem>
            <SelectItem value="slightly disagree">Slightly disagree</SelectItem>
            <SelectItem value="neutral">Neutral</SelectItem>
            <SelectItem value="slightly agree">Slightly agree</SelectItem>
            <SelectItem value="moderately agree">Moderately agree</SelectItem>
            <SelectItem value="strongly agree">Strongly agree</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[600px] mt-5">
            <SelectValue placeholder="I think I will have much to gain from economic globalization." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="strongly disagree">Strongly disagree</SelectItem>
            <SelectItem value="moderately disagree">Moderately disagree</SelectItem>
            <SelectItem value="slightly disagree">Slightly disagree</SelectItem>
            <SelectItem value="neutral">Neutral</SelectItem>
            <SelectItem value="slightly agree">Slightly agree</SelectItem>
            <SelectItem value="moderately agree">Moderately agree</SelectItem>
            <SelectItem value="strongly agree">Strongly agree</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[600px] mt-5">
            <SelectValue placeholder="I think I will have much to gain from political globalization." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="strongly disagree">Strongly disagree</SelectItem>
            <SelectItem value="moderately disagree">Moderately disagree</SelectItem>
            <SelectItem value="slightly disagree">Slightly disagree</SelectItem>
            <SelectItem value="neutral">Neutral</SelectItem>
            <SelectItem value="slightly agree">Slightly agree</SelectItem>
            <SelectItem value="moderately agree">Moderately agree</SelectItem>
            <SelectItem value="strongly agree">Strongly agree</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[600px] mt-5">
            <SelectValue placeholder="I think I will have much to gain from social globalization." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="strongly disagree">Strongly disagree</SelectItem>
            <SelectItem value="moderately disagree">Moderately disagree</SelectItem>
            <SelectItem value="slightly disagree">Slightly disagree</SelectItem>
            <SelectItem value="neutral">Neutral</SelectItem>
            <SelectItem value="slightly agree">Slightly agree</SelectItem>
            <SelectItem value="moderately agree">Moderately agree</SelectItem>
            <SelectItem value="strongly agree">Strongly agree</SelectItem>
          </SelectContent>
        </Select>
        <Button className="mt-5" variant="outline" onClick={handleNextClick}>Next</Button>
      </CardContent>
    </Card>
  );
}
