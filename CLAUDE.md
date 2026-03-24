<!-- CLAUDE CODE: If the project is already cloned and set up, begin with the "Build a prototype" section below. If setup hasn't been done yet, read README.md and follow it from Step 1. -->

# CLAUDE.md — Building Prototypes in Pensieve

This document is for Claude Code. When a PM opens this project locally, read this file and check whether setup is complete (i.e. does `src/prototypes/CurrentState/` exist?). If not, follow README.md setup steps. If yes, go straight to asking the PM what they want to build next — do not wait to be asked.

## Project Overview

Pensieve is a React-based prototype starter for PMs. It uses a tab-based architecture where each prototype is a self-contained module. The **Current State** tab renders screenshots of the existing product as a visual reference. New prototypes go alongside it.

### Tech Stack
- **React 18+** with functional components and hooks
- **Tailwind CSS** for styling
- **Vite** as the build tool
- **localStorage** for data persistence
- **No external state management** — uses React Context API where needed

## Architecture Overview

```
src/
├── App.jsx              # Main app with tab navigation (add new prototypes here)
├── prototypes/
│   ├── _template/       # Duplicate this for every new prototype
│   ├── CurrentState/    # Interactive recreation of current product (built by Claude Code)
│   └── YourPrototype/   # Proposed designs Claude Code builds alongside
current_state/           # PM drops reference screenshots here — Claude Code reads them, never copies them
```

### Application Flow
1. `App.jsx` defines all tabs and renders tab navigation
2. Each tab loads a prototype component
3. Each prototype can have sub-tabs for different views
4. Data persists via localStorage with unique keys per prototype

---

## Step-by-Step: Creating a New Prototype

### STEP 1: Duplicate the template

**Always** start from the template. Never build a prototype from scratch.

```bash
cp -r src/prototypes/_template src/prototypes/YourPrototypeName
```

The template has sub-tab navigation already wired. You must keep it. Sub-tabs are mandatory in every prototype.

### STEP 2: Create the main index component

File: `src/prototypes/YourPrototypeName/index.jsx`

**Minimal template with sub-tab navigation:**
```jsx
import { useState } from 'react'
import FirstView from './components/FirstView'
import SecondView from './components/SecondView'

const subTabs = [
  { id: 'first-view', label: 'First View' },
  { id: 'second-view', label: 'Second View' },
]

function YourPrototypeName() {
  const [activeSubTab, setActiveSubTab] = useState('first-view')

  const renderSubTabContent = () => {
    switch (activeSubTab) {
      case 'first-view': return <FirstView />
      case 'second-view': return <SecondView />
      default: return null
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Prototype Name</h1>

      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-8">
          {subTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeSubTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {renderSubTabContent()}
    </div>
  )
}

export default YourPrototypeName
```

### STEP 3: Build components

File: `src/prototypes/YourPrototypeName/components/YourComponent.jsx`

```jsx
import { useState } from 'react'

function YourComponent() {
  const [state, setState] = useState(null)

  return (
    <div className="space-y-4">
      {/* Component content */}
    </div>
  )
}

export default YourComponent
```

### STEP 4: Register in App.jsx

```jsx
// 1. Import
import YourPrototypeName from './prototypes/YourPrototypeName'

// 2. Add to allTabs array — group is REQUIRED
{ id: 'your-prototype-id', label: 'Your Prototype Name', group: 'Your Group Name', component: YourPrototypeName },

// For the Current State prototype specifically — ALWAYS use exactly this:
{ id: 'current-state', label: 'Current State', group: 'Pinned', pinned: true, component: CurrentState },
```

**`group` is mandatory.** Every tab must belong to a group. Top-level ungrouped tabs will throw an error on startup. Group name appears as a section header in the sidebar — use something descriptive like `'Proposals'`, `'Explorations'`.

**Current State is special:** it must always use `group: 'Pinned'` and `pinned: true`. This renders a ⭐ star next to it in the sidebar and places it in the shared "Pinned" section — never in its own standalone section. Do not use any other group name for Current State.

### STEP 5: Test

```bash
npm run dev
```

Check sub-tabs work, data persists on refresh, no console errors.

---

## Design System & Styling

