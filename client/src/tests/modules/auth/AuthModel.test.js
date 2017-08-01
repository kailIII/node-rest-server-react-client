import AuthModel from '../../../modules/auth/AuthModel';

it('dispense user', () => {
    const model = new AuthModel();
    const expected = {id: '', username: ''};
    const result = model.dispense();
    expect(result).toEqual(expected);
});
