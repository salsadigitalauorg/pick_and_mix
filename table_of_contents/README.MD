# PNM - Table of contents

Table of content

## Example Implementation

### Example HTML
```html
<div class="list-selector-wrapper">
    <div class="list-selector">
      <div class="top-bar">
        <label for="otp-contents">On this page:</label>
        <select id="otp-contents" name="otp-contents">
        </select>
      </div>
    </div>
  </div>
<div class="table_of_contents-wrapper">
  <div class="toc-inner">
    <h2 class="toc-header">Table of contents</h2>
    <div class="toc-links">
      <ul class="toc-list">
      </ul>
    </div>
  </div>
</div>
```

### Example SCSS
```scss
.table_of_contents-wrapper {
  @include pnm_struct_toc_wrapper;
  @include pnm_style_toc_wrapper;
  .toc-inner {
    @include pnm_struct_toc_inner;
    @include pnm_style_toc_inner;
    h2 {
      @include pnm_struct_toc_title;
      @include pnm_style_toc_title;
    }
    .toc-list {
      @include pnm_style_toc_list;
      @include pnm_struct_toc_list;
      li {
        @include pnm_style_toc_item;
        @include pnm_struct_toc_item;
        a {
          @include pnm_style_toc_item_link;
          @include pnm_struct_toc_item_link;
        }
      }
    }
  }
}

.list-selector-wrapper {
  @include pnm_struct_toc_select_wrapper;
  @include pnm_style_toc_select_wrapper;
  .list-selector {
    @include pnm_style_toc_select_inner;
    @include pnm_struct_toc_select_inner;
    select {
      @include pnm_style_toc_select_selectbox;
    }
    &.is-display-ready {
      @include pnm_style_toc_select_display;
    }
  }
}
```

### Example JS
```js
$(function() {
  var toc = new pnm_table_of_contents();
  toc.init({
    bodyField: '.body-centre',
    toc_container: '.table_of_contents-wrapper',
    list_selector: '.list-selector'
  });
});
```
