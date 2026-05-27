# Git history purge — incident runbook

**Incident:** `users.json` and `orphaned-users.json` (Firebase Auth export with real
emails, display names, and scrypt password hashes) were committed to the **public**
`rob637/passcpa` repository in commits `b6bbf15` and `caf68fb`.

The files have been removed from `HEAD` (commits `208cc20` + `bf648ec`) and
pushed to `origin/main`. **However, the data still exists in git history.**
Anyone can run `git log --all -p -- users.json` and read it. This runbook
removes them from history.

> ⚠️ **History rewrite is destructive.** Every collaborator must re-clone after
> the force-push. Do this during a quiet window and tell every contributor
> in advance.

> ⚠️ **The repo is public — assume the data is already mirrored.** History
> rewrite reduces future exposure but does not undo the breach. The
> user-notification + key-rotation steps in `INCIDENT_CHECKLIST.md` are higher
> priority.

---

## 0. Prerequisites

```bash
# Install git-filter-repo (the official recommendation; `git filter-branch` is deprecated)
pipx install git-filter-repo
# or:  pip install --user git-filter-repo
# or:  brew install git-filter-repo
which git-filter-repo  # must print a path
```

Make sure your working tree is clean (or stash unrelated WIP):

```bash
git status                       # should be clean OR only the 5 unrelated WIP files
git stash push -u -m "wip-before-purge"   # if needed
```

## 1. Mirror-clone a throwaway working copy

`git-filter-repo` insists on a fresh clone:

```bash
cd /tmp
git clone --mirror https://github.com/rob637/passcpa passcpa-purge.git
cd passcpa-purge.git
```

## 2. Verify the files are present in history

```bash
git log --all --oneline -- users.json orphaned-users.json
# Expected: at least commits b6bbf15 and caf68fb (and the bf648ec delete)
```

## 3. Purge the files from all history

```bash
git filter-repo --invert-paths \
  --path users.json \
  --path orphaned-users.json \
  --force
```

`--invert-paths` means "keep everything EXCEPT these paths." This rewrites
every commit that touched either file and drops their content from the pack.

## 4. Verify the purge

```bash
# Should print NOTHING:
git log --all --oneline -- users.json orphaned-users.json

# Should print NOTHING:
git grep "passwordHash" $(git rev-list --all) -- '*.json' 2>/dev/null | head

# Repack size should drop noticeably:
git gc --prune=now --aggressive
du -sh .
```

## 5. Force-push the rewritten history

> ⚠️ Branch protection on `main` will reject force-pushes. Temporarily
> disable it (via GitHub UI or `gh api`) for this step ONLY, then re-enable.

```bash
# Re-add the real origin (mirror clones use a slightly different URL handling)
git remote set-url origin https://github.com/rob637/passcpa.git

# Force-push every branch and tag
git push origin --force --all
git push origin --force --tags
```

## 6. Tell GitHub Support to purge cached blob SHAs

Even after the force-push, the old commit SHAs (`b6bbf15`, `caf68fb`) remain
fetchable for ~90 days via direct URL:
`https://github.com/rob637/passcpa/blob/<sha>/users.json`

File a GitHub Support ticket immediately:

- URL: <https://support.github.com/contact?subject=Sensitive%20Data%20Removal>
- Subject: **Urgent: sensitive PII removal from public repo (post-rewrite cache purge)**
- Body template:

  ```
  Repository: rob637/passcpa (public)
  Files: users.json, orphaned-users.json (entire file contents in both)
  Sensitive data: real user email addresses, display names, and Firebase Auth
    scrypt passwordHash values from a Firebase Auth user export.
  Original commits: b6bbf15, caf68fb
  Cleanup commits (HEAD removal): 208cc20, bf648ec
  History rewrite force-push: <date/time + new HEAD sha>
  Please purge cached blob and commit SHAs from GitHub's cache and confirm
  they are no longer fetchable via the static URLs.
  ```

## 7. Force every fork to re-sync (or delete them)

```bash
gh api repos/rob637/passcpa/forks --paginate -q '.[].full_name'
```

Each fork retains the leaked data in its history. You cannot force a third
party to purge their fork; if any fork is yours, repeat steps 1–5 on it.
If a fork is not yours, contact the owner via the issue tracker. GitHub
Support can also unlist forks during a sensitive-data removal.

## 8. Have every collaborator re-clone

```bash
# In their existing checkout:
cd <their-checkout>
git fetch origin
git reset --hard origin/main           # if on main
# OR easier:
cd ..
rm -rf <old-checkout>
git clone https://github.com/rob637/passcpa.git
```

## 9. Re-enable branch protection

```bash
# Re-run the branch-protection setup from INCIDENT_CHECKLIST.md step 4.
```

## 10. Confirm working-tree backup is still safe

After the purge, `/tmp/users.json.backup` and `/tmp/orphaned-users.json.backup`
remain on disk in this Codespace. Keep them only as long as you need them
for the breach-reset email dispatch (`scripts/dispatch-breach-resets.cjs`).
**Delete them** when done:

```bash
rm /tmp/users.json.backup /tmp/orphaned-users.json.backup
```

---

## Why not `git filter-branch` or BFG?

- `git filter-branch` is officially deprecated; Git's own docs point to
  `git-filter-repo`.
- BFG Repo-Cleaner works fine but doesn't handle some edge cases (e.g.
  `.gitignore` rewrites, replace-refs) as cleanly as `git-filter-repo`.
- For a small repo with two specific paths, `git-filter-repo --invert-paths`
  is the simplest correct tool.
