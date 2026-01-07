import { useState } from 'react';
import type { SignUpForm, SignUpErrors, OtpData } from '../../types/auth';
import { errorMsg, successMsg } from '../../core/services/Message';
import { callApi } from '../../core/services/ApiService';

interface Props {
    onSubmitForm: (data: OtpData) => void;
}

const SignUpFormComponent = ({ onSubmitForm }: Props) => {

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
        if (!isValid) {
            errorMsg('Form is not valid!');
            return;
        }

        setLoading(true);

        try {
            const res = await callApi({
                url: 'api/auth/register',
                method: 'POST',
                data: formData,
            });

            if (res.success) {
                successMsg(res.message);
            }

            onSubmitForm({
                email: formData.email,
                password: formData.password,
            });

            resetForm();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
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

        if (formData.password_confirmation !== formData.password) {
            messages.password_confirmation = 'Password confirmation does not match';
            isValid = false;
        }

        setErrors(pre => ({ ...pre, ...messages }));

        return isValid;
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">

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
        </>
    );
}

export default SignUpFormComponent;
