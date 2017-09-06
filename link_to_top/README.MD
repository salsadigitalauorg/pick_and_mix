# PNM - Back to Top

Back to top component to bring focus back to top of page.

## Example Implementation

### Example HTML
```html
<div class="back-to-top-container">
  <a href="#" class="back-to-top">Back to top</a>
</div>
```

### Example SCSS
```scss
.back-to-top-container {
  @include pnm_style_link_to_top_container;
  @include pnm_struct_link_to_top_container;
  .back-to-top {
    @include pnm_style_link_to_top;
    @include pnm_struct_link_to_top;
  }
}
```

### Example JS
```js
$(function() {
  var link_to_top = new pnm_link_to_top();
  link_to_top.init({
    link_element: '.back-to-top',
    on_change: function() { /* ... */ }
  });
});
```
