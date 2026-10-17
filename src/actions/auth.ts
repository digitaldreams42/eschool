"use server"

import { client } from "@/lib/prisma"
import { getSession } from "@/lib/auth"

export const onAuthenticatedUser = async () => {
  try {
    const user = await getSession()
    if (!user) return { status: 404 }

    return {
      status: 200,
      id: user.id,
      image: user.image || "",
      username: `${user.firstname} ${user.lastname}`,
    }
  } catch (error) {
    return {
      status: 400,
    }
  }
}

export const onSignUpUser = async (data: {
  firstname: string
  lastname: string
  image: string
  email: string
  password: string
}) => {
  try {
    const { hashPassword } = await import("@/lib/auth")
    const passwordHash = await hashPassword(data.password)

    const createdUser = await client.user.create({
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        passwordHash,
        image: data.image || null,
      },
    })

    if (createdUser) {
      return {
        status: 200,
        message: "User successfully created",
        id: createdUser.id,
      }
    }

    return {
      status: 400,
      message: "User could not be created! Try again",
    }
  } catch (error) {
    return {
      status: 400,
      message: "Oops! something went wrong. Try again",
    }
  }
}

export const onSignInUser = async (email: string) => {
  try {
    const loggedInUser = await client.user.findUnique({
      where: { email },
      select: {
        id: true,
        group: {
          select: {
            id: true,
            channel: {
              select: {
                id: true,
              },
              take: 1,
              orderBy: {
                createdAt: "asc",
              },
            },
          },
        },
      },
    })

    if (loggedInUser) {
      if (loggedInUser.group.length > 0) {
        return {
          status: 207,
          id: loggedInUser.id,
          groupId: loggedInUser.group[0].id,
          channelId: loggedInUser.group[0].channel[0].id,
        }
      }

      return {
        status: 200,
        message: "User successfully logged in",
        id: loggedInUser.id,
      }
    }

    return {
      status: 400,
      message: "User could not be logged in! Try again",
    }
  } catch (error) {
    return {
      status: 400,
      message: "Oops! something went wrong. Try again",
    }
  }
}
