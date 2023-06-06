import DragSection from "../src/app.vue";
DragSection.install = function (app) {
  app.component(DragSection.name, DragSection);
};

export default DragSection;