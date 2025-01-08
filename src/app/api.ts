export const fakeApiCall = (value: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value.length < 3) {
        reject('The input must be at least 3 characters long.')
      } else {
        resolve(value)
      }
    }, 1000)
  })
}
