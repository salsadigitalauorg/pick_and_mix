# PNM - Skip Link

Skip Link

## Example Implementation

### Example HTML
```html
<div class="skip-link-container">
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <a href="#main-navigation-top" class="skip-link">Skip to main navigation</a>
</div>
```

### Example SCSS
```scss
.skip-link-container {
  @include pnm_style_skip_link_container;
  @include pnm_struct_skip_link_container;
  .skip-link {
    @include pnm_style_skip_link;
    @include pnm_struct_skip_link;
  }
}

```

### Example JS
None
