import { useState } from 'react';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { callApi } from '../core/services/ApiService';
import { successMsg } from '../core/services/Message';
import type { SignInForm } from '../types/auth';

const Login = () => {
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });
    const [formData, setFormData] = useState<SignInForm>({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        resetErrors();

        const isValid = validateForm();
        if (!isValid) return;

        setLoading(true);

        try {
            const res = await callApi({
                url: 'api/auth/login',
                method: 'POST',
                data: formData,
            });

            if (res.success) {
                successMsg(res.message);
                navigate('/');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        // removeError(e.target.name as keyof SignUpErrors);
    };

    const onToggleForm = () => {
        navigate("/sign-up");
    }

    const validateForm = () => {
        const errorMessages = {
            email: '',
            password: '',
        };

        if (!formData.email || !formData.email.trim()) {
            errorMessages.email = 'Email is required';
        }

        if (!formData.password || !formData.password.trim()) {
            errorMessages.password = 'Password is required';
        }

        if (formData.password && formData.password.length < 6) {
            errorMessages.password = 'Password must be at least 6 characters long';
        }

        setErrors(errorMessages);

        return Object.values(errorMessages).every((message) => message === '');
    };

    const resetErrors = () => {
        setErrors({
            email: '',
            password: '',
        });
    };

    const resetForm = () => {
        setFormData({
            email: '',
            password: '',
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <div className="flex items-center justify-center mb-8">
                    <div className="bg-blue-600 p-3 rounded-full">
                        <LogIn className="w-8 h-8 text-white" />
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>
                <p className="text-center text-gray-600 mb-8">Sign in to manage your todos</p>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name='email'
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="you@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            name='password'
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Don't have an account?{' '}
                        <button
                            onClick={onToggleForm}
                            className="text-blue-600 hover:text-blue-700 font-semibold"
                        >
                            Sign up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
