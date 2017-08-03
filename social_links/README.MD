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
        <img typeof="foaf:Image" src="/images/svg/social-facebook.svg" alt="Facebook" title="Facebook">
      </a>
      <a href="#" class="has-image" rel="external">
        <img typeof="foaf:Image" src="/images/svg/social-twitter.svg" alt="Twitter" title="Twitter">
      </a>
      <a href="#" class="has-image" rel="external">
        <img typeof="foaf:Image" src="/images/svg/social-youtube.svg" alt="Youtube" title="Youtube">
      </a>
      <a href="/contact-us" class="has-image">
        <img typeof="foaf:Image" src="/images/svg/social-email.svg" alt="Email" title="Email">
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
