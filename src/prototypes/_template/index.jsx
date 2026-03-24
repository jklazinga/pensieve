import { useState } from 'react'
import ViewOne from './components/ViewOne'
import ViewTwo from './components/ViewTwo'

// TEMPLATE — duplicate this directory for every new prototype
// 1. Rename this directory (e.g. src/prototypes/MyPrototype/)
// 2. Rename the function below (e.g. function MyPrototype())
// 3. Update the title, subTabs array, and renderSubTabContent switch
// 4. Replace ViewOne/ViewTwo with your own components
// 5. Register the prototype in src/App.jsx — MUST include a `group` property
//
// For the Current State prototype, register with:
//   { id: 'current-state', label: 'Current State', group: 'Pinned', pinned: true, component: CurrentState }

const subTabs = [
  { id: 'view-one', label: 'View One' },
  { id: 'view-two', label: 'View Two' },
]

function Template() {
  const [activeSubTab, setActiveSubTab] = useState(subTabs[0].id)

  const renderSubTabContent = () => {
    switch (activeSubTab) {
      case 'view-one': return <ViewOne />
      case 'view-two': return <ViewTwo />
      default: return null
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Prototype Title</h1>

      {/* Sub-tab navigation */}
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

export default Template
