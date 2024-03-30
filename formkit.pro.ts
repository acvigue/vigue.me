import {
  createProPlugin,
  toggle,
  dropdown,
  datepicker,
  mask,
  repeater,
} from "@formkit/pro";

const config = useRuntimeConfig();

const proPlugin = createProPlugin(config.formkitKey, {
  toggle,
  dropdown,
  datepicker,
  mask,
  repeater,
});

export default proPlugin;
