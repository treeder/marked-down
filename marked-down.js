import { html, css, LitElement } from 'lit'

import { marked } from "https://cdn.jsdelivr.net/npm/marked@18/lib/marked.esm.js"
import { markedHighlight } from "https://cdn.jsdelivr.net/npm/marked-highlight@2/src/index.js"
import hljs from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11/build/es/highlight.min.js'
import purify from 'https://cdn.jsdelivr.net/npm/dompurify@3/dist/purify.es.js'

export class MarkedDown extends LitElement {

  static {
    marked.use({ // https://marked.js.org/using_advanced
      gfm: true,
    })
    marked.use(markedHighlight({
      highlight: function (code, lang) {
        // console.log('code:', code, 'lang:', lang)
        // const hljs = highlightjs
        const language = hljs.getLanguage(lang) ? lang : 'plaintext'
        // console.log('language:', language)
        return hljs.highlight(code, { language: language }).value
      },
      langPrefix: 'hljs language-',
    }))

  }

  static styles = [
    css`
      :host {
        display: block;
        line-height: var(--marked-down-line-height, 1.65);
        color: var(--marked-down-color, var(--md-sys-color-on-surface, inherit));
        word-break: break-word;
        overflow-wrap: anywhere;
      }

      #content > div > :first-child {
        margin-top: 0;
      }

      #content > div > :last-child {
        margin-bottom: 0;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        color: var(--marked-down-heading-color, var(--md-sys-color-on-surface, #0f172a));
        font-weight: 700;
        line-height: 1.35;
        letter-spacing: -0.01em;
        margin: 1.2em 0 0.45em 0;
      }

      h1 {
        font-size: 1.5em;
      }

      h2 {
        font-size: 1.3em;
      }

      h3 {
        font-size: 1.125em;
      }

      h4 {
        font-size: 1em;
      }

      h5,
      h6 {
        font-size: 0.925em;
      }

      p {
        margin: 0 0 0.875em 0;
      }

      p:last-child {
        margin-bottom: 0;
      }

      a {
        color: var(--marked-down-link-color, var(--md-sys-color-primary, #4361ee));
        text-decoration: underline;
        text-underline-offset: 2px;
      }

      a:hover {
        opacity: 0.85;
      }

      ul,
      ol {
        margin: 0 0 0.875em 0;
        padding-left: 22px;
      }

      ul ul,
      ul ol,
      ol ul,
      ol ol {
        margin-top: 0.375em;
        margin-bottom: 0;
      }

      li {
        margin-bottom: 0.375em;
        padding: 0;
      }

      li:last-child {
        margin-bottom: 0;
      }

      li > p {
        margin-bottom: 0.375em;
      }

      li > p:last-child {
        margin-bottom: 0;
      }

      blockquote {
        margin: 0.875em 0;
        padding: 8px 14px;
        border-left: 3px solid var(--md-sys-color-outline-variant, #cbd5e1);
        background-color: var(--marked-down-blockquote-background-color, #f8fafc);
        color: var(--md-sys-color-on-surface-variant, #475569);
        border-radius: 0 6px 6px 0;
      }

      blockquote > :first-child {
        margin-top: 0;
      }

      blockquote > :last-child {
        margin-bottom: 0;
      }

      hr {
        border: 0;
        border-top: 1px solid var(--md-sys-color-outline-variant, #e2e8f0);
        margin: 1.25em 0;
      }

      table {
        border-collapse: collapse;
        width: 100%;
        margin: 0.875em 0;
        font-size: 0.95em;
      }

      th,
      td {
        border: 1px solid var(--md-sys-color-outline-variant, #e2e8f0);
        padding: 8px 12px;
        text-align: left;
      }

      th {
        background-color: var(--md-sys-color-surface-container-low, #f8fafc);
        font-weight: 600;
      }

      img {
        max-width: 100%;
        height: auto;
        border: 1px solid var(--md-sys-color-outline-variant, #e2e8f0);
        border-radius: 8px;
        display: block;
        margin: 0.875em auto;
      }

      code,
      pre {
        font-family:
          ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
      }

      :not(pre) > code {
        background-color: var(--marked-down-inline-code-background-color, #f1f5f9);
        color: var(--marked-down-inline-code-color, #0f172a);
        padding: 2px 6px;
        border-radius: 6px;
        font-size: 0.875em;
      }

      /** pre is for triple tick blocks */
      pre {
        overflow-x: auto;
        padding: 14px 16px;
        margin: 0.875em 0;
        border: 1px solid var(--md-sys-color-outline-variant, rgba(128, 128, 128, 0.25));
        border-radius: 8px;
        color: #adbac7;
        background: #22272e;
        font-size: 0.875em;
        line-height: 1.55;
      }

      pre code {
        padding: 0;
        background: transparent;
        color: inherit;
        font-size: inherit;
        border-radius: 0;
      }

      @media (prefers-color-scheme: dark) {
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          color: var(--marked-down-heading-color, var(--md-sys-color-on-surface, #f8fafc));
        }

        :not(pre) > code {
          background-color: var(--marked-down-inline-code-background-color, rgba(255, 255, 255, 0.12));
          color: var(--marked-down-inline-code-color, #e2e8f0);
        }

        blockquote {
          border-left-color: var(--md-sys-color-outline-variant, #475569);
          background-color: var(--marked-down-blockquote-background-color, rgba(255, 255, 255, 0.05));
          color: var(--md-sys-color-on-surface-variant, #94a3b8);
        }

        hr {
          border-top-color: var(--md-sys-color-outline-variant, rgba(255, 255, 255, 0.14));
        }

        th,
        td {
          border-color: var(--md-sys-color-outline-variant, rgba(255, 255, 255, 0.14));
        }

        th {
          background-color: var(--md-sys-color-surface-container-low, rgba(255, 255, 255, 0.05));
        }

        img {
          border-color: var(--md-sys-color-outline-variant, rgba(255, 255, 255, 0.14));
        }
      }

      /* This is the CSS directly from highlight.js
        list of themes here: https://highlightjs.org/examples
        see https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/styles/
      */
      /*!
      Theme: GitHub Dark Dimmed
      Description: Dark dimmed theme as seen on github.com
      Author: github.com
      Maintainer: @Hirse
      Updated: 2021-05-15

      Colors taken from GitHub's CSS
      */
      .hljs {
        color: #adbac7;
        background: #22272e;
      }
      .hljs-doctag,
      .hljs-keyword,
      .hljs-meta .hljs-keyword,
      .hljs-template-tag,
      .hljs-template-variable,
      .hljs-type,
      .hljs-variable.language_ {
        color: #f47067;
      }
      .hljs-title,
      .hljs-title.class_,
      .hljs-title.class_.inherited__,
      .hljs-title.function_ {
        color: #dcbdfb;
      }
      .hljs-attr,
      .hljs-attribute,
      .hljs-literal,
      .hljs-meta,
      .hljs-number,
      .hljs-operator,
      .hljs-selector-attr,
      .hljs-selector-class,
      .hljs-selector-id,
      .hljs-variable {
        color: #6cb6ff;
      }
      .hljs-meta .hljs-string,
      .hljs-regexp,
      .hljs-string {
        color: #96d0ff;
      }
      .hljs-built_in,
      .hljs-symbol {
        color: #f69d50;
      }
      .hljs-code,
      .hljs-comment,
      .hljs-formula {
        color: #768390;
      }
      .hljs-name,
      .hljs-quote,
      .hljs-selector-pseudo,
      .hljs-selector-tag {
        color: #8ddb8c;
      }
      .hljs-subst {
        color: #adbac7;
      }
      .hljs-section {
        color: #316dca;
        font-weight: 700;
      }
      .hljs-bullet {
        color: #eac55f;
      }
      .hljs-emphasis {
        color: #adbac7;
        font-style: italic;
      }
      .hljs-strong {
        color: #adbac7;
        font-weight: 700;
      }
      .hljs-addition {
        color: #b4f1b4;
        background-color: #1b4721;
      }
      .hljs-deletion {
        color: #ffd8d3;
        background-color: #78191b;
      }
    `,
  ]

