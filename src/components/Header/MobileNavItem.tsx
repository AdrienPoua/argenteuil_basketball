import { ReactElement } from "react";
import Link from "next/link";
import { TNavbar } from "@/utils/types";
import Arrow from "./Arrow";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";




const DirectNavItem = ({ item }: { item: TNavbar.DirectNavItem }): ReactElement => {
    return (
        <Link
            href={item.href}
            className="grow flex ms-5 py-2">
            <p>{item.title}</p>
        </Link>
    );
};

const ExpendableNavItem = ({ item }: { item: TNavbar.ExpendableNavItem }): ReactElement => {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>{item.title}</AccordionTrigger>
                <AccordionContent >
                    {item.subItems?.map((subItem: TNavbar.SubItem) => (
                        <Link
                            href={subItem.href}
                            key={subItem.href}
                            className="grow flex justify-end py-3">
                            <p >{subItem.title}</p>
                        </Link>
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

