# TODO — Zafar Portfolio Preview

**Preview status:** Implemented and verified in the separate review environment. **Production release:** Not performed; remains approval-gated.

## Brand and responsive portfolio — Complete in preview
- Use the exact professional identity: “Computer Engineer | Cybersecurity Analyst 👨‍💻🛡️”.
- Use the exact bio: “Building Flutter apps | Python automations | Documenting security labs”. Do not replace the title or rewrite the bio.
- Build a polished premium dark portfolio with restrained electric-purple accents and subtle blue highlights. Keep it clean, professional, responsive, and free of excessive animation/glow.
- Use the profile image supplied by the user as the hero portrait.
- Include clear navigation, hero, project showcase, skills/about context, contact actions, and social links.

## Maintainable project catalog and honest content — Complete in preview
- Load project cards from a separate `projects.json` file so projects can be added, edited, removed, and featured without rewriting the website layout.
- Support project name, description, category, technologies, GitHub URL, optional live demo URL, optional image, and featured status.
- Handle missing images and omitted optional links gracefully; never render a broken image or misleading empty link/button.
- Use genuine repository URLs and source-backed descriptions. Do not invent demos, achievements, statistics, or completed features.
- Launch with a small selection of suitable projects. Clearly label prototypes and work in progress. Exclude projects with unresolved credential exposure. Do not present the ransomware project as a normal runnable demo.

## Resume-ready feature — Complete for the current launch stage
- Place a clearly visible “Resume Coming Soon” button directly in the homepage hero, alongside “View Projects” and “Contact Me”; keep all three balanced and responsive across desktop and mobile.
- Reserve `assets/documents/resume.pdf` for the future resume. Do not create a fake resume or link to a nonexistent file.
- Keep the resume control visibly and accessibly disabled until the real PDF exists.
- After the PDF is added, make activation a minimal path/configuration change so the button becomes “Download Resume” and downloads the PDF directly.
- Match the premium dark theme with restrained electric-purple accents.

## Accessible metadata and interactions — Complete in preview
- Ensure navigation, project links, contact actions, mobile layouts, and controls work correctly with keyboard interaction and visible focus.
- Provide semantic structure, appropriate contrast, accessible social-link names, and reduced-motion behavior.
- Write the visible site copy to speak to prospective visitors rather than the site owner; use direct invitations and visitor-oriented descriptions without adding unsupported claims.
- Use the supplied `@0x_zafar` handle for X, TikTok, and Instagram links.
- Add appropriate title, description, and social-sharing metadata.

## Isolated preview and production protection — Preview ready; production release open
- Implement and review the replacement only in this separate preview project. Preserve the existing live site, production deployment/settings, domain, DNS, and rollback point.
- Verify desktop and mobile layouts, `projects.json` loading, and graceful handling of missing images and optional demo links.
- Do not publish to production, change DNS, or modify production settings without explicit approval.
- Production deployment remains pending the user's explicit approval and access to the existing source/deployment setup.
