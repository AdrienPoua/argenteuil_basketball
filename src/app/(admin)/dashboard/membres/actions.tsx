"use server"
import { MemberService } from "@/database/services/Member"
import { z } from "zod"
import { FormSchema } from "./Form"

const memberService = new MemberService()

export const createMember = async (data: z.infer<typeof FormSchema>) => {
    const result = await memberService.createMember(data)
    console.log("🚀 ~ createMember ~ result:", result)
}

export const updateMember = async (data: z.infer<typeof FormSchema>) => {
    await memberService.updateMember(data)
}


