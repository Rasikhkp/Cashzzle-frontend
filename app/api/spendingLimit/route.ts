import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma"
import { category } from "@/lib/category";

export const GET = async (req: NextRequest) => {
  const userId = req.nextUrl.searchParams.get("userId") as string

  try {
    const spendingLimits = await prisma.spendingLimit.findMany({
      where: { userId }
    })

    return NextResponse.json({ success: true, message: spendingLimits })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ success: false, message: error })
  }

}

export const PUT = async (req: NextRequest) => {
  try {
    const spendingLimit = await req.json()

    await prisma.spendingLimit.upsert({
      where: { date: spendingLimit.date },
      create: spendingLimit,
      update: {
        date: spendingLimit.date,
        spendingLimit: spendingLimit.spendingLimit,
        userId: spendingLimit.userId
      }
    })

    return NextResponse.json({ success: true, message: "Spending limit created" })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ success: false, message: error })
  }
}
