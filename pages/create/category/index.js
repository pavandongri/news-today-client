import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { apiConstants, postApi, verifyUser } from '@/Utilities/ApiServices';
import Loader from '@/pages/components/Loader';
import Swal from 'sweetalert2';
import Header from '@/pages/components/Header';
import Footer from '@/pages/components/Footer';

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

        if (!userData) {
            window.location.href = '/login'
        }

        setUser(userData)
        setIsLoading(false)
    }

    useEffect(() => {
        verifyUserAuthenticatoin();
    }, []);

    const onSubmit = async (data) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to create this category?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, create it!',
            cancelButtonText: 'No, cancel',
        });

        if (!result.isConfirmed) {
            return;
        }

        try {
            const response = await postApi({ url: apiConstants.createCategory, payload: data })

            if (!response.category) {
                throw new Error(response.Error || "Something went wrong")
            }

            Swal.fire({
                title: 'Success!',
                text: 'Category created successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error!',
                text: error?.message || 'Failed to create category.',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div>
            <Header />

            <div className="container" style={{ marginBottom: '16%' }}>

                <div className='user-welcome'>
                    <p>Welcome <span className='text-capital'> {user?.name} 🎉 </span></p>
                </div>

                <div className="text-center mb-4">
                    <h2>Create Category</h2>
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

            <Footer />
        </div>

    );
};

export default Index;







