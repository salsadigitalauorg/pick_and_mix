# PNM - Homepage Introduction

Homepage Introduction component for displaying introduction / welcome message on homepage.

## Example Implementation

### Example HTML
```html
<div class="homepage-banner-container">
  <div class="homepage-banner-image-wrapper">
    <img src="http://via.placeholder.com/1600x444" alt="banner image" title="banner image">
  </div>
  <div class="homepage-banner-container-inner">
    <div class="homepage-banner-details">
      <h2 class="homepage-banner-title">
       Homepage banner title over 2 lines
      </h2>
      <p class="homepage-banner-text">This is a summary of the banner's headline which can be displayed on a maximum of three lines, depending on the length of the text.</p>
      <a href="#" title="find out more" class="homepage-banner-button">Find out more</a>
    </div>
  </div>
</div>
```

### Example SCSS
```scss
.homepage-banner-container {
  @include pnm_struct_feature_container;
  @include pnm_style_feature_container;
  .homepage-banner-container-inner {
    @include pnm_style_feature_container_inner;
    @include pnm_struct_feature_container_inner;
  }
  .homepage-banner-image-wrapper {
    @include pnm_struct_feature_image_wrapper
  }
  img {
    @include pnm_struct_feature_image;
  }
  .homepage-banner-details {
    @include pnm_struct_feature_details;
    @include pnm_style_feature_details;
    .homepage-banner-title {
      @include pnm_struct_feature_details_title;
      @include pnm_style_feature_details_title;
    }
    .homepage-banner-text {
      @include pnm_struct_feature_details_body;
      @include pnm_style_feature_details_body;
    }
    .homepage-banner-button {
      @include pnm_struct_feature_details_button;
      @include pnm_style_feature_details_button;
    }
  }
}
```

### Example JS
None
