import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma"

export const GET = async (req: NextRequest) => {
  const userId = req.nextUrl.searchParams.get("userId") as string

  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId }
    })

    return NextResponse.json({ success: true, message: transactions })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ success: false, message: error })
  }

}

export const POST = async (req: NextRequest) => {
  try {
    const transaction = await req.json()
    console.log("transaction", transaction)

    await prisma.transaction.create({
      data: transaction
    })

    return NextResponse.json({ success: true, message: "Transaction created" })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ success: false, message: error })
  }
}
