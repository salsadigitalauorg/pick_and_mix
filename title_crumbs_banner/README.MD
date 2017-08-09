# PNM - Title & Breadcrumb Banner

Title and breacrumb banner component that appears at the top of a page.
## Example Implementation

### Example HTML
```html
<div class="title-crumbs-banner">
  <div class="title-crumbs-banner-inner">
    <nav class="crumbs">
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/for-partners">Nav item 1</a>
        </li>
        <li>
          <a href="/for-partners">Nav item 2</a>
        </li>
      </ul>
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
  .crumbs {
    ul {
      @include pnm_struct_title_crumbs_banner_breadcrumb_nav;
      li {
        @include pnm_style_title_crumbs_banner_breadcrumb_item;
      }
      a {
        @include pnm_style_title_crumbs_banner_breadcrumb_link;
      }
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
