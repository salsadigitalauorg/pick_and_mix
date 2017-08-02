# PNM - Main Navigation

Main Navigation component for displaying navigation. Uses Superfish.

## Example Implementation

### Example HTML
```html
<nav class="main-navigation">
  <div class="main-navigation-inner">
    <ul class="sf-menu">
      <li><a href="/home">Home</a></li>
      <li class="menuparent active-trail">
        <a href="/sub">Sub Theme</a>
        <ul>
          <li><a href="/sap">Standard Article Page Link</a></li>
          <li class="menuparent active-trail">
            <a href="/sap">Standard Article Page</a>
            <ul>
              <li><a href="/sap">Standard Article Page</a></li>
            </ul>
          </li>
          <li><a href="/sap">Standard Article Page</a></li>
        </ul>
      </li>
      <li><a href="/final">Final Link</a></li>
    </ul>
  </div>
</nav>
```

### Example SCSS
```scss
.main-navigation {
  @include pnm_struct_main_navigation_container;
  @include pnm_style_main_navigation_container;
  .main-navigation-inner {
    @include pnm_struct_main_navigation_container_inner;
    @include pnm_style_main_navigation_container_inner;
  }
  ul.sf-menu {
    @include pnm_struct_main_navigation_list_container;
    @include pnm_style_main_navigation_list_container;
    html.no-flexbox & {
      @include pnm_struct_main_navigation_list_container_compat;
      @include pnm_style_main_navigation_list_container_compat;
    }
    li {
      @include pnm_struct_main_navigation_list_item;
      @include pnm_style_main_navigation_list_item;
    }
    a {
      @include pnm_struct_main_navigation_link;
      @include pnm_style_main_navigation_link;
    }
    ul {
      @include pnm_struct_main_navigation_sub_menu;
      @include pnm_style_main_navigation_sub_menu;
    }
    &>li {
      @include pnm_struct_main_navigation_list_item_level_1;
      @include pnm_style_main_navigation_list_item_level_1;
      html.no-flexbox & {
        @include pnm_struct_main_navigation_list_item_level_1_compat;
        @include pnm_style_main_navigation_list_item_level_1_compat;
      }
      &.menuparent>a {
        @include pnm_struct_main_navigation_list_item_level_1_parent;
        @include pnm_style_main_navigation_list_item_level_1_parent;
      }
      &.active-trail>a {
        @include pnm_struct_main_navigation_list_item_level_1_active;
        @include pnm_style_main_navigation_list_item_level_1_active;
      }
      &>a {
        @include pnm_struct_main_navigation_list_item_level_1_link;
        @include pnm_style_main_navigation_list_item_level_1_link;
      }
      &>ul {
        @include pnm_style_main_navigation_sub_menu_level_1;
        @include pnm_struct_main_navigation_sub_menu_level_1;
        li {
          @include pnm_struct_main_navigation_sub_menu_list_item_level_n;
          @include pnm_style_main_navigation_sub_menu_list_item_level_n;
          &.menuparent>a {
            @include pnm_struct_main_navigation_sub_menu_list_item_level_n_parent;
            @include pnm_style_main_navigation_sub_menu_list_item_level_n_parent;
          }
          &.active-trail>a {
            @include pnm_struct_main_navigation_sub_menu_list_item_level_n_active;
            @include pnm_style_main_navigation_sub_menu_list_item_level_n_active;
          }
          a {
            @include pnm_struct_main_navigation_sub_menu_link_level_n;
            @include pnm_style_main_navigation_sub_menu_link_level_n;
          }
        }
        ul {
          @include pnm_struct_main_navigation_sub_menu_level_n;
          @include pnm_style_main_navigation_sub_menu_level_n;
        }
      }
    }
  }
}
```

### Example JS
```javascript
$(function() {
  $('.sf-menu').superfish();
});
```

## Installation
Superfish can be included by running `npm install` from this directory.
