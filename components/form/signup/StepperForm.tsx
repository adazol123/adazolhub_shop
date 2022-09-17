import { CheckIcon } from '@heroicons/react/24/outline';
import { NextPage } from 'next'
import React, { ChangeEvent, useState } from 'react'
import { StepperValue } from '../../../utils/type/types'
import EmailDetails from './steps/EmailDetails';
import PersonalDetails from './steps/PersonalDetails';
import SecurityDetails from './steps/SecurityDetails';

type Props = {}

let labels = ["Email", "Basic Information", "Security"];



const StepperForm: NextPage = (props: Props) => {
    const { stepper, setStepper, nextStep, prevStep, handleInputChange } = useStepper()

    let { step, ...values } = stepper


    return (
        <>
            <div className='flex flex-col w-full gap-8'>
                <h1 className="text-2xl font-light text-center text-marine-500">
                    Create account
                </h1>
                <div className="relative flex w-full before:absolute before:h-[1px] before:w-[calc(100%-35%)] before:bg-teal-700/20 before:top-[28%] before:left-0 before:mx-[15%]">

                    {labels.map((label, index: number) => (
                        <div
                            className="w-[calc(100%)] 
          relative"
                            key={label}
                        >
                            <div className="grid gap-2 text-[0.5em] text-gray-300 after:rounded-full place-items-center">
                                <div className="grid p-[8px] bg-white border-0 border-gray-100 rounded-full place-content-center">
                                    {index + 1 < stepper.step ? (
                                        <CheckIcon className="w-4 h-4  p-[2px] text-white bg-teal-700 rounded-full" />
                                    ) : index + 1 === stepper.step ? (
                                        <CheckIcon className="w-4 h-4 p-[2px] text-white bg-teal-700/30 rounded-full" />
                                    ) : (
                                        <CheckIcon className="w-4 h-4 p-[2px] text-transparent bg-teal-700/10 rounded-full" />
                                    )}
                                </div>
                                <p
                                    className={
                                        index + 1 === stepper.step
                                            ? "text-black/70 font-bold whitespace-nowrap text-xs"
                                            : 'whitespace-nowrap text-xs'
                                    }
                                >
                                    {label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/** RENDER CONTENT CHILDREN */}
            <div className="">{<RenderStepperForm />}</div>
        </>
    )
}


const useStepper = () => {
    let [stepper, setStepper] = useState<StepperValue>({
        step: 1,
        email: '',
        fullname: '',
        username: '',
        password: '',
        confirm_password: ''
    })
    const { step } = stepper

    let prevStep = () => {
        if (step) {
            setStepper(prev => ({
                ...prev,
                step: step - 1
            }))
            if (step < 2) setStepper(prev => ({ ...prev, step: 3 }))
        }
    }

    let nextStep = () => {
        if (step) {
            setStepper(prev => ({
                ...prev,
                step: step + 1
            }))
            if (step > 2) setStepper(prev => ({
                ...prev,
                step: 1
            }))
        }
    }

    let handleInputChange = (input: keyof StepperValue) => (event: ChangeEvent<HTMLInputElement>) => {
        setStepper(prev => ({
            ...prev,
            [input]: event.target.value
        }))
    }

    return { stepper, setStepper, nextStep, prevStep, handleInputChange }
}

const RenderStepperForm = () => {
    const { stepper, setStepper, nextStep, prevStep, handleInputChange } = useStepper()
    let { step, ...values } = stepper

    switch (step) {
        case 1:
            return <EmailDetails
                nextStep={nextStep}
                handleInputChange={handleInputChange}
                values={values}
            />
        case 2:
            return <PersonalDetails
                nextStep={nextStep}
                prevStep={prevStep}
                setStepper={setStepper}
                handleInputChange={handleInputChange}
                values={values}
            />
        case 3:
            return <SecurityDetails
                prevStep={prevStep}
                handleInputChange={handleInputChange}
                setStepper={setStepper}
                values={values}
            />
        default:
            return null
    }
}

export default StepperForm