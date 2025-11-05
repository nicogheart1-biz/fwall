"use client";

import { useEffect, useState } from "react";

type TabI = {
  active?: boolean;
  label: string;
};
type TabGroupI = {
  onTabChange?: (tab: TabI) => void;
  tabs: TabI[];
};

const TabGroup = (props: TabGroupI) => {
  const { tabs = [], onTabChange = () => ({}) } = props;

  const [activeTab, setActiveTab] = useState(
    tabs.find((tab) => tab.active) || tabs[0]
  );

  useEffect(() => {
    onTabChange(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  return (
    <div>
      <div className="hidden">
        <label htmlFor="Tab" className="sr-only">
          Tab
        </label>

        <select
          id="Tab"
          className="w-full rounded-md border-gray-200"
          value={activeTab.label}
          aria-readonly
        >
          {tabs.map((tab) => (
            <option key={tab.label}>{tab.label}</option>
          ))}
        </select>
      </div>

      <div className="block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex gap-6">
            {tabs.map((tab) => (
              <a
                key={tab.label}
                href="#"
                className={`shrink-0 p-3 border font-medium text-sm transition ${
                  activeTab.label === tab.label
                    ? "rounded-t-lg border-gray-300 border-b-white-100 text-secondary-500"
                    : "border-transparent text-primary-300 hover:text-secondary-600"
                }`}
                onClick={() => {
                  setActiveTab(tab);
                }}
              >
                {tab.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TabGroup;
