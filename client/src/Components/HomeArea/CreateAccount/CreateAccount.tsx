import { useEffect, useState } from 'react';
import axios from 'axios';
import api_endpoints from '../../../Utils/api.endpoints';
import { toast, Toaster } from 'react-hot-toast';
import useInput from '../../../hooks/useInput';
import { useDispatch } from 'react-redux';
import { useCookie } from '../../../hooks/useCookie';
import { userLogin, userSignOut } from '../../Redux/Actions';
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
        phone_number: "",
        email_verified: "0"
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
        event.preventDefault();
        try {
            const registerPromise = axios.post(api_endpoints.REGISTER, formData);

            await toast.promise(
                registerPromise,
                {
                    loading: 'Creating account...',
                    success: (response) => {
                        setIsEmailValid(true);
                        localStorage.setItem("formData", JSON.stringify(formData));
                        console.log(JSON.parse(localStorage.getItem("formData")));
                        return "User has registered.";
                    },
                    error: (error) => {
                        console.log("Error:", error);
                        return "An error occurred. Please try again with different details.";
                    },
                },
            );

            await registerPromise;


            const sendVerificationPromise = axios.post('http://localhost:4000/api/v1/send-verification-email', { email: formData.email });

            await toast.promise(
                sendVerificationPromise,
                {
                    loading: 'Sending verification email...',
                    success: 'Verification email sent successfully!',
                    error: 'Failed to send verification email.',
                },
            );

        } catch (error: any) {
            console.log("Error:", error);
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
                    <div className='gridRow'>
                        <div className="form__group field">
                            <input type="email" className='form__field' placeholder="E-mail" name="email" id='email'
                                value={formData.email} onChange={handleInputChange} required />
                            <label htmlFor="email" className='form__label'>E-mail</label>
                        </div>
                        <button type="button" className="next-btn" onClick={nextStep} disabled={!isEmailValid}>
                            Next
                        </button>
                        <br />
                        {!isEmailValid && (
                            <span className="email-exists">
                                Email already exists <br />
                                <NavLink to={"/login"} style={{ color: "white" }} onClick={() => setIsEmailValid(true)}>
                                    Click here to log in
                                </NavLink>.
                            </span>
                        )}
                    </div>
                )}

                {currentStep === 2 && (
                    <div className='gridRow'>
                        <div className="form__group field">
                            <input type="password" className='form__field' placeholder='Password' name="password" id='password'
                                value={formData.password} onChange={handleInputChange} required />
                            <label htmlFor="password" className='form__label'>Password</label>
                        </div>
                        <button type="button" className="back-btn" onClick={prevStep}>
                            Back
                        </button>
                        <button type="button" className="next-btn" onClick={nextStep}>
                            Next
                        </button>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className='gridRow'>
                        <div className="form__group field">
                            <input type="text" className='form__field' placeholder='First name' name="first_name"
                                id='first_name' value={formData.first_name} onChange={handleInputChange} required />
                            <label htmlFor="first_name" className='form__label'>First name</label>
                        </div>
                        <div className="form__group field">
                            <input type="text" className='form__field' placeholder='Last name' name="last_name"
                                id='last_name' value={formData.last_name} onChange={handleInputChange} required />
                            <label htmlFor="last_name" className='form__label'>Last name</label>
                        </div>
                        <button type="button" className="back-btn" onClick={prevStep}>
                            Back
                        </button>
                        <button type="button" className="next-btn" onClick={nextStep}>
                            Next
                        </button>
                    </div>
                )}

                {currentStep === 4 && (
                    <div className='gridRow'>
                        <div className='gridRow'>
                            <div className="form__group field">
                                <input type="tel" className='form__field' placeholder='Phone number' name="phone_number"
                                    id='phone_number' value={formData.phone_number} onChange={handleInputChange} required />
                                <label htmlFor="phone_number" className='form__label'>Cell phone</label>
                            </div>
                            <button type="button" className="back-btn" onClick={prevStep}>
                                Back
                            </button>
                        </div>
                        <div className='gridRow'>
                            <input type="submit" className='createAccount' value="Create account" />
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}
