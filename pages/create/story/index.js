import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CiCirclePlus } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { apiConstants, getApi, postApi, verifyUser } from '@/Utilities/ApiServices';
import Loader from '@/pages/components/Loader';
import Swal from 'sweetalert2';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { capitalizeString } from '@/Utilities/HelperFunctions';
import Header from '@/pages/components/Header';
import Footer from '@/pages/components/Footer';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const animatedComponents = makeAnimated();

const Create = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [user, setUser] = useState(null);
    const [cards, setCards] = useState(['']);
    const [categories, setCategories] = useState([""])

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm();

    const verifyUserAuthenticatoin = async () => {
        setIsLoading(true)
        const userData = await verifyUser();
        if (!userData) {
            window.location.href = "/login"
        }
        setUser(userData)
        setIsLoading(false)
    }

    const fetchCategories = async () => {
        const data = await getApi({ url: apiConstants.listCategories })
        const categoryData = data?.map(item => ({ label: capitalizeString(item?.name), value: item?.name }))
        setCategories(categoryData)
    }

    useEffect(() => {
        verifyUserAuthenticatoin();
        fetchCategories();
    }, []);

    const handleCardChange = (value, index) => {
        const updatedCards = [...cards];
        updatedCards[index] = value;
        setCards(updatedCards);
    };

    const addCard = () => {
        setCards([...cards, '']);
    };

    const deleteCard = (index) => {
        const updatedCards = cards.filter((_, i) => i !== index);
        setCards(updatedCards);
    };

    const onSubmit = async (data) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to create this story?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, create it!',
            cancelButtonText: 'No, cancel',
        });

        if (!result.isConfirmed) {
            return;
        }

        try {
            setIsSubmitting(true)
            data.cards = cards.filter(card => card.trim() !== '');
            data.categories = data.categories.map(item => item.value);
            data.author = JSON.parse(localStorage.getItem('user'))._id

            const response = await postApi({ url: apiConstants.createStory, payload: data })

            setIsSubmitting(false)

            if (!response.story) {
                throw new Error(response?.Error || "creation failed")
            }

            Swal.fire({
                title: 'Success!',
                text: 'Story created successfully!',
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

            <div className="container">
                <div className='user-welcome'>
                    <p>Welcome <span className='text-capital'> {user?.name} 🎉 </span></p>
                </div>

                <div className="text-center mb-4">
                    <h2>Create Story</h2>

                </div>

                <div className="shadow p-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Title <span className='text-danger'>*</span></label>
                            <textarea
                                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                rows="2"
                                {...register("title", { required: "Title is required", maxLength: { value: 90, message: "Title cannot exceed 90 characters" } })}
                            ></textarea>
                            {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Description <span className='text-danger'>*</span> </label>
                            <textarea
                                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                rows="3"
                                {...register("description", { required: "Description is required", maxLength: { value: 2000, message: "Description cannot exceed 90 characters" } })}
                            ></textarea>
                            {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">ImageUrl <span className='text-danger'>*</span> </label>
                            <textarea
                                className={`form-control ${errors.imageUrl ? 'is-invalid' : ''}`}
                                rows="2"
                                {...register("imageUrl", { required: "Image url is required" })}
                            ></textarea>
                            {errors.imageUrl && <div className="invalid-feedback">{errors.imageUrl.message}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Keywords <span className='text-danger'>*</span></label>
                            <textarea
                                className={`form-control ${errors.keywords ? 'is-invalid' : ''}`}
                                rows="2"
                                {...register("keywords", { required: "Keyword is required" })}
                            ></textarea>
                            {errors.keywords && <div className="invalid-feedback">{errors.keywords.message}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Categories <span className='text-danger'>*</span> </label>
                            <Select
                                components={animatedComponents}
                                isMulti
                                menuPlacement='top'
                                options={categories}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={(selected) => setValue("categories", selected)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Cards <span className='text-danger'>*</span> </label>
                            {cards.map((card, index) => (
                                <div key={index} className="mb-3 position-relative d-flex align-items-center">
                                    <ReactQuill
                                        theme="snow"
                                        value={card}
                                        onChange={(value) => handleCardChange(value, index)}
                                        style={{ minHeight: 'auto', marginBottom: '10px', width: '95%' }}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-danger position-absolute"
                                        style={{ right: '10px' }}
                                        onClick={() => deleteCard(index)}
                                    >
                                        <AiOutlineDelete size={20} />
                                    </button>
                                </div>
                            ))}
                            <button type="button" className="btn btn-outline-primary mt-2" onClick={addCard}>
                                <CiCirclePlus size={20} /> Add Card
                            </button>
                        </div>

                        <div className='text-center'>
                            <button type="submit" className="btn btn-success w-50">
                                {isSubmitting ? <div className="spinner-border spinner-border-sm tc-submit-loading" role="status" /> : "Create"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </div>

    );
};

export default Create;







