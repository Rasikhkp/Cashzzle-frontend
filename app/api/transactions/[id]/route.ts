import { NextRequest, NextResponse } from "next/server"

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const id = params.id
    const transaction = await req.json()

    await prisma?.transaction.update({
      where: { id },
      data: transaction
    })

    NextResponse.json({ success: true, message: "Transaction updated" })
  } catch (error: any) {
    console.log(error)
    NextResponse.json({ success: false, message: error })
  }
}

export const DELETE = async (_: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const id = params.id

    await prisma?.transaction.delete({
      where: { id },
    })

    NextResponse.json({ success: true, message: "Transaction deleted" })
  } catch (error: any) {
    console.log(error)
    NextResponse.json({ success: false, message: error })
  }
}
