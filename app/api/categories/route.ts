import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma"

export const GET = async (req: NextRequest) => {
  const userId = req.nextUrl.searchParams.get("userId") as string

  try {
    const categories = await prisma.category.findMany({
      where: { userId }
    })

    return NextResponse.json({ success: true, message: categories })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ success: false, message: error })
  }

}

export const POST = async (req: NextRequest) => {
  try {
    const category = await req.json()

    await prisma.category.create({
      data: category
    })

    return NextResponse.json({ success: true, message: "Category created" })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ success: false, message: error })
  }
}
