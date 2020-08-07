import { createStore, Store } from 'vuex'
import { logger, chromeDevToolsHelper } from './ChromeDevtoolsHelper'
import { MutationType } from './MutationType'

export * from './MutationType'

export interface IItem {
  localName: string
  className: string
  id: string
  name: string
  value: string
}

export interface IState {
  items: IItem[]
}

const initialState: IState = {
  items: [
    {
      localName: 'default item'
    } as any
  ]
}

const store: Store<IState> = createStore({
  state: initialState,
  mutations: {
    resetItems(state: IState) {
      logger.log('mutation: resetItems')
      state.items = [
        {
          localName: 'default item'
        } as any
      ]
    },
    addItem(state: IState, item: IItem) {
      logger.log('mutation: addItem')
      state.items.push(item)
    }
  },
  actions: {},
  modules: {}
})

export default store

export function useStore(): Store<IState> {
  return store
}

///////////////////////////// chrome.devtools //////////////////////////
chromeDevToolsHelper.init({
  panelName: 'Your Panel Name',
  onShown: () => {
    // on panel shown, update the panel data through Vuex store
    logger.log('onShown')
    //store.dispatch ...
  },
  onHidden: () => {
    //logger.log('onHidden')
    store.commit('resetItems')
  },
  onModelUpdated: (value: string | IItem) => {
    if (value) {
      let parsed: IItem
      if (typeof value === 'string') {
        parsed = JSON.parse(value)
      } else {
        parsed = value
      }
      store.commit(MutationType.addItem, parsed)
    } else {
      logger.log('WARNING: onModelUpdated: value is not defined')
    }
  }
})
///////////////////////////// chrome.devtools //////////////////////////
