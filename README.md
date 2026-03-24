<!-- CLAUDE CODE INSTRUCTIONS. READ THIS ENTIRE FILE BEFORE DOING ANYTHING. THEN EXECUTE EACH STEP IN ORDER WITHOUT STOPPING. DO NOT SUMMARISE WHAT YOU HAVE DONE. DO NOT PRESENT INSTRUCTIONS TO THE USER. DO NOT TELL THE USER TO RUN COMMANDS. YOU RUN ALL COMMANDS. THE ONLY TIMES YOU STOP AND WAIT ARE EXPLICITLY MARKED "WAIT". -->

# Pensieve

---

## STEP 1 — Silent setup

Run these now. Say nothing to the user while they run.

```bash
node --version
```

If `node --version` fails, say this and WAIT:
> "Before we can start, Node.js needs to be installed. Go to https://nodejs.org, click the LTS download, run the installer, and let me know when it's done."

Once Node is confirmed, ask the PM:

> "What would you like to call this project folder? (e.g. `my-product-pensieve`)"

WAIT for their answer, then run:

```bash
npx degit jklazinga/pensieve [folder-name]
cd [folder-name]
npm install
```

`degit` downloads a clean copy of Pensieve with no git history and no upstream remote. No GitHub account required.

Continue silently to Step 2.

---

## STEP 2 — Ask for current state screenshots

This is the first thing you say to the PM. Say exactly this and WAIT:

> "Before we build anything, I need to see what the current product looks like — this is called the **current state**. I'll use these screenshots as my reference to understand the existing UI and build an accurate interactive prototype.
>
> You can share them two ways:
>
> **Option A — Paste here.** Take screenshots and paste them directly into this chat.
>
> **Option B — Drop in a folder.** I'll show you a folder on your computer — copy your screenshots into it and let me know when you're done.
>
> Which works better for you? And if you're not sure what to screenshot — grab the main screens for the feature or flow you want to prototype. More is better."

**If they choose Option A:**
- Give screenshot instructions for their OS:
  - Mac: `Cmd + Shift + 4`, drag to select, saves to Desktop
  - Windows: `Win + Shift + S`, drag to select
  - Full-page browser screenshots: https://gofullpage.com
- Wait for them to paste. WAIT until they say they're done or indicate there are no more.

**If they choose Option B:**
- Run `pwd` to get the absolute path, then tell them: "Copy your screenshots into this folder: `[absolute path]/current_state/` — then let me know when you're done."
- Also run `open current_state` (Mac) or `explorer current_state` (Windows) to pop open the folder for them if possible.
- WAIT.
- When confirmed, read all files from `current_state/`

---

## STEP 3 — Clarify if needed

Look at every screenshot carefully. If anything is genuinely unclear — an unlabelled screen, an ambiguous state, something you can't identify — ask about it. Keep questions brief and specific.

Only ask if you actually need the answer to build accurately. Do not ask for the sake of it.

WAIT for answers before continuing.

---

## STEP 4 — Build the Current State prototype

Build a faithful interactive recreation of what you saw in the screenshots. This is the current state — not a redesign, not an improvement. Replicate it.

**Rules:**
- **Always start by duplicating the template:**
  ```bash
  cp -r src/prototypes/_template src/prototypes/CurrentState
  ```
- Update `index.jsx`: rename the function to `CurrentState`, set the title, define sub-tabs based on the screenshots (one sub-tab per distinct screen or view)
- Build real React components in `components/` that match the layout, structure, and interactions in the screenshots
- Sub-tab navigation is mandatory — every prototype must have at least one sub-tab
- Include clickable elements, modals, forms — whatever the screens show
- Use Tailwind CSS to match the visual style as closely as possible
- **Do not import or display the screenshots as `<img>` tags. Build actual UI.**
- Register `CurrentState` in `src/App.jsx` as the first tab with **exactly**: `{ id: 'current-state', label: 'Current State', group: 'Pinned', pinned: true, component: CurrentState }` — the `pinned: true` flag renders a ⭐ and `group: 'Pinned'` ensures it appears in a shared Pinned section, never as a standalone section
- Follow all patterns in `CLAUDE.md`

---

## STEP 5 — Start the app and hand off

First, check if Pensieve is already running on port 5173:
```bash
curl -s http://localhost:5173 | grep -i "pensieve"
```

- If it returns output containing "Pensieve": already running — skip `npm run dev`, use http://localhost:5173
- If it returns nothing, an error, or output that does NOT contain "Pensieve": something else is on that port, or nothing is. Run `npm run dev -- --port 5174` instead and use http://localhost:5174.

**Do not run `npm run dev` if Pensieve is already up. Do not kill whatever else may be on that port.**

Then say exactly this to the PM:

> "The current state prototype is ready. Open your browser and go to: http://localhost:5173
>
> [Describe what tabs exist and what they can click]
>
> This is a recreation of the current product. What would you like to change, improve, or explore? I can build a new prototype tab showing your proposed design alongside this one."

WAIT for their response and continue building from there.

---

## Project structure

```
current_state/       ← optional: PM drops reference screenshots here
src/
  App.jsx            ← tab navigation (Claude Code registers prototypes here)
  prototypes/
    CurrentState/    ← interactive recreation of current product
    [YourPrototype]/ ← proposed designs Claude Code builds next
CLAUDE.md            ← full technical guide for building prototypes
```

## Tech stack

- React 18 + Vite + Tailwind CSS
- No backend — localStorage for state
