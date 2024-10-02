"use client"
import { ReactElement } from "react";
import H1 from "@/components/H1";
import MainSection from "@/components/layouts/MainSection";
import File from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"


// const steps = [
//   {
//     left: "Recuperez",
//     right: <ModalButton text="Formulaire" ModalContent={<FormulaireGuide />} />,
//     icon: <ArticleIcon />,
//   },
//   {
//     left: "Rendre",
//     right: <ModalButton text="Permanences" ModalContent={<PermanencesGuide />} />,
//     icon: <AssignmentTurnedInIcon />,
//   },
//   {
//     left: "Recevez",
//     right: <ModalButton text="Email" ModalContent={<EmailGuide />} />,
//     icon: <MarkEmailUnreadIcon />,
//   },
//   {
//     left: "Completez",
//     right: <ModalButton text="Inscription" ModalContent={<InscriptionGuide />} />,
//     icon: <LaptopMacIcon />,
//   },
//   {
//     left: "Verification",
//     right: <ModalButton text="Validation" ModalContent={<ValidationGuide />} />,
//     icon: <MarkEmailUnreadIcon />,
//   },
// ];


export default function Index(): ReactElement {
  return (
    <>
      <H1> Les étapes d&apos;inscription </H1>
      <MainSection>
        <Step>
          <Left>
            <p> Récuperez </p>
          </Left>
          <Middle>
            <div> test</div>
          </Middle>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Formulaire</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Récuperez</DialogTitle>
                <DialogDescription>
                  Anyone who has this link will be able to view this.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </Step>
      </MainSection>
    </>
  );
}


const Step = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center hover:bg-primary/50">
      {children}
    </div>
  )
}


const Middle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 ">
      <div className="h-full p-1 bg-white" />
      <div className="bg-primary rounded-full">{children}</div>
      <div className="h-full p-1 bg-white" />
    </div>
  )
}

const Left = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 ">
      <p className="bg-primary rounded-full">{children}</p>
    </div>
  )
}