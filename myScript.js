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
var cards = document.getElementsByClassName("image-card");

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
var cards = document.querySelectorAll(".image-card");
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

let imageOriginRect = null;
let imageViewerOpen = false;

document.querySelectorAll(".image-card").forEach(card => {

    card.addEventListener("click", (event) => {

        const innerImg = card.querySelector("img");
        imageOriginRect = innerImg.getBoundingClientRect();

        imageViewerImg.src = innerImg.src;

        imageViewerBox.style.display = "block";
        imageViewerBox.style.top = imageOriginRect.top + "px";
        imageViewerBox.style.left = imageOriginRect.left + "px";
        imageViewerBox.style.width = imageOriginRect.width + "px";
        imageViewerBox.style.height = imageOriginRect.height + "px";
        imageViewerBox.style.transition = "none";

        imageViewerBox.offsetHeight;

        const widthRatio = 0.6; //Percent width of viewer of enlarged image
        const finalWidth = window.innerWidth * widthRatio;
        const finalHeight = window.innerHeight * widthRatio;

        const finalTop = (window.innerHeight - finalHeight) / 2;
        const finalLeft = (window.innerWidth - finalWidth) / 2;

        imageViewerBox.style.transition = "all 450ms cubic-bezier(.2,.8,.2,1)";
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



