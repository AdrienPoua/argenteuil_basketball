"use server"
import { MemberService } from "@/database/services/Member"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { FormSchema } from "../schemas/form.schema"

const memberService = new MemberService()
const createMemberSchema = FormSchema.extend({
    image: z.string().optional()
})

const updateMemberSchema = FormSchema.extend({
    id: z.string(),
    image: z.string().optional()
})

export const createMember = async (data: z.infer<typeof createMemberSchema>) => {
    await memberService.createMember(data)
    revalidatePath("/dashboard/membres")
}

export const updateMember = async (data: z.infer<typeof updateMemberSchema>) => {
    await memberService.updateMember(data)
    revalidatePath("/dashboard/membres")
}

export const deleteMember = async (id: string) => {
    await memberService.deleteMember(id)
    revalidatePath("/dashboard/membres")
}