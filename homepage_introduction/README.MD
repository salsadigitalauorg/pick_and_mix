# PNM - Homepage Introduction

Homepage Introduction component for displaying introduction / welcome message on homepage.

## Example Implementation

### Example HTML
```html
<div class="introduction-container">
  <div class="introduction-content">
    Introduction Text
  </div>
</div>
```

### Example SCSS
```scss
.introduction-container {
  @include pnm_struct_homepage_introduction_container;
  @include pnm_style_homepage_introduction_container;
  .introduction-content {
    @include pnm_struct_homepage_introduction_content;
    @include pnm_style_homepage_introduction_content;
  }
}
```

### Example JS
None
