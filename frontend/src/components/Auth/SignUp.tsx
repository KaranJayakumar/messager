import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FaMessage } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
})
export const SignUp = () => {
    const navigate = useNavigate()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
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
                        <h1 className="text-3xl self-center">Sign Up</h1>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            This is your public display name.
                                        </FormDescription>
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
                                    Sign Up
                                </Button>
                                <p
                                    className="text-sm mt-7 cursor-pointer"
                                    onClick={() => navigate("/signin")}
                                >
                                    Already registered? Sign In
                                </p>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}
