import { instance } from "common/instance/instance"
import type { Response } from "common/types"
import type { Inputs } from "../ui/Login/Login"

export const authApi = {
  login(args: Inputs) {
    return instance.post<Response<{ userId: number; token: string }>>(`auth/login`, args)
  },
  logout() {
    return instance.delete<Response>(`auth/login`)
  },
  me() {
    return instance.get<Response<{ id: number; email: string; login: string }>>("auth/me")
  },
}
