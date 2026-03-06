fetch('../JSON%20files/color_palete.json')
  .then(response => response.json())
  .then(data => {
    // console.log("File found with primary color of " + data.primary_color);
    // Apply JSON values as CSS variables
    const root = document.documentElement;
    root.style.setProperty('--primary_color', data.primary_color);
    root.style.setProperty('--secondary_color', data.secondary_color)
    root.style.setProperty('--background_color', data.background_color);
    root.style.setProperty('--text_color', data.text_color);
    root.style.setProperty('--eye_catcher', data.eye_catcher);
    root.style.setProperty('--compliment_eye_catcher', data.compliment_eye_catcher);
    root.style.setProperty('--secondary_background_color', data.secondary_background_color);
  });
