import { useVOnboarding, VOnboardingWrapper } from '@/index';
import { StepEntity } from '@/types/lib';
import { flushPromises, mount, VueWrapper } from '@vue/test-utils';
import { defineComponent, onMounted, ref } from 'vue';
const STEP_TITLE_CLASSNAME = 'v-onboarding-item__header-title';
const STEP_DESCRIPTION_CLASSNAME = 'v-onboarding-item__description';

const onStepChangeCallback = vi.fn((message: string) => { })

describe('Make sure core functionality works with the default UI', () => {
  const getStepTitle = (container: VueWrapper) => container.element.querySelector(`.${STEP_TITLE_CLASSNAME}`)?.textContent ?? '';
  const getStepDescription = (container: VueWrapper) => container.element.querySelector(`.${STEP_DESCRIPTION_CLASSNAME}`)?.textContent ?? '';
  const steps = [
    {
      attachTo: { element: '#foo' },
      content: { title: "Step 1 Title", description: "Step 1 Description" },
      on: {
        beforeStep: () => {
          onStepChangeCallback('beforeStep 1')
        },
        afterStep: () => {
          onStepChangeCallback('afterStep 1')
        }
      }
    },
    {
      attachTo: { element: '#bar' },
      content: {
        title: "Step 2 Title",
        description: "Step 2 Description"
      },
      on: {
        beforeStep: () => {
          onStepChangeCallback('beforeStep 2')
        },
        afterStep: () => {
          onStepChangeCallback('afterStep 2')
        }
      }
    }
  ] as StepEntity[]

  const Simple = defineComponent({
    components: { VOnboardingWrapper },
    setup() {
      const wrapper = ref(null)
      const { start, goToStep, finish } = useVOnboarding(wrapper)
      onMounted(start)
      return {
        wrapper,
        goToStep,
        steps,
        finish
      }
    },
    template: `
    <div>
      <div id="foo">Foo</div>
      <VOnboardingWrapper ref="wrapper" :steps="steps" />
      <button id="previous" @click="goToStep(v => v - 1)">Previous</button>
      <button id="next" @click="goToStep(v => v + 1)">Next</button>
      <button id="finish" @click="finish">Finish</button>
    </div>
    `
  })

  it('should render first step correctly', async () => {
    onStepChangeCallback.mockClear()
    const wrapper = mount(Simple)
    await flushPromises()
    expect(getStepTitle(wrapper)).toBe(steps?.[0]?.content?.title);
    expect(getStepDescription(wrapper)).toBe(steps?.[0]?.content?.description);
  })

  it('should move to next step when Next button is clicked', async () => {
    onStepChangeCallback.mockClear()
    const wrapper = mount(Simple)
    await wrapper.get('#next').trigger('click')
    await flushPromises()
    expect(getStepTitle(wrapper)).toBe(steps?.[1]?.content?.title);
    expect(getStepDescription(wrapper)).toBe(steps?.[1]?.content?.description);
  })

  it('should move to previous step when Previous button is clicked', async () => {
    onStepChangeCallback.mockClear()
    const wrapper = mount(Simple)
    await wrapper.get('#next').trigger('click')
    await wrapper.get('#previous').trigger('click')
    await flushPromises()
    expect(getStepTitle(wrapper)).toBe(steps?.[0]?.content?.title);
    expect(getStepDescription(wrapper)).toBe(steps?.[0]?.content?.description);
  })

  it('should be finished when Finish button is clicked', async () => {
    onStepChangeCallback.mockClear()
    const wrapper = mount(Simple)
    await flushPromises()
    await wrapper.get('.v-onboarding-btn-primary').trigger('click')
    await wrapper.get('.v-onboarding-btn-primary').trigger('click')
    expect(wrapper.element.querySelector('[data-v-onboarding-wrapper]')).toBeNull();
  })

  // it('should be finished when Cancel button is clicked', async () => {
  // })

  it('should run on.beforeStep for the first step on initial render', async () => {
    onStepChangeCallback.mockClear()
    mount(Simple)
    await flushPromises()
    expect(onStepChangeCallback).toHaveBeenCalledWith('beforeStep 1')
  })

  it('should run on.beforeStep for the next step when Next button is clicked', async () => {
    onStepChangeCallback.mockClear()
    const wrapper = mount(Simple)
    await flushPromises()
    await wrapper.get('#next').trigger('click')
    expect(onStepChangeCallback).toHaveBeenCalledWith('beforeStep 2')
  })
  it('should run on.afterStep for the previous step when Next button is clicked', async () => {
    onStepChangeCallback.mockClear()
    const wrapper = mount(Simple)
    await flushPromises()
    await wrapper.get('#next').trigger('click')
    expect(onStepChangeCallback).toHaveBeenCalledWith('afterStep 1')
  })

  it('should run on.beforeStep for the previous step when Previous button is clicked', async () => {
    onStepChangeCallback.mockClear()
    const wrapper = mount(Simple)
    await flushPromises()
    await wrapper.get('#next').trigger('click')
    await wrapper.get('#previous').trigger('click')
    expect(onStepChangeCallback).toHaveBeenCalledWith('beforeStep 1')
  })

  it('should run on.afterStep for the current step when Previous button is clicked', async () => {
    onStepChangeCallback.mockClear()
    const wrapper = mount(Simple)
    await flushPromises()
    await wrapper.get('#next').trigger('click')
    await wrapper.get('#previous').trigger('click')
    expect(onStepChangeCallback).toHaveBeenCalledWith('afterStep 2')
  })

  it('should run on.afterStep for the last step when Finish button is clicked', async () => {
    onStepChangeCallback.mockClear()
    const wrapper = mount(Simple)
    await flushPromises()
    await wrapper.get('#next').trigger('click')
    await wrapper.get('#finish').trigger('click')
    expect(onStepChangeCallback).toHaveBeenCalledWith('afterStep 2')
  })

  it('should restore pointer-events on body after tour finishes', async () => {
    const wrapper = mount(Simple)
    await flushPromises()

    // Complete the tour by clicking through all steps
    await wrapper.get('.v-onboarding-btn-primary').trigger('click')
    await flushPromises()
    await wrapper.get('.v-onboarding-btn-primary').trigger('click')
    await flushPromises()

    // Body should not have pointer-events: none after tour finishes
    const bodyStyle = document.body.style.pointerEvents
    expect(bodyStyle).not.toBe('none')
  })
})
