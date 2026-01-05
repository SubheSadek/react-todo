import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { SignUpForm, SignUpErrors } from '../types/signUp';
import { ToastContainer, toast } from 'react-toastify';

const SignUp = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<SignUpForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        address: '',
    });

    const [errors, setErrors] = useState<SignUpErrors>({
        email: '',
        password: '',
        password_confirmation: '',
        name: ''
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        removeError(e.target.name as keyof SignUpErrors);
    };

    const removeError = (field: keyof SignUpErrors) => {
        setErrors({
            ...errors,
            [field]: '',
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isValid = checkValidation();
        if (!isValid) return;

        setSuccess(false);

        console.log(formData);

        // setLoading(true);

        // try {
        //     await signUp(formData.email, formData.password);

        //     const { data: { user } } = await supabase.auth.getUser();
        //     if (user) {
        //         await supabase.from('user_profiles').insert([
        //             {
        //                 id: user.id,
        //                 name: formData.name,
        //                 email: formData.email,
        //                 phone: formData.phone,
        //                 website: formData.website,
        //                 address: formData.address,
        //             },
        //         ]);
        //     }

        //     setSuccess(true);
        //     resetForm();
        // } catch (err) {
        //     setError(err instanceof Error ? err.message : 'Failed to sign up');
        // } finally {
        //     setLoading(false);
        // }
    };

    const resetForm = () => {
        setFormData({
            email: '',
            password: '',
            password_confirmation: '',
            name: '',
            address: '',
        });
    };

    const resetErrors = () => {
        setErrors({
            email: '',
            password: '',
            password_confirmation: '',
            name: ''
        });
    };

    const checkValidation = () => {

        resetErrors();

        let messages: { [key: string]: string } = {};

        let isValid = true;

        if (!formData.name || formData.name.trim() === '') {
            messages.name = 'Name is required';
            isValid = false;
        }

        if (!formData.email || formData.email.trim() === '') {
            messages.email = 'Email is required';
            isValid = false;
        }

        if (!formData.password || formData.password.trim() === '') {
            messages.password = 'Password is required';
            isValid = false;
        }

        if (!formData.password_confirmation || formData.password_confirmation.trim() === '') {
            messages.password_confirmation = 'Password confirmation is required';
            isValid = false;
        }

        setErrors(pre => ({ ...pre, ...messages }));

        return isValid;
    };

    const onToggleForm = () => {
        navigate('/sign-in');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl max-h-screen overflow-y-auto">
                <div className="flex items-center justify-center mb-8">
                    <div className="bg-green-600 p-3 rounded-full">
                        <UserPlus className="w-8 h-8 text-white" />
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Create Account</h2>
                <p className="text-center text-gray-600 mb-8">Start managing your todos today</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {Object.values(errors).some(Boolean) && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">Errors</div>
                    )}

                    {success && (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                            Account created successfully! You can now sign in.
                        </div>
                    )}

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                            placeholder="John Doe"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-grey-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                            placeholder="you@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
                    </div>

                    <div>
                        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                        </label>
                        <input
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                            placeholder="••••••••"
                        />
                        {errors.password_confirmation && <p className="text-red-500 text-sm mt-2">{errors.password_confirmation}</p>}
                    </div>

                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                            Address
                        </label>
                        <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                            placeholder="123 Main St, City, State"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <button
                            onClick={onToggleForm}
                            className="text-green-600 hover:text-green-700 font-semibold"
                        >
                            Sign in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;

