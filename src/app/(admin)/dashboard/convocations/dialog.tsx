"use client";
import { Dispatch, SetStateAction } from 'react';
import { Match } from '@/models';
import Feedback from '@/components/FetchFeedback';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";
import useConvocation from './use-convocation';
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import useCustomForm from './use-form';


export default function ValidationDialog({ selectedMatchs, setSelectedMatchs }: Readonly<{ selectedMatchs: Match[], setSelectedMatchs: Dispatch<SetStateAction<Match[]>> }>) {
    const { data, error, isLoading, payload, isSending, handleSubmit } = useConvocation({ selectedMatchs })
    return (
        <Feedback data={data} error={error} isLoading={isLoading}>
            <Dialog>
                <DialogTrigger asChild>
                    <Button disabled={selectedMatchs.length === 0}>  Envoyer </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px]">
                    <DialogHeader>
                        <DialogTitle className="text-center">Confirmer les adresses emails</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 gap-4">
                        {payload.map((item) => (
                            <Item key={item.match.matchNumber} match={item.match} club={item.club} />
                        ))}
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="submit" disabled={payload.length === 0 || isSending} onClick={() => { handleSubmit(); setSelectedMatchs([]); }}>Envoyer</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Feedback>
    )
}


const Item = ({ match, club }: Readonly<ItemProps>) => {
    const { isEditing, setIsEditing, onSubmit, form } = useCustomForm({ club })

    if (!isEditing) {
        return (
            <div className="flex justify-between items-center p-2 border rounded-md">
                <span className="font-medium">{club.name}</span>
                <span>{club.correspondant.email}</span>
                <Button onClick={() => setIsEditing(() => true)}> 📄 </Button>
            </div>
        )
    }
    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-between items-center p-2 border rounded-md">
                <div className="flex flex-col gap-2">
                    <FormField name="name" render={({ field }) => (
                        <FormItem className="text-foregroundgrow">
                            <FormLabel>Nom du club</FormLabel>
                            <FormControl >
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>Doit être commencer par <span className="text-primary"> {match.opponent} </span></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                <Button type="submit">Valider</Button>
            </form>
        </Form>
    )
}

type ItemProps = {
    match: Match;
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
