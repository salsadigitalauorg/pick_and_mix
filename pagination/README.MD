# PNM - Pagination

Pagination.

## Example Implementation

### Example HTML
```html
<div class="pagination-container">
  <ul class="pagination"> 
    <li><a href="#">First</a></li>
    <li><a href="#">Previous</a></li>
    <li><a href="#">1</a></li>
    <li class="active"><a href="#">2</a></li>
    <li><a href="#">3</a></li>
    <li><a href="#">4</a></li>
    <li><a href="#">5</a></li>
    <li><a href="#">Next</a></li>
    <li><a href="#">Last</a></li>
  </ul>
</div>  
```

### Example SCSS
```scss
.pagination-container{
  @include pnm_style_pagination_container;
  @include pnm_struct_pagination_container;
  ul {
    @include pnm_style_pagination_inner;
    @include pnm_struct_pagination_inner;
    li {
      @include pnm_style_pagination_list_item;
      @include pnm_struct_pagination_list_item;
      a {
        @include pnm_style_pagination_link;
        @include pnm_struct_pagination_link;
      }
    }
  }
}
```

### Example JS
None
