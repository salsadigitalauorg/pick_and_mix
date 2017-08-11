# PNM - Featured Items

Sidebar

## Example Implementation

### Example HTML
```html
<div class="sidebar">
  <h2 class="section-title">In this section</h2>
  <ul class="sidebar-menu">
	<li><a href="#">menu level 2</a></li>
	<li><a href="#">menu level 2 parent</a>
		<ul class="sidebar-menu">
		  <li><a href="#">menu level 3</a></li>
		  <li class="active-trail"><a href="#">menu level 3 (active trail)</a>
		    <ul class="sidebar-menu">
		      <li><a href="#">menu level 4</a></li>
		      <li class="active"><a href="#">menu level 4 (active)</a></li>
		      <li><a href="#">menu level 4</a></li>
		    </ul>
		  </li>
		  <li><a href="#">menu level 3</a>
			  <ul class="sidebar-menu">
			  	 <li><a href="#">menu level 4</a></li>
			  	 <li><a href="#">menu level 4</a></li>
			  	 <li><a href="#">menu level 4</a></li>
			  </ul>
		  </li>
		</ul>
	</li>
	<li><a href="#">menu level 2</a>
		<ul class="sidebar-menu">
		  <li><a href="#">menu level 3</a></li>
		</ul>
	</li>
	<li><a href="#">menu level 2</a></li>
	<li><a href="#">menu level 2 parent</a>
	  <ul class="sidebar-menu">
		<li><a href="#">menu level 3</a></li>
		<li><a href="#">menu level 3</a></li>
	  </ul>
	</li>
  </ul>
</div>
```

### Example SCSS
```scss
.sidebar {
  @include pnm_style_sidebar_container;
  @include pnm_struct_sidebar_container;
  .section-title {
    @include pnm_style_sidebar_title;
    @include pnm_struct_sidebar_title;
  }
  ul.sidebar-menu {
    @include pnm_struct_sidebar_nav;
    @include pnm_style_sidebar_nav;
    li {
      @include pnm_style_sidebar_list_item;
      @include pnm_struct_sidebar_list_item;
      &.active-trail {
        @include pnm_style_sidebar_list_item_active_trail;
        @include pnm_struct_sidebar_list_item_active_trail;
      }
      &.active {
        @include pnm_style_sidebar_list_item_active;
        @include pnm_struct_sidebar_list_item_active;
      }
    }
    a {
      @include pnm_style_sidebar_link;
      @include pnm_struct_sidebar_link;
    }
  }
}

```

### Example JS
```javascript
$(function() {
  var sidebar_nav = new pnm_sidebar_nav();
  sidebar_nav.init({
    title_element: '.section-title',
    nav_element: '.sidebar-menu',
    nav_wrapper_element: '.sidebar > .sidebar-menu',
    sidebar_element: '.sidebar',
    breakpoint: 768,
    on_change: function() { /* ... */ }
  });
});
```

