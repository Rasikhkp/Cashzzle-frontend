export type TransactionType = {
  id?: string
  categoryId?: string
  description: string
  price: string
  type: "spending" | "income"
  time: Date
  userId?: string
}

export type CategoryType = {
  id: string
  name: string
  icon: string
}

export type UserType = {
  id: string
  email: string
  name: string
  password: string
  picture?: string
}