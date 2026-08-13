# Vue 실습 노트 — 파일별 학습 포인트

## basic/

### SampleOne.vue
일반 JS 변수(`normalCount`)는 값이 바뀌어도 화면이 갱신되지 않고, `ref()`로 만든 변수(`vueCount`)만 반응형이라 화면이 자동 갱신된다. Vue 반응성의 핵심 개념.

### SampleTwo.vue
Text Interpolation(`{{ }}`) 안에 단순 변수뿐 아니라 `.toUpperCase()` 같은 메서드 호출, `Math.random()` 같은 연산식도 그대로 쓸 수 있다.

## directive/

### VHtmlSample.vue
`{{ }}`는 문자열을 그대로 텍스트로 찍고, `v-html`은 문자열을 실제 HTML로 해석해서 렌더링한다는 차이.

### VHtmlXssSample.vue
사용자 입력을 `v-html`로 그대로 뿌리면 `<img onerror=...>` 같은 악성 스크립트가 실행될 수 있는 XSS 위험성. 신뢰할 수 없는 입력엔 `v-html`을 쓰면 안 된다는 것이 핵심.

### VTextSample.vue
`v-text`는 `{{ }}`와 결과가 동일(`innerText` 동작)하며, HTML 태그는 해석하지 않는다. 실무에서는 `v-text` 대신 `{{ }}`를 쓴다는 관례.

### VBindSample.vue
`:href`, `:src`, `:disabled`처럼 속성값을 변수로 동적 바인딩. `v-bind:`의 축약형이 `:`라는 것.

### VBindClassSample.vue
`:class`에 객체 `{ 클래스명: 조건 }` / 배열 `[클래스, 조건 ? a : b]` 두 문법으로 조건부 클래스 적용.

### VBindStyleSample.vue
`:style`도 객체(camelCase 속성명)/배열 문법을 지원. 클래스 바인딩과 원리는 같지만 인라인 스타일이라 실무에서는 특수 상황에만 사용.

### VBindShorthandSample.vue
Vue 3.4+ 문법으로 변수명과 속성명이 같으면 `:src="src"` 대신 `:src`만 써도 된다.

### VIfSample.vue
`v-if / v-else-if / v-else`는 조건에 안 맞는 태그를 DOM에서 아예 제거한다는 것 (`v-show`와의 차이 이해가 핵심).

### VShowSample.vue
`v-show`는 DOM은 유지한 채 `display: none`만 토글. 자주 껐다 켰다 하는 UI(탭, 모달)에 유리.

### VForSample.vue
배열/객체/배열 속 객체 각각을 반복 렌더링하는 문법 차이, 그리고 `:key`가 왜 필수인지(요소 식별용).

### VPreSample.vue
`v-pre`가 붙은 태그는 컴파일러가 건드리지 않아 `{{ }}`가 문자 그대로 출력된다.

### VCloakSample.vue
네트워크가 느릴 때 컴파일 안 된 `{{ }}` 텍스트가 잠깐 노출되는 것을 CSS(`[v-cloak] { display: none }`)로 막는 용도. (로컬 dev 환경에서는 순식간이라 눈으로 체감하기 어려움)

### VOnceSample.vue
`v-once`가 붙은 요소는 최초 렌더링 이후 데이터가 바뀌어도 갱신되지 않는다 (성능 최적화용, 다시 안 바뀔 데이터에 사용).

### VMemoSample.vue
`v-memo="[의존값]"`으로 지정한 값이 안 바뀌면 내부를 다시 그리지 않고 캐시를 재사용한다 (세밀한 렌더링 최적화).

### VOnSample.vue
인라인 핸들러(`@click="count++"`)는 즉석 연산에, 메서드 핸들러는 복잡한 로직에 사용. `input`(입력할 때마다) vs `change`(포커스 아웃 후 확정), `keydown`(누르는 순간) vs `keyup`(떼는 순간)처럼 비슷해 보이는 이벤트도 발동 시점이 다르다는 것.

### EventObjectSample.vue
메서드 핸들러에 함수명만 적으면 이벤트 객체(`e`)가 첫 인자로 암묵적으로 전달되고, 다른 인자와 함께 넘기고 싶을 땐 `$event`를 명시적으로 적어야 한다. `e.target`(실제 클릭된 태그)과 `e.currentTarget`(리스너가 걸린 태그)은 버블링 상황에서 서로 다를 수 있다는 것이 핵심.

