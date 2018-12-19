import {expect} from 'chai';
import {localVue} from '../init-test';
import {mount} from '@vue/test-utils';
import ReactiveInjection from './fixture/ReactiveInjection.vue';
import {ReactiveStorage, NotReactiveStorage} from './fixture/ReactiveInjection';

describe('ReactiveInjection', () => {
    it('should update view only in reactive storage', (done) => {
        // given
        const wrapper = mount(ReactiveInjection, {localVue});
        const reactiveStorage: ReactiveStorage = (wrapper.vm as any).$vueIocContainer.get(ReactiveStorage);
        const notReactiveStorage: NotReactiveStorage = (wrapper.vm as any).$vueIocContainer.get(NotReactiveStorage);

        // when
        reactiveStorage.foo = 'changed foo';
        notReactiveStorage.bar = 'changed bar';

        localVue.nextTick(() => {
            // then
            expect(wrapper.text()).to.include('changed foobar');
            done();
        });
    });
});
