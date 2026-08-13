<script setup>
import SampleOne from './components/practices/basic/SampleOne.vue'
import SampleTwo from './components/practices/basic/SampleTwo.vue'
import VHtmlSample from './components/practices/directive/VHtmlSample.vue'
import VHtmlXssSample from './components/practices/directive/VHtmlXssSample.vue'
import VTextSample from './components/practices/directive/VTextSample.vue'
import VBindSample from './components/practices/directive/VBindSample.vue'
import VBindClassSample from './components/practices/directive/VBindClassSample.vue'
import VBindStyleSample from './components/practices/directive/VBindStyleSample.vue'
import VBindShorthandSample from './components/practices/directive/VBindShorthandSample.vue'
import VIfSample from './components/practices/directive/VIfSample.vue'
import VShowSample from './components/practices/directive/VShowSample.vue'
import VForSample from './components/practices/directive/VForSample.vue'
import VPreSample from './components/practices/directive/VPreSample.vue'
import VCloakSample from './components/practices/directive/VCloakSample.vue'
import VOnceSample from './components/practices/directive/VOnceSample.vue'
import VMemoSample from './components/practices/directive/VMemoSample.vue'
import VOnSample from './components/practices/directive/VOnSample.vue'
import EventObjectSample from './components/practices/directive/EventObjectSample.vue'
import ModifierSample from './components/practices/directive/ModifierSample.vue'
import VModelSample from './components/practices/directive/VModelSample.vue'
import VModelFormSample from './components/practices/directive/VModelFormSample.vue'
import VModelModifierSample from './components/practices/directive/VModelModifierSample.vue'
import StyleSample from './components/practices/directive/StyleSample.vue'
import ReactiveRef from './components/practices/composition/ReactiveRef.vue'
import ReactiveReactive from './components/practices/composition/ReactiveReactive.vue'
import ComputedCaching from './components/practices/composition/ComputedCaching.vue'
import WatchBasic from './components/practices/composition/WatchBasic.vue'
import WatchMultiSource from './components/practices/composition/WatchMultiSource.vue'
import WatchDeep from './components/practices/composition/WatchDeep.vue'
import WatchReactive from './components/practices/composition/WatchReactive.vue'
import WatchEffectSample from './components/practices/composition/WatchEffectSample.vue'
import LifecycleHookSample from './components/practices/lifecycle/LifecycleHookSample.vue'
import PropsEmitsParent from './components/practices/props-emits/PropsEmitsParent.vue'
import SlotDefaultParent from './components/practices/component/SlotDefaultParent.vue'
import SlotNamedParent from './components/practices/component/SlotNamedParent.vue'
import SlotScopedParent from './components/practices/component/SlotScopedParent.vue'
import StoreCounter from './components/practices/library/StoreCounter.vue'
import AxiosWeather from './components/practices/library/AxiosWeather.vue'
import AxiosJson from './components/practices/library/AxiosJson.vue'
import RegisterFormSample from './components/practices/ui-library/RegisterFormSample.vue'
import PurchaseCardSample from './components/practices/ui-library/PurchaseCardSample.vue'
import FileManagerSample from './components/practices/ui-library/FileManagerSample.vue'
import MissionVipExtract from './components/practices/modern-js/MissionVipExtract.vue'
import MissionCartDefense from './components/practices/modern-js/MissionCartDefense.vue'
import MissionAsyncChain from './components/practices/modern-js/MissionAsyncChain.vue'
import PrettierDemo from './components/practices/quality/PrettierDemo.vue'
</script>

<template>
  <div class="practice-container">
    <SampleOne />
    <SampleTwo />
    <VHtmlSample />
    <VHtmlXssSample />
    <VTextSample />
    <VBindSample />
    <VBindClassSample />
    <VBindStyleSample />
    <VBindShorthandSample />
    <VIfSample />
    <VShowSample />
    <VForSample />
    <VPreSample />
    <VCloakSample />
    <VOnceSample />
    <VMemoSample />
    <VOnSample />
    <EventObjectSample />
    <ModifierSample />
    <VModelSample />
    <VModelFormSample />
    <VModelModifierSample />
    <StyleSample />
    <h1>6. Composition API - Reactive State</h1>
    <hr />
    <ReactiveRef />
    <ReactiveReactive />
    <h1>7. Computed & Watchers</h1>
    <hr />
    <ComputedCaching />
    <WatchBasic />
    <WatchMultiSource />
    <WatchDeep />
    <WatchReactive />
    <WatchEffectSample />
    <h1>8. Component Lifecycle</h1>
    <hr />
    <LifecycleHookSample />
    <h1>9. Props & Emits</h1>
    <hr />
    <PropsEmitsParent />
    <h1>10. Component Slot</h1>
    <hr />
    <SlotDefaultParent />
    <SlotNamedParent />
    <SlotScopedParent />
    <h1>11. Pinia</h1>
    <hr />
    <StoreCounter />
    <h1>12. Axios</h1>
    <hr />
    <AxiosWeather />
    <AxiosJson />
    <h1>13. UI Libraries (Element Plus)</h1>
    <hr />
    <RegisterFormSample />
    <PurchaseCardSample />
    <FileManagerSample />
    <h1>14. Modern JavaScript Missions</h1>
    <hr />
    <MissionVipExtract />
    <MissionCartDefense />
    <MissionAsyncChain />
    <h1>15. Vue Code Quality (Prettier)</h1>
    <hr />
    <PrettierDemo />
  </div>
</template>

<style>
@import '@/assets/practice.css';
</style>
