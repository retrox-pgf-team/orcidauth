import { useState } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

export function Stepper({ stepArray, completedMessage, currentStep, setCurrentStep }) {
	return (
		<>
			<div className="flex justify-center">
				<ol className="relative mx-4">
					{stepArray.map((el, index) => (
						<li className="mb-10 flex flex-col md:flex-row items-start" key={index}>
							<div className={`mx-auto rounded-full transition duration-500 ease-in-out border-2 border-gray-700 dark:border-gray-300 h-12 w-12 flex items-center justify-center py-3 text-xl font-bold ${index <= currentStep ? "bg-black text-white dark:bg-white dark:text-black" : ""} ${index <= currentStep && el.canGoBackTo ? "hover:scale-105 duration-200 hover:cursor-pointer" : ""}`} onClick={index <= currentStep && el.canGoBackTo ? () => setCurrentStep(index) : null}>
								{index >= currentStep ? index + 1 : <BsCheckLg/>}
							</div>
							<div className="md:ml-6">
								<h3 className={"text-3xl font-semibold text-black dark:text-white mt-1 text-center md:text-left" + (index <= currentStep && el.canGoBackTo ? " hover:cursor-pointer" : "")} onClick={index <= currentStep && el.canGoBackTo ? () => setCurrentStep(index) : null}>{el.title}</h3>
								<div className="my-6 w-[95vw] md:w-[60vw]">
								{index === currentStep ?
									<>
									{el.content}
									<div className="flex flex-row justify-center">
										{el.showPrevious ?
										<button className={"bg-black text-white text-lg px-2 py-2 rounded-2xl mx-2 hover:scale-105 duration-200 flex flex-row items-center" + (currentStep === 0 ? " hidden" : "")}
											onClick={() => setCurrentStep(currentStep - 1)}>
											<MdKeyboardArrowLeft size={30}/><span className="ml-1 mr-2">Back</span>
										</button>:null}
										{el.showNext ?
										<button className="bg-black text-white text-lg px-2 py-2 rounded-2xl mx-2 hover:scale-105 duration-200 flex flex-row items-center"
											onClick={() => setCurrentStep(currentStep + 1)}>
											<span className="ml-2 mr-1">{currentStep === stepArray.length - 1 ? "Complete" : "Next"}</span><MdKeyboardArrowRight size={30}/>
										</button>:null}
									</div>
									</>
								:null}
								</div>
							</div>
						</li>
					))}
					{currentStep === stepArray.length ?
						<div className="flex justify-center">
								<div className="max-w-[80vw] md:max-w-[60vw] lg:max-w-[40vw] xl:max-w-[30vw]">
								{completedMessage}
								</div>
						</div>
					: null}
				</ol>
			</div>
		</>
	)
}
