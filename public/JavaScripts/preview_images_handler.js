const fileInput = document.getElementById("image_input");
const preview = document.getElementById("preview_images");

let filesArray = [];

fileInput.addEventListener("change", () => {
    // Convert FileList to array
    filesArray = Array.from(fileInput.files);

    // Clear preview
    preview.innerHTML = "";

    // Show each image
    filesArray.forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = e => {
        const div = document.createElement("div");
        div.classList.add("preview-item");

        const img = document.createElement("img");
        img.src = e.target.result;

        const btn = document.createElement("button");
        btn.textContent = "X";
        btn.classList.add("remove-btn");
        btn.onclick = () => {
        filesArray.splice(index, 1); // remove from array
        div.remove(); // remove from DOM
        };

        div.appendChild(img);
        div.appendChild(btn);
        preview.appendChild(div);
    };
    reader.readAsDataURL(file);
    });
});