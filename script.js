(() => {
  "use strict";

  const config = window.SITE_CONFIG;

  if (!config) {
    console.error("未找到 SITE_CONFIG，请确认 site.config.js 已正确加载。");
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
      image.alt = `${config.profile.name} 的个人照片`;
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
        const item = link.url
          ? `<a href="${escapeHtml(link.url)}"${externalAttributes(link.url)}>${escapeHtml(link.label)}</a>`
          : `<span class="social-label">${escapeHtml(link.label)}</span>`;
        return `${index ? "<span>·</span>" : ""}${item}`;
      })
      .join("");
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
            <a class="circle-arrow" href="${escapeHtml(item.url)}"${externalAttributes(item.url)} aria-label="阅读 ${escapeHtml(item.date)} 的动态">↗</a>
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
          ? `<img src="${escapeHtml(paper.image)}" alt="${escapeHtml(paper.title)} 的项目预览图" loading="lazy" />`
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

  function setupNavigation() {
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".site-nav");
    const navigationLinks = document.querySelectorAll(".site-nav a");
    const sections = document.querySelectorAll("main section[id]");

    menuButton?.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "关闭导航" : "打开导航");
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
  renderResearchInterests();
  renderNews();
  renderPublications();
  renderJourney();
  setupNavigation();

  document.querySelector("#year").textContent = new Date().getFullYear();
})();
