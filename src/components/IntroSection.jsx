import React from 'react'

const e = React.createElement

export default function IntroSection() {
  return e('section', null, [
    e('h1', { className: 'centered', key: 1 }, 'Мониторинг новостей строительства'),
    e(
      'h3',
      { className: 'centered', style: { color: '#666' }, key: 2 },
 'News-monitoring'
    ),

  ])
}
