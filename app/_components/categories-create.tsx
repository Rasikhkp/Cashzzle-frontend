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


const CategoriesCreate = () => {
    const form = useForm<TCreateCategoriesSchema>({
        resolver: zodResolver(createCategoriesSchema)
    })

    const onSubmit = () => { }

    return (
        <div>
            <Card className="absolute top-0 left-10 pt-6 w-80">
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex gap-5">
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

                                <CategoriesChooseIcon />
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

                            <Button
                                className="mt-3 w-full"
                            >
                                Create
                            </Button>

                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default CategoriesCreate
