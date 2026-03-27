// fetch('../JSON%20files/color_palete.json')
//   .then(response => response.json())
//   .then(data => {
//     // console.log("File found with primary color of " + data.primary_color);
//     // Apply JSON values as CSS variables
//     const root = document.documentElement;
//     root.style.setProperty('--primary_color', data.primary_color);
//     root.style.setProperty('--secondary_color', data.secondary_color)
//     root.style.setProperty('--background_color', data.background_color);
//     root.style.setProperty('--text_color', data.text_color);
//     root.style.setProperty('--eye_catcher', data.eye_catcher);
//     root.style.setProperty('--compliment_eye_catcher', data.compliment_eye_catcher);
//     root.style.setProperty('--secondary_background_color', data.secondary_background_color);
//   });

data = {
    "primary_color": "rgb(0,112,60)",
    "secondary_color": "rgb(18,26,30)",
    "background_color" : "rgb(14,15,25)",
    "secondary_background_color": "rgb(66, 54, 41)",
    "text_color" : "rgb(218,215,205)",
    "eye_catcher" : "rgb(198,124,116)",
    "compliment_eye_catcher" : "rgb(60,145,230)"
}

const root = document.documentElement;
root.style.setProperty('--primary_color', data.primary_color);
root.style.setProperty('--secondary_color', data.secondary_color)
root.style.setProperty('--background_color', data.background_color);
root.style.setProperty('--text_color', data.text_color);
root.style.setProperty('--eye_catcher', data.eye_catcher);
root.style.setProperty('--compliment_eye_catcher', data.compliment_eye_catcher);
root.style.setProperty('--secondary_background_color', data.secondary_background_color);