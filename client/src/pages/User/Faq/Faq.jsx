import React from 'react'
import Nav from '../../../components/Nav'

const questions = [
    {
        id: 0,
        question: 'What is the name of the website?',
        answer: 'The website name is Resolve.'
    },
    {
        id: 1,
        question: 'What to do if I want to make a report?',
        answer: 'Head to the report page and fill in the form to make a report.'
    },
    {
        id: 2,
        question: 'Do I need to register for an account to make report?',
        answer: 'In order to make a report, you must create a user account first.'
    }
]

const Faq = () => {
    return (
        <>
            <Nav />
            <div className='h-full pt-20 overflow-y-auto'>
                <div className='flex flex-col justify-center w-5/6 md:w-3/6 mx-auto'>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='text-6xl font-bold text-center'>FAQ</h1>
                        <p className='mt-4 text-center text-neutral-500'>Here you will find the answers for the frequently asked questions.</p>
                    </div>

                    <div className='mt-10'>
                        {
                            questions.map((question, i) => {
                                return (
                                    <div key={question.id} className="collapse collapse-plus bg-orange-200 mb-2 p-1">
                                        <input type="radio" name="my-accordion-3" />
                                        <div className="collapse-title text-lg font-semibold">
                                            {question.question}
                                        </div>
                                        <div className="collapse-content">
                                            <p>{question.answer}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Faq
