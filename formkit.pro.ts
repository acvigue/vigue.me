import {
  createProPlugin,
  toggle,
  dropdown,
  datepicker,
  mask,
  repeater,
} from "@formkit/pro";

const proPlugin = createProPlugin(process.env.FK_KEY, {
  toggle,
  dropdown,
  datepicker,
  mask,
  repeater,
});

export default proPlugin;
