// skripte.js (bereinigt & robust)
document.addEventListener("DOMContentLoaded", () => {
  // 1) Fade-In (falls CSS .fade-in existiert)
  document.body.classList.add("fade-in");

  const swiper = new Swiper(".swiper", {
    // Optional parameters
    loop: true,
    slidesPerView: 2,
    speed: 2500,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
  });

  // ------------ Elements (optional) -------------
  const skullZone = document.getElementById("click-zone"); // container div
  const skull = document.getElementById("skull-btn"); // img inside container


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


skullZone.addEventListener("touchstart", () => {
        
        skullZone.classList.add (hover"hover-active");
        setTimeout(() => skullZOne.classList.remove("hover_activ")
                   }, {passive:true}
    );

  setTimeout(() => {
    window.location.href = "menu.html";
  }, 150);
}, { passive: false });


    // Click -> navigate to menu (with fade-out)
    skullZone.addEventListener("click", () => {
      document.body.classList.add("fade-out");
      setTimeout(() => {
        window.location.href = "menu.html"; // lowercase and exact filename required
      }, 400);
    });
  } else {
    // helpful console info if user forgot IDs
    if (!skullZone)
      console.info("Kein #click-zone gefunden (Skull container).");
    if (!skull) console.info("Kein #skull-btn gefunden (Skull image).");
  }

  // ------------ Back navigation (menu -> index) -------------
  const backZone = document.getElementById("back-zone"); // fullscreen clickable area on menu

  if (backZone) {
    backZone.addEventListener("click", () => {
      document.body.classList.add("fade-out");
      setTimeout(() => {
        window.location.href = "index.html"; // lowercase and exact filename required
      }, 400);
    });
  } else {
    console.info("Kein #back-zone gefunden (Back click area).");
  }
});
