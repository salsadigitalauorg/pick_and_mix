# PNM - Wysiwyg Elements

Standard page elements as defined in the wysiwyg editor.

## Example Implementation

### Example HTML
```html
<div class="content-container">
  <h2>h2 Lorem ipsum dolor sit amet, consectetur adipiscing elit</h2>
  <p>p. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. </p>
  <p>p.  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. </p>
  <p>p. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. </p>
  <h3>h3 Lorem ipsum dolor sit amet, consectetur adipiscing</h3>
  <p>p. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident. </p>
  <h4>h4 Lorem ipsum dolor sit amet, consectetur adipiscing</h4>
  <p>p. <i>Italics. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</i> </p>
  <h5>h5 Lorem ipsum dolor sit amet, consectetur adipiscing</h5>
  <h6>h6 Lorem ipsum dolor sit amet, consectetur adipiscing</h6>
  <blockquote> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisi lacus, auctor sit amet purus vel, gravida luctus lectus. Aenean rhoncus dapibus enim, sit amet faucibus leo ornare vitae. <cite>The author of the quote</cite> </blockquote>
  <blockquote><p>p. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisi lacus, auctor sit amet purus vel, gravida luctus lectus. Aenean rhoncus dapibus enim, sit amet faucibus leo ornare vitae. </p></blockquote>
  <blockquote class="right"> Right align: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisi lacus, auctor sit amet purus vel, gravida luctus lectus. Aenean rhoncus dapibus enim, sit amet faucibus leo ornare vitae. <cite>The author of the quote</cite> </blockquote>

  <div class="table-responsive">
	<table>
	  <thead>
	    <tr>
	      <th>#</th>
	      <th>First Name</th>
	      <th>Last Name</th>
	      <th>Username</th>
	    </tr>
	  </thead>
	  <tbody>
	    <tr>
	      <td>1</td>
	     <td>Mark</td>
	      <td>Otto</td>
	      <td>@motto</td>
	    </tr>
	    <tr>
	      <td>2</td>
	      <td>Jacob</td>
	      <td>Thornton</td>
	      <td>@fat</td>
	    </tr>
	    <tr>
	      <td>3</td>
	      <td>Larry</td>
	      <td>The Bird</td>
	      <td>@twitter</td>
	    </tr>
	  </tbody>
	</table>
	</div>
	<div class="table-responsive">
	  <table class="striped">
	    <thead>
	      <tr>
	        <th>#</th>
	        <th>First Name</th>
	        <th>Last Name</th>
	        <th>Username</th>
	      </tr>
	    </thead>
	    <tbody>
	      <tr>
	        <td>1</td>
	        <td>Mark</td>
	        <td>Otto</td>
	        <td>@motto</td>
	      </tr>
	      <tr>
	        <td>2</td>
	        <td>Jacob</td>
	        <td>Thornton</td>
	        <td>@fat</td>
	      </tr>
	      <tr>
	        <td>3</td>
	        <td>Larry</td>
	        <td>The Bird</td>
	        <td>@twitter</td>
	      </tr>
	    </tbody>
	  </table>
    </div>
  <ul>
    <li>Ulist Item 1</li>
    <li>Ulist Item 2</li>
    <li>Ulist Item 3</li>
  </ul>
   <ol>
    <li>Olist Item 1</li>
    <li>Olist Item 2</li>
    <li>Olist Item 3</li>
  </ol>
</div>
```

### Example SCSS
```scss
.content-container {
  @include pnm_style_wysiwyg_container;
  @include pnm_struct_wysiwyg_container;
  h2 {
    @include pnm_style_wysiwyg_heading_2;
    @include pnm_struct_wysiwyg_heading_2;
  }
  h3 {
    @include pnm_style_wysiwyg_heading_3;
    @include pnm_struct_wysiwyg_heading_3;
  }
  h4 {
    @include pnm_style_wysiwyg_heading_4;
    @include pnm_struct_wysiwyg_heading_4;
  }
  h5 {
    @include pnm_style_wysiwyg_heading_5;
    @include pnm_struct_wysiwyg_heading_5;
  }
  h6 {
    @include pnm_style_wysiwyg_heading_6;
    @include pnm_struct_wysiwyg_heading_6;
  }
  blockquote {
    @include pnm_style_wysiwyg_quote;
    @include pnm_struct_wysiwyg_quote;
    &.right {
      @include pnm_style_wysiwyg_quote_right_align;
      @include pnm_struct_wysiwyg_quote_right_align;
    }
  }
  .table-responsive {
    @include pnm_style_wysiwyg_table_responsive_wrapper;
    @include pnm_struct_wysiwyg_table_responsive_wrapper;
  }
  table {
    @include pnm_style_wysiwyg_table;
    @include pnm_struct_wysiwyg_table;
    &.striped {
      @include pnm_style_wysiwyg_table_striped;
      @include pnm_struct_wysiwyg_table_striped;
    }
  }
  ul {
    @include pnm_style_wysiwyg_ulist;
    @include pnm_struct_wysiwyg_ulist;
  }
  ol {
    @include pnm_style_wysiwyg_olist;
    @include pnm_struct_wysiwyg_olist;
  }
}
```

### Example JS
None
