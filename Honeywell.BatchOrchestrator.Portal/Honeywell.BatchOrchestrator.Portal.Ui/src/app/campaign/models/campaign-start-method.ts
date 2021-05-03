export enum BatchStartMethod {
  AutomaticStart = 0,
  OperatorToStart,
}
export const batchStartMethods = [
  {
    value: BatchStartMethod.AutomaticStart,
    text: 'Automatically start batch',
    disabled: false,
  },
  {
    value: BatchStartMethod.OperatorToStart,
    text: 'Operator to start batch',
    disabled: false,
  },
];
