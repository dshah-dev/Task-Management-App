import { useState, useEffect } from "react";

export const useDebounce = (value)=>{
    const [debounce , setDebounce] = useState(value);
    useEffect(()=>{
        const handler =setTimeout(()=>{
            setDebounce(value);
        },400);
        return ()=>{
            clearTimeout(handler);
        };
    },[value]);
    return debounce;
};