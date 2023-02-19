import { useVOnboarding, VOnboardingStep, VOnboardingWrapper } from '@/index';
import { StepEntity } from '@/types/StepEntity';
import { flushPromises, mount, VueWrapper } from '@vue/test-utils';
import { defineComponent, onMounted, ref } from 'vue';

const STEP_TITLE_CLASSNAME = 'user-step__title';
const STEP_DESCRIPTION_CLASSNAME = 'user-step__description';
const STEP_WRAPPER_CLASSNAME = 'user-step__wrapper';

const onStepChangeCallback = vi.fn((message: string) => { })

describe('Make sure core functionality works with the custom UI', () => {
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
    components: { VOnboardingWrapper, VOnboardingStep },
    setup() {
      const wrapper = ref(null)
      const { start, goToStep, finish } = useVOnboarding(wrapper)
      onMounted(start)
      return {
        start,
        wrapper,
        goToStep,
        steps,
        finish
      }
    },
    template: `
    <div>
      <VOnboardingWrapper ref="wrapper" :steps="steps">
        <template #default="{ previous, next, step, exit, isFirst, isLast, index }">
          <VOnboardingStep>
            <div class="${STEP_WRAPPER_CLASSNAME} bg-white shadow sm:rounded-lg">
              <div class="px-4 py-5 sm:p-6">
                <div class="sm:flex sm:items-center sm:justify-between">
                  <div v-if="step.content">
                    <h3 v-if="step.content.title" class="${STEP_TITLE_CLASSNAME} text-lg font-medium leading-6 text-gray-900">{{ step.content.title }}</h3>
                    <div v-if="step.content.description" class="${STEP_DESCRIPTION_CLASSNAME} mt-2 max-w-xl text-sm text-gray-500">
                      <p>{{ step.content.description }}</p>
                    </div>
                  </div>
                  <div class="mt-5 space-x-4 sm:mt-0 sm:ml-6 sm:flex sm:flex-shrink-0 sm:items-center relative">
                    <span class="absolute right-0 bottom-full mb-2 mr-2 text-gray-600 font-medium text-xs">{{ index + 1 }}/{{steps.length}}</span>
                    <template v-if="!isFirst">
                      <button id="previous" @click="previous" type="button" class="inline-flex items-center justify-center rounded-md border border-transparent bg-yellow-100 px-4 py-2 font-medium text-yellow-700 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 sm:text-sm">Previous</button>
                    </template>
                    <button id="next" @click="next" type="button" class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm">{{ isLast ? 'Finish' : 'Next' }}</button>
                  </div>
                </div>
              </div>
            </div>
          </VOnboardingStep>
        </template>
      </VOnboardingWrapper>
      <span id="foo">Howdy, My Friend!</span>
      <button id="bar">Click me for no reason</button>
      <button @click="() => goToStep(1)">Click to go second step</button>
      <div>
        <button @click="start">Start Onboarding</button>
        <button @click="finish">Finish Onboarding</button>
      </div>
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
    await flushPromises()
    await wrapper.get('#next').trigger('click')
    await flushPromises()
    expect(getStepTitle(wrapper)).toBe(steps?.[1]?.content?.title);
    expect(getStepDescription(wrapper)).toBe(steps?.[1]?.content?.description);
  })

  it('should move to previous step when Previous button is clicked', async () => {
    onStepChangeCallback.mockClear()
    const wrapper = mount(Simple)
    await flushPromises()
    await wrapper.get('#next').trigger('click')
    await flushPromises()
    await wrapper.get('#previous').trigger('click')
    await flushPromises()
    expect(getStepTitle(wrapper)).toBe(steps?.[0]?.content?.title);
    expect(getStepDescription(wrapper)).toBe(steps?.[0]?.content?.description);
  })

  it('should be finished when Finish button is clicked', async () => {
    onStepChangeCallback.mockClear()
    const wrapper = mount(Simple)
    await flushPromises()
    await wrapper.get('#next').trigger('click')
    await wrapper.get('#next').trigger('click')
    expect(wrapper.element.querySelector('[data-v-onboarding-wrapper]')).toBeNull();
  })

  // it('should be finished when Cancel button is clicked', async () => {
  // })

  it('should run on.beforeStep for the first step on initial render', async () => {
    onStepChangeCallback.mockClear()
    mount(Simple)
    await flushPromises()
    expect(onStepChangeCallback).toBeCalledWith('beforeStep 1')
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
    await flushPromises()
    await wrapper.get('#previous').trigger('click')
    expect(onStepChangeCallback).toHaveBeenCalledWith('beforeStep 1')
  })

  it('should run on.afterStep for the current step when Previous button is clicked', async () => {
    onStepChangeCallback.mockClear()
    const wrapper = mount(Simple)
    await flushPromises()
    await wrapper.get('#next').trigger('click')
    await flushPromises()
    await wrapper.get('#previous').trigger('click')
    expect(onStepChangeCallback).toHaveBeenCalledWith('afterStep 2')
  })

  it('should run on.afterStep for the last step when Finish button is clicked', async () => {
    onStepChangeCallback.mockClear()
    const wrapper = mount(Simple)
    await flushPromises()
    await wrapper.get('#next').trigger('click')
    await wrapper.get('#next').trigger('click')
    expect(onStepChangeCallback).toHaveBeenCalledWith('afterStep 2')
  })
})
