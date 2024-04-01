import mitt from "mitt";

type AppEvents = {
  //Callable events to control from external context
  scrollToBlock: string;
  closeNav: void;
};

export default defineNuxtPlugin(() => {
  const emitter = mitt<AppEvents>();

  return {
    provide: {
      event: emitter.emit, // Will emit an event
      listen: emitter.on, // Will register a listener for an event
    },
  };
});
