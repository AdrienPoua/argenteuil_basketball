import React, { useState } from "react";

export default function useMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [dataMenu, setDataMenu] = useState(null);
    return {
        isMenuOpen,
        setIsMenuOpen,
        dataMenu,
        setDataMenu
    }
}
