import { useEffect, useState } from 'react';
import axios from 'axios';
import api_endpoints from '../../../Utils/api.endpoints';
import { toast, Toaster } from 'react-hot-toast';
import useInput from '../../../hooks/useInput';
import { useDispatch } from 'react-redux';
import { useCookie } from '../../../hooks/useCookie';

// Import the logUserIn function from authService.ts
import { logUserIn } from '../../../Services/authService';

import './CreateAccount.css';
import { NavLink } from 'react-router-dom';

export default function CreateAccount(): JSX.Element {
    const dispatch = useDispatch();
    const [authToken, setAuthToken] = useCookie('authToken');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        phone_number: ""
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        if (formData.email) {
            checkEmailExists();
        }
    }, [formData.email]);

    async function checkEmailExists() {
        try {
            const response = await axios.post(api_endpoints.CHECK_EMAIL, { email: formData.email });
            setIsEmailValid(!response.data.emailExists);
        } catch (error) {
            console.log(error);
        }
    }

    async function createAccount(event: React.FormEvent<HTMLFormElement>) {
        try {
            event.preventDefault();
            const response: any = await axios.post(api_endpoints.REGISTER, formData);
            console.log(formData);
            toast.success("User has registered.");
            setIsEmailValid(true);
            logUserIn(formData.email, formData.password, setAuthToken, dispatch);
            toast.success(`Welcome new user: ${formData.first_name} ${formData.last_name}`)
        } catch (error: any) {
            console.log("Error:", error);
            toast.error("An error occurred. Please try again with different details.");

        }
    }

    const nextStep = async () => {
        if (currentStep === 1) {
            await checkEmailExists();
        }

        if (isEmailValid) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <div className='CreateAccount'>
            <Toaster
                position="top-center"
                reverseOrder={true}
            />
            <form onSubmit={createAccount}>
                {currentStep === 1 && (
                    <div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="E-mail"
                        />
                        <button type="button" onClick={nextStep} disabled={!isEmailValid}>
                            Next
                        </button>
                        <br />
                        {!isEmailValid && (
                            <span className="email-exists">
                                Email already exists <br />
                                <NavLink  to={"/login"} style={{ color: "white" }} onClick={() => setIsEmailValid(true)}>
                                    Click here to log in
                                </NavLink>.
                            </span>
                        )}
                    </div>
                )}

                {currentStep === 2 && (
                    <div>
                        <input
                            type="text"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                        />
                        <button type="button" onClick={prevStep}>
                            Back
                        </button>
                        <button type="button" onClick={nextStep}>
                            Next
                        </button>
                    </div>
                )}

                {currentStep === 3 && (
                    <div>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            placeholder="First name"
                        />
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            placeholder="Last name"
                        />
                        <button type="button" onClick={prevStep}>
                            Back
                        </button>
                        <button type="button" onClick={nextStep}>
                            Next
                        </button>
                    </div>
                )}

                {currentStep === 4 && (
                    <div>
                        <input
                            type="tel"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleInputChange}
                            placeholder="Phone number"
                        />
                        <button type="button" onClick={prevStep}>
                            Back
                        </button>
                        <input type="submit" value="Create account" />
                    </div>
                )}
            </form>
        </div>
    );
}
