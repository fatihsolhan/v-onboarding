import type { AttachableElement } from "@/types/lib";

/**
 * Recursively search for an element within shadow DOMs
 */
function querySelectorDeep(selector: string, root: Document | ShadowRoot | Element = document): Element | null {
  // First try to find in the current root
  const element = root.querySelector(selector);
  if (element) return element;

  // Search in shadow roots of all elements
  const allElements = root.querySelectorAll('*');
  for (const el of allElements) {
    if (el.shadowRoot) {
      const found = querySelectorDeep(selector, el.shadowRoot);
      if (found) return found;
    }
  }

  return null;
}

export default function useGetElement(element: AttachableElement) {
  if (typeof element === "string") {
    // First try normal querySelector (faster)
    const found = document.querySelector(element);
    if (found) return found;

    // If not found, search within shadow DOMs
    return querySelectorDeep(element);
  }
  else if (typeof element === 'function') {
    return element();
  }
  return null;
}
