"use client";
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useQueryClient } from "react-query";
import { updateClub } from '@/database/controllers/clubs';


type ConvocationProps = {
    club: {
        name: string;
        correspondant: {
            name: string;
            email: string;
            number: string;
        };
        _id: string;
    }

}

export default function ConvocationForm({ club }: Readonly<ConvocationProps>) {
    const [isEditing, setIsEditing] = useState(false);
    const formSchema = z.object({
        name: z.string().min(1, { message: "Le nom est requis." }),
        _id: z.string().min(1)
    });
    const queryClient = useQueryClient();
    type FormValues = z.infer<typeof formSchema>;
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: club.name,
            _id: club?._id
        },
    });

    const onSubmit = async (formData: FormValues) => {
        try {
            await updateClub({ _id: formData._id, name: formData.name });
            setIsEditing(false);
            queryClient.invalidateQueries('clubs');
        } catch (error) {
            console.error(error);
        }
        setIsEditing(false);
    };

    return { form, onSubmit, isEditing, setIsEditing }
}   