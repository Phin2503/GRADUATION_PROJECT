import React, { ReactElement, ReactNode, useCallback, useState } from 'react'

interface TabProps {
  label: string
  tabName: string
  children: ReactNode
}
interface TabsProps {
  children: ReactElement<TabProps>[]
}
const Tabs: React.FC<TabsProps> = ({ children }) => {
  const initialTab = children[0]?.props.label

  const [activeTab, setActiveTab] = useState<string | undefined>(initialTab)

  const handleActiveTab = useCallback((label: string) => setActiveTab(label), [])

  const tabs = children.map((child: any) => (
    <button
      key={child.props.label}
      onClick={(e) => {
        e.preventDefault()
        handleActiveTab(child.props.label)
      }}
      className={`border-none py-4 px-8 bg-white cursor-pointer relative ${activeTab === child.props.label ? 'text-[#3077c4] font-semibold after:content-[""] after:absolute after:left-0 after:bottom-[-11px] after:h-[3px] after:w-full after:bg-blue-500' : ''}`}
    >
      {child.props.tabName}
    </button>
  ))

  const tabContent = children.filter((child: any) => child.props.label === activeTab)
  return (
    <>
      <div className='py-[10px]  border-[#bbbbbb] bg-white flex items-center justify-center mb-8'>{tabs}</div>
      <>{tabContent}</>
    </>
  )
}

export default Tabs

export const Tab: React.FC<TabProps> = ({ children }) => {
  return <>{children}</>
}
