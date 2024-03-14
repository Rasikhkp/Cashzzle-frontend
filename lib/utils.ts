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

export const getFromLS = (key: string) => {
    const data = localStorage.getItem(key)

    if (!data) return null

    return JSON.parse(data)
}

export const addToLS = (key: string, newData: any) => {
    const data = getFromLS(key)

    if (data) {
        data.push(newData)

        localStorage.setItem(key, JSON.stringify(data))
    } else {
        localStorage.setItem(key, JSON.stringify([newData]))
    }
}

export const deleteFromLS = (key: string, id: string) => {
    const data = getFromLS(key)
    const filtered = data.filter((e: any) => e.id !== id)

    localStorage.setItem(key, JSON.stringify(filtered))
}

export const updateLS = (key: string, newData: any) => {
    const data = getFromLS(key)
    const updated = data.map((e: any) => {
        if (e.id === newData.id) {
            return { id: e.id, name: newData.name, icon: newData.icon }
        } else {
            return e
        }
    })

    localStorage.setItem(key, JSON.stringify(updated))
}
