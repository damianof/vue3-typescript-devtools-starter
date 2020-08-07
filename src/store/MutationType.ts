export interface IMutationType {
  readonly resetItems: string
  readonly addItem: string
}

export const MutationType: IMutationType = Object.freeze({
  resetItems: 'resetItems',
  addItem: 'addItem'
})
