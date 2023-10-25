import React from 'react';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostChangePasswordMutation } from '@/redux/features/auth/authApi';
import { toast } from 'react-toastify';
import { Spinner } from '@material-tailwind/react';

const schema = yup.object().shape({
    old_password: yup
        .string()
        .required('Password is required'),
    new_password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).+$/,
            'Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character'
        ),
    repeat_password: yup
        .string()
        .required('Repeat Password is required')
        .oneOf([yup.ref('new_password'), null], 'Passwords must match'),
});

const ChangePassword = () => {
    const { handleSubmit, register, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })

    const [postChangePassword, { isLoading }] = usePostChangePasswordMutation()

    const handleChangePassword = async (data) => {
        const options = { data: data }
        const result = await postChangePassword(options)
        if (result?.error?.data?.message) {
            toast.error(result?.error?.data?.message)
        }
        if (result?.data?.success) {
            reset()
            toast.success(result?.data?.message)
        } else {
            toast.error(result?.data?.message)
        }
    };
    return (
        <form onSubmit={handleSubmit(handleChangePassword)}>
            <div>
                <div class="pt-4">
                    <h1 class="py-2 text-2xl font-semibold">Change Password</h1>
                </div>
                <hr class="mt-4 mb-8" />

                <div className="mb-2" >
                    <label for="exampleInputPassword1" className="form-label mb-1 label">
                        Old Password<span>*</span>
                    </label>
                    <input {...register("old_password", { required: true })}
                        type="password"
                        placeholder="old_Password "
                        className={`input px-4 mb-0 ${errors.old_password ? "border !border-red-600" : "border-none"}`}
                        autoComplete="off"
                        name="old_password"
                    />
                    {
                        errors.old_password && <small className="text-red-600 text-sm">{errors.old_password.message}</small>
                    }
                </div>
                <div className="mb-2" >
                    <label for="exampleInputPassword1" className="form-label mb-1 label">
                        New Password<span>*</span>
                    </label>
                    <input {...register("new_password", { required: true })}
                        type="password"
                        placeholder="new_Password "
                        className={`input px-4 mb-0 ${errors.new_password ? "border !border-red-600" : "border-none"}`}
                        autoComplete="off"
                        name="new_password"
                    />
                    {
                        errors.new_password && <small className="text-red-600 text-sm">{errors.new_password.message}</small>
                    }
                </div>

                <div className="mb-2" >
                    <label for="exampleInputPassword1" className="form-label mb-1 label">
                        Repeat Password<span>*</span>
                    </label>
                    <input {...register("repeat_password", { required: true })}
                        type="password"
                        placeholder="Repeat Password "
                        className={`input px-4 mb-0 ${errors.repeat_password ? "border !border-red-600" : "border-none"}`}
                        autoComplete="off"
                        name="repeat_password"
                    />
                    {
                        errors.repeat_password && <small className="text-red-600 text-sm">{errors.repeat_password.message}</small>
                    }
                </div>


                <button type="submit"
                    className="bg-pm hover:bg-pmd text-white w-fit px-4 h-12 rounded-md my-4"
                    disabled={isLoading}
                >
                    {
                        isLoading ? <Spinner color='white' /> : "Change"
                    }

                </button>
            </div>
        </form>
    );
};

export default ChangePassword;