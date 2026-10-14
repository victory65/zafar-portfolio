# Zafar Portfolio — Editing and Update Guide

This is a **static website**: its pages are built from HTML, CSS, JavaScript, and JSON. It does not need a database, login system, or backend. You can keep improving the projects and copy over time without rebuilding the page layout.

The current site is an isolated review preview. It has **not** replaced the live Netlify website, and production settings, DNS, and deployment have not been changed.

## Quick file map

| File or folder | What it controls |
| --- | --- |
| `projects.json` | Project names, descriptions, categories, technologies, links, images, featured order, and status labels. |
| `index.html` | Visible page copy, sections, navigation, contact details, social-profile links, and page metadata. |
| `assets/css/styles.css` | Colors, spacing, typography, responsive layout, buttons, cards, and focus states. |
| `assets/js/site.js` | Loads project cards, handles optional image/link fallbacks, mobile navigation, and the resume button. |
| `assets/images/` | Project images and the profile portrait. |
| `assets/documents/` | Reserved location for your future `resume.pdf`. |
| `manus-routes.json` | Preview route declaration. Leave it unchanged for normal text, styling, and project updates. |

## Add, edit, remove, or feature a project

Open `projects.json`. It contains a JSON array, with one object for each project.

To **add** a project, copy this example into the array and replace the example values with real details:

```json
{
  "name": "Project name",
  "description": "A short, accurate description of what the project does today.",
  "category": "Python automation",
  "technologies": ["Python", "Example library"],
  "githubUrl": null,
  "liveDemoUrl": null,
  "image": null,
  "imageAlt": null,
  "featured": false,
  "status": "In progress"
}
```

Use a real GitHub address in `githubUrl` when one exists. Set `githubUrl`, `liveDemoUrl`, or `image` to `null` when you do not have a real value. The site hides missing optional links and displays a designed fallback when an image is absent. **Do not make up a demo link.**

To **edit** a project, change its fields. To **remove** one, delete its whole object, taking care not to break the commas between the remaining objects. Set `featured` to `true` or `false`; featured projects move to the front, but that does **not** mean they are finished or verified.

### Categories and statuses are different

- `category` describes the kind of project, such as `Desktop application`, `Mobile app`, or `Python automation`.
- `featured` is a simple highlight switch; it is not a completion claim.
- `status` is optional, free text describing the project’s current stage. Examples include `Concept`, `In progress`, `Prototype`, `Testing`, `Released`, or `Archived`. Be specific when work is incomplete, for example `Prototype · end-to-end run unverified`.

Use `Released` or `Production-ready` only when that is accurate. Never claim a feature, result, statistic, or achievement that the project does not support. The current entries use source-based descriptions and label unverified work.

### Project images

1. Put the image in `assets/images/`.
2. Set `image` to its project-relative path, for example `assets/images/my-project.webp`.
3. Add a short, accurate `imageAlt` description. If there is no suitable image, use `null` instead.

The site handles missing images without breaking the card. Use an image you have permission to publish, and optimize large images so the page stays quick to load.

## Change the visible writing or layout

Edit `index.html` to change headlines, descriptions, section labels, contact copy, and links. Write for the people visiting the portfolio: use direct invitations such as “Explore my work” or “Want to collaborate?” rather than instructions to the site owner. Keep the voice professional, honest, and personal; do not add claims the repositories cannot support.

Keep these two brand lines exactly as written unless you explicitly decide to change your brand later:

> Computer Engineer | Cybersecurity Analyst 👨‍💻🛡️
>
> Building Flutter apps | Python automations | Documenting security labs

For visual changes, edit `assets/css/styles.css`. Check both desktop and mobile widths, keep keyboard focus visible, and preserve reduced-motion support. Navigation links point to section IDs in `index.html`; if you rename an ID, update its navigation links too.

## Update social links

Find the `Social profiles` section near the bottom of `index.html`. The current X, TikTok, and Instagram links use **@0x_zafar**. When changing a handle, update both the visible link text and its `href`; keep the accessible `aria-label` accurate too. Preserve `target="_blank"` links’ `rel="noopener noreferrer"` attributes.

## Add your resume

The resume button is currently disabled because no resume PDF has been added. When you are ready:

1. Add your real PDF to `assets/documents/` and name it `resume.pdf`.
2. In `assets/js/site.js`, change `const RESUME_PATH = "";` to `const RESUME_PATH = "assets/documents/resume.pdf";`.
3. Preview the site. The script checks that the file is available; if it is, the hero control becomes **Download Resume** and downloads the PDF. If the file is missing or unavailable, **Resume Coming Soon** remains disabled.
4. Test the download before any production release.

A resume on the website is public: anyone who can access the site may download it. Remove personal details you do not want to share before adding the file. You can also upload the PDF in chat and ask me to add and test it in the preview.

## Preview and basic checks

Do not open `index.html` directly with `file://`; the browser needs to fetch `projects.json` over HTTP. In a terminal at the project folder, run:

```bash
python3 -m http.server 3000 --bind 0.0.0.0
```

Then open `http://localhost:3000/`. If port 3000 is already in use, stop the other server or choose another available port and use it consistently.

Before sharing an update, check that:

- The project file is valid JSON: `python3 -m json.tool projects.json`.
- The site script has valid syntax: `node --check assets/js/site.js`.
- Project cards and repository links load; there are no invented demos.
- Cards still look correct with `image: null` and `liveDemoUrl: null`.
- Navigation, contact links, and social links work on desktop and mobile.
- Keyboard focus is visible, and reduced-motion preferences are respected.
- If you added a resume, its download works and does not expose details you meant to keep private.

You can also send me the project details—name, description, category, technologies, GitHub URL, demo URL if real, image if available, and whether to feature it—and ask me to update the preview for you.

## Production release

Review changes in the separate preview first. The current preview is marked `noindex, nofollow`, and its canonical/social metadata point to the preview—not the production domain. Do not remove those preview protections or change the production domain, DNS, deployment settings, or live website until you explicitly approve a production release and the actual Netlify source/deployment setup has been confirmed. The existing live site remains the rollback point.
