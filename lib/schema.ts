import { z } from "zod";

export const createTransactionSchema = z.object({
    description: z.string().min(1),
    price: z.string().min(1),
    type: z.enum(["income", "spending"]),
    category: z.string().optional(),
});

export const createCategoriesSchema = z.object({
    name: z.string().min(1),
    icon: z.string().min(1),
});

export const overviewSchema = z.object({
    amount: z.string().min(1)
})

export type TCreateTransactionSchema = z.infer<typeof createTransactionSchema>;
export type TCreateCategoriesSchema = z.infer<typeof createCategoriesSchema>;
export type TOverviewSchema = z.infer<typeof overviewSchema>;