### ModifierSample.vue
이벤트 수식어(`.prevent`, `.stop`, `.once`, `.self`, `.enter`, `.ctrl`/`.exact`)는 `e.preventDefault()` / `e.stopPropagation()` 같은 로직을 템플릿에서 선언적으로 대체하는 문법 설탕(syntactic sugar). `.self`는 `e.target === e.currentTarget`일 때만 실행되어, 배경(dim)을 직접 클릭했을 때만 닫히는 모달 구현에 쓰인다.

### VModelSample.vue
`v-model`은 `:value` + `@input="(e) => (data = e.target.value)"`를 합쳐놓은 축약형이라는 것 — v-bind와 v-on:input의 조합이 본질.

### VModelFormSample.vue
form 요소별 ref 초기값 규칙: 단일 checkbox는 `ref(false)`(Boolean), 다중 checkbox는 반드시 `ref([])`(배열, 체크된 value들이 쌓임), radio/select는 `ref('')`(선택된 value 문자열).

### VModelModifierSample.vue
`.lazy`(input→change 시점 반영), `.number`(문자열→숫자 자동 형변환), `.trim`(양끝 공백 제거) 수식어는 필요한 만큼 체이닝(`.trim.number`)해서 동시에 적용할 수 있다.

### StyleSample.vue
`<style scoped>`는 현재 컴포넌트 안에서만 적용되고, `<style>`(scoped 없음)은 전역으로 적용된다. 외부 CSS는 `<style>` 블록 안에서 `@import`로 불러온다는 것.

## composition/

### ReactiveRef.vue
`ref()`는 숫자·문자열·불리언 같은 기본형은 물론 배열·객체까지 전부 감쌀 수 있는 범용 반응형 API. `.value`로 접근/수정하지만, `<template>` 안에서는 자동 언랩되어 `.value` 없이 바로 쓸 수 있다는 것이 핵심.

### ReactiveReactive.vue
`reactive()`는 객체·배열 전용 반응형 API로 `.value` 없이 속성에 바로 접근한다. 배열도 `push`/`splice` 같은 변이(mutating) 메서드를 그대로 쓰면 반응성이 유지된다.

### ComputedCaching.vue
일반 함수는 컴포넌트가 리렌더링될 때마다(관련 없는 상태 변경에도) 무조건 재실행되지만, `computed()`는 의존하는 반응형 값이 실제로 바뀔 때만 재연산하고 그 외엔 캐시된 값을 재사용한다. 콘솔 로그로 재실행 횟수 차이를 직접 확인하는 예제.

### WatchBasic.vue
`watch(source, callback)`은 감시 대상이 바뀌는 순간 콜백에 `(newValue, oldValue)`를 자동으로 넘겨준다. `computed`처럼 값을 반환하지 않고, API 호출 같은 부수 효과(side effect)를 실행하는 용도.

### WatchMultiSource.vue
`watch([a, b], ([newA, newB], [oldA, oldB]) => {...})`처럼 배열로 묶으면 여러 반응형 소스 중 하나만 바뀌어도 콜백 하나로 통합 처리할 수 있다.

### WatchDeep.vue
`ref`로 감싼 객체를 `watch(user, ...)`로 그냥 감시하면 하위 속성 변경을 못 잡는다(참조가 그대로라서). `{ deep: true }` 옵션으로 전체를 깊게 감시하거나, `() => user.value.age`처럼 화살표 함수로 특정 속성만 콕 집어 감시하면 이전 값(oldValue)까지 정확히 추적 가능.

### WatchReactive.vue
`reactive()` 객체는 `watch(state, ...)`만 해도 자동으로 deep 감시가 걸리지만, 이 경우 `newVal`과 `oldVal`이 같은 참조를 가리켜 이전 값 구분이 안 된다는 함정이 있다. 과거 값을 정확히 추적하려면 `() => state.price`처럼 특정 속성을 화살표 함수로 뽑아서 감시해야 한다.

### WatchEffectSample.vue
`watchEffect(callback)`은 감시 대상을 명시하지 않아도 콜백 내부에서 참조한 반응형 변수를 자동으로 감지해 의존성으로 등록한다. `watch`와 달리 컴포넌트 마운트 시 최초 1회 즉시 실행된다는 차이.

## lifecycle/

### LifecycleTimerChild.vue / LifecycleHookSample.vue
`setup()`(생성) → `onMounted`(부착, API 호출·타이머 시작 적기) → `onUpdated`(갱신, 데이터 변경마다 반복 실행) → `onUnmounted`(소멸, `clearInterval` 등 정리 안 하면 메모리 누수) 순서로 이어지는 생명주기를 부모의 `v-if` 토글로 자식을 붙였다 뗐다 하며 실습. 자식이 사라지면 화면에서 로그를 볼 수 없으므로 `emit('log', ...)`로 부모에게 로그를 올려보내 `.monitor` 패널에 누적 표시.

