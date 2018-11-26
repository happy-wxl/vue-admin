import PouchDB from 'pouchdb'

var db = new PouchDB('admindb')
var db1=new PouchDB('admindb1')

export default {
  namespaced: true,
  state: {
    user: {},
    userId:{},
  },
  mutations: {
    setuser (state, user) {
      state.user = user
      console.log(state.user)
      db.get('currUser').then(doc => {
        db.put({
          _id: 'currUser',
          _rev: doc._rev,
          user: user
        })
      }).catch(e => {
        if (e.status === 404) {
          db.put({
            _id: 'currUser',
            user: user
          })
        } else {
          throw e
        }
      })
    },
    setuserId (state, userId) {
      state.userId = userId
      db1.get('curruserId').then(doc => {
        db1.put({
          _id: 'curruserId',
          _rev: doc._rev,
          userId: userId
        })
      }).catch(e => {
        if (e.status === 404) {
          db1.put({
            _id: 'curruserId',
            userId: userId
          })
        } else {
          throw e
        }
      })
    },
  }
}
