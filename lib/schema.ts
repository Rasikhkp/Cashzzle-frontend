import { z } from "zod";

export const createTransactionSchema = z.object({
    description: z.string().min(1),
    price: z.number().min(1),
    type: z.enum(["income", "spending"]),
    category: z.string().min(1),
});

export type TCreateTransactionSchema = z.infer<typeof createTransactionSchema>;
