# [Project Name]

[Brief description of what this project does.]

---

## Tech Stack

- [Framework: Next.js / React / Vue / etc.]
- TypeScript
- [Styling: Tailwind CSS / CSS Modules / etc.]
- **Git** for version control, **GitHub** for hosting

## Workflow: Git for Designers

Git tracks every change to your code so you can undo mistakes, work on features safely, and collaborate without overwriting each other's work. This file covers the essential Git workflow for solo and small-team projects.

### Initial Setup

```bash
# Set your identity (once per machine)
git config --global user.name "[Your Name]"
git config --global user.email "[your@email.com]"

# Set default branch name to main
git config --global init.defaultBranch main

# Enable colored output
git config --global color.ui auto
```

### Daily Workflow

The basic cycle: make changes, stage them, commit them.

```bash
# Check what's changed
git status

# See the actual changes (line by line)
git diff

# Stage specific files
git add src/components/navbar.tsx
git add src/styles/globals.css

# Stage all changes (be careful — check git status first)
git add .

# Commit with a message
git commit -m "Add responsive navbar with hamburger menu"

# Push to GitHub
git push
```

### Branching Strategy

Never work directly on `main`. Use feature branches for every change.

```bash
# Create and switch to a new branch
git checkout -b feature/responsive-navbar

# Work, commit, push
git add .
git commit -m "Add responsive navbar"
git push -u origin feature/responsive-navbar

# When done, merge back to main
git checkout main
git pull                    # Get latest changes
git merge feature/responsive-navbar
git push

# Clean up the branch
git branch -d feature/responsive-navbar
```

**Branch naming conventions:**
```
feature/responsive-navbar     # New feature
fix/login-button-alignment    # Bug fix
refactor/card-component       # Code cleanup
design/homepage-redesign      # Design changes
chore/update-dependencies     # Maintenance
```

**Rules:**
- `main` is always deployable — never push broken code to it
- One branch per feature or task
- Keep branches short-lived (days, not weeks)
- Delete branches after merging

### Meaningful Commit Messages

Write commit messages that explain **what** changed and **why**.

**Format (Conventional Commits):**
```
type: short description

Optional longer explanation of what and why.
```

**Types:**
| Type | When to Use | Example |
|------|------------|---------|
| `feat` | New feature or UI | `feat: add pricing card component` |
| `fix` | Bug fix | `fix: correct button alignment on mobile` |
| `style` | Visual-only changes | `style: update heading typography scale` |
| `refactor` | Code restructure, no behavior change | `refactor: extract form validation into hook` |
| `chore` | Dependencies, config, tooling | `chore: update Tailwind to v4` |
| `docs` | Documentation | `docs: add setup instructions to README` |
| `test` | Adding or updating tests | `test: add visual regression for dashboard` |

**Good commit messages:**
```
feat: add dark mode toggle to navbar
fix: prevent form submission on invalid email
style: increase card padding from 16px to 24px
refactor: split Dashboard into smaller components
chore: add .env.local to gitignore
```

**Bad commit messages:**
```
update stuff
fix bug
wip
asdfgh
changes
```

**Rules:**
- Start with a lowercase verb
- Keep the first line under 72 characters
- If you need to explain more, add a blank line then a longer description
- Each commit should represent one logical change

### .gitignore

Tell Git which files to never track:

```gitignore
# .gitignore

# Dependencies
node_modules/

# Environment variables (SECRETS — never commit)
.env
.env.local
.env.production

# Build output
.next/
dist/
build/
out/

# OS files
.DS_Store
Thumbs.db

# Editor files
.vscode/settings.json
.idea/

# Debug logs
npm-debug.log*
yarn-debug.log*

# Vercel
.vercel/

# Playwright
test-results/
playwright-report/

# Coverage
coverage/
```

**Rules:**
- Add `.gitignore` at the start of every project — before your first commit
- Never commit `node_modules/` (reinstall with `npm install`)
- Never commit `.env` files (they contain secrets)
- Never commit build output (`dist/`, `.next/`, `build/`)

### Recovering from Mistakes

**Undo changes to a file (before staging):**
```bash
# Discard changes to a specific file
git checkout -- src/components/navbar.tsx

# Discard ALL unstaged changes (dangerous — can't undo)
git checkout -- .
```

**Unstage a file (staged but not committed):**
```bash
git reset HEAD src/components/navbar.tsx
```

**Undo the last commit (keep the changes):**
```bash
git reset --soft HEAD~1
# Changes are back in staging — you can re-commit differently
```

**Undo the last commit (discard the changes):**
```bash
git reset --hard HEAD~1
# Careful — this deletes the changes permanently
```

**Stash changes temporarily:**
```bash
# Save work-in-progress without committing
git stash

# Do something else (switch branches, pull, etc.)
git checkout main
git pull

# Come back and restore your work
git checkout feature/my-branch
git stash pop
```

