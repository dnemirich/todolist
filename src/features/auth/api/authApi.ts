import { instance } from "common/instance/instance"
import type { Response } from "common/types"
import { baseApi } from "../../../app/baseApi"
import type { LoginArgs } from "./authApi.types"

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<Response<{ id: number; email: string; login: string }>, void>({
      query: () => "auth/me",
    }),
    login: builder.mutation<Response<{ id: number; email: string; token: string }>, LoginArgs>({
      query: (args) => {
        return {
          method: "POST",
          url: "auth/login",
          body: args,
        }
      },
    }),
    logout: builder.mutation<Response, void>({
      query: () => {
        return {
          method: "DELETE",
          url: "auth/login",
        }
      },
    }),
  }),
})

export const { useMeQuery, useLoginMutation, useLogoutMutation } = authApi

export const _authApi = {
  login(args: LoginArgs) {
    return instance.post<Response<{ userId: number; token: string }>>(`auth/login`, args)
  },
  logout() {
    return instance.delete<Response>(`auth/login`)
  },
  me() {
    return instance.get<Response<{ id: number; email: string; login: string }>>("auth/me")
  },
}
