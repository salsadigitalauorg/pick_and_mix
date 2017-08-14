# PNM - Attachment List

Attachment list.

## Example Implementation

### Example HTML
```html
<div class="attachments-container">
  <h4>Files list</h4>
  <ul class="files-list"> 
    <li><a href="#">Document Name.pdf</a></li>
    <li><a href="#">Document Name.doc</a></li>
    <li><a href="#">Document Name.xml</a></li>
  </ul>
</div>
```

### Example SCSS
```scss
.attachments-container {
  @include pnm_style_attachment_list_container;
  @include pnm_struct_attachment_list_container;
  h4 {
    @include pnm_style_attachment_list_title;
    @include pnm_struct_attachment_list_title;
  }
  .files-list {
    @include pnm_style_attachment_list;
    @include pnm_struct_attachment_list;
    li {
      @include pnm_style_attachment_list_item;
      @include pnm_struct_attachment_list_item;
      a {
        @include pnm_style_attachment_list_item_link;
        @include pnm_struct_attachment_list_item_link;
      }
    }
  }
}
```

### Example JS
None
