import { NextRequest, NextResponse } from "next/server"

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const id = params.id
    const category = await req.json()

    await prisma?.category.update({
      where: { id },
      data: category
    })

    NextResponse.json({ success: true, message: "Category updated" })
  } catch (error: any) {
    console.log(error)
    NextResponse.json({ success: false, message: error })
  }
}

export const DELETE = async (_: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const id = params.id

    await prisma?.category.delete({
      where: { id },
    })

    NextResponse.json({ success: true, message: "Category deleted" })
  } catch (error: any) {
    console.log(error)
    NextResponse.json({ success: false, message: error })
  }
}
