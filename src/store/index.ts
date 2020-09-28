import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/utils/db'
import createId from '@/utils/createId'

Vue.use(Vuex)

type State = {
  records: RecordItem[];
  userOutlayTags: TagItem[];
  userIncomeTags: TagItem[];
  record?: RecordItem;
}

const store = new Vuex.Store({
  state: {
    records: [],
    userOutlayTags: [],
    userIncomeTags: [],
    record: {} as RecordItem
  } as State,
  mutations: {
    getAllRecords(state: State) {
      state.records = db.get('records') || []
    },
    getRecordById(state: State, id: string) {
      store.commit('getAllRecords')
      state.record = state.records.find(record => record.id === id)
    },
    addRecord(state: State, record: RecordItem) {
      record.id = createId()
      store.commit('getAllRecords')
      state.records.push(record)
      db.set('records', JSON.stringify(state.records))
    },
    removeRecord(state: State, id: string) {
      store.commit('getAllRecords')
      if (state.records.length === 0) return
      const index = state.records.findIndex(record => record.id === id)
      if (index === -1) return
      state.records.splice(index, 1)
      db.set('records', JSON.stringify(state.records))
    },
    editRecord(state: State, payload: { id: string; record: RecordItem }) {
      const { id, record } = payload
      store.commit('getAllRecords')
      record.id = id
      const index: number = state.records.findIndex(record => record.id === id)
      state.records.splice(index, 1, record)
      db.set('records', JSON.stringify(state.records))
    },
    getUserTags(state, tagsType: 'userOutlayTags' | 'userIncomeTags') {
      if (tagsType === 'userIncomeTags') {
        state.userIncomeTags = db.get(tagsType) || []
      } else {
        state.userOutlayTags = db.get(tagsType) || []
      }
    },
    setUserTags(state, payload: { tagsType: 'userOutlayTags' | 'userIncomeTags'; tags: TagItem[] }) {
      const { tagsType, tags } = payload
      db.set(tagsType, JSON.stringify(tags))
    }
  }
})

export default store
