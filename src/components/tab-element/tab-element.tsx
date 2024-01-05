import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import tabElementStyles from './tab-element.module.css';

interface TabElementProps {
  currentTab: string;
  setTab: (tab: string) => void;
}

export default function TabElement({ currentTab, setTab }: TabElementProps) {
  return (
    <div className={`${tabElementStyles.tabWrapper} mt-5 mb-10`}>
      <Tab value="bun" active={currentTab === 'bun'} onClick={setTab}>
        Булки
      </Tab>
      <Tab value="sauce" active={currentTab === 'sauce'} onClick={setTab}>
        Соусы
      </Tab>
      <Tab value="main" active={currentTab === 'main'} onClick={setTab}>
        Начинки
      </Tab>
    </div>    
  )
}
