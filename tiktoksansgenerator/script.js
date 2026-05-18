const imageInput = document.getElementById('imageInput');
const textInput = document.getElementById('textInput');
const colorInput = document.getElementById('colorInput');
const sizeInput = document.getElementById('sizeInput');
const userImage = document.getElementById('userImage');
const overlayText = document.getElementById('overlayText');
const downloadBtn = document.getElementById('downloadBtn');
const canvasPreview = document.getElementById('canvasPreview');

// 1. Handle image upload and display it
imageInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            userImage.src = event.target.result;
            userImage.style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
});

// 2. Main function to update all text properties simultaneously
function updateText() {
    // Sync text content
    overlayText.textContent = textInput.value || "your text here.";
    // Sync text color
    overlayText.style.color = colorInput.value;
    // Sync font size
    overlayText.style.fontSize = sizeInput.value + 'px';
}

// 3. Attach listeners to the inputs so the text refreshes instantly
textInput.addEventListener('input', updateText);
colorInput.addEventListener('input', updateText);
sizeInput.addEventListener('input', updateText);

// Run the function once at startup to set the defaults
updateText();

// 4. Download final image
downloadBtn.addEventListener('click', function() {
    html2canvas(canvasPreview, {
        useCORS: true,
        logging: false,
        scale: 2 // Boosts download quality so the text stays perfectly sharp
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'tiktok-sans-image.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});