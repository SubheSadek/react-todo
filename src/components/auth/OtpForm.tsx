import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { OtpData, OtpForm } from '../../types/auth';
import { errorMsg, successMsg } from '../../core/services/Message';
import { callApi } from '../../core/services/ApiService';

interface Props {
    otpFormData: OtpData;
}

const OtpFormComponent = ({ otpFormData }: Props) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState<OtpForm>({
        email: otpFormData.email,
        password: otpFormData.password,
        otp: '',
    });

    const [error, setError] = useState<string>('');

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isValid = checkValidation();
        if (!isValid) return;

        setLoading(true);

        try {
            const res = await callApi({
                url: 'api/auth/verify-user',
                method: 'POST',
                data: formData,
            });

            if (res.success) {
                successMsg(res.message);
                navigate('/sign-in');
            }

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
            otp: '',
        });
    };

    const checkValidation = () => {

        setError('');

        if (!formData.otp || formData.otp.trim() === '') {
            setError('OTP is required');
            return false;
        };

        if (formData.otp.length < 6) {
            setError('OTP must be at least 6 characters long');
            return false;
        }

        return true;
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                        OTP
                    </label>
                    <input
                        id="otp"
                        name="otp"
                        type="text"
                        value={formData.otp}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                        placeholder="Example: 123456"
                    />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Verifying OTP...' : 'Verify OTP'}
                </button>
            </form>
        </>
    );
}

export default OtpFormComponent;
