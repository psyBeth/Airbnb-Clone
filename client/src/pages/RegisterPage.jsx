import { Link } from "react-router-dom";
import { useState } from "react";

export default function RegisterPage() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (

        <div className="mt-4 grow flex items-center justify-around">
            <div className="-mt-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto ">
                    <input type="text" z
                        placeholder="John Doe"
                        value={name}
                        onChange={ev => setName(ev.target.value)} />
                    <input type="email" 
                        placeholder="your@email.com" 
                        value={email}
                        onChange={ev => setEmail(ev.target.value)} />
                    <input type="password" 
                        placeholder="password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)} />
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Already a member?
                        <Link className="underline text-black" to={'/login'}> Login now.</Link>
                    </div>
                </form>
            </div>
        </div>

    )
};