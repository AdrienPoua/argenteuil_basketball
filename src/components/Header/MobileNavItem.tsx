import { ReactElement } from "react";
import { Box, Button, ListItem, Typography } from "@mui/material";
import Link from "next/link";
import Dropdown from "@/components/Dropdown";
import { TNavbar } from "@/utils/types";


const DirectNavItem = ({ item }: { item: TNavbar.DirectNavItem }): ReactElement => {
    return (
        <ListItem
            key={item.href}
            className="flex bg-primary">
            <Link
                href={item.href}
                className="grow flex justify-end">
                <Typography variant="body2">{item.title}</Typography>
            </Link>
        </ListItem>
    );
};

const ExpendableNavItem = ({ item }: { item: TNavbar.ExpendableNavItem }): ReactElement => {
    return (
        <Dropdown
            key={item.title}
            header={
                <Button className="grow w-full">
                    <Typography
                        variant="body2"
                        className="text-end grow">
                        {item.title}
                    </Typography>
                </Button>
            }
            items={
                <Box className="flex flex-col">
                    {item.subItems?.map((subItem: TNavbar.SubItem) => (
                        <ListItem
                            key={subItem.href}
                            className="flex me-9">
                            <Link
                                href={subItem.href}
                                className="grow flex justify-end me-5">
                                <Typography variant="body2">{subItem.title}</Typography>
                            </Link>
                        </ListItem>
                    ))}
                </Box>
            }
        />
    );
};

export default function Factory({ item }: Readonly<{ item: TNavbar.NavItem }>): ReactElement {
    if ('href' in item) {
        return <DirectNavItem item={item as TNavbar.DirectNavItem} />;
    } else {
        return <ExpendableNavItem item={item as TNavbar.ExpendableNavItem} />;
    }
};

