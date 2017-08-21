# PNM - Header

Header component for displaying a responsive header.

## Example Implementation

### Example HTML
```html
<header class="header">
  <div class="header-inner">
    <nav class="layer layer-1">
      <!-- Header Horizontal Nav -->
      <ul class="header-horizontal-link-container">
        <li><a href="/">Home</a></li>
        <li><a href="/sitemap">Sitemap</a></li>
        <li><a href="/faq">FAQ</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
    <div class="layer layer-2">
      <div class="logo-container">
        <!-- Logo -->
        <!-- ... -->
      </div>
      <div class="tools-container">
        <!-- Resize -->
        <!-- ... -->
        <!-- Header Search -->
        <!-- ... -->
        <!-- Main Nav (toggle) -->
        <div class="menu-toggle-container"></div>
      </div>
    </div>
  </div>
</header>
```

### Example SCSS
```scss
.header {
  .header-inner {
    @include pnm_struct_header_inner;
    .layer {
      @include pnm_struct_header_layer;
    }
    .layer-1 {
      @include pnm_struct_header_layer_1;
      ul.header-horizontal-link-container {
        @include pnm_struct_header_horizontal_nav_container;
        li {
          @include pnm_struct_header_horizontal_nav_item;
          a {
            @include pnm_style_link;
          }
        }
      }
    }
    .layer-2 {
      @include pnm_struct_header_layer_2;
      .tools-container {
        @include pnm_struct_header_tools_container;
      }
    }
  }
}
```

### Example JS
None
