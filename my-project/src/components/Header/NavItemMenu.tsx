import React from 'react'

export default function NavItemMenu({item}) {
  return (
    <li
    key={item.title}
    className='grow flex justify-center items-center'
  >
    <button
      onClick={() => console.log("ok")}
      className='flex grow p-5 border'
    >
      <div className='flex justify-center items-center gap-3 '>
        <h3 className='flex  '>{item.title}</h3>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 14 14'
          height={14}
          width={14}
          id='Tailless-Line-Arrow-Right-1--Streamline-Core'
        >
          <g id='tailless-line-arrow-right-1--arrow-right-keyboard'>
            <path
              id='Vector 4370'
              stroke='#000000'
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m4 0.5 6.1464 6.14645c0.1953 0.19526 0.1953 0.51184 0 0.7071L4 13.5'
              strokeWidth={1}
            />
          </g>
        </svg>
      </div>
    </button>
  </li>
);
}
