import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import RoutesConstants from '@/Utilities/RoutesConstants';
const apiBaseUrl = process.env.apiBaseUrl || 'http://localhost:3009'

export const Login = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleTogglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)

        try {
            const response = await fetch(`${apiBaseUrl}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data && data?.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                setIsLoading(false)
                window.location.href = RoutesConstants.CREATE_STORY
            }
            else if (data) {
                setError('An error occurred while logging in');
                setIsLoading(false)
                console.error('Error:', error);
            }
        } catch (error) {
            setError('An error occurred while logging in');
            setIsLoading(false)
            console.error('Error:', error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" required onChange={(e) => { setError(''); setEmail(e?.target?.value) }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-group">
                            <input type={passwordVisible ? "text" : "password"} id="password" name="password" required onChange={(e) => { setError(''); setPassword(e?.target?.value) }} />
                            <span
                                className="toggle-password"
                                onClick={handleTogglePasswordVisibility}
                            >
                                <i className={passwordVisible ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                            </span>
                        </div>
                    </div>
                    <button className='login-submit-btn' type="submit">
                        {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
