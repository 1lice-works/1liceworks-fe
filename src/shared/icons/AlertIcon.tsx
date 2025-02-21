interface IconTypes {
  color?: string;
  size?: number;
}

export const AlertIcon = ({ color = '#020617', size = 25 }: IconTypes) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12 21C16.4183 21 20 17.4183 20 13C20 8.58172 16.4183 5 12 5C7.58172 5 4 8.58172 4 13C4 17.4183 7.58172 21 12 21Z'
        stroke={color}
        stroke-width='1.25'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M12 9V13L14 15'
        stroke={color}
        stroke-width='1.25'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M5 3L2 6'
        stroke={color}
        stroke-width='1.25'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M22 6L19 3'
        stroke={color}
        stroke-width='1.25'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M6 19L4 21'
        stroke={color}
        stroke-width='1.25'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M18 19L20 21'
        stroke={color}
        stroke-width='1.25'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
};
