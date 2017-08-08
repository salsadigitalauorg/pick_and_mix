# PNM - Title & Breadcrumb Banner

Title and breacrumb banner component that appears at the top of a page.
## Example Implementation

### Example HTML
```html
<div class="title-crumbs-banner">
  <div class="title-crumbs-banner-inner">
     <nav class="title-crumbs-breadcrumbs">
       <span><a href="/">Home</a></span>
       <span><a href="/">Nav item 1</a></span>
       <span><a href="/">Nav item 2</a></span>
 	 </nav>
 	 <h1>Heading 1 section title</h1>
  </div>
</div>
```

### Example SCSS
```scss
.title-crumbs-banner {
  @include pnm_struct_title_crumbs_banner_container;
  @include pnm_style_title_crumbs_banner_container;
  .title-crumbs-banner-inner {
    @include pnm_struct_title_crumbs_banner_inner;
  }
  .title-crumbs-breadcrumbs span {
    @include pnm_struct_title_crumbs_banner_breadcrumb_wrapper;
    @include pnm_style_title_crumbs_banner_breadcrumb_wrapper;
    a {
	  @include pnm_struct_title_crumbs_banner_breadcrumb;
	  @include pnm_style_title_crumbs_banner_breadcrumb;
	}
  }
  .title-crumbs-breadcrumbs span:last-child  {
    @include pnm_struct_title_crumbs_banner_breadcrumb_wrapper_last;
    @include pnm_style_title_crumbs_banner_breadcrumb_wrapper_last;
    a {
      @include pnm_struct_title_crumbs_banner_breadcrumb_last;
	  @include pnm_style_title_crumbs_banner_breadcrumb_last;
	}
  }
  h1 {
    @include pnm_struct_title_crumbs_banner_title;
    @include pnm_style_title_crumbs_banner_title;
  }
}
```

### Example JS
None
