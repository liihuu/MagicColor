import { FC, ReactNode, memo, useState } from 'react'
import tinycolor from 'tinycolor2'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import './index.less'

interface CardProps {
  color: string,
  currentColor: string
  checked: { [key: string]: boolean }
}

const Card: FC<CardProps> = memo(({ color, currentColor, checked }) => {
  const [active, setActive] = useState('')
  const tyColor = tinycolor(color)
  const hex = tyColor.toHexString()

  const items = [
    { key: 'hex', color: hex.toUpperCase(), textColor: hex },
    { key: 'rgb', color: tyColor.toRgbString(), textColor: hex },
    { key: 'hsv', color: tyColor.toHsvString(), textColor: hex },
    { key: 'hsl', color: tyColor.toHslString(), textColor: hex },
  ]

  const renderItems = () => {
    const elements: ReactNode[] = []
    items.forEach(item => {
      if (checked[item.key]) {
        elements.push(
          <CopyToClipboard
            key={item.key}
            text={item.color}>
            <span
              style={item.key === active ? { color: item.textColor } : {}}
              className='text'
              onMouseDown={() => { setActive(item.key) }}
              onMouseUp={() => { setActive('') }}>
              {item.color}
            </span>
          </CopyToClipboard>
        )
      }
    })
    return elements
  }

  return (
    <div className='card'>
      <div className='bg-container'>
        <span style={{ backgroundColor: hex }} className='bg'/>
        <span style={{ backgroundColor: currentColor }} className='bg'/>
      </div>
      {renderItems()}
    </div>
  )
})

export default Card