**Find a lost commit (nuclear recovery):**
```bash
# See history of everything Git has done
git reflog

# Restore to a specific point
git reset --hard abc1234    # Use the hash from reflog
```

### Pull Request Workflow

For team projects, use PRs instead of merging directly:

```bash
# 1. Create a branch and push it
git checkout -b feature/new-pricing-page
# ... make changes, commit ...
git push -u origin feature/new-pricing-page

# 2. Create a PR on GitHub
gh pr create --title "Add new pricing page" --body "Redesigned pricing with tier comparison"

# 3. After review and approval, merge on GitHub

# 4. Update local main
git checkout main
git pull

# 5. Delete the branch
git branch -d feature/new-pricing-page
```

**PR best practices:**
- Keep PRs small (under 400 lines changed)
- Write a clear description of what changed and why
- Include screenshots for visual changes
- Request review from teammates
- Don't merge your own PRs (if working with a team)

### Handling Merge Conflicts

Conflicts happen when two people change the same lines:

```bash
# Pull latest main and try to merge
git checkout main
git pull
git checkout feature/my-branch
git merge main

# If conflicts exist, Git marks them in files:
<<<<<<< HEAD
  <h1 className="text-3xl font-bold">Dashboard</h1>
=======
  <h1 className="text-4xl font-semibold tracking-tight">Dashboard</h1>
>>>>>>> main
```

**To resolve:**
1. Open the conflicted file
2. Choose which version to keep (or combine both)
3. Remove the `<<<<<<<`, `=======`, and `>>>>>>>` markers
4. Stage and commit the resolution

```bash
git add src/components/dashboard.tsx
git commit -m "Resolve merge conflict in dashboard heading"
```

**Prevent conflicts:**
- Pull `main` into your branch frequently (`git merge main`)
- Keep branches short-lived
- Communicate with teammates about which files you're changing

### Git Hooks (Automated Quality Checks)

Run checks automatically before commits:

```bash
npm install -D husky lint-staged
npx husky init
```

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.css": ["prettier --write"]
  }
}
```

```bash
# .husky/pre-commit
npx lint-staged
```

Now every commit automatically formats code and checks for lint errors.

### GitHub Pages Deployment

Deploy a static site directly from a GitHub repo:

```bash
# Option 1: Deploy from a branch
# Push build output to a `gh-pages` branch
npm run build
npx gh-pages -d dist    # or -d out, -d build

# Option 2: GitHub Actions (recommended)
# .github/workflows/deploy.yml
```

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### GitHub Actions (CI on Push)

Run tests and checks automatically on every push:

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run build

  test:
    runs-on: ubuntu-latest
    needs: check
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

### Essential Commands Reference

```bash
# Status and history
git status                    # What's changed?
git log --oneline -10         # Last 10 commits (short format)
git diff                      # See unstaged changes
git diff --staged             # See staged changes

# Branching
git branch                    # List branches
git checkout -b name          # Create + switch to branch
git checkout main             # Switch to main
git branch -d name            # Delete a merged branch

# Syncing
git pull                      # Download and merge remote changes
git push                      # Upload local commits
git push -u origin branch     # Push a new branch for the first time
git fetch                     # Download remote changes (don't merge)

# Undoing
git stash                     # Temporarily save changes
git stash pop                 # Restore stashed changes
git reset --soft HEAD~1       # Undo last commit (keep changes)
git checkout -- file.tsx      # Discard changes to a file
```

### File Structure

```
[project-root]/
├── .git/                      # Git internals (don't touch)
├── .gitignore                 # Files to never track
├── .github/
│   └── workflows/
│       ├── ci.yml             # CI pipeline
│       └── deploy.yml         # Deployment pipeline
├── .husky/
│   └── pre-commit             # Pre-commit hook
├── src/                       # Your code
└── package.json               # Includes lint-staged config
```

### Anti-Patterns — Do NOT

- Commit directly to `main` — use feature branches
- Write vague commit messages ("fix stuff", "update", "wip") — be specific
- Commit `node_modules/`, `.env`, or build output — add them to `.gitignore`
- Make giant commits with 20+ files changed — commit small, logical units
- Leave branches open for weeks — merge or delete them
- Force push to `main` — it overwrites history and breaks collaborators
- Ignore merge conflicts — resolve them carefully, test after
- Commit commented-out code — delete it; Git remembers everything
- Store large binary files (images >1MB, videos) in Git — use Git LFS or external storage
- Share credentials through Git — use environment variables
- Skip the pre-commit hook — if it's failing, fix the issue
- Rebase shared branches — only rebase your own unpushed branches

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Feature branches for all changes, merged via PR
- Conventional commit messages (`feat:`, `fix:`, `style:`, etc.)
- Pre-commit hooks run linting and formatting
- CI runs on every push and PR
- `main` is always deployable

## Notes

[Any project-specific context — GitHub repo URL, team members, deployment target]
