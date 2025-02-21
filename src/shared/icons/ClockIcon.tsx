interface IconTypes {
  color?: string;
  size?: number;
}

export const ClockIcon = ({ color = '#020617', size = 25 }: IconTypes) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M21 7.5V6C21 5.46957 20.7893 4.96086 20.4142 4.58579C20.0391 4.21071 19.5304 4 19 4H5C4.46957 4 3.96086 4.21071 3.58579 4.58579C3.21071 4.96086 3 5.46957 3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H8.5'
        stroke={color}
        stroke-width='1.25'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M16 2V6'
        stroke={color}
        stroke-width='1.25'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M8 2V6'
        stroke={color}
        stroke-width='1.25'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M3 10H8'
        stroke={color}
        stroke-width='1.25'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M17.5 17.5L16 16.25V14'
        stroke={color}
        stroke-width='1.25'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M22 16C22 17.5913 21.3679 19.1174 20.2426 20.2426C19.1174 21.3679 17.5913 22 16 22C14.4087 22 12.8826 21.3679 11.7574 20.2426C10.6321 19.1174 10 17.5913 10 16C10 14.4087 10.6321 12.8826 11.7574 11.7574C12.8826 10.6321 14.4087 10 16 10C17.5913 10 19.1174 10.6321 20.2426 11.7574C21.3679 12.8826 22 14.4087 22 16Z'
        stroke={color}
        stroke-width='1.25'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
};
