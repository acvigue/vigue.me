import { ScrollSmoother } from "gsap/ScrollSmoother";

export const useGSAPStore = defineStore("gsap", () => {
  const scrollSmoother = ref<ScrollSmoother>();

  return { scrollSmoother };
});