  static properties = {
    content: { type: String },

    fetching: { type: Boolean },
    error: { type: Object },
  }

  constructor() {
    super()
    this.content = ''
    this.fetching = false
    this.error = null
  }

  async connectedCallback() {
    super.connectedCallback()
  }

  render() {
    if (this.error) {
      return html`<div class="error">${this.error}</div>`
    }
    if (this.fetching) {
      return html`<md-circular-progress indeterminate></md-circular-progress>`
    }
    return html`
      <div id="content"></div>
      <div id="content2">
        <slot @slotchange=${() => this.renderMarkdown()}></slot>
      </div>
    `
  }

  escapeHtml = (unsafe) => {
    return unsafe
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;')
  }

  firstUpdated() {
    super.firstUpdated()
    this.renderMarkdown()
  }

  updated(changedProperties) {
    super.updated(changedProperties)
    if (changedProperties.has('content')) {
      this.renderMarkdown()
    }
  }

  renderMarkdown() {
    const contentEl = this.renderRoot.querySelector('#content')
    const content2El = this.renderRoot.querySelector('#content2')
    if (!contentEl || !content2El) return

    let allText = ''
    if (this.content) {
      allText = this.content
    } else {
      let body = this.shadowRoot.querySelector('slot')
      if (body) {
        const childNodes = body.assignedNodes({ flatten: true })
        allText = childNodes
          .map((node) => {
            if (node.innerHTML) {
              return node.innerHTML
            }
            return node.textContent ? node.textContent : ''
          })
          .join('')
      }
    }

    allText = allText.trim()
    let m = marked.parse(allText)
    m = purify.sanitize(m)
    let d = document.createElement('div')
    d.innerHTML = m
    content2El.style.display = 'none'
    contentEl.innerHTML = ''
    contentEl.append(d)
  }
}

customElements.define('marked-down', MarkedDown)
