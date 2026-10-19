// skripte.js (bereinigt & robust)
document.addEventListener("DOMContentLoaded", () => {
  // 1) Fade-In (falls CSS .fade-in existiert)
  document.body.classList.add("fade-in");

  const skullZone = document.getElementById("click-zone"); // container div
  const skull = document.getElementById("skull-btn"); // img inside container
  const sound = document.getElementById("krch"); // <audio id="krch" src="sounds/krch.mp3">

  // helper: safe play (catches autoplay block errors)
  function safePlayAudio(audioEl) {
    if (!audioEl) return;
    try {
      const p = audioEl.play();
      if (p && typeof p.then === "function") {
        p.catch((e) => {
          // user gesture required — ignore quietly
          console.warn("Audio play blocked:", e);
        });
      }
    } catch (e) {
      console.warn("Audio play error:", e);
    }
  }

  // Hover / touch feedback: rotate + sound
  if (skullZone && skull) {
    // Mouse hover
    skullZone.addEventListener("pointerenter", (ev) => {
      skullZone.classList.add("hover-active");
      safePlayAudio(sound);
    });

    skullZone.addEventListener("pointerleave", () => {
      skullZone.classList.remove("hover-active");
    });

    // Touch: treat quick touch as hover feedback (but don't navigate automatically)
    skullZone.addEventListener(
      "touchstart",
      (ev) => {
        // prevent immediate double-handling by pointer events
        ev.preventDefault();
        skullZone.classList.add("hover-active");
        safePlayAudio(sound);
        // remove hover state after short time for touch
        setTimeout(() => skullZone.classList.remove("hover-active"), 600);
      },
      { passive: false }
    );

    skullZone.addEventListener("click", () => {
      document.body.classList.add("fade-out");
      setTimeout(() => {
        window.location.href = "menu.html"; 
      }, 400);
    });
  } else {

    if (!skullZone)
      console.info("Kein #click-zone gefunden (Skull container).");
    if (!skull) console.info("Kein #skull-btn gefunden (Skull image).");
  }

  const backZone = document.getElementById("back-zone"); 

  if (backZone) {
    backZone.addEventListener("click", () => {
      document.body.classList.add("fade-out");
      setTimeout(() => {
        window.location.href = "index.html"; 
      }, 400);
    });
  } else {
    console.info("Kein #back-zone gefunden (Back click area).");
  }
});
