(function () {
  const allowedAccents = new Set(["indigo", "teal", "sky"]);
  const websiteIcon = document.currentScript?.src
    ? new URL("logo-transparent.png", document.currentScript.src).href
    : "../shared/logo-transparent.png";
  const rawStories = Array.isArray(window.CODEUNITY_TESTIMONIALS)
    ? window.CODEUNITY_TESTIMONIALS
    : [];

  function cleanText(value) {
    return typeof value === "string" ? value.trim() : "";
  }

  function normalizeStory(story, index) {
    if (!story || typeof story !== "object") {
      console.warn(`Testimonial ${index + 1} was skipped because it is not an object.`);
      return null;
    }

    const normalized = {
      name: cleanText(story.name),
      program: cleanText(story.program),
      quote: cleanText(story.quote),
      image: cleanText(story.image),
      imageAlt: cleanText(story.imageAlt),
      accent: allowedAccents.has(story.accent) ? story.accent : "indigo",
      featured: story.featured === true
    };

    if (!normalized.name || !normalized.program || !normalized.quote) {
      console.warn(
        `Testimonial ${index + 1} was skipped. name, program, and quote are required.`
      );
      return null;
    }

    return normalized;
  }

  const stories = rawStories.map(normalizeStory).filter(Boolean);

  function createAvatar(_story, className) {
    const avatar = document.createElement("img");
    avatar.className = className;
    avatar.src = websiteIcon;
    avatar.alt = "";
    avatar.width = 48;
    avatar.height = 48;
    avatar.setAttribute("aria-hidden", "true");
    return avatar;
  }

  function createPhoto(story) {
    if (!story.image) return null;

    const figure = document.createElement("figure");
    figure.className = "story-photo";

    const image = document.createElement("img");
    image.src = story.image;
    image.alt = story.imageAlt || `Portrait of ${story.name}`;
    image.loading = "lazy";
    image.width = 720;
    image.height = 540;
    image.addEventListener("error", () => figure.remove(), { once: true });
    figure.append(image);
    return figure;
  }

  window.CodeUnityTestimonials = Object.freeze({
    stories,
    createAvatar,
    createPhoto
  });
})();
