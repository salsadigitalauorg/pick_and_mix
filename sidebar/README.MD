# PNM - Featured Items

Sidebar

## Example Implementation

### Example HTML
```html
<div class="sidebar">
  <h2 class="section-title">In this section</h2>
  <ul class="sidebar-menu">
	<li><a href="#">menu level 2</a></li>
	<li class="active-trail parent expanded"><a href="#">menu level 1 (Parent) (active trail)</a>
	  <ul class="sidebar-menu">
		<li><a href="#">menu level 3</a></li>
		<li class="active-trail parent"><a href="#">menu level 3 (active trail)</a>
		  <ul class="sidebar-menu">
		    <li><a href="#">menu level 4</a></li>
		    <li class="active"><a href="#">menu level 4 (active)</a></li>
		    <li><a href="#">menu level 4</a></li>
		  </ul>
		</li>
		<li class="parent"><a href="#">menu level 3</a>
		  <ul class="sidebar-menu">
			<li><a href="#">menu level 4</a></li>
			<li><a href="#">menu level 4</a></li>
			<li><a href="#">menu level 4</a></li>
		  </ul>
		</li>
      </ul>
	</li>
	<li class="parent"><a href="#">menu level 2</a>
	  <ul class="sidebar-menu">
		<li><a href="#">menu level 3</a></li>
	  </ul>
	</li>
	<li><a href="#">menu level 2</a></li>
	<li class="parent">
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
  }
  ul.sidebar-menu {
    @include pnm_struct_sidebar_nav_container;
    @include pnm_style_sidebar_nav_container;
    li {
      @include pnm_style_sidebar_list_item;
      &.parent {
        @include pnm_style_sidebar_list_item_parent;
        >ul {
          @include pnm_struct_sidebar_subnav_container;
        }
      }
    }
    a {
      @include pnm_style_sidebar_link;
    }
    li {
      @include pnm_style_sidebar_list_item_sub;
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
    breakpoint: 768,
    on_change: function() { /* ... */ }
  });
});
```

