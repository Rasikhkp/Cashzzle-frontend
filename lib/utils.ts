import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const randomizeColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16)

export const randomizeNumber = (below: number, upper: number) => Math.floor(Math.random() * (upper - below + 1)) + below

export const formatToRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(amount);
};
