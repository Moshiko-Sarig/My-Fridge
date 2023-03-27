import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import './Login.css'


export default function Login(): JSX.Element {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    function logUserIn(): void {
        console.log(formData);
        event.preventDefault();
    }

    return (
        <div className='Login'>
            <form onSubmit={logUserIn}>
                <div>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                        placeholder="E-mail" />
                </div>
                <div>
                    <input type="text" name="password" value={formData.password} onChange={handleInputChange}
                        placeholder="Password" />
                </div>
                <div>
                    <input type="submit" value="Log in" />
                </div>
                <div>
                    <span>Dont have an account yet ?</span> &nbsp;
                    <NavLink to="/create-account"><u className='semiLink'>Create an account</u></NavLink>
                    
                </div>
            </form>
        </div>
    )
}