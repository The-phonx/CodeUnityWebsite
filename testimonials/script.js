const collage = document.querySelector("[data-testimonial-collage]");
const testimonialTools = window.CodeUnityTestimonials;
const stories = testimonialTools?.stories || [];
let lightboxOpener = null;

function createPhotoLightbox() {
  const dialog = document.createElement("dialog");
  dialog.className = "story-lightbox";
  dialog.setAttribute("aria-label", "Expanded student photo");

  const panel = document.createElement("div");
  panel.className = "story-lightbox-panel";

  const closeButton = document.createElement("button");
  closeButton.className = "story-lightbox-close";
  closeButton.type = "button";
  closeButton.setAttribute("aria-label", "Close full-screen image");
  closeButton.textContent = "×";

  const imageWrap = document.createElement("div");
  imageWrap.className = "story-lightbox-image-wrap";
  const image = document.createElement("img");
  image.className = "story-lightbox-image";
  imageWrap.append(image);

  const caption = document.createElement("div");
  caption.className = "story-lightbox-caption";
  const name = document.createElement("strong");
  const program = document.createElement("span");
  caption.append(name, program);

  panel.append(closeButton, imageWrap, caption);
  dialog.append(panel);
  document.body.append(dialog);

  function closeLightbox() {
    if (dialog.open) dialog.close();
  }

  closeButton.addEventListener("click", closeLightbox);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeLightbox();
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("story-lightbox-open");
    image.removeAttribute("src");
    lightboxOpener?.focus();
    lightboxOpener = null;
  });

  return {
    open(story, opener) {
      lightboxOpener = opener;
      dialog.dataset.accent = ["teal", "sky"].includes(story.accent)
        ? story.accent
        : "indigo";
      image.src = story.image;
      image.alt = story.imageAlt || `Portrait of ${story.name}`;
      name.textContent = story.name;
      program.textContent = story.program;
      document.body.classList.add("story-lightbox-open");
      dialog.showModal();
      closeButton.focus();
    }
  };
}

const photoLightbox = stories.some((story) => story.image)
  ? createPhotoLightbox()
  : null;

function createStoryCard(story) {
  const card = document.createElement("article");
  card.className = `story-card story-card--${story.accent}${story.featured ? " story-card--featured" : ""} reveal`;

  const photo = testimonialTools.createPhoto(story);
  if (photo && photoLightbox) {
    card.classList.add("story-card--zoomable");
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Open full-screen photo for ${story.name}`);

    const openPhoto = () => {
      if (photo.isConnected) photoLightbox.open(story, card);
    };

    const sourceImage = photo.querySelector("img");
    sourceImage.addEventListener("error", () => {
      card.classList.remove("story-card--zoomable");
      card.removeAttribute("tabindex");
      card.removeAttribute("role");
      card.removeAttribute("aria-label");
    }, { once: true });

    card.addEventListener("click", openPhoto);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openPhoto();
      }
    });
    card.append(photo);
  } else if (photo) {
    card.append(photo);
  }

  const content = document.createElement("div");
  content.className = "story-content";

  const mark = document.createElement("span");
  mark.className = "story-mark";
  mark.setAttribute("aria-hidden", "true");
  mark.textContent = "“";

  const quote = document.createElement("blockquote");
  quote.textContent = story.quote;

  const person = document.createElement("footer");
  person.className = "story-person";
  person.append(testimonialTools.createAvatar(story, "story-avatar"));

  const details = document.createElement("div");
  const name = document.createElement("cite");
  name.textContent = story.name;
  const program = document.createElement("span");
  program.textContent = story.program;
  details.append(name, program);
  person.append(details);

  content.append(mark, quote, person);
  card.append(content);
  return card;
}

if (collage) {
  if (stories.length) {
    const fragment = document.createDocumentFragment();
    stories.forEach((story) => fragment.append(createStoryCard(story)));
    collage.append(fragment);
  } else {
    const emptyState = document.createElement("div");
    emptyState.className = "story-empty card center";
    emptyState.innerHTML = "<h3>More student messages are on the way.</h3><p>Please check back soon.</p>";
    collage.append(emptyState);
  }
}

document.querySelectorAll("[data-story-count]").forEach((element) => {
  element.textContent = stories.length || "New";
});
