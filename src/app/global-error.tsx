"use client";
import { Button } from "#/components/ui/button";
import { Card } from "#/components/ui/card";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";

export default function GlobalError() {
  return (
    <div className="w-screen h-screen justify-center flex items-center">
      <Card className="flex gap-10 ">
        <div className="text-center text-4xl font-bold text-white pt-20">
          <div className="text-primary-500 text-8xl">404</div>
          <div>Oops Something went Wrong!</div>
          <Link href="/">
            <Button color="primary" className="mt-7">
              <ArrowBigLeft />
              back to Home
            </Button>
          </Link>
        </div>
        <div className="bg-[url('/servererror.png')] bg-cover bg-center w-[30vw] h-[50vh] opacity-50"></div>
      </Card>
    </div>
  );
}
