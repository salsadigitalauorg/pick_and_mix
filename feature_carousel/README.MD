# PNM - Homepage Introduction

Homepage Introduction component for displaying introduction / welcome message on homepage.

## Example Implementation

### Example HTML
```html
<div class="feature-carousel-container">
  <div class="feature-carousel feature-carousel-container-inner">
    <div class="feature-carousel-row">
      <div class="feature-carousel-image-wrapper">
        <img src="http://via.placeholder.com/1600x444" alt="carousel" image" title="carousel" image">
      </div>
      <div class="feature-carousel-body">
        <div class="feature-carousel-details">
          <h2 class="feature-carousel-title">
           Homepage banner 1
          </h2>
          <p class="feature-carousel-text">This is a summary of the banner's headline which can be displayed on a maximum of three lines, depending on the length of the text.</p>
          <a href="#" title="find out more" class="feature-carousel-button">Find out more</a>
        </div>
      </div>
    </div>
    <div class="feature-carousel-row">
      <div class="feature-carousel-image-wrapper">
        <img src="http://via.placeholder.com/1600x444" alt="carousel" image" title="carousel" image">
      </div>
      <div class="feature-carousel-body">
        <div class="feature-carousel-details">
          <h2 class="feature-carousel-title">
           Homepage banner 2
          </h2>
          <p class="feature-carousel-text">This is a summary of the banner's headline which can be displayed on a maximum of three lines, depending on the length of the text.</p>
          <a href="#" title="find out more" class="feature-carousel-button">Find out more</a>
        </div>
      </div>
    </div>
    <div class="feature-carousel-row">
      <div class="feature-carousel-image-wrapper">
        <img src="http://via.placeholder.com/1600x444" alt="carousel" image" title="carousel" image">
      </div>
      <div class="feature-carousel-body">
        <div class="feature-carousel-details">
          <h2 class="feature-carousel-title">
           Homepage banner 3
          </h2>
          <p class="feature-carousel-text">This is a summary of the banner's headline which can be displayed on a maximum of three lines, depending on the length of the text.</p>
          <a href="#" title="find out more" class="feature-carousel-button">Find out more</a>
        </div>
      </div>
    </div>
  </div>
</div>

### Example SCSS
```scss
.feature-carousel-container {
  @include pnm_style_feature_carousel_container();
  @include pnm_struct_feature_carousel_container();
  .feature-carousel-container-inner {
    @include pnm_style_feature_carousel_container_inner();
    @include pnm_struct_feature_carousel_container_inner();
    .owl-item {
      @include pnm_style_feature_carousel_slider_owl_item();
      @include pnm_struct_feature_carousel_slider_owl_item();
    }
    .feature-carousel-row {
      @include pnm_style_feature_carousel_row();
      @include pnm_struct_feature_carousel_row();
      .feature-carousel-image-wrapper {
        @include pnm_style_feature_carousel_image_wrapper();
        @include pnm_struct_feature_carousel_image_wrapper();
        img {
          @include pnm_style_feature_carousel_image();
          @include pnm_struct_feature_carousel_image();
        }
      }
      .feature-carousel-body {
        @include pnm_style_feature_carousel_body();
        @include pnm_struct_feature_carousel_body();
        .feature-carousel-details {
          @include pnm_style_feature_carousel_details();
          @include pnm_struct_feature_carousel_details();
          .feature-carousel-title {
            @include pnm_style_feature_carousel_title();
            @include pnm_struct_feature_carousel_title();
          }
          .feature-carousel-text {
            @include pnm_style_feature_carousel_text();
            @include pnm_struct_feature_carousel_text();
          }
          .feature-carousel-button {
            @include pnm_style_feature_carousel_button();
            @include pnm_struct_feature_carousel_button();
          }
        }
      }
    }
  }
  .slider-controls {
    @include pnm_style_feature_carousel_slider_controls();
    @include pnm_struct_feature_carousel_slider_controls();
    button {
      @include pnm_style_feature_carousel_slider_control_button();
      @include pnm_struct_feature_carousel_slider_control_button();
      &.slider-prev {
        @include pnm_style_feature_carousel_slider_controls_prev();
        @include pnm_struct_feature_carousel_slider_controls_prev();
      }
      &.slider-next {
        @include pnm_style_feature_carousel_slider_controls_next();
        @include pnm_struct_feature_carousel_slider_controls_next();
      }
      &.slider-play {
        @include pnm_style_feature_carousel_slider_controls_pause();
        @include pnm_struct_feature_carousel_slider_controls_pause();
        &.paused {
          @include pnm_style_feature_carousel_slider_controls_play();
          @include pnm_struct_feature_carousel_slider_controls_play();
        }
      }
      &.active {
        @include pnm_style_feature_carousel_slider_control_button_active();
        @include pnm_struct_feature_carousel_slider_control_button_active();
      }
    }
    ul {
      @include pnm_style_feature_carousel_slider_controls_list();
      @include pnm_struct_feature_carousel_slider_controls_list();
      li {
        display: inline;
      }
    }
  }
  .disabled {
    @include pnm_style_feature_carousel_slider_disabled();
    @include pnm_struct_feature_carousel_slider_disabled();
  }
}

### Example JS
$(function() {
  var feature_carousel = new pnm_feature_carousel();
  feature_carousel.init({
    container_element: '.feature-carousel',
    current_slide: 0,
    tablet_breakpoint: 768,
    desktop_column: 1170
  });
});
