//Count Down:
    const targetDate = new Date(2041, 2, 1, 0, 0, 0);

    function updateCountdown() {
      const now = new Date();
      const diff = targetDate - now;
    
  if (diff <= 0) {
    document.getElementById("countdown").innerText = "Open the Time Capsule Now";
    return;
        }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("countdown").innerText =
    `${days} Days ${hours} Hours ${minutes} ' ${seconds} ''until Feb 1, 2041`;
        }
    
        updateCountdown();
        setInterval(updateCountdown, 1000);
        
            
//Make the DIV element draggagle:
var cards = document.querySelectorAll(".image-card, .text-card");

for (var i = 0; i < cards.length; i++) {
    dragElement(cards[i]);
}

function dragElement(elmnt) {
    
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Random div scattering:
var cards = document.querySelectorAll(".image-card, .text-card");
  const placed = [];
  const allowedOverlap = 10; //pixels

  function isOverlapping(x, y, width, height) {
    for (let box of placed) {

      // Shrink effective boundaries by allowedOverlap
      if (
        x < box.x + box.width - allowedOverlap &&
        x + width - allowedOverlap > box.x &&
        y < box.y + box.height - allowedOverlap &&
        y + height - allowedOverlap > box.y
      ) {
        return true;
      }
    }
    return false;
  }

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    let x, y;
    let attempts = 0;

    do {
      x = Math.random() * (window.innerWidth - width);
      y = Math.random() * (window.innerHeight - height);
      attempts++;
      if (attempts > 1000) break;
    } while (isOverlapping(x, y, width, height));

    placed.push({ x, y, width, height });

    card.style.left = x + "px";
    card.style.top = y + "px";
  });

//Image Opening Javascript

const imageViewerBox = document.getElementById("imageViewerBox");
const imageViewerImg = document.getElementById("imageViewerImg");
const hoverTitleElement = document.getElementById("hoverTitle");
const hoverDescElement = document.getElementById("hoverDesc");

let imageOriginRect = null;
let imageViewerOpen = false;

document.querySelectorAll(".image-card").forEach(card => {

    card.addEventListener("click", (event) => {

        const innerImg = card.querySelector("img");
        imageOriginRect = innerImg.getBoundingClientRect();

        // Set image
        imageViewerImg.src = innerImg.src;

        // 🔥 Only inject hover text if card is hoverable
        if (card.classList.contains("hoverable")) {

            imageViewerBox.classList.add("enable-hover");

            hoverTitleElement.textContent =
                card.getAttribute("data-hover-title") || "";

            hoverDescElement.textContent =
                card.getAttribute("data-hover-desc") || "";

            document
                .querySelector(".image-hover-text")
                .style.display = "flex";

        } else {

            imageViewerBox.classList.remove("enable-hover");

            // Hide hover text container entirely
            document
                .querySelector(".image-hover-text")
                .style.display = "none";
        }
        
        // Continue with your expand animation...
        imageViewerBox.style.display = "block";
        imageViewerBox.style.top = imageOriginRect.top + "px";
        imageViewerBox.style.left = imageOriginRect.left + "px";
        imageViewerBox.style.width = imageOriginRect.width + "px";
        imageViewerBox.style.height = imageOriginRect.height + "px";
        imageViewerBox.style.transition = "none";

        imageViewerBox.offsetHeight;

        const finalWidth = window.innerWidth * 0.6;
        const finalHeight = window.innerHeight * 0.6;

        const finalTop = (window.innerHeight - finalHeight) / 2;
        const finalLeft = (window.innerWidth - finalWidth) / 2;

        imageViewerBox.style.transition =
            "all 450ms cubic-bezier(.2,.8,.2,1)";
        imageViewerBox.style.top = finalTop + "px";
        imageViewerBox.style.left = finalLeft + "px";
        imageViewerBox.style.width = finalWidth + "px";
        imageViewerBox.style.height = finalHeight + "px";

        imageViewerOpen = true;
        event.stopPropagation();
    });
});

document.addEventListener("click", () => {
    if (!imageViewerOpen) return;

    hoverTitleElement.textContent = "";
    hoverDescElement.textContent = "";

    imageViewerBox.style.top = imageOriginRect.top + "px";
    imageViewerBox.style.left = imageOriginRect.left + "px";
    imageViewerBox.style.width = imageOriginRect.width + "px";
    imageViewerBox.style.height = imageOriginRect.height + "px";

    imageViewerOpen = false;

    setTimeout(() => {
        imageViewerBox.style.display = "none";
        imageViewerBox.style.transition = "none";
    }, 450);
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && imageViewerOpen) {
        document.dispatchEvent(new Event("click"));
    }
});

// Text box opening and closing

const textExpandBox = document.getElementById("textExpandBox");
const textExpandInner = document.getElementById("textExpandInner");

let textOriginRect = null;
let textExpandOpen = false;

document.querySelectorAll(".text-card").forEach(card => {

    card.addEventListener("click", (evt) => {

        const targetPanelId = card.getAttribute("data-panel");
        const sourceTemplate = document.getElementById(targetPanelId);
        if (!sourceTemplate) return;

        textOriginRect = card.getBoundingClientRect();

        textExpandInner.innerHTML = sourceTemplate.innerHTML;

        textExpandBox.style.display = "block";
        textExpandBox.style.top = textOriginRect.top + "px";
        textExpandBox.style.left = textOriginRect.left + "px";
        textExpandBox.style.width = textOriginRect.width + "px";
        textExpandBox.style.height = textOriginRect.height + "px";
        textExpandBox.style.transition = "none";

        textExpandBox.offsetHeight;

        const finalWidth = window.innerWidth * 0.6;
        const finalHeight = window.innerHeight * 0.6;

        const finalTop = (window.innerHeight - finalHeight) / 2;
        const finalLeft = (window.innerWidth - finalWidth) / 2;

        textExpandBox.style.transition = "all 450ms cubic-bezier(.2,.8,.2,1)";
        textExpandBox.style.top = finalTop + "px";
        textExpandBox.style.left = finalLeft + "px";
        textExpandBox.style.width = finalWidth + "px";
        textExpandBox.style.height = finalHeight + "px";

        setTimeout(() => {
            textExpandBox.classList.add("active");
        }, 300);

        textExpandOpen = true;
        evt.stopPropagation();
    });
});

document.addEventListener("click", (evt) => {
    if (!textExpandOpen) return;
    if (textExpandBox.contains(evt.target)) return;

    textExpandBox.classList.remove("active");

    textExpandBox.style.top = textOriginRect.top + "px";
    textExpandBox.style.left = textOriginRect.left + "px";
    textExpandBox.style.width = textOriginRect.width + "px";
    textExpandBox.style.height = textOriginRect.height + "px";

    textExpandOpen = false;

    setTimeout(() => {
        textExpandBox.style.display = "none";
        textExpandBox.style.transition = "none";
    }, 450);
});





