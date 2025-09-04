# Spencer Vargo — Mechanical Engineering Portfolio

A simple, responsive portfolio suitable for GitHub Pages hosting.

## Files
- `index.html` — Main page with sections for Projects, Certifications, Experience, and Contact
- `styles.css` — Modern, accessible styling with responsive layout
- `script.js` — Mobile navigation toggle and dynamic year
- `favicon.svg` — Site icon

## Use with GitHub Pages

1. Create a new public GitHub repository.
   - For a user site: name it `<username>.github.io` (example: `spencervargo.github.io`).
   - For a project site: any repo name is fine.
2. Drag and drop these files into the repository root and commit.
3. If it's a project site, enable Pages:
   - Settings → Pages → Source: `Deploy from a branch`
   - Branch: `main` (or `master`) → Folder: `/ (root)` → Save
4. After ~1–2 minutes your site will be live at:
   - User site: `https://<username>.github.io/`
   - Project site: `https://<username>.github.io/<repo>/`

## Personalize

- Update content in `index.html` (projects, certifications, experience, contact email, LinkedIn).
- To add a resume, place `resume.pdf` in the root and uncomment the Resume link in `index.html`.
- Replace placeholder project media by swapping the `.card-media.placeholder` with an image:

```html
<div class="card-media">
  <img src="images/gearbox.jpg" alt="Prototype gearbox assembly" width="640" height="360" />
  </div>
```

## Local preview
Open `index.html` in a browser (no build tools required).

## License
MIT — Feel free to use and modify.