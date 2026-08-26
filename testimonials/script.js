const collage = document.querySelector("[data-testimonial-collage]");
const testimonialTools = window.CodeUnityTestimonials;
const stories = testimonialTools?.stories || [];

function createStoryCard(story) {
  const card = document.createElement("article");
  card.className = `story-card story-card--${story.accent}${story.featured ? " story-card--featured" : ""} reveal`;

  const photo = testimonialTools.createPhoto(story);
  if (photo) card.append(photo);

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
