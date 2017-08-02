import AuthModel from '../../../modules/auth/AuthModel';

it('dispense user', () => {
    const expected = {id: '', username: ''};
    const result = AuthModel.dispense();
    expect(result).toEqual(expected);
});
