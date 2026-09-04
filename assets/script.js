(function () {
  "use strict";

  const slides = Array.from(document.querySelectorAll(".slide"));
  const progressEl = document.querySelector(".deck-progress");
  const btnNext = document.querySelector(".nav-next");
  const btnPrev = document.querySelector(".nav-prev");

  let current = 0;
  const usedTopicIds = [];

  function poolTopics() {
    return TOPICS.filter((t) => !usedTopicIds.includes(t.id));
  }

  function update() {
    slides.forEach((s, i) => s.classList.toggle("is-active", i === current));
    if (progressEl) progressEl.textContent = (current + 1) + " / " + slides.length;

    const target = slides[current];
    if (
      target.classList.contains("slide-wheel") &&
      !target.dataset.played &&
      !target.dataset.playing
    ) {
      target.dataset.playing = "1";
      playSequence(target);
    }
  }

  function next() {
    if (current < slides.length - 1) {
      current++;
      update();
    }
  }

  function prev() {
    if (current > 0) {
      current--;
      update();
    }
  }

  // ---------- Roleta ----------

  const WHEEL_COLORS = ["var(--barro)", "var(--rio)", "var(--mata-700)", "var(--barro-600)"];

  function buildWheel(wheelEl, topics) {
    const n = topics.length;
    const stops = topics.map((t, i) => {
      const start = (360 / n) * i;
      const end = (360 / n) * (i + 1);
      return WHEEL_COLORS[i % WHEEL_COLORS.length] + " " + start + "deg " + end + "deg";
    });
    wheelEl.style.background = "conic-gradient(" + stops.join(",") + ")";

    wheelEl.querySelectorAll(".wheel-segment-label").forEach((el) => el.remove());

    const radius = wheelEl.offsetWidth / 2 * 0.62;
    topics.forEach((t, i) => {
      const segAngle = 360 / n;
      const mid = segAngle * i + segAngle / 2;
      const label = document.createElement("span");
      label.className = "wheel-segment-label";
      label.textContent = t.short;
      label.style.transform =
        "rotate(" + mid + "deg) translateY(-" + radius + "px) rotate(" + (-mid) + "deg) translate(-50%, -50%)";
      wheelEl.appendChild(label);
    });
  }

  function fillReveal(revealEl, topic) {
    revealEl.querySelector(".topic-title").textContent = topic.title;
    revealEl.querySelector(".topic-text").textContent = topic.text;
    const ul = revealEl.querySelector(".topic-facts");
    ul.innerHTML = "";
    topic.facts.forEach((f) => {
      const li = document.createElement("li");
      li.textContent = f;
      ul.appendChild(li);
    });
  }

  // Duração de cada etapa da animação (em ms) — usadas tanto no CSS
  // quanto aqui, para os tempos baterem certinho.
  const T_CHAR_DELAY = 2000;   // espera antes do menino se mexer
  const T_CHAR_TWEEN = 2000;   // duração do tween do menino até a roleta
  const T_BEFORE_SPIN = 2000;  // espera antes de girar a roleta
  const T_SPIN = 2500;         // duração do giro
  const T_LABEL_IN = 400;      // fade do nome do foco aparecendo
  const T_HOLD_LABEL = 2000;   // espera com o nome do foco visível
  const T_FADE_OUT = 600;      // fade de tudo ficando invisível
  const T_GAP = 1000;          // espera com tudo invisível
  const T_FADE_IN = 700;       // fade do layout final aparecendo

  function playSequence(slide) {
    const wheelEl = slide.querySelector(".wheel");
    const charEl = slide.querySelector(".character");
    const stageEl = slide.querySelector(".wheel-stage");
    const labelEl = slide.querySelector(".landed-label");
    const revealEl = slide.querySelector(".topic-reveal");

    const remaining = poolTopics();
    buildWheel(wheelEl, remaining);

    let chosenTopic = null;

    // 1) menino tween até a roleta
    setTimeout(() => {
      charEl.classList.add("is-in");
    }, T_CHAR_DELAY);

    // 2) roleta gira e já define o foco sorteado
    setTimeout(() => {
      const n = remaining.length;
      const chosenIndex = Math.floor(Math.random() * n);
      chosenTopic = remaining[chosenIndex];
      usedTopicIds.push(chosenTopic.id);

      const segAngle = 360 / n;
      const mid = segAngle * chosenIndex + segAngle / 2;
      const fullSpins = 5 * 360;
      const jitter = Math.random() * 10 - 5;
      const rotation = fullSpins - mid + jitter;
      wheelEl.style.transform = "rotate(" + rotation + "deg)";
    }, T_CHAR_DELAY + T_CHAR_TWEEN + T_BEFORE_SPIN);

    // 3) nome do foco sorteado aparece acima da roleta
    setTimeout(() => {
      labelEl.textContent = chosenTopic.title;
      labelEl.classList.add("is-shown");
    }, T_CHAR_DELAY + T_CHAR_TWEEN + T_BEFORE_SPIN + T_SPIN);

    // 4) tudo fica invisível
    setTimeout(() => {
      stageEl.classList.add("is-hidden");
    }, T_CHAR_DELAY + T_CHAR_TWEEN + T_BEFORE_SPIN + T_SPIN + T_LABEL_IN + T_HOLD_LABEL);

    // 5) layout final: menino + roleta (menores) acima do texto do tópico
    setTimeout(() => {
      labelEl.classList.remove("is-shown");
      fillReveal(revealEl, chosenTopic);
      slide.classList.add("is-final");
      slide.dataset.played = "1";
      delete slide.dataset.playing;
      stageEl.classList.remove("is-hidden");
      revealEl.classList.add("is-shown");
    }, T_CHAR_DELAY + T_CHAR_TWEEN + T_BEFORE_SPIN + T_SPIN + T_LABEL_IN + T_HOLD_LABEL + T_FADE_OUT + T_GAP);
  }

  // ---------- Controles ----------

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "Enter") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft" || e.key === " " || e.code === "Space") {
      e.preventDefault();
      prev();
    }
  });

  if (btnNext) btnNext.addEventListener("click", next);
  if (btnPrev) btnPrev.addEventListener("click", prev);

  let touchStartX = null;
  document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  document.addEventListener("touchend", (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) next();
      else prev();
    }
    touchStartX = null;
  }, { passive: true });

  update();
})();
