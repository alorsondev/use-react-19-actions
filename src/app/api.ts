export const fakeApiCall = (value: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value.length < 3) {
        reject('Le mot doit contenir au moins 3 caractères.')
      } else {
        resolve('Félicitations, votre mot a bien été envoyé au serveur.')
      }
    }, 1000)
  })
}
