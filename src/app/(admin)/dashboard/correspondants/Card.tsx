import { ReactElement, useState, Dispatch } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card"; // For club cards
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
            <CardHeader>
                <div className="flex gap-5 item-center absolute top-5 right-10" >
                    <Button className="h-10 w-fit" onClick={() => setIsEditing((prev) => !prev)}> 📜 </Button>
                    <Button className="h-10 w-fit" onClick={async () => { await deleteClub(data._id); queryClient.invalidateQueries('clubs'); }}> ❌ </Button>
                </div>
            </CardHeader >
            <CardContent className="flex gap-5">
                {isEditing ? <CardEditionMode data={data} setIsEditing={setIsEditing} /> : <CardSimpleMode correspondant={data.correspondant} club={data.name} />}
            </CardContent>
        </Card >
    );
}

const CardSimpleMode = ({ correspondant, club }: { correspondant: { email: string; number: string; name: string }, club: string }) => {
    return (
        <div className="flex flex-col w-full">
            <h3 className="text-center text-primary text-3xl font-bold">{club}</h3>
            <Separator className="my-4" />
            <div className="flex justify-between w-full gap-8">
                <Button className="grow">{correspondant.name}</Button>
                <Button className="grow">{correspondant.email}</Button>
                <Button className="grow">{correspondant.number}</Button>
            </div>
        </div>
    );
};

const CardEditionMode = ({ data, setIsEditing }: { data: TClub, setIsEditing: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const formSchema = z.object({
        club: z.string().min(1, { message: "Le nom du club est requis" }),
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
            club: data.name,
        },
    });
    const onSubmit = async (formData: FormValues) => {
        try {
            await updateClub({ ...data, correspondant: { number: formData.number, email: formData.email, name: formData.name }, name: formData.club })
            setIsEditing(false)
            queryClient.invalidateQueries('clubs')
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full gap-10" >
                <div className="flex flex-col gap-5">
                    <FormField name="club" render={({ field }) => (
                        <FormItem className="text-background grow">
                            <FormLabel>Nom du club</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>Modifier le nom</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <div className="flex space-between gap-5">
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
                </div>
                <Button type="submit">Valider</Button>
            </form>
        </Form>
    );
};