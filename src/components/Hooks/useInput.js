import { useState } from "react";

const useInput = (initialValue) => {
    const [input, setInput] = useState(initialValue);
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setInput(value);
    };
    return { value: input, onChange };
};
