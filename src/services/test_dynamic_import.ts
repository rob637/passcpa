const courseId = "cisa";
async function run() {
  const mod = await import(`./${courseId}AdaptiveEngine`);
  console.log(Object.keys(mod));
}
run();
