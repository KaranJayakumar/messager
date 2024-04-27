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
import { register } from "@/redux/Auth/Action"
import { useAppDispatch } from "@/redux/hooks"
const formSchema = z.object({
    email: z.string().email({
        message: "Invalid email",
    }),
    fullName: z.string().min(2, {
        message: "Full name must be at least 4 characters",
    }),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
})
export const SignUp = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            fullName: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        dispatch(register(values))
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
                            className="space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Your name here"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
