# Marked Down - a simple to use markdown web component

An ESM ready, drop in anywhere web component. This uses [marked](https://marked.js.org/) behind the scenes.

## Demo

[View demo](https://chainparency.github.io/zxinger/)

## Quickstart

### Install with npm

```sh
npm install treeder/marked-down
```

### To use from CDN

This uses [Lit](https://lit.dev), so first [add Lit to your importmap](https://thingster.app/things/qT_iAr9PuPK2FVNJCxANY). 

Either add this to the page where you will use it:

```html
<script type="module">
import 'https://cdn.jsdelivr.net/gh/treeder/marked-down@0/marked-down.js'
</script>
```

Or add to your importmap, put this in the `<head></head>` section:

```html
<script type="importmap">
  {
    "imports": {
      "marked-down": "https://cdn.jsdelivr.net/gh/treeder/marked-down@0/marked-down.js"
    }
  }
</script>
```


### Usage

The easiest way is to use the web component.

```html
<script type="module">
import 'https://cdn.jsdelivr.net/gh/treeder/marked-down@0/marked-down.js'
</script>

<marked-down>
## Marked Down is Cool!

Isn't it though? Why is it cool?

* It's easy
* It's fast
* It's simple
* It uses ESM modules
</marked-down>
```

View code for the demo [here](/components/index.html).
