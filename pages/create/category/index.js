import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { apiConstants, postApi, verifyUser } from '@/Utilities/ApiServices';
import Loader from '@/pages/components/Loader';
import Swal from 'sweetalert2';

const Index = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const verifyUserAuthenticatoin = async () => {
        setIsLoading(true)
        const userData = await verifyUser();
        setUser(userData)
        setIsLoading(false)
    }

    useEffect(() => {
        verifyUserAuthenticatoin();
    }, []);

    const onSubmit = async (data) => {
        try {
            const response = await postApi({ url: apiConstants.createCategory, payload: data })

            if (response.category) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Category created successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
            if (response.Error) {
                Swal.fire({
                    title: 'Error!',
                    text: response.Error,
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to create category.',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="container py-5">
            <div className="text-center mb-4">
                <h2>Create Category</h2>
                <p>Welcome, {user?.name}</p>
            </div>

            <div className="shadow p-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Name <span className='text-danger'>*</span></label>
                        <input
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            {...register("name", { required: "Name is required", maxLength: { value: 90, message: "Title cannot exceed 90 characters" } })}
                        ></input>
                        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                    </div>

                    <div className='text-center'>
                        <button type="submit" className="btn btn-success w-50">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Index;







