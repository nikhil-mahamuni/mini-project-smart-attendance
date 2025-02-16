"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {


  
  return (



    <>
    Welcome Page
    <Link href='/auth'>
    <Button>Login</Button>
    </Link>
    </>
  );
}
