import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { TCreateCategoriesSchema, createCategoriesSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import CategoriesChooseIcon from "./categories-choose-icon";
import { insertToCategory } from "@/actions/category";
import { Toaster, toast } from "sonner";
import { useDispatch } from "react-redux";
import { addToCategories, updateCategory } from "@/redux/features/categories-slice";
import food from "@/public/icons/food.svg"
import { addToLS, updateLS } from "@/lib/utils";
import { nanoid } from "nanoid"
import { useEffect, useRef } from "react";


const CategoriesCreateEdit = ({ type, className, setOpen, data }: { type: "create" | "update"; className?: string; setOpen?: any; data?: any }) => {
    const dispatch = useDispatch()
    const categoryCreateEditRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.addEventListener("click", (e) => {
            if (categoryCreateEditRef?.current && !categoryCreateEditRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        })
    }, [])

    const form = useForm<TCreateCategoriesSchema>({
        resolver: zodResolver(createCategoriesSchema),
        defaultValues: {
            name: type === "create" ? "" : data.name,
            icon: type === "create" ? food.src : data.icon
        }
    })

    const onSubmit = async (values: TCreateCategoriesSchema) => {
        if (type === "create") {
            const newData = { ...values, id: nanoid() }

            dispatch(addToCategories(newData))
            addToLS("categories", newData)

            form.reset()
        } else {
            const newData = { ...values, id: data.id }
            dispatch(updateCategory(newData))
            updateLS("categories", newData)
            setOpen(false)
        }
    }

    return (
        <div className="z-20" ref={categoryCreateEditRef}>
            <Toaster />
            <Card className={`${className} pt-6 w-fit`}>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex gap-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="Belanja"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-start" />
                                        </FormItem>
                                    )}
                                />

                                <CategoriesChooseIcon setValue={form.setValue} />
                            </div>

                            <FormField
                                control={form.control}
                                name="icon"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="hidden"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <div className="flex gap-3 w-60 mt-3">
                                {type !== "create" ? (
                                    <Button className="w-full" variant={"destructive"} onClick={() => setOpen(false)} type="button">
                                        Cancel
                                    </Button>
                                ) : null}

                                <Button
                                    className="w-full"
                                >
                                    {type === "create" ? "Create" : "Update"}
                                </Button>
                            </div>


                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default CategoriesCreateEdit
