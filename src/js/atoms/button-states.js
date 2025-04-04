/**
 * Button States Manager
 * 
 * Manages the visual states of buttons based on user interactions:
 * - Default state
 * - Focus state
 * - Hover state
 * - Active state
 * 
 * @version 2.1
 */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("button[data-state-default]").forEach(button => {
    if (button.disabled) return;

    button.addEventListener("focus", () => {
      button.setAttribute("data-focused", "true");
      updateButtonState(button, "focus");
    });

    button.addEventListener("blur", () => {
      button.removeAttribute("data-focused");
      updateButtonState(button, "default");
    });

    button.addEventListener("mouseover", () => {
      const newState = button.hasAttribute("data-focused") ? "focus" : "hover";
      updateButtonState(button, newState);
    });

    button.addEventListener("mouseout", () => {
      const newState = button.hasAttribute("data-focused") ? "focus" : "default";
      updateButtonState(button, newState);
    });

    button.addEventListener("mousedown", () => {
      updateButtonState(button, "active");
    });

    button.addEventListener("mouseup", () => {
      const newState = button.hasAttribute("data-focused") ? "focus" : "hover";
      updateButtonState(button, newState);
    });
  });
});

/**
 * Updates the button state based on the data-state-* attributes
 * 
 * @param {HTMLElement} button - The button element to update
 * @param {string} state - The new state to apply (default, focus, hover, active)
 */
function updateButtonState(button, state) {
  console.log(`State updated: ${state}`); // Log to verify state change

  // Remove all state classes
  button.classList.remove(
    button.dataset.stateDefault,
    button.dataset.stateFocus,
    button.dataset.stateHover,
    button.dataset.stateActive
  );

  // Add the class corresponding to the current state
  const newStateClass = button.dataset[`state${state.charAt(0).toUpperCase() + state.slice(1)}`];
  if (newStateClass) {
    button.classList.add(newStateClass);
  }

  console.log("Classes after update:", button.classList.value);
}