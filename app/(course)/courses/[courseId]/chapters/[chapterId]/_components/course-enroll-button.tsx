"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { useRouter } from "next/router";
import { db } from "@/lib/db";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

export const CourseEnrollButton = ({
  price,
  courseId,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  // const router = useRouter(); // Initialize useRouter within the component


  const onClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`/api/courses/${courseId}/checkout`)

      // window.location.assign(response.data.url);
      console.log("clicked enroll")
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  // const handleEnrollClick = async () => {
  //   try {
  //     setIsLoading(true);

  //     // Navigate to the checkout page
  //     router.push(`/checkout?courseId=${courseId}`);

  //     console.log("Clicked enroll");
  //   } catch (error) {
  //     console.error("Error while navigating to checkout:", error);
  //     toast.error("Something went wrong");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size="sm"
      className="w-full md:w-auto"
    >
      Enroll for {formatPrice(price)}
    </Button>
  )
}