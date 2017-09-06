# PNM - Header Search

Header Search component for displaying search field in header.
Will display as a togglable search field on set breakpoint.

## Example Implementation

### Example HTML
```html
<div class="header-search-toggle-container"></div>
<form id="header-search-form" class="header-search-container">
  <div class="header-search-field-container">
    <div class="header-search-field">
      <label for="search-input">Enter Search Query</label>
      <input id="search-input" class="header-search-input" type="text" placeholder="Enter Search Query" />
    </div>
    <div class="header-search-field">
      <input class="header-search-button" type="submit" value="Search" />
    </div>
  </div>
</form>
```

### Example SCSS
```scss
// Header Search
.header-search-toggle {
  @include pnm_style_header_search_toggle;
  @include pnm_struct_header_search_toggle;
}
.header-search-container {
  @include pnm_style_header_search_container;
  @include pnm_struct_header_search_container;
  .header-search-field-container {
    @include pnm_style_header_search_field_container;
    @include pnm_struct_header_search_field_container;
    .header-search-field {
      @include pnm_style_header_search_field;
      @include pnm_struct_header_search_field;
    }
    .header-search-field:first-child {
      @include pnm_style_header_search_input_field;
      @include pnm_struct_header_search_input_field;
    }
    .header-search-input {
      @include pnm_style_header_search_input;
      @include pnm_struct_header_search_input;
    }
    label {
      @include pnm_style_hidden;
    }
    .header-search-button {
      @include pnm_style_header_search_button;
      @include pnm_struct_header_search_button;
    }
  }
}
```

### Example JS
```javascript
var header_search = new pnm_header_search();
header_search.init({
  toggle_class_on_element: '.header-inner',
  toggle_element_container: '.header-search-toggle-container',
  container_element: '#header-search-form',
  breakpoint: 768
});
```
