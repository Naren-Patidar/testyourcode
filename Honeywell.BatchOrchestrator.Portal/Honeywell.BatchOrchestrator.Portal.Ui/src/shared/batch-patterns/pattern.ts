export interface Pattern {
  type: string | null;
  props: patternProps;
}
export interface patternProps {
  val: string | '';
  len: number | 3;
  fmt: string | '';
  fmtType: string | '';
  freq: string | '';
}
export interface PatternRow {
  key: string | null;
  value: Pattern[] | [];
}

export const BatchPatternsforTest = [
  {
    value: 'BatchIdPattern1',
    text: 'BatchIdPattern1',
    disabled: false,
  },
  {
    value: 'BatchIdPattern2',
    text: 'BatchIdPattern2',
    disabled: false,
  },
  {
    value: 'custom',
    text: 'Customize batch id',
    disabled: false,
  },
];
