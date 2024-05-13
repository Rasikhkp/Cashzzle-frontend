import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma"
import { spendingLimit } from "@/lib/spending-limit";

export const POST = async (req: NextRequest) => {
  try {
    const spendingLimits = await req.json()

    if (!spendingLimits[0]) {
      return NextResponse.json({ success: true, message: spendingLimits })
    }

    await prisma.spendingLimit.createMany({
      data: spendingLimits
    })

    return NextResponse.json({ success: true, message: spendingLimits })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ success: false, message: error })
  }

}
