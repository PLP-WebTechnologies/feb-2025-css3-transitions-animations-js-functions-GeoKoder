document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const body = document.body;
  const animationBox = document.getElementById("animationBox");
  const triggerButton = document.getElementById("triggerButton");
  const themeToggle = document.getElementById("themeToggle");
  const colorOptions = document.querySelectorAll(".color-option");

  // Local Storage Functions
  function savePreference(key, value) {
    localStorage.setItem(key, value);
  }

  function getPreference(key, defaultValue) {
    const savedValue = localStorage.getItem(key);
    return savedValue !== null ? savedValue : defaultValue;
  }

  // Apply saved preferences on page load
  function applySavedPreferences() {
    // Apply theme preference
    const savedTheme = getPreference("theme", "light");
    if (savedTheme === "dark") {
      body.classList.add("dark-theme");
    }

    // Apply color preference
    const savedColor = getPreference("boxColor", "#3498db");
    animationBox.style.backgroundColor = savedColor;

    // Mark the selected color option
    colorOptions.forEach((option) => {
      if (option.dataset.color === savedColor) {
        option.classList.add("selected");
      }
    });
  }

  // Animation toggle function
  function toggleAnimation() {
    animationBox.classList.toggle("animated");

    // Save animation state
    const isAnimated = animationBox.classList.contains("animated");
    savePreference("isAnimated", isAnimated);
  }

  // Theme toggle function
  function toggleTheme() {
    body.classList.toggle("dark-theme");

    // Save theme preference
    const isDarkTheme = body.classList.contains("dark-theme");
    savePreference("theme", isDarkTheme ? "dark" : "light");
  }

  // Set up event listeners
  triggerButton.addEventListener("click", toggleAnimation);
  themeToggle.addEventListener("click", toggleTheme);

  // Box color selection
  colorOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Remove selected class from all options
      colorOptions.forEach((opt) => opt.classList.remove("selected"));

      // Add selected class to clicked option
      this.classList.add("selected");

      // Get selected color
      const selectedColor = this.dataset.color;

      // Apply color to box (with transition)
      animationBox.style.backgroundColor = selectedColor;

      // Save color preference
      savePreference("boxColor", selectedColor);
    });
  });

  // Box click animation
  animationBox.addEventListener("click", function () {
    // If not already animated, trigger animation temporarily
    if (!this.classList.contains("animated")) {
      this.classList.add("animated");

      // Remove animation after 2 seconds
      setTimeout(() => {
        this.classList.remove("animated");
      }, 2000);
    }
  });

  // Apply saved preferences when page loads
  applySavedPreferences();

  // Apply saved animation state
  const savedAnimationState = getPreference("isAnimated", "false");
  if (savedAnimationState === "true") {
    animationBox.classList.add("animated");
  }
});
