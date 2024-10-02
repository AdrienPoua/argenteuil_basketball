import { ReactElement } from "react";
import Link from "next/link";
import { TNavbar } from "@/utils/types";
import Arrow from "./Arrow";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";




const DirectNavItem = ({ item }: { item: TNavbar.DirectNavItem }): ReactElement => {
    return (
        <li
            key={item.href}
            className="flex bg-primary">
            <Link
                href={item.href}
                className="grow flex justify-end">
                <p>{item.title}</p>
            </Link>
            <Arrow hidden />
        </li>
    );
};

const ExpendableNavItem = ({ item }: { item: TNavbar.ExpendableNavItem }): ReactElement => {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>{item.title}</AccordionTrigger>
                <AccordionContent>
                    {item.subItems?.map((subItem: TNavbar.SubItem) => (
                        <li
                            key={subItem.href}
                            className="flex me-9">
                            <Link
                                href={subItem.href}
                                className="grow flex justify-end me-5">
                                <p >{subItem.title}</p>
                            </Link>
                        </li>
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

