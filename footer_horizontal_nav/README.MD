# PNM - Footer Horizontal Nav

Footer Horizontal Nav component for displaying horizontal links in footer.

## Example Implementation

### Example HTML
```html
<ul class="footer-nav">
  <li><a href="/">Disclaimer</a></li>
  <li><a href="/sitemap">Accessibility</a></li>
  <li><a href="/faq">Copyright</a></li>
  <li><a href="/contact">Help</a></li>
  <li><a href="/faq">Site map</a></li>
  <li><a href="/contact">Terms of use</a></li>
</ul>
```

### Example SCSS
```scss
ul.footer-nav {
  @include pnm_style_footer_nav_container;
  @include pnm_struct_footer_nav_container;
  li {
    @include pnm_style_footer_nav_item;
    @include pnm_struct_footer_nav_item;
  }
}
```

### Example JS
None
