import { createStore } from 'redux';
console.log(1);
const divToggle = document.querySelector('.toggle');
const counter = document.querySelector('h1');
const btnIncrease = document.querySelector('#increase');
const btnDecrease = document.querySelector('#decrease');

const TOGGLE_SWITCH = 'TOGGLE_SWITCH'; //액션 이름 정의
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

const toggleSwitch = () => ({ type: TOGGLE_SWITCH }); //액션 생성 함수 정의
const increase = difference => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });

const initialState = { //초기값 설정
    toggle: false,
    counter: 0
};

function reducer(state = initialState, action) {
    switch (action.type) { 
        case TOGGLE_SWITCH:
            return {
                ...state,
                toggle: !state.toggle
            };
        case INCREASE:
            return {
                ...state,
                counter: state.counter + action.difference
            };
        case DECREASE:
            return {
                ...state,
                counter: state.counter - 1
            };
        default:
            return state;
    }
}

const store = createStore(reducer);

const render = () => {
    const state = store.getState();
    if (state.toggle) {
        console.log(2);
        divToggle.classList.add('active');
    } else {
        console.log(3);
        divToggle.classList.remove('active');
    }
    counter.innerText = state.counter;
};

render();
store.subscribe(render);
store.subscribe(() => console.log(4));

divToggle.onclick = () => {
    store.dispatch(toggleSwitch()); //onclick이 적용 안되는듯?
}
btnIncrease.onclick = () => {
    store.dispatch(increase(1));
}
btnDecrease.onclick = () => {
    store.dispatch(decrease());
}