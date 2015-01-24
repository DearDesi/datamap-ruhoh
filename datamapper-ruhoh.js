/*jshint -W054 */
;(function (exports) {
  'use strict';

  var Mustache = exports.Mustache || require('mustache')
    ;

  function map(view) {
    var newview
      , analytics
      , comments
      ;

    comments = view.site.disqus_shortname &&
      Mustache.render(view.desi.partials.disqus, { disqus: {
        shortname: view.site.disqus_shortname
      , identifier: view.entity.disqus_identifier || undefined
      , url: !view.entity.disqus_identifier && view.entity.disqus_url || undefined
      }})
      ;

    analytics = view.site.google_analytics_tracking_id && 
      Mustache.render(view.desi.partials.google_analytics, { google_analytics: {
        tracking_id: view.site.google_analytics_tracking_id
      }})
      ;

    newview = {
      content: view.contents
    , page: {
        title: view.entity.yml.title || view.site.title     // in rt
      , tagline: view.entity.yml.tagline                    // in rt
      , description: view.entity.yml.description            // in rt
      , content: view.contents
      , youtube: view.entity.yml.youtube
      , tags: view.entity.yml.tags
      , categories: view.entity.yml.categories
      , player_width: view.entity.yml.player_width
      , player_height: view.entity.yml.player_height
      , next: view.entities[view.entity_index + 1]
      , previous: view.entities[view.entity_index - 1]
      , date: view.entity.year + '-' + view.entity.month + '-' + view.entity.day
      , url: view.entity.relative_link
      // TODO , url: view.entities.
      }
    , 'page?previous': view.entities[view.entity_index - 1] // ruhoh-twitter only
        // should contain { url: ..., title: ... }
    , 'page?next': view.entities[view.entity_index + 1]     // ruhoh-twitter only
    , 'page.categories?to_categories': []                   // ruhoh-twitter only
    , 'page.tags?to_tags': []                               // ruhoh-twitter only
    , posts: { collated: view.desi.collated }
    , urls: {
        base_url: view.env.base_url
        // /something/ -> good (leading and trailing slash)
        // / -> bad good (leading and trailing slash)
      , base_path: (view.env.base_path + '/').replace('//', '/')
      }
    , data: {
        author: {
          name: view.author.name
        , twitter: view.author.twitter
        }
      , title: view.site.title
      , host: view.env.base_url.replace(/^https?:\/\//, '')
      }
    , stylesheets: { 'load': function () {
        return function (text, render) {
          // TODO pay attention to text of which styles to load?
          // this is unescaped, right?
          return render(view.desi.styles.join('\n'));
        };
      }}
    , styles: view.desi.styles.join('\n')
    , assets: view.desi.styles.join('\n')                   // ruhoh-twitter only
    , comments: comments                                    // ruhoh-twitter only
    , analytics: analytics                                  // ruhoh-twitter only
    , widgets: {
        comments: comments
      , analytics: analytics
      , facebook_connect: view.desi.partials.facebook_connect
      , twitter: view.desi.partials.twitter
      , google_plusone: view.desi.partials.google_plusone
      , amazon_link_enhancer: view.site.amazon_affiliate_id &&
          Mustache.render(view.desi.partials.amazon_link_enhancer, {
            amazon_affiliate_id: view.site.amazon_affiliate_id
          })
      }
    , site: {
        navigation: view.navigation
      , title: view.site.title                              // ruhoh-twitter only
      , author: {                                           // ruhoh-twitter only
          name: view.author.name                            // ruhoh-twitter only
        }
      }
    };

    // backwards compat
    newview.site['navigation?to_pages'] = newview.site.navigation;  // ruhoh-twitter only
    newview.site['navigation?to__root'] = newview.site.navigation;
    newview.data.navigation = view.site.navigation;
    newview.data['navigation?to_pages'] = newview.site.navigation;
    newview.data['navigation?to__root'] = newview.site.navigation;

    newview.page.content = view.contents;

    return newview;
  }

  // shoulda made this an object at the start... oops
  map.ruhoh = map;
  map['ruhoh@1.0'] = map;
  map['ruhoh@2.6'] = map;

  exports.DesiraeDatamapRuhoh = map.DesiraeDatamapRuhoh = map;
}('undefined' !== typeof exports && exports || window));
