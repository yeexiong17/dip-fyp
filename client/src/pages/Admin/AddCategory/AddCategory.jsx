import React, { useState, useEffect } from 'react'

import Sidebar from '../../../components/Sidebar'

import Building from '../../../asset/building.png'

const category = [
    {
        category_id: 1,
        category_name: 'Power Failure',
    },
    {
        category_id: 2,
        category_name: 'Water Failure',
    },
    {
        category_id: 3,
        category_name: 'Cleaning',
    }
]

const AddCategory = () => {

    const [categoryName, setCategoryName] = useState(null)
    const [fileSelected, setFileSelected] = useState(false)


    const onFormSubmit = () => {
    }

    const handleFileChange = (e) => {
        setFileSelected(!!e.target.files.length) // Set to true if files are selected, false otherwise
    }

    const handleDelete = (id) => {
        confirm('Are you sure you want to delete this?')
    }

    const resetForm = (e) => {
        e.preventDefault()

        document.querySelector('#input_image').value = ''
        document.querySelector('#input_categoryName').value = ''
        setCategoryName('')
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
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <h3 className="font-bold text-lg">Add Category</h3>
                                <form onSubmit={() => onFormSubmit}>
                                    <div className='flex items-center justify-around mt-6'>
                                        <img className='w-20 mt-4' src={Building} alt="Category Image" />
                                        <div className='flex flex-col items-start'>
                                            <input type="text" id='input_categoryName' placeholder='Type Something...' className="input input-bordered w-full max-w-xs" onChange={(e) => { setCategoryName(e.target.value) }} />
                                            <input type="file" id="input_image" className="file-input file-input-bordered w-full max-w-xs mt-2" onChange={handleFileChange} />
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-center mt-8'>
                                        <button onClick={(e) => resetForm(e)} className="btn btn-outline btn-error min-h-[2.5rem] h-10 px-10 mr-6">Reset</button>
                                        <button type='submit' className="btn btn-outline btn-success min-h-[2.5rem] h-10 px-10">Save</button>
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
                                    <th>Id</th>
                                    <th>Category Image</th>
                                    <th>Category</th>
                                    <th></th>
                                </tr>
                            </thead>

                            {
                                Object.keys(category).length === 0
                                    ? null
                                    : <tbody>
                                        {
                                            category.map((category, i) => (
                                                <tr key={category.category_id}>
                                                    <th className='w-10'>{i + 1}</th>
                                                    <td className='w-60'>
                                                        <img className='w-16' src={Building} alt="Category Image" />
                                                    </td>
                                                    <td className='w-60'>
                                                        <p>{category.category_name}</p>
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
