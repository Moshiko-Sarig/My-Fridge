import { useState } from "react";

function useInput(initialValue: string, validator: (value: string) => boolean) {
    
    const [value, setValue] = useState(initialValue);
    const [isValid, setIsValid] = useState(false);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue);
        setIsValid(validator(newValue));
    };

    return { value, onChange, isValid };
}

export default useInput;
