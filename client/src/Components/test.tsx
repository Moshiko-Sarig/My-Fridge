import useFetch from "../hooks/useFetch";
import {useCookie} from '../hooks/useCookie';


function useFetchComponent() {
    const [authToken] = useCookie('authToken');
    const { data: item, loading, error, reFetch } = useFetch("http://localhost:4000/api/v1/items/7", authToken);

    return (
        <div className="test" style={{ fontWeight: "bold" }}>
    
            {loading && <p>Loading...</p>}
          
            {error && <p>Error: {error.message}</p>}

            {/* Map over the fetched items and render them */}
            {Array.isArray(item) && item.map((item: any) => (
                <div key={item}>
                    <h3>{item.item_name}</h3>
                    <h3>Category: {item.category_name}</h3>
                </div>
            ))}

            <button onClick={reFetch}>refetch</button>
        </div>
    );
}

export default useFetchComponent;


// import { useState } from "react";
// import useInput from "../hooks/useInput";

// function useInputComponent() {
//     // Define a validator function for the input value
//     const minLengthValidator = (value: string) => value.length >= 5;
//     // Use the custom hook to manage the input value and its validation
//     const { value, onChange, isValid } = useInput("", minLengthValidator);

//     // Manage the input focus state
//     const [hasFocus, setHasFocus] = useState(false);

//     // Handlers for input's focus and blur events
//     const handleFocus = () => {
//         setHasFocus(true);
//     };

//     const handleBlur = () => {
//         setHasFocus(false);
//     };

//     return (
//         <div>
//             {/* Render the input and bind its value, onChange, onFocus, and onBlur handlers */}
//             <input
//                 type="text"
//                 value={value}
//                 onChange={onChange}
//                 onFocus={handleFocus}
//                 onBlur={handleBlur}
//             />
//             {/* Display a validation message only if the input is invalid and has focus */}
//             {!isValid && hasFocus && <p>Please enter at least 5 characters.</p>}
//         </div>
//     );
// }

// export default useInputComponent;
