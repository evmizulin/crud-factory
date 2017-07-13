describe('Init', () => {
  it('Init', done => {
    require('./env/Server').then(() => {
      require('./create')
    }).catch(done)
  })
})


