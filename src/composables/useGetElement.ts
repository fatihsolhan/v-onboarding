import { isRef } from "vue";
import type { AttachableElement } from "@/types/lib";

function querySelectorDeep(selector: string, root: Document | ShadowRoot | Element = document): Element | null {
  const element = root.querySelector(selector)
  if (element) return element

  const allElements = root.querySelectorAll('*')
  for (const el of allElements) {
    if (el.shadowRoot) {
      const found = querySelectorDeep(selector, el.shadowRoot)
      if (found) return found
    }
  }

  return null
}

export default function useGetElement(element: AttachableElement): Element | null {
  if (isRef(element)) {
    const value = element.value
    if (value && !(value instanceof Element) && value.$el) {
      return value.$el
    }
    return value ?? null
  }

  if (typeof element === "string") {
    const found = document.querySelector(element)
    if (found) return found
    return querySelectorDeep(element)
  }

  if (typeof element === 'function') {
    return element()
  }

  return null
}
