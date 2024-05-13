import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma"

export const POST = async (req: NextRequest) => {
  try {
    const categories = await req.json()

    if (!categories[0]) {
      return NextResponse.json({ success: true, message: categories })
    }

    await prisma.category.createMany({
      data: categories
    })

    return NextResponse.json({ success: true, message: categories })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ success: false, message: error })
  }

}
