// =========================================================
// HEADER SEARCH
// =========================================================
$(function() {
  var header_search = new pnm_header_search();
  header_search.init({
    toggle_class_on_element: '.header-inner .layer-2',
    toggle_element_container: '.header-search-toggle-container',
    container_element: '#header-search-form',
    breakpoint: 768,
    on_change: function() { /* ... */ }
  });
});

// =========================================================
// RESIZE
// =========================================================
$(function() {
  var text_resize = new pnm_text_resize();
  text_resize.init({
    root_element: 'html',
    reduce_button_element: '.resize-container .resize-reduce',
    increase_button_element: '.resize-container .resize-increase',
    on_change: function() { /* ... */ }
  });
});

// =========================================================
// MAIN NAVIGATION
// =========================================================
$(function() {
  var main_nagivation = new pnm_main_navigation();
  main_nagivation.init({
    breakpoint: 768,
    menu_element: '.sf-menu',
    toggle_element_container: '.menu-toggle-container',
    container_element: '#main-navigation-top'
    // toggle_element_html
  });
});

// =========================================================
// SIDEBAR RESIZE
// =========================================================
$(function() {
  var sidebar_nav = new pnm_sidebar_nav();
  sidebar_nav.init({
    title_element: '.section-title',
    nav_element: '.sidebar-menu',
    nav_wrapper_element: '.sidebar > .sidebar-menu',
    sidebar_element: '.sidebar',
    active_trail_class: 'active-trail',
    breakpoint: 768,
    on_change: function() { /* ... */ }
  });
});

// =========================================================
// LINK TO TOP
// =========================================================
$(function() {
  var link_to_top = new pnm_link_to_top();
  link_to_top.init({
    link_element: '.back-to-top',
    on_change: function() { /* ... */ }
  });
});

// =========================================================
// TABLE OF CONTENTS
// =========================================================
$(function() {
  var toc = new pnm_table_of_contents();
  toc.init({
    body_field: '.body-centre',
    toc_container: '.table-of-contents-wrapper',
    list_selector: '.toc-sticky-selector'
  });
});
// =========================================================
// Feature Carousel
// =========================================================
$(function() {
  var feature_carousel = new pnm_feature_carousel();
  feature_carousel.init({
    container_element: '.feature-carousel',
    current_slide: 0,
    tablet_breakpoint: 768,
    desktop_column: 1170
  });
});