### Color Palette
```jsx
// Primary (Blue)
bg-blue-50, bg-blue-500, bg-blue-600, bg-blue-700
text-blue-600, text-blue-700

// Neutral (Gray)
bg-gray-50, bg-gray-100, bg-gray-900
text-gray-400, text-gray-500, text-gray-700, text-gray-900

// Success (Green)
bg-green-50, text-green-600, text-green-700

// Warning (Yellow/Amber)
bg-amber-50, text-amber-700

// Danger (Red)
bg-red-50, text-red-600, text-red-700
```

### Spacing Standards
```jsx
p-6        // Main container
mb-6       // Section spacing
mb-4       // Component spacing
space-y-4  // Stacked elements
gap-4      // Grid gaps
```

### Typography
```jsx
text-2xl font-bold              // Page title
text-lg font-medium             // Section title
text-sm font-medium text-gray-700  // Labels
text-sm text-gray-500           // Secondary text
text-xs text-gray-500           // Helper text
```

### Common UI Patterns

**Button variants:**
```jsx
// Primary
<button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Action</button>

// Secondary
<button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">Cancel</button>

// Danger
<button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Delete</button>
```

**Modal:**
```jsx
{showModal && (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Title</h3>
        <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
      </div>
      {/* content */}
    </div>
  </div>
)}
```

**Empty state:**
```jsx
<div className="text-center py-12">
  <p className="text-gray-500 mb-4">No items yet</p>
  <button onClick={handleCreate} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
    Create First Item
  </button>
</div>
```

**Data table:**
```jsx
<div className="bg-white shadow-sm rounded-lg overflow-hidden">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Column</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {items.map(item => (
        <tr key={item.id} className="hover:bg-gray-50">
          <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

---

## State & Data Persistence

### When to use Context
Only when data needs to be shared across multiple sibling components in a prototype. For single-component state, `useState` is sufficient.

### Context template

File: `src/prototypes/YourPrototypeName/contexts/YourContext.jsx`

```jsx
import { createContext, useContext, useState, useEffect } from 'react'

const YourContext = createContext()
const STORAGE_KEY = 'your-prototype-v1'

const defaultData = {
  items: [],
  settings: {},
}

export function YourContextProvider({ children }) {
  const [data, setData] = useState(defaultData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setData(JSON.parse(saved))
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!loading) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) }
      catch (e) { console.error(e) }
    }
  }, [data, loading])

  const addItem = (item) => setData(prev => ({ ...prev, items: [...prev.items, { ...item, id: Date.now() }] }))
  const updateItem = (id, updates) => setData(prev => ({ ...prev, items: prev.items.map(i => i.id === id ? { ...i, ...updates } : i) }))
  const deleteItem = (id) => setData(prev => ({ ...prev, items: prev.items.filter(i => i.id !== id) }))
  const reset = () => { localStorage.removeItem(STORAGE_KEY); setData(defaultData) }

  return (
    <YourContext.Provider value={{ data, loading, addItem, updateItem, deleteItem, reset }}>
      {children}
    </YourContext.Provider>
  )
}

export function useYourContext() {
  const ctx = useContext(YourContext)
  if (!ctx) throw new Error('useYourContext must be used within YourContextProvider')
  return ctx
}
```

**Wrap your prototype:**
```jsx
import { YourContextProvider } from './contexts/YourContext'

function YourPrototype() {
  return <YourContextProvider><YourPrototypeContent /></YourContextProvider>
}
```

---

## Common Issues

| Issue | Solution |
|---|---|
| Data not persisting | Verify `STORAGE_KEY` is unique; check localStorage in DevTools |
| Component not rendering | Verify export default; check import path |
| Tabs not working | Verify switch case IDs match `subTabs` array IDs |
| Styling not applying | Check Tailwind class names; use `className` not `class` |

---

## Quick Reference

```bash
npm run dev        # Start dev server (http://localhost:5173)
npm run build      # Production build
npm run preview    # Preview production build
```

**File naming conventions:**
- Components: `PascalCase.jsx`
- Directories: `PascalCase/`
- Contexts: `YourContext.jsx`
- Utilities: `camelCase.js`

---

## Notes for Claude Code

- Do not copy LPR-specific logic from other projects. Build fresh.
- Keep prototypes self-contained — no cross-prototype imports.
- Start simple; iterate on user feedback.
- Always test: sub-tabs render, data persists on refresh, no console errors.
- The `CurrentState` prototype is for reference display only — do not build interactive logic into it.
- **Seeing screenshots in the Current State tab does NOT mean the task is done.** The task is done when a new interactive prototype tab exists with real React components. Never stop after onboarding.
