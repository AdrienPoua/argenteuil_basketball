
'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2 } from 'lucide-react'
import { createTeam } from '@/lib/mongo/controllers/teams'
import { useAlert } from "@/utils/contexts/Alerts"
interface TrainingSession {
    day: string
    start: string
    end: string
    gym: string
}

interface FormData {
    name: string
    image: string
    coach: string
    division: string
    training: TrainingSession[]
}

export default function Form() {
    const { config: setAlert } = useAlert();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        image: '',
        coach: '',
        division: '',
        training: []
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleTrainingChange = (index: number, field: keyof TrainingSession, value: string) => {
        setFormData(prev => {
            const newTraining = [...prev.training]
            newTraining[index] = { ...newTraining[index], [field]: value }
            return { ...prev, training: newTraining }
        })
    }

    const addTrainingSession = () => {
        setFormData(prev => ({
            ...prev,
            training: [...prev.training, { day: '', start: '', end: '', gym: '' }]
        }))
    }

    const removeTrainingSession = (index: number) => {
        setFormData(prev => ({
            ...prev,
            training: prev.training.filter((_, i) => i !== index)
        }))
    }


    const initialFormData: FormData = {
        name: '',
        image: '',
        coach: '',
        division: '',
        training: []
    }

    const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (formData.name) {
            console.log(formData)
            createTeam(formData)
            setFormData(initialFormData)
            setAlert(true, "success", "Votre demande a été envoyée avec succès !");
        } else {
            setAlert(true, "error", "Une erreur est survenue lors de la création de votre demande.");
        }
    }
    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className='text-black'>Team Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className='text-black'>Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className='text-black'
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="image" className='text-black'>Image URL</Label>
                        <Input
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                            className='text-black'
                        />
                    </div>
                    <div className="space-y-2" >
                        <Label htmlFor="coach" className='text-black'>Coach</Label>
                        <Input
                            id="coach"
                            name="coach"
                            value={formData.coach}
                            onChange={handleInputChange}
                            className='text-black'
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="division" className='text-black'>Division</Label>
                        <Input
                            id="division"
                            name="division"
                            value={formData.division}
                            onChange={handleInputChange}
                            className='text-black'
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className='text-black'>Training Sessions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {formData.training.map((session, index) => (
                        <div key={index} className="flex flex-wrap items-end gap-2 pb-4 border-b text-black">
                            <div className="flex-1 min-w-[200px]">
                                <Label className="text-black" htmlFor={`day-${index}`}>Day</Label>
                                <Select
                                    onValueChange={(value) => handleTrainingChange(index, 'day', value)}
                                    value={session.day}
                                >
                                    <SelectTrigger id={`day-${index}`} className="text-black">
                                        <SelectValue className="text-black" placeholder="Select a day" />
                                    </SelectTrigger>
                                    <SelectContent className="text-black">
                                        {days.map((day) => (
                                            <SelectItem key={day} className="text-black" value={day}>{day}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex-1 min-w-[150px]">
                                <Label className='text-black' htmlFor={`start-${index}`}>Start Time</Label>
                                <Input
                                    id={`start-${index}`}
                                    type="time"
                                    value={session.start}
                                    onChange={(e) => handleTrainingChange(index, 'start', e.target.value)}
                                    required
                                    className='text-black'
                                />
                            </div>
                            <div className="flex-1 min-w-[150px]">
                                <Label className='text-black' htmlFor={`end-${index}`}>End Time</Label>
                                <Input
                                    id={`end-${index}`}
                                    type="time"
                                    value={session.end}
                                    onChange={(e) => handleTrainingChange(index, 'end', e.target.value)}
                                    required
                                    className='text-black'
                                />
                            </div>
                            <div className="flex-1 min-w-[200px]">
                                <Label className='text-black' htmlFor={`gym-${index}`}>Gym</Label>
                                <Select
                                    onValueChange={(value) => handleTrainingChange(index, 'gym', value)}
                                    value={session.gym}
                                >
                                    <SelectTrigger id={`gym-${index}`}>
                                        <SelectValue className='text-black' placeholder="Select a gym" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem className='text-black' value="Jean Guimier">Jean Guimier</SelectItem>
                                        <SelectItem className='text-black' value="Jesse Owens">Jesse Owens</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() => removeTrainingSession(index)}
                            >
                                <Trash2 className="h-4 w-4 text-black" />
                            </Button>
                        </div>
                    ))}
                    <Button type="button" onClick={addTrainingSession} className='text-black'>
                        Add Training Session
                    </Button>
                </CardContent>
            </Card>

            <Button type="submit" className="w-full text-black">Submit</Button>
        </form>
    )
}
