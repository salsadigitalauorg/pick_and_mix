# PNM - Header Horizontal Nav

Header Horizontal Nav component for displaying horizontal links.

## Example Implementation

### Example HTML
```html
<ul class="header-horizontal-link-container">
  <li><a href="/">Home</a></li>
  <li><a href="/sitemap">Sitemap</a></li>
  <li><a href="/faq">FAQ</a></li>
  <li><a href="/contact">Contact</a></li>
</ul>
```

### Example SCSS
```scss
ul.header-horizontal-link-container {
  @include pnm_header_horizontal_link_container;
  li {
    @include pnm_header_horizontal_link_item;
    a {
      @include pnm_style_link;
    }
  }
}
```

### Example JS
None
