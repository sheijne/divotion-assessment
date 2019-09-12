import { DirectiveFunction } from 'vue';

const vVisible: DirectiveFunction = (el, binding) => {
  el.style.opacity = !!binding.value ? '1' : '0';
};

export default vVisible;
