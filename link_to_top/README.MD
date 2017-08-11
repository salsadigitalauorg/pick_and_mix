# PNM - Back to Top

Back to top component to bring focus back to top of page.

## Example Implementation

### Example HTML
```html
<a href="#" title="Back to top" class="back-to-top">Back to top</a>
```

### Example SCSS
```scss
.back-to-top {
  @include pnm_style_link_to_top;
  @include pnm_struct_link_to_top;
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
