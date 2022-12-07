export const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
