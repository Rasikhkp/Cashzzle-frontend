import { EB_Garamond, Poppins } from "next/font/google"; import "./globals.css";


export const poppins = Poppins({
    weight: ['400', '500', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
})

export const garamond = EB_Garamond({
    weight: ['400', '500', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
})


