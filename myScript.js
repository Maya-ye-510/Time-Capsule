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
    dragElement(document.getElementById("mydiv"));

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
const cards = document.querySelectorAll(".card");
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


