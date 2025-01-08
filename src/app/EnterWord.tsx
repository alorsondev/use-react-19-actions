'use client'

import { useState } from 'react'
import { fakeApiCall } from './api'

function EnterWord() {
  const [isPending, setIsPending] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const submitAction = async (formData: FormData) => {
    setIsPending(true)
    setErrorMessage('')

    try {
      const response = await fakeApiCall(formData.get('wordInput') as string)
      setSuccessMessage(response as string)
    } catch (err) {
      setErrorMessage(err as string)
      setSuccessMessage('')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form action={submitAction} className="flex flex-col items-start">
      <div className="flex flex-col items-start gap-2 mb-2">
        <label htmlFor="wordInput">Saisissez un mot:</label>
        <input
          className="border rounded p-2"
          id="wordInput"
          name="wordInput"
          type="text"
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
