import { IState } from './store'
declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface IState {
    items: string
  }
}
