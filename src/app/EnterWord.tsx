'use client'

import { useActionState } from 'react'

import { fakeApiCall } from './api'

function EnterWord() {
  const submitAction = async (prevState, formData: FormData) => {
    try {
      const response = await fakeApiCall(formData.get('wordInput') as string)
      return { successMessage: response as string }
    } catch (err) {
      return { errorMessage: err as string }
    }
  }

  const [formState, formAction, isPending] = useActionState(submitAction, null)

  return (
    <form action={formAction} className="flex flex-col items-start">
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
      {formState?.errorMessage && <p style={{ color: 'red' }}>{formState.errorMessage}</p>}
      {formState?.successMessage && <p>{formState.successMessage}</p>}
    </form>
  )
}

export default EnterWord
