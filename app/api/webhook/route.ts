import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";

// export async function POST(req: Request) {
//   const body = await req.text();
//   const signature = headers().get("Stripe-Signature") as string;

//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       body,
//       signature,
//       process.env.STRIPE_WEBHOOK_SECRET!
//     )
//   } catch (error: any) {
//     return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
//   }

//   const session = event.data.object as Stripe.Checkout.Session;
//   const userId = session?.metadata?.userId;
//   const courseId = session?.metadata?.courseId;

//   if (event.type === "checkout.session.completed") {
//     if (!userId || !courseId) {
//       return new NextResponse(`Webhook Error: Missing metadata`, { status: 400 });
//     }

//     await db.purchase.create({
//       data: {
//         courseId: courseId,
//         userId: userId,
//       }
//     });
//   } else {
//     return new NextResponse(`Webhook Error: Unhandled event type ${event.type}`, { status: 200 })
//   }

//   return new NextResponse(null, { status: 200 });
// }

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();

    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      }
    });

    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: params.courseId
        }
      }
    });

    if (purchase) {
      return new NextResponse("Already purchased", { status: 400 });
    }

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    // Instead of creating a Stripe session, you can directly enroll the user in the course here.
    // You might need to write custom logic based on your application requirements.
    const newPurchase = await db.purchase.create({
      data: {
        courseId: params.courseId,
        userId: user.id,
      },
    });
    newPurchase()
    // Return a response indicating successful enrollment.
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("[COURSE_ID_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}
