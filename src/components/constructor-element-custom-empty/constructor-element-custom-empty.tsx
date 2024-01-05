import { forwardRef } from 'react';
import type { CSSProperties } from 'react';
import constructorElementEmptyStyles from './constructor-element-custom-empty.module.css';

interface IConstructorElementCustomEmptyProps {
  type?: 'top' | 'bottom';
  style: CSSProperties;
}

const ConstructorElementCustomEmpty = forwardRef(({ type, style }: IConstructorElementCustomEmptyProps, ref) => {
  const name = type ? 'Выберите булку' : 'Выберите начинку';
  
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}
    style={style}
    className={`${constructorElementEmptyStyles.constructorElement}
      ${type === 'top' ? constructorElementEmptyStyles.constructorElement_pos_top : type === 'bottom' ? constructorElementEmptyStyles.constructorElement_pos_bottom : ''} mr-4`}
    >
      <p className='text text_type_main-default'>
        {name}
      </p>
    </div>
  )
});

export default ConstructorElementCustomEmpty;
