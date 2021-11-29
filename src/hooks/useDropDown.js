import { useState, useEffect } from "react";

export default function useDropDown() {
    const [dropDown, setDropDown] = useState(false)

    const handleHover = (e) => {
        setDropDown(true);
    }

    useEffect(() => {
        document.addEventListener("mouseenter", handleHover);
        //document.addEventListener("mouseleave", handleLeave);
    })

    return {dropDown}
}
