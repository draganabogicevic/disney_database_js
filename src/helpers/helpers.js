export const observer = new IntersectionObserver(
  (enteries, observer) => {
    enteries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("invisible");
      } else {
        entry.target.classList.add("invisible");
      }
    });
  },
  { root: null, threshold: 0 }
);

export const removeItemFromArray = (array, item) => {
  return array.filter((el) => el.id !== item);
};
