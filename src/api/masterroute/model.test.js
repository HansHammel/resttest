import { Masterroute } from '.'

let masterroute

beforeEach(async () => {
  masterroute = await Masterroute.create({ bla: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = masterroute.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(masterroute.id)
    expect(view.bla).toBe(masterroute.bla)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = masterroute.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(masterroute.id)
    expect(view.bla).toBe(masterroute.bla)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
