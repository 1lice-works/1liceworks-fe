export const AUTH_FORM_STYLES = {
  form: 'flex flex-col items-center gap-10 w-[338px]',
  title: 'text-foreground text-xl font-bold text-center',
  inputLayer: 'flex flex-col gap-3 w-full',
  label: ' text-sm font-semibold mb-1',
  inputAndButton: 'mb-1 flex gap-1',

  submit: 'w-full flex flex-col gap-2',
  already: 'text-muted-foreground flex justify-between',

  checkBox: 'flex items-center gap-2',

  errorMessage: 'mt-1 text-xs text-red',
} as const;
