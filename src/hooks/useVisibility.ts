import { useState } from "react";

export function useVisibility(defaultValue: boolean): [boolean, VoidFunction] {
  const [isVisible, setVisible] = useState(defaultValue);

  const toggleVisibility = () => {
    setVisible(shouldBeVisible => !shouldBeVisible);
  }

  return [isVisible, toggleVisibility];
}