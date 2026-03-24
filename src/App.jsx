import { useState, useEffect } from 'react'

// ============================================================
// REGISTER PROTOTYPES HERE
// Every tab MUST have a `group` property — top-level tabs are
// not allowed. Use groups to organise the sidebar into sections.
//
// The Current State tab MUST always use:
//   group: 'Pinned', pinned: true
//
// pinned: true renders a ⭐ next to the tab label and always
// places it in the Pinned section — never a standalone section.
//
// Example:
// import CurrentState from './prototypes/CurrentState'
// import ProposedRedesign from './prototypes/ProposedRedesign'
//
// const allTabs = [
//   { id: 'current-state',    label: 'Current State',    group: 'Pinned',    pinned: true,  component: CurrentState },
//   { id: 'proposed-redesign', label: 'Proposed Redesign', group: 'Proposals', component: ProposedRedesign },
// ]
// ============================================================

const allTabs = []

// Validate at startup — every tab must have a group
const ungrouped = allTabs.filter(t => !t.group)
if (ungrouped.length > 0) {
  throw new Error(
    `Pensieve: the following tabs are missing a group — top-level tabs are not allowed.\n` +
    ungrouped.map(t => `  - "${t.label}" (id: ${t.id})`).join('\n') +
    `\n\nAdd a group: e.g. { ..., group: 'Current State' }`
  )
}

const GROUP_ORDER_KEY = '__pensieve_group_order__'

function getGroups(tabs) {
  const map = {}
  const order = []
  for (const tab of tabs) {
    if (!map[tab.group]) {
      map[tab.group] = []
      order.push(tab.group)
    }
    map[tab.group].push(tab)
  }
  return order.map(g => ({ name: g, tabs: map[g] }))
}

function getInitialTab() {
  const params = new URLSearchParams(window.location.search)
  const proto = params.get('proto')
  if (proto && allTabs.find(t => t.id === proto)) return proto
  return allTabs[0]?.id
}

function App() {
  if (allTabs.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center max-w-md px-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Pensieve</h1>
          <p className="text-gray-500 text-sm">No prototypes yet. Claude Code will add tabs here as it builds them.</p>
        </div>
      </div>
    )
  }

  return <AppShell />
}

function AppShell() {
  const [activeTab, setActiveTab] = useState(getInitialTab)
  const [collapsed, setCollapsed] = useState(false)

  const groups = getGroups(allTabs)
  const activeEntry = allTabs.find(t => t.id === activeTab)
  const ActiveComponent = activeEntry?.component

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    params.set('proto', activeTab)
    window.history.replaceState(null, '', '?' + params.toString())
  }, [activeTab])

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden relative">

      {!collapsed && (
        <aside className="flex flex-col bg-gray-900 text-gray-100 w-56 flex-shrink-0">
          <div className="flex items-center justify-between px-3 py-4 border-b border-gray-700 flex-shrink-0">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 truncate">
              Pensieve
            </span>
            <button onClick={() => setCollapsed(true)} className="text-gray-400 hover:text-white p-1 rounded flex-shrink-0 ml-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-3">
            {groups.map((group, gi) => (
              <div key={group.name} className={gi > 0 ? 'mt-4' : ''}>
                <p className="px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gray-500">
                  {group.name}
                </p>
                <ul>
                  {group.tabs.map(tab => (
                    <NavItem
                      key={tab.id}
                      tab={tab}
                      active={activeTab === tab.id}
                      onSelect={setActiveTab}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>
      )}

      {collapsed && (
        <button onClick={() => setCollapsed(false)} className="absolute top-3 left-0 z-10 flex items-center justify-center w-4 h-8 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-r transition-colors">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      <main className="flex-1 overflow-auto">
        {ActiveComponent && <ActiveComponent />}
      </main>
    </div>
  )
}

function NavItem({ tab, active, onSelect }) {
  return (
    <li>
      <button
        onClick={() => onSelect(tab.id)}
        className={`w-full text-left px-3 py-2 text-sm transition-colors rounded-sm flex items-center gap-2 ${
          active ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'
        }`}
      >
        {tab.pinned
          ? <span className="flex-shrink-0 text-yellow-400 text-xs leading-none">⭐</span>
          : <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full ${active ? 'bg-white' : 'bg-gray-600'}`} />
        }
        <span className="truncate">{tab.label}</span>
      </button>
    </li>
  )
}

export default App
