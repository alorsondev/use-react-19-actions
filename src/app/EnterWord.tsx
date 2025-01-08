'use client'

import { useState } from 'react'
import { fakeApiCall } from './api'

function EnterWord() {
  const [inputValue, setInputValue] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsPending(true)
    setError('')

    try {
      const response = await fakeApiCall(inputValue)
      setResult(response as string)
      setInputValue('')
    } catch (err) {
      setError(err as string)
      setResult('')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-start">
      <div className="flex flex-col items-start gap-2 mb-2">
        <label htmlFor="wordInput">Enter a word:</label>
        <input
          className="border rounded p-2"
          id="wordInput"
          name="wordInput"
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Type something..."
        />
      </div>
      <button type="submit" disabled={isPending} className="rounded p-2 bg-cyan-600 text-white">
        {isPending ? 'Loading...' : 'Submit'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && <p>Submitted Word: {result}</p>}
    </form>
  )
}

export default EnterWord
