# PNM - Text Resize

Text Resize component for resizing page content.

## Example Implementation

### Example HTML
```html
<div class="resize-container">
  <div class="resize-items">
    <button class="resize-reduce">Reduce text size</button>
    <button class="resize-increase">Increase text size</button>
  </div>
</div>
```

### Example SCSS
```scss
.resize-container {
  @include pnm_struct_text_resize_container;
  @include pnm_style_text_resize_container;
  .resize-items {
    @include pnm_struct_text_resize_items;
  }
  .resize-reduce, .resize-increase, .resize-reset {
    @include pnm_style_text_resize_button;
  }
  .resize-reduce {
    @include pnm_struct_text_resize_reduce;
    @include pnm_style_text_resize_reduce;
  }
  .resize-increase {
    @include pnm_struct_text_resize_increase;
    @include pnm_style_text_resize_increase;
  }
}
```

### Example JS
```javascript
var text_resize = new pnm_text_resize();
text_resize.init({
  root_element: 'html',
  reduce_button_element: '.resize-reduce',
  increase_button_element: '.resize-increase'
});
```
