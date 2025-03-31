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
   * Met à jour l'état du bouton en fonction des attributs `data-state-*`.
   */
  function updateButtonState(button, state) {
    console.log(`État mis à jour : ${state}`); // Log pour vérifier le changement
  
    // Supprime toutes les classes d'état
    button.classList.remove(
      button.dataset.stateDefault,
      button.dataset.stateFocus,
      button.dataset.stateHover,
      button.dataset.stateActive
    );
  
    // Ajoute la classe correspondant à l'état
    const newStateClass = button.dataset[`state${state.charAt(0).toUpperCase() + state.slice(1)}`];
    if (newStateClass) {
      button.classList.add(newStateClass);
    }
  
    console.log("Classes après mise à jour :", button.classList.value);
  }
  