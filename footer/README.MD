# PNM - Footer

Footer component for displaying footer layout.

## Example Implementation

### Example HTML
```html
<footer class="footer">
  <div class="footer-inner">
    <div class="footer-copyright">
      <!-- Footer Copyright -->
    </div>
    <div class="footer-nav-container">
      <!-- Footer Horizontal Nav -->
    </div>
  </div>
</footer>
```

### Example SCSS
```scss
.footer {
  @include pnm_style_footer;
  @include pnm_struct_footer;
  .footer-inner {
    @include pnm_style_footer_inner;
    @include pnm_struct_footer_inner;
  }
  .footer-copyright {
    @include pnm_style_footer_copyright;
    @include pnm_struct_footer_copyright;
  }
  .footer-nav {
    @include pnm_style_footer_nav;
    @include pnm_struct_footer_nav;
  }
}
```

### Example JS
None
