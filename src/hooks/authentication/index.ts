"use client"

import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { z } from "zod"
import { SignInSchema } from "@/components/forms/sign-in/schema"
import { SignUpSchema } from "@/components/forms/sign-up/schema"

export const useAuthSignIn = () => {
  const { refresh } = useAuth()
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    mode: "onBlur",
  })

  const router = useRouter()

  const onAuthenticate = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok) {
        reset()
        await refresh()
        toast("Success", {
          description: "Welcome back!",
        })
        router.push("/callback/sign-in")
      } else {
        toast("Error", {
          description: data.error || "Email/password is incorrect, try again",
        })
      }
    } catch {
      toast("Error", {
        description: "Something went wrong",
      })
    }
  }

  const { mutate: InitiateLoginFlow, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      onAuthenticate(email, password),
  })

  const onAuthenticateUser = handleSubmit(async (values) => {
    InitiateLoginFlow({ email: values.email, password: values.password })
  })

  return {
    onAuthenticateUser,
    isPending,
    register,
    errors,
  }
}

export const useAuthSignUp = () => {
  const { refresh } = useAuth()
  const [creating, setCreating] = useState<boolean>(false)
  const [verifying, setVerifying] = useState<boolean>(false)
  const [code, setCode] = useState<string>("")
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    getValues,
  } = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    mode: "onBlur",
  })

  const router = useRouter()

  const onGenerateCode = async (email: string, password: string) => {
    if (email && password) {
      setVerifying(true)
    } else {
      return toast("Error", {
        description: "No fields must be empty",
      })
    }
  }

  const onInitiateUserRegistration = handleSubmit(async (values) => {
    try {
      setCreating(true)
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
          password: values.password,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        reset()
        await refresh()
        toast("Success", {
          description: "Account created successfully!",
        })
        router.push("/group/create")
      } else {
        toast("Error", {
          description: data.error || "Something went wrong",
        })
      }
      setCreating(false)
      setVerifying(false)
    } catch {
      setCreating(false)
      toast("Error", {
        description: "Something went wrong",
      })
    }
  })

  return {
    register,
    errors,
    onGenerateCode,
    onInitiateUserRegistration,
    verifying,
    creating,
    code,
    setCode,
    getValues,
  }
}

export const useGoogleAuth = () => {
  const signInWith = () => {
    window.location.href = "/api/auth/google"
  }

  const signUpWith = () => {
    window.location.href = "/api/auth/google"
  }

  return { signUpWith, signInWith }
}
