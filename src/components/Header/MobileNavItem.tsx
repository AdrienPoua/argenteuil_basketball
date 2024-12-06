import { ReactElement } from "react";
import Link from "next/link";
import { TNavbar } from "@/types";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { DrawerClose } from "../ui/drawer";




const DirectNavItem = ({ item }: { item: TNavbar.DirectNavItem }): ReactElement => {
    return (
        <DrawerClose>
            <Link
                href={item.href}
                className="grow flex ms-5 py-2 text-background">
                {item.title}
            </Link>
        </DrawerClose>
    );
};

const ExpendableNavItem = ({ item }: { item: TNavbar.ExpendableNavItem }): ReactElement => {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>{item.title}</AccordionTrigger>
                <AccordionContent className="flex flex-col">
                    {item.subItems?.map((subItem: TNavbar.SubItem) => (
                        <DrawerClose key={subItem.href}
                        >
                            <Link
                                href={subItem.href}
                                className="grow flex justify-end py-3">
                                <p >{subItem.title}</p>
                            </Link>
                        </DrawerClose >
                    ))}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
};


export default function Factory({ item }: Readonly<{ item: TNavbar.NavItem }>): ReactElement {
    if ('href' in item) {
        return <DirectNavItem item={item as TNavbar.DirectNavItem} />;
    } else {
        return <ExpendableNavItem item={item as TNavbar.ExpendableNavItem} />;
    }
};

