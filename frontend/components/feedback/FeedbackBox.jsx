import { useState } from 'react';

export function FeedbackBox() {
  const [feedback, setFeedback] = useState(false);

    async function handleSubmit(event) {
      event.preventDefault();
      fetch('/api/feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({feedback: event.target[0].value}),
        })
      setFeedback(true)
    }
  
    return (
      <form className="flex flex-col my-8 mx-auto max-w-[40vw] justify-center" onSubmit={(event) => handleSubmit(event)}>
        <label for="message" className="block mb-4 text text-2xl text-gray-900 text-left font-semibold whitespace-nowrap">Any feedback?</label>
        {feedback ?
        <h5 className="text-xl">
          Thank you for your feedback!
        </h5>:
        <>
        <textarea id="message" rows="4" className="min-h-[42px] block p-2.5 w-full border-2 border-black rounded-2xl focus:outline-none" 
          placeholder="Something I would like to see is..." required />
        <div className="mt-4">
          <button type="submit" className="text-white bg-black hover:scale-105 duration-200 hover:cursor-pointer focus:outline-none text-lg rounded-2xl px-4 py-2 mr-2 mb-2">Submit</button>
        </div>
        </>}
      </form>
    )
  }