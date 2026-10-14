# Zafar Portfolio Preview

This is an isolated, static portfolio preview. It does not connect to the existing Netlify production site, and its publication setting remains off.

## Edit the project list

Open `projects.json` to add, edit, remove, or feature a project. Keep each entry as JSON with these fields:

- `name`, `description`, `category`
- `technologies`: an array of strings
- `githubUrl`: the real repository URL (or `null` if none is available)
- `liveDemoUrl`: a real public demo URL, or `null`
- `image`: a relative image path, or `null`
- `featured`: `true` or `false`

Optional `imageAlt` gives an accurate image description. Optional `status` can label a prototype or work in progress. Featured cards appear first. Cards with no image use a designed fallback; cards with no demo URL simply omit the demo link. The website never creates a placeholder demo URL.

To add a project image, place it under `assets/images/` and set `image` to its relative path. The hero uses the user-supplied profile portrait at `assets/images/profile-portrait.webp`. Use repository links as the source of truth and do not add claims that the code does not support.

## Social profiles

The contact section’s links are in `index.html`. X, TikTok, and Instagram currently use the supplied handle `@0x_zafar`.

## Add your resume

1. Add your real PDF to `assets/documents/` and name it `resume.pdf`.
2. In `assets/js/site.js`, change `const RESUME_PATH = "";` to `const RESUME_PATH = "assets/documents/resume.pdf";`.
3. Reload the site. The script checks that the file is available; if it is, the hero control becomes **Download Resume** and downloads the PDF. If the file is missing or unavailable, **Resume Coming Soon** stays disabled.
4. Check the download in the preview before any approved production release.

The resume is public content: anyone who can access the site may download it. Remove any personal information you do not want to share before adding the PDF. You can also upload the PDF here and ask me to add it to the preview for you.

## Local preview

From this folder, run `python3 -m http.server 3000 --bind 0.0.0.0`. `projects.json` must be loaded over HTTP; do not open `index.html` directly with `file://`.

## Metadata and release note

`index.html` contains the exact requested identity and bio in page metadata, plus Open Graph and Twitter card metadata. The absolute canonical and social-preview URLs point to this isolated preview URL, not to the current production site. The preview is marked `noindex, nofollow`; replace the absolute origin and remove the preview-only `noindex` directive only as part of an explicitly approved production release, after verifying the actual production domain. The original Netlify source and deployment settings were not available in this session and have not been changed.
