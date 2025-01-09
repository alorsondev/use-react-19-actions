'use client'

import { useState } from 'react'
import { fakeApiCall } from './api'

function EnterWord() {
  const [inputValue, setInputValue] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsPending(true)
    setErrorMessage('')

    try {
      const response = await fakeApiCall(inputValue)
      setSuccessMessage(response as string)
      setInputValue('')
    } catch (err) {
      setErrorMessage(err as string)
      setSuccessMessage('')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-start">
      <div className="flex flex-col items-start gap-2 mb-2">
        <label htmlFor="wordInput">Saisissez un mot:</label>
        <input
          className="border rounded p-2"
          id="wordInput"
          name="wordInput"
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Tapez un mot..."
        />
      </div>
      <button type="submit" disabled={isPending} className="rounded p-2 bg-cyan-600 text-white">
        {isPending ? 'Chargement...' : 'Envoyer'}
      </button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p>{successMessage}</p>}
    </form>
  )
}

export default EnterWord
