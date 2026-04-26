import {
  login,
  registration,
  edit,
  getDataUser,
  exit,
  userSlice,
  isAuth,
  getUser
} from './userSlice';

const initialState = {
  user: null,
  isLogin: false,
  isLoading: false,
  error: undefined
};

const testData = {
    email: '1@1.com',
    name: '1'
}

describe("Тест данных пользователя", () => {
    it("Тест логина пользователя в состоянии pending", () => {
        const state = userSlice.reducer(initialState, {
            type: login.pending.type
        });
        expect(state.isLoading).toEqual(true);
        expect(state.error).toBe(undefined);
    });

    it("Тест логина fulfilled", () => {
        const state = userSlice.reducer(initialState, {
            type: login.fulfilled.type,
            payload: { user: testData }
        });
        expect(state.user).toEqual(testData);
        expect(state.isLogin).toEqual(true);
        expect(state.isLoading).toEqual(false);
    });

    it("Тест логина rejected", () => {
        const action = {
            type: login.rejected.type,
            error: { message: 'Ошибка входа в аккаунт' }
        };
        const state = userSlice.reducer(initialState, action);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe(action.error.message);
    });

    it("Тест регистрации pending", () => {
        const state = userSlice.reducer(initialState, {
            type: registration.pending.type
        });
        expect(state.isLoading).toEqual(true);
        expect(state.error).toBe(undefined);
    });

    it("Тест регистрации fulfilled", () => {
        const state = userSlice.reducer(initialState, {
            type: registration.fulfilled.type,
            payload: { user: testData }
        });
        expect(state.user).toEqual(testData);
        expect(state.isLogin).toEqual(true);
        expect(state.isLoading).toEqual(false);
    });

    it("Тест регистрации rejected", () => {
        const action = {
            type: registration.rejected.type,
            error: { message: 'Ошибка! Регистрация не завершена' }
        };
        const state = userSlice.reducer(initialState, action);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe(action.error.message);
    });

    it("Тест изменения данных fulfilled", () => {
        const state = userSlice.reducer(initialState, {
            type: edit.fulfilled.type,
            payload: { user: testData }
        });
        expect(state.user).toEqual(testData);
        expect(state.isLogin).toEqual(true);
    });

    it("Тест получения данных fulfilled", () => {
        const state = userSlice.reducer(initialState, {
            type: getDataUser.fulfilled.type,
            payload: { user: testData }
        });
        expect(state.user).toEqual(testData);
        expect(state.isLogin).toEqual(true);
    });

    it("Тест выхода пользователя fulfilled", () => {
        const state = userSlice.reducer(initialState, {
            type: exit.fulfilled.type
        });
        expect(state.user).toBeNull();
        expect(state.isLogin).toEqual(false);
    });

    it("Тест isAuth", () => {
        const state = {
            User: {
                user: testData,
                isLogin: true,
                isLoading: false,
                error: undefined
            }
        };
        const result = isAuth(state);
        expect(result).toEqual(true);
    });

    it("Тест селектора getUser", () => {
        const state = {
            User: {
                user: testData,
                isLogin: true,
                isLoading: false,
                error: undefined
            }
        };
        const result = getUser(state);
        expect(result).toEqual(testData);
    });
});