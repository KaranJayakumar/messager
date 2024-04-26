import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FaMessage } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
const formSchema = z.object({
    email: z.string().email({
        message: "Invalid email",
    }),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
})
export const SignIn = () => {
    const navigate = useNavigate()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }
    return (
        <div>
            <div className="flex justify-center h-screen items-center">
                <div className="w-[30%] p-10 shadow-md flex flex-col">
                    <Form {...form}>
                        <FaMessage className="w-20 h-20 my-7 self-center" />
                        <h1 className="text-3xl self-center my-4">Login</h1>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="w-full flex flex-col justify-center items-center">
                                <Button
                                    type="submit"
                                    className="rounded-full w-full"
                                >
                                    Login
                                </Button>
                                <p
                                    className="text-sm mt-7 cursor-pointer"
                                    onClick={() => navigate("/signup")}
                                >
                                    Haven't registered yet? Sign Up
                                </p>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}
