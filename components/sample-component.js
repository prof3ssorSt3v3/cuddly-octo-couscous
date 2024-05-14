const template = document.createElement('template');
//css for the component
template.innerHTML = `
<style>
:host {
  font-size: 20px;
}
:host > div{
  background-color: var(--primary, #222);
}
#title::slotted(*) {
  color: var(--onPrimary, #fff);
  font-size: 2rem;
  font-weight: 100;
  padding: 1rem;
  margin: 0;
}
details {
  background-color: var(--secondary, #eee);
  color: var(--onSecondary, #333);
  padding: 1rem;
}
details > summary{
  cursor: pointer;
  margin-block-end: 1rem;
}
</style>
<div>
  <slot id="title" name="title">Sample Default Title</slot>
  <details>
  <summary>A Little Bit of Ipsum.</summary>
  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure aliquam eius possimus, consectetur maxime voluptas sequi delectus dolorem cupiditate dolore voluptatem vero ullam sed iusto accusantium, nesciunt dolores inventore assumenda.
</details>
</div>
`;

class SampleComponent extends HTMLElement {
  #openCount;
  constructor() {
    super();
    this.#openCount = 0;
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    const clone = template.content.cloneNode(true);
    shadowRoot.appendChild(clone);
    this.element = shadowRoot.querySelector('div > details');
    this.element.addEventListener('toggle', this.#handleToggle.bind(this));
  }

  #handleToggle(ev) {
    let elem = ev.target;
    ev.stopPropagation(); //stop the click bubbling up
    if (elem.open) {
      //opened the details
      this.#openCount++;
      // console.log(this.#openCount);
      let ce = new CustomEvent('opened', { detail: { count: this.#openCount } });
      this.dispatchEvent(ce);
    } else {
      //closed the details
    }
  }
}

window.customElements.define('sample-component', SampleComponent);
