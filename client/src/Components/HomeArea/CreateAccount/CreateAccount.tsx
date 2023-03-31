import './CreateAccount.css'
import UserModel from '../../../Models/UserModel'
import { useState } from 'react';


export default function CreateAccount(): JSX.Element {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        phone_number: ""
    });
    let accountInfo: UserModel;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    function createAccount(): void {
        console.log(formData);
        event.preventDefault();
    }


    return (
        <div className='CreateAccount'>
            <div>
                <h1>Please fill out the following data:</h1>
            </div>
            <form onSubmit={createAccount}>
                <div>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                        placeholder="E-mail" />
                </div>
                <div>
                    <input type="text" name="password" value={formData.password} onChange={handleInputChange}
                        placeholder="Password" />
                </div>
                <div>
                    <input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange}
                        placeholder="First name" />
                </div>
                <div>
                    <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange}
                        placeholder="Last name" />
                </div>
                <div>
                    <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleInputChange}
                        placeholder="Phone number" />
                </div>
                <div>
                    <input type="submit" value="Create account"/>
                </div>
            </form>
        </div>
    )
}