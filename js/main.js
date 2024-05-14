import '../components/sample-component.js';
//import and parse the sample-component
//path relative to JS file

(() => {
  //when the DOM finishes loading run this...
  //no click listeners here.
  let sampleComponent = document.querySelector('sample-component');
  sampleComponent.addEventListener('opened', handleOpens);
})();

function handleOpens(ev) {
  console.log(ev.type);
  console.log(ev.detail.count);
  if (ev.detail.count > 3) {
    alert('Have you not finished reading it yet?');
  }
}
