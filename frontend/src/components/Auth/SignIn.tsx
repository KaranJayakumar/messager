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
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { RootState} from "@/redux/store"
import { currentUser, login } from "@/redux/Auth/Action"
const formSchema = z.object({
    email: z.string().email({
        message: "Invalid email",
    }),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
})
export const SignIn = () => {
    function onSubmit(values: z.infer<typeof formSchema>) {
        dispatch(login(values))
        console.log(values)
    }
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    const authState = useAppSelector((store: RootState) => store.auth)
    const token = localStorage.getItem("token")
    useEffect(() => {
        if (token) {
            dispatch(currentUser({ token: token }))
        }
    }, [token, dispatch])
    useEffect(() => {
        if (authState.reqUser?.fullName) {
            navigate("/")
        }
    }, [authState.reqUser, navigate])
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
