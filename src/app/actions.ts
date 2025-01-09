'use server'

import { fakeApiCall } from './api'

export const submitAction = async (prevState, formData: FormData) => {
  try {
    const response = await fakeApiCall(formData.get('wordInput') as string)
    return { successMessage: response as string }
  } catch (err) {
    return { errorMessage: err as string }
  }
}
