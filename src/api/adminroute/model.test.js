import { Adminroute } from '.';

let adminroute;

beforeEach(async () => {
  adminroute = await Adminroute.create({ bla: 'test' });
});

describe('view', () => {
  it('returns simple view', () => {
    const view = adminroute.view();
    expect(typeof view).toBe('object');
    expect(view.id).toBe(adminroute.id);
    expect(view.bla).toBe(adminroute.bla);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });

  it('returns full view', () => {
    const view = adminroute.view(true);
    expect(typeof view).toBe('object');
    expect(view.id).toBe(adminroute.id);
    expect(view.bla).toBe(adminroute.bla);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });
});
