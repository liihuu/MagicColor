import { useState, useMemo } from 'react'

import tinycolor from 'tinycolor2'

import Card from './card'
import Checkbox from './checkbox'

import './app.less'

function App() {
  const [inputColor, setInputColor] = useState<string>('')
  const [checked, setChecked]= useState<{ [key:string]: boolean }>({ hex: true, rgb: true, hsv: true, hsl: true })

  const colors = useMemo<string[]>(() => {
    const tyColor = tinycolor(inputColor)
    const hsv = tyColor.toHsv()
    const cs: string[] = [tyColor.toHexString()]
    const startH = Math.max(Math.round(hsv.h * 100 - 20), 0)
    const endH = Math.min(Math.round(hsv.h * 100 + 20), 35900)
    const startS = Math.max(Math.round(hsv.s * 100 - 20), 0)
    const endS = Math.min(Math.round(hsv.s * 100 + 20), 100)
    const startV = Math.max(Math.round(hsv.v * 100 - 20), 0)
    const endV = Math.min(Math.round(hsv.v * 100 + 20), 100)
    for (let h = startH; h < endH; h += 5) {
      for (let s = startS; s < endS; s += 5) {
        for (let v = startV; v < endV; v += 5) {
          const hex = tinycolor({ ...hsv, h: h / 100, s: s / 100, v: v / 100 }).toHexString()
          if (!cs.includes(hex)) {
            cs.push(hex)
          }
        }
      }
    }
    return cs
  }, [inputColor])

  const currentColorHex = useMemo(() => tinycolor(inputColor).toHexString(), [inputColor])

  return (
    <>
      <h1 className="title">颜色匹配器</h1>
      <p className="desc">根据某个色值匹配相近的色值</p>
      <div
        className="tools-container">
        <div
          className="tools-row">
          <span
            style={{ backgroundColor: currentColorHex }}
            className="color-block"/>
          <input
            className="input"
            placeholder="支持一切颜色类型"
            value={inputColor}
            onChange={e => { setInputColor(e.target.value) }}/>
        </div>
        <div
          className="tools-row">
          {
            ['hex', 'rgb', 'hsv', 'hsl'].map(name => (
              <Checkbox
                key={name}
                checked={checked[name]}
                label={name}
                onClick={() => {
                  const newChecked = { ...checked }
                  newChecked[name] = !newChecked[name]
                  setChecked(newChecked)
                }}/>
            ))
          }
        </div>
      </div>
      <p className="tip">* 左边为匹配的颜色，右边为输入的颜色</p>
      <div className="card-container">
        {
          colors.map(color => <Card key={color} color={color} currentColor={currentColorHex} checked={checked}/>)
        }
      </div>
    </>
  )
}

export default App