## props-emits/

### PropsEmitsChild.vue / PropsEmitsParent.vue
`defineProps({ parentData: { type: String, required: true } })`로 부모 데이터를 읽기 전용으로 받고, `defineEmits(['update-request'])` + `emit('update-request', payload)`로 자식이 만든 데이터를 부모에게 올려보낸다. "데이터는 아래로(Props), 이벤트는 위로(Emits)"라는 단방향 데이터 흐름의 기본 왕복 구조를 확인하는 예제.

## component/ (Slot)

### SlotDefaultChild.vue / SlotDefaultParent.vue
이름 없는 `<slot>` 하나만 있는 자식 컴포넌트에 부모가 텍스트든 다른 컴포넌트든 원하는 마크업을 그대로 주입한다. 부모가 아무 내용도 안 넣으면 `<slot>` 태그 안에 적어둔 기본 콘텐츠가 대신 렌더링된다.

### SlotNamedChild.vue / SlotNamedParent.vue
`<slot name="header">`처럼 슬롯에 이름을 붙이면 한 컴포넌트 안에 여러 개의 삽입 지점을 둘 수 있다. 부모는 `<template v-slot:header>`(또는 `#header`)로 어느 슬롯에 넣을지 지정하고, 이름 없는 나머지 콘텐츠는 기본 슬롯으로 들어간다.

### SlotScopedChild.vue / SlotScopedParent.vue
Props와 반대로 **자식의 내부 데이터를 부모 쪽 마크업에서 쓰고 싶을 때** 사용. 자식이 `<slot :text="message" :count="userCount">`처럼 슬롯에 값을 바인딩해두면, 부모는 `<SlotScopedChild v-slot="slotBag">`로 받아서 `slotBag.text`, `slotBag.count`로 꺼내 쓴다.

## 정리

| 그룹 | 파일 | 핵심 |
|---|---|---|
| 보간법 vs HTML | VHtmlSample, VHtmlXssSample, VTextSample | `{{ }}` / `v-text` / `v-html`의 차이와 XSS 위험 |
| v-bind 4형제 | VBindSample, VBindClassSample, VBindStyleSample, VBindShorthandSample | 기본 / class / style / 축약 문법 |
| 조건부 렌더링 | VIfSample, VShowSample | DOM 제거 vs display 토글 |
| 반복 렌더링 | VForSample | 배열·객체 순회 + `:key` |
| 성능 최적화 | VPreSample, VCloakSample, VOnceSample, VMemoSample | 컴파일 스킵 / FOUC 방지 / 1회 렌더링 / 조건부 캐시 |
| 이벤트 핸들링 | VOnSample, EventObjectSample, ModifierSample | 인라인/메서드 핸들러, 이벤트 객체(`$event`), 수식어(`.prevent`/`.stop`/`.once`/`.self` 등) |
| 폼 데이터 바인딩 | VModelSample, VModelFormSample, VModelModifierSample | v-model 원리, form 요소별 타입 규칙, 수식어(`.lazy`/`.number`/`.trim`) |
| 스타일 | StyleSample | scoped vs 전역 스타일, 외부 CSS `@import` |
| 반응형 상태 | ReactiveRef, ReactiveReactive | `ref()` vs `reactive()`(대상 타입, `.value` 유무) |
| Computed & Watch | ComputedCaching, WatchBasic, WatchMultiSource, WatchDeep, WatchReactive, WatchEffectSample | 캐싱 vs 일반 함수, 단일/다중 소스 감시, deep 옵션과 oldValue 함정, 자동 의존성 추적(`watchEffect`) |
| 컴포넌트 생명주기 | LifecycleHookSample, LifecycleTimerChild | setup → onMounted → onUpdated → onUnmounted, 타이머 정리로 메모리 누수 방지 |
| Props & Emits | PropsEmitsParent, PropsEmitsChild | 데이터는 아래로(Props, 읽기 전용) / 이벤트는 위로(Emits, `emit(타입, 데이터)`) |
| Component Slot | SlotDefaultParent/Child, SlotNamedParent/Child, SlotScopedParent/Child | 기본 슬롯(마크업 주입), 이름 있는 슬롯(다중 삽입 지점), 스코프 슬롯(자식→부모 데이터 역전달) |
