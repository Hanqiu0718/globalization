'use client';

import { Card, CardDescription } from '../ui/card';

export function InfoCard() {


  return (
    <form>
      <Card className="w-full border md:border-[2px] flex-col items-center justify-center mb-10">
        <CardDescription className="font-semibold text-xl border-b md:border-b-0 mt-3 text-[#212B36] md:mx-5 pb-3 md:pb-0">
          LinkedIn Profile Review
        </CardDescription>
        <CardDescription className="mt-10 text-[#212B36] md:px-5 md:mx-5">
          Upload your LinkedIn Profile to get it reviewed to best standard. You
          will get all the information on every area that needs to be adjusted
          at the end of the review.
        </CardDescription>
      </Card>
    </form>
  );
}
