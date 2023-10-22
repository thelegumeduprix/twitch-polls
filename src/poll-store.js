import { createStore } from "solid-js/store";

// as a function to not share sub-objects when users only shallowly clone the initial state
export function initialState() {
    return {
        active: false,
        visible: false,
        title: "Poll",
        options: {},
        userVotes: {},
    };
}

const [pollStore, updatePollStore] = createStore(initialState());

export {
    pollStore, updatePollStore
}