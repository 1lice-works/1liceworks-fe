export const AUTH_FORM_STYLES = {
  form: 'flex flex-col items-center gap-10 w-[338px]', // form 전체 레이아웃
  title: 'text-foreground text-xl font-bold text-center', // form의 title
  inputLayer: 'flex flex-col gap-3 w-full', // 2개 이상의 input
  label: ' text-sm font-semibold mb-1', // input의 label
  inputAndButton: 'mb-1 flex gap-1', // input과 button이 동시에 있을때

  submit: 'w-full flex flex-col gap-2', // submit 영역
  already: 'text-muted-foreground flex justify-between', // submit 하위 text스타일

  checkBox: 'flex items-center gap-2',

  errorMessage: 'mt-1 text-xs text-red',
} as const;
