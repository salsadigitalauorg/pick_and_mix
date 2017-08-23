# PNM - Social Links

Social Links component for displaying a block of linked social media services.

## Example Implementation

### Example HTML
```html
<div class="social-links-container">
  <div class="social-links-inner">
    <h2>Connect with us</h2>
    <div class="social-links">
      <a href="#" rel="external">
        <img typeof="foaf:Image" src="dist/images/svg/social-facebook.svg" alt="Go to organisation's Facebook page" title="Facebook" />
      </a>
      <a href="#" class="has-image" rel="external">
        <img typeof="foaf:Image" src="dist/images/svg/social-twitter.svg" alt="Go to organisation's Twitter page" title="Twitter" />
      </a>
      <a href="#" class="has-image" rel="external">
        <img typeof="foaf:Image" src="dist/images/svg/social-youtube.svg" alt="Go to organisation's Youtube page" title="Youtube" />
      </a>
      <a href="/contact-us" class="has-image">
        <img typeof="foaf:Image" src="dist/images/svg/social-email.svg" alt="Send an email to the organisation" title="Email" />
      </a>
    </div>
  </div>
</div>
```

### Example SCSS
```scss
.social-links-container {
  @include pnm_struct_social_links_container;
  @include pnm_style_social_links_container;
}
.social-links-inner {
  @include pnm_struct_social_links_container_inner;
  @include pnm_style_social_links_container_inner;
  h2 {
    @include pnm_struct_social_links_title;
    @include pnm_style_social_links_title;
  }
}
.social-links {
  @include pnm_style_social_links;
  @include pnm_struct_social_links;
  a {
    @include pnm_style_social_links_item;
    @include pnm_struct_social_links_item;
  }
  img {
    @include pnm_style_social_links_image;
    @include pnm_struct_social_links_image;
  }
}
```

### Example JS
None
