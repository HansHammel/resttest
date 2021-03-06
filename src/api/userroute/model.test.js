import { Userroute } from '.';
import { User } from '../user';

let user, userroute;

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' });
  userroute = await Userroute.create({ user, bla: 'test' });
});

describe('view', () => {
  it('returns simple view', () => {
    const view = userroute.view();
    expect(typeof view).toBe('object');
    expect(view.id).toBe(userroute.id);
    expect(typeof view.user).toBe('object');
    expect(view.user.id).toBe(user.id);
    expect(view.bla).toBe(userroute.bla);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });

  it('returns full view', () => {
    const view = userroute.view(true);
    expect(typeof view).toBe('object');
    expect(view.id).toBe(userroute.id);
    expect(typeof view.user).toBe('object');
    expect(view.user.id).toBe(user.id);
    expect(view.bla).toBe(userroute.bla);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });
});
