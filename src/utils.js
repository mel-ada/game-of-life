export const getRandomBool = () => {
  // Generate "random" number 1-3
  // If the floor of (random number / 2) === 1, return true
  // Else return false
  return Math.floor(Math.floor(Math.random() * 3) / 2) === 1;
};
