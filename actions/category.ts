"use server"

import { prisma } from "@/lib/db"

export const insertToCategory = async (data: any) => {
    const inserted = await prisma.category.create({
        data
    })

    return { success: true, message: inserted }
}
