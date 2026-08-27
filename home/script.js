const testimonialGrid = document.querySelector("[data-home-testimonials]");
const testimonialTools = window.CodeUnityTestimonials;
const featuredStories = testimonialTools?.stories.slice(0, 3) || [];

function createHomeTestimonial(story) {
  const card = document.createElement("section");
  card.className = `card testimonial-card testimonial-card--${story.accent} reveal`;

  const mark = document.createElement("div");
  mark.className = "testimonial-mark";
  mark.setAttribute("aria-hidden", "true");
  mark.textContent = "“";

  const quote = document.createElement("blockquote");
  quote.textContent = story.quote;

  const person = document.createElement("div");
  person.className = "testimonial-person";
  person.append(testimonialTools.createAvatar(story, "testimonial-avatar"));

  const details = document.createElement("div");
  const name = document.createElement("cite");
  name.textContent = story.name;
  const program = document.createElement("span");
  program.textContent = story.program;
  details.append(name, program);
  person.append(details);

  card.append(mark, quote, person);
  return card;
}

if (testimonialGrid) {
  if (featuredStories.length) {
    const fragment = document.createDocumentFragment();
    featuredStories.forEach((story) => fragment.append(createHomeTestimonial(story)));
    testimonialGrid.append(fragment);
  } else {
    const emptyState = document.createElement("p");
    emptyState.className = "card card-pad center testimonial-empty";
    emptyState.textContent = "More student messages are on the way.";
    testimonialGrid.append(emptyState);
  }
}

document.querySelector("[data-subscribe-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = event.currentTarget.querySelector("input");
  input.value = "";
  input.placeholder = "Thanks for subscribing!";
});
