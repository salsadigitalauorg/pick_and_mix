# PNM - Footer Copyright

Footer copyright component for displaying logo and copyright text in footer.

## Example Implementation

### Example HTML
```html
<div class="logo-and-copyright-container">
  <div class="footer-logo-container"
    <a href="/" title="Back to Homepage">
      <img src="dist/images/png/monash-university-white.png" alt="Website name">
    </a>
  </div>
  <div class="copyright-text">&copy; 2017, Monash University, All rights reserved.</div>
</div>
```

### Example SCSS
```scss
.logo-and-copyright-container {
  @include pnm_style_footer_copyright;
  @include pnm_struct_footer_copyright;
  .footer-logo-container {
    @include pnm_struct_footer_logo-container;
  }
  .copyright-text {
    @include pnm_style_footer_copyright_text;
  }
}
```

### Example JS
None
