import { useEffect, RefObject } from "react";


/**
 * Custom hook that triggers a callback when a click is detected outside the passed ref
 * @param ref - The ref to the element that we want to detect clicks outside of
 * @param onClickOutside - The callback function to be triggered on outside click
 */
function useClickedOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  onClickOutside: () => void
): void {

  useEffect(() => {
    
    /**
     * Trigger callback if clicked outside of the element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    }


    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {

      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
    
  }, [ref, onClickOutside]);
}

export default useClickedOutside;
