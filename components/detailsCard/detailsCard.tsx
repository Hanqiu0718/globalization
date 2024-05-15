'use client';

import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription } from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useUser } from '@/providers/context';
import { useEffect } from 'react';

export function DetailsCard() {
  const router = useRouter();
  const { response, setMturkId, setIndex } = useUser();
  const randomIndex = Math.floor(Math.random() * 3);

  useEffect(() => {
    if (!response) {
      router.push('/');
    }
  }, [response, router]);

  const FormSchema = z.object({
    id: z.string().min(3, {
      message: 'Please enter your Mturk ID',
    }),
    select1: z.string().min(3, {
      message: 'Please select an option',
    }),
    select2: z.string().min(3, {
      message: 'Please select an option',
    }),
    select3: z.string().min(3, {
      message: 'Please select an option',
    }),
    select4: z.string().min(3, {
      message: 'Please select an option',
    }),
    select5: z.string().min(3, {
      message: 'Please select an option',
    }),
    select6: z.string().min(3, {
      message: 'Please select an option',
    }),
    select7: z.string().min(3, {
      message: 'Please select an option',
    }),
    select8: z.string().min(3, {
      message: 'Please select an option',
    }),
    select9: z.string().min(3, {
      message: 'Please select an option',
    }),
    select10: z.string().min(3, {
      message: 'Please select an option',
    }),
    select11: z.string().min(3, {
      message: 'Please select an option',
    }),
    select12: z.string().min(3, {
      message: 'Please select an option',
    }),
    select13: z.string().min(3, {
      message: 'Please select an option',
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: '',
      select1: '',
      select2: '',
      select3: '',
      select4: '',
      select5: '',
      select6: '',
      select7: '',
      select8: '',
      select9: '',
      select10: '',
      select11: '',
      select12: '',
      select13: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setMturkId(data.id);
    setIndex(randomIndex);
    router.push('/info');
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
                  <FormLabel className="text-[#212B36]">Mturk ID*</FormLabel>
                  <FormControl>
                    <Input
                      className="text-[#212B36]"
                      placeholder="Enter Mturk ID"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardDescription className="font-semibold text-xl border-b md:border-b-0 mt-5 text-[#212B36] pb-3 md:pb-0">
              Answer the pre-interaction questions.
            </CardDescription>
            <FormField
              control={form.control}
              name="select1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#212B36]">Indicate the extent you have felt this way at this moment.</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-[600px] mt-5">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="select2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#212B36]">As the country globalizes, I believe there will be clear benefits locally.</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-[600px] mt-5">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="select3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#212B36]">As a company globalizes, I believe there will be clear benefits to the local economy.</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-[600px] mt-5">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="select4"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#212B36]">As politics globalizes, I believe there will be clear benefits to local politics.</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-[600px] mt-5">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="select5"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#212B36]">As the society globalizes, I believe there will be clear benefits to local society.</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-[600px] mt-5">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="select6"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#212B36]">Globalization is positive for me.</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-[600px] mt-5">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="select7"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#212B36]">Globalization in economics is positive for me.</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-[600px] mt-5">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="select8"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#212B36]">Globalization in politics is positive for me.</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-[600px] mt-5">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="select9"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#212B36]">Globalization in society is positive for me.</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-[600px] mt-5">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="select10"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#212B36]">I think I will have much to gain from globalization.</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-[600px] mt-5">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="select11"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#212B36]">I think I will have much to gain from economic globalization.</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-[600px] mt-5">
                        <SelectValue placeholder="Selecct an option" />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="select12"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#212B36]">I think I will have much to gain from political globalization.</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-[600px] mt-5">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="select13"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#212B36]">I think I will have much to gain from social globalization.</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-[600px] mt-5">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-5" variant="outline" type="submit">Next</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
