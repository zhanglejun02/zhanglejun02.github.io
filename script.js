(() => {
  "use strict";

  const config = window.SITE_CONFIG;

  if (!config) {
    console.error("SITE_CONFIG not found. Make sure site.config.js is loaded.");
    return;
  }

  const escapeHtml = (value = "") =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const isExternalUrl = (url = "") => /^https?:\/\//i.test(url);
  const externalAttributes = (url = "") =>
    isExternalUrl(url) ? ' target="_blank" rel="noopener noreferrer"' : "";

  function renderMetadata() {
    document.title = config.meta.title;

    const metadata = {
      'meta[name="description"]': config.meta.description,
      'meta[property="og:title"]': config.meta.title,
      'meta[property="og:description"]': config.meta.description,
      'meta[property="og:url"]': config.meta.url,
    };

    Object.entries(metadata).forEach(([selector, content]) => {
      document.querySelector(selector)?.setAttribute("content", content);
    });
  }

  function renderProfile() {
    const fields = {
      name: config.profile.name,
      shortName: config.profile.shortName,
      intro: config.profile.intro,
      about: config.profile.about,
      email: config.profile.email,
      location: config.profile.location,
    };

    Object.entries(fields).forEach(([field, value]) => {
      document.querySelectorAll(`[data-site="${field}"]`).forEach((element) => {
        element.textContent = value;
      });
    });

    document.querySelectorAll('[data-site-link="email"]').forEach((link) => {
      if (config.profile.email) {
        link.href = `mailto:${config.profile.email}`;
      } else {
        link.hidden = true;
      }
    });

    document.querySelectorAll('[data-site-link="cv"]').forEach((link) => {
      if (config.profile.cv) {
        link.href = config.profile.cv;
      } else {
        link.hidden = true;
      }
    });

    const portrait = document.querySelector("#portrait");
    if (portrait && config.profile.photo) {
      portrait.replaceChildren();
      const image = document.createElement("img");
      image.src = config.profile.photo;
      image.alt = `Photo of ${config.profile.name}`;
      image.loading = "eager";
      portrait.append(image);
      portrait.classList.add("has-photo");
    }
  }

  function renderSocialLinks() {
    const container = document.querySelector("#social-links");
    if (!container) return;

    container.innerHTML = config.socialLinks
      .map((link, index) => {
        let item;
        if (link.qrCode) {
          item = `<button class="social-button" type="button" data-qr-code="${escapeHtml(link.qrCode)}" data-qr-label="${escapeHtml(link.label)}">${escapeHtml(link.label)}</button>`;
        } else if (link.url) {
          item = `<a href="${escapeHtml(link.url)}"${externalAttributes(link.url)}>${escapeHtml(link.label)}</a>`;
        } else {
          item = `<span class="social-label">${escapeHtml(link.label)}</span>`;
        }
        return `${index ? "<span>·</span>" : ""}${item}`;
      })
      .join("");
  }

  function setupQrDialog() {
    const dialog = document.querySelector("#qr-dialog");
    if (!dialog) return;

    const image = dialog.querySelector("img");
    const title = dialog.querySelector("#qr-dialog-title");

    document.querySelectorAll("[data-qr-code]").forEach((button) => {
      button.addEventListener("click", () => {
        image.src = button.dataset.qrCode;
        image.alt = `${button.dataset.qrLabel} QR code`;
        title.textContent = `Scan to add me on ${button.dataset.qrLabel}`;
        dialog.showModal();
      });
    });

    dialog.querySelector(".qr-dialog-close").addEventListener("click", () => {
      dialog.close();
    });

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  }

  function renderResearchInterests() {
    config.researchInterests.slice(0, 2).forEach((interest, index) => {
      const title = document.querySelector(`[data-interest-title="${index}"]`);
      const description = document.querySelector(
        `[data-interest-description="${index}"]`,
      );
      if (title) title.textContent = interest.title;
      if (description) description.textContent = interest.description;
    });

    const hobbies = document.querySelector("#hobbies");
    if (hobbies) {
      hobbies.innerHTML = `I also enjoy<br />${config.hobbies
        .map(escapeHtml)
        .join(",<br />")}<span>.</span>`;
    }
  }

  function renderNews() {
    const container = document.querySelector("#news-list");
    if (!container) return;

    container.innerHTML = config.news
      .map(
        (item) => `
          <article class="news-item">
            <time datetime="${escapeHtml(item.datetime)}">${escapeHtml(item.date)}</time>
            <div class="news-content">
              <span class="tag${item.featured ? " tag-red" : ""}">${escapeHtml(item.tag)}</span>
              <p>${escapeHtml(item.text)}</p>
            </div>
            <a class="circle-arrow" href="${escapeHtml(item.url)}"${externalAttributes(item.url)} aria-label="Read the ${escapeHtml(item.date)} update">↗</a>
          </article>`,
      )
      .join("");
  }

  function renderPublications() {
    const container = document.querySelector("#paper-list");
    if (!container) return;

    container.innerHTML = config.publications
      .map((paper) => {
        const authors = paper.authors
          .map((author, index) =>
            index === paper.selfAuthorIndex
              ? `<strong>${escapeHtml(author)}</strong>`
              : escapeHtml(author),
          )
          .join(", ");
        const visual = paper.image
          ? `<img src="${escapeHtml(paper.image)}" alt="Preview of ${escapeHtml(paper.title)}" loading="lazy" />`
          : `<span>PROJECT<br />VISUAL</span><i class="${escapeHtml(paper.decoration)}-shape"></i>`;
        const badge = paper.badge
          ? `<span class="tag${paper.badge === "ORAL" ? " tag-red" : ""}">${escapeHtml(paper.badge)}</span>`
          : "";
        const links = paper.links
          .map(
            (link) =>
              `<a href="${escapeHtml(link.url)}"${externalAttributes(link.url)}>${escapeHtml(link.label)} ↗</a>`,
          )
          .join("");

        return `
          <article class="paper-card">
            <div class="paper-thumb thumb-${escapeHtml(paper.theme)}">${visual}</div>
            <div class="paper-info">
              <div class="paper-meta">
                <span class="venue">${escapeHtml(paper.venue)}</span>
                ${badge}
              </div>
              <h3>${escapeHtml(paper.title)}</h3>
              <p class="authors">${authors}</p>
              <p class="paper-desc">${escapeHtml(paper.description)}</p>
              <div class="paper-links">${links}</div>
            </div>
          </article>`;
      })
      .join("");
  }

  function renderJourney() {
    const container = document.querySelector("#timeline");
    if (!container) return;

    container.innerHTML = `
      <div class="timeline-line"></div>
      ${config.journey
        .map(
          (item) => `
            <article>
              <span class="timeline-dot"></span>
              <time>${escapeHtml(item.period)}</time>
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.organization)}</p>
            </article>`,
        )
        .join("")}`;
  }

  function setupContributionBand() {
    const grid = document.querySelector("#contribution-grid");
    const doraemon = document.querySelector("#contribution-doraemon");
    if (!grid || !doraemon) return;

    const stage = grid.parentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rows = 7;
    const speed = 110;
    let columns = [];
    let pitch = 16;
    let gridLeft = 0;
    let headWidth = 64;
    let lastColumn = -1;
    let elapsed = 0;
    let lastTime = null;
    let frameId = null;
    let builtWidth = 0;

    const randomBaseLevel = () => {
      const roll = Math.random();
      if (roll < 0.8) return 0;
      if (roll < 0.92) return 1;
      if (roll < 0.97) return 2;
      if (roll < 0.99) return 3;
      return 4;
    };

    function buildGrid() {
      const styles = getComputedStyle(grid);
      const cellSize = parseFloat(styles.gridAutoColumns);
      const gap = parseFloat(styles.columnGap);
      const count = Math.floor((stage.clientWidth + gap) / (cellSize + gap));
      const fragment = document.createDocumentFragment();

      columns.flat().forEach((cell) => clearTimeout(cell.timer));
      columns = [];

      for (let column = 0; column < count; column += 1) {
        const cells = [];
        for (let row = 0; row < rows; row += 1) {
          const element = document.createElement("i");
          const base = randomBaseLevel();
          element.dataset.level = String(base);
          fragment.append(element);
          cells.push({ element, base, timer: null });
        }
        columns.push(cells);
      }

      grid.replaceChildren(fragment);
      pitch = cellSize + gap;
      gridLeft = columns[0]?.[0].element.offsetLeft ?? 0;
      headWidth = doraemon.offsetWidth;
      builtWidth = stage.clientWidth;
      lastColumn = -1;
    }

    function lightColumn(index) {
      columns[index]?.forEach((cell) => {
        if (Math.random() < 0.3) return;
        cell.element.dataset.level = String(1 + Math.floor(Math.random() * 4));
        cell.element.classList.add("is-lit");
        cell.element.animate(
          [{ transform: "scale(1)" }, { transform: "scale(1.45)" }, { transform: "scale(1)" }],
          { duration: 420, easing: "ease-out" },
        );
        clearTimeout(cell.timer);
        cell.timer = setTimeout(() => {
          cell.element.classList.remove("is-lit");
          cell.element.dataset.level = String(cell.base);
        }, 1600 + Math.random() * 2200);
      });
    }

    function placeDoraemon(distance) {
      const x = distance - headWidth;
      const step = distance / 38;
      const hop = Math.abs(Math.sin(step)) * -14 + 7;
      const tilt = Math.sin(step) * 6;
      doraemon.style.transform = `translate(${x}px, ${hop}px) rotate(${tilt}deg)`;
      return x;
    }

    function frame(time) {
      if (lastTime !== null) elapsed += Math.min(time - lastTime, 100);
      lastTime = time;

      const travel = stage.clientWidth + headWidth * 2;
      const x = placeDoraemon(((elapsed / 1000) * speed) % travel);
      const column = Math.floor((x + headWidth / 2 - gridLeft) / pitch);

      if (column !== lastColumn) {
        lastColumn = column;
        lightColumn(column);
      }

      frameId = requestAnimationFrame(frame);
    }

    function start() {
      if (frameId !== null) return;
      lastTime = null;
      frameId = requestAnimationFrame(frame);
    }

    function stop() {
      if (frameId === null) return;
      cancelAnimationFrame(frameId);
      frameId = null;
    }

    buildGrid();

    let resizeTimer = null;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (stage.clientWidth === builtWidth) return;
        buildGrid();
        if (reduceMotion) placeDoraemon(stage.clientWidth * 0.7 + headWidth);
      }, 150);
    });

    if (reduceMotion) {
      placeDoraemon(stage.clientWidth * 0.7 + headWidth);
      return;
    }

    if (!("IntersectionObserver" in window)) {
      start();
      return;
    }

    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    }).observe(stage);
  }

  function setupNavigation() {
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".site-nav");
    const navigationLinks = document.querySelectorAll(".site-nav a");
    const sections = document.querySelectorAll("main section[id]");

    menuButton?.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    navigationLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuButton?.setAttribute("aria-expanded", "false");
      });
    });

    if (!("IntersectionObserver" in window)) return;

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navigationLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`,
            );
          });
        });
      },
      { rootMargin: "-25% 0px -65%" },
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  renderMetadata();
  renderProfile();
  renderSocialLinks();
  setupQrDialog();
  renderResearchInterests();
  renderNews();
  renderPublications();
  renderJourney();
  setupNavigation();
  setupContributionBand();

  document.querySelector("#year").textContent = new Date().getFullYear();
})();
