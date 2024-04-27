"use client"

import React, { useState } from "react";
import { NavItem, MenuState } from "@/types"



export function useMenu() : MenuState {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [dataMenu, setDataMenu] = useState<NavItem | null>(null);
    return {
        isMenuOpen,
        setIsMenuOpen,
        dataMenu,
        setDataMenu
    }
}
