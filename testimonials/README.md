# Adding testimonials

All testimonial content lives in `data.js`. You do not need to edit either page's markup. The homepage automatically shows the first three valid entries, and the Testimonials page shows the full list.

1. Put an approved student photo in `testimonials/images/` using a short, lowercase filename such as `anaya-singh.jpg`.
2. Open `data.js` and copy one testimonial object inside `window.CODEUNITY_TESTIMONIALS`.
3. Update `name`, `program`, and `quote`.
4. Set `image` to `../testimonials/images/anaya-singh.jpg` and write a useful `imageAlt`. Leave both blank to use an initials avatar.
5. Choose `indigo`, `teal`, or `sky` for `accent`. Set `featured` to `true` for a softly highlighted card.

Example:

```js
{
  name: "Student Name",
  program: "C.O.R.E Student",
  quote: "The student's testimonial goes here.",
  image: "../testimonials/images/student-name.jpg",
  imageAlt: "Student Name presenting a coding project",
  accent: "teal",
  featured: false
}
```

Only publish a student photo or quote after receiving permission. Use concise, descriptive alternative text for photos and never put text inside the image itself.

Entries missing `name`, `program`, or `quote` are skipped without breaking the page. If a photo path is wrong or the image cannot load, the card automatically falls back to the student's initials. Open the browser console while editing to see validation warnings.
