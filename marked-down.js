import { html, css, LitElement } from 'lit'

import { marked } from "https://cdn.jsdelivr.net/npm/marked@12/lib/marked.esm.js"
import { markedHighlight } from "https://cdn.jsdelivr.net/npm/marked-highlight@2/src/index.js"
import hljs from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11/build/es/highlight.min.js';
import purify from 'https://cdn.jsdelivr.net/npm/dompurify@3/dist/purify.es.js'

export class MarkedDown extends LitElement {

    static {
        marked.use({ // https://marked.js.org/using_advanced
            gfm: true,
            mangle: false,
            headerIds: false,
        })
        marked.use(markedHighlight({
            highlight: function (code, lang) {
                // console.log('code:', code, 'lang:', lang)
                // const hljs = highlightjs
                const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                // console.log('language:', language)
                return hljs.highlight(code, { language: language }).value;
            },
            langPrefix: 'hljs language-',
        }))

    }

    static styles = [
        css`
        p {
              margin-block-start: 0;
        }
        a {
            color: var(--marked-down-a-color,); /* https://developer.mozilla.org/en-US/docs/Web/CSS/var#syntax */
          }
          a:hover {
                text-decoration: underline;
          }
          h1, h2, h3, h4, h5, h6, p, ul, ol {
            margin-bottom: 24px;
          }
          li {
            padding-top: 4px;
            padding-bottom: 4px;
          }

        img {
            max-width: 100%;
            border: 1px solid silver;
            padding: 8px;
            border-radius: 8px;
            margin: 0 auto;
        }

        code {
            background-color: var(--marked-down-code-background-color, #22272e);
            color: var(--marked-down-code-color, #adbac7);
            padding: 0.2em 0.4em;
            border-radius: 6px;
        }

        /** pre is for triple tick blocks */
        pre {
            /* display:block; */
            overflow-x: auto;
            padding: 16px;
            border: 1px solid var(--md-sys-color-outline);
            border-radius: 6px;
            color:#adbac7;
            background:#22272e;
        }

        pre code {
            padding: 0;
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
        .hljs{
            color:#adbac7;
            background:#22272e;
        }
        .hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:#f47067}.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#dcbdfb}.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable{color:#6cb6ff}.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#96d0ff}.hljs-built_in,.hljs-symbol{color:#f69d50}.hljs-code,.hljs-comment,.hljs-formula{color:#768390}.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag{color:#8ddb8c}.hljs-subst{color:#adbac7}.hljs-section{color:#316dca;font-weight:700}.hljs-bullet{color:#eac55f}.hljs-emphasis{color:#adbac7;font-style:italic}.hljs-strong{color:#adbac7;font-weight:700}.hljs-addition{color:#b4f1b4;background-color:#1b4721}.hljs-deletion{color:#ffd8d3;background-color:#78191b}
        `]

    static properties = {
        content: { type: String }, // value for QR code

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
<slot></slot>
</div>
        `
    }

    escapeHtml = (unsafe) => {
        return unsafe.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
    }

    firstUpdated() {
        // console.log('markedDown.firstUpdated')
        super.firstUpdated()

        let allText = ''
        if (this.content) {
            allText = this.content
        } else {
            // get it from the slot
            let body = this.shadowRoot.querySelector('slot')
            // console.log("SLOT BODY:", body.textContent)
            // console.log("innerHTML", body.innerHTML)
            const childNodes = body.assignedNodes({ flatten: true })
            // ... do something with childNodes ...
            allText = childNodes.map((node) => {
                // console.log("NODE:", node)
                // console.log("has textContent:", node.textContent)
                // console.log("innerHTML:", node.innerHTML)
                if (node.innerHTML) {
                    return node.innerHTML
                }
                return node.textContent ? node.textContent : ''
            }).join('')
        }

        allText = allText.trim()
        // console.log("BOD:", allText)
        let m = marked.parse(allText)
        // console.log("BOD3:", m)
        m = purify.sanitize(m)
        // console.log("BOD4:", m)
        let d = document.createElement("div")
        d.innerHTML = m
        this.renderRoot.querySelector("#content2").style.display = 'none'
        this.renderRoot.querySelector("#content").append(d)
    }

    updated() {
        super.updated()
    }

}

customElements.define('marked-down', MarkedDown)
