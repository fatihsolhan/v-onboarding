import { StepEntity } from "@/types/StepEntity";

export default function useGetElement(element: StepEntity['attachTo']['element']) {
  if (typeof element === "string") {
    return document.querySelector(element);
  }
  else if (typeof element === 'function') {
    return element();
  }
  return null;
}
