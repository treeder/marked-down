# Marked Down - a simple to use markdown web component

An ESM ready, drop in anywhere web component. This uses [marked](https://marked.js.org/) behind the scenes.

## Demo

[View demo](https://treeder.github.io/marked-down/)

## Quickstart

### Install with npm

```sh
npm install treeder/marked-down
```

### To use from CDN

#### Add Lit to importmap

This uses [Lit](https://lit.dev), so first [add Lit to your importmap](https://thingster.app/things/qT_iAr9PuPK2FVNJCxANY). 

#### Import marked-down

Then import marked-down on the pages where you will use it:

```html
<script type="module">
import 'https://cdn.jsdelivr.net/gh/treeder/marked-down@0/marked-down.js'
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

View code for the demo [here](/demo/index.html).

#### Adding marked-down to importmap

You can also add marked-down to your importmap and use it like this:

```html
<script type="importmap">
  {
    "imports": {
      LIT IMPORTS HERE (see above)
      "marked-down": "https://cdn.jsdelivr.net/gh/treeder/marked-down@0/marked-down.js"
    }
  }
</script>
```

Then import on pages like this:

```html
<script type="module">
import 'marked-down'
</script>
```

The rest is the same.
