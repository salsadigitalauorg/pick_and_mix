# PNM - Social Links

Social Links component for displaying a block of linked social media services.

## Example Implementation

### Example HTML
```html
<div class="social-links-container">
  <div class="social-links-inner">
    <h2>Connect with us</h2>
    <div class="social-links">
      <a class="twitter" href="#">
        <img src="dist/images/svg/social-twitter.svg" alt="Go to organisation's Twitter page" title="Twitter">
      </a>
      <a class="facebook" href="#">
        <img src="dist/images/svg/social-facebook.svg" alt="Go to organisation's Facebook page" title="Facebook">
      </a>
      <a class="googleplus" href="#">
        <img src="dist/images/svg/social-googleplus.svg" alt="Go to organisation's Google Plus page" title="Google Plus">
      </a>
      <a class="instagram" href="#">
        <img src="dist/images/svg/social-instagram.svg" alt="Go to organisation's Instagram page" title="Instagram">
      </a>
      <a class="youtube" href="#">
        <img src="dist/images/svg/social-youtube.svg" alt="Go to organisation's YouTube page" title="YouTube">
      </a>
      <a class="vimeo" href="#">
        <img src="dist/images/svg/social-vimeo.svg" alt="Go to organisation's Vimeo page" title="Vimeo">
      </a>
      <a class="flickr" href="#">
        <img src="dist/images/svg/social-flickr.svg" alt="Go to organisation's Flickr page" title="Flickr">
      </a>
      <a class="linkedin" href="#">
        <img src="dist/images/svg/social-linkedin.svg" alt="Go to organisation's LinkedIn page" title="LinkedIn">
      </a>
      <a class="rss" href="#">
        <img src="dist/images/svg/social-rss.svg" alt="Go to organisation's RSS feed" title="RSS feed">
      </a>
      <a class="email" href="mailto:organisation@organisation.com">
        <img src="dist/images/svg/social-email.svg" alt="Send an email to organisation" title="Email / contact us">
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
