import { NextRequest, NextResponse } from "next/server"

export const DELETE = async (_: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const id = params.id

    await prisma?.spendingLimit.delete({
      where: { id },
    })

    NextResponse.json({ success: true, message: "Spending limit deleted" })
  } catch (error: any) {
    console.log(error)
    NextResponse.json({ success: false, message: error })
  }
}
