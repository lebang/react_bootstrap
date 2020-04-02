export const defaultState = {};

export const SSO_ACTION = "SSO_ACTION";
export const TEST_ACTION = "TEST_ACTION";

export function reducer(state: any, action: any) {
    switch (action.type) {
        case SSO_ACTION:
            return {
                ...state,
                ...action.payload
            }
        case TEST_ACTION:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}
