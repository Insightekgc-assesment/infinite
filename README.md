# Entrepreneur Storytelling Content System

This static site is now backed by an automated generator that scans entrepreneur image files and Word (`.docx`) interview documents and builds website content automatically.

## How it works

1. `scripts/generate_story_content.py` scans the images folder and the docs folder.
2. It matches files by normalized entrepreneur names, ignoring:
   - `Feature_`
   - `Article`
   - spaces, underscores, hyphens
   - capitalization
3. It extracts the `.docx` content and creates `cards.json` with the following fields:
   - `id`
   - `name`
   - `image`
   - `title`
   - `story`
   - `slug`
4. The website fetches `cards.json` and renders cards and detail pages automatically.

## Run the generator

Install dependencies:

```bash
pip install -r requirements.txt
```

Generate content:

```bash
python scripts/generate_story_content.py --images-dir images --docs-dir docs --output cards.json
```

If your images and docs are in a shared folder, point both args to the same path.

## Website integration

- `article.html` fetches `cards.json` and renders the homepage cards from the generated JSON.
- `article-detail.html` renders the story page from the selected interview JSON entry.

## Notes

- New files added to the images/docs folders appear automatically after re-running the generator.
- No manual JSON editing is required.
