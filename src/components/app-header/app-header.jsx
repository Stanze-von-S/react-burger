import React from 'react';
import { Logo, BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import headerStyles from './app-header.module.css';

function AppHeader() {
  return (
      <header className={`${headerStyles.header} pt-4 pb-4`}>
        <nav className={headerStyles.wrapperNav}>
          <div className={`${headerStyles.wrapperIcon} pt-5 pr-5 pb-5 mr-2`}>
            <BurgerIcon type="primary" />
            <p className={`${headerStyles.text_color_primary} text text_type_main-default ml-2`}>
              Конструктор
            </p>
          </div>
          <div className={`${headerStyles.wrapperIcon} p-5`}>
            <ListIcon type="secondary" />
            <p className={`${headerStyles.text_color_secondary} text text_type_main-default ml-2`}>
              Лента заказов
            </p>
          </div>
        </nav>
        <Logo />
        <div className={`${headerStyles.wrapperIcon} pt-5 pl-5 pb-5`}>
          <ProfileIcon type="secondary" />
          <p className={`${headerStyles.text_color_secondary} text text_type_main-default ml-2`}>
            Личный кабинет
          </p>
        </div>
      </header>
  )
}

export default AppHeader;
