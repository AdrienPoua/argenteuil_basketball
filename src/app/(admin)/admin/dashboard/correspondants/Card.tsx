import { ReactElement, useState } from "react";
import { Card, CardContent } from "@/components/ui/card"; // For club cards
import { Separator } from "@/components/ui/separator"; // For dividing content
import { Button } from "@/components/ui/button"; // Import Button component
import { Input } from "@/components/ui/input";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { updateClub, deleteClub } from "@/lib/mongo/controllers/clubs";
import { useQueryClient } from "react-query";


type ClubCardProps = {
    data: TClub
};

type TClub = {
    name: string;
    _id: string;
    correspondant: {
        name: string;
        email: string;
        number: string;
    };
}

export default function ClubCard({ data }: Readonly<ClubCardProps>): ReactElement {
    const [isEditing, setIsEditing] = useState(false);
    const queryClient = useQueryClient();
    return (
        <Card className="w-full p-6 border-2 border-primary rounded-lg relative font-secondary">
            <h3 className="text-center text-primary text-3xl font-bold">{data.name}</h3>
            <Separator className="my-4" />
            <CardContent className="flex gap-5">
                {data.correspondant && (
                    <>
                        {isEditing ? <EditingContent setIsEditing={setIsEditing} data={data} /> : <NotEditingContent correspondant={data.correspondant} />}
                    </>
                )}
                <div className="absolute top-5 right-5 flex gap-5">
                    <Button size={"lg"} onClick={() => setIsEditing((prev) => !prev)}> 📜 </Button>
                    <Button size={"lg"} onClick={() => { deleteClub(data._id); queryClient.invalidateQueries('clubs'); }}> ❌ </Button>
                </div>
        </CardContent>
        </Card >
    );
}

const NotEditingContent = ({ correspondant }: { correspondant: { email: string; number: string; name: string } }) => {
    return (
        <>
            <Button className="w-full">{correspondant.name}</Button>
            <Button className="w-full">{correspondant.email}</Button>
            <Button className="w-full">{correspondant.number}</Button>
        </>
    );
};

const EditingContent = ({ data, setIsEditing }: { data: TClub, setIsEditing: (x: boolean) => void }) => {
    const formSchema = z.object({
        name: z.string().min(1, { message: "Le nom est requis." }),
        email: z.string().email({ message: "Email invalide." }),
        number: z.string().min(8, { message: "Le numéro est requis." }), // Champ obligatoire
    });
    const queryClient = useQueryClient();
    type FormValues = z.infer<typeof formSchema>;
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: data.correspondant.email,
            number: data.correspondant.number,
            name: data.correspondant.name,
        },
    });
    const onSubmit = async (formData: FormValues) => {
        try {
            await updateClub({ ...data, correspondant: { ...formData } })
            setIsEditing(false)
            queryClient.invalidateQueries('clubs')
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full gap-10" >
                <div className="flex justify-around gap-5">
                    <FormField name="name" render={({ field }) => (
                        <FormItem className="text-background grow">
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>Modifier le nom</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField
                        name="email"
                        render={({ field }) => (
                            <FormItem className="text-background grow">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>Modifier l&apos;email</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="number"
                        render={({ field }) => (
                            <FormItem className="text-background grow">
                                <FormLabel>Numero</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>Modifier le numéro</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit">Valider</Button>
            </form>
        </Form>

    );
};