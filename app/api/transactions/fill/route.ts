import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma"

export const POST = async (req: NextRequest) => {
  try {
    const transactions = await req.json()

    if (!transactions[0]) {
      return NextResponse.json({ success: true, message: transactions })
    }

    await prisma.transaction.createMany({
      data: transactions
    })

    return NextResponse.json({ success: true, message: transactions })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ success: false, message: error })
  }

}
