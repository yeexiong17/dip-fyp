import React, { useState, useEffect } from 'react'
import { v4 } from 'uuid'

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../../../../firebase.config'

import Sidebar from '../../../components/Sidebar'

import Building from '../../../asset/building.png'

const AddCategory = () => {

    const [categoryName, setCategoryName] = useState(null)
    const [fileSelected, setFileSelected] = useState(false)
    const [categoryImage, setCategoryImage] = useState(null)
    const [categoryData, setCategoryData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleFileChange = (e) => {
        setFileSelected(!!e.target.files.length) // Set to true if files are selected, false otherwise
    }

    const handleDelete = (id) => {
        confirm('Are you sure you want to delete this?')
    }

    const resetForm = () => {
        document.querySelector('#input_image').value = ''
        document.querySelector('#input_categoryName').value = ''
        setCategoryName('')
        setCategoryImage(null)
    }

    useEffect(() => {
        getAllCategory()
    }, [])

    const getAllCategory = async () => {
        const response = await fetch('http://localhost:8000/admin/get-all-category', {
            method: 'GET',
            credentials: 'include'
        })

        if (response.ok) {
            const responseJson = await response.json()

            setCategoryData(responseJson.categoryData)
        }
    }

    const onFormSubmit = () => {

        setIsLoading(true)

        try {

            const imageRef = ref(storage, `category/image/${categoryImage.name + v4()}`)

            const uploadTask = uploadBytesResumable(imageRef, categoryImage)

            uploadTask.on("state_changed",
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Attachment Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Attachment Upload is running');
                            break;
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                    console.error("Error uploading attachment:", error);
                },
                async () => {

                    const downloadUrl = await getDownloadURL(imageRef);

                    const categoryObject = {
                        category_name: categoryName,
                        category_image: downloadUrl
                    }

                    try {
                        const response = await fetch('http://localhost:8000/admin/create-new-category', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(categoryObject),
                            credentials: 'include'
                        })

                        if (response.ok) {
                            const responseJSON = await response.json()
                            alert(responseJSON.message)
                        }
                    }
                    catch (error) {
                        console.error(error)
                    }
                    finally {
                        // Reset Form
                        resetForm()

                        getAllCategory()
                        document.getElementById('my_modal_2').close();
                        setIsLoading(false)
                        console.log(downloadUrl)
                    }
                }
            )
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Sidebar />
            <div className='pl-64 h-full bg-sky-50'>
                <div className='flex flex-col h-full px-12 pt-8'>
                    <div>
                        <h1 className='text-2xl font-bold text-neutral-800'>Add Category</h1>
                    </div>

                    <div className='mt-6'>
                        <button className="btn ml-auto btn-outline border-orange-500 bg-orange-500 text-neutral-50 hover:bg-orange-600 hover:border-orange-500 min-h-[2.5rem] h-10 px-6"
                            onClick={() => { document.getElementById('my_modal_2').showModal() }}>
                            Add New Category
                        </button>
                        <dialog id="my_modal_2" className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    <button type={isLoading ? 'button' : ''} onClick={() => resetForm()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <h3 className="font-bold text-lg">Add Category</h3>
                                <form>
                                    <div className='flex items-center justify-around mt-6'>
                                        <img className='w-20 aspect-square mt-4' src={categoryImage ? URL.createObjectURL(categoryImage) : ''} alt="category-image" />
                                        <div className='flex flex-col items-start'>
                                            <input type="text" id='input_categoryName' placeholder='Type Something...' className="input input-bordered w-full max-w-xs" onChange={(e) => { setCategoryName(e.target.value) }} required />
                                            <input type="file" id="input_image" className="file-input file-input-bordered w-full max-w-xs mt-2" onChange={(e) => { handleFileChange(e); setCategoryImage(e.target.files[0]) }} required />
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-center mt-8'>
                                        <button onClick={(e) => { e.stopPropagation(); resetForm(e) }} className="btn btn-outline btn-error min-h-[2.5rem] h-10 px-10 mr-6">Reset</button>
                                        <button onClick={() => { onFormSubmit() }} type='button' className="btn btn-outline btn-success min-h-[2.5rem] h-10 px-10">
                                            {
                                                isLoading
                                                    ? <span className="loading loading-spinner loading-md"></span>
                                                    : 'Save'
                                            }
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </dialog>
                    </div>

                    <div className="overflow-x-auto mt-8 h-96">
                        <table className="table table-pin-rows bg-neutral-50 border-2 shadow-md">
                            {/* head */}
                            <thead>
                                <tr className='bg-neutral-50 text-neutral-800 text-sm border-b border-neutral-300'>
                                    <th>ID</th>
                                    <th>Category Image</th>
                                    <th>Category</th>
                                    <th></th>
                                </tr>
                            </thead>

                            {
                                Object.keys(categoryData).length === 0
                                    ? null
                                    : <tbody>
                                        {
                                            categoryData.map((category, key) => (
                                                <tr key={key}>
                                                    <th className='w-10'>{category.menu_id}</th>
                                                    <td className='w-60'>
                                                        <img className='w-16 aspect-square' src={category.menu_image} alt="Category-Image" />
                                                    </td>
                                                    <td className='w-60'>
                                                        <p>{category.menu_name}</p>
                                                    </td>

                                                    <td className='w-60' align='center'>
                                                        <button className="btn btn-outline btn-error min-h-[2.5rem] h-10 px-6" onClick={() => handleDelete(category.category_id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                            }
                        </table>
                    </div>
                </div >
            </div >
        </>
    )
}

export default AddCategory
