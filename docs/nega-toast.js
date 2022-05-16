/**
Simple toast web component

Example:

```
Basic: <nega-toast>Hi</nega-toast>
```

@element nega-toast
@demo demo/index.html
*/
class NegaToast extends HTMLElement {
  constructor() {
    super();
    const template = Object.assign(document.createElement('template'), {
      innerHTML: `
      <style>
        :host {
          display: block;
          position: fixed;

          box-sizing: border-box;
          min-width: 100px;
          padding: 16px 24px;

          color: #dddddd;
          border-radius: 2px;
          background-color: #292929;

          transition: transform 0.3s, opacity 0.3s;
          transform: translateY(60px);
          opacity: 0;
        }

        :host([opened]) {
          transform: translateY(0);
          opacity: 1;
        }
      </style>

      <slot></slot>
    `
    });
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.appendChild(document.importNode(template.content, true));
  }

  static get observedAttributes() {
    return ['opened', 'duration'];
  }

  get opened() {
    return this.hasAttribute('opened');
  }

  set opened(value) {
    value ? this.setAttribute('opened', '') : this.removeAttribute('opened');
  }

  get duration() {
    return this.hasAttribute('duration') ? parseInt(this.getAttribute('duration'), 10) : null;
  }

  set duration(value) {
    if (!isNaN(value)) {
      value ? this.setAttribute('duration', value) : this.removeAttribute('duration');
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    name === 'opened' && this.opened && this.duration && setTimeout(() => this.close(), this.duration);
  }

  open() {
    this.opened = true;
  }

  close() {
    this.opened = false;
  }

  toggle() {
    this.opened = !this.opened;
  }

}

window.customElements.define('nega-toast', NegaToast);