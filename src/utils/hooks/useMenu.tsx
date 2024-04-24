import React, { useState } from "react";
import { NavItem } from "../types"

export default function useMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [dataMenu, setDataMenu] = useState<NavItem | null>(null);
    return {
        isMenuOpen,
        setIsMenuOpen,
        dataMenu,
        setDataMenu
    }
}
