
import { UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../components/auth/SignUpForm';
import OtpFormComponent from '../components/auth/OtpForm';
import type { OtpData } from '../types/auth';
import { useState } from 'react';

const SignUp = () => {

    const navigate = useNavigate();

    const onToggleForm = () => {
        navigate('/sign-in');
    };

    const [isShowOtpForm, setIsShowOtpForm] = useState(false);
    const [otpFormData, setOtpFormData] = useState<OtpData>({
        email: '',
        password: '',
    });

    const onSubmitForm = (data: OtpData) => {
        setOtpFormData(data);
        setIsShowOtpForm(true);
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

                {isShowOtpForm
                    ? <OtpFormComponent otpFormData={otpFormData} />
                    : <SignUpForm onSubmitForm={onSubmitForm} />
                }

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

