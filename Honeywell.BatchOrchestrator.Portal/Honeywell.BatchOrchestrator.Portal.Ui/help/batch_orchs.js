// {{MadCap}} //////////////////////////////////////////////////////////////////
// Copyright: MadCap Software, Inc - www.madcapsoftware.com ////////////////////
////////////////////////////////////////////////////////////////////////////////
// <version>13.2.0.0</version>
////////////////////////////////////////////////////////////////////////////////

//    Syntax:
//    function FMCOpenHelp( id, skinName, searchQuery, firstPick )
//
//    id          - Identifier that was created in Flare. This can be either the identifier name or value. The topic and skin
//                  that is associated with the id will be used. If no skin is associated with the id, skinName will be used.
//                  Alternatively, id may contain a topic path. In this case, the specified topic will be loaded with the skin
//                  that is specified in skinName. Specify null to use the help system's default starting topic.
//    skinName    - This is a string indicating the name of the skin to use when opening the help system. Specify null to use
//                  the default skin or to use the skin that is associated with id. If a skin is associated with id AND a skin
//                  is specified in skinName, skinName will take precedence.
//    searchQuery - This is a string indicating the search query used when opening the help system. If a search query is specified,
//                  the help system will start with the search pane open and the search query executed. Specify null to open
//                  the help system without a search query.
//    firstPick   - This is a boolean indicating whether to automatically open the topic from the first search result that is
//                  returned by the search query (see searchQuery parameter). Use null if no search query was specified.
//
//    Examples:
//
//    In the following example, topic and skin associated with "FILE_NEW" will be used:
//    FMCOpenHelp( 'FILE_NEW', null, null, null );
//
//    In the following example, topic associated with "FILE_NEW" will be used. "BlueSkin" will override the skin associated with "FILE_NEW":
//    FMCOpenHelp( 'FILE_NEW', 'BlueSkin', null, null );
//
//    In the following example, topic and skin associated with identifier value 1 will be used:
//    FMCOpenHelp( 1, null, null, null );
//
//    In the following example, topic associated with identifier value 1 will be used. "BlueSkin" will override the skin associated with identifier value 1:
//    FMCOpenHelp( 1, 'BlueSkin', null, null );
//
//    In the following example, "Company/Employees.htm" will be used with the default skin:
//    FMCOpenHelp( 'Company/Employees.htm', null, null, null );
//
//    In the following example, both the default topic and skin will be used:
//    FMCOpenHelp( null, null, null, null );
//
//    In the following example, the default topic will be used with "BlueSkin":
//    FMCOpenHelp( null, 'BlueSkin', null, null );
//
//    In the following example, both the default topic and skin will be used. The help system will be started with the search pane
//    displaying the search results for the query 'quarterly report'. The topic from the first result will not be opened:
//    FMCOpenHelp( null, null, 'quarterly report', false );
//
//    In the following example, both the default topic and skin will be used. The help system will be started with the search pane
//    displaying the search results for the query 'quarterly report'. The topic from the first result will be opened:
//    FMCOpenHelp( null, null, 'quarterly report', true );

function FMCOpenHelp(id, skinName, searchQuery, firstPick, pathToHelpSystem) {
  MadCap.OpenHelp(id, skinName, searchQuery, firstPick, pathToHelpSystem);
}

/*!
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 *
 * v13.2.0.0
 */

/*
 RequireJS 2.1.11 Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/jrburke/requirejs for details
*/
var requirejs, require, define;
(function (ca) {
  function G(b) {
    return '[object Function]' === M.call(b);
  }
  function H(b) {
    return '[object Array]' === M.call(b);
  }
  function v(b, c) {
    if (b) {
      var d;
      for (d = 0; d < b.length && (!b[d] || !c(b[d], d, b)); d += 1);
    }
  }
  function U(b, c) {
    if (b) {
      var d;
      for (d = b.length - 1; -1 < d && (!b[d] || !c(b[d], d, b)); d -= 1);
    }
  }
  function s(b, c) {
    return ga.call(b, c);
  }
  function j(b, c) {
    return s(b, c) && b[c];
  }
  function B(b, c) {
    for (var d in b) if (s(b, d) && c(b[d], d)) break;
  }
  function V(b, c, d, g) {
    c &&
      B(c, function (c, h) {
        if (d || !s(b, h))
          g &&
          'object' === typeof c &&
          c &&
          !H(c) &&
          !G(c) &&
          !(c instanceof RegExp)
            ? (b[h] || (b[h] = {}), V(b[h], c, d, g))
            : (b[h] = c);
      });
    return b;
  }
  function t(b, c) {
    return function () {
      return c.apply(b, arguments);
    };
  }
  function da(b) {
    throw b;
  }
  function ea(b) {
    if (!b) return b;
    var c = ca;
    v(b.split('.'), function (b) {
      c = c[b];
    });
    return c;
  }
  function C(b, c, d, g) {
    c = Error(c + '\nhttp://requirejs.org/docs/errors.html#' + b);
    c.requireType = b;
    c.requireModules = g;
    d && (c.originalError = d);
    return c;
  }
  function ha(b) {
    function c(a, e, b) {
      var f,
        n,
        c,
        d,
        g,
        h,
        i,
        I = e && e.split('/');
      n = I;
      var m = l.map,
        k = m && m['*'];
      if (a && '.' === a.charAt(0))
        if (e) {
          n = I.slice(0, I.length - 1);
          a = a.split('/');
          e = a.length - 1;
          l.nodeIdCompat && R.test(a[e]) && (a[e] = a[e].replace(R, ''));
          n = a = n.concat(a);
          d = n.length;
          for (e = 0; e < d; e++)
            if (((c = n[e]), '.' === c)) n.splice(e, 1), (e -= 1);
            else if ('..' === c)
              if (1 === e && ('..' === n[2] || '..' === n[0])) break;
              else 0 < e && (n.splice(e - 1, 2), (e -= 2));
          a = a.join('/');
        } else 0 === a.indexOf('./') && (a = a.substring(2));
      if (b && m && (I || k)) {
        n = a.split('/');
        e = n.length;
        a: for (; 0 < e; e -= 1) {
          d = n.slice(0, e).join('/');
          if (I)
            for (c = I.length; 0 < c; c -= 1)
              if ((b = j(m, I.slice(0, c).join('/'))))
                if ((b = j(b, d))) {
                  f = b;
                  g = e;
                  break a;
                }
          !h && k && j(k, d) && ((h = j(k, d)), (i = e));
        }
        !f && h && ((f = h), (g = i));
        f && (n.splice(0, g, f), (a = n.join('/')));
      }
      return (f = j(l.pkgs, a)) ? f : a;
    }
    function d(a) {
      z &&
        v(document.getElementsByTagName('script'), function (e) {
          if (
            e.getAttribute('data-requiremodule') === a &&
            e.getAttribute('data-requirecontext') === i.contextName
          )
            return e.parentNode.removeChild(e), !0;
        });
    }
    function g(a) {
      var e = j(l.paths, a);
      if (e && H(e) && 1 < e.length)
        return e.shift(), i.require.undef(a), i.require([a]), !0;
    }
    function u(a) {
      var e;
      return [e, a];
    }
    function m(a, e, b, f) {
      var n,
        d,
        g = null,
        h = e ? e.name : null,
        l = a,
        m = !0,
        k = '';
      a || ((m = !1), (a = '_@r' + (M += 1)));
      a = u(a);
      g = a[0];
      a = a[1];
      g && ((g = c(g, h, f)), (d = j(p, g)));
      a &&
        (g
          ? (k =
              d && d.normalize
                ? d.normalize(a, function (a) {
                    return c(a, h, f);
                  })
                : c(a, h, f))
          : ((k = c(a, h, f)),
            (a = u(k)),
            (g = a[0]),
            (k = a[1]),
            (b = !0),
            (n = i.nameToUrl(k))));
      b = g && !d && !b ? '_unnormalized' + (Q += 1) : '';
      return {
        prefix: g,
        name: k,
        parentMap: e,
        unnormalized: !!b,
        url: n,
        originalName: l,
        isDefine: m,
        id: (g ? g + '!' + k : k) + b,
      };
    }
    function q(a) {
      var e = a.id,
        b = j(k, e);
      b || (b = k[e] = new i.Module(a));
      return b;
    }
    function r(a, e, b) {
      var f = a.id,
        n = j(k, f);
      if (s(p, f) && (!n || n.defineEmitComplete)) 'defined' === e && b(p[f]);
      else if (((n = q(a)), n.error && 'error' === e)) b(n.error);
      else n.on(e, b);
    }
    function w(a, e) {
      var b = a.requireModules,
        f = !1;
      if (e) e(a);
      else if (
        (v(b, function (e) {
          if ((e = j(k, e)))
            (e.error = a), e.events.error && ((f = !0), e.emit('error', a));
        }),
        !f)
      )
        h.onError(a);
    }
    function x() {
      S.length && (ia.apply(A, [A.length, 0].concat(S)), (S = []));
    }
    function y(a) {
      delete k[a];
      delete W[a];
    }
    function F(a, e, b) {
      var f = a.map.id;
      a.error
        ? a.emit('error', a.error)
        : ((e[f] = !0),
          v(a.depMaps, function (f, c) {
            var d = f.id,
              g = j(k, d);
            g &&
              !a.depMatched[c] &&
              !b[d] &&
              (j(e, d) ? (a.defineDep(c, p[d]), a.check()) : F(g, e, b));
          }),
          (b[f] = !0));
    }
    function D() {
      var a,
        e,
        b = (a = 1e3 * l.waitSeconds) && i.startTime + a < new Date().getTime(),
        f = [],
        c = [],
        h = !1,
        k = !0;
      if (!X) {
        X = !0;
        B(W, function (a) {
          var i = a.map,
            m = i.id;
          if (a.enabled && (i.isDefine || c.push(a), !a.error))
            if (!a.inited && b) g(m) ? (h = e = !0) : (f.push(m), d(m));
            else if (
              !a.inited &&
              a.fetched &&
              i.isDefine &&
              ((h = !0), !i.prefix)
            )
              return (k = !1);
        });
        if (b && f.length)
          return (
            (a = C('timeout', 'Load timeout for modules: ' + f, null, f)),
            (a.contextName = i.contextName),
            w(a)
          );
        k &&
          v(c, function (a) {
            F(a, {}, {});
          });
        if ((!b || e) && h)
          if ((z || fa) && !Y)
            Y = setTimeout(function () {
              Y = 0;
              D();
            }, 50);
        X = !1;
      }
    }
    function E(a) {
      s(p, a[0]) || q(m(a[0], null, !0)).init(a[1], a[2]);
    }
    function K(a) {
      var a = a.currentTarget || a.srcElement,
        e = i.onScriptLoad;
      a.detachEvent && !Z
        ? a.detachEvent('onreadystatechange', e)
        : a.removeEventListener('load', e, !1);
      e = i.onScriptError;
      (!a.detachEvent || Z) && a.removeEventListener('error', e, !1);
      return { node: a, id: a && a.getAttribute('data-requiremodule') };
    }
    function L() {
      var a;
      for (x(); A.length; ) {
        a = A.shift();
        if (null === a[0])
          return w(
            C(
              'mismatch',
              'Mismatched anonymous define() module: ' + a[a.length - 1]
            )
          );
        E(a);
      }
    }
    var X,
      $,
      i,
      N,
      Y,
      l = {
        waitSeconds: 7,
        baseUrl: './',
        paths: {},
        bundles: {},
        pkgs: {},
        shim: {},
        config: {},
      },
      k = {},
      W = {},
      aa = {},
      A = [],
      p = {},
      T = {},
      ba = {},
      M = 1,
      Q = 1;
    N = {
      require: function (a) {
        return a.require ? a.require : (a.require = i.makeRequire(a.map));
      },
      exports: function (a) {
        a.usingExports = !0;
        if (a.map.isDefine)
          return a.exports
            ? (p[a.map.id] = a.exports)
            : (a.exports = p[a.map.id] = {});
      },
      module: function (a) {
        return a.module
          ? a.module
          : (a.module = {
              id: a.map.id,
              uri: a.map.url,
              config: function () {
                return j(l.config, a.map.id) || {};
              },
              exports: a.exports || (a.exports = {}),
            });
      },
    };
    $ = function (a) {
      this.events = j(aa, a.id) || {};
      this.map = a;
      this.shim = j(l.shim, a.id);
      this.depExports = [];
      this.depMaps = [];
      this.depMatched = [];
      this.pluginMaps = {};
      this.depCount = 0;
    };
    $.prototype = {
      init: function (a, e, b, f) {
        f = f || {};
        if (!this.inited) {
          this.factory = e;
          if (b) this.on('error', b);
          else
            this.events.error &&
              (b = t(this, function (a) {
                this.emit('error', a);
              }));
          this.depMaps = a && a.slice(0);
          this.errback = b;
          this.inited = !0;
          this.ignore = f.ignore;
          f.enabled || this.enabled ? this.enable() : this.check();
        }
      },
      defineDep: function (a, e) {
        this.depMatched[a] ||
          ((this.depMatched[a] = !0),
          (this.depCount -= 1),
          (this.depExports[a] = e));
      },
      fetch: function () {
        if (!this.fetched) {
          this.fetched = !0;
          i.startTime = new Date().getTime();
          var a = this.map;
          if (this.shim)
            i.makeRequire(this.map, { enableBuildCallback: !0 })(
              this.shim.deps || [],
              t(this, function () {
                return a.prefix ? this.callPlugin() : this.load();
              })
            );
          else return a.prefix ? this.callPlugin() : this.load();
        }
      },
      load: function () {
        var a = this.map.url;
        T[a] || ((T[a] = !0), i.load(this.map.id, a));
      },
      check: function () {
        if (this.enabled && !this.enabling) {
          var a,
            e,
            b = this.map.id;
          e = this.depExports;
          var f = this.exports,
            c = this.factory;
          if (this.inited)
            if (this.error) this.emit('error', this.error);
            else {
              if (!this.defining) {
                this.defining = !0;
                if (1 > this.depCount && !this.defined) {
                  if (G(c)) {
                    if (
                      (this.events.error && this.map.isDefine) ||
                      h.onError !== da
                    )
                      try {
                        f = i.execCb(b, c, e, f);
                      } catch (d) {
                        a = d;
                      }
                    else f = i.execCb(b, c, e, f);
                    this.map.isDefine &&
                      void 0 === f &&
                      ((e = this.module)
                        ? (f = e.exports)
                        : this.usingExports && (f = this.exports));
                    if (a)
                      return (
                        (a.requireMap = this.map),
                        (a.requireModules = this.map.isDefine
                          ? [this.map.id]
                          : null),
                        (a.requireType = this.map.isDefine
                          ? 'define'
                          : 'require'),
                        w((this.error = a))
                      );
                  } else f = c;
                  this.exports = f;
                  if (
                    this.map.isDefine &&
                    !this.ignore &&
                    ((p[b] = f), h.onResourceLoad)
                  )
                    h.onResourceLoad(i, this.map, this.depMaps);
                  y(b);
                  this.defined = !0;
                }
                this.defining = !1;
                this.defined &&
                  !this.defineEmitted &&
                  ((this.defineEmitted = !0),
                  this.emit('defined', this.exports),
                  (this.defineEmitComplete = !0));
              }
            }
          else this.fetch();
        }
      },
      callPlugin: function () {
        var a = this.map,
          b = a.id,
          d = m(a.prefix);
        this.depMaps.push(d);
        r(
          d,
          'defined',
          t(this, function (f) {
            var d, g;
            g = j(ba, this.map.id);
            var J = this.map.name,
              u = this.map.parentMap ? this.map.parentMap.name : null,
              p = i.makeRequire(a.parentMap, { enableBuildCallback: !0 });
            if (this.map.unnormalized) {
              if (
                (f.normalize &&
                  (J =
                    f.normalize(J, function (a) {
                      return c(a, u, !0);
                    }) || ''),
                (f = m(a.prefix + '!' + J, this.map.parentMap)),
                r(
                  f,
                  'defined',
                  t(this, function (a) {
                    this.init(
                      [],
                      function () {
                        return a;
                      },
                      null,
                      { enabled: !0, ignore: !0 }
                    );
                  })
                ),
                (g = j(k, f.id)))
              ) {
                this.depMaps.push(f);
                if (this.events.error)
                  g.on(
                    'error',
                    t(this, function (a) {
                      this.emit('error', a);
                    })
                  );
                g.enable();
              }
            } else
              g
                ? ((this.map.url = i.nameToUrl(g)), this.load())
                : ((d = t(this, function (a) {
                    this.init(
                      [],
                      function () {
                        return a;
                      },
                      null,
                      { enabled: !0 }
                    );
                  })),
                  (d.error = t(this, function (a) {
                    this.inited = !0;
                    this.error = a;
                    a.requireModules = [b];
                    B(k, function (a) {
                      0 === a.map.id.indexOf(b + '_unnormalized') &&
                        y(a.map.id);
                    });
                    w(a);
                  })),
                  (d.fromText = t(this, function (f, c) {
                    var g = a.name,
                      J = m(g),
                      k = O;
                    c && (f = c);
                    k && (O = !1);
                    q(J);
                    s(l.config, b) && (l.config[g] = l.config[b]);
                    try {
                      h.exec(f);
                    } catch (j) {
                      return w(
                        C(
                          'fromtexteval',
                          'fromText eval for ' + b + ' failed: ' + j,
                          j,
                          [b]
                        )
                      );
                    }
                    k && (O = !0);
                    this.depMaps.push(J);
                    i.completeLoad(g);
                    p([g], d);
                  })),
                  f.load(a.name, p, d, l));
          })
        );
        i.enable(d, this);
        this.pluginMaps[d.id] = d;
      },
      enable: function () {
        W[this.map.id] = this;
        this.enabling = this.enabled = !0;
        v(
          this.depMaps,
          t(this, function (a, b) {
            var c, f;
            if ('string' === typeof a) {
              a = m(
                a,
                this.map.isDefine ? this.map : this.map.parentMap,
                !1,
                !this.skipMap
              );
              this.depMaps[b] = a;
              if ((c = j(N, a.id))) {
                this.depExports[b] = c(this);
                return;
              }
              this.depCount += 1;
              r(
                a,
                'defined',
                t(this, function (a) {
                  this.defineDep(b, a);
                  this.check();
                })
              );
              this.errback && r(a, 'error', t(this, this.errback));
            }
            c = a.id;
            f = k[c];
            !s(N, c) && f && !f.enabled && i.enable(a, this);
          })
        );
        B(
          this.pluginMaps,
          t(this, function (a) {
            var b = j(k, a.id);
            b && !b.enabled && i.enable(a, this);
          })
        );
        this.enabling = !1;
        this.check();
      },
      on: function (a, b) {
        var c = this.events[a];
        c || (c = this.events[a] = []);
        c.push(b);
      },
      emit: function (a, b) {
        v(this.events[a], function (a) {
          a(b);
        });
        'error' === a && delete this.events[a];
      },
    };
    i = {
      config: l,
      contextName: b,
      registry: k,
      defined: p,
      urlFetched: T,
      defQueue: A,
      Module: $,
      makeModuleMap: m,
      nextTick: h.nextTick,
      onError: w,
      configure: function (a) {
        a.baseUrl &&
          '/' !== a.baseUrl.charAt(a.baseUrl.length - 1) &&
          (a.baseUrl += '/');
        var b = l.shim,
          c = { paths: !0, bundles: !0, config: !0, map: !0 };
        B(a, function (a, b) {
          c[b] ? (l[b] || (l[b] = {}), V(l[b], a, !0, !0)) : (l[b] = a);
        });
        a.bundles &&
          B(a.bundles, function (a, b) {
            v(a, function (a) {
              a !== b && (ba[a] = b);
            });
          });
        a.shim &&
          (B(a.shim, function (a, c) {
            H(a) && (a = { deps: a });
            if ((a.exports || a.init) && !a.exportsFn)
              a.exportsFn = i.makeShimExports(a);
            b[c] = a;
          }),
          (l.shim = b));
        a.packages &&
          v(a.packages, function (a) {
            var b,
              a = 'string' === typeof a ? { name: a } : a;
            b = a.name;
            a.location && (l.paths[b] = a.location);
            l.pkgs[b] =
              a.name + '/' + (a.main || 'main').replace(ja, '').replace(R, '');
          });
        B(k, function (a, b) {
          !a.inited && !a.map.unnormalized && (a.map = m(b));
        });
        if (a.deps || a.callback) i.require(a.deps || [], a.callback);
      },
      makeShimExports: function (a) {
        return function () {
          var b;
          a.init && (b = a.init.apply(ca, arguments));
          return b || (a.exports && ea(a.exports));
        };
      },
      makeRequire: function (a, e) {
        function g(f, c, d) {
          var j, l;
          e.enableBuildCallback && c && G(c) && (c.__requireJsBuild = !0);
          if ('string' === typeof f) {
            if (G(c)) return w(C('requireargs', 'Invalid require call'), d);
            if (a && s(N, f)) return N[f](k[a.id]);
            if (h.get) return h.get(i, f, a, g);
            j = m(f, a, !1, !0);
            j = j.id;
            return !s(p, j)
              ? w(
                  C(
                    'notloaded',
                    'Module name "' +
                      j +
                      '" has not been loaded yet for context: ' +
                      b +
                      (a ? '' : '. Use require([])')
                  )
                )
              : p[j];
          }
          L();
          i.nextTick(function () {
            L();
            l = q(m(null, a));
            l.skipMap = e.skipMap;
            l.init(f, c, d, { enabled: !0 });
            D();
          });
          return g;
        }
        e = e || {};
        V(g, {
          isBrowser: z,
          toUrl: function (b) {
            var e,
              d = b.lastIndexOf('.'),
              g = b.split('/')[0];
            if (-1 !== d && (!('.' === g || '..' === g) || 1 < d))
              (e = b.substring(d, b.length)), (b = b.substring(0, d));
            return i.nameToUrl(c(b, a && a.id, !0), e, !0);
          },
          defined: function (b) {
            return s(p, m(b, a, !1, !0).id);
          },
          specified: function (b) {
            b = m(b, a, !1, !0).id;
            return s(p, b) || s(k, b);
          },
        });
        a ||
          (g.undef = function (b) {
            x();
            var c = m(b, a, !0),
              e = j(k, b);
            d(b);
            delete p[b];
            delete T[c.url];
            delete aa[b];
            U(A, function (a, c) {
              a[0] === b && A.splice(c, 1);
            });
            e && (e.events.defined && (aa[b] = e.events), y(b));
          });
        return g;
      },
      enable: function (a) {
        j(k, a.id) && q(a).enable();
      },
      completeLoad: function (a) {
        var b,
          c,
          f = j(l.shim, a) || {},
          d = f.exports;
        for (x(); A.length; ) {
          c = A.shift();
          if (null === c[0]) {
            c[0] = a;
            if (b) break;
            b = !0;
          } else c[0] === a && (b = !0);
          E(c);
        }
        c = j(k, a);
        if (!b && !s(p, a) && c && !c.inited) {
          if (l.enforceDefine && (!d || !ea(d)))
            return g(a)
              ? void 0
              : w(C('nodefine', 'No define call for ' + a, null, [a]));
          E([a, f.deps || [], f.exportsFn]);
        }
        D();
      },
      nameToUrl: function (a, b, c) {
        var f, d, g;
        (f = j(l.pkgs, a)) && (a = f);
        if ((f = j(ba, a))) return i.nameToUrl(f, b, c);
        if (h.jsExtRegExp.test(a)) f = a + (b || '');
        else {
          f = l.paths;
          a = a.split('/');
          for (d = a.length; 0 < d; d -= 1)
            if (((g = a.slice(0, d).join('/')), (g = j(f, g)))) {
              H(g) && (g = g[0]);
              a.splice(0, d, g);
              break;
            }
          f = a.join('/');
          f += b || (/^data\:|\?/.test(f) || c ? '' : '.js');
          f =
            ('/' === f.charAt(0) || f.match(/^[\w\+\.\-]+:/) ? '' : l.baseUrl) +
            f;
        }
        return l.urlArgs
          ? f + ((-1 === f.indexOf('?') ? '?' : '&') + l.urlArgs)
          : f;
      },
      load: function (a, b) {
        h.load(i, a, b);
      },
      execCb: function (a, b, c, d) {
        return b.apply(d, c);
      },
      onScriptLoad: function (a) {
        if (
          'load' === a.type ||
          ka.test((a.currentTarget || a.srcElement).readyState)
        )
          (P = null), (a = K(a)), i.completeLoad(a.id);
      },
      onScriptError: function (a) {
        var b = K(a);
        if (!g(b.id))
          return w(C('scripterror', 'Script error for: ' + b.id, a, [b.id]));
      },
    };
    i.require = i.makeRequire();
    return i;
  }
  var h,
    x,
    y,
    D,
    K,
    E,
    P,
    L,
    q,
    Q,
    la = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
    ma = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
    R = /\.js$/,
    ja = /^\.\//;
  x = Object.prototype;
  var M = x.toString,
    ga = x.hasOwnProperty,
    ia = Array.prototype.splice,
    z = !!(
      'undefined' !== typeof window &&
      'undefined' !== typeof navigator &&
      window.document
    ),
    fa = !z && 'undefined' !== typeof importScripts,
    ka =
      z && 'PLAYSTATION 3' === navigator.platform
        ? /^complete$/
        : /^(complete|loaded)$/,
    Z = 'undefined' !== typeof opera && '[object Opera]' === opera.toString(),
    F = {},
    r = {},
    S = [],
    O = !1;
  if ('undefined' === typeof define) {
    if ('undefined' !== typeof requirejs) {
      if (G(requirejs)) return;
      r = requirejs;
      requirejs = void 0;
    }
    'undefined' !== typeof require &&
      !G(require) &&
      ((r = require), (require = void 0));
    h = requirejs = function (b, c, d, g) {
      var u,
        m = '_';
      !H(b) &&
        'string' !== typeof b &&
        ((u = b), H(c) ? ((b = c), (c = d), (d = g)) : (b = []));
      u && u.context && (m = u.context);
      (g = j(F, m)) || (g = F[m] = h.s.newContext(m));
      u && g.configure(u);
      return g.require(b, c, d);
    };
    h.config = function (b) {
      return h(b);
    };
    h.nextTick =
      'undefined' !== typeof setTimeout
        ? function (b) {
            setTimeout(b, 4);
          }
        : function (b) {
            b();
          };
    require || (require = h);
    h.version = '2.1.11';
    h.jsExtRegExp = /^\/|:|\?|\.js$/;
    h.isBrowser = z;
    x = h.s = { contexts: F, newContext: ha };
    h({});
    v(['toUrl', 'undef', 'defined', 'specified'], function (b) {
      h[b] = function () {
        var c = F._;
        return c.require[b].apply(c, arguments);
      };
    });
    if (
      z &&
      ((y = x.head = document.getElementsByTagName('head')[0]),
      (D = document.getElementsByTagName('base')[0]))
    )
      y = x.head = D.parentNode;
    h.onError = da;
    h.createNode = function (b) {
      var c = b.xhtml
        ? document.createElementNS(
            'http://www.w3.org/1999/xhtml',
            'html:script'
          )
        : document.createElement('script');
      c.type = b.scriptType || 'text/javascript';
      c.charset = 'utf-8';
      c.async = !0;
      return c;
    };
    h.load = function (b, c, d) {
      var g = (b && b.config) || {};
      if (z)
        return (
          (g = h.createNode(g, c, d)),
          g.setAttribute('data-requirecontext', b.contextName),
          g.setAttribute('data-requiremodule', c),
          g.attachEvent &&
          !(
            g.attachEvent.toString &&
            0 > g.attachEvent.toString().indexOf('[native code')
          ) &&
          !Z
            ? ((O = !0), g.attachEvent('onreadystatechange', b.onScriptLoad))
            : (g.addEventListener('load', b.onScriptLoad, !1),
              g.addEventListener('error', b.onScriptError, !1)),
          (g.src = d),
          (L = g),
          D ? y.insertBefore(g, D) : y.appendChild(g),
          (L = null),
          g
        );
      if (fa)
        try {
          importScripts(d), b.completeLoad(c);
        } catch (j) {
          b.onError(
            C(
              'importscripts',
              'importScripts failed for ' + c + ' at ' + d,
              j,
              [c]
            )
          );
        }
    };
    z &&
      !r.skipDataMain &&
      U(document.getElementsByTagName('script'), function (b) {
        y || (y = b.parentNode);
        if ((K = b.getAttribute('data-main')))
          return (
            (q = K),
            r.baseUrl ||
              ((E = q.split('/')),
              (q = E.pop()),
              (Q = E.length ? E.join('/') + '/' : './'),
              (r.baseUrl = Q)),
            (q = q.replace(R, '')),
            h.jsExtRegExp.test(q) && (q = K),
            (r.deps = r.deps ? r.deps.concat(q) : [q]),
            !0
          );
      });
    define = function (b, c, d) {
      var g, h;
      'string' !== typeof b && ((d = c), (c = b), (b = null));
      H(c) || ((d = c), (c = null));
      !c &&
        G(d) &&
        ((c = []),
        d.length &&
          (d
            .toString()
            .replace(la, '')
            .replace(ma, function (b, d) {
              c.push(d);
            }),
          (c = (1 === d.length
            ? ['require']
            : ['require', 'exports', 'module']
          ).concat(c))));
      if (O) {
        if (!(g = L))
          (P && 'interactive' === P.readyState) ||
            U(document.getElementsByTagName('script'), function (b) {
              if ('interactive' === b.readyState) return (P = b);
            }),
            (g = P);
        g &&
          (b || (b = g.getAttribute('data-requiremodule')),
          (h = F[g.getAttribute('data-requirecontext')]));
      }
      (h ? h.defQueue : S).push([b, c, d]);
    };
    define.amd = { jQuery: !0 };
    h.exec = function (b) {
      return eval(b);
    };
    h(r);
  }
})(this); /* require end */

/* jQuery begin */
/*! jQuery v1.12.4 | (c) jQuery Foundation | jquery.org/license */
!(function (a, b) {
  'object' == typeof module && 'object' == typeof module.exports
    ? (module.exports = a.document
        ? b(a, !0)
        : function (a) {
            if (!a.document)
              throw new Error('jQuery requires a window with a document');
            return b(a);
          })
    : b(a);
})('undefined' != typeof window ? window : this, function (a, b) {
  var c = [],
    d = a.document,
    e = c.slice,
    f = c.concat,
    g = c.push,
    h = c.indexOf,
    i = {},
    j = i.toString,
    k = i.hasOwnProperty,
    l = {},
    m = '1.12.4',
    n = function (a, b) {
      return new n.fn.init(a, b);
    },
    o = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    p = /^-ms-/,
    q = /-([\da-z])/gi,
    r = function (a, b) {
      return b.toUpperCase();
    };
  (n.fn = n.prototype = {
    jquery: m,
    constructor: n,
    selector: '',
    length: 0,
    toArray: function () {
      return e.call(this);
    },
    get: function (a) {
      return null != a
        ? 0 > a
          ? this[a + this.length]
          : this[a]
        : e.call(this);
    },
    pushStack: function (a) {
      var b = n.merge(this.constructor(), a);
      return (b.prevObject = this), (b.context = this.context), b;
    },
    each: function (a) {
      return n.each(this, a);
    },
    map: function (a) {
      return this.pushStack(
        n.map(this, function (b, c) {
          return a.call(b, c, b);
        })
      );
    },
    slice: function () {
      return this.pushStack(e.apply(this, arguments));
    },
    first: function () {
      return this.eq(0);
    },
    last: function () {
      return this.eq(-1);
    },
    eq: function (a) {
      var b = this.length,
        c = +a + (0 > a ? b : 0);
      return this.pushStack(c >= 0 && b > c ? [this[c]] : []);
    },
    end: function () {
      return this.prevObject || this.constructor();
    },
    push: g,
    sort: c.sort,
    splice: c.splice,
  }),
    (n.extend = n.fn.extend = function () {
      var a,
        b,
        c,
        d,
        e,
        f,
        g = arguments[0] || {},
        h = 1,
        i = arguments.length,
        j = !1;
      for (
        'boolean' == typeof g && ((j = g), (g = arguments[h] || {}), h++),
          'object' == typeof g || n.isFunction(g) || (g = {}),
          h === i && ((g = this), h--);
        i > h;
        h++
      )
        if (null != (e = arguments[h]))
          for (d in e)
            (a = g[d]),
              (c = e[d]),
              g !== c &&
                (j && c && (n.isPlainObject(c) || (b = n.isArray(c)))
                  ? (b
                      ? ((b = !1), (f = a && n.isArray(a) ? a : []))
                      : (f = a && n.isPlainObject(a) ? a : {}),
                    (g[d] = n.extend(j, f, c)))
                  : void 0 !== c && (g[d] = c));
      return g;
    }),
    n.extend({
      expando: 'jQuery' + (m + Math.random()).replace(/\D/g, ''),
      isReady: !0,
      error: function (a) {
        throw new Error(a);
      },
      noop: function () {},
      isFunction: function (a) {
        return 'function' === n.type(a);
      },
      isArray:
        Array.isArray ||
        function (a) {
          return 'array' === n.type(a);
        },
      isWindow: function (a) {
        return null != a && a == a.window;
      },
      isNumeric: function (a) {
        var b = a && a.toString();
        return !n.isArray(a) && b - parseFloat(b) + 1 >= 0;
      },
      isEmptyObject: function (a) {
        var b;
        for (b in a) return !1;
        return !0;
      },
      isPlainObject: function (a) {
        var b;
        if (!a || 'object' !== n.type(a) || a.nodeType || n.isWindow(a))
          return !1;
        try {
          if (
            a.constructor &&
            !k.call(a, 'constructor') &&
            !k.call(a.constructor.prototype, 'isPrototypeOf')
          )
            return !1;
        } catch (c) {
          return !1;
        }
        if (!l.ownFirst) for (b in a) return k.call(a, b);
        for (b in a);
        return void 0 === b || k.call(a, b);
      },
      type: function (a) {
        return null == a
          ? a + ''
          : 'object' == typeof a || 'function' == typeof a
          ? i[j.call(a)] || 'object'
          : typeof a;
      },
      globalEval: function (b) {
        b &&
          n.trim(b) &&
          (
            a.execScript ||
            function (b) {
              a.eval.call(a, b);
            }
          )(b);
      },
      camelCase: function (a) {
        return a.replace(p, 'ms-').replace(q, r);
      },
      nodeName: function (a, b) {
        return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
      },
      each: function (a, b) {
        var c,
          d = 0;
        if (s(a)) {
          for (c = a.length; c > d; d++)
            if (b.call(a[d], d, a[d]) === !1) break;
        } else for (d in a) if (b.call(a[d], d, a[d]) === !1) break;
        return a;
      },
      trim: function (a) {
        return null == a ? '' : (a + '').replace(o, '');
      },
      makeArray: function (a, b) {
        var c = b || [];
        return (
          null != a &&
            (s(Object(a))
              ? n.merge(c, 'string' == typeof a ? [a] : a)
              : g.call(c, a)),
          c
        );
      },
      inArray: function (a, b, c) {
        var d;
        if (b) {
          if (h) return h.call(b, a, c);
          for (
            d = b.length, c = c ? (0 > c ? Math.max(0, d + c) : c) : 0;
            d > c;
            c++
          )
            if (c in b && b[c] === a) return c;
        }
        return -1;
      },
      merge: function (a, b) {
        var c = +b.length,
          d = 0,
          e = a.length;
        while (c > d) a[e++] = b[d++];
        if (c !== c) while (void 0 !== b[d]) a[e++] = b[d++];
        return (a.length = e), a;
      },
      grep: function (a, b, c) {
        for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++)
          (d = !b(a[f], f)), d !== h && e.push(a[f]);
        return e;
      },
      map: function (a, b, c) {
        var d,
          e,
          g = 0,
          h = [];
        if (s(a))
          for (d = a.length; d > g; g++)
            (e = b(a[g], g, c)), null != e && h.push(e);
        else for (g in a) (e = b(a[g], g, c)), null != e && h.push(e);
        return f.apply([], h);
      },
      guid: 1,
      proxy: function (a, b) {
        var c, d, f;
        return (
          'string' == typeof b && ((f = a[b]), (b = a), (a = f)),
          n.isFunction(a)
            ? ((c = e.call(arguments, 2)),
              (d = function () {
                return a.apply(b || this, c.concat(e.call(arguments)));
              }),
              (d.guid = a.guid = a.guid || n.guid++),
              d)
            : void 0
        );
      },
      now: function () {
        return +new Date();
      },
      support: l,
    }),
    'function' == typeof Symbol && (n.fn[Symbol.iterator] = c[Symbol.iterator]),
    n.each(
      'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(
        ' '
      ),
      function (a, b) {
        i['[object ' + b + ']'] = b.toLowerCase();
      }
    );
  function s(a) {
    var b = !!a && 'length' in a && a.length,
      c = n.type(a);
    return 'function' === c || n.isWindow(a)
      ? !1
      : 'array' === c ||
          0 === b ||
          ('number' == typeof b && b > 0 && b - 1 in a);
  }
  var t = (function (a) {
    var b,
      c,
      d,
      e,
      f,
      g,
      h,
      i,
      j,
      k,
      l,
      m,
      n,
      o,
      p,
      q,
      r,
      s,
      t,
      u = 'sizzle' + 1 * new Date(),
      v = a.document,
      w = 0,
      x = 0,
      y = ga(),
      z = ga(),
      A = ga(),
      B = function (a, b) {
        return a === b && (l = !0), 0;
      },
      C = 1 << 31,
      D = {}.hasOwnProperty,
      E = [],
      F = E.pop,
      G = E.push,
      H = E.push,
      I = E.slice,
      J = function (a, b) {
        for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return c;
        return -1;
      },
      K =
        'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped',
      L = '[\\x20\\t\\r\\n\\f]',
      M = '(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+',
      N =
        '\\[' +
        L +
        '*(' +
        M +
        ')(?:' +
        L +
        '*([*^$|!~]?=)' +
        L +
        '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' +
        M +
        '))|)' +
        L +
        '*\\]',
      O =
        ':(' +
        M +
        ')(?:\\(((\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|' +
        N +
        ')*)|.*)\\)|)',
      P = new RegExp(L + '+', 'g'),
      Q = new RegExp('^' + L + '+|((?:^|[^\\\\])(?:\\\\.)*)' + L + '+$', 'g'),
      R = new RegExp('^' + L + '*,' + L + '*'),
      S = new RegExp('^' + L + '*([>+~]|' + L + ')' + L + '*'),
      T = new RegExp('=' + L + '*([^\\]\'"]*?)' + L + '*\\]', 'g'),
      U = new RegExp(O),
      V = new RegExp('^' + M + '$'),
      W = {
        ID: new RegExp('^#(' + M + ')'),
        CLASS: new RegExp('^\\.(' + M + ')'),
        TAG: new RegExp('^(' + M + '|[*])'),
        ATTR: new RegExp('^' + N),
        PSEUDO: new RegExp('^' + O),
        CHILD: new RegExp(
          '^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' +
            L +
            '*(even|odd|(([+-]|)(\\d*)n|)' +
            L +
            '*(?:([+-]|)' +
            L +
            '*(\\d+)|))' +
            L +
            '*\\)|)',
          'i'
        ),
        bool: new RegExp('^(?:' + K + ')$', 'i'),
        needsContext: new RegExp(
          '^' +
            L +
            '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' +
            L +
            '*((?:-\\d)?\\d*)' +
            L +
            '*\\)|)(?=[^-]|$)',
          'i'
        ),
      },
      X = /^(?:input|select|textarea|button)$/i,
      Y = /^h\d$/i,
      Z = /^[^{]+\{\s*\[native \w/,
      $ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      _ = /[+~]/,
      aa = /'|\\/g,
      ba = new RegExp('\\\\([\\da-f]{1,6}' + L + '?|(' + L + ')|.)', 'ig'),
      ca = function (a, b, c) {
        var d = '0x' + b - 65536;
        return d !== d || c
          ? b
          : 0 > d
          ? String.fromCharCode(d + 65536)
          : String.fromCharCode((d >> 10) | 55296, (1023 & d) | 56320);
      },
      da = function () {
        m();
      };
    try {
      H.apply((E = I.call(v.childNodes)), v.childNodes),
        E[v.childNodes.length].nodeType;
    } catch (ea) {
      H = {
        apply: E.length
          ? function (a, b) {
              G.apply(a, I.call(b));
            }
          : function (a, b) {
              var c = a.length,
                d = 0;
              while ((a[c++] = b[d++]));
              a.length = c - 1;
            },
      };
    }
    function fa(a, b, d, e) {
      var f,
        h,
        j,
        k,
        l,
        o,
        r,
        s,
        w = b && b.ownerDocument,
        x = b ? b.nodeType : 9;
      if (
        ((d = d || []),
        'string' != typeof a || !a || (1 !== x && 9 !== x && 11 !== x))
      )
        return d;
      if (
        !e &&
        ((b ? b.ownerDocument || b : v) !== n && m(b), (b = b || n), p)
      ) {
        if (11 !== x && (o = $.exec(a)))
          if ((f = o[1])) {
            if (9 === x) {
              if (!(j = b.getElementById(f))) return d;
              if (j.id === f) return d.push(j), d;
            } else if (w && (j = w.getElementById(f)) && t(b, j) && j.id === f)
              return d.push(j), d;
          } else {
            if (o[2]) return H.apply(d, b.getElementsByTagName(a)), d;
            if (
              (f = o[3]) &&
              c.getElementsByClassName &&
              b.getElementsByClassName
            )
              return H.apply(d, b.getElementsByClassName(f)), d;
          }
        if (c.qsa && !A[a + ' '] && (!q || !q.test(a))) {
          if (1 !== x) (w = b), (s = a);
          else if ('object' !== b.nodeName.toLowerCase()) {
            (k = b.getAttribute('id'))
              ? (k = k.replace(aa, '\\$&'))
              : b.setAttribute('id', (k = u)),
              (r = g(a)),
              (h = r.length),
              (l = V.test(k) ? '#' + k : "[id='" + k + "']");
            while (h--) r[h] = l + ' ' + qa(r[h]);
            (s = r.join(',')), (w = (_.test(a) && oa(b.parentNode)) || b);
          }
          if (s)
            try {
              return H.apply(d, w.querySelectorAll(s)), d;
            } catch (y) {
            } finally {
              k === u && b.removeAttribute('id');
            }
        }
      }
      return i(a.replace(Q, '$1'), b, d, e);
    }
    function ga() {
      var a = [];
      function b(c, e) {
        return (
          a.push(c + ' ') > d.cacheLength && delete b[a.shift()],
          (b[c + ' '] = e)
        );
      }
      return b;
    }
    function ha(a) {
      return (a[u] = !0), a;
    }
    function ia(a) {
      var b = n.createElement('div');
      try {
        return !!a(b);
      } catch (c) {
        return !1;
      } finally {
        b.parentNode && b.parentNode.removeChild(b), (b = null);
      }
    }
    function ja(a, b) {
      var c = a.split('|'),
        e = c.length;
      while (e--) d.attrHandle[c[e]] = b;
    }
    function ka(a, b) {
      var c = b && a,
        d =
          c &&
          1 === a.nodeType &&
          1 === b.nodeType &&
          (~b.sourceIndex || C) - (~a.sourceIndex || C);
      if (d) return d;
      if (c) while ((c = c.nextSibling)) if (c === b) return -1;
      return a ? 1 : -1;
    }
    function la(a) {
      return function (b) {
        var c = b.nodeName.toLowerCase();
        return 'input' === c && b.type === a;
      };
    }
    function ma(a) {
      return function (b) {
        var c = b.nodeName.toLowerCase();
        return ('input' === c || 'button' === c) && b.type === a;
      };
    }
    function na(a) {
      return ha(function (b) {
        return (
          (b = +b),
          ha(function (c, d) {
            var e,
              f = a([], c.length, b),
              g = f.length;
            while (g--) c[(e = f[g])] && (c[e] = !(d[e] = c[e]));
          })
        );
      });
    }
    function oa(a) {
      return a && 'undefined' != typeof a.getElementsByTagName && a;
    }
    (c = fa.support = {}),
      (f = fa.isXML = function (a) {
        var b = a && (a.ownerDocument || a).documentElement;
        return b ? 'HTML' !== b.nodeName : !1;
      }),
      (m = fa.setDocument = function (a) {
        var b,
          e,
          g = a ? a.ownerDocument || a : v;
        return g !== n && 9 === g.nodeType && g.documentElement
          ? ((n = g),
            (o = n.documentElement),
            (p = !f(n)),
            (e = n.defaultView) &&
              e.top !== e &&
              (e.addEventListener
                ? e.addEventListener('unload', da, !1)
                : e.attachEvent && e.attachEvent('onunload', da)),
            (c.attributes = ia(function (a) {
              return (a.className = 'i'), !a.getAttribute('className');
            })),
            (c.getElementsByTagName = ia(function (a) {
              return (
                a.appendChild(n.createComment('')),
                !a.getElementsByTagName('*').length
              );
            })),
            (c.getElementsByClassName = Z.test(n.getElementsByClassName)),
            (c.getById = ia(function (a) {
              return (
                (o.appendChild(a).id = u),
                !n.getElementsByName || !n.getElementsByName(u).length
              );
            })),
            c.getById
              ? ((d.find.ID = function (a, b) {
                  if ('undefined' != typeof b.getElementById && p) {
                    var c = b.getElementById(a);
                    return c ? [c] : [];
                  }
                }),
                (d.filter.ID = function (a) {
                  var b = a.replace(ba, ca);
                  return function (a) {
                    return a.getAttribute('id') === b;
                  };
                }))
              : (delete d.find.ID,
                (d.filter.ID = function (a) {
                  var b = a.replace(ba, ca);
                  return function (a) {
                    var c =
                      'undefined' != typeof a.getAttributeNode &&
                      a.getAttributeNode('id');
                    return c && c.value === b;
                  };
                })),
            (d.find.TAG = c.getElementsByTagName
              ? function (a, b) {
                  return 'undefined' != typeof b.getElementsByTagName
                    ? b.getElementsByTagName(a)
                    : c.qsa
                    ? b.querySelectorAll(a)
                    : void 0;
                }
              : function (a, b) {
                  var c,
                    d = [],
                    e = 0,
                    f = b.getElementsByTagName(a);
                  if ('*' === a) {
                    while ((c = f[e++])) 1 === c.nodeType && d.push(c);
                    return d;
                  }
                  return f;
                }),
            (d.find.CLASS =
              c.getElementsByClassName &&
              function (a, b) {
                return 'undefined' != typeof b.getElementsByClassName && p
                  ? b.getElementsByClassName(a)
                  : void 0;
              }),
            (r = []),
            (q = []),
            (c.qsa = Z.test(n.querySelectorAll)) &&
              (ia(function (a) {
                (o.appendChild(a).innerHTML =
                  "<a id='" +
                  u +
                  "'></a><select id='" +
                  u +
                  "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                  a.querySelectorAll("[msallowcapture^='']").length &&
                    q.push('[*^$]=' + L + '*(?:\'\'|"")'),
                  a.querySelectorAll('[selected]').length ||
                    q.push('\\[' + L + '*(?:value|' + K + ')'),
                  a.querySelectorAll('[id~=' + u + '-]').length || q.push('~='),
                  a.querySelectorAll(':checked').length || q.push(':checked'),
                  a.querySelectorAll('a#' + u + '+*').length ||
                    q.push('.#.+[+~]');
              }),
              ia(function (a) {
                var b = n.createElement('input');
                b.setAttribute('type', 'hidden'),
                  a.appendChild(b).setAttribute('name', 'D'),
                  a.querySelectorAll('[name=d]').length &&
                    q.push('name' + L + '*[*^$|!~]?='),
                  a.querySelectorAll(':enabled').length ||
                    q.push(':enabled', ':disabled'),
                  a.querySelectorAll('*,:x'),
                  q.push(',.*:');
              })),
            (c.matchesSelector = Z.test(
              (s =
                o.matches ||
                o.webkitMatchesSelector ||
                o.mozMatchesSelector ||
                o.oMatchesSelector ||
                o.msMatchesSelector)
            )) &&
              ia(function (a) {
                (c.disconnectedMatch = s.call(a, 'div')),
                  s.call(a, "[s!='']:x"),
                  r.push('!=', O);
              }),
            (q = q.length && new RegExp(q.join('|'))),
            (r = r.length && new RegExp(r.join('|'))),
            (b = Z.test(o.compareDocumentPosition)),
            (t =
              b || Z.test(o.contains)
                ? function (a, b) {
                    var c = 9 === a.nodeType ? a.documentElement : a,
                      d = b && b.parentNode;
                    return (
                      a === d ||
                      !(
                        !d ||
                        1 !== d.nodeType ||
                        !(c.contains
                          ? c.contains(d)
                          : a.compareDocumentPosition &&
                            16 & a.compareDocumentPosition(d))
                      )
                    );
                  }
                : function (a, b) {
                    if (b) while ((b = b.parentNode)) if (b === a) return !0;
                    return !1;
                  }),
            (B = b
              ? function (a, b) {
                  if (a === b) return (l = !0), 0;
                  var d =
                    !a.compareDocumentPosition - !b.compareDocumentPosition;
                  return d
                    ? d
                    : ((d =
                        (a.ownerDocument || a) === (b.ownerDocument || b)
                          ? a.compareDocumentPosition(b)
                          : 1),
                      1 & d ||
                      (!c.sortDetached && b.compareDocumentPosition(a) === d)
                        ? a === n || (a.ownerDocument === v && t(v, a))
                          ? -1
                          : b === n || (b.ownerDocument === v && t(v, b))
                          ? 1
                          : k
                          ? J(k, a) - J(k, b)
                          : 0
                        : 4 & d
                        ? -1
                        : 1);
                }
              : function (a, b) {
                  if (a === b) return (l = !0), 0;
                  var c,
                    d = 0,
                    e = a.parentNode,
                    f = b.parentNode,
                    g = [a],
                    h = [b];
                  if (!e || !f)
                    return a === n
                      ? -1
                      : b === n
                      ? 1
                      : e
                      ? -1
                      : f
                      ? 1
                      : k
                      ? J(k, a) - J(k, b)
                      : 0;
                  if (e === f) return ka(a, b);
                  c = a;
                  while ((c = c.parentNode)) g.unshift(c);
                  c = b;
                  while ((c = c.parentNode)) h.unshift(c);
                  while (g[d] === h[d]) d++;
                  return d
                    ? ka(g[d], h[d])
                    : g[d] === v
                    ? -1
                    : h[d] === v
                    ? 1
                    : 0;
                }),
            n)
          : n;
      }),
      (fa.matches = function (a, b) {
        return fa(a, null, null, b);
      }),
      (fa.matchesSelector = function (a, b) {
        if (
          ((a.ownerDocument || a) !== n && m(a),
          (b = b.replace(T, "='$1']")),
          c.matchesSelector &&
            p &&
            !A[b + ' '] &&
            (!r || !r.test(b)) &&
            (!q || !q.test(b)))
        )
          try {
            var d = s.call(a, b);
            if (
              d ||
              c.disconnectedMatch ||
              (a.document && 11 !== a.document.nodeType)
            )
              return d;
          } catch (e) {}
        return fa(b, n, null, [a]).length > 0;
      }),
      (fa.contains = function (a, b) {
        return (a.ownerDocument || a) !== n && m(a), t(a, b);
      }),
      (fa.attr = function (a, b) {
        (a.ownerDocument || a) !== n && m(a);
        var e = d.attrHandle[b.toLowerCase()],
          f = e && D.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;
        return void 0 !== f
          ? f
          : c.attributes || !p
          ? a.getAttribute(b)
          : (f = a.getAttributeNode(b)) && f.specified
          ? f.value
          : null;
      }),
      (fa.error = function (a) {
        throw new Error('Syntax error, unrecognized expression: ' + a);
      }),
      (fa.uniqueSort = function (a) {
        var b,
          d = [],
          e = 0,
          f = 0;
        if (
          ((l = !c.detectDuplicates),
          (k = !c.sortStable && a.slice(0)),
          a.sort(B),
          l)
        ) {
          while ((b = a[f++])) b === a[f] && (e = d.push(f));
          while (e--) a.splice(d[e], 1);
        }
        return (k = null), a;
      }),
      (e = fa.getText = function (a) {
        var b,
          c = '',
          d = 0,
          f = a.nodeType;
        if (f) {
          if (1 === f || 9 === f || 11 === f) {
            if ('string' == typeof a.textContent) return a.textContent;
            for (a = a.firstChild; a; a = a.nextSibling) c += e(a);
          } else if (3 === f || 4 === f) return a.nodeValue;
        } else while ((b = a[d++])) c += e(b);
        return c;
      }),
      (d = fa.selectors = {
        cacheLength: 50,
        createPseudo: ha,
        match: W,
        attrHandle: {},
        find: {},
        relative: {
          '>': { dir: 'parentNode', first: !0 },
          ' ': { dir: 'parentNode' },
          '+': { dir: 'previousSibling', first: !0 },
          '~': { dir: 'previousSibling' },
        },
        preFilter: {
          ATTR: function (a) {
            return (
              (a[1] = a[1].replace(ba, ca)),
              (a[3] = (a[3] || a[4] || a[5] || '').replace(ba, ca)),
              '~=' === a[2] && (a[3] = ' ' + a[3] + ' '),
              a.slice(0, 4)
            );
          },
          CHILD: function (a) {
            return (
              (a[1] = a[1].toLowerCase()),
              'nth' === a[1].slice(0, 3)
                ? (a[3] || fa.error(a[0]),
                  (a[4] = +(a[4]
                    ? a[5] + (a[6] || 1)
                    : 2 * ('even' === a[3] || 'odd' === a[3]))),
                  (a[5] = +(a[7] + a[8] || 'odd' === a[3])))
                : a[3] && fa.error(a[0]),
              a
            );
          },
          PSEUDO: function (a) {
            var b,
              c = !a[6] && a[2];
            return W.CHILD.test(a[0])
              ? null
              : (a[3]
                  ? (a[2] = a[4] || a[5] || '')
                  : c &&
                    U.test(c) &&
                    (b = g(c, !0)) &&
                    (b = c.indexOf(')', c.length - b) - c.length) &&
                    ((a[0] = a[0].slice(0, b)), (a[2] = c.slice(0, b))),
                a.slice(0, 3));
          },
        },
        filter: {
          TAG: function (a) {
            var b = a.replace(ba, ca).toLowerCase();
            return '*' === a
              ? function () {
                  return !0;
                }
              : function (a) {
                  return a.nodeName && a.nodeName.toLowerCase() === b;
                };
          },
          CLASS: function (a) {
            var b = y[a + ' '];
            return (
              b ||
              ((b = new RegExp('(^|' + L + ')' + a + '(' + L + '|$)')) &&
                y(a, function (a) {
                  return b.test(
                    ('string' == typeof a.className && a.className) ||
                      ('undefined' != typeof a.getAttribute &&
                        a.getAttribute('class')) ||
                      ''
                  );
                }))
            );
          },
          ATTR: function (a, b, c) {
            return function (d) {
              var e = fa.attr(d, a);
              return null == e
                ? '!=' === b
                : b
                ? ((e += ''),
                  '=' === b
                    ? e === c
                    : '!=' === b
                    ? e !== c
                    : '^=' === b
                    ? c && 0 === e.indexOf(c)
                    : '*=' === b
                    ? c && e.indexOf(c) > -1
                    : '$=' === b
                    ? c && e.slice(-c.length) === c
                    : '~=' === b
                    ? (' ' + e.replace(P, ' ') + ' ').indexOf(c) > -1
                    : '|=' === b
                    ? e === c || e.slice(0, c.length + 1) === c + '-'
                    : !1)
                : !0;
            };
          },
          CHILD: function (a, b, c, d, e) {
            var f = 'nth' !== a.slice(0, 3),
              g = 'last' !== a.slice(-4),
              h = 'of-type' === b;
            return 1 === d && 0 === e
              ? function (a) {
                  return !!a.parentNode;
                }
              : function (b, c, i) {
                  var j,
                    k,
                    l,
                    m,
                    n,
                    o,
                    p = f !== g ? 'nextSibling' : 'previousSibling',
                    q = b.parentNode,
                    r = h && b.nodeName.toLowerCase(),
                    s = !i && !h,
                    t = !1;
                  if (q) {
                    if (f) {
                      while (p) {
                        m = b;
                        while ((m = m[p]))
                          if (
                            h
                              ? m.nodeName.toLowerCase() === r
                              : 1 === m.nodeType
                          )
                            return !1;
                        o = p = 'only' === a && !o && 'nextSibling';
                      }
                      return !0;
                    }
                    if (((o = [g ? q.firstChild : q.lastChild]), g && s)) {
                      (m = q),
                        (l = m[u] || (m[u] = {})),
                        (k = l[m.uniqueID] || (l[m.uniqueID] = {})),
                        (j = k[a] || []),
                        (n = j[0] === w && j[1]),
                        (t = n && j[2]),
                        (m = n && q.childNodes[n]);
                      while ((m = (++n && m && m[p]) || (t = n = 0) || o.pop()))
                        if (1 === m.nodeType && ++t && m === b) {
                          k[a] = [w, n, t];
                          break;
                        }
                    } else if (
                      (s &&
                        ((m = b),
                        (l = m[u] || (m[u] = {})),
                        (k = l[m.uniqueID] || (l[m.uniqueID] = {})),
                        (j = k[a] || []),
                        (n = j[0] === w && j[1]),
                        (t = n)),
                      t === !1)
                    )
                      while ((m = (++n && m && m[p]) || (t = n = 0) || o.pop()))
                        if (
                          (h
                            ? m.nodeName.toLowerCase() === r
                            : 1 === m.nodeType) &&
                          ++t &&
                          (s &&
                            ((l = m[u] || (m[u] = {})),
                            (k = l[m.uniqueID] || (l[m.uniqueID] = {})),
                            (k[a] = [w, t])),
                          m === b)
                        )
                          break;
                    return (t -= e), t === d || (t % d === 0 && t / d >= 0);
                  }
                };
          },
          PSEUDO: function (a, b) {
            var c,
              e =
                d.pseudos[a] ||
                d.setFilters[a.toLowerCase()] ||
                fa.error('unsupported pseudo: ' + a);
            return e[u]
              ? e(b)
              : e.length > 1
              ? ((c = [a, a, '', b]),
                d.setFilters.hasOwnProperty(a.toLowerCase())
                  ? ha(function (a, c) {
                      var d,
                        f = e(a, b),
                        g = f.length;
                      while (g--) (d = J(a, f[g])), (a[d] = !(c[d] = f[g]));
                    })
                  : function (a) {
                      return e(a, 0, c);
                    })
              : e;
          },
        },
        pseudos: {
          not: ha(function (a) {
            var b = [],
              c = [],
              d = h(a.replace(Q, '$1'));
            return d[u]
              ? ha(function (a, b, c, e) {
                  var f,
                    g = d(a, null, e, []),
                    h = a.length;
                  while (h--) (f = g[h]) && (a[h] = !(b[h] = f));
                })
              : function (a, e, f) {
                  return (b[0] = a), d(b, null, f, c), (b[0] = null), !c.pop();
                };
          }),
          has: ha(function (a) {
            return function (b) {
              return fa(a, b).length > 0;
            };
          }),
          contains: ha(function (a) {
            return (
              (a = a.replace(ba, ca)),
              function (b) {
                return (b.textContent || b.innerText || e(b)).indexOf(a) > -1;
              }
            );
          }),
          lang: ha(function (a) {
            return (
              V.test(a || '') || fa.error('unsupported lang: ' + a),
              (a = a.replace(ba, ca).toLowerCase()),
              function (b) {
                var c;
                do
                  if (
                    (c = p
                      ? b.lang
                      : b.getAttribute('xml:lang') || b.getAttribute('lang'))
                  )
                    return (
                      (c = c.toLowerCase()), c === a || 0 === c.indexOf(a + '-')
                    );
                while ((b = b.parentNode) && 1 === b.nodeType);
                return !1;
              }
            );
          }),
          target: function (b) {
            var c = a.location && a.location.hash;
            return c && c.slice(1) === b.id;
          },
          root: function (a) {
            return a === o;
          },
          focus: function (a) {
            return (
              a === n.activeElement &&
              (!n.hasFocus || n.hasFocus()) &&
              !!(a.type || a.href || ~a.tabIndex)
            );
          },
          enabled: function (a) {
            return a.disabled === !1;
          },
          disabled: function (a) {
            return a.disabled === !0;
          },
          checked: function (a) {
            var b = a.nodeName.toLowerCase();
            return (
              ('input' === b && !!a.checked) || ('option' === b && !!a.selected)
            );
          },
          selected: function (a) {
            return (
              a.parentNode && a.parentNode.selectedIndex, a.selected === !0
            );
          },
          empty: function (a) {
            for (a = a.firstChild; a; a = a.nextSibling)
              if (a.nodeType < 6) return !1;
            return !0;
          },
          parent: function (a) {
            return !d.pseudos.empty(a);
          },
          header: function (a) {
            return Y.test(a.nodeName);
          },
          input: function (a) {
            return X.test(a.nodeName);
          },
          button: function (a) {
            var b = a.nodeName.toLowerCase();
            return ('input' === b && 'button' === a.type) || 'button' === b;
          },
          text: function (a) {
            var b;
            return (
              'input' === a.nodeName.toLowerCase() &&
              'text' === a.type &&
              (null == (b = a.getAttribute('type')) ||
                'text' === b.toLowerCase())
            );
          },
          first: na(function () {
            return [0];
          }),
          last: na(function (a, b) {
            return [b - 1];
          }),
          eq: na(function (a, b, c) {
            return [0 > c ? c + b : c];
          }),
          even: na(function (a, b) {
            for (var c = 0; b > c; c += 2) a.push(c);
            return a;
          }),
          odd: na(function (a, b) {
            for (var c = 1; b > c; c += 2) a.push(c);
            return a;
          }),
          lt: na(function (a, b, c) {
            for (var d = 0 > c ? c + b : c; --d >= 0; ) a.push(d);
            return a;
          }),
          gt: na(function (a, b, c) {
            for (var d = 0 > c ? c + b : c; ++d < b; ) a.push(d);
            return a;
          }),
        },
      }),
      (d.pseudos.nth = d.pseudos.eq);
    for (b in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 })
      d.pseudos[b] = la(b);
    for (b in { submit: !0, reset: !0 }) d.pseudos[b] = ma(b);
    function pa() {}
    (pa.prototype = d.filters = d.pseudos),
      (d.setFilters = new pa()),
      (g = fa.tokenize = function (a, b) {
        var c,
          e,
          f,
          g,
          h,
          i,
          j,
          k = z[a + ' '];
        if (k) return b ? 0 : k.slice(0);
        (h = a), (i = []), (j = d.preFilter);
        while (h) {
          (c && !(e = R.exec(h))) ||
            (e && (h = h.slice(e[0].length) || h), i.push((f = []))),
            (c = !1),
            (e = S.exec(h)) &&
              ((c = e.shift()),
              f.push({ value: c, type: e[0].replace(Q, ' ') }),
              (h = h.slice(c.length)));
          for (g in d.filter)
            !(e = W[g].exec(h)) ||
              (j[g] && !(e = j[g](e))) ||
              ((c = e.shift()),
              f.push({ value: c, type: g, matches: e }),
              (h = h.slice(c.length)));
          if (!c) break;
        }
        return b ? h.length : h ? fa.error(a) : z(a, i).slice(0);
      });
    function qa(a) {
      for (var b = 0, c = a.length, d = ''; c > b; b++) d += a[b].value;
      return d;
    }
    function ra(a, b, c) {
      var d = b.dir,
        e = c && 'parentNode' === d,
        f = x++;
      return b.first
        ? function (b, c, f) {
            while ((b = b[d])) if (1 === b.nodeType || e) return a(b, c, f);
          }
        : function (b, c, g) {
            var h,
              i,
              j,
              k = [w, f];
            if (g) {
              while ((b = b[d]))
                if ((1 === b.nodeType || e) && a(b, c, g)) return !0;
            } else
              while ((b = b[d]))
                if (1 === b.nodeType || e) {
                  if (
                    ((j = b[u] || (b[u] = {})),
                    (i = j[b.uniqueID] || (j[b.uniqueID] = {})),
                    (h = i[d]) && h[0] === w && h[1] === f)
                  )
                    return (k[2] = h[2]);
                  if (((i[d] = k), (k[2] = a(b, c, g)))) return !0;
                }
          };
    }
    function sa(a) {
      return a.length > 1
        ? function (b, c, d) {
            var e = a.length;
            while (e--) if (!a[e](b, c, d)) return !1;
            return !0;
          }
        : a[0];
    }
    function ta(a, b, c) {
      for (var d = 0, e = b.length; e > d; d++) fa(a, b[d], c);
      return c;
    }
    function ua(a, b, c, d, e) {
      for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)
        (f = a[h]) && ((c && !c(f, d, e)) || (g.push(f), j && b.push(h)));
      return g;
    }
    function va(a, b, c, d, e, f) {
      return (
        d && !d[u] && (d = va(d)),
        e && !e[u] && (e = va(e, f)),
        ha(function (f, g, h, i) {
          var j,
            k,
            l,
            m = [],
            n = [],
            o = g.length,
            p = f || ta(b || '*', h.nodeType ? [h] : h, []),
            q = !a || (!f && b) ? p : ua(p, m, a, h, i),
            r = c ? (e || (f ? a : o || d) ? [] : g) : q;
          if ((c && c(q, r, h, i), d)) {
            (j = ua(r, n)), d(j, [], h, i), (k = j.length);
            while (k--) (l = j[k]) && (r[n[k]] = !(q[n[k]] = l));
          }
          if (f) {
            if (e || a) {
              if (e) {
                (j = []), (k = r.length);
                while (k--) (l = r[k]) && j.push((q[k] = l));
                e(null, (r = []), j, i);
              }
              k = r.length;
              while (k--)
                (l = r[k]) &&
                  (j = e ? J(f, l) : m[k]) > -1 &&
                  (f[j] = !(g[j] = l));
            }
          } else (r = ua(r === g ? r.splice(o, r.length) : r)), e ? e(null, g, r, i) : H.apply(g, r);
        })
      );
    }
    function wa(a) {
      for (
        var b,
          c,
          e,
          f = a.length,
          g = d.relative[a[0].type],
          h = g || d.relative[' '],
          i = g ? 1 : 0,
          k = ra(
            function (a) {
              return a === b;
            },
            h,
            !0
          ),
          l = ra(
            function (a) {
              return J(b, a) > -1;
            },
            h,
            !0
          ),
          m = [
            function (a, c, d) {
              var e =
                (!g && (d || c !== j)) ||
                ((b = c).nodeType ? k(a, c, d) : l(a, c, d));
              return (b = null), e;
            },
          ];
        f > i;
        i++
      )
        if ((c = d.relative[a[i].type])) m = [ra(sa(m), c)];
        else {
          if (((c = d.filter[a[i].type].apply(null, a[i].matches)), c[u])) {
            for (e = ++i; f > e; e++) if (d.relative[a[e].type]) break;
            return va(
              i > 1 && sa(m),
              i > 1 &&
                qa(
                  a
                    .slice(0, i - 1)
                    .concat({ value: ' ' === a[i - 2].type ? '*' : '' })
                ).replace(Q, '$1'),
              c,
              e > i && wa(a.slice(i, e)),
              f > e && wa((a = a.slice(e))),
              f > e && qa(a)
            );
          }
          m.push(c);
        }
      return sa(m);
    }
    function xa(a, b) {
      var c = b.length > 0,
        e = a.length > 0,
        f = function (f, g, h, i, k) {
          var l,
            o,
            q,
            r = 0,
            s = '0',
            t = f && [],
            u = [],
            v = j,
            x = f || (e && d.find.TAG('*', k)),
            y = (w += null == v ? 1 : Math.random() || 0.1),
            z = x.length;
          for (
            k && (j = g === n || g || k);
            s !== z && null != (l = x[s]);
            s++
          ) {
            if (e && l) {
              (o = 0), g || l.ownerDocument === n || (m(l), (h = !p));
              while ((q = a[o++]))
                if (q(l, g || n, h)) {
                  i.push(l);
                  break;
                }
              k && (w = y);
            }
            c && ((l = !q && l) && r--, f && t.push(l));
          }
          if (((r += s), c && s !== r)) {
            o = 0;
            while ((q = b[o++])) q(t, u, g, h);
            if (f) {
              if (r > 0) while (s--) t[s] || u[s] || (u[s] = F.call(i));
              u = ua(u);
            }
            H.apply(i, u),
              k && !f && u.length > 0 && r + b.length > 1 && fa.uniqueSort(i);
          }
          return k && ((w = y), (j = v)), t;
        };
      return c ? ha(f) : f;
    }
    return (
      (h = fa.compile = function (a, b) {
        var c,
          d = [],
          e = [],
          f = A[a + ' '];
        if (!f) {
          b || (b = g(a)), (c = b.length);
          while (c--) (f = wa(b[c])), f[u] ? d.push(f) : e.push(f);
          (f = A(a, xa(e, d))), (f.selector = a);
        }
        return f;
      }),
      (i = fa.select = function (a, b, e, f) {
        var i,
          j,
          k,
          l,
          m,
          n = 'function' == typeof a && a,
          o = !f && g((a = n.selector || a));
        if (((e = e || []), 1 === o.length)) {
          if (
            ((j = o[0] = o[0].slice(0)),
            j.length > 2 &&
              'ID' === (k = j[0]).type &&
              c.getById &&
              9 === b.nodeType &&
              p &&
              d.relative[j[1].type])
          ) {
            if (
              ((b = (d.find.ID(k.matches[0].replace(ba, ca), b) || [])[0]), !b)
            )
              return e;
            n && (b = b.parentNode), (a = a.slice(j.shift().value.length));
          }
          i = W.needsContext.test(a) ? 0 : j.length;
          while (i--) {
            if (((k = j[i]), d.relative[(l = k.type)])) break;
            if (
              (m = d.find[l]) &&
              (f = m(
                k.matches[0].replace(ba, ca),
                (_.test(j[0].type) && oa(b.parentNode)) || b
              ))
            ) {
              if ((j.splice(i, 1), (a = f.length && qa(j)), !a))
                return H.apply(e, f), e;
              break;
            }
          }
        }
        return (
          (n || h(a, o))(
            f,
            b,
            !p,
            e,
            !b || (_.test(a) && oa(b.parentNode)) || b
          ),
          e
        );
      }),
      (c.sortStable = u.split('').sort(B).join('') === u),
      (c.detectDuplicates = !!l),
      m(),
      (c.sortDetached = ia(function (a) {
        return 1 & a.compareDocumentPosition(n.createElement('div'));
      })),
      ia(function (a) {
        return (
          (a.innerHTML = "<a href='#'></a>"),
          '#' === a.firstChild.getAttribute('href')
        );
      }) ||
        ja('type|href|height|width', function (a, b, c) {
          return c
            ? void 0
            : a.getAttribute(b, 'type' === b.toLowerCase() ? 1 : 2);
        }),
      (c.attributes &&
        ia(function (a) {
          return (
            (a.innerHTML = '<input/>'),
            a.firstChild.setAttribute('value', ''),
            '' === a.firstChild.getAttribute('value')
          );
        })) ||
        ja('value', function (a, b, c) {
          return c || 'input' !== a.nodeName.toLowerCase()
            ? void 0
            : a.defaultValue;
        }),
      ia(function (a) {
        return null == a.getAttribute('disabled');
      }) ||
        ja(K, function (a, b, c) {
          var d;
          return c
            ? void 0
            : a[b] === !0
            ? b.toLowerCase()
            : (d = a.getAttributeNode(b)) && d.specified
            ? d.value
            : null;
        }),
      fa
    );
  })(a);
  (n.find = t),
    (n.expr = t.selectors),
    (n.expr[':'] = n.expr.pseudos),
    (n.uniqueSort = n.unique = t.uniqueSort),
    (n.text = t.getText),
    (n.isXMLDoc = t.isXML),
    (n.contains = t.contains);
  var u = function (a, b, c) {
      var d = [],
        e = void 0 !== c;
      while ((a = a[b]) && 9 !== a.nodeType)
        if (1 === a.nodeType) {
          if (e && n(a).is(c)) break;
          d.push(a);
        }
      return d;
    },
    v = function (a, b) {
      for (var c = []; a; a = a.nextSibling)
        1 === a.nodeType && a !== b && c.push(a);
      return c;
    },
    w = n.expr.match.needsContext,
    x = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
    y = /^.[^:#\[\.,]*$/;
  function z(a, b, c) {
    if (n.isFunction(b))
      return n.grep(a, function (a, d) {
        return !!b.call(a, d, a) !== c;
      });
    if (b.nodeType)
      return n.grep(a, function (a) {
        return (a === b) !== c;
      });
    if ('string' == typeof b) {
      if (y.test(b)) return n.filter(b, a, c);
      b = n.filter(b, a);
    }
    return n.grep(a, function (a) {
      return n.inArray(a, b) > -1 !== c;
    });
  }
  (n.filter = function (a, b, c) {
    var d = b[0];
    return (
      c && (a = ':not(' + a + ')'),
      1 === b.length && 1 === d.nodeType
        ? n.find.matchesSelector(d, a)
          ? [d]
          : []
        : n.find.matches(
            a,
            n.grep(b, function (a) {
              return 1 === a.nodeType;
            })
          )
    );
  }),
    n.fn.extend({
      find: function (a) {
        var b,
          c = [],
          d = this,
          e = d.length;
        if ('string' != typeof a)
          return this.pushStack(
            n(a).filter(function () {
              for (b = 0; e > b; b++) if (n.contains(d[b], this)) return !0;
            })
          );
        for (b = 0; e > b; b++) n.find(a, d[b], c);
        return (
          (c = this.pushStack(e > 1 ? n.unique(c) : c)),
          (c.selector = this.selector ? this.selector + ' ' + a : a),
          c
        );
      },
      filter: function (a) {
        return this.pushStack(z(this, a || [], !1));
      },
      not: function (a) {
        return this.pushStack(z(this, a || [], !0));
      },
      is: function (a) {
        return !!z(this, 'string' == typeof a && w.test(a) ? n(a) : a || [], !1)
          .length;
      },
    });
  var A,
    B = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    C = (n.fn.init = function (a, b, c) {
      var e, f;
      if (!a) return this;
      if (((c = c || A), 'string' == typeof a)) {
        if (
          ((e =
            '<' === a.charAt(0) &&
            '>' === a.charAt(a.length - 1) &&
            a.length >= 3
              ? [null, a, null]
              : B.exec(a)),
          !e || (!e[1] && b))
        )
          return !b || b.jquery
            ? (b || c).find(a)
            : this.constructor(b).find(a);
        if (e[1]) {
          if (
            ((b = b instanceof n ? b[0] : b),
            n.merge(
              this,
              n.parseHTML(e[1], b && b.nodeType ? b.ownerDocument || b : d, !0)
            ),
            x.test(e[1]) && n.isPlainObject(b))
          )
            for (e in b)
              n.isFunction(this[e]) ? this[e](b[e]) : this.attr(e, b[e]);
          return this;
        }
        if (((f = d.getElementById(e[2])), f && f.parentNode)) {
          if (f.id !== e[2]) return A.find(a);
          (this.length = 1), (this[0] = f);
        }
        return (this.context = d), (this.selector = a), this;
      }
      return a.nodeType
        ? ((this.context = this[0] = a), (this.length = 1), this)
        : n.isFunction(a)
        ? 'undefined' != typeof c.ready
          ? c.ready(a)
          : a(n)
        : (void 0 !== a.selector &&
            ((this.selector = a.selector), (this.context = a.context)),
          n.makeArray(a, this));
    });
  (C.prototype = n.fn), (A = n(d));
  var D = /^(?:parents|prev(?:Until|All))/,
    E = { children: !0, contents: !0, next: !0, prev: !0 };
  n.fn.extend({
    has: function (a) {
      var b,
        c = n(a, this),
        d = c.length;
      return this.filter(function () {
        for (b = 0; d > b; b++) if (n.contains(this, c[b])) return !0;
      });
    },
    closest: function (a, b) {
      for (
        var c,
          d = 0,
          e = this.length,
          f = [],
          g = w.test(a) || 'string' != typeof a ? n(a, b || this.context) : 0;
        e > d;
        d++
      )
        for (c = this[d]; c && c !== b; c = c.parentNode)
          if (
            c.nodeType < 11 &&
            (g
              ? g.index(c) > -1
              : 1 === c.nodeType && n.find.matchesSelector(c, a))
          ) {
            f.push(c);
            break;
          }
      return this.pushStack(f.length > 1 ? n.uniqueSort(f) : f);
    },
    index: function (a) {
      return a
        ? 'string' == typeof a
          ? n.inArray(this[0], n(a))
          : n.inArray(a.jquery ? a[0] : a, this)
        : this[0] && this[0].parentNode
        ? this.first().prevAll().length
        : -1;
    },
    add: function (a, b) {
      return this.pushStack(n.uniqueSort(n.merge(this.get(), n(a, b))));
    },
    addBack: function (a) {
      return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
    },
  });
  function F(a, b) {
    do a = a[b];
    while (a && 1 !== a.nodeType);
    return a;
  }
  n.each(
    {
      parent: function (a) {
        var b = a.parentNode;
        return b && 11 !== b.nodeType ? b : null;
      },
      parents: function (a) {
        return u(a, 'parentNode');
      },
      parentsUntil: function (a, b, c) {
        return u(a, 'parentNode', c);
      },
      next: function (a) {
        return F(a, 'nextSibling');
      },
      prev: function (a) {
        return F(a, 'previousSibling');
      },
      nextAll: function (a) {
        return u(a, 'nextSibling');
      },
      prevAll: function (a) {
        return u(a, 'previousSibling');
      },
      nextUntil: function (a, b, c) {
        return u(a, 'nextSibling', c);
      },
      prevUntil: function (a, b, c) {
        return u(a, 'previousSibling', c);
      },
      siblings: function (a) {
        return v((a.parentNode || {}).firstChild, a);
      },
      children: function (a) {
        return v(a.firstChild);
      },
      contents: function (a) {
        return n.nodeName(a, 'iframe')
          ? a.contentDocument || a.contentWindow.document
          : n.merge([], a.childNodes);
      },
    },
    function (a, b) {
      n.fn[a] = function (c, d) {
        var e = n.map(this, b, c);
        return (
          'Until' !== a.slice(-5) && (d = c),
          d && 'string' == typeof d && (e = n.filter(d, e)),
          this.length > 1 &&
            (E[a] || (e = n.uniqueSort(e)), D.test(a) && (e = e.reverse())),
          this.pushStack(e)
        );
      };
    }
  );
  var G = /\S+/g;
  function H(a) {
    var b = {};
    return (
      n.each(a.match(G) || [], function (a, c) {
        b[c] = !0;
      }),
      b
    );
  }
  (n.Callbacks = function (a) {
    a = 'string' == typeof a ? H(a) : n.extend({}, a);
    var b,
      c,
      d,
      e,
      f = [],
      g = [],
      h = -1,
      i = function () {
        for (e = a.once, d = b = !0; g.length; h = -1) {
          c = g.shift();
          while (++h < f.length)
            f[h].apply(c[0], c[1]) === !1 &&
              a.stopOnFalse &&
              ((h = f.length), (c = !1));
        }
        a.memory || (c = !1), (b = !1), e && (f = c ? [] : '');
      },
      j = {
        add: function () {
          return (
            f &&
              (c && !b && ((h = f.length - 1), g.push(c)),
              (function d(b) {
                n.each(b, function (b, c) {
                  n.isFunction(c)
                    ? (a.unique && j.has(c)) || f.push(c)
                    : c && c.length && 'string' !== n.type(c) && d(c);
                });
              })(arguments),
              c && !b && i()),
            this
          );
        },
        remove: function () {
          return (
            n.each(arguments, function (a, b) {
              var c;
              while ((c = n.inArray(b, f, c)) > -1)
                f.splice(c, 1), h >= c && h--;
            }),
            this
          );
        },
        has: function (a) {
          return a ? n.inArray(a, f) > -1 : f.length > 0;
        },
        empty: function () {
          return f && (f = []), this;
        },
        disable: function () {
          return (e = g = []), (f = c = ''), this;
        },
        disabled: function () {
          return !f;
        },
        lock: function () {
          return (e = !0), c || j.disable(), this;
        },
        locked: function () {
          return !!e;
        },
        fireWith: function (a, c) {
          return (
            e ||
              ((c = c || []),
              (c = [a, c.slice ? c.slice() : c]),
              g.push(c),
              b || i()),
            this
          );
        },
        fire: function () {
          return j.fireWith(this, arguments), this;
        },
        fired: function () {
          return !!d;
        },
      };
    return j;
  }),
    n.extend({
      Deferred: function (a) {
        var b = [
            ['resolve', 'done', n.Callbacks('once memory'), 'resolved'],
            ['reject', 'fail', n.Callbacks('once memory'), 'rejected'],
            ['notify', 'progress', n.Callbacks('memory')],
          ],
          c = 'pending',
          d = {
            state: function () {
              return c;
            },
            always: function () {
              return e.done(arguments).fail(arguments), this;
            },
            then: function () {
              var a = arguments;
              return n
                .Deferred(function (c) {
                  n.each(b, function (b, f) {
                    var g = n.isFunction(a[b]) && a[b];
                    e[f[1]](function () {
                      var a = g && g.apply(this, arguments);
                      a && n.isFunction(a.promise)
                        ? a
                            .promise()
                            .progress(c.notify)
                            .done(c.resolve)
                            .fail(c.reject)
                        : c[f[0] + 'With'](
                            this === d ? c.promise() : this,
                            g ? [a] : arguments
                          );
                    });
                  }),
                    (a = null);
                })
                .promise();
            },
            promise: function (a) {
              return null != a ? n.extend(a, d) : d;
            },
          },
          e = {};
        return (
          (d.pipe = d.then),
          n.each(b, function (a, f) {
            var g = f[2],
              h = f[3];
            (d[f[1]] = g.add),
              h &&
                g.add(
                  function () {
                    c = h;
                  },
                  b[1 ^ a][2].disable,
                  b[2][2].lock
                ),
              (e[f[0]] = function () {
                return e[f[0] + 'With'](this === e ? d : this, arguments), this;
              }),
              (e[f[0] + 'With'] = g.fireWith);
          }),
          d.promise(e),
          a && a.call(e, e),
          e
        );
      },
      when: function (a) {
        var b = 0,
          c = e.call(arguments),
          d = c.length,
          f = 1 !== d || (a && n.isFunction(a.promise)) ? d : 0,
          g = 1 === f ? a : n.Deferred(),
          h = function (a, b, c) {
            return function (d) {
              (b[a] = this),
                (c[a] = arguments.length > 1 ? e.call(arguments) : d),
                c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c);
            };
          },
          i,
          j,
          k;
        if (d > 1)
          for (i = new Array(d), j = new Array(d), k = new Array(d); d > b; b++)
            c[b] && n.isFunction(c[b].promise)
              ? c[b]
                  .promise()
                  .progress(h(b, j, i))
                  .done(h(b, k, c))
                  .fail(g.reject)
              : --f;
        return f || g.resolveWith(k, c), g.promise();
      },
    });
  var I;
  (n.fn.ready = function (a) {
    return n.ready.promise().done(a), this;
  }),
    n.extend({
      isReady: !1,
      readyWait: 1,
      holdReady: function (a) {
        a ? n.readyWait++ : n.ready(!0);
      },
      ready: function (a) {
        (a === !0 ? --n.readyWait : n.isReady) ||
          ((n.isReady = !0),
          (a !== !0 && --n.readyWait > 0) ||
            (I.resolveWith(d, [n]),
            n.fn.triggerHandler &&
              (n(d).triggerHandler('ready'), n(d).off('ready'))));
      },
    });
  function J() {
    d.addEventListener
      ? (d.removeEventListener('DOMContentLoaded', K),
        a.removeEventListener('load', K))
      : (d.detachEvent('onreadystatechange', K), a.detachEvent('onload', K));
  }
  function K() {
    (d.addEventListener ||
      'load' === a.event.type ||
      'complete' === d.readyState) &&
      (J(), n.ready());
  }
  (n.ready.promise = function (b) {
    if (!I)
      if (
        ((I = n.Deferred()),
        'complete' === d.readyState ||
          ('loading' !== d.readyState && !d.documentElement.doScroll))
      )
        a.setTimeout(n.ready);
      else if (d.addEventListener)
        d.addEventListener('DOMContentLoaded', K),
          a.addEventListener('load', K);
      else {
        d.attachEvent('onreadystatechange', K), a.attachEvent('onload', K);
        var c = !1;
        try {
          c = null == a.frameElement && d.documentElement;
        } catch (e) {}
        c &&
          c.doScroll &&
          !(function f() {
            if (!n.isReady) {
              try {
                c.doScroll('left');
              } catch (b) {
                return a.setTimeout(f, 50);
              }
              J(), n.ready();
            }
          })();
      }
    return I.promise(b);
  }),
    n.ready.promise();
  var L;
  for (L in n(l)) break;
  (l.ownFirst = '0' === L),
    (l.inlineBlockNeedsLayout = !1),
    n(function () {
      var a, b, c, e;
      (c = d.getElementsByTagName('body')[0]),
        c &&
          c.style &&
          ((b = d.createElement('div')),
          (e = d.createElement('div')),
          (e.style.cssText =
            'position:absolute;border:0;width:0;height:0;top:0;left:-9999px'),
          c.appendChild(e).appendChild(b),
          'undefined' != typeof b.style.zoom &&
            ((b.style.cssText =
              'display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1'),
            (l.inlineBlockNeedsLayout = a = 3 === b.offsetWidth),
            a && (c.style.zoom = 1)),
          c.removeChild(e));
    }),
    (function () {
      var a = d.createElement('div');
      l.deleteExpando = !0;
      try {
        delete a.test;
      } catch (b) {
        l.deleteExpando = !1;
      }
      a = null;
    })();
  var M = function (a) {
      var b = n.noData[(a.nodeName + ' ').toLowerCase()],
        c = +a.nodeType || 1;
      return 1 !== c && 9 !== c
        ? !1
        : !b || (b !== !0 && a.getAttribute('classid') === b);
    },
    N = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    O = /([A-Z])/g;
  function P(a, b, c) {
    if (void 0 === c && 1 === a.nodeType) {
      var d = 'data-' + b.replace(O, '-$1').toLowerCase();
      if (((c = a.getAttribute(d)), 'string' == typeof c)) {
        try {
          c =
            'true' === c
              ? !0
              : 'false' === c
              ? !1
              : 'null' === c
              ? null
              : +c + '' === c
              ? +c
              : N.test(c)
              ? n.parseJSON(c)
              : c;
        } catch (e) {}
        n.data(a, b, c);
      } else c = void 0;
    }
    return c;
  }
  function Q(a) {
    var b;
    for (b in a)
      if (('data' !== b || !n.isEmptyObject(a[b])) && 'toJSON' !== b) return !1;
    return !0;
  }
  function R(a, b, d, e) {
    if (M(a)) {
      var f,
        g,
        h = n.expando,
        i = a.nodeType,
        j = i ? n.cache : a,
        k = i ? a[h] : a[h] && h;
      if (
        (k && j[k] && (e || j[k].data)) ||
        void 0 !== d ||
        'string' != typeof b
      )
        return (
          k || (k = i ? (a[h] = c.pop() || n.guid++) : h),
          j[k] || (j[k] = i ? {} : { toJSON: n.noop }),
          ('object' != typeof b && 'function' != typeof b) ||
            (e
              ? (j[k] = n.extend(j[k], b))
              : (j[k].data = n.extend(j[k].data, b))),
          (g = j[k]),
          e || (g.data || (g.data = {}), (g = g.data)),
          void 0 !== d && (g[n.camelCase(b)] = d),
          'string' == typeof b
            ? ((f = g[b]), null == f && (f = g[n.camelCase(b)]))
            : (f = g),
          f
        );
    }
  }
  function S(a, b, c) {
    if (M(a)) {
      var d,
        e,
        f = a.nodeType,
        g = f ? n.cache : a,
        h = f ? a[n.expando] : n.expando;
      if (g[h]) {
        if (b && (d = c ? g[h] : g[h].data)) {
          n.isArray(b)
            ? (b = b.concat(n.map(b, n.camelCase)))
            : b in d
            ? (b = [b])
            : ((b = n.camelCase(b)), (b = b in d ? [b] : b.split(' '))),
            (e = b.length);
          while (e--) delete d[b[e]];
          if (c ? !Q(d) : !n.isEmptyObject(d)) return;
        }
        (c || (delete g[h].data, Q(g[h]))) &&
          (f
            ? n.cleanData([a], !0)
            : l.deleteExpando || g != g.window
            ? delete g[h]
            : (g[h] = void 0));
      }
    }
  }
  n.extend({
    cache: {},
    noData: {
      'applet ': !0,
      'embed ': !0,
      'object ': 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000',
    },
    hasData: function (a) {
      return (
        (a = a.nodeType ? n.cache[a[n.expando]] : a[n.expando]), !!a && !Q(a)
      );
    },
    data: function (a, b, c) {
      return R(a, b, c);
    },
    removeData: function (a, b) {
      return S(a, b);
    },
    _data: function (a, b, c) {
      return R(a, b, c, !0);
    },
    _removeData: function (a, b) {
      return S(a, b, !0);
    },
  }),
    n.fn.extend({
      data: function (a, b) {
        var c,
          d,
          e,
          f = this[0],
          g = f && f.attributes;
        if (void 0 === a) {
          if (
            this.length &&
            ((e = n.data(f)), 1 === f.nodeType && !n._data(f, 'parsedAttrs'))
          ) {
            c = g.length;
            while (c--)
              g[c] &&
                ((d = g[c].name),
                0 === d.indexOf('data-') &&
                  ((d = n.camelCase(d.slice(5))), P(f, d, e[d])));
            n._data(f, 'parsedAttrs', !0);
          }
          return e;
        }
        return 'object' == typeof a
          ? this.each(function () {
              n.data(this, a);
            })
          : arguments.length > 1
          ? this.each(function () {
              n.data(this, a, b);
            })
          : f
          ? P(f, a, n.data(f, a))
          : void 0;
      },
      removeData: function (a) {
        return this.each(function () {
          n.removeData(this, a);
        });
      },
    }),
    n.extend({
      queue: function (a, b, c) {
        var d;
        return a
          ? ((b = (b || 'fx') + 'queue'),
            (d = n._data(a, b)),
            c &&
              (!d || n.isArray(c)
                ? (d = n._data(a, b, n.makeArray(c)))
                : d.push(c)),
            d || [])
          : void 0;
      },
      dequeue: function (a, b) {
        b = b || 'fx';
        var c = n.queue(a, b),
          d = c.length,
          e = c.shift(),
          f = n._queueHooks(a, b),
          g = function () {
            n.dequeue(a, b);
          };
        'inprogress' === e && ((e = c.shift()), d--),
          e &&
            ('fx' === b && c.unshift('inprogress'),
            delete f.stop,
            e.call(a, g, f)),
          !d && f && f.empty.fire();
      },
      _queueHooks: function (a, b) {
        var c = b + 'queueHooks';
        return (
          n._data(a, c) ||
          n._data(a, c, {
            empty: n.Callbacks('once memory').add(function () {
              n._removeData(a, b + 'queue'), n._removeData(a, c);
            }),
          })
        );
      },
    }),
    n.fn.extend({
      queue: function (a, b) {
        var c = 2;
        return (
          'string' != typeof a && ((b = a), (a = 'fx'), c--),
          arguments.length < c
            ? n.queue(this[0], a)
            : void 0 === b
            ? this
            : this.each(function () {
                var c = n.queue(this, a, b);
                n._queueHooks(this, a),
                  'fx' === a && 'inprogress' !== c[0] && n.dequeue(this, a);
              })
        );
      },
      dequeue: function (a) {
        return this.each(function () {
          n.dequeue(this, a);
        });
      },
      clearQueue: function (a) {
        return this.queue(a || 'fx', []);
      },
      promise: function (a, b) {
        var c,
          d = 1,
          e = n.Deferred(),
          f = this,
          g = this.length,
          h = function () {
            --d || e.resolveWith(f, [f]);
          };
        'string' != typeof a && ((b = a), (a = void 0)), (a = a || 'fx');
        while (g--)
          (c = n._data(f[g], a + 'queueHooks')),
            c && c.empty && (d++, c.empty.add(h));
        return h(), e.promise(b);
      },
    }),
    (function () {
      var a;
      l.shrinkWrapBlocks = function () {
        if (null != a) return a;
        a = !1;
        var b, c, e;
        return (
          (c = d.getElementsByTagName('body')[0]),
          c && c.style
            ? ((b = d.createElement('div')),
              (e = d.createElement('div')),
              (e.style.cssText =
                'position:absolute;border:0;width:0;height:0;top:0;left:-9999px'),
              c.appendChild(e).appendChild(b),
              'undefined' != typeof b.style.zoom &&
                ((b.style.cssText =
                  '-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1'),
                (b.appendChild(d.createElement('div')).style.width = '5px'),
                (a = 3 !== b.offsetWidth)),
              c.removeChild(e),
              a)
            : void 0
        );
      };
    })();
  var T = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    U = new RegExp('^(?:([+-])=|)(' + T + ')([a-z%]*)$', 'i'),
    V = ['Top', 'Right', 'Bottom', 'Left'],
    W = function (a, b) {
      return (
        (a = b || a),
        'none' === n.css(a, 'display') || !n.contains(a.ownerDocument, a)
      );
    };
  function X(a, b, c, d) {
    var e,
      f = 1,
      g = 20,
      h = d
        ? function () {
            return d.cur();
          }
        : function () {
            return n.css(a, b, '');
          },
      i = h(),
      j = (c && c[3]) || (n.cssNumber[b] ? '' : 'px'),
      k = (n.cssNumber[b] || ('px' !== j && +i)) && U.exec(n.css(a, b));
    if (k && k[3] !== j) {
      (j = j || k[3]), (c = c || []), (k = +i || 1);
      do (f = f || '.5'), (k /= f), n.style(a, b, k + j);
      while (f !== (f = h() / i) && 1 !== f && --g);
    }
    return (
      c &&
        ((k = +k || +i || 0),
        (e = c[1] ? k + (c[1] + 1) * c[2] : +c[2]),
        d && ((d.unit = j), (d.start = k), (d.end = e))),
      e
    );
  }
  var Y = function (a, b, c, d, e, f, g) {
      var h = 0,
        i = a.length,
        j = null == c;
      if ('object' === n.type(c)) {
        e = !0;
        for (h in c) Y(a, b, h, c[h], !0, f, g);
      } else if (
        void 0 !== d &&
        ((e = !0),
        n.isFunction(d) || (g = !0),
        j &&
          (g
            ? (b.call(a, d), (b = null))
            : ((j = b),
              (b = function (a, b, c) {
                return j.call(n(a), c);
              }))),
        b)
      )
        for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
      return e ? a : j ? b.call(a) : i ? b(a[0], c) : f;
    },
    Z = /^(?:checkbox|radio)$/i,
    $ = /<([\w:-]+)/,
    _ = /^$|\/(?:java|ecma)script/i,
    aa = /^\s+/,
    ba =
      'abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video';
  function ca(a) {
    var b = ba.split('|'),
      c = a.createDocumentFragment();
    if (c.createElement) while (b.length) c.createElement(b.pop());
    return c;
  }
  !(function () {
    var a = d.createElement('div'),
      b = d.createDocumentFragment(),
      c = d.createElement('input');
    (a.innerHTML =
      "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
      (l.leadingWhitespace = 3 === a.firstChild.nodeType),
      (l.tbody = !a.getElementsByTagName('tbody').length),
      (l.htmlSerialize = !!a.getElementsByTagName('link').length),
      (l.html5Clone =
        '<:nav></:nav>' !== d.createElement('nav').cloneNode(!0).outerHTML),
      (c.type = 'checkbox'),
      (c.checked = !0),
      b.appendChild(c),
      (l.appendChecked = c.checked),
      (a.innerHTML = '<textarea>x</textarea>'),
      (l.noCloneChecked = !!a.cloneNode(!0).lastChild.defaultValue),
      b.appendChild(a),
      (c = d.createElement('input')),
      c.setAttribute('type', 'radio'),
      c.setAttribute('checked', 'checked'),
      c.setAttribute('name', 't'),
      a.appendChild(c),
      (l.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked),
      (l.noCloneEvent = !!a.addEventListener),
      (a[n.expando] = 1),
      (l.attributes = !a.getAttribute(n.expando));
  })();
  var da = {
    option: [1, "<select multiple='multiple'>", '</select>'],
    legend: [1, '<fieldset>', '</fieldset>'],
    area: [1, '<map>', '</map>'],
    param: [1, '<object>', '</object>'],
    thead: [1, '<table>', '</table>'],
    tr: [2, '<table><tbody>', '</tbody></table>'],
    col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
    td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
    _default: l.htmlSerialize ? [0, '', ''] : [1, 'X<div>', '</div>'],
  };
  (da.optgroup = da.option),
    (da.tbody = da.tfoot = da.colgroup = da.caption = da.thead),
    (da.th = da.td);
  function ea(a, b) {
    var c,
      d,
      e = 0,
      f =
        'undefined' != typeof a.getElementsByTagName
          ? a.getElementsByTagName(b || '*')
          : 'undefined' != typeof a.querySelectorAll
          ? a.querySelectorAll(b || '*')
          : void 0;
    if (!f)
      for (f = [], c = a.childNodes || a; null != (d = c[e]); e++)
        !b || n.nodeName(d, b) ? f.push(d) : n.merge(f, ea(d, b));
    return void 0 === b || (b && n.nodeName(a, b)) ? n.merge([a], f) : f;
  }
  function fa(a, b) {
    for (var c, d = 0; null != (c = a[d]); d++)
      n._data(c, 'globalEval', !b || n._data(b[d], 'globalEval'));
  }
  var ga = /<|&#?\w+;/,
    ha = /<tbody/i;
  function ia(a) {
    Z.test(a.type) && (a.defaultChecked = a.checked);
  }
  function ja(a, b, c, d, e) {
    for (
      var f, g, h, i, j, k, m, o = a.length, p = ca(b), q = [], r = 0;
      o > r;
      r++
    )
      if (((g = a[r]), g || 0 === g))
        if ('object' === n.type(g)) n.merge(q, g.nodeType ? [g] : g);
        else if (ga.test(g)) {
          (i = i || p.appendChild(b.createElement('div'))),
            (j = ($.exec(g) || ['', ''])[1].toLowerCase()),
            (m = da[j] || da._default),
            (i.innerHTML = m[1] + n.htmlPrefilter(g) + m[2]),
            (f = m[0]);
          while (f--) i = i.lastChild;
          if (
            (!l.leadingWhitespace &&
              aa.test(g) &&
              q.push(b.createTextNode(aa.exec(g)[0])),
            !l.tbody)
          ) {
            (g =
              'table' !== j || ha.test(g)
                ? '<table>' !== m[1] || ha.test(g)
                  ? 0
                  : i
                : i.firstChild),
              (f = g && g.childNodes.length);
            while (f--)
              n.nodeName((k = g.childNodes[f]), 'tbody') &&
                !k.childNodes.length &&
                g.removeChild(k);
          }
          n.merge(q, i.childNodes), (i.textContent = '');
          while (i.firstChild) i.removeChild(i.firstChild);
          i = p.lastChild;
        } else q.push(b.createTextNode(g));
    i && p.removeChild(i),
      l.appendChecked || n.grep(ea(q, 'input'), ia),
      (r = 0);
    while ((g = q[r++]))
      if (d && n.inArray(g, d) > -1) e && e.push(g);
      else if (
        ((h = n.contains(g.ownerDocument, g)),
        (i = ea(p.appendChild(g), 'script')),
        h && fa(i),
        c)
      ) {
        f = 0;
        while ((g = i[f++])) _.test(g.type || '') && c.push(g);
      }
    return (i = null), p;
  }
  !(function () {
    var b,
      c,
      e = d.createElement('div');
    for (b in { submit: !0, change: !0, focusin: !0 })
      (c = 'on' + b),
        (l[b] = c in a) ||
          (e.setAttribute(c, 't'), (l[b] = e.attributes[c].expando === !1));
    e = null;
  })();
  var ka = /^(?:input|select|textarea)$/i,
    la = /^key/,
    ma = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
    na = /^(?:focusinfocus|focusoutblur)$/,
    oa = /^([^.]*)(?:\.(.+)|)/;
  function pa() {
    return !0;
  }
  function qa() {
    return !1;
  }
  function ra() {
    try {
      return d.activeElement;
    } catch (a) {}
  }
  function sa(a, b, c, d, e, f) {
    var g, h;
    if ('object' == typeof b) {
      'string' != typeof c && ((d = d || c), (c = void 0));
      for (h in b) sa(a, h, c, d, b[h], f);
      return a;
    }
    if (
      (null == d && null == e
        ? ((e = c), (d = c = void 0))
        : null == e &&
          ('string' == typeof c
            ? ((e = d), (d = void 0))
            : ((e = d), (d = c), (c = void 0))),
      e === !1)
    )
      e = qa;
    else if (!e) return a;
    return (
      1 === f &&
        ((g = e),
        (e = function (a) {
          return n().off(a), g.apply(this, arguments);
        }),
        (e.guid = g.guid || (g.guid = n.guid++))),
      a.each(function () {
        n.event.add(this, b, e, d, c);
      })
    );
  }
  (n.event = {
    global: {},
    add: function (a, b, c, d, e) {
      var f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        o,
        p,
        q,
        r = n._data(a);
      if (r) {
        c.handler && ((i = c), (c = i.handler), (e = i.selector)),
          c.guid || (c.guid = n.guid++),
          (g = r.events) || (g = r.events = {}),
          (k = r.handle) ||
            ((k = r.handle = function (a) {
              return 'undefined' == typeof n ||
                (a && n.event.triggered === a.type)
                ? void 0
                : n.event.dispatch.apply(k.elem, arguments);
            }),
            (k.elem = a)),
          (b = (b || '').match(G) || ['']),
          (h = b.length);
        while (h--)
          (f = oa.exec(b[h]) || []),
            (o = q = f[1]),
            (p = (f[2] || '').split('.').sort()),
            o &&
              ((j = n.event.special[o] || {}),
              (o = (e ? j.delegateType : j.bindType) || o),
              (j = n.event.special[o] || {}),
              (l = n.extend(
                {
                  type: o,
                  origType: q,
                  data: d,
                  handler: c,
                  guid: c.guid,
                  selector: e,
                  needsContext: e && n.expr.match.needsContext.test(e),
                  namespace: p.join('.'),
                },
                i
              )),
              (m = g[o]) ||
                ((m = g[o] = []),
                (m.delegateCount = 0),
                (j.setup && j.setup.call(a, d, p, k) !== !1) ||
                  (a.addEventListener
                    ? a.addEventListener(o, k, !1)
                    : a.attachEvent && a.attachEvent('on' + o, k))),
              j.add &&
                (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)),
              e ? m.splice(m.delegateCount++, 0, l) : m.push(l),
              (n.event.global[o] = !0));
        a = null;
      }
    },
    remove: function (a, b, c, d, e) {
      var f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        o,
        p,
        q,
        r = n.hasData(a) && n._data(a);
      if (r && (k = r.events)) {
        (b = (b || '').match(G) || ['']), (j = b.length);
        while (j--)
          if (
            ((h = oa.exec(b[j]) || []),
            (o = q = h[1]),
            (p = (h[2] || '').split('.').sort()),
            o)
          ) {
            (l = n.event.special[o] || {}),
              (o = (d ? l.delegateType : l.bindType) || o),
              (m = k[o] || []),
              (h =
                h[2] &&
                new RegExp('(^|\\.)' + p.join('\\.(?:.*\\.|)') + '(\\.|$)')),
              (i = f = m.length);
            while (f--)
              (g = m[f]),
                (!e && q !== g.origType) ||
                  (c && c.guid !== g.guid) ||
                  (h && !h.test(g.namespace)) ||
                  (d && d !== g.selector && ('**' !== d || !g.selector)) ||
                  (m.splice(f, 1),
                  g.selector && m.delegateCount--,
                  l.remove && l.remove.call(a, g));
            i &&
              !m.length &&
              ((l.teardown && l.teardown.call(a, p, r.handle) !== !1) ||
                n.removeEvent(a, o, r.handle),
              delete k[o]);
          } else for (o in k) n.event.remove(a, o + b[j], c, d, !0);
        n.isEmptyObject(k) && (delete r.handle, n._removeData(a, 'events'));
      }
    },
    trigger: function (b, c, e, f) {
      var g,
        h,
        i,
        j,
        l,
        m,
        o,
        p = [e || d],
        q = k.call(b, 'type') ? b.type : b,
        r = k.call(b, 'namespace') ? b.namespace.split('.') : [];
      if (
        ((i = m = e = e || d),
        3 !== e.nodeType &&
          8 !== e.nodeType &&
          !na.test(q + n.event.triggered) &&
          (q.indexOf('.') > -1 &&
            ((r = q.split('.')), (q = r.shift()), r.sort()),
          (h = q.indexOf(':') < 0 && 'on' + q),
          (b = b[n.expando] ? b : new n.Event(q, 'object' == typeof b && b)),
          (b.isTrigger = f ? 2 : 3),
          (b.namespace = r.join('.')),
          (b.rnamespace = b.namespace
            ? new RegExp('(^|\\.)' + r.join('\\.(?:.*\\.|)') + '(\\.|$)')
            : null),
          (b.result = void 0),
          b.target || (b.target = e),
          (c = null == c ? [b] : n.makeArray(c, [b])),
          (l = n.event.special[q] || {}),
          f || !l.trigger || l.trigger.apply(e, c) !== !1))
      ) {
        if (!f && !l.noBubble && !n.isWindow(e)) {
          for (
            j = l.delegateType || q, na.test(j + q) || (i = i.parentNode);
            i;
            i = i.parentNode
          )
            p.push(i), (m = i);
          m === (e.ownerDocument || d) &&
            p.push(m.defaultView || m.parentWindow || a);
        }
        o = 0;
        while ((i = p[o++]) && !b.isPropagationStopped())
          (b.type = o > 1 ? j : l.bindType || q),
            (g = (n._data(i, 'events') || {})[b.type] && n._data(i, 'handle')),
            g && g.apply(i, c),
            (g = h && i[h]),
            g &&
              g.apply &&
              M(i) &&
              ((b.result = g.apply(i, c)),
              b.result === !1 && b.preventDefault());
        if (
          ((b.type = q),
          !f &&
            !b.isDefaultPrevented() &&
            (!l._default || l._default.apply(p.pop(), c) === !1) &&
            M(e) &&
            h &&
            e[q] &&
            !n.isWindow(e))
        ) {
          (m = e[h]), m && (e[h] = null), (n.event.triggered = q);
          try {
            e[q]();
          } catch (s) {}
          (n.event.triggered = void 0), m && (e[h] = m);
        }
        return b.result;
      }
    },
    dispatch: function (a) {
      a = n.event.fix(a);
      var b,
        c,
        d,
        f,
        g,
        h = [],
        i = e.call(arguments),
        j = (n._data(this, 'events') || {})[a.type] || [],
        k = n.event.special[a.type] || {};
      if (
        ((i[0] = a),
        (a.delegateTarget = this),
        !k.preDispatch || k.preDispatch.call(this, a) !== !1)
      ) {
        (h = n.event.handlers.call(this, a, j)), (b = 0);
        while ((f = h[b++]) && !a.isPropagationStopped()) {
          (a.currentTarget = f.elem), (c = 0);
          while ((g = f.handlers[c++]) && !a.isImmediatePropagationStopped())
            (a.rnamespace && !a.rnamespace.test(g.namespace)) ||
              ((a.handleObj = g),
              (a.data = g.data),
              (d = (
                (n.event.special[g.origType] || {}).handle || g.handler
              ).apply(f.elem, i)),
              void 0 !== d &&
                (a.result = d) === !1 &&
                (a.preventDefault(), a.stopPropagation()));
        }
        return k.postDispatch && k.postDispatch.call(this, a), a.result;
      }
    },
    handlers: function (a, b) {
      var c,
        d,
        e,
        f,
        g = [],
        h = b.delegateCount,
        i = a.target;
      if (
        h &&
        i.nodeType &&
        ('click' !== a.type || isNaN(a.button) || a.button < 1)
      )
        for (; i != this; i = i.parentNode || this)
          if (1 === i.nodeType && (i.disabled !== !0 || 'click' !== a.type)) {
            for (d = [], c = 0; h > c; c++)
              (f = b[c]),
                (e = f.selector + ' '),
                void 0 === d[e] &&
                  (d[e] = f.needsContext
                    ? n(e, this).index(i) > -1
                    : n.find(e, this, null, [i]).length),
                d[e] && d.push(f);
            d.length && g.push({ elem: i, handlers: d });
          }
      return h < b.length && g.push({ elem: this, handlers: b.slice(h) }), g;
    },
    fix: function (a) {
      if (a[n.expando]) return a;
      var b,
        c,
        e,
        f = a.type,
        g = a,
        h = this.fixHooks[f];
      h ||
        (this.fixHooks[f] = h = ma.test(f)
          ? this.mouseHooks
          : la.test(f)
          ? this.keyHooks
          : {}),
        (e = h.props ? this.props.concat(h.props) : this.props),
        (a = new n.Event(g)),
        (b = e.length);
      while (b--) (c = e[b]), (a[c] = g[c]);
      return (
        a.target || (a.target = g.srcElement || d),
        3 === a.target.nodeType && (a.target = a.target.parentNode),
        (a.metaKey = !!a.metaKey),
        h.filter ? h.filter(a, g) : a
      );
    },
    props: 'altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which'.split(
      ' '
    ),
    fixHooks: {},
    keyHooks: {
      props: 'char charCode key keyCode'.split(' '),
      filter: function (a, b) {
        return (
          null == a.which &&
            (a.which = null != b.charCode ? b.charCode : b.keyCode),
          a
        );
      },
    },
    mouseHooks: {
      props: 'button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement'.split(
        ' '
      ),
      filter: function (a, b) {
        var c,
          e,
          f,
          g = b.button,
          h = b.fromElement;
        return (
          null == a.pageX &&
            null != b.clientX &&
            ((e = a.target.ownerDocument || d),
            (f = e.documentElement),
            (c = e.body),
            (a.pageX =
              b.clientX +
              ((f && f.scrollLeft) || (c && c.scrollLeft) || 0) -
              ((f && f.clientLeft) || (c && c.clientLeft) || 0)),
            (a.pageY =
              b.clientY +
              ((f && f.scrollTop) || (c && c.scrollTop) || 0) -
              ((f && f.clientTop) || (c && c.clientTop) || 0))),
          !a.relatedTarget &&
            h &&
            (a.relatedTarget = h === a.target ? b.toElement : h),
          a.which ||
            void 0 === g ||
            (a.which = 1 & g ? 1 : 2 & g ? 3 : 4 & g ? 2 : 0),
          a
        );
      },
    },
    special: {
      load: { noBubble: !0 },
      focus: {
        trigger: function () {
          if (this !== ra() && this.focus)
            try {
              return this.focus(), !1;
            } catch (a) {}
        },
        delegateType: 'focusin',
      },
      blur: {
        trigger: function () {
          return this === ra() && this.blur ? (this.blur(), !1) : void 0;
        },
        delegateType: 'focusout',
      },
      click: {
        trigger: function () {
          return n.nodeName(this, 'input') &&
            'checkbox' === this.type &&
            this.click
            ? (this.click(), !1)
            : void 0;
        },
        _default: function (a) {
          return n.nodeName(a.target, 'a');
        },
      },
      beforeunload: {
        postDispatch: function (a) {
          void 0 !== a.result &&
            a.originalEvent &&
            (a.originalEvent.returnValue = a.result);
        },
      },
    },
    simulate: function (a, b, c) {
      var d = n.extend(new n.Event(), c, { type: a, isSimulated: !0 });
      n.event.trigger(d, null, b), d.isDefaultPrevented() && c.preventDefault();
    },
  }),
    (n.removeEvent = d.removeEventListener
      ? function (a, b, c) {
          a.removeEventListener && a.removeEventListener(b, c);
        }
      : function (a, b, c) {
          var d = 'on' + b;
          a.detachEvent &&
            ('undefined' == typeof a[d] && (a[d] = null), a.detachEvent(d, c));
        }),
    (n.Event = function (a, b) {
      return this instanceof n.Event
        ? (a && a.type
            ? ((this.originalEvent = a),
              (this.type = a.type),
              (this.isDefaultPrevented =
                a.defaultPrevented ||
                (void 0 === a.defaultPrevented && a.returnValue === !1)
                  ? pa
                  : qa))
            : (this.type = a),
          b && n.extend(this, b),
          (this.timeStamp = (a && a.timeStamp) || n.now()),
          void (this[n.expando] = !0))
        : new n.Event(a, b);
    }),
    (n.Event.prototype = {
      constructor: n.Event,
      isDefaultPrevented: qa,
      isPropagationStopped: qa,
      isImmediatePropagationStopped: qa,
      preventDefault: function () {
        var a = this.originalEvent;
        (this.isDefaultPrevented = pa),
          a && (a.preventDefault ? a.preventDefault() : (a.returnValue = !1));
      },
      stopPropagation: function () {
        var a = this.originalEvent;
        (this.isPropagationStopped = pa),
          a &&
            !this.isSimulated &&
            (a.stopPropagation && a.stopPropagation(), (a.cancelBubble = !0));
      },
      stopImmediatePropagation: function () {
        var a = this.originalEvent;
        (this.isImmediatePropagationStopped = pa),
          a && a.stopImmediatePropagation && a.stopImmediatePropagation(),
          this.stopPropagation();
      },
    }),
    n.each(
      {
        mouseenter: 'mouseover',
        mouseleave: 'mouseout',
        pointerenter: 'pointerover',
        pointerleave: 'pointerout',
      },
      function (a, b) {
        n.event.special[a] = {
          delegateType: b,
          bindType: b,
          handle: function (a) {
            var c,
              d = this,
              e = a.relatedTarget,
              f = a.handleObj;
            return (
              (e && (e === d || n.contains(d, e))) ||
                ((a.type = f.origType),
                (c = f.handler.apply(this, arguments)),
                (a.type = b)),
              c
            );
          },
        };
      }
    ),
    l.submit ||
      (n.event.special.submit = {
        setup: function () {
          return n.nodeName(this, 'form')
            ? !1
            : void n.event.add(
                this,
                'click._submit keypress._submit',
                function (a) {
                  var b = a.target,
                    c =
                      n.nodeName(b, 'input') || n.nodeName(b, 'button')
                        ? n.prop(b, 'form')
                        : void 0;
                  c &&
                    !n._data(c, 'submit') &&
                    (n.event.add(c, 'submit._submit', function (a) {
                      a._submitBubble = !0;
                    }),
                    n._data(c, 'submit', !0));
                }
              );
        },
        postDispatch: function (a) {
          a._submitBubble &&
            (delete a._submitBubble,
            this.parentNode &&
              !a.isTrigger &&
              n.event.simulate('submit', this.parentNode, a));
        },
        teardown: function () {
          return n.nodeName(this, 'form')
            ? !1
            : void n.event.remove(this, '._submit');
        },
      }),
    l.change ||
      (n.event.special.change = {
        setup: function () {
          return ka.test(this.nodeName)
            ? (('checkbox' !== this.type && 'radio' !== this.type) ||
                (n.event.add(this, 'propertychange._change', function (a) {
                  'checked' === a.originalEvent.propertyName &&
                    (this._justChanged = !0);
                }),
                n.event.add(this, 'click._change', function (a) {
                  this._justChanged && !a.isTrigger && (this._justChanged = !1),
                    n.event.simulate('change', this, a);
                })),
              !1)
            : void n.event.add(this, 'beforeactivate._change', function (a) {
                var b = a.target;
                ka.test(b.nodeName) &&
                  !n._data(b, 'change') &&
                  (n.event.add(b, 'change._change', function (a) {
                    !this.parentNode ||
                      a.isSimulated ||
                      a.isTrigger ||
                      n.event.simulate('change', this.parentNode, a);
                  }),
                  n._data(b, 'change', !0));
              });
        },
        handle: function (a) {
          var b = a.target;
          return this !== b ||
            a.isSimulated ||
            a.isTrigger ||
            ('radio' !== b.type && 'checkbox' !== b.type)
            ? a.handleObj.handler.apply(this, arguments)
            : void 0;
        },
        teardown: function () {
          return n.event.remove(this, '._change'), !ka.test(this.nodeName);
        },
      }),
    l.focusin ||
      n.each({ focus: 'focusin', blur: 'focusout' }, function (a, b) {
        var c = function (a) {
          n.event.simulate(b, a.target, n.event.fix(a));
        };
        n.event.special[b] = {
          setup: function () {
            var d = this.ownerDocument || this,
              e = n._data(d, b);
            e || d.addEventListener(a, c, !0), n._data(d, b, (e || 0) + 1);
          },
          teardown: function () {
            var d = this.ownerDocument || this,
              e = n._data(d, b) - 1;
            e
              ? n._data(d, b, e)
              : (d.removeEventListener(a, c, !0), n._removeData(d, b));
          },
        };
      }),
    n.fn.extend({
      on: function (a, b, c, d) {
        return sa(this, a, b, c, d);
      },
      one: function (a, b, c, d) {
        return sa(this, a, b, c, d, 1);
      },
      off: function (a, b, c) {
        var d, e;
        if (a && a.preventDefault && a.handleObj)
          return (
            (d = a.handleObj),
            n(a.delegateTarget).off(
              d.namespace ? d.origType + '.' + d.namespace : d.origType,
              d.selector,
              d.handler
            ),
            this
          );
        if ('object' == typeof a) {
          for (e in a) this.off(e, b, a[e]);
          return this;
        }
        return (
          (b !== !1 && 'function' != typeof b) || ((c = b), (b = void 0)),
          c === !1 && (c = qa),
          this.each(function () {
            n.event.remove(this, a, c, b);
          })
        );
      },
      trigger: function (a, b) {
        return this.each(function () {
          n.event.trigger(a, b, this);
        });
      },
      triggerHandler: function (a, b) {
        var c = this[0];
        return c ? n.event.trigger(a, b, c, !0) : void 0;
      },
    });
  var ta = / jQuery\d+="(?:null|\d+)"/g,
    ua = new RegExp('<(?:' + ba + ')[\\s/>]', 'i'),
    va = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
    wa = /<script|<style|<link/i,
    xa = /checked\s*(?:[^=]|=\s*.checked.)/i,
    ya = /^true\/(.*)/,
    za = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    Aa = ca(d),
    Ba = Aa.appendChild(d.createElement('div'));
  function Ca(a, b) {
    return n.nodeName(a, 'table') &&
      n.nodeName(11 !== b.nodeType ? b : b.firstChild, 'tr')
      ? a.getElementsByTagName('tbody')[0] ||
          a.appendChild(a.ownerDocument.createElement('tbody'))
      : a;
  }
  function Da(a) {
    return (a.type = (null !== n.find.attr(a, 'type')) + '/' + a.type), a;
  }
  function Ea(a) {
    var b = ya.exec(a.type);
    return b ? (a.type = b[1]) : a.removeAttribute('type'), a;
  }
  function Fa(a, b) {
    if (1 === b.nodeType && n.hasData(a)) {
      var c,
        d,
        e,
        f = n._data(a),
        g = n._data(b, f),
        h = f.events;
      if (h) {
        delete g.handle, (g.events = {});
        for (c in h)
          for (d = 0, e = h[c].length; e > d; d++) n.event.add(b, c, h[c][d]);
      }
      g.data && (g.data = n.extend({}, g.data));
    }
  }
  function Ga(a, b) {
    var c, d, e;
    if (1 === b.nodeType) {
      if (((c = b.nodeName.toLowerCase()), !l.noCloneEvent && b[n.expando])) {
        e = n._data(b);
        for (d in e.events) n.removeEvent(b, d, e.handle);
        b.removeAttribute(n.expando);
      }
      'script' === c && b.text !== a.text
        ? ((Da(b).text = a.text), Ea(b))
        : 'object' === c
        ? (b.parentNode && (b.outerHTML = a.outerHTML),
          l.html5Clone &&
            a.innerHTML &&
            !n.trim(b.innerHTML) &&
            (b.innerHTML = a.innerHTML))
        : 'input' === c && Z.test(a.type)
        ? ((b.defaultChecked = b.checked = a.checked),
          b.value !== a.value && (b.value = a.value))
        : 'option' === c
        ? (b.defaultSelected = b.selected = a.defaultSelected)
        : ('input' !== c && 'textarea' !== c) ||
          (b.defaultValue = a.defaultValue);
    }
  }
  function Ha(a, b, c, d) {
    b = f.apply([], b);
    var e,
      g,
      h,
      i,
      j,
      k,
      m = 0,
      o = a.length,
      p = o - 1,
      q = b[0],
      r = n.isFunction(q);
    if (r || (o > 1 && 'string' == typeof q && !l.checkClone && xa.test(q)))
      return a.each(function (e) {
        var f = a.eq(e);
        r && (b[0] = q.call(this, e, f.html())), Ha(f, b, c, d);
      });
    if (
      o &&
      ((k = ja(b, a[0].ownerDocument, !1, a, d)),
      (e = k.firstChild),
      1 === k.childNodes.length && (k = e),
      e || d)
    ) {
      for (i = n.map(ea(k, 'script'), Da), h = i.length; o > m; m++)
        (g = k),
          m !== p &&
            ((g = n.clone(g, !0, !0)), h && n.merge(i, ea(g, 'script'))),
          c.call(a[m], g, m);
      if (h)
        for (j = i[i.length - 1].ownerDocument, n.map(i, Ea), m = 0; h > m; m++)
          (g = i[m]),
            _.test(g.type || '') &&
              !n._data(g, 'globalEval') &&
              n.contains(j, g) &&
              (g.src
                ? n._evalUrl && n._evalUrl(g.src)
                : n.globalEval(
                    (g.text || g.textContent || g.innerHTML || '').replace(
                      za,
                      ''
                    )
                  ));
      k = e = null;
    }
    return a;
  }
  function Ia(a, b, c) {
    for (var d, e = b ? n.filter(b, a) : a, f = 0; null != (d = e[f]); f++)
      c || 1 !== d.nodeType || n.cleanData(ea(d)),
        d.parentNode &&
          (c && n.contains(d.ownerDocument, d) && fa(ea(d, 'script')),
          d.parentNode.removeChild(d));
    return a;
  }
  n.extend({
    htmlPrefilter: function (a) {
      return a.replace(va, '<$1></$2>');
    },
    clone: function (a, b, c) {
      var d,
        e,
        f,
        g,
        h,
        i = n.contains(a.ownerDocument, a);
      if (
        (l.html5Clone || n.isXMLDoc(a) || !ua.test('<' + a.nodeName + '>')
          ? (f = a.cloneNode(!0))
          : ((Ba.innerHTML = a.outerHTML), Ba.removeChild((f = Ba.firstChild))),
        !(
          (l.noCloneEvent && l.noCloneChecked) ||
          (1 !== a.nodeType && 11 !== a.nodeType) ||
          n.isXMLDoc(a)
        ))
      )
        for (d = ea(f), h = ea(a), g = 0; null != (e = h[g]); ++g)
          d[g] && Ga(e, d[g]);
      if (b)
        if (c)
          for (h = h || ea(a), d = d || ea(f), g = 0; null != (e = h[g]); g++)
            Fa(e, d[g]);
        else Fa(a, f);
      return (
        (d = ea(f, 'script')),
        d.length > 0 && fa(d, !i && ea(a, 'script')),
        (d = h = e = null),
        f
      );
    },
    cleanData: function (a, b) {
      for (
        var d,
          e,
          f,
          g,
          h = 0,
          i = n.expando,
          j = n.cache,
          k = l.attributes,
          m = n.event.special;
        null != (d = a[h]);
        h++
      )
        if ((b || M(d)) && ((f = d[i]), (g = f && j[f]))) {
          if (g.events)
            for (e in g.events)
              m[e] ? n.event.remove(d, e) : n.removeEvent(d, e, g.handle);
          j[f] &&
            (delete j[f],
            k || 'undefined' == typeof d.removeAttribute
              ? (d[i] = void 0)
              : d.removeAttribute(i),
            c.push(f));
        }
    },
  }),
    n.fn.extend({
      domManip: Ha,
      detach: function (a) {
        return Ia(this, a, !0);
      },
      remove: function (a) {
        return Ia(this, a);
      },
      text: function (a) {
        return Y(
          this,
          function (a) {
            return void 0 === a
              ? n.text(this)
              : this.empty().append(
                  ((this[0] && this[0].ownerDocument) || d).createTextNode(a)
                );
          },
          null,
          a,
          arguments.length
        );
      },
      append: function () {
        return Ha(this, arguments, function (a) {
          if (
            1 === this.nodeType ||
            11 === this.nodeType ||
            9 === this.nodeType
          ) {
            var b = Ca(this, a);
            b.appendChild(a);
          }
        });
      },
      prepend: function () {
        return Ha(this, arguments, function (a) {
          if (
            1 === this.nodeType ||
            11 === this.nodeType ||
            9 === this.nodeType
          ) {
            var b = Ca(this, a);
            b.insertBefore(a, b.firstChild);
          }
        });
      },
      before: function () {
        return Ha(this, arguments, function (a) {
          this.parentNode && this.parentNode.insertBefore(a, this);
        });
      },
      after: function () {
        return Ha(this, arguments, function (a) {
          this.parentNode && this.parentNode.insertBefore(a, this.nextSibling);
        });
      },
      empty: function () {
        for (var a, b = 0; null != (a = this[b]); b++) {
          1 === a.nodeType && n.cleanData(ea(a, !1));
          while (a.firstChild) a.removeChild(a.firstChild);
          a.options && n.nodeName(a, 'select') && (a.options.length = 0);
        }
        return this;
      },
      clone: function (a, b) {
        return (
          (a = null == a ? !1 : a),
          (b = null == b ? a : b),
          this.map(function () {
            return n.clone(this, a, b);
          })
        );
      },
      html: function (a) {
        return Y(
          this,
          function (a) {
            var b = this[0] || {},
              c = 0,
              d = this.length;
            if (void 0 === a)
              return 1 === b.nodeType ? b.innerHTML.replace(ta, '') : void 0;
            if (
              'string' == typeof a &&
              !wa.test(a) &&
              (l.htmlSerialize || !ua.test(a)) &&
              (l.leadingWhitespace || !aa.test(a)) &&
              !da[($.exec(a) || ['', ''])[1].toLowerCase()]
            ) {
              a = n.htmlPrefilter(a);
              try {
                for (; d > c; c++)
                  (b = this[c] || {}),
                    1 === b.nodeType &&
                      (n.cleanData(ea(b, !1)), (b.innerHTML = a));
                b = 0;
              } catch (e) {}
            }
            b && this.empty().append(a);
          },
          null,
          a,
          arguments.length
        );
      },
      replaceWith: function () {
        var a = [];
        return Ha(
          this,
          arguments,
          function (b) {
            var c = this.parentNode;
            n.inArray(this, a) < 0 &&
              (n.cleanData(ea(this)), c && c.replaceChild(b, this));
          },
          a
        );
      },
    }),
    n.each(
      {
        appendTo: 'append',
        prependTo: 'prepend',
        insertBefore: 'before',
        insertAfter: 'after',
        replaceAll: 'replaceWith',
      },
      function (a, b) {
        n.fn[a] = function (a) {
          for (var c, d = 0, e = [], f = n(a), h = f.length - 1; h >= d; d++)
            (c = d === h ? this : this.clone(!0)),
              n(f[d])[b](c),
              g.apply(e, c.get());
          return this.pushStack(e);
        };
      }
    );
  var Ja,
    Ka = { HTML: 'block', BODY: 'block' };
  function La(a, b) {
    var c = n(b.createElement(a)).appendTo(b.body),
      d = n.css(c[0], 'display');
    return c.detach(), d;
  }
  function Ma(a) {
    var b = d,
      c = Ka[a];
    return (
      c ||
        ((c = La(a, b)),
        ('none' !== c && c) ||
          ((Ja = (
            Ja || n("<iframe frameborder='0' width='0' height='0'/>")
          ).appendTo(b.documentElement)),
          (b = (Ja[0].contentWindow || Ja[0].contentDocument).document),
          b.write(),
          b.close(),
          (c = La(a, b)),
          Ja.detach()),
        (Ka[a] = c)),
      c
    );
  }
  var Na = /^margin/,
    Oa = new RegExp('^(' + T + ')(?!px)[a-z%]+$', 'i'),
    Pa = function (a, b, c, d) {
      var e,
        f,
        g = {};
      for (f in b) (g[f] = a.style[f]), (a.style[f] = b[f]);
      e = c.apply(a, d || []);
      for (f in b) a.style[f] = g[f];
      return e;
    },
    Qa = d.documentElement;
  !(function () {
    var b,
      c,
      e,
      f,
      g,
      h,
      i = d.createElement('div'),
      j = d.createElement('div');
    if (j.style) {
      (j.style.cssText = 'float:left;opacity:.5'),
        (l.opacity = '0.5' === j.style.opacity),
        (l.cssFloat = !!j.style.cssFloat),
        (j.style.backgroundClip = 'content-box'),
        (j.cloneNode(!0).style.backgroundClip = ''),
        (l.clearCloneStyle = 'content-box' === j.style.backgroundClip),
        (i = d.createElement('div')),
        (i.style.cssText =
          'border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute'),
        (j.innerHTML = ''),
        i.appendChild(j),
        (l.boxSizing =
          '' === j.style.boxSizing ||
          '' === j.style.MozBoxSizing ||
          '' === j.style.WebkitBoxSizing),
        n.extend(l, {
          reliableHiddenOffsets: function () {
            return null == b && k(), f;
          },
          boxSizingReliable: function () {
            return null == b && k(), e;
          },
          pixelMarginRight: function () {
            return null == b && k(), c;
          },
          pixelPosition: function () {
            return null == b && k(), b;
          },
          reliableMarginRight: function () {
            return null == b && k(), g;
          },
          reliableMarginLeft: function () {
            return null == b && k(), h;
          },
        });
      function k() {
        var k,
          l,
          m = d.documentElement;
        m.appendChild(i),
          (j.style.cssText =
            '-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%'),
          (b = e = h = !1),
          (c = g = !0),
          a.getComputedStyle &&
            ((l = a.getComputedStyle(j)),
            (b = '1%' !== (l || {}).top),
            (h = '2px' === (l || {}).marginLeft),
            (e = '4px' === (l || { width: '4px' }).width),
            (j.style.marginRight = '50%'),
            (c = '4px' === (l || { marginRight: '4px' }).marginRight),
            (k = j.appendChild(d.createElement('div'))),
            (k.style.cssText = j.style.cssText =
              '-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0'),
            (k.style.marginRight = k.style.width = '0'),
            (j.style.width = '1px'),
            (g = !parseFloat((a.getComputedStyle(k) || {}).marginRight)),
            j.removeChild(k)),
          (j.style.display = 'none'),
          (f = 0 === j.getClientRects().length),
          f &&
            ((j.style.display = ''),
            (j.innerHTML = '<table><tr><td></td><td>t</td></tr></table>'),
            (j.childNodes[0].style.borderCollapse = 'separate'),
            (k = j.getElementsByTagName('td')),
            (k[0].style.cssText = 'margin:0;border:0;padding:0;display:none'),
            (f = 0 === k[0].offsetHeight),
            f &&
              ((k[0].style.display = ''),
              (k[1].style.display = 'none'),
              (f = 0 === k[0].offsetHeight))),
          m.removeChild(i);
      }
    }
  })();
  var Ra,
    Sa,
    Ta = /^(top|right|bottom|left)$/;
  a.getComputedStyle
    ? ((Ra = function (b) {
        var c = b.ownerDocument.defaultView;
        return (c && c.opener) || (c = a), c.getComputedStyle(b);
      }),
      (Sa = function (a, b, c) {
        var d,
          e,
          f,
          g,
          h = a.style;
        return (
          (c = c || Ra(a)),
          (g = c ? c.getPropertyValue(b) || c[b] : void 0),
          ('' !== g && void 0 !== g) ||
            n.contains(a.ownerDocument, a) ||
            (g = n.style(a, b)),
          c &&
            !l.pixelMarginRight() &&
            Oa.test(g) &&
            Na.test(b) &&
            ((d = h.width),
            (e = h.minWidth),
            (f = h.maxWidth),
            (h.minWidth = h.maxWidth = h.width = g),
            (g = c.width),
            (h.width = d),
            (h.minWidth = e),
            (h.maxWidth = f)),
          void 0 === g ? g : g + ''
        );
      }))
    : Qa.currentStyle &&
      ((Ra = function (a) {
        return a.currentStyle;
      }),
      (Sa = function (a, b, c) {
        var d,
          e,
          f,
          g,
          h = a.style;
        return (
          (c = c || Ra(a)),
          (g = c ? c[b] : void 0),
          null == g && h && h[b] && (g = h[b]),
          Oa.test(g) &&
            !Ta.test(b) &&
            ((d = h.left),
            (e = a.runtimeStyle),
            (f = e && e.left),
            f && (e.left = a.currentStyle.left),
            (h.left = 'fontSize' === b ? '1em' : g),
            (g = h.pixelLeft + 'px'),
            (h.left = d),
            f && (e.left = f)),
          void 0 === g ? g : g + '' || 'auto'
        );
      }));
  function Ua(a, b) {
    return {
      get: function () {
        return a()
          ? void delete this.get
          : (this.get = b).apply(this, arguments);
      },
    };
  }
  var Va = /alpha\([^)]*\)/i,
    Wa = /opacity\s*=\s*([^)]*)/i,
    Xa = /^(none|table(?!-c[ea]).+)/,
    Ya = new RegExp('^(' + T + ')(.*)$', 'i'),
    Za = { position: 'absolute', visibility: 'hidden', display: 'block' },
    $a = { letterSpacing: '0', fontWeight: '400' },
    _a = ['Webkit', 'O', 'Moz', 'ms'],
    ab = d.createElement('div').style;
  function bb(a) {
    if (a in ab) return a;
    var b = a.charAt(0).toUpperCase() + a.slice(1),
      c = _a.length;
    while (c--) if (((a = _a[c] + b), a in ab)) return a;
  }
  function cb(a, b) {
    for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++)
      (d = a[g]),
        d.style &&
          ((f[g] = n._data(d, 'olddisplay')),
          (c = d.style.display),
          b
            ? (f[g] || 'none' !== c || (d.style.display = ''),
              '' === d.style.display &&
                W(d) &&
                (f[g] = n._data(d, 'olddisplay', Ma(d.nodeName))))
            : ((e = W(d)),
              ((c && 'none' !== c) || !e) &&
                n._data(d, 'olddisplay', e ? c : n.css(d, 'display'))));
    for (g = 0; h > g; g++)
      (d = a[g]),
        d.style &&
          ((b && 'none' !== d.style.display && '' !== d.style.display) ||
            (d.style.display = b ? f[g] || '' : 'none'));
    return a;
  }
  function db(a, b, c) {
    var d = Ya.exec(b);
    return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || 'px') : b;
  }
  function eb(a, b, c, d, e) {
    for (
      var f = c === (d ? 'border' : 'content') ? 4 : 'width' === b ? 1 : 0,
        g = 0;
      4 > f;
      f += 2
    )
      'margin' === c && (g += n.css(a, c + V[f], !0, e)),
        d
          ? ('content' === c && (g -= n.css(a, 'padding' + V[f], !0, e)),
            'margin' !== c && (g -= n.css(a, 'border' + V[f] + 'Width', !0, e)))
          : ((g += n.css(a, 'padding' + V[f], !0, e)),
            'padding' !== c &&
              (g += n.css(a, 'border' + V[f] + 'Width', !0, e)));
    return g;
  }
  function fb(a, b, c) {
    var d = !0,
      e = 'width' === b ? a.offsetWidth : a.offsetHeight,
      f = Ra(a),
      g = l.boxSizing && 'border-box' === n.css(a, 'boxSizing', !1, f);
    if (0 >= e || null == e) {
      if (
        ((e = Sa(a, b, f)),
        (0 > e || null == e) && (e = a.style[b]),
        Oa.test(e))
      )
        return e;
      (d = g && (l.boxSizingReliable() || e === a.style[b])),
        (e = parseFloat(e) || 0);
    }
    return e + eb(a, b, c || (g ? 'border' : 'content'), d, f) + 'px';
  }
  n.extend({
    cssHooks: {
      opacity: {
        get: function (a, b) {
          if (b) {
            var c = Sa(a, 'opacity');
            return '' === c ? '1' : c;
          }
        },
      },
    },
    cssNumber: {
      animationIterationCount: !0,
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
    },
    cssProps: { float: l.cssFloat ? 'cssFloat' : 'styleFloat' },
    style: function (a, b, c, d) {
      if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
        var e,
          f,
          g,
          h = n.camelCase(b),
          i = a.style;
        if (
          ((b = n.cssProps[h] || (n.cssProps[h] = bb(h) || h)),
          (g = n.cssHooks[b] || n.cssHooks[h]),
          void 0 === c)
        )
          return g && 'get' in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
        if (
          ((f = typeof c),
          'string' === f &&
            (e = U.exec(c)) &&
            e[1] &&
            ((c = X(a, b, e)), (f = 'number')),
          null != c &&
            c === c &&
            ('number' === f &&
              (c += (e && e[3]) || (n.cssNumber[h] ? '' : 'px')),
            l.clearCloneStyle ||
              '' !== c ||
              0 !== b.indexOf('background') ||
              (i[b] = 'inherit'),
            !(g && 'set' in g && void 0 === (c = g.set(a, c, d)))))
        )
          try {
            i[b] = c;
          } catch (j) {}
      }
    },
    css: function (a, b, c, d) {
      var e,
        f,
        g,
        h = n.camelCase(b);
      return (
        (b = n.cssProps[h] || (n.cssProps[h] = bb(h) || h)),
        (g = n.cssHooks[b] || n.cssHooks[h]),
        g && 'get' in g && (f = g.get(a, !0, c)),
        void 0 === f && (f = Sa(a, b, d)),
        'normal' === f && b in $a && (f = $a[b]),
        '' === c || c
          ? ((e = parseFloat(f)), c === !0 || isFinite(e) ? e || 0 : f)
          : f
      );
    },
  }),
    n.each(['height', 'width'], function (a, b) {
      n.cssHooks[b] = {
        get: function (a, c, d) {
          return c
            ? Xa.test(n.css(a, 'display')) && 0 === a.offsetWidth
              ? Pa(a, Za, function () {
                  return fb(a, b, d);
                })
              : fb(a, b, d)
            : void 0;
        },
        set: function (a, c, d) {
          var e = d && Ra(a);
          return db(
            a,
            c,
            d
              ? eb(
                  a,
                  b,
                  d,
                  l.boxSizing && 'border-box' === n.css(a, 'boxSizing', !1, e),
                  e
                )
              : 0
          );
        },
      };
    }),
    l.opacity ||
      (n.cssHooks.opacity = {
        get: function (a, b) {
          return Wa.test(
            (b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || ''
          )
            ? 0.01 * parseFloat(RegExp.$1) + ''
            : b
            ? '1'
            : '';
        },
        set: function (a, b) {
          var c = a.style,
            d = a.currentStyle,
            e = n.isNumeric(b) ? 'alpha(opacity=' + 100 * b + ')' : '',
            f = (d && d.filter) || c.filter || '';
          (c.zoom = 1),
            ((b >= 1 || '' === b) &&
              '' === n.trim(f.replace(Va, '')) &&
              c.removeAttribute &&
              (c.removeAttribute('filter'), '' === b || (d && !d.filter))) ||
              (c.filter = Va.test(f) ? f.replace(Va, e) : f + ' ' + e);
        },
      }),
    (n.cssHooks.marginRight = Ua(l.reliableMarginRight, function (a, b) {
      return b
        ? Pa(a, { display: 'inline-block' }, Sa, [a, 'marginRight'])
        : void 0;
    })),
    (n.cssHooks.marginLeft = Ua(l.reliableMarginLeft, function (a, b) {
      return b
        ? (parseFloat(Sa(a, 'marginLeft')) ||
            (n.contains(a.ownerDocument, a)
              ? a.getBoundingClientRect().left -
                Pa(
                  a,
                  {
                    marginLeft: 0,
                  },
                  function () {
                    return a.getBoundingClientRect().left;
                  }
                )
              : 0)) + 'px'
        : void 0;
    })),
    n.each({ margin: '', padding: '', border: 'Width' }, function (a, b) {
      (n.cssHooks[a + b] = {
        expand: function (c) {
          for (
            var d = 0, e = {}, f = 'string' == typeof c ? c.split(' ') : [c];
            4 > d;
            d++
          )
            e[a + V[d] + b] = f[d] || f[d - 2] || f[0];
          return e;
        },
      }),
        Na.test(a) || (n.cssHooks[a + b].set = db);
    }),
    n.fn.extend({
      css: function (a, b) {
        return Y(
          this,
          function (a, b, c) {
            var d,
              e,
              f = {},
              g = 0;
            if (n.isArray(b)) {
              for (d = Ra(a), e = b.length; e > g; g++)
                f[b[g]] = n.css(a, b[g], !1, d);
              return f;
            }
            return void 0 !== c ? n.style(a, b, c) : n.css(a, b);
          },
          a,
          b,
          arguments.length > 1
        );
      },
      show: function () {
        return cb(this, !0);
      },
      hide: function () {
        return cb(this);
      },
      toggle: function (a) {
        return 'boolean' == typeof a
          ? a
            ? this.show()
            : this.hide()
          : this.each(function () {
              W(this) ? n(this).show() : n(this).hide();
            });
      },
    });
  function gb(a, b, c, d, e) {
    return new gb.prototype.init(a, b, c, d, e);
  }
  (n.Tween = gb),
    (gb.prototype = {
      constructor: gb,
      init: function (a, b, c, d, e, f) {
        (this.elem = a),
          (this.prop = c),
          (this.easing = e || n.easing._default),
          (this.options = b),
          (this.start = this.now = this.cur()),
          (this.end = d),
          (this.unit = f || (n.cssNumber[c] ? '' : 'px'));
      },
      cur: function () {
        var a = gb.propHooks[this.prop];
        return a && a.get ? a.get(this) : gb.propHooks._default.get(this);
      },
      run: function (a) {
        var b,
          c = gb.propHooks[this.prop];
        return (
          this.options.duration
            ? (this.pos = b = n.easing[this.easing](
                a,
                this.options.duration * a,
                0,
                1,
                this.options.duration
              ))
            : (this.pos = b = a),
          (this.now = (this.end - this.start) * b + this.start),
          this.options.step &&
            this.options.step.call(this.elem, this.now, this),
          c && c.set ? c.set(this) : gb.propHooks._default.set(this),
          this
        );
      },
    }),
    (gb.prototype.init.prototype = gb.prototype),
    (gb.propHooks = {
      _default: {
        get: function (a) {
          var b;
          return 1 !== a.elem.nodeType ||
            (null != a.elem[a.prop] && null == a.elem.style[a.prop])
            ? a.elem[a.prop]
            : ((b = n.css(a.elem, a.prop, '')), b && 'auto' !== b ? b : 0);
        },
        set: function (a) {
          n.fx.step[a.prop]
            ? n.fx.step[a.prop](a)
            : 1 !== a.elem.nodeType ||
              (null == a.elem.style[n.cssProps[a.prop]] && !n.cssHooks[a.prop])
            ? (a.elem[a.prop] = a.now)
            : n.style(a.elem, a.prop, a.now + a.unit);
        },
      },
    }),
    (gb.propHooks.scrollTop = gb.propHooks.scrollLeft = {
      set: function (a) {
        a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
      },
    }),
    (n.easing = {
      linear: function (a) {
        return a;
      },
      swing: function (a) {
        return 0.5 - Math.cos(a * Math.PI) / 2;
      },
      _default: 'swing',
    }),
    (n.fx = gb.prototype.init),
    (n.fx.step = {});
  var hb,
    ib,
    jb = /^(?:toggle|show|hide)$/,
    kb = /queueHooks$/;
  function lb() {
    return (
      a.setTimeout(function () {
        hb = void 0;
      }),
      (hb = n.now())
    );
  }
  function mb(a, b) {
    var c,
      d = { height: a },
      e = 0;
    for (b = b ? 1 : 0; 4 > e; e += 2 - b)
      (c = V[e]), (d['margin' + c] = d['padding' + c] = a);
    return b && (d.opacity = d.width = a), d;
  }
  function nb(a, b, c) {
    for (
      var d,
        e = (qb.tweeners[b] || []).concat(qb.tweeners['*']),
        f = 0,
        g = e.length;
      g > f;
      f++
    )
      if ((d = e[f].call(c, b, a))) return d;
  }
  function ob(a, b, c) {
    var d,
      e,
      f,
      g,
      h,
      i,
      j,
      k,
      m = this,
      o = {},
      p = a.style,
      q = a.nodeType && W(a),
      r = n._data(a, 'fxshow');
    c.queue ||
      ((h = n._queueHooks(a, 'fx')),
      null == h.unqueued &&
        ((h.unqueued = 0),
        (i = h.empty.fire),
        (h.empty.fire = function () {
          h.unqueued || i();
        })),
      h.unqueued++,
      m.always(function () {
        m.always(function () {
          h.unqueued--, n.queue(a, 'fx').length || h.empty.fire();
        });
      })),
      1 === a.nodeType &&
        ('height' in b || 'width' in b) &&
        ((c.overflow = [p.overflow, p.overflowX, p.overflowY]),
        (j = n.css(a, 'display')),
        (k = 'none' === j ? n._data(a, 'olddisplay') || Ma(a.nodeName) : j),
        'inline' === k &&
          'none' === n.css(a, 'float') &&
          (l.inlineBlockNeedsLayout && 'inline' !== Ma(a.nodeName)
            ? (p.zoom = 1)
            : (p.display = 'inline-block'))),
      c.overflow &&
        ((p.overflow = 'hidden'),
        l.shrinkWrapBlocks() ||
          m.always(function () {
            (p.overflow = c.overflow[0]),
              (p.overflowX = c.overflow[1]),
              (p.overflowY = c.overflow[2]);
          }));
    for (d in b)
      if (((e = b[d]), jb.exec(e))) {
        if (
          (delete b[d], (f = f || 'toggle' === e), e === (q ? 'hide' : 'show'))
        ) {
          if ('show' !== e || !r || void 0 === r[d]) continue;
          q = !0;
        }
        o[d] = (r && r[d]) || n.style(a, d);
      } else j = void 0;
    if (n.isEmptyObject(o))
      'inline' === ('none' === j ? Ma(a.nodeName) : j) && (p.display = j);
    else {
      r ? 'hidden' in r && (q = r.hidden) : (r = n._data(a, 'fxshow', {})),
        f && (r.hidden = !q),
        q
          ? n(a).show()
          : m.done(function () {
              n(a).hide();
            }),
        m.done(function () {
          var b;
          n._removeData(a, 'fxshow');
          for (b in o) n.style(a, b, o[b]);
        });
      for (d in o)
        (g = nb(q ? r[d] : 0, d, m)),
          d in r ||
            ((r[d] = g.start),
            q &&
              ((g.end = g.start),
              (g.start = 'width' === d || 'height' === d ? 1 : 0)));
    }
  }
  function pb(a, b) {
    var c, d, e, f, g;
    for (c in a)
      if (
        ((d = n.camelCase(c)),
        (e = b[d]),
        (f = a[c]),
        n.isArray(f) && ((e = f[1]), (f = a[c] = f[0])),
        c !== d && ((a[d] = f), delete a[c]),
        (g = n.cssHooks[d]),
        g && 'expand' in g)
      ) {
        (f = g.expand(f)), delete a[d];
        for (c in f) c in a || ((a[c] = f[c]), (b[c] = e));
      } else b[d] = e;
  }
  function qb(a, b, c) {
    var d,
      e,
      f = 0,
      g = qb.prefilters.length,
      h = n.Deferred().always(function () {
        delete i.elem;
      }),
      i = function () {
        if (e) return !1;
        for (
          var b = hb || lb(),
            c = Math.max(0, j.startTime + j.duration - b),
            d = c / j.duration || 0,
            f = 1 - d,
            g = 0,
            i = j.tweens.length;
          i > g;
          g++
        )
          j.tweens[g].run(f);
        return (
          h.notifyWith(a, [j, f, c]),
          1 > f && i ? c : (h.resolveWith(a, [j]), !1)
        );
      },
      j = h.promise({
        elem: a,
        props: n.extend({}, b),
        opts: n.extend(!0, { specialEasing: {}, easing: n.easing._default }, c),
        originalProperties: b,
        originalOptions: c,
        startTime: hb || lb(),
        duration: c.duration,
        tweens: [],
        createTween: function (b, c) {
          var d = n.Tween(
            a,
            j.opts,
            b,
            c,
            j.opts.specialEasing[b] || j.opts.easing
          );
          return j.tweens.push(d), d;
        },
        stop: function (b) {
          var c = 0,
            d = b ? j.tweens.length : 0;
          if (e) return this;
          for (e = !0; d > c; c++) j.tweens[c].run(1);
          return (
            b
              ? (h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j, b]))
              : h.rejectWith(a, [j, b]),
            this
          );
        },
      }),
      k = j.props;
    for (pb(k, j.opts.specialEasing); g > f; f++)
      if ((d = qb.prefilters[f].call(j, a, k, j.opts)))
        return (
          n.isFunction(d.stop) &&
            (n._queueHooks(j.elem, j.opts.queue).stop = n.proxy(d.stop, d)),
          d
        );
    return (
      n.map(k, nb, j),
      n.isFunction(j.opts.start) && j.opts.start.call(a, j),
      n.fx.timer(n.extend(i, { elem: a, anim: j, queue: j.opts.queue })),
      j
        .progress(j.opts.progress)
        .done(j.opts.done, j.opts.complete)
        .fail(j.opts.fail)
        .always(j.opts.always)
    );
  }
  (n.Animation = n.extend(qb, {
    tweeners: {
      '*': [
        function (a, b) {
          var c = this.createTween(a, b);
          return X(c.elem, a, U.exec(b), c), c;
        },
      ],
    },
    tweener: function (a, b) {
      n.isFunction(a) ? ((b = a), (a = ['*'])) : (a = a.match(G));
      for (var c, d = 0, e = a.length; e > d; d++)
        (c = a[d]),
          (qb.tweeners[c] = qb.tweeners[c] || []),
          qb.tweeners[c].unshift(b);
    },
    prefilters: [ob],
    prefilter: function (a, b) {
      b ? qb.prefilters.unshift(a) : qb.prefilters.push(a);
    },
  })),
    (n.speed = function (a, b, c) {
      var d =
        a && 'object' == typeof a
          ? n.extend({}, a)
          : {
              complete: c || (!c && b) || (n.isFunction(a) && a),
              duration: a,
              easing: (c && b) || (b && !n.isFunction(b) && b),
            };
      return (
        (d.duration = n.fx.off
          ? 0
          : 'number' == typeof d.duration
          ? d.duration
          : d.duration in n.fx.speeds
          ? n.fx.speeds[d.duration]
          : n.fx.speeds._default),
        (null != d.queue && d.queue !== !0) || (d.queue = 'fx'),
        (d.old = d.complete),
        (d.complete = function () {
          n.isFunction(d.old) && d.old.call(this),
            d.queue && n.dequeue(this, d.queue);
        }),
        d
      );
    }),
    n.fn.extend({
      fadeTo: function (a, b, c, d) {
        return this.filter(W)
          .css('opacity', 0)
          .show()
          .end()
          .animate({ opacity: b }, a, c, d);
      },
      animate: function (a, b, c, d) {
        var e = n.isEmptyObject(a),
          f = n.speed(b, c, d),
          g = function () {
            var b = qb(this, n.extend({}, a), f);
            (e || n._data(this, 'finish')) && b.stop(!0);
          };
        return (
          (g.finish = g),
          e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
        );
      },
      stop: function (a, b, c) {
        var d = function (a) {
          var b = a.stop;
          delete a.stop, b(c);
        };
        return (
          'string' != typeof a && ((c = b), (b = a), (a = void 0)),
          b && a !== !1 && this.queue(a || 'fx', []),
          this.each(function () {
            var b = !0,
              e = null != a && a + 'queueHooks',
              f = n.timers,
              g = n._data(this);
            if (e) g[e] && g[e].stop && d(g[e]);
            else for (e in g) g[e] && g[e].stop && kb.test(e) && d(g[e]);
            for (e = f.length; e--; )
              f[e].elem !== this ||
                (null != a && f[e].queue !== a) ||
                (f[e].anim.stop(c), (b = !1), f.splice(e, 1));
            (!b && c) || n.dequeue(this, a);
          })
        );
      },
      finish: function (a) {
        return (
          a !== !1 && (a = a || 'fx'),
          this.each(function () {
            var b,
              c = n._data(this),
              d = c[a + 'queue'],
              e = c[a + 'queueHooks'],
              f = n.timers,
              g = d ? d.length : 0;
            for (
              c.finish = !0,
                n.queue(this, a, []),
                e && e.stop && e.stop.call(this, !0),
                b = f.length;
              b--;

            )
              f[b].elem === this &&
                f[b].queue === a &&
                (f[b].anim.stop(!0), f.splice(b, 1));
            for (b = 0; g > b; b++)
              d[b] && d[b].finish && d[b].finish.call(this);
            delete c.finish;
          })
        );
      },
    }),
    n.each(['toggle', 'show', 'hide'], function (a, b) {
      var c = n.fn[b];
      n.fn[b] = function (a, d, e) {
        return null == a || 'boolean' == typeof a
          ? c.apply(this, arguments)
          : this.animate(mb(b, !0), a, d, e);
      };
    }),
    n.each(
      {
        slideDown: mb('show'),
        slideUp: mb('hide'),
        slideToggle: mb('toggle'),
        fadeIn: { opacity: 'show' },
        fadeOut: { opacity: 'hide' },
        fadeToggle: { opacity: 'toggle' },
      },
      function (a, b) {
        n.fn[a] = function (a, c, d) {
          return this.animate(b, a, c, d);
        };
      }
    ),
    (n.timers = []),
    (n.fx.tick = function () {
      var a,
        b = n.timers,
        c = 0;
      for (hb = n.now(); c < b.length; c++)
        (a = b[c]), a() || b[c] !== a || b.splice(c--, 1);
      b.length || n.fx.stop(), (hb = void 0);
    }),
    (n.fx.timer = function (a) {
      n.timers.push(a), a() ? n.fx.start() : n.timers.pop();
    }),
    (n.fx.interval = 13),
    (n.fx.start = function () {
      ib || (ib = a.setInterval(n.fx.tick, n.fx.interval));
    }),
    (n.fx.stop = function () {
      a.clearInterval(ib), (ib = null);
    }),
    (n.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
    (n.fn.delay = function (b, c) {
      return (
        (b = n.fx ? n.fx.speeds[b] || b : b),
        (c = c || 'fx'),
        this.queue(c, function (c, d) {
          var e = a.setTimeout(c, b);
          d.stop = function () {
            a.clearTimeout(e);
          };
        })
      );
    }),
    (function () {
      var a,
        b = d.createElement('input'),
        c = d.createElement('div'),
        e = d.createElement('select'),
        f = e.appendChild(d.createElement('option'));
      (c = d.createElement('div')),
        c.setAttribute('className', 't'),
        (c.innerHTML =
          "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
        (a = c.getElementsByTagName('a')[0]),
        b.setAttribute('type', 'checkbox'),
        c.appendChild(b),
        (a = c.getElementsByTagName('a')[0]),
        (a.style.cssText = 'top:1px'),
        (l.getSetAttribute = 't' !== c.className),
        (l.style = /top/.test(a.getAttribute('style'))),
        (l.hrefNormalized = '/a' === a.getAttribute('href')),
        (l.checkOn = !!b.value),
        (l.optSelected = f.selected),
        (l.enctype = !!d.createElement('form').enctype),
        (e.disabled = !0),
        (l.optDisabled = !f.disabled),
        (b = d.createElement('input')),
        b.setAttribute('value', ''),
        (l.input = '' === b.getAttribute('value')),
        (b.value = 't'),
        b.setAttribute('type', 'radio'),
        (l.radioValue = 't' === b.value);
    })();
  var rb = /\r/g,
    sb = /[\x20\t\r\n\f]+/g;
  n.fn.extend({
    val: function (a) {
      var b,
        c,
        d,
        e = this[0];
      {
        if (arguments.length)
          return (
            (d = n.isFunction(a)),
            this.each(function (c) {
              var e;
              1 === this.nodeType &&
                ((e = d ? a.call(this, c, n(this).val()) : a),
                null == e
                  ? (e = '')
                  : 'number' == typeof e
                  ? (e += '')
                  : n.isArray(e) &&
                    (e = n.map(e, function (a) {
                      return null == a ? '' : a + '';
                    })),
                (b =
                  n.valHooks[this.type] ||
                  n.valHooks[this.nodeName.toLowerCase()]),
                (b && 'set' in b && void 0 !== b.set(this, e, 'value')) ||
                  (this.value = e));
            })
          );
        if (e)
          return (
            (b = n.valHooks[e.type] || n.valHooks[e.nodeName.toLowerCase()]),
            b && 'get' in b && void 0 !== (c = b.get(e, 'value'))
              ? c
              : ((c = e.value),
                'string' == typeof c ? c.replace(rb, '') : null == c ? '' : c)
          );
      }
    },
  }),
    n.extend({
      valHooks: {
        option: {
          get: function (a) {
            var b = n.find.attr(a, 'value');
            return null != b ? b : n.trim(n.text(a)).replace(sb, ' ');
          },
        },
        select: {
          get: function (a) {
            for (
              var b,
                c,
                d = a.options,
                e = a.selectedIndex,
                f = 'select-one' === a.type || 0 > e,
                g = f ? null : [],
                h = f ? e + 1 : d.length,
                i = 0 > e ? h : f ? e : 0;
              h > i;
              i++
            )
              if (
                ((c = d[i]),
                (c.selected || i === e) &&
                  (l.optDisabled
                    ? !c.disabled
                    : null === c.getAttribute('disabled')) &&
                  (!c.parentNode.disabled ||
                    !n.nodeName(c.parentNode, 'optgroup')))
              ) {
                if (((b = n(c).val()), f)) return b;
                g.push(b);
              }
            return g;
          },
          set: function (a, b) {
            var c,
              d,
              e = a.options,
              f = n.makeArray(b),
              g = e.length;
            while (g--)
              if (((d = e[g]), n.inArray(n.valHooks.option.get(d), f) > -1))
                try {
                  d.selected = c = !0;
                } catch (h) {
                  d.scrollHeight;
                }
              else d.selected = !1;
            return c || (a.selectedIndex = -1), e;
          },
        },
      },
    }),
    n.each(['radio', 'checkbox'], function () {
      (n.valHooks[this] = {
        set: function (a, b) {
          return n.isArray(b)
            ? (a.checked = n.inArray(n(a).val(), b) > -1)
            : void 0;
        },
      }),
        l.checkOn ||
          (n.valHooks[this].get = function (a) {
            return null === a.getAttribute('value') ? 'on' : a.value;
          });
    });
  var tb,
    ub,
    vb = n.expr.attrHandle,
    wb = /^(?:checked|selected)$/i,
    xb = l.getSetAttribute,
    yb = l.input;
  n.fn.extend({
    attr: function (a, b) {
      return Y(this, n.attr, a, b, arguments.length > 1);
    },
    removeAttr: function (a) {
      return this.each(function () {
        n.removeAttr(this, a);
      });
    },
  }),
    n.extend({
      attr: function (a, b, c) {
        var d,
          e,
          f = a.nodeType;
        if (3 !== f && 8 !== f && 2 !== f)
          return 'undefined' == typeof a.getAttribute
            ? n.prop(a, b, c)
            : ((1 === f && n.isXMLDoc(a)) ||
                ((b = b.toLowerCase()),
                (e = n.attrHooks[b] || (n.expr.match.bool.test(b) ? ub : tb))),
              void 0 !== c
                ? null === c
                  ? void n.removeAttr(a, b)
                  : e && 'set' in e && void 0 !== (d = e.set(a, c, b))
                  ? d
                  : (a.setAttribute(b, c + ''), c)
                : e && 'get' in e && null !== (d = e.get(a, b))
                ? d
                : ((d = n.find.attr(a, b)), null == d ? void 0 : d));
      },
      attrHooks: {
        type: {
          set: function (a, b) {
            if (!l.radioValue && 'radio' === b && n.nodeName(a, 'input')) {
              var c = a.value;
              return a.setAttribute('type', b), c && (a.value = c), b;
            }
          },
        },
      },
      removeAttr: function (a, b) {
        var c,
          d,
          e = 0,
          f = b && b.match(G);
        if (f && 1 === a.nodeType)
          while ((c = f[e++]))
            (d = n.propFix[c] || c),
              n.expr.match.bool.test(c)
                ? (yb && xb) || !wb.test(c)
                  ? (a[d] = !1)
                  : (a[n.camelCase('default-' + c)] = a[d] = !1)
                : n.attr(a, c, ''),
              a.removeAttribute(xb ? c : d);
      },
    }),
    (ub = {
      set: function (a, b, c) {
        return (
          b === !1
            ? n.removeAttr(a, c)
            : (yb && xb) || !wb.test(c)
            ? a.setAttribute((!xb && n.propFix[c]) || c, c)
            : (a[n.camelCase('default-' + c)] = a[c] = !0),
          c
        );
      },
    }),
    n.each(n.expr.match.bool.source.match(/\w+/g), function (a, b) {
      var c = vb[b] || n.find.attr;
      (yb && xb) || !wb.test(b)
        ? (vb[b] = function (a, b, d) {
            var e, f;
            return (
              d ||
                ((f = vb[b]),
                (vb[b] = e),
                (e = null != c(a, b, d) ? b.toLowerCase() : null),
                (vb[b] = f)),
              e
            );
          })
        : (vb[b] = function (a, b, c) {
            return c
              ? void 0
              : a[n.camelCase('default-' + b)]
              ? b.toLowerCase()
              : null;
          });
    }),
    (yb && xb) ||
      (n.attrHooks.value = {
        set: function (a, b, c) {
          return n.nodeName(a, 'input')
            ? void (a.defaultValue = b)
            : tb && tb.set(a, b, c);
        },
      }),
    xb ||
      ((tb = {
        set: function (a, b, c) {
          var d = a.getAttributeNode(c);
          return (
            d || a.setAttributeNode((d = a.ownerDocument.createAttribute(c))),
            (d.value = b += ''),
            'value' === c || b === a.getAttribute(c) ? b : void 0
          );
        },
      }),
      (vb.id = vb.name = vb.coords = function (a, b, c) {
        var d;
        return c
          ? void 0
          : (d = a.getAttributeNode(b)) && '' !== d.value
          ? d.value
          : null;
      }),
      (n.valHooks.button = {
        get: function (a, b) {
          var c = a.getAttributeNode(b);
          return c && c.specified ? c.value : void 0;
        },
        set: tb.set,
      }),
      (n.attrHooks.contenteditable = {
        set: function (a, b, c) {
          tb.set(a, '' === b ? !1 : b, c);
        },
      }),
      n.each(['width', 'height'], function (a, b) {
        n.attrHooks[b] = {
          set: function (a, c) {
            return '' === c ? (a.setAttribute(b, 'auto'), c) : void 0;
          },
        };
      })),
    l.style ||
      (n.attrHooks.style = {
        get: function (a) {
          return a.style.cssText || void 0;
        },
        set: function (a, b) {
          return (a.style.cssText = b + '');
        },
      });
  var zb = /^(?:input|select|textarea|button|object)$/i,
    Ab = /^(?:a|area)$/i;
  n.fn.extend({
    prop: function (a, b) {
      return Y(this, n.prop, a, b, arguments.length > 1);
    },
    removeProp: function (a) {
      return (
        (a = n.propFix[a] || a),
        this.each(function () {
          try {
            (this[a] = void 0), delete this[a];
          } catch (b) {}
        })
      );
    },
  }),
    n.extend({
      prop: function (a, b, c) {
        var d,
          e,
          f = a.nodeType;
        if (3 !== f && 8 !== f && 2 !== f)
          return (
            (1 === f && n.isXMLDoc(a)) ||
              ((b = n.propFix[b] || b), (e = n.propHooks[b])),
            void 0 !== c
              ? e && 'set' in e && void 0 !== (d = e.set(a, c, b))
                ? d
                : (a[b] = c)
              : e && 'get' in e && null !== (d = e.get(a, b))
              ? d
              : a[b]
          );
      },
      propHooks: {
        tabIndex: {
          get: function (a) {
            var b = n.find.attr(a, 'tabindex');
            return b
              ? parseInt(b, 10)
              : zb.test(a.nodeName) || (Ab.test(a.nodeName) && a.href)
              ? 0
              : -1;
          },
        },
      },
      propFix: { for: 'htmlFor', class: 'className' },
    }),
    l.hrefNormalized ||
      n.each(['href', 'src'], function (a, b) {
        n.propHooks[b] = {
          get: function (a) {
            return a.getAttribute(b, 4);
          },
        };
      }),
    l.optSelected ||
      (n.propHooks.selected = {
        get: function (a) {
          var b = a.parentNode;
          return (
            b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex),
            null
          );
        },
        set: function (a) {
          var b = a.parentNode;
          b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
        },
      }),
    n.each(
      [
        'tabIndex',
        'readOnly',
        'maxLength',
        'cellSpacing',
        'cellPadding',
        'rowSpan',
        'colSpan',
        'useMap',
        'frameBorder',
        'contentEditable',
      ],
      function () {
        n.propFix[this.toLowerCase()] = this;
      }
    ),
    l.enctype || (n.propFix.enctype = 'encoding');
  var Bb = /[\t\r\n\f]/g;
  function Cb(a) {
    return n.attr(a, 'class') || '';
  }
  n.fn.extend({
    addClass: function (a) {
      var b,
        c,
        d,
        e,
        f,
        g,
        h,
        i = 0;
      if (n.isFunction(a))
        return this.each(function (b) {
          n(this).addClass(a.call(this, b, Cb(this)));
        });
      if ('string' == typeof a && a) {
        b = a.match(G) || [];
        while ((c = this[i++]))
          if (
            ((e = Cb(c)),
            (d = 1 === c.nodeType && (' ' + e + ' ').replace(Bb, ' ')))
          ) {
            g = 0;
            while ((f = b[g++])) d.indexOf(' ' + f + ' ') < 0 && (d += f + ' ');
            (h = n.trim(d)), e !== h && n.attr(c, 'class', h);
          }
      }
      return this;
    },
    removeClass: function (a) {
      var b,
        c,
        d,
        e,
        f,
        g,
        h,
        i = 0;
      if (n.isFunction(a))
        return this.each(function (b) {
          n(this).removeClass(a.call(this, b, Cb(this)));
        });
      if (!arguments.length) return this.attr('class', '');
      if ('string' == typeof a && a) {
        b = a.match(G) || [];
        while ((c = this[i++]))
          if (
            ((e = Cb(c)),
            (d = 1 === c.nodeType && (' ' + e + ' ').replace(Bb, ' ')))
          ) {
            g = 0;
            while ((f = b[g++]))
              while (d.indexOf(' ' + f + ' ') > -1)
                d = d.replace(' ' + f + ' ', ' ');
            (h = n.trim(d)), e !== h && n.attr(c, 'class', h);
          }
      }
      return this;
    },
    toggleClass: function (a, b) {
      var c = typeof a;
      return 'boolean' == typeof b && 'string' === c
        ? b
          ? this.addClass(a)
          : this.removeClass(a)
        : n.isFunction(a)
        ? this.each(function (c) {
            n(this).toggleClass(a.call(this, c, Cb(this), b), b);
          })
        : this.each(function () {
            var b, d, e, f;
            if ('string' === c) {
              (d = 0), (e = n(this)), (f = a.match(G) || []);
              while ((b = f[d++]))
                e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
            } else (void 0 !== a && 'boolean' !== c) || ((b = Cb(this)), b && n._data(this, '__className__', b), n.attr(this, 'class', b || a === !1 ? '' : n._data(this, '__className__') || ''));
          });
    },
    hasClass: function (a) {
      var b,
        c,
        d = 0;
      b = ' ' + a + ' ';
      while ((c = this[d++]))
        if (
          1 === c.nodeType &&
          (' ' + Cb(c) + ' ').replace(Bb, ' ').indexOf(b) > -1
        )
          return !0;
      return !1;
    },
  }),
    n.each(
      'blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu'.split(
        ' '
      ),
      function (a, b) {
        n.fn[b] = function (a, c) {
          return arguments.length > 0
            ? this.on(b, null, a, c)
            : this.trigger(b);
        };
      }
    ),
    n.fn.extend({
      hover: function (a, b) {
        return this.mouseenter(a).mouseleave(b || a);
      },
    });
  var Db = a.location,
    Eb = n.now(),
    Fb = /\?/,
    Gb = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
  (n.parseJSON = function (b) {
    if (a.JSON && a.JSON.parse) return a.JSON.parse(b + '');
    var c,
      d = null,
      e = n.trim(b + '');
    return e &&
      !n.trim(
        e.replace(Gb, function (a, b, e, f) {
          return (
            c && b && (d = 0), 0 === d ? a : ((c = e || b), (d += !f - !e), '')
          );
        })
      )
      ? Function('return ' + e)()
      : n.error('Invalid JSON: ' + b);
  }),
    (n.parseXML = function (b) {
      var c, d;
      if (!b || 'string' != typeof b) return null;
      try {
        a.DOMParser
          ? ((d = new a.DOMParser()), (c = d.parseFromString(b, 'text/xml')))
          : ((c = new a.ActiveXObject('Microsoft.XMLDOM')),
            (c.async = 'false'),
            c.loadXML(b));
      } catch (e) {
        c = void 0;
      }
      return (
        (c &&
          c.documentElement &&
          !c.getElementsByTagName('parsererror').length) ||
          n.error('Invalid XML: ' + b),
        c
      );
    });
  var Hb = /#.*$/,
    Ib = /([?&])_=[^&]*/,
    Jb = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
    Kb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    Lb = /^(?:GET|HEAD)$/,
    Mb = /^\/\//,
    Nb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
    Ob = {},
    Pb = {},
    Qb = '*/'.concat('*'),
    Rb = Db.href,
    Sb = Nb.exec(Rb.toLowerCase()) || [];
  function Tb(a) {
    return function (b, c) {
      'string' != typeof b && ((c = b), (b = '*'));
      var d,
        e = 0,
        f = b.toLowerCase().match(G) || [];
      if (n.isFunction(c))
        while ((d = f[e++]))
          '+' === d.charAt(0)
            ? ((d = d.slice(1) || '*'), (a[d] = a[d] || []).unshift(c))
            : (a[d] = a[d] || []).push(c);
    };
  }
  function Ub(a, b, c, d) {
    var e = {},
      f = a === Pb;
    function g(h) {
      var i;
      return (
        (e[h] = !0),
        n.each(a[h] || [], function (a, h) {
          var j = h(b, c, d);
          return 'string' != typeof j || f || e[j]
            ? f
              ? !(i = j)
              : void 0
            : (b.dataTypes.unshift(j), g(j), !1);
        }),
        i
      );
    }
    return g(b.dataTypes[0]) || (!e['*'] && g('*'));
  }
  function Vb(a, b) {
    var c,
      d,
      e = n.ajaxSettings.flatOptions || {};
    for (d in b) void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
    return c && n.extend(!0, a, c), a;
  }
  function Wb(a, b, c) {
    var d,
      e,
      f,
      g,
      h = a.contents,
      i = a.dataTypes;
    while ('*' === i[0])
      i.shift(),
        void 0 === e && (e = a.mimeType || b.getResponseHeader('Content-Type'));
    if (e)
      for (g in h)
        if (h[g] && h[g].test(e)) {
          i.unshift(g);
          break;
        }
    if (i[0] in c) f = i[0];
    else {
      for (g in c) {
        if (!i[0] || a.converters[g + ' ' + i[0]]) {
          f = g;
          break;
        }
        d || (d = g);
      }
      f = f || d;
    }
    return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0;
  }
  function Xb(a, b, c, d) {
    var e,
      f,
      g,
      h,
      i,
      j = {},
      k = a.dataTypes.slice();
    if (k[1]) for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
    f = k.shift();
    while (f)
      if (
        (a.responseFields[f] && (c[a.responseFields[f]] = b),
        !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)),
        (i = f),
        (f = k.shift()))
      )
        if ('*' === f) f = i;
        else if ('*' !== i && i !== f) {
          if (((g = j[i + ' ' + f] || j['* ' + f]), !g))
            for (e in j)
              if (
                ((h = e.split(' ')),
                h[1] === f && (g = j[i + ' ' + h[0]] || j['* ' + h[0]]))
              ) {
                g === !0
                  ? (g = j[e])
                  : j[e] !== !0 && ((f = h[0]), k.unshift(h[1]));
                break;
              }
          if (g !== !0)
            if (g && a['throws']) b = g(b);
            else
              try {
                b = g(b);
              } catch (l) {
                return {
                  state: 'parsererror',
                  error: g ? l : 'No conversion from ' + i + ' to ' + f,
                };
              }
        }
    return { state: 'success', data: b };
  }
  n.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: Rb,
      type: 'GET',
      isLocal: Kb.test(Sb[1]),
      global: !0,
      processData: !0,
      async: !0,
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      accepts: {
        '*': Qb,
        text: 'text/plain',
        html: 'text/html',
        xml: 'application/xml, text/xml',
        json: 'application/json, text/javascript',
      },
      contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
      responseFields: {
        xml: 'responseXML',
        text: 'responseText',
        json: 'responseJSON',
      },
      converters: {
        '* text': String,
        'text html': !0,
        'text json': n.parseJSON,
        'text xml': n.parseXML,
      },
      flatOptions: { url: !0, context: !0 },
    },
    ajaxSetup: function (a, b) {
      return b ? Vb(Vb(a, n.ajaxSettings), b) : Vb(n.ajaxSettings, a);
    },
    ajaxPrefilter: Tb(Ob),
    ajaxTransport: Tb(Pb),
    ajax: function (b, c) {
      'object' == typeof b && ((c = b), (b = void 0)), (c = c || {});
      var d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l = n.ajaxSetup({}, c),
        m = l.context || l,
        o = l.context && (m.nodeType || m.jquery) ? n(m) : n.event,
        p = n.Deferred(),
        q = n.Callbacks('once memory'),
        r = l.statusCode || {},
        s = {},
        t = {},
        u = 0,
        v = 'canceled',
        w = {
          readyState: 0,
          getResponseHeader: function (a) {
            var b;
            if (2 === u) {
              if (!k) {
                k = {};
                while ((b = Jb.exec(g))) k[b[1].toLowerCase()] = b[2];
              }
              b = k[a.toLowerCase()];
            }
            return null == b ? null : b;
          },
          getAllResponseHeaders: function () {
            return 2 === u ? g : null;
          },
          setRequestHeader: function (a, b) {
            var c = a.toLowerCase();
            return u || ((a = t[c] = t[c] || a), (s[a] = b)), this;
          },
          overrideMimeType: function (a) {
            return u || (l.mimeType = a), this;
          },
          statusCode: function (a) {
            var b;
            if (a)
              if (2 > u) for (b in a) r[b] = [r[b], a[b]];
              else w.always(a[w.status]);
            return this;
          },
          abort: function (a) {
            var b = a || v;
            return j && j.abort(b), y(0, b), this;
          },
        };
      if (
        ((p.promise(w).complete = q.add),
        (w.success = w.done),
        (w.error = w.fail),
        (l.url = ((b || l.url || Rb) + '')
          .replace(Hb, '')
          .replace(Mb, Sb[1] + '//')),
        (l.type = c.method || c.type || l.method || l.type),
        (l.dataTypes = n
          .trim(l.dataType || '*')
          .toLowerCase()
          .match(G) || ['']),
        null == l.crossDomain &&
          ((d = Nb.exec(l.url.toLowerCase())),
          (l.crossDomain = !(
            !d ||
            (d[1] === Sb[1] &&
              d[2] === Sb[2] &&
              (d[3] || ('http:' === d[1] ? '80' : '443')) ===
                (Sb[3] || ('http:' === Sb[1] ? '80' : '443')))
          ))),
        l.data &&
          l.processData &&
          'string' != typeof l.data &&
          (l.data = n.param(l.data, l.traditional)),
        Ub(Ob, l, c, w),
        2 === u)
      )
        return w;
      (i = n.event && l.global),
        i && 0 === n.active++ && n.event.trigger('ajaxStart'),
        (l.type = l.type.toUpperCase()),
        (l.hasContent = !Lb.test(l.type)),
        (f = l.url),
        l.hasContent ||
          (l.data &&
            ((f = l.url += (Fb.test(f) ? '&' : '?') + l.data), delete l.data),
          l.cache === !1 &&
            (l.url = Ib.test(f)
              ? f.replace(Ib, '$1_=' + Eb++)
              : f + (Fb.test(f) ? '&' : '?') + '_=' + Eb++)),
        l.ifModified &&
          (n.lastModified[f] &&
            w.setRequestHeader('If-Modified-Since', n.lastModified[f]),
          n.etag[f] && w.setRequestHeader('If-None-Match', n.etag[f])),
        ((l.data && l.hasContent && l.contentType !== !1) || c.contentType) &&
          w.setRequestHeader('Content-Type', l.contentType),
        w.setRequestHeader(
          'Accept',
          l.dataTypes[0] && l.accepts[l.dataTypes[0]]
            ? l.accepts[l.dataTypes[0]] +
                ('*' !== l.dataTypes[0] ? ', ' + Qb + '; q=0.01' : '')
            : l.accepts['*']
        );
      for (e in l.headers) w.setRequestHeader(e, l.headers[e]);
      if (l.beforeSend && (l.beforeSend.call(m, w, l) === !1 || 2 === u))
        return w.abort();
      v = 'abort';
      for (e in { success: 1, error: 1, complete: 1 }) w[e](l[e]);
      if ((j = Ub(Pb, l, c, w))) {
        if (((w.readyState = 1), i && o.trigger('ajaxSend', [w, l]), 2 === u))
          return w;
        l.async &&
          l.timeout > 0 &&
          (h = a.setTimeout(function () {
            w.abort('timeout');
          }, l.timeout));
        try {
          (u = 1), j.send(s, y);
        } catch (x) {
          if (!(2 > u)) throw x;
          y(-1, x);
        }
      } else y(-1, 'No Transport');
      function y(b, c, d, e) {
        var k,
          s,
          t,
          v,
          x,
          y = c;
        2 !== u &&
          ((u = 2),
          h && a.clearTimeout(h),
          (j = void 0),
          (g = e || ''),
          (w.readyState = b > 0 ? 4 : 0),
          (k = (b >= 200 && 300 > b) || 304 === b),
          d && (v = Wb(l, w, d)),
          (v = Xb(l, v, w, k)),
          k
            ? (l.ifModified &&
                ((x = w.getResponseHeader('Last-Modified')),
                x && (n.lastModified[f] = x),
                (x = w.getResponseHeader('etag')),
                x && (n.etag[f] = x)),
              204 === b || 'HEAD' === l.type
                ? (y = 'nocontent')
                : 304 === b
                ? (y = 'notmodified')
                : ((y = v.state), (s = v.data), (t = v.error), (k = !t)))
            : ((t = y), (!b && y) || ((y = 'error'), 0 > b && (b = 0))),
          (w.status = b),
          (w.statusText = (c || y) + ''),
          k ? p.resolveWith(m, [s, y, w]) : p.rejectWith(m, [w, y, t]),
          w.statusCode(r),
          (r = void 0),
          i && o.trigger(k ? 'ajaxSuccess' : 'ajaxError', [w, l, k ? s : t]),
          q.fireWith(m, [w, y]),
          i &&
            (o.trigger('ajaxComplete', [w, l]),
            --n.active || n.event.trigger('ajaxStop')));
      }
      return w;
    },
    getJSON: function (a, b, c) {
      return n.get(a, b, c, 'json');
    },
    getScript: function (a, b) {
      return n.get(a, void 0, b, 'script');
    },
  }),
    n.each(['get', 'post'], function (a, b) {
      n[b] = function (a, c, d, e) {
        return (
          n.isFunction(c) && ((e = e || d), (d = c), (c = void 0)),
          n.ajax(
            n.extend(
              { url: a, type: b, dataType: e, data: c, success: d },
              n.isPlainObject(a) && a
            )
          )
        );
      };
    }),
    (n._evalUrl = function (a) {
      return n.ajax({
        url: a,
        type: 'GET',
        dataType: 'script',
        cache: !0,
        async: !1,
        global: !1,
        throws: !0,
      });
    }),
    n.fn.extend({
      wrapAll: function (a) {
        if (n.isFunction(a))
          return this.each(function (b) {
            n(this).wrapAll(a.call(this, b));
          });
        if (this[0]) {
          var b = n(a, this[0].ownerDocument).eq(0).clone(!0);
          this[0].parentNode && b.insertBefore(this[0]),
            b
              .map(function () {
                var a = this;
                while (a.firstChild && 1 === a.firstChild.nodeType)
                  a = a.firstChild;
                return a;
              })
              .append(this);
        }
        return this;
      },
      wrapInner: function (a) {
        return n.isFunction(a)
          ? this.each(function (b) {
              n(this).wrapInner(a.call(this, b));
            })
          : this.each(function () {
              var b = n(this),
                c = b.contents();
              c.length ? c.wrapAll(a) : b.append(a);
            });
      },
      wrap: function (a) {
        var b = n.isFunction(a);
        return this.each(function (c) {
          n(this).wrapAll(b ? a.call(this, c) : a);
        });
      },
      unwrap: function () {
        return this.parent()
          .each(function () {
            n.nodeName(this, 'body') || n(this).replaceWith(this.childNodes);
          })
          .end();
      },
    });
  function Yb(a) {
    return (a.style && a.style.display) || n.css(a, 'display');
  }
  function Zb(a) {
    if (!n.contains(a.ownerDocument || d, a)) return !0;
    while (a && 1 === a.nodeType) {
      if ('none' === Yb(a) || 'hidden' === a.type) return !0;
      a = a.parentNode;
    }
    return !1;
  }
  (n.expr.filters.hidden = function (a) {
    return l.reliableHiddenOffsets()
      ? a.offsetWidth <= 0 && a.offsetHeight <= 0 && !a.getClientRects().length
      : Zb(a);
  }),
    (n.expr.filters.visible = function (a) {
      return !n.expr.filters.hidden(a);
    });
  var $b = /%20/g,
    _b = /\[\]$/,
    ac = /\r?\n/g,
    bc = /^(?:submit|button|image|reset|file)$/i,
    cc = /^(?:input|select|textarea|keygen)/i;
  function dc(a, b, c, d) {
    var e;
    if (n.isArray(b))
      n.each(b, function (b, e) {
        c || _b.test(a)
          ? d(a, e)
          : dc(
              a + '[' + ('object' == typeof e && null != e ? b : '') + ']',
              e,
              c,
              d
            );
      });
    else if (c || 'object' !== n.type(b)) d(a, b);
    else for (e in b) dc(a + '[' + e + ']', b[e], c, d);
  }
  (n.param = function (a, b) {
    var c,
      d = [],
      e = function (a, b) {
        (b = n.isFunction(b) ? b() : null == b ? '' : b),
          (d[d.length] = encodeURIComponent(a) + '=' + encodeURIComponent(b));
      };
    if (
      (void 0 === b && (b = n.ajaxSettings && n.ajaxSettings.traditional),
      n.isArray(a) || (a.jquery && !n.isPlainObject(a)))
    )
      n.each(a, function () {
        e(this.name, this.value);
      });
    else for (c in a) dc(c, a[c], b, e);
    return d.join('&').replace($b, '+');
  }),
    n.fn.extend({
      serialize: function () {
        return n.param(this.serializeArray());
      },
      serializeArray: function () {
        return this.map(function () {
          var a = n.prop(this, 'elements');
          return a ? n.makeArray(a) : this;
        })
          .filter(function () {
            var a = this.type;
            return (
              this.name &&
              !n(this).is(':disabled') &&
              cc.test(this.nodeName) &&
              !bc.test(a) &&
              (this.checked || !Z.test(a))
            );
          })
          .map(function (a, b) {
            var c = n(this).val();
            return null == c
              ? null
              : n.isArray(c)
              ? n.map(c, function (a) {
                  return { name: b.name, value: a.replace(ac, '\r\n') };
                })
              : { name: b.name, value: c.replace(ac, '\r\n') };
          })
          .get();
      },
    }),
    (n.ajaxSettings.xhr =
      void 0 !== a.ActiveXObject
        ? function () {
            return this.isLocal
              ? ic()
              : d.documentMode > 8
              ? hc()
              : (/^(get|post|head|put|delete|options)$/i.test(this.type) &&
                  hc()) ||
                ic();
          }
        : hc);
  var ec = 0,
    fc = {},
    gc = n.ajaxSettings.xhr();
  a.attachEvent &&
    a.attachEvent('onunload', function () {
      for (var a in fc) fc[a](void 0, !0);
    }),
    (l.cors = !!gc && 'withCredentials' in gc),
    (gc = l.ajax = !!gc),
    gc &&
      n.ajaxTransport(function (b) {
        if (!b.crossDomain || l.cors) {
          var c;
          return {
            send: function (d, e) {
              var f,
                g = b.xhr(),
                h = ++ec;
              if (
                (g.open(b.type, b.url, b.async, b.username, b.password),
                b.xhrFields)
              )
                for (f in b.xhrFields) g[f] = b.xhrFields[f];
              b.mimeType &&
                g.overrideMimeType &&
                g.overrideMimeType(b.mimeType),
                b.crossDomain ||
                  d['X-Requested-With'] ||
                  (d['X-Requested-With'] = 'XMLHttpRequest');
              for (f in d) void 0 !== d[f] && g.setRequestHeader(f, d[f] + '');
              g.send((b.hasContent && b.data) || null),
                (c = function (a, d) {
                  var f, i, j;
                  if (c && (d || 4 === g.readyState))
                    if (
                      (delete fc[h],
                      (c = void 0),
                      (g.onreadystatechange = n.noop),
                      d)
                    )
                      4 !== g.readyState && g.abort();
                    else {
                      (j = {}),
                        (f = g.status),
                        'string' == typeof g.responseText &&
                          (j.text = g.responseText);
                      try {
                        i = g.statusText;
                      } catch (k) {
                        i = '';
                      }
                      f || !b.isLocal || b.crossDomain
                        ? 1223 === f && (f = 204)
                        : (f = j.text ? 200 : 404);
                    }
                  j && e(f, i, j, g.getAllResponseHeaders());
                }),
                b.async
                  ? 4 === g.readyState
                    ? a.setTimeout(c)
                    : (g.onreadystatechange = fc[h] = c)
                  : c();
            },
            abort: function () {
              c && c(void 0, !0);
            },
          };
        }
      });
  function hc() {
    try {
      return new a.XMLHttpRequest();
    } catch (b) {}
  }
  function ic() {
    try {
      return new a.ActiveXObject('Microsoft.XMLHTTP');
    } catch (b) {}
  }
  n.ajaxSetup({
    accepts: {
      script:
        'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript',
    },
    contents: { script: /\b(?:java|ecma)script\b/ },
    converters: {
      'text script': function (a) {
        return n.globalEval(a), a;
      },
    },
  }),
    n.ajaxPrefilter('script', function (a) {
      void 0 === a.cache && (a.cache = !1),
        a.crossDomain && ((a.type = 'GET'), (a.global = !1));
    }),
    n.ajaxTransport('script', function (a) {
      if (a.crossDomain) {
        var b,
          c = d.head || n('head')[0] || d.documentElement;
        return {
          send: function (e, f) {
            (b = d.createElement('script')),
              (b.async = !0),
              a.scriptCharset && (b.charset = a.scriptCharset),
              (b.src = a.url),
              (b.onload = b.onreadystatechange = function (a, c) {
                (c || !b.readyState || /loaded|complete/.test(b.readyState)) &&
                  ((b.onload = b.onreadystatechange = null),
                  b.parentNode && b.parentNode.removeChild(b),
                  (b = null),
                  c || f(200, 'success'));
              }),
              c.insertBefore(b, c.firstChild);
          },
          abort: function () {
            b && b.onload(void 0, !0);
          },
        };
      }
    });
  var jc = [],
    kc = /(=)\?(?=&|$)|\?\?/;
  n.ajaxSetup({
    jsonp: 'callback',
    jsonpCallback: function () {
      var a = jc.pop() || n.expando + '_' + Eb++;
      return (this[a] = !0), a;
    },
  }),
    n.ajaxPrefilter('json jsonp', function (b, c, d) {
      var e,
        f,
        g,
        h =
          b.jsonp !== !1 &&
          (kc.test(b.url)
            ? 'url'
            : 'string' == typeof b.data &&
              0 ===
                (b.contentType || '').indexOf(
                  'application/x-www-form-urlencoded'
                ) &&
              kc.test(b.data) &&
              'data');
      return h || 'jsonp' === b.dataTypes[0]
        ? ((e = b.jsonpCallback = n.isFunction(b.jsonpCallback)
            ? b.jsonpCallback()
            : b.jsonpCallback),
          h
            ? (b[h] = b[h].replace(kc, '$1' + e))
            : b.jsonp !== !1 &&
              (b.url += (Fb.test(b.url) ? '&' : '?') + b.jsonp + '=' + e),
          (b.converters['script json'] = function () {
            return g || n.error(e + ' was not called'), g[0];
          }),
          (b.dataTypes[0] = 'json'),
          (f = a[e]),
          (a[e] = function () {
            g = arguments;
          }),
          d.always(function () {
            void 0 === f ? n(a).removeProp(e) : (a[e] = f),
              b[e] && ((b.jsonpCallback = c.jsonpCallback), jc.push(e)),
              g && n.isFunction(f) && f(g[0]),
              (g = f = void 0);
          }),
          'script')
        : void 0;
    }),
    (n.parseHTML = function (a, b, c) {
      if (!a || 'string' != typeof a) return null;
      'boolean' == typeof b && ((c = b), (b = !1)), (b = b || d);
      var e = x.exec(a),
        f = !c && [];
      return e
        ? [b.createElement(e[1])]
        : ((e = ja([a], b, f)),
          f && f.length && n(f).remove(),
          n.merge([], e.childNodes));
    });
  var lc = n.fn.load;
  (n.fn.load = function (a, b, c) {
    if ('string' != typeof a && lc) return lc.apply(this, arguments);
    var d,
      e,
      f,
      g = this,
      h = a.indexOf(' ');
    return (
      h > -1 && ((d = n.trim(a.slice(h, a.length))), (a = a.slice(0, h))),
      n.isFunction(b)
        ? ((c = b), (b = void 0))
        : b && 'object' == typeof b && (e = 'POST'),
      g.length > 0 &&
        n
          .ajax({ url: a, type: e || 'GET', dataType: 'html', data: b })
          .done(function (a) {
            (f = arguments),
              g.html(d ? n('<div>').append(n.parseHTML(a)).find(d) : a);
          })
          .always(
            c &&
              function (a, b) {
                g.each(function () {
                  c.apply(this, f || [a.responseText, b, a]);
                });
              }
          ),
      this
    );
  }),
    n.each(
      [
        'ajaxStart',
        'ajaxStop',
        'ajaxComplete',
        'ajaxError',
        'ajaxSuccess',
        'ajaxSend',
      ],
      function (a, b) {
        n.fn[b] = function (a) {
          return this.on(b, a);
        };
      }
    ),
    (n.expr.filters.animated = function (a) {
      return n.grep(n.timers, function (b) {
        return a === b.elem;
      }).length;
    });
  function mc(a) {
    return n.isWindow(a)
      ? a
      : 9 === a.nodeType
      ? a.defaultView || a.parentWindow
      : !1;
  }
  (n.offset = {
    setOffset: function (a, b, c) {
      var d,
        e,
        f,
        g,
        h,
        i,
        j,
        k = n.css(a, 'position'),
        l = n(a),
        m = {};
      'static' === k && (a.style.position = 'relative'),
        (h = l.offset()),
        (f = n.css(a, 'top')),
        (i = n.css(a, 'left')),
        (j =
          ('absolute' === k || 'fixed' === k) &&
          n.inArray('auto', [f, i]) > -1),
        j
          ? ((d = l.position()), (g = d.top), (e = d.left))
          : ((g = parseFloat(f) || 0), (e = parseFloat(i) || 0)),
        n.isFunction(b) && (b = b.call(a, c, n.extend({}, h))),
        null != b.top && (m.top = b.top - h.top + g),
        null != b.left && (m.left = b.left - h.left + e),
        'using' in b ? b.using.call(a, m) : l.css(m);
    },
  }),
    n.fn.extend({
      offset: function (a) {
        if (arguments.length)
          return void 0 === a
            ? this
            : this.each(function (b) {
                n.offset.setOffset(this, a, b);
              });
        var b,
          c,
          d = { top: 0, left: 0 },
          e = this[0],
          f = e && e.ownerDocument;
        if (f)
          return (
            (b = f.documentElement),
            n.contains(b, e)
              ? ('undefined' != typeof e.getBoundingClientRect &&
                  (d = e.getBoundingClientRect()),
                (c = mc(f)),
                {
                  top:
                    d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
                  left:
                    d.left +
                    (c.pageXOffset || b.scrollLeft) -
                    (b.clientLeft || 0),
                })
              : d
          );
      },
      position: function () {
        if (this[0]) {
          var a,
            b,
            c = { top: 0, left: 0 },
            d = this[0];
          return (
            'fixed' === n.css(d, 'position')
              ? (b = d.getBoundingClientRect())
              : ((a = this.offsetParent()),
                (b = this.offset()),
                n.nodeName(a[0], 'html') || (c = a.offset()),
                (c.top += n.css(a[0], 'borderTopWidth', !0)),
                (c.left += n.css(a[0], 'borderLeftWidth', !0))),
            {
              top: b.top - c.top - n.css(d, 'marginTop', !0),
              left: b.left - c.left - n.css(d, 'marginLeft', !0),
            }
          );
        }
      },
      offsetParent: function () {
        return this.map(function () {
          var a = this.offsetParent;
          while (
            a &&
            !n.nodeName(a, 'html') &&
            'static' === n.css(a, 'position')
          )
            a = a.offsetParent;
          return a || Qa;
        });
      },
    }),
    n.each(
      { scrollLeft: 'pageXOffset', scrollTop: 'pageYOffset' },
      function (a, b) {
        var c = /Y/.test(b);
        n.fn[a] = function (d) {
          return Y(
            this,
            function (a, d, e) {
              var f = mc(a);
              return void 0 === e
                ? f
                  ? b in f
                    ? f[b]
                    : f.document.documentElement[d]
                  : a[d]
                : void (f
                    ? f.scrollTo(
                        c ? n(f).scrollLeft() : e,
                        c ? e : n(f).scrollTop()
                      )
                    : (a[d] = e));
            },
            a,
            d,
            arguments.length,
            null
          );
        };
      }
    ),
    n.each(['top', 'left'], function (a, b) {
      n.cssHooks[b] = Ua(l.pixelPosition, function (a, c) {
        return c
          ? ((c = Sa(a, b)), Oa.test(c) ? n(a).position()[b] + 'px' : c)
          : void 0;
      });
    }),
    n.each({ Height: 'height', Width: 'width' }, function (a, b) {
      n.each(
        {
          padding: 'inner' + a,
          content: b,
          '': 'outer' + a,
        },
        function (c, d) {
          n.fn[d] = function (d, e) {
            var f = arguments.length && (c || 'boolean' != typeof d),
              g = c || (d === !0 || e === !0 ? 'margin' : 'border');
            return Y(
              this,
              function (b, c, d) {
                var e;
                return n.isWindow(b)
                  ? b.document.documentElement['client' + a]
                  : 9 === b.nodeType
                  ? ((e = b.documentElement),
                    Math.max(
                      b.body['scroll' + a],
                      e['scroll' + a],
                      b.body['offset' + a],
                      e['offset' + a],
                      e['client' + a]
                    ))
                  : void 0 === d
                  ? n.css(b, c, g)
                  : n.style(b, c, d, g);
              },
              b,
              f ? d : void 0,
              f,
              null
            );
          };
        }
      );
    }),
    n.fn.extend({
      bind: function (a, b, c) {
        return this.on(a, null, b, c);
      },
      unbind: function (a, b) {
        return this.off(a, null, b);
      },
      delegate: function (a, b, c, d) {
        return this.on(b, a, c, d);
      },
      undelegate: function (a, b, c) {
        return 1 === arguments.length
          ? this.off(a, '**')
          : this.off(b, a || '**', c);
      },
    }),
    (n.fn.size = function () {
      return this.length;
    }),
    (n.fn.andSelf = n.fn.addBack),
    'function' == typeof define &&
      define.amd &&
      define('jquery', [], function () {
        return n;
      });
  var nc = a.jQuery,
    oc = a.$;
  return (
    (n.noConflict = function (b) {
      return a.$ === n && (a.$ = oc), b && a.jQuery === n && (a.jQuery = nc), n;
    }),
    b || (a.jQuery = a.$ = n),
    n
  );
});
/* jQuery end */

/* jQuery Migrate begin */
/*! jQuery Migrate v1.4.1 | (c) jQuery Foundation and other contributors | jquery.org/license */
'undefined' == typeof jQuery.migrateMute && (jQuery.migrateMute = !0),
  (function (a, b, c) {
    function d(c) {
      var d = b.console;
      f[c] ||
        ((f[c] = !0),
        a.migrateWarnings.push(c),
        d &&
          d.warn &&
          !a.migrateMute &&
          (d.warn('JQMIGRATE: ' + c), a.migrateTrace && d.trace && d.trace()));
    }
    function e(b, c, e, f) {
      if (Object.defineProperty)
        try {
          return void Object.defineProperty(b, c, {
            configurable: !0,
            enumerable: !0,
            get: function () {
              return d(f), e;
            },
            set: function (a) {
              d(f), (e = a);
            },
          });
        } catch (g) {}
      (a._definePropertyBroken = !0), (b[c] = e);
    }
    a.migrateVersion = '1.4.1';
    var f = {};
    (a.migrateWarnings = []),
      b.console &&
        b.console.log &&
        b.console.log(
          'JQMIGRATE: Migrate is installed' +
            (a.migrateMute ? '' : ' with logging active') +
            ', version ' +
            a.migrateVersion
        ),
      a.migrateTrace === c && (a.migrateTrace = !0),
      (a.migrateReset = function () {
        (f = {}), (a.migrateWarnings.length = 0);
      }),
      'BackCompat' === document.compatMode &&
        d('jQuery is not compatible with Quirks Mode');
    var g = a('<input/>', { size: 1 }).attr('size') && a.attrFn,
      h = a.attr,
      i =
        (a.attrHooks.value && a.attrHooks.value.get) ||
        function () {
          return null;
        },
      j =
        (a.attrHooks.value && a.attrHooks.value.set) ||
        function () {
          return c;
        },
      k = /^(?:input|button)$/i,
      l = /^[238]$/,
      m = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
      n = /^(?:checked|selected)$/i;
    e(a, 'attrFn', g || {}, 'jQuery.attrFn is deprecated'),
      (a.attr = function (b, e, f, i) {
        var j = e.toLowerCase(),
          o = b && b.nodeType;
        return i &&
          (h.length < 4 && d('jQuery.fn.attr( props, pass ) is deprecated'),
          b && !l.test(o) && (g ? e in g : a.isFunction(a.fn[e])))
          ? a(b)[e](f)
          : ('type' === e &&
              f !== c &&
              k.test(b.nodeName) &&
              b.parentNode &&
              d("Can't change the 'type' of an input or button in IE 6/7/8"),
            !a.attrHooks[j] &&
              m.test(j) &&
              ((a.attrHooks[j] = {
                get: function (b, d) {
                  var e,
                    f = a.prop(b, d);
                  return f === !0 ||
                    ('boolean' != typeof f &&
                      (e = b.getAttributeNode(d)) &&
                      e.nodeValue !== !1)
                    ? d.toLowerCase()
                    : c;
                },
                set: function (b, c, d) {
                  var e;
                  return (
                    c === !1
                      ? a.removeAttr(b, d)
                      : ((e = a.propFix[d] || d),
                        e in b && (b[e] = !0),
                        b.setAttribute(d, d.toLowerCase())),
                    d
                  );
                },
              }),
              n.test(j) &&
                d(
                  "jQuery.fn.attr('" +
                    j +
                    "') might use property instead of attribute"
                )),
            h.call(a, b, e, f));
      }),
      (a.attrHooks.value = {
        get: function (a, b) {
          var c = (a.nodeName || '').toLowerCase();
          return 'button' === c
            ? i.apply(this, arguments)
            : ('input' !== c &&
                'option' !== c &&
                d("jQuery.fn.attr('value') no longer gets properties"),
              b in a ? a.value : null);
        },
        set: function (a, b) {
          var c = (a.nodeName || '').toLowerCase();
          return 'button' === c
            ? j.apply(this, arguments)
            : ('input' !== c &&
                'option' !== c &&
                d("jQuery.fn.attr('value', val) no longer sets properties"),
              void (a.value = b));
        },
      });
    var o,
      p,
      q = a.fn.init,
      r = a.find,
      s = a.parseJSON,
      t = /^\s*</,
      u = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/,
      v = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g,
      w = /^([^<]*)(<[\w\W]+>)([^>]*)$/;
    (a.fn.init = function (b, e, f) {
      var g, h;
      return b &&
        'string' == typeof b &&
        !a.isPlainObject(e) &&
        (g = w.exec(a.trim(b))) &&
        g[0] &&
        (t.test(b) || d("$(html) HTML strings must start with '<' character"),
        g[3] && d('$(html) HTML text after last tag is ignored'),
        '#' === g[0].charAt(0) &&
          (d("HTML string cannot start with a '#' character"),
          a.error('JQMIGRATE: Invalid selector string (XSS)')),
        e && e.context && e.context.nodeType && (e = e.context),
        a.parseHTML)
        ? q.call(
            this,
            a.parseHTML(g[2], (e && e.ownerDocument) || e || document, !0),
            e,
            f
          )
        : ((h = q.apply(this, arguments)),
          b && b.selector !== c
            ? ((h.selector = b.selector), (h.context = b.context))
            : ((h.selector = 'string' == typeof b ? b : ''),
              b && (h.context = b.nodeType ? b : e || document)),
          h);
    }),
      (a.fn.init.prototype = a.fn),
      (a.find = function (a) {
        var b = Array.prototype.slice.call(arguments);
        if ('string' == typeof a && u.test(a))
          try {
            document.querySelector(a);
          } catch (c) {
            a = a.replace(v, function (a, b, c, d) {
              return '[' + b + c + '"' + d + '"]';
            });
            try {
              document.querySelector(a),
                d("Attribute selector with '#' must be quoted: " + b[0]),
                (b[0] = a);
            } catch (e) {
              d("Attribute selector with '#' was not fixed: " + b[0]);
            }
          }
        return r.apply(this, b);
      });
    var x;
    for (x in r)
      Object.prototype.hasOwnProperty.call(r, x) && (a.find[x] = r[x]);
    (a.parseJSON = function (a) {
      return a
        ? s.apply(this, arguments)
        : (d('jQuery.parseJSON requires a valid JSON string'), null);
    }),
      (a.uaMatch = function (a) {
        a = a.toLowerCase();
        var b =
          /(chrome)[ \/]([\w.]+)/.exec(a) ||
          /(webkit)[ \/]([\w.]+)/.exec(a) ||
          /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) ||
          /(msie) ([\w.]+)/.exec(a) ||
          (a.indexOf('compatible') < 0 &&
            /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)) ||
          [];
        return { browser: b[1] || '', version: b[2] || '0' };
      }),
      a.browser ||
        ((o = a.uaMatch(navigator.userAgent)),
        (p = {}),
        o.browser && ((p[o.browser] = !0), (p.version = o.version)),
        p.chrome ? (p.webkit = !0) : p.webkit && (p.safari = !0),
        (a.browser = p)),
      e(a, 'browser', a.browser, 'jQuery.browser is deprecated'),
      (a.boxModel = a.support.boxModel = 'CSS1Compat' === document.compatMode),
      e(a, 'boxModel', a.boxModel, 'jQuery.boxModel is deprecated'),
      e(
        a.support,
        'boxModel',
        a.support.boxModel,
        'jQuery.support.boxModel is deprecated'
      ),
      (a.sub = function () {
        function b(a, c) {
          return new b.fn.init(a, c);
        }
        a.extend(!0, b, this),
          (b.superclass = this),
          (b.fn = b.prototype = this()),
          (b.fn.constructor = b),
          (b.sub = this.sub),
          (b.fn.init = function (d, e) {
            var f = a.fn.init.call(this, d, e, c);
            return f instanceof b ? f : b(f);
          }),
          (b.fn.init.prototype = b.fn);
        var c = b(document);
        return d('jQuery.sub() is deprecated'), b;
      }),
      (a.fn.size = function () {
        return (
          d('jQuery.fn.size() is deprecated; use the .length property'),
          this.length
        );
      });
    var y = !1;
    a.swap &&
      a.each(['height', 'width', 'reliableMarginRight'], function (b, c) {
        var d = a.cssHooks[c] && a.cssHooks[c].get;
        d &&
          (a.cssHooks[c].get = function () {
            var a;
            return (y = !0), (a = d.apply(this, arguments)), (y = !1), a;
          });
      }),
      (a.swap = function (a, b, c, e) {
        var f,
          g,
          h = {};
        y || d('jQuery.swap() is undocumented and deprecated');
        for (g in b) (h[g] = a.style[g]), (a.style[g] = b[g]);
        f = c.apply(a, e || []);
        for (g in b) a.style[g] = h[g];
        return f;
      }),
      a.ajaxSetup({ converters: { 'text json': a.parseJSON } });
    var z = a.fn.data;
    a.fn.data = function (b) {
      var e,
        f,
        g = this[0];
      return !g ||
        'events' !== b ||
        1 !== arguments.length ||
        ((e = a.data(g, b)),
        (f = a._data(g, b)),
        (e !== c && e !== f) || f === c)
        ? z.apply(this, arguments)
        : (d("Use of jQuery.fn.data('events') is deprecated"), f);
    };
    var A = /\/(java|ecma)script/i;
    a.clean ||
      (a.clean = function (b, c, e, f) {
        (c = c || document),
          (c = (!c.nodeType && c[0]) || c),
          (c = c.ownerDocument || c),
          d('jQuery.clean() is deprecated');
        var g,
          h,
          i,
          j,
          k = [];
        if ((a.merge(k, a.buildFragment(b, c).childNodes), e))
          for (
            i = function (a) {
              return !a.type || A.test(a.type)
                ? f
                  ? f.push(a.parentNode ? a.parentNode.removeChild(a) : a)
                  : e.appendChild(a)
                : void 0;
            },
              g = 0;
            null != (h = k[g]);
            g++
          )
            (a.nodeName(h, 'script') && i(h)) ||
              (e.appendChild(h),
              'undefined' != typeof h.getElementsByTagName &&
                ((j = a.grep(a.merge([], h.getElementsByTagName('script')), i)),
                k.splice.apply(k, [g + 1, 0].concat(j)),
                (g += j.length)));
        return k;
      });
    var B = a.event.add,
      C = a.event.remove,
      D = a.event.trigger,
      E = a.fn.toggle,
      F = a.fn.live,
      G = a.fn.die,
      H = a.fn.load,
      I = 'ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess',
      J = new RegExp('\\b(?:' + I + ')\\b'),
      K = /(?:^|\s)hover(\.\S+|)\b/,
      L = function (b) {
        return 'string' != typeof b || a.event.special.hover
          ? b
          : (K.test(b) &&
              d(
                "'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"
              ),
            b && b.replace(K, 'mouseenter$1 mouseleave$1'));
      };
    a.event.props &&
      'attrChange' !== a.event.props[0] &&
      a.event.props.unshift(
        'attrChange',
        'attrName',
        'relatedNode',
        'srcElement'
      ),
      a.event.dispatch &&
        e(
          a.event,
          'handle',
          a.event.dispatch,
          'jQuery.event.handle is undocumented and deprecated'
        ),
      (a.event.add = function (a, b, c, e, f) {
        a !== document &&
          J.test(b) &&
          d('AJAX events should be attached to document: ' + b),
          B.call(this, a, L(b || ''), c, e, f);
      }),
      (a.event.remove = function (a, b, c, d, e) {
        C.call(this, a, L(b) || '', c, d, e);
      }),
      a.each(['load', 'unload', 'error'], function (b, c) {
        a.fn[c] = function () {
          var a = Array.prototype.slice.call(arguments, 0);
          return 'load' === c && 'string' == typeof a[0]
            ? H.apply(this, a)
            : (d('jQuery.fn.' + c + '() is deprecated'),
              a.splice(0, 0, c),
              arguments.length
                ? this.bind.apply(this, a)
                : (this.triggerHandler.apply(this, a), this));
        };
      }),
      (a.fn.toggle = function (b, c) {
        if (!a.isFunction(b) || !a.isFunction(c))
          return E.apply(this, arguments);
        d('jQuery.fn.toggle(handler, handler...) is deprecated');
        var e = arguments,
          f = b.guid || a.guid++,
          g = 0,
          h = function (c) {
            var d = (a._data(this, 'lastToggle' + b.guid) || 0) % g;
            return (
              a._data(this, 'lastToggle' + b.guid, d + 1),
              c.preventDefault(),
              e[d].apply(this, arguments) || !1
            );
          };
        for (h.guid = f; g < e.length; ) e[g++].guid = f;
        return this.click(h);
      }),
      (a.fn.live = function (b, c, e) {
        return (
          d('jQuery.fn.live() is deprecated'),
          F
            ? F.apply(this, arguments)
            : (a(this.context).on(b, this.selector, c, e), this)
        );
      }),
      (a.fn.die = function (b, c) {
        return (
          d('jQuery.fn.die() is deprecated'),
          G
            ? G.apply(this, arguments)
            : (a(this.context).off(b, this.selector || '**', c), this)
        );
      }),
      (a.event.trigger = function (a, b, c, e) {
        return (
          c || J.test(a) || d('Global events are undocumented and deprecated'),
          D.call(this, a, b, c || document, e)
        );
      }),
      a.each(I.split('|'), function (b, c) {
        a.event.special[c] = {
          setup: function () {
            var b = this;
            return (
              b !== document &&
                (a.event.add(document, c + '.' + a.guid, function () {
                  a.event.trigger(
                    c,
                    Array.prototype.slice.call(arguments, 1),
                    b,
                    !0
                  );
                }),
                a._data(this, c, a.guid++)),
              !1
            );
          },
          teardown: function () {
            return (
              this !== document &&
                a.event.remove(document, c + '.' + a._data(this, c)),
              !1
            );
          },
        };
      }),
      (a.event.special.ready = {
        setup: function () {
          this === document && d("'ready' event is deprecated");
        },
      });
    var M = a.fn.andSelf || a.fn.addBack,
      N = a.fn.find;
    if (
      ((a.fn.andSelf = function () {
        return (
          d('jQuery.fn.andSelf() replaced by jQuery.fn.addBack()'),
          M.apply(this, arguments)
        );
      }),
      (a.fn.find = function (a) {
        var b = N.apply(this, arguments);
        return (
          (b.context = this.context),
          (b.selector = this.selector ? this.selector + ' ' + a : a),
          b
        );
      }),
      a.Callbacks)
    ) {
      var O = a.Deferred,
        P = [
          [
            'resolve',
            'done',
            a.Callbacks('once memory'),
            a.Callbacks('once memory'),
            'resolved',
          ],
          [
            'reject',
            'fail',
            a.Callbacks('once memory'),
            a.Callbacks('once memory'),
            'rejected',
          ],
          ['notify', 'progress', a.Callbacks('memory'), a.Callbacks('memory')],
        ];
      a.Deferred = function (b) {
        var c = O(),
          e = c.promise();
        return (
          (c.pipe = e.pipe = function () {
            var b = arguments;
            return (
              d('deferred.pipe() is deprecated'),
              a
                .Deferred(function (d) {
                  a.each(P, function (f, g) {
                    var h = a.isFunction(b[f]) && b[f];
                    c[g[1]](function () {
                      var b = h && h.apply(this, arguments);
                      b && a.isFunction(b.promise)
                        ? b
                            .promise()
                            .done(d.resolve)
                            .fail(d.reject)
                            .progress(d.notify)
                        : d[g[0] + 'With'](
                            this === e ? d.promise() : this,
                            h ? [b] : arguments
                          );
                    });
                  }),
                    (b = null);
                })
                .promise()
            );
          }),
          (c.isResolved = function () {
            return (
              d('deferred.isResolved is deprecated'), 'resolved' === c.state()
            );
          }),
          (c.isRejected = function () {
            return (
              d('deferred.isRejected is deprecated'), 'rejected' === c.state()
            );
          }),
          b && b.call(c, c),
          c
        );
      };
    }
  })(jQuery, window);
/* jQuery Migrate end */

/*
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 * Unlicensed use is strictly prohibited
 *
 * v13.2.6355.27565
 */
window.MadCap = {};
MadCap.CreateNamespace = function (b) {
  var d = b.split('.');
  var e = MadCap;
  for (var a = 0, c = d.length; a < c; a++) {
    var b = d[a];
    if (b == 'MadCap') {
      continue;
    }
    if (typeof e[b] != 'undefined') {
      e = e[b];
      continue;
    }
    e[b] = {};
    e = e[b];
  }
  return e;
};
if (!Object.create) {
  Object.create = function (b) {
    if (arguments.length > 1) {
      throw new Error(
        'Object.create implementation only accepts the first parameter.'
      );
    }
    function a() {}
    a.prototype = b;
    return new a();
  };
}
if (typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  };
}
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (b) {
    var a = this.length >>> 0;
    var c = Number(arguments[1]) || 0;
    c = c < 0 ? Math.ceil(c) : Math.floor(c);
    if (c < 0) {
      c += a;
    }
    for (; c < a; c++) {
      if (c in this && this[c] === b) {
        return c;
      }
    }
    return -1;
  };
}
MadCap.Extend = function (a, b) {
  b.prototype = Object.create(a.prototype);
  b.prototype.constructor = b;
  b.prototype.base = a.prototype;
};
MadCap.Exception = function (b, a) {
  this.Number = b;
  this.Message = a;
};
MadCap.IsIOS = function () {
  return (
    MadCap.String.Contains(navigator.userAgent, 'iphone') ||
    MadCap.String.Contains(navigator.userAgent, 'ipad')
  );
};
MadCap.IsIBooks = function () {
  return (
    MadCap.HasEpubReadingSystem() &&
    navigator.epubReadingSystem.name == 'iBooks'
  );
};
MadCap.HasEpubReadingSystem = function () {
  return 'epubReadingSystem' in navigator;
};
MadCap.IsSafari = function () {
  return (
    MadCap.String.Contains(navigator.userAgent, 'safari') &&
    !MadCap.String.Contains(navigator.userAgent, 'chrome')
  );
};
(function () {
  var a = MadCap.CreateNamespace('String');
  a.IsNullOrEmpty = function (b) {
    if (b == null) {
      return true;
    }
    if (b.length == 0) {
      return true;
    }
    return false;
  };
  a.StartsWith = function (f, e, c) {
    if (e == null) {
      return false;
    }
    if (f.length < e.length) {
      return false;
    }
    var d = f;
    var b = e;
    if (!c) {
      d = d.toLowerCase();
      b = b.toLowerCase();
    }
    if (d.substring(0, b.length) == b) {
      return true;
    } else {
      return false;
    }
  };
  a.EndsWith = function (f, e, c) {
    if (e == null) {
      return false;
    }
    if (f.length < e.length) {
      return false;
    }
    var d = f;
    var b = e;
    if (!c) {
      d = d.toLowerCase();
      b = b.toLowerCase();
    }
    if (d.substring(d.length - b.length) == b) {
      return true;
    } else {
      return false;
    }
  };
  a.Contains = function (h, g, c) {
    var d = c ? h : h.toLowerCase();
    if ($.isArray(g)) {
      for (var e = 0, f = g.length; e < f; e++) {
        var b = c ? g[e] : g[e].toLowerCase();
        if (d.indexOf(b) != -1) {
          return true;
        }
      }
      return false;
    }
    var b = c ? g : g.toLowerCase();
    return d.indexOf(b) != -1;
  };
  a.Trim = function (b) {
    return a.TrimRight(a.TrimLeft(b));
  };
  a.TrimLeft = function (d) {
    var b = 0;
    var c = d.length;
    for (b = 0; b < c && d.charAt(b) == ' '; b++) {}
    return d.substring(b, d.length);
  };
  a.TrimRight = function (c) {
    var b = 0;
    for (b = c.length - 1; b >= 0 && c.charAt(b) == ' '; b--) {}
    return c.substring(0, b + 1);
  };
  a.ToBool = function (e, c) {
    var b = c;
    if (e != null) {
      var d = e.toLowerCase();
      if (
        d != 'true' &&
        d != 'false' &&
        d != '1' &&
        d != '0' &&
        d != 'yes' &&
        d != 'no'
      ) {
        throw new MadCap.Exception(
          -1,
          'The string can not be converted to a boolean value.'
        );
      }
      b = d == 'true' || d == '1' || d == 'yes';
    }
    return b;
  };
  a.ToInt = function (d, b) {
    var c = b;
    if (d != null) {
      c = parseInt(d);
    }
    return c;
  };
  a.ToDashed = function (b) {
    return b.replace(/([A-Z])/g, function (c) {
      return '-' + c.toLowerCase();
    });
  };
  a.LocaleCompare = function (d, c, e) {
    if (e) {
      if (typeof Intl !== 'undefined' && typeof Intl.Collator !== 'undefined') {
        var b = new Intl.Collator(e);
        if (b) {
          return b.compare(d, c);
        }
      }
      if (String.prototype.localeCompare) {
        return d.localeCompare(c, e);
      }
    }
    return d < c ? -1 : d > c ? 1 : 0;
  };
  a.Compare = function (f, e) {
    var h = f.length;
    var g = e.length;
    for (var d = 0; d < h && d < g; d++) {
      var c = f.charCodeAt(d);
      var b = e.charCodeAt(d);
      if (c < b) {
        return -1;
      } else {
        if (c > b) {
          return 1;
        }
      }
    }
    if (h < g) {
      return -1;
    } else {
      if (h > g) {
        return 1;
      } else {
        return 0;
      }
    }
  };
  a.IsPunctuation = function (b) {
    var d = b.charCodeAt(0);
    return (
      (d >= 33 && d <= 35) ||
      (d >= 37 && d <= 42) ||
      (d >= 44 && d <= 47) ||
      d == 58 ||
      d == 59 ||
      d == 63 ||
      d == 64 ||
      (d >= 91 && d <= 93) ||
      d == 95 ||
      d == 123 ||
      d == 125 ||
      d == 161 ||
      d == 171 ||
      d == 173 ||
      d == 183 ||
      d == 187 ||
      d == 191 ||
      d == 894 ||
      d == 903 ||
      (d >= 1370 && d <= 1375) ||
      d == 1417 ||
      d == 1418 ||
      d == 1470 ||
      d == 1472 ||
      d == 1475 ||
      d == 1478 ||
      d == 1523 ||
      d == 1524 ||
      d == 1548 ||
      d == 1549 ||
      d == 1563 ||
      d == 1566 ||
      d == 1567 ||
      (d >= 1642 && d <= 1645) ||
      d == 1748 ||
      (d >= 1792 && d <= 1805) ||
      (d >= 2039 && d <= 2041) ||
      d == 2404 ||
      d == 2405 ||
      d == 2416 ||
      d == 3572 ||
      (d >= 3663 && d <= 3675) ||
      (d >= 3844 && d <= 3858) ||
      (d >= 3898 && d <= 3901) ||
      d == 3973 ||
      d == 4048 ||
      d == 4049 ||
      (d >= 4170 && d <= 4175) ||
      d == 4347 ||
      (d >= 4961 && d <= 4968) ||
      d == 5741 ||
      d == 5742 ||
      d == 5787 ||
      d == 5788 ||
      (d >= 5867 && d <= 5869) ||
      d == 5941 ||
      d == 5942 ||
      (d >= 6100 && d <= 6102) ||
      (d >= 6104 && d <= 6106) ||
      (d >= 6144 && d <= 6154) ||
      d == 6468 ||
      d == 6469 ||
      d == 6622 ||
      d == 6623 ||
      d == 6686 ||
      d == 6687 ||
      (d >= 7002 && d <= 7008) ||
      (d >= 8208 && d <= 8231) ||
      (d >= 8240 && d <= 8259) ||
      (d >= 8261 && d <= 8273) ||
      (d >= 8275 && d <= 8286) ||
      d == 8317 ||
      d == 8318 ||
      d == 8333 ||
      d == 8334 ||
      d == 9001 ||
      d == 9002 ||
      (d >= 10088 && d <= 10101) ||
      (d >= 10181 && d <= 10182) ||
      (d >= 10214 && d <= 10219) ||
      (d >= 10627 && d <= 10648) ||
      (d >= 10712 && d <= 10715) ||
      d == 10748 ||
      d == 10749 ||
      (d >= 11513 && d <= 11516) ||
      d == 11518 ||
      d == 11519 ||
      (d >= 11776 && d <= 11799) ||
      d == 11804 ||
      d == 11805 ||
      (d >= 12289 && d <= 12291) ||
      (d >= 12296 && d <= 12305) ||
      (d >= 12308 && d <= 12319) ||
      d == 12336 ||
      d == 12349 ||
      d == 12448 ||
      d == 12539 ||
      (d >= 43124 && d <= 43127) ||
      d == 64830 ||
      d == 64831 ||
      (d >= 65040 && d <= 65049) ||
      (d >= 65072 && d <= 65106) ||
      (d >= 65108 && d <= 65121) ||
      d == 65123 ||
      d == 65128 ||
      d == 65130 ||
      d == 65131 ||
      (d >= 65281 && d <= 65283) ||
      (d >= 65285 && d <= 65290) ||
      (d >= 65292 && d <= 65295) ||
      d == 65306 ||
      d == 65307 ||
      d == 65311 ||
      d == 65312 ||
      (d >= 65339 && d <= 65341) ||
      d == 65343 ||
      d == 65371 ||
      d == 65373 ||
      (d >= 65375 && d <= 65381)
    );
  };
  a.Split = function (h, g) {
    var c = h.length;
    var f = [];
    var b = -1,
      d = -1;
    for (var e = 0; e <= c; e++) {
      if (e == c || g(h.charAt(e))) {
        if (b > -1) {
          f.push(h.slice(b, d));
          b = -1;
        }
      } else {
        if (b == -1) {
          b = e;
        }
        d = e + 1;
      }
    }
    return f;
  };
})();
(function () {
  MadCap.CreateNamespace('DEBUG');
  var a = MadCap.DEBUG;
  a.Log = {};
  a.Log.Create = function () {
    var e = document.createElement('div');
    e.setAttribute('id', 'DEBUG_Log');
    var f = document.createElement('div');
    $(f).addClass('MCDebugLogHeader');
    f.appendChild(document.createTextNode('Log Console'));
    e.appendChild(f);
    var d = document.createElement('div');
    $(d).addClass('MCDebugLogBody');
    e.appendChild(d);
    var c = document.createElement('div');
    $(c).addClass('MCDebugLogFooter');
    e.appendChild(c);
    document.body.appendChild(e);
    var b = new MadCap.DragDrop(e, f);
  };
  a.Log._LoadTime = new Date();
  a.Log.AddLine = function (d) {
    if (parent != window) {
      MadCap.Utilities.CrossFrame.PostMessageRequest(
        parent,
        'DEBUG-AddLine',
        [d],
        null
      );
      return;
    }
    var f = document.getElementById('DEBUG_Log');
    if (f == null) {
      return;
    }
    var c = new Date();
    var h = c - a.Log._LoadTime;
    var e = document.createElement('p');
    $(e).addClass('MCDebugLogEntryTime');
    e.appendChild(document.createTextNode(h + 'ms ' + c.toLocaleTimeString()));
    var b = document.createElement('div');
    $(b).addClass('MCDebugLogEntry');
    b.appendChild(e);
    b.appendChild(document.createTextNode(d));
    var g = MadCap.Dom.GetElementsByClassName('MCDebugLogBody', 'div', f)[0];
    g.insertBefore(b, g.firstChild);
  };
})();
/*
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 * Unlicensed use is strictly prohibited
 *
 * v13.2.6355.27565
 */
(function () {
  MadCap.CreateNamespace('Dom');
  var a = MadCap.Dom;
  a.Dataset = function (c, b) {
    return c.getAttribute('data-' + MadCap.String.ToDashed(b));
  };
  a.GetElementsByClassName = function (g, b, c) {
    b = b || '*';
    c = c || document;
    var d = new Array();
    var j = c.getElementsByTagName(b);
    for (var e = 0, h = j.length; e < h; e++) {
      var f = j[e];
      if ($(f).hasClass(g)) {
        d[d.length] = f;
      }
    }
    return d;
  };
  a.GetElementsByAttribute = function (h, k, l, j) {
    l = l || '*';
    j = j || document;
    var c = new Array();
    var b = j.getElementsByTagName(l);
    for (var g = 0, e = b.length; g < e; g++) {
      var d = b[g];
      var f = a.GetAttribute(d, h);
      if (f == k) {
        c[c.length] = d;
      }
    }
    return c;
  };
  a.GetChildNodeByTagName = function (d, f, e) {
    var c = null;
    var g = -1;
    for (var b = d.firstChild; b != null; b = b.nextSibling) {
      if (b.nodeName.toLowerCase() == f.toLowerCase()) {
        g++;
        if (g == e) {
          c = b;
          break;
        }
      }
    }
    return c;
  };
  a.GetAncestorNodeByTagName = function (d, e, f) {
    f = f || document.body;
    var c = null;
    var b = d.parentNode;
    while (b != null && b != f) {
      if (b.nodeName.toLowerCase() == e.toLowerCase()) {
        c = b;
        break;
      }
      b = b.parentNode;
    }
    return c;
  };
  a.GetAttribute = function (b, e) {
    var d = b.getAttribute(e);
    if (d == null) {
      d = b.getAttribute(e.toLowerCase());
      if (d == null) {
        var c = e.indexOf(':');
        if (c != -1) {
          d = b.getAttribute(e.substring(c + 1, e.length));
        }
      }
    }
    return d;
  };
  a.GetAttributeInt = function (e, c, b) {
    var d = b;
    var f = a.GetAttribute(e, c);
    if (f != null) {
      d = parseInt(f);
    }
    return d;
  };
  a.GetAttributeBool = function (e, d, c) {
    var b = c;
    var f = a.GetAttribute(e, d);
    if (f != null) {
      b = MadCap.String.ToBool(f, c);
    }
    return b;
  };
  a.GetScrollPosition = function () {
    var b = 0;
    var c = 0;
    if (typeof window.pageYOffset != 'undefined') {
      b = window.pageXOffset;
      c = window.pageYOffset;
    } else {
      if (
        typeof document.documentElement.scrollTop != 'undefined' &&
        document.documentElement.scrollTop > 0
      ) {
        b = document.documentElement.scrollLeft;
        c = document.documentElement.scrollTop;
      }
    }
    return { X: b, Y: c };
  };
})();
/*
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 * Unlicensed use is strictly prohibited
 *
 * v13.2.6355.27565
 */
(function () {
  MadCap.CreateNamespace('Utilities');
  MadCap.Utilities.Dictionary = function (f) {
    this._Map = new Object();
    this._Overflows = new Array();
    this._Length = 0;
    this._IgnoreCase = f == true;
  };
  var a = MadCap.Utilities.Dictionary;
  a.prototype.GetLength = function (f) {
    return this._Length;
  };
  a.prototype.ForEach = function (j) {
    var f = this._Map;
    for (var n in f) {
      var m = f[n];
      var l = j(n, m);
      if (l != undefined && !l) {
        return;
      }
    }
    var h = this._Overflows;
    for (var k = 0, g = h.length; k < g; k++) {
      var o = h[k];
      var l = j(o.Key, o.Value);
      if (l != undefined && !l) {
        return;
      }
    }
  };
  a.prototype.GetItem = function (g) {
    if (this._IgnoreCase) {
      g = g.toLowerCase();
    }
    var h = null;
    if (typeof this._Map[g] == 'function') {
      var f = this.GetItemOverflowIndex(g);
      if (f >= 0) {
        h = this._Overflows[f].Value;
      }
    } else {
      h = this._Map[g];
      if (typeof h == 'undefined') {
        h = null;
      }
    }
    return h;
  };
  a.prototype.GetItemOverflowIndex = function (g) {
    if (this._IgnoreCase) {
      g = g.toLowerCase();
    }
    var j = this._Overflows;
    for (var f = 0, h = j.length; f < h; f++) {
      if (j[f].Key == g) {
        return f;
      }
    }
    return -1;
  };
  a.prototype.Remove = function (g) {
    if (this._IgnoreCase) {
      g = g.toLowerCase();
    }
    if (typeof this._Map[g] == 'function') {
      var f = this.GetItemOverflowIndex(g);
      if (f >= 0) {
        this._Overflows.splice(f, 1);
        this._Length--;
      }
    } else {
      if (typeof this._Map[g] != 'undefined') {
        delete this._Map[g];
        this._Length--;
      }
    }
  };
  a.prototype.Add = function (f, h) {
    if (this._IgnoreCase) {
      f = f.toLowerCase();
    }
    if (typeof this._Map[f] == 'function') {
      var g = this.GetItem(f);
      if (g != null) {
        this.Remove(f);
      }
      this._Overflows[this._Overflows.length] = { Key: f, Value: h };
    } else {
      this._Map[f] = h;
    }
    this._Length++;
  };
  a.prototype.AddUnique = function (f, h) {
    if (this._IgnoreCase) {
      f = f.toLowerCase();
    }
    var g = this.GetItem(f);
    if (typeof g == 'undefined' || !g) {
      this.Add(f, h);
    }
  };
  MadCap.Utilities.DateTime = function (h) {
    var g = /\/Date\(([0-9]+)\)\//i;
    var f = g.exec(h);
    if (f != null) {
      this.Date = new Date(parseInt(f[1]));
    } else {
      this.Date = new Date(h);
    }
  };
  var c = MadCap.Utilities.DateTime;
  c.Months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  MadCap.Utilities.TimeSpan = function (g, f) {
    if (typeof g == 'undefined') {
      g = new Date();
    }
    if (typeof f == 'undefined') {
      f = new Date();
    }
    if (g > f) {
      this.FromDate = f;
      this.ToDate = g;
    } else {
      this.FromDate = g;
      this.ToDate = f;
    }
    this.Ticks = this.ToDate - this.FromDate;
    this.Seconds = this.Ticks / 1000;
    this.Minutes = this.Seconds / 60;
    this.Hours = this.Minutes / 60;
    this.Days = this.Hours / 24;
  };
  var b = MadCap.Utilities.TimeSpan;
  b.prototype.ToDurationString = function () {
    if (this.Minutes < 1) {
      return 'Just now';
    }
    if (this.Hours < 1) {
      return parseInt(this.Minutes) + ' minutes ago';
    }
    if (this.Days < 1) {
      return parseInt(this.Hours) + ' hours ago';
    }
    if (this.Days < 30) {
      return parseInt(this.Days) + ' days ago';
    }
    var f = c.Months[this.FromDate.getMonth()] + ' ' + this.FromDate.getDate();
    if (this.FromDate.getFullYear() != this.ToDate.getFullYear()) {
      f += ', ' + this.FromDate.getFullYear();
    }
    return f;
  };
  MadCap.Utilities.Url = function (h) {
    var g = this;
    var f = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
    this._Segments = [];
    this.FullPath = null;
    this.Path = null;
    this.PlainPath = null;
    this.Name = null;
    this.Extension = null;
    this.NameWithExtension = null;
    this.FullFragment = null;
    this.Fragment = null;
    this.Query = null;
    this.Origin = null;
    this.IsAbsolute = false;
    this.IsRootRelative = false;
    this.IsFolder = false;
    this.QueryMap = new MadCap.Utilities.Dictionary(true);
    this.HashMap = new MadCap.Utilities.Dictionary(true);
    (function () {
      var j = '';
      var t = '';
      var l = '';
      var z = '';
      var y = h.indexOf('#');
      var w = h.indexOf('?');
      if (y != -1) {
        t = h.substring(y);
        if (y > w) {
          j = h.substring(y);
        } else {
          j = h.substring(y, w);
        }
      }
      if (w != -1) {
        if (w > y) {
          l = h.substring(w);
        } else {
          l = h.substring(w, y);
        }
      }
      var n = y > -1 ? (w > -1 ? Math.min(y, w) : y) : w;
      var u = h.substring(0, n == -1 ? h.length : n);
      n = u.lastIndexOf('/');
      var s = u.substring(0, n + 1);
      var i = u.substring(n + 1);
      n = i.lastIndexOf('.');
      var A = i.substring(0, n);
      var m = i.substring(n + 1);
      var q = '';
      n = u.indexOf(':');
      if (n >= 0) {
        q = u.substring(0, n);
      }
      var v = !MadCap.String.IsNullOrEmpty(q);
      if (!MadCap.String.IsNullOrEmpty(h)) {
        var o = h;
        if (MadCap.String.EndsWith(o, '/')) {
          o = o.substring(0, o.length - 1);
        }
        g._Segments = o.split('/');
        if (v) {
          var r = h.match(f);
          if (r) {
            if (r[4]) {
              z = r[1] + ':' + r[2] + r[3] + ':' + r[4];
            } else {
              z = r[1] + ':' + r[2] + r[3];
            }
            g.Origin = z;
          }
        }
      }
      g.FullPath = h;
      g.Path = s;
      g.PlainPath = u;
      g.Name = A;
      g.Extension = m;
      g.NameWithExtension = i;
      g.Scheme = q;
      g.IsAbsolute = v;
      g.IsRootRelative = MadCap.String.StartsWith(u, '/', false);
      g.IsFolder = MadCap.String.EndsWith(u, '/');
      g.FullFragment = t;
      g.Fragment = j;
      g.Query = l;
      var p = g.Query;
      if (!MadCap.String.IsNullOrEmpty(p)) {
        p = p.substring(1);
        p = p.replace(/\+/g, ' ');
        x(p, '&', g.QueryMap);
      }
      var k = g.Fragment;
      if (!MadCap.String.IsNullOrEmpty(k)) {
        k = k.substring(1);
        x(k, '&', g.HashMap);
      }
      function x(K, C, B) {
        var H = K.split(C);
        for (var F = 0, D = H.length; F < D; F++) {
          var E = H[F];
          var G = E.indexOf('=');
          var J = null;
          var I = null;
          if (G >= 0) {
            J = decodeURIComponent(E.substring(0, G));
            I = decodeURIComponent(E.substring(G + 1));
          } else {
            J = E;
          }
          B.Add(J, I);
        }
      }
    })();
  };
  var e = MadCap.Utilities.Url;
  e.GetDocumentUrl = function () {
    return new e(document.location.href);
  };
  e.GetAbsolutePath = function (h) {
    var g = e.GetDocumentUrl();
    var f = new MadCap.Utilities.Url(g.PlainPath);
    if (!f.IsFolder) {
      f = f.ToFolder();
    }
    return f.CombinePath(h).FullPath;
  };
  e.StripInvalidCharacters = function (f) {
    return f.replace(/(javascript:|data:|[<>])/gi, '');
  };
  e.ReplaceReservedCharacters = function (f, h) {
    var k = /[ ()&;,!'$]/;
    var j = f.split('');
    for (var g = 0; g < j.length; g++) {
      if (j[g].charCodeAt(0) > 127 || j[g].match(k)) {
        j[g] = h;
      }
    }
    return j.join('');
  };
  e.Navigate = function (f) {
    document.location = e.StripInvalidCharacters(f);
  };
  e.GenerateNavigateTopicPath = function (g) {
    var h = g.IsRootRelative ? g.PlainPath : e.GetAbsolutePath(g.PlainPath);
    var f =
      e.GetDocumentUrl().QueryMap.GetItem('skinName') ||
      g.QueryMap.GetItem('skinName');
    if (f != null) {
      h += '?skinName=' + f;
    }
    if (g.FullFragment.indexOf('#search-') == 0) {
      h += g.FullFragment;
    } else {
      if (g.QueryMap.GetLength() > 0) {
        h += f == null ? '?' : '&';
        g.QueryMap.ForEach(function (j, k) {
          var i = ['skinName', 'highlight'];
          if (k && i.indexOf(j) == -1) {
            h += j + '=' + encodeURIComponent(k) + '&';
          }
        });
        h = h.slice(0, -1);
      }
      h += g.Fragment;
    }
    return h;
  };
  e.NavigateTopic = function (f) {
    var g = e.GenerateNavigateTopicPath(f);
    e.Navigate(g);
  };
  e.OnNavigateTopic = function (h) {
    var f = $(this).attr('href');
    if (typeof f != 'undefined') {
      var i = new e(f);
      if (!MadCap.String.IsNullOrEmpty(f) && !i.IsAbsolute && i.PlainPath) {
        var g = e.GenerateNavigateTopicPath(i);
        if (g != e.GetAbsolutePath(i.PlainPath)) {
          MadCap.Utilities.PreventDefault(h);
          e.Navigate(g);
        }
      } else {
        if (i.HashMap.GetLength() > 0) {
          e.NavigateHash(i.Fragment);
          $(window).trigger('hashchange');
          h.preventDefault();
        }
      }
    }
  };
  e.NavigateHash = function (f) {
    document.location.hash = e.StripInvalidCharacters(f);
  };
  e.CurrentHash = function () {
    return new MadCap.Utilities.Url(document.location.href).FullFragment;
  };
  e.prototype.AddFile = function (i) {
    if (typeof i == 'string') {
      i = new e(i);
    }
    if (i.IsAbsolute) {
      return i;
    }
    var h = i.FullPath;
    if (h.charAt(0) == '/') {
      var j = document.location;
      var k = j.href.lastIndexOf(j.pathname);
      var g = j.href.substring(0, k);
      return new e(g + h);
    }
    var f = this.FullPath;
    if (!MadCap.String.EndsWith(f, '/')) {
      f = f + '/';
    }
    return new e(f + h);
  };
  e.prototype.CombinePath = function (l) {
    if (typeof l == 'string') {
      l = new e(l);
    }
    if (l.IsAbsolute) {
      throw new MadCap.Exception(-1, 'Cannot combine two absolute paths.');
    }
    var j = l.FullPath;
    var k = l.FullPath.split('/');
    var o = this.FullPath;
    var m = '';
    if (this.Origin && l.IsRootRelative) {
      return new e(this.Origin + j);
    }
    if (this.Scheme == 'mk') {
      var n = o.indexOf('::');
      m = o.substring(0, n + '::'.length);
      o = o.substring(n + '::'.length);
    }
    for (var h = 0, f = k.length; h < f; h++) {
      var g = k[h];
      if (o.length > 1 && MadCap.String.EndsWith(o, '/')) {
        o = o.substring(0, o.length - 1);
      }
      if (g == '.') {
        o += '/';
      } else {
        if (g == '..') {
          o = o.substring(0, o.lastIndexOf('/') + 1);
        } else {
          if (o != '' && !MadCap.String.EndsWith(o, '/')) {
            o += '/';
          }
          o += g;
        }
      }
    }
    o = m + o;
    return new e(o);
  };
  e.prototype.ToQuery = function (g) {
    var f = this.PlainPath + '?' + g + this.Fragment;
    return new e(f);
  };
  e.prototype.ToFolder = function () {
    var f = this.PlainPath;
    if (MadCap.String.EndsWith(f, '/')) {
      f = f.substring(0, f.length - 1);
    }
    var h = f.lastIndexOf('/');
    var g = f.substring(0, h + 1);
    return new e(g);
  };
  e.prototype.ToRelative = function (n) {
    if (typeof n == 'string') {
      n = new e(n);
    }
    if (this.IsAbsolute != n.IsAbsolute) {
      return this;
    }
    var k = 0;
    var l = n._Segments.length;
    for (; k < l; k++) {
      var g = this._Segments[k];
      var f = n._Segments[k];
      if (g != f) {
        break;
      }
    }
    var m = '';
    var o = MadCap.String.EndsWith(n.FullPath, '/') ? 0 : 1;
    for (var h = 0; h < l - k - o; h++) {
      m += '../';
    }
    for (var h = k; h < this._Segments.length; h++) {
      if (h > k) {
        m += '/';
      }
      m += this._Segments[h];
    }
    return new e(m);
  };
  e.prototype.ToExtension = function (j) {
    var h = this.FullPath;
    var i = h.lastIndexOf('.');
    var g = h.substring(0, i);
    var f = g + '.' + j;
    return new e(f);
  };
  e.prototype.ToScheme = function (f) {
    var h = this.FullPath;
    pos = h.indexOf(':');
    if (pos < 0) {
      return this;
    }
    var g = f + ':' + h.substring(pos);
    return new e(g);
  };
  e.prototype.ToPath = function () {
    return new e(this.Path);
  };
  e.prototype.ToPlainPath = function () {
    return new e(this.PlainPath);
  };
  e.prototype.ToNoQuery = function () {
    return new e(this.PlainPath + this.Fragment);
  };
  e.prototype.ToNoFragment = function () {
    return new e(this.PlainPath + this.Query);
  };
  MadCap.Utilities.CrossFrame = {};
  var d = MadCap.Utilities.CrossFrame;
  d.MESSAGE_SEPARATOR = '%%%%%';
  d.DATA_SEPARATOR = '^^^^^';
  d._MessageID = 0;
  d._MessageInfos = new Array();
  d._MessageHandlerFuncs = new Array();
  d._PostMessage = function (h, f) {
    if (typeof h == 'undefined' || h == null) {
      return;
    }
    if (h.postMessage != null) {
      h.postMessage(f, '*');
      return;
    }
    var g = { data: f, source: window };
    h.MadCap.Utilities.CrossFrame.OnMessage(g);
  };
  d.AddMessageHandler = function (h, g) {
    var f = d._MessageHandlerFuncs.length;
    d._MessageHandlerFuncs[f] = { HandlerFunc: h, ContextObj: g };
  };
  d.PostMessageRequest = function (n, k, l, f) {
    d._MessageInfos[d._MessageID] = f;
    var h = '';
    if (l != null) {
      for (var g = 0, j = l.length; g < j; g++) {
        if (g > 0) {
          h += d.DATA_SEPARATOR;
        }
        h += l[g];
      }
    }
    var m =
      'request' +
      d.MESSAGE_SEPARATOR +
      k +
      d.MESSAGE_SEPARATOR +
      h +
      d.MESSAGE_SEPARATOR +
      d._MessageID;
    d._PostMessage(n, m);
    d._MessageID++;
  };
  d._PostMessageResponse = function (n, k, l, f) {
    var h = '';
    if (l != null) {
      for (var g = 0, j = l.length; g < j; g++) {
        if (g > 0) {
          h += d.DATA_SEPARATOR;
        }
        h += l[g];
      }
    }
    var m =
      'response' +
      d.MESSAGE_SEPARATOR +
      k +
      d.MESSAGE_SEPARATOR +
      h +
      d.MESSAGE_SEPARATOR +
      f;
    d._PostMessage(n, m);
    d._MessageID++;
  };
  d.OnMessage = function (t) {
    var s = t.originalEvent;
    var o = s.data.split(d.MESSAGE_SEPARATOR);
    var m = o[0];
    var l = o[1];
    var j = o[2];
    var f = parseInt(o[3]);
    var h = null;
    if (!MadCap.String.IsNullOrEmpty(j)) {
      h = j.split(d.DATA_SEPARATOR);
      for (var p = 0, g = h.length; p < g; p++) {
        if (h[p] == 'null') {
          h[p] = null;
        }
      }
    }
    if (m == 'request') {
      var k = false;
      var x = true;
      var v = new Array();
      for (var p = 0, g = d._MessageHandlerFuncs.length; p < g; p++) {
        var w = d._MessageHandlerFuncs[p];
        var u = w.HandlerFunc;
        var q = w.ContextObj;
        var r = null;
        if (q != null) {
          r = u.call(q, l, h, v, s.source, f);
        } else {
          r = u(l, h, v, s.source, f);
        }
        k = r.Handled;
        x = r.FireResponse;
        if (k) {
          break;
        }
      }
      if (!k) {
        if (l == 'DEBUG-AddLine') {
          var l = h[0];
          MadCap.DEBUG.Log.AddLine(l);
          k = true;
        } else {
          if (l == 'url') {
            v[v.length] = document.location.href;
            k = true;
          } else {
            if (l == 'get-title') {
              v[v.length] = document.title;
              k = true;
            } else {
              if (l == 'navigate') {
                var n = h[0];
                document.location.href = n;
                k = true;
              }
            }
          }
        }
      }
      if (x) {
        d._PostMessageResponse(s.source, l, v.length > 0 ? v : null, f);
      }
    } else {
      if (m == 'response') {
        if (d._MessageInfos[f] != null) {
          d._MessageInfos[f](h);
        }
      }
    }
  };
  if (window.postMessage != 'undefined') {
    $(window).bind('message', d.OnMessage);
  } else {
  }
  MadCap.Utilities.PreventDefault = function (f) {
    f.preventDefault ? f.preventDefault() : (event.returnValue = false);
  };
  MadCap.Utilities.AsyncForeach = function (i, g, h) {
    i = i.slice(0);
    function f() {
      var j = i.shift();
      g(j, function (k) {
        if (i.length > 0) {
          f();
        } else {
          h();
        }
      });
    }
    if (i.length > 0) {
      f();
    } else {
      h();
    }
  };
  MadCap.Utilities.Now =
    Date.now ||
    function () {
      return new Date().getTime();
    };
  MadCap.Utilities.Has = function (g, f) {
    return g != null && Object.prototype.hasOwnProperty.call(g, f);
  };
  MadCap.Utilities.Debounce = function (h, j, g) {
    var m, l, f, k, n;
    var i = function () {
      var o = MadCap.Utilities.Now() - k;
      if (o < j && o > 0) {
        m = setTimeout(i, j - o);
      } else {
        m = null;
        if (!g) {
          n = h.apply(f, l);
          if (!m) {
            f = l = null;
          }
        }
      }
    };
    return function () {
      f = this;
      l = arguments;
      k = MadCap.Utilities.Now();
      var o = g && !m;
      if (!m) {
        m = setTimeout(i, j);
      }
      if (o) {
        n = h.apply(f, l);
        f = l = null;
      }
      return n;
    };
  };
  MadCap.Utilities.Memoize = function (g, f) {
    var h = function (k) {
      var j = h.cache;
      var i = '' + (f ? f.apply(this, arguments) : k);
      if (!MadCap.Utilities.Has(j, i)) {
        j[i] = g.apply(this, arguments);
      }
      return j[i];
    };
    h.cache = {};
    return h;
  };
  MadCap.Utilities.IsRuntimeFileType = function (f) {
    return (
      MadCap.Dom.Dataset(document.documentElement, 'mcRuntimeFileType') == f
    );
  };
  MadCap.Utilities.HasRuntimeFileType = function (g) {
    var f = MadCap.Dom.Dataset(document.documentElement, 'mcRuntimeFileType');
    return f && f.split(';').indexOf(g) > -1;
  };
  MadCap.Utilities.CreateStylesheet = function (i, j) {
    var g = i || document,
      f;
    var h = g.createElement('style');
    if (j) {
      h.setAttribute('media', j);
    }
    g.getElementsByTagName('head')[0].appendChild(h);
    f = g.styleSheets[g.styleSheets.length - 1];
    return f;
  };
  MadCap.Utilities.AsyncForeachParallel = function (l, j, k) {
    var h = 0;
    if (l.length === 0) {
      k();
    }
    var f = l.length;
    for (var g = 0; g < f; g++) {
      j(l[g], function () {
        h++;
        if (h === l.length) {
          k();
        }
      });
    }
  };
  MadCap.Utilities.FixLink = function (h, g, i, f) {
    if (!h.IsAbsolute) {
      h = g.CombinePath(h);
      var j = h.FullPath;
      if (!MadCap.String.IsNullOrEmpty(i) && i != null && f) {
        h = h.ToRelative(f);
        j = i + h.FullPath;
      }
      return j;
    }
  };
  MadCap.Utilities.IsRTL = function () {
    return $('html').css('direction') === 'rtl';
  };
  MadCap.Utilities.ToggleButtonState = function (f) {
    var i = $(f);
    var g = i.attr('data-current-state') || '1';
    var h = g == '1' ? 2 : 1;
    MadCap.Utilities.SetButtonState(f, h);
  };
  MadCap.Utilities.SetButtonState = function (h, l) {
    var m = $(h);
    var j = l == 1 ? 2 : 1;
    var k = m.attr('data-state' + l + '-class');
    var g = m.attr('data-state' + j + '-class');
    m.attr('data-current-state', l);
    m.removeClass(g).addClass(k);
    m.attr('title', m.attr('data-state' + l + '-title'));
    if (MadCap.Utilities.HasRuntimeFileType('SkinPreview')) {
      var f = m.attr('data-mc-style2');
      if (f) {
        var i = m.attr('data-mc-style1');
        if (!i) {
          i = m.attr('data-mc-style');
          m.attr('data-mc-style1', i);
        }
        m.attr('data-mc-style', l == 1 ? i : f);
      }
    }
  };
  MadCap.Utilities.LoadHandlers = Object.create(null);
  MadCap.Utilities.LoadScript = function (i, h, g) {
    var f = document.createElement('script');
    f.src = i;
    f.type = 'text/javascript';
    if (f.addEventListener) {
      $(f).error(g);
      $(f).load(h);
    } else {
      if (f.readyState) {
        f.onreadystatechange = function () {
          if (f.readyState == 'loaded' || f.readyState == 'complete') {
            h();
          }
        };
      }
    }
    document.getElementsByTagName('head')[0].appendChild(f);
    return f;
  };
  MadCap.Utilities.LoadRegisteredScript = function (m, j, i, h) {
    var k = false;
    var f;
    $('script').each(function (n, o) {
      var p = $(o).attr('src');
      if (
        !MadCap.String.IsNullOrEmpty(p) &&
        p.toLowerCase() == m.toLowerCase()
      ) {
        k = true;
        f = o;
      }
    });
    if (k) {
      var g = new MadCap.Utilities.Url(m).Name;
      var l = MadCap.Utilities.LoadHandlers[g];
      if (l) {
        l(h);
      }
      j();
    }
  };
  MadCap.Utilities.LoadScripts = function (f, i, h, g) {
    MadCap.Utilities.AsyncForeach(
      f,
      function (j, k) {
        if (!MadCap.String.IsNullOrEmpty(j)) {
          MadCap.Utilities.LoadRegisteredScript(j, k, h, g);
        } else {
          k();
        }
      },
      i
    );
  };
  MadCap.Utilities.TopicUniqueStyleSheets = Object.create(null);
  MadCap.Utilities.LoadStyleSheets = function (g, f) {
    $.each(g, function (i, h) {
      if (!MadCap.String.IsNullOrEmpty(h)) {
        MadCap.Utilities.LoadStyleSheetUnique(h, f);
      }
    });
  };
  MadCap.Utilities.LoadStyleSheetUnique = function (i, g) {
    var h = false;
    $('link').each(function (k, l) {
      var j = $(l).attr('href');
      if (
        !MadCap.String.IsNullOrEmpty(j) &&
        j.toLowerCase() == i.toLowerCase()
      ) {
        h = true;
      }
    });
    if (!h) {
      var f = '<link rel="stylesheet" type="text/css" href="{0}" />';
      cssLink = f.replace('{0}', i);
      if (
        $('link[href*="' + i + '"]').length == 0 ||
        !MadCap.String.Contains(i, '/Topic.css', false)
      ) {
        if (g) {
          $(cssLink).insertAfter(g);
        } else {
          $('head').append(insertIndex, cssLink);
        }
      }
    }
    MadCap.Utilities.TopicUniqueStyleSheets[i] = $('link[href*="' + i + '"]');
  };
  MadCap.Utilities.RemoveTopicStylesheets = function () {
    $.each(MadCap.Utilities.TopicUniqueStyleSheets, function (f, g) {
      $(g).remove();
    });
  };
  MadCap.Utilities.CombineRelevancy = function (h, g) {
    var f = MadCap.Utilities.CapNumber(h, g, 16, 0, 2);
    for (var j = 2; j < 7; j++) {
      f = MadCap.Utilities.CapNumber(f, g, 16, j, 1);
    }
    f = MadCap.Utilities.CapNumber(f, g, 16, 7, 1, 7);
    return f;
  };
  MadCap.Utilities.CalculateScore = function (g, f, h) {
    return (Math.log(g) / Math.log(2147483647)) * h + f * (1 - h);
  };
  MadCap.Utilities.CapNumber = function (j, i, p, l, f, n) {
    if (!n) {
      n = Math.pow(p, f) - 1;
    }
    var g = Math.pow(p, l);
    var m = g * Math.pow(p, f);
    var o = ~~((j % m) / g);
    var k = ~~((i % m) / g);
    var h = Math.min(o + k, n);
    return j + (h - o) * g;
  };
  MadCap.Utilities.Require = function (h, i) {
    if (!MadCap.Utilities._requireCache) {
      MadCap.Utilities._requireCache = Object.create(null);
    }
    var f = MadCap.Utilities._requireCache;
    var g = h[0];
    var j = f[g];
    if (j && j.data) {
      i(j.data);
    } else {
      if (j && j.callbacks) {
        j.callbacks.push(i);
      } else {
        f[g] = { callbacks: [i] };
        require([g], function (l) {
          j = f[g];
          j.data = l;
          for (var k = 0; k < j.callbacks.length; k++) {
            j.callbacks[k](l);
          }
          j.callbacks = null;
          require.undef(g);
        });
      }
    }
  };
  MadCap.Utilities.GetChunkId = function (f, l, k) {
    for (var h = 0; h < f.length; h++) {
      var g = f[h];
      var j = k(l, g);
      if (j === 0) {
        return h;
      } else {
        if (j === -1) {
          return h - 1;
        }
      }
    }
    return f.length - 1;
  };
  MadCap.Utilities.GetChunkIds = function (f, n, l) {
    var m = [];
    var j = false;
    for (var h = 0; h < f.length; h++) {
      var g = f[h];
      var k = l(n, g);
      if (k === -1 && h === 0) {
        return m;
      }
      if (k === 0) {
        if (h > 0 && !j) {
          m.push(h - 1);
        }
        m.push(h);
        j = true;
      } else {
        if (k === -1) {
          if (h > 0 && !j) {
            m.push(h - 1);
          }
          break;
        }
      }
    }
    if (m.length === 0) {
      m.push(f.length - 1);
    }
    return m;
  };
  MadCap.Utilities.ClearRequireCache = function () {
    MadCap.Utilities._requireCache = null;
  };
  MadCap.Utilities.StopWords = Array(
    'a',
    'an',
    'the',
    'to',
    'of',
    'is',
    'for',
    'and',
    'or',
    'do',
    'be',
    'by',
    'he',
    'she',
    'on',
    'in',
    'at',
    'it',
    'not',
    'no',
    'are',
    'as',
    'but',
    'her',
    'his',
    'its',
    'non',
    'only',
    'than',
    'that',
    'then',
    'they',
    'this',
    'we',
    'were',
    'which',
    'with',
    'you',
    'into',
    'about',
    'after',
    'all',
    'also',
    'been',
    'can',
    'come',
    'from',
    'had',
    'has',
    'have',
    'me',
    'made',
    'many',
    'may',
    'more',
    'most',
    'near',
    'over',
    'some',
    'such',
    'their',
    'there',
    'these',
    'under',
    'use',
    'was',
    'when',
    'where',
    'against',
    'among',
    'became',
    'because',
    'between',
    'during',
    'each',
    'early',
    'found',
    'however',
    'include',
    'late',
    'later',
    'med',
    'other',
    'several',
    'through',
    'until',
    'who',
    'your'
  );
  MadCap.Utilities.Store = (function () {
    try {
      if (window.localStorage) {
        return window.localStorage;
      }
    } catch (h) {
      if (console && console.log) {
        console.log('window.localStorage not available');
      }
    }
    var g = 'MadCap';
    var i = document.createElement('div');
    i.style.display = 'none';
    document.getElementsByTagName('head')[0].appendChild(i);
    if (typeof i.addBehavior == 'function') {
      i.addBehavior('#default#userdata');
      i.load(g);
      return {
        getItem: function (j) {
          return i.XMLDocument.documentElement.getAttribute(j);
        },
        setItem: function (j, k) {
          i.XMLDocument.documentElement.setAttribute(j, k);
          i.save(g);
        },
        removeItem: function (j) {
          i.removeAttribute(j);
          i.save(g);
        },
      };
    }
    var f = 'data-' + g + '-';
    return {
      getItem: function (j) {
        var k = i.getAttribute(f + j);
        return k ? decodeURIComponent(k) : k;
      },
      setItem: function (j, k) {
        i.setAttribute(f + j, k ? encodeURIComponent(k) : null);
      },
      removeItem: function (j) {
        i.removeAttribute(f + j);
      },
    };
  })();
})();
Array.prototype.Remove = function (a) {
  if (a < 0 || a > this.length) {
    throw 'Index out of bounds.';
  }
  this.splice(a, 1);
};
Array.prototype.RemoveValue = function (b) {
  for (var a = this.length - 1; a >= 0; a--) {
    if (this[a] == b) {
      this.Remove(a);
    }
  }
};
Array.prototype.Union = function (b) {
  var a = [].concat(this);
  if (b) {
    for (var c = 0; c < b.length; c++) {
      if (this.indexOf(b[c]) === -1) {
        a.push(b[c]);
      }
    }
  }
  return a;
};
Array.prototype.Intersect = function (b) {
  var a = [];
  for (var c = 0; c < b.length; c++) {
    if (this.indexOf(b[c]) !== -1) {
      a.push(b[c]);
    }
  }
  return a;
};
/*
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 * Unlicensed use is strictly prohibited
 *
 * v13.2.6355.27565
 */
(function () {
  MadCap.Utilities.Xhr = function (d, b, c) {
    var e = this;
    this._XmlDoc = null;
    this._XmlHttp = null;
    this._Args = d;
    this._LoadFunc = b;
    this._LoadContextObj = c;
    this.OnreadystatechangeLocal = function () {
      if (e._XmlDoc.readyState == 4) {
        e._XmlDoc.onreadystatechange = a._Noop;
        var f = null;
        if (e._XmlDoc.documentElement != null) {
          f = e._XmlDoc;
        }
        if (e._LoadContextObj == null) {
          e._LoadFunc(f, e._Args);
        } else {
          e._LoadFunc.call(e._LoadContextObj, f, e._Args);
        }
      }
    };
    this.OnreadystatechangeRemote = function () {
      if (e._XmlHttp.readyState == 4) {
        e._XmlHttp.onreadystatechange = a._Noop;
        var f = null;
        if (
          e._XmlHttp.responseXML != null &&
          e._XmlHttp.responseXML.documentElement != null
        ) {
          f = e._XmlHttp.responseXML;
        }
        if (e._LoadContextObj == null) {
          e._LoadFunc(f, e._Args);
        } else {
          e._LoadFunc.call(e._LoadContextObj, f, e._Args);
        }
      }
    };
  };
  var a = MadCap.Utilities.Xhr;
  a.prototype._LoadLocal = function (b, c) {
    if (window.ActiveXObject) {
      this._XmlDoc = a._GetMicrosoftXmlDomObject();
      this._XmlDoc.async = c;
      if (this._LoadFunc) {
        this._XmlDoc.onreadystatechange = this.OnreadystatechangeLocal;
      }
      try {
        if (!this._XmlDoc.load(b)) {
          this._XmlDoc = null;
        }
      } catch (d) {
        this._XmlDoc = null;
      }
    } else {
      if (window.XMLHttpRequest) {
        this._LoadRemote(b, c);
      }
    }
    return this._XmlDoc;
  };
  a.prototype._LoadRemote = function (b, c) {
    this._XmlHttp = a._GetXhrObject();
    if (this._LoadFunc) {
      this._XmlHttp.onreadystatechange = this.OnreadystatechangeRemote;
    }
    try {
      this._XmlHttp.open('GET', b, c);
      this._XmlHttp.send(null);
      if (!c && (this._XmlHttp.status == 0 || this._XmlHttp.status == 200)) {
        this._XmlDoc = this._XmlHttp.responseXML;
      }
    } catch (d) {
      this._XmlHttp.abort();
      if (this._LoadFunc) {
        if (this._LoadContextObj == null) {
          this._LoadFunc(null, this._Args);
        } else {
          this._LoadFunc.call(this._LoadContextObj, null, this._Args);
        }
      }
    }
    return this._XmlDoc;
  };
  a.prototype.Load = function (b, d) {
    var e = null;
    var c = document.location.protocol;
    if (c == 'file:' || c == 'mk:' || c == 'ms-its:' || c == 'app:') {
      e = this._LoadLocal(b, d);
    } else {
      if (c == 'http:' || c == 'https:') {
        e = this._LoadRemote(b, d);
      }
    }
    return e;
  };
  a.LoadXmlString = function (c) {
    var b = null;
    if (window.ActiveXObject) {
      b = a._GetMicrosoftXmlDomObject();
      b.async = false;
      b.loadXML(c);
    } else {
      if (DOMParser) {
        var d = new DOMParser();
        b = d.parseFromString(c, 'text/xml');
      }
    }
    return b;
  };
  a.CreateXmlDocument = function (b) {
    var c = '<' + b + ' />';
    var d = a.LoadXmlString(c);
    return d;
  };
  a.GetOuterXml = function (d) {
    var b = null;
    if (window.ActiveXObject) {
      b = d.xml;
    } else {
      if (window.XMLSerializer) {
        var c = new XMLSerializer();
        b = c.serializeToString(d);
      }
    }
    return b;
  };
  a.ImportNode = function (c, b) {
    if (typeof c.importNode == 'function') {
      return c.importNode(b, true);
    }
    return b.cloneNode(true);
  };
  a.CallWebService = function (e, d, f, b) {
    var c = new a(b, f, null);
    var g = c.Load(e, d);
    return g;
  };
  a._MicrosoftXmlDomProgIDs = [
    'Msxml2.DOMDocument.6.0',
    'Msxml2.DOMDocument',
    'Microsoft.XMLDOM',
  ];
  a._MicrosoftXmlHttpProgIDs = [
    'Msxml2.XMLHTTP.6.0',
    'Msxml2.XMLHTTP',
    'Microsoft.XMLHTTP',
  ];
  a._MicrosoftXmlDomProgID = null;
  a._MicrosoftXmlHttpProgID = null;
  a._FilePathToXmlStringMap = new MadCap.Utilities.Dictionary();
  a._LoadingFilesPathMap = new MadCap.Utilities.Dictionary();
  a._LoadingFromQueue = false;
  a.ForceUseJS = false;
  a.Load = function (g, e, b, h, c) {
    function l() {
      a._LoadingFilesPathMap.Remove(j.FullPath);
      var n = a._FilePathToXmlStringMap.GetItem(j.Name);
      if (n != null) {
        a._FilePathToXmlStringMap.Remove(j.Name);
        m = a.LoadXmlString(n);
      }
      a._LoadingFilesPathMap.ForEach(function (q, r) {
        var p = new MadCap.Utilities.Url(q);
        var o = r;
        if (p.Name == f && p.FullPath != j.FullPath) {
          a._LoadingFilesPathMap.Remove(p.FullPath);
          a._LoadingFromQueue = true;
          a.Load(p.FullPath, o.async, o.LoadFunc, o.args, o.loadContextObj);
          return false;
        }
        return true;
      });
      if (c == null) {
        b(m, h);
      } else {
        b.call(c, m, h);
      }
    }
    var m = null;
    if (
      a.ForceUseJS ||
      (Boolean(!window.ActiveXObject) &&
        MadCap.String.StartsWith(document.location.protocol, 'file'))
    ) {
      var i = new MadCap.Utilities.Url(g);
      var j = i.ToExtension('js');
      var f = j.Name;
      a._LoadingFilesPathMap.Add(j.FullPath, {
        async: e,
        LoadFunc: b,
        args: h,
        loadContextObj: c,
      });
      var k = false;
      a._LoadingFilesPathMap.ForEach(function (p, q) {
        var o = new MadCap.Utilities.Url(p);
        var n = q;
        if (o.Name == f && o.FullPath != j.FullPath) {
          k = true;
          return false;
        }
        return true;
      });
      if (a._LoadingFromQueue || !k) {
        a._LoadingFromQueue = false;
        MadCap.Utilities.LoadScript(j.FullPath, l, l);
      }
    } else {
      var d = new a(h, b, c);
      m = d.Load(g, e);
    }
    return m;
  };
  a._Noop = function () {};
  a._GetMicrosoftXmlDomObject = function () {
    var e = null;
    if (a._MicrosoftXmlDomProgID == null) {
      for (var c = 0; c < a._MicrosoftXmlDomProgIDs.length; c++) {
        var d = a._MicrosoftXmlDomProgIDs[c];
        try {
          e = new ActiveXObject(d);
          a._MicrosoftXmlDomProgID = d;
          break;
        } catch (b) {}
      }
    } else {
      e = new ActiveXObject(a._MicrosoftXmlDomProgID);
    }
    return e;
  };
  a._GetXhrObject = (function () {
    if (window.XMLHttpRequest) {
      return function () {
        return new window.XMLHttpRequest();
      };
    } else {
      if (window.ActiveXObject) {
        return function () {
          var e = null;
          if (a._MicrosoftXmlHttpProgID == null) {
            for (var c = 0; c < a._MicrosoftXmlHttpProgIDs.length; c++) {
              var d = a._MicrosoftXmlHttpProgIDs[c];
              try {
                e = new ActiveXObject(d);
                a._MicrosoftXmlHttpProgID = d;
                break;
              } catch (b) {}
            }
          } else {
            e = new ActiveXObject(a._MicrosoftXmlHttpProgID);
          }
          return e;
        };
      }
    }
  })();
})();
/*
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 * Unlicensed use is strictly prohibited
 *
 * v13.2.6355.27565
 */
(function () {
  MadCap.CreateNamespace('TextEffects');
  var a = MadCap.TextEffects;
  a.Init = function (b) {
    a.ExpandingControl.Load(b);
    a.DropDownControl.Load(b);
    a.TogglerControl.Load(b);
    a.TextPopupControl.Load(b);
    a.TopicPopupControl.Load(b);
  };
  a.Dispose = function (b) {
    a.ExpandingControl.UnLoad(b);
    a.DropDownControl.UnLoad(b);
    a.TogglerControl.UnLoad(b);
    a.TextPopupControl.UnLoad(b);
    a.TopicPopupControl.UnLoad(b);
  };
  $(function () {
    MadCap.Utilities.LoadHandlers.MadCapTextEffects = a.Init;
    a.Init(document);
  });
  a.TextEffectControl = function (d, c) {
    if (this._rootEl == null) {
      this._rootEl = d;
    }
    this._hotSpotEl = null;
    this._bodyEls = null;
    this._className = c;
    a.TextEffectControl.Controls[a.TextEffectControl.Controls.length] = this;
    var b = this;
    (function () {
      b._hotSpotEl = MadCap.Dom.GetElementsByClassName(
        b._className + 'HotSpot',
        null,
        b._rootEl
      )[0];
      b._bodyEls = MadCap.Dom.GetElementsByClassName(
        b._className + 'Body',
        null,
        b._rootEl
      );
      var g = MadCap.Dom.GetElementsByClassName(
        b._className + 'HotSpot',
        null,
        b._rootEl
      );
      for (var e = g.length - 1; e >= 0; e--) {
        var f = g[e].parentNode;
        while (f != null) {
          if ($(f).hasClass(b._className)) {
            if (f == b._rootEl) {
              $(g[e]).click(function (h) {
                b.Toggle.call(b);
              });
            } else {
              break;
            }
          }
          f = f.parentNode;
        }
      }
    })();
  };
  a.UnbindTextEffectControl = function (d, c) {
    if (this._rootEl == null) {
      this._rootEl = d;
    }
    this._hotSpotEl = null;
    this._bodyEls = null;
    this._className = c;
    var b = this;
    (function () {
      b._hotSpotEl = MadCap.Dom.GetElementsByClassName(
        b._className + 'HotSpot',
        null,
        b._rootEl
      )[0];
      var g = MadCap.Dom.GetElementsByClassName(
        b._className + 'HotSpot',
        null,
        b._rootEl
      );
      for (var e = g.length - 1; e >= 0; e--) {
        var f = g[e].parentNode;
        while (f != null) {
          if ($(f).hasClass(b._className)) {
            if (f == b._rootEl) {
              $(g[e]).unbind();
            } else {
              break;
            }
          }
          f = f.parentNode;
        }
      }
      $(b._hotSpotEl).unbind();
    })();
  };
  a.TextEffectControl.Controls = new Array();
  a.TextEffectControl.FindControl = function (c) {
    for (var b = 0; b < a.TextEffectControl.Controls.length; b++) {
      if (a.TextEffectControl.Controls[b]._rootEl == c) {
        return a.TextEffectControl.Controls[b];
      }
    }
    return null;
  };
  a.TextEffectControl.ExpandAll = function (b) {
    for (var c = 0, d = a.TextEffectControl.Controls.length; c < d; c++) {
      var e = a.TextEffectControl.Controls[c];
      if (b == 'open') {
        e.Open(false);
      } else {
        if (b == 'close') {
          e.Close(false);
        }
      }
    }
  };
  a.TextEffectControl.prototype.Open = function () {
    var d = $(this._rootEl);
    if (d.hasClass('MCToggler')) {
      d = $(this._rootEl.parentNode).find('a.MCToggler');
    }
    d.removeClass(this._className + '_Closed');
    d.addClass(this._className + '_Open');
    var c = null;
    if (d.hasClass('MCToggler')) {
      c = $('.MCToggler_Image_Icon');
    } else {
      if (d.hasClass('MCDropDown')) {
        c = $('.MCDropDown_Image_Icon');
      } else {
        if (d.hasClass('MCExpanding')) {
          c = $('.MCExpanding_Image_Icon');
        }
      }
    }
    var b = d.find(c);
    this.ToggleAltText(b[0], d, 'closed');
    d.attr('data-mc-state', 'open');
  };
  a.TextEffectControl.prototype.Close = function () {
    var d = $(this._rootEl);
    if (d.hasClass('MCToggler')) {
      d = $(this._rootEl.parentNode).find('a.MCToggler');
    }
    d.removeClass(this._className + '_Open');
    d.addClass(this._className + '_Closed');
    var c = null;
    if (d.hasClass('MCToggler')) {
      c = $('.MCToggler_Image_Icon');
    } else {
      if (d.hasClass('MCDropDown')) {
        c = $('.MCDropDown_Image_Icon');
      } else {
        if (d.hasClass('MCExpanding')) {
          c = $('.MCExpanding_Image_Icon');
        }
      }
    }
    var b = d.find(c);
    this.ToggleAltText(b[0], d, 'open');
    d.attr('data-mc-state', 'closed');
  };
  a.TextEffectControl.prototype.ToggleAltText = function (g, c, d) {
    if (g != null) {
      var b = $(g);
      var f = b.attr('data-mc-alt2');
      var e = b.attr('alt');
      if (c != null && c.attr('data-mc-state') == d) {
        b.attr('alt', f);
        b.attr('data-mc-alt2', e);
      }
    }
  };
  a.TextEffectControl.prototype.Toggle = function () {
    var d = $(this._rootEl);
    if (d.hasClass('MCToggler')) {
      d = $(this._rootEl.parentNode).find('a.MCToggler');
    }
    var b = d.attr('data-mc-state') || 'closed';
    var c = null;
    if (b == 'open') {
      this.Close(true);
    } else {
      if (b == 'closed') {
        this.Open(true);
      }
    }
    $(d.find('a')[0]).focus();
  };
  a.TextEffectControl.prototype.ResizeSlideshow = function (f, d) {
    if (f) {
      var e = $(f);
      var c = e.closest('div[class^="mc-viewport"]');
      if (c) {
        var b = 0;
        e.children().each(function () {
          b = b + $(this).outerHeight();
        });
        if (d) {
          b = c.height() + Math.max(b, e.outerHeight());
        } else {
          b = c.height() - Math.max(b, e.outerHeight());
        }
        c.animate({ height: b });
      }
    }
  };
  a.ExpandingControl = function (b) {
    a.TextEffectControl.call(this, b, 'MCExpanding');
  };
  MadCap.Extend(a.TextEffectControl, a.ExpandingControl);
  a.ExpandingControl.Load = function (c) {
    var d = $('.MCExpanding', c);
    for (var b = 0, e = d.length; b < e; b++) {
      var g = d[b];
      var f = new a.ExpandingControl(g);
      f.Init();
    }
  };
  a.ExpandingControl.UnLoad = function (c) {
    var d = $('.MCExpanding', c);
    for (var b = 0, e = d.length; b < e; b++) {
      a.UnbindTextEffectControl(d[b]);
    }
  };
  a.ExpandingControl.prototype.Init = function () {
    this.Close(false);
  };
  a.ExpandingControl.prototype.Open = function (b) {
    this.base.Open.call(this);
    var c = $(this._bodyEls[0]);
    this.ResizeSlideshow(c, true);
    if (b) {
      c.css({ 'white-space': 'nowrap' });
      c.hide().animate({ width: 'show' }, function () {
        $(this).css({ 'white-space': 'normal' });
      });
    } else {
      c.show();
    }
  };
  a.ExpandingControl.prototype.Close = function (c) {
    if (!c) {
      $(this._bodyEls[0]).hide();
      this.base.Close.call(this);
      return;
    }
    var b = this;
    this.ResizeSlideshow(this._bodyEls[0], false);
    $(this._bodyEls[0])
      .css({ 'white-space': 'nowrap' })
      .animate({ width: 'hide' }, function () {
        $(this).css({ 'white-space': 'normal' });
        b.base.Close.call(b);
      });
  };
  a.DropDownControl = function (b) {
    a.TextEffectControl.call(this, b, 'MCDropDown');
  };
  MadCap.Extend(a.TextEffectControl, a.DropDownControl);
  a.DropDownControl.Load = function (e) {
    var d = $('.MCDropDown', e);
    for (var c = 0, f = d.length; c < f; c++) {
      var b = d[c];
      var g = new a.DropDownControl(b);
      g.Init(false);
    }
  };
  a.DropDownControl.UnLoad = function (d) {
    var c = $('.MCDropDown', d);
    for (var b = 0, e = c.length; b < e; b++) {
      a.UnbindTextEffectControl(c[b]);
    }
  };
  a.DropDownControl.prototype.Init = function () {
    this.Close(false);
  };
  a.DropDownControl.prototype.Open = function (c) {
    this.base.Open.call(this);
    var d = $(this._bodyEls[0]);
    var b = d.find('div.sticky');
    if (b.length > 0) {
      d.slideDown();
      b.foundation('_calc', true);
      return;
    }
    if (c) {
      d.hide().slideDown();
    } else {
      d.show();
    }
    this.ResizeSlideshow(d, true);
  };
  a.DropDownControl.prototype.Close = function (d) {
    var e = $(this._bodyEls[0]);
    if (!d) {
      var b = e.find('div.sticky');
      if (b.length > 0) {
        b.foundation('_calc', true);
      }
      e.hide();
      this.base.Close.call(this);
      return;
    }
    var c = this;
    this.ResizeSlideshow(this._bodyEls[0], false);
    $(this._bodyEls[0]).slideUp(function () {
      c.base.Close.call(c);
    });
  };
  a.TogglerControl = function (c) {
    this._rootEl = c;
    this._hotSpotEl = c;
    this._bodyEls = new Array();
    this._className = 'MCToggler';
    a.TextEffectControl.Controls[a.TextEffectControl.Controls.length] = this;
    var b = this;
    (function () {
      var h = MadCap.Dom.Dataset(b._rootEl, 'mcTargets');
      var d = h.split(';');
      for (var f = 0, g = d.length; f < g; f++) {
        var j = d[f];
        var e = MadCap.Dom.GetElementsByAttribute(
          'data-mc-target-name',
          j,
          null,
          document.body
        );
        b._bodyEls = b._bodyEls.concat(e);
      }
      $(b._hotSpotEl).click(function (i) {
        b.Toggle.call(b);
      });
    })();
  };
  MadCap.Extend(a.TextEffectControl, a.TogglerControl);
  a.TogglerControl.Load = function (c) {
    var e = $('.MCToggler', c);
    for (var b = 0, d = e.length; b < d; b++) {
      var g = e[b];
      var f = new a.TogglerControl(g);
      f.Init();
    }
  };
  a.TogglerControl.UnLoad = function (c) {
    var e = $('.MCToggler', c);
    for (var b = 0, d = e.length; b < d; b++) {
      a.UnbindTextEffectControl(e[b]);
    }
  };
  a.TogglerControl.prototype.Init = function () {
    this.Close(false);
  };
  a.TogglerControl.prototype.Open = function (b) {
    this.base.Open.call(this);
    for (var c = 0, d = this._bodyEls.length; c < d; c++) {
      if (b) {
        $(this._bodyEls[c]).css({ opacity: 0, display: '' });
        $(this._bodyEls[c]).animate({ opacity: 1 }, 200);
      } else {
        $(this._bodyEls[c]).css({ opacity: 1, display: '' });
      }
    }
    this.ResizeSlideshow(this._bodyEls[0], true);
  };
  a.TogglerControl.prototype.Close = function (c) {
    this.base.Close.call(this);
    this.ResizeSlideshow(this._bodyEls[0], false);
    function f(g) {
      $(g).css('display', 'none');
    }
    for (var d = 0, e = this._bodyEls.length; d < e; d++) {
      var b = this;
      if (c) {
        $(this._bodyEls[d]).animate({ opacity: 0 }, 200, function () {
          f(this);
        });
      } else {
        f(this._bodyEls[d]);
      }
    }
  };
  a.TextPopupControl = function (c) {
    this._rootEl = c;
    this._hotSpotEl = c;
    this._bodyEls = null;
    this._className = 'MCTextPopup';
    var b = this;
    (function () {
      b._bodyEls = $('.' + b._className + 'Body', b._rootEl).toArray();
      if (jQuery.browser.mobile) {
        $(b._hotSpotEl).click(function (d) {
          if ($(this).attr('data-mc-state') === 'closed') {
            b.Open();
          } else {
            b.Close();
          }
        });
      } else {
        $(b._hotSpotEl).mouseover(function (d) {
          b.Open();
        });
        $(b._hotSpotEl).mouseleave(function (d) {
          b.Close();
        });
      }
    })();
  };
  MadCap.Extend(a.TextEffectControl, a.TextPopupControl);
  a.TextPopupControl.Load = function (d) {
    var b = $('.MCTextPopup', d);
    for (var c = 0, f = b.length; c < f; c++) {
      var g = b[c];
      var e = new a.TextPopupControl(g);
      e.Init();
    }
  };
  a.TextPopupControl.UnLoad = function (d) {
    var b = $('.MCTextPopup', d);
    for (var c = 0, e = b.length; c < e; c++) {
      a.UnbindTextEffectControl(b[c]);
    }
  };
  a.TextPopupControl.prototype.Init = function () {
    this.Close(false);
  };
  a.TextPopupControl.prototype.Open = function () {
    this.base.Open.call(this);
    var A = $(this._rootEl);
    var k = $(this._bodyEls[0]);
    var f = $('.MCTextPopupArrow', A);
    var d = $('.title-bar.sticky');
    var t = $(window);
    k.css('top', '0');
    k.css('left', '0');
    k.css('height', 'auto');
    var i = 13;
    var n = k.offset().top;
    var o = k.offset().left;
    var x = A.offset().top - n;
    var l = A.offset().left - o;
    var m = x + this._rootEl.offsetHeight;
    var w = k[0].offsetWidth;
    var p = k[0].offsetHeight;
    var C = l + A[0].offsetWidth / 2;
    var g = C - w / 2;
    var z = g + w;
    var s = m + i;
    var e = t.scrollTop();
    var v = t.scrollLeft();
    var c = -f[0].offsetWidth / 2;
    var b = t.width();
    var r = e + t.height() - m;
    if (d) {
      e += d.innerHeight();
    }
    if (p + i > r) {
      var B = x - e;
      if (p + i > B) {
        s = m;
        var q = parseInt(k.css('border-top-width'));
        var h = parseInt(k.css('border-bottom-width'));
        var y = parseInt(k.css('padding-top'));
        var j = parseInt(k.css('padding-bottom'));
        k.css('height', r - q - h - y - j + 'px');
        k.css('overflow', 'auto');
      } else {
        k.addClass('MCTextPopupBodyBottom');
        s = x - p - i;
      }
    } else {
      k.removeClass('MCTextPopupBodyBottom');
    }
    k.css('top', s + 'px');
    if (z >= b + v) {
      c += z - b - v;
    }
    if (g < v) {
      c += g - v;
    }
    g = Math.min(g, v + b - w);
    g = Math.max(g, v);
    var u = A.closest('body');
    if (MadCap.HasEpubReadingSystem()) {
      g = A.offset().left;
      c = -(k[0].offsetWidth / 2 - f[0].offsetWidth / 2);
    }
    k.css('left', g + 'px');
    k.css('zIndex', 1);
    f.css('margin-left', c + 'px');
    k.animate({ opacity: 1 }, 200);
  };
  a.TextPopupControl.prototype.Close = function () {
    this.base.Close.call(this);
    var b = $(this._bodyEls[0]);
    b.css('opacity', 0);
  };
  a.TopicPopupControl = function (c) {
    this._rootEl = c;
    this._hotSpotEl = c;
    this._bodyEls = null;
    this._className = 'MCTopicPopup';
    var b = this;
    (function () {
      b._bodyEls = $('.' + b._className + 'Body', b._rootEl).toArray();
      $(b._hotSpotEl).click(function (d) {
        b.Open();
        $(document.documentElement).click(function (f) {
          b.Close();
          $(document.documentElement).off('click', arguments.callee);
        });
        d.stopPropagation();
        MadCap.Utilities.PreventDefault(d);
      });
    })();
  };
  MadCap.Extend(a.TextEffectControl, a.TopicPopupControl);
  a.TopicPopupControl.Load = function (d) {
    var g = $('.MCTopicPopup', d);
    for (var c = 0, e = g.length; c < e; c++) {
      var b = g[c];
      var f = new a.TopicPopupControl(b);
      f.Init();
    }
  };
  a.TopicPopupControl.UnLoad = function (c) {
    var e = $('.MCTopicPopup', c);
    for (var b = 0, d = e.length; b < d; b++) {
      a.UnbindTextEffectControl(e[b]);
    }
  };
  a.TopicPopupControl.prototype.Init = function () {
    this.Close(false);
  };
  a.TopicPopupControl.prototype.Open = function () {
    this.base.Open.call(this);
    var f = $('<div></div>');
    f.addClass('MCTopicPopupContainer needs-pie');
    var b = MadCap.Dom.GetAttribute(this._hotSpotEl, 'href');
    var k = document.createElement('iframe');
    $(k).addClass('MCTopicPopupBody');
    k.setAttribute('src', b);
    k.setAttribute('name', 'MCPopup');
    f.append(k);
    var i = document.body;
    f.appendTo(i);
    var h = $(this._rootEl);
    var c = h.attr('data-mc-width');
    var o = h.attr('data-mc-height');
    if (c != null || o != null) {
      f.css({ top: '50%', left: '50%', width: c, height: o });
      var e = f.width();
      var g = f.height();
      var d = $(window);
      var n = d.width() - 100;
      var m = d.height() - 100;
      if (e > n) {
        f.css({ width: n + 'px' });
        e = n;
      }
      if (g > m) {
        f.css({ height: m + 'px' });
        g = m;
      }
      f.css({ 'margin-top': -g / 2 + 'px', 'margin-left': -e / 2 + 'px' });
    }
    $(k).css('height', '100%');
    if ($('html').attr('data-mc-target-type') == 'EPUB') {
      var j =
        $(this._hotSpotEl).offset().top -
        f.offset().top -
        f[0].offsetHeight / 2;
      f.css({
        'margin-top': j + 'px',
        left: $(this._hotSpotEl).offset().left,
        'margin-left': $(this._hotSpotEl).offset().left,
      });
    }
    f.animate({ opacity: 1 }, 200);
    var l = a.AddBackgroundTint('dark', i);
    $(l).animate({ opacity: 0.5 }, 200);
  };
  a.TopicPopupControl.prototype.Close = function () {
    this.base.Close.call(this);
    var b = $('.MCTopicPopupContainer');
    var c = b.parent();
    b.remove();
    a.RemoveBackgroundTint();
    if ($('#topicContent').length > 0) {
      c.css('overflow', 'auto');
    }
  };
  a.CreateLinkListTree = function (q, h, e, g, o) {
    a.RemoveLinkListTrees();
    if (!g) {
      g = '';
    }
    var b = $("<ul class='responsive-link-list tree inner'></ul>");
    var j = $(e).attr('target');
    for (var f = 0, c = q.length; f < c; f++) {
      var p = q[f];
      var m = $(
        "<li class='IndexEntry IndexEntryLink tree-node tree-node-leaf'></li>"
      ).appendTo(b);
      var l = $("<div class='IndexTerm'></div>").appendTo(m);
      var k = $("<span class='label'></span>").appendTo(l);
      var d = $('<a/>').appendTo(k);
      d.text(p.Title);
      var n = p.Link;
      d.attr('href', g + n);
      m.click(o);
    }
    b.appendTo(h);
  };
  a.CreateDummyToolbarDropdown = function (h, i, c, f) {
    var b = [];
    var e = new MadCap.Utilities.Url(document.location.href);
    var g = { Title: c + '1', Link: e.PlainPath + e.Fragment };
    var d = { Title: c + '2', Link: e.PlainPath + e.Fragment };
    b[0] = g;
    b[1] = d;
    a.CreateToolbarDropdown(b, h[0], i, f);
  };
  a.CreateToolbarDropdown = function (j, f, i, h) {
    var c = $(f);
    var d = 2;
    var b = c.position().left;
    var g = c.position().top + c.height() + d;
    var e = '';
    a.CreateLinkListPopup(
      j,
      c.closest('.popup-container'),
      g,
      b,
      f,
      e,
      'toolbar-button-drop-down ' + i,
      true,
      false,
      h
    );
  };
  a.CreateLinkListPopup = function (m, k, w, j, F, B, t, H, G, r) {
    if (typeof t === 'undefined') {
      t = 'link-list-popup';
    }
    if (typeof H === 'undefined') {
      H = true;
    }
    if (typeof G === 'undefined') {
      G = true;
    }
    a.RemoveLinkListPopups();
    if (!B) {
      B = '';
    }
    var l = $("<div class='" + t + " needs-pie'><ul></ul></div>");
    var y = l.children('ul');
    var I = $(F).attr('target');
    for (var C = 0, h = m.length; C < h; C++) {
      var D = m[C];
      var e = typeof D.Image != 'undefined';
      var s = e
        ? $('<li><img><a></a></li>').appendTo(y)
        : $('<li><a></a></li>').appendTo(y);
      var g = $('a', s);
      g.attr('target', I);
      if (I == '_popup') {
        g.click(a.TopicPopup_Click);
      }
      if (e) {
        var q = $('img', s);
        q.attr('src', D.Image);
        q.attr('alt', D.Title);
        g.text(' ' + D.Title);
      } else {
        g.text(D.Title);
      }
      var o = D.Link;
      g.attr('href', B + o);
      s.click(a.Item_Click);
    }
    l.appendTo(k);
    var v = l.closest('.popup-container');
    if (v.length == 0) {
      v = $(window);
    }
    if (r) {
      v = $(window);
    }
    var b = v.width();
    var d = v.height();
    var c = v.scrollTop();
    var A = v.scrollLeft();
    var z = l[0].offsetWidth;
    var u = l[0].offsetHeight;
    var E = 0;
    var p = 0;
    if (
      typeof v[0].classList != 'undefined' &&
      v[0].classList.contains('topicToolbarProxy')
    ) {
      if (typeof v.offset() != 'undefined') {
        E = v.offset().top;
        p = v.offset().left;
      }
    }
    if (G) {
      w = Math.min(w, c + E + d - u);
      w = Math.max(w, c + E);
    }
    if (H) {
      j = Math.min(j, A + p + b - z);
      j = Math.max(j, A + p);
    }
    if ((w == 0 && j == 0) || MadCap.IsIBooks()) {
      if (H) {
        j = $(F).offset().left + $(F).width();
      }
      if (G) {
        w = $(F).offset().top + $(F).height();
      }
    }
    if (MadCap.IsIBooks()) {
      l.css('display', 'inline-block');
      if (H) {
        j = j - F.offsetWidth;
      }
      if (G) {
        w = w - l[0].offsetHeight / 2;
      }
    }
    if (H && MadCap.Utilities.IsRTL()) {
      var x = 0;
      if (typeof $(F).offset() != 'undefined') {
        x += $(F).offset().left;
      }
      if (typeof $(F).width() != 'undefined') {
        x += $(F).width();
      }
      var f = Math.min($(window).width() - x, l.width());
      j = j - f;
    }
    l.css('top', w);
    l.css('left', j);
    l.css('zIndex', 1);
    l.hide().fadeIn(200);
    $triggerObject = r ? $(F) : $([document, F]);
    $triggerObject.click(function (i) {
      l.remove();
      $triggerObject.off('click', arguments.callee);
    });
    $triggerObject.keydown(function (i) {
      var i = i || windows.event;
      if (i.keyCode != 27 && i.keyCode != 13) {
        return;
      }
      if (!l.is(':focus')) {
        return;
      }
      l.remove();
      $triggerObject.off('keydown', arguments.callee);
    });
    if (!r) {
      var n = function (i) {
        a.RemoveLinkListPopups();
        v.off('click', n);
      };
      v.click(n);
    }
    l.attr('tabindex', 0);
    l.focus();
  };
  a.Item_Click = function (d) {
    var c = $('a', this);
    var b = c.attr('href');
    var f = c.attr('target');
    if (b && !MadCap.String.IsNullOrEmpty(b)) {
      if (f) {
        window.open(b, f);
      } else {
        if (
          document.parentNode != null &&
          MadCap.Utilities.HasRuntimeFileType('Topic') &&
          $('html').attr('data-mc-target-type') == 'EPUB'
        ) {
          document.parentNode.open(b);
        } else {
          document.location.href = b;
        }
      }
    }
    MadCap.Utilities.PreventDefault(d);
  };
  a.RemoveLinkListTrees = function () {
    $('.responsive-link-list').remove();
  };
  a.RemoveLinkListPopups = function () {
    $('.link-list-popup').remove();
    $('.toolbar-button-drop-down').remove();
  };
  a.AddBackgroundTint = function (c, d) {
    if (!d) {
      d = document.body;
    }
    var b = $("<div id='mc-background-tint'></div>");
    b.addClass(c);
    b.appendTo(d);
    return b[0];
  };
  a.RemoveBackgroundTint = function () {
    $('#mc-background-tint').remove();
  };
})();
/*
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 * Unlicensed use is strictly prohibited
 *
 * v13.2.6355.27565
 */
(function (a) {
  a.fn.fitVids = function (c) {
    var e = { customSelector: null };
    var d = document.createElement('div'),
      b =
        document.getElementsByTagName('base')[0] ||
        document.getElementsByTagName('script')[0];
    d.className = 'fit-vids-style';
    d.innerHTML =
      '<style>.fluid-width-video-wrapper {width: 100%;position: relative;padding: 0;} .fluid-width-video-wrapper iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; } </style>';
    b.parentNode.insertBefore(d, b);
    if (c) {
      a.extend(e, c);
    }
    return this.each(function () {
      var f = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='www.youtube.com']",
        "iframe[src*='www.kickstarter.com']",
      ];
      if (e.customSelector) {
        f.push(e.customSelector);
      }
      var g = a(this).find(f.join(','));
      g.each(function () {
        var j = a(this);
        if (j.parent('.fluid-width-video-wrapper').length) {
          return;
        }
        var m =
            j.attr('height') && !isNaN(parseInt(j.attr('height'), 10))
              ? parseInt(j.attr('height'), 10)
              : j.height(),
          l = !isNaN(parseInt(j.attr('width'), 10))
            ? parseInt(j.attr('width'), 10)
            : j.width(),
          h = m / l;
        if (!j.attr('id')) {
          var k = 'fitvid' + Math.floor(Math.random() * 999999);
          j.attr('id', k);
        }
        j.wrap('<div class="fluid-width-video-wrapper"></div>')
          .parent('.fluid-width-video-wrapper')
          .css('padding-top', h * 100 + '%');
        j.removeAttr('height').removeAttr('width');
      });
    });
  };
})(jQuery);
!(function (a) {
  var c = {},
    b = {
      mode: 'horizontal',
      slideSelector: '',
      infiniteLoop: !0,
      hideControlOnEnd: !1,
      speed: 500,
      easing: null,
      slideMargin: 0,
      startSlide: 0,
      randomStart: !1,
      captions: !1,
      ticker: !1,
      tickerHover: !1,
      adaptiveHeight: !1,
      adaptiveHeightSpeed: 500,
      video: !1,
      useCSS: !0,
      preloadImages: 'visible',
      responsive: !0,
      touchEnabled: !0,
      swipeThreshold: 50,
      oneToOneTouch: !0,
      preventDefaultSwipeX: !0,
      preventDefaultSwipeY: !1,
      pager: !0,
      pagerType: 'full',
      pagerShortSeparator: ' / ',
      pagerSelector: null,
      buildPager: null,
      pagerCustom: null,
      controls: !0,
      nextText: 'Next',
      prevText: 'Prev',
      nextSelector: null,
      prevSelector: null,
      autoControls: !1,
      startText: 'Start',
      stopText: 'Stop',
      autoControlsCombine: !1,
      autoControlsSelector: null,
      auto: !1,
      pause: 4000,
      autoStart: !0,
      autoDirection: 'next',
      autoHover: !1,
      autoDelay: 0,
      minSlides: 1,
      maxSlides: 1,
      moveSlides: 0,
      slideWidth: 0,
      onSliderLoad: function () {},
      onSlideBefore: function () {},
      onSlideAfter: function () {},
      onSlideNext: function () {},
      onSlidePrev: function () {},
      slideshowClass: '',
    };
  a.fn.MCSlider = function (aq) {
    if (0 == this.length) {
      return this;
    }
    if (this.length > 1) {
      return (
        this.each(function () {
          a(this).MCSlider(aq);
        }),
        this
      );
    }
    var ap = {},
      am = this;
    c.el = this;
    var aB = a(window).width(),
      at = a(window).height(),
      ay = function () {
        (ap.settings = a.extend({}, b, aq)),
          (ap.settings.slideWidth = parseInt(ap.settings.slideWidth)),
          (ap.children = am.children(ap.settings.slideSelector)),
          ap.children.length < ap.settings.minSlides &&
            (ap.settings.minSlides = ap.children.length),
          ap.children.length < ap.settings.maxSlides &&
            (ap.settings.maxSlides = ap.children.length),
          ap.settings.randomStart &&
            (ap.settings.startSlide = Math.floor(
              Math.random() * ap.children.length
            )),
          (ap.active = { index: ap.settings.startSlide }),
          (ap.carousel =
            ap.settings.minSlides > 1 || ap.settings.maxSlides > 1),
          ap.carousel && (ap.settings.preloadImages = 'all'),
          (ap.minThreshold =
            ap.settings.minSlides * ap.settings.slideWidth +
            (ap.settings.minSlides - 1) * ap.settings.slideMargin),
          (ap.maxThreshold =
            ap.settings.maxSlides * ap.settings.slideWidth +
            (ap.settings.maxSlides - 1) * ap.settings.slideMargin),
          (ap.working = !1),
          (ap.controls = {}),
          (ap.interval = null),
          (ap.animProp = 'vertical' == ap.settings.mode ? 'top' : 'left'),
          (ap.usingCSS =
            ap.settings.useCSS &&
            'fade' != ap.settings.mode &&
            (function () {
              var f = document.createElement('div'),
                g = [
                  'WebkitPerspective',
                  'MozPerspective',
                  'OPerspective',
                  'msPerspective',
                ];
              for (var d in g) {
                if (void 0 !== f.style[g[d]]) {
                  return (
                    (ap.cssPrefix = g[d]
                      .replace('Perspective', '')
                      .toLowerCase()),
                    (ap.animProp = '-' + ap.cssPrefix + '-transform'),
                    !0
                  );
                }
              }
              return !1;
            })()),
          'vertical' == ap.settings.mode &&
            (ap.settings.maxSlides = ap.settings.minSlides),
          am.data('origStyle', am.attr('style')),
          am.children(ap.settings.slideSelector).each(function () {
            a(this).data('origStyle', a(this).attr('style'));
          }),
          az();
      },
      az = function () {
        am.wrap(
          '<div class="mc-wrapper"><div class="mc-viewport ' +
            ap.settings.slideshowClass +
            '"></div></div>'
        ),
          (ap.viewport = am.parent()),
          (ap.loader = a('<div class="mc-loading" />')),
          ap.viewport.prepend(ap.loader),
          am.css({
            width:
              'horizontal' == ap.settings.mode
                ? 100 * ap.children.length + 215 + '%'
                : 'auto',
            position: 'relative',
          }),
          ap.usingCSS && ap.settings.easing
            ? am.css(
                '-' + ap.cssPrefix + '-transition-timing-function',
                ap.settings.easing
              )
            : ap.settings.easing || (ap.settings.easing = 'swing'),
          ax(),
          ap.viewport.css({
            width: '100%',
            overflow: 'hidden',
            position: 'relative',
          }),
          ap.viewport.parent().css({ maxWidth: ak() }),
          ap.settings.pager ||
            ap.viewport.parent().css({ margin: '0 auto 0px' }),
          ap.children.css({
            float: 'horizontal' == ap.settings.mode ? 'left' : 'none',
            listStyle: 'none',
            position: 'relative',
          }),
          ap.children.css('width', al()),
          'horizontal' == ap.settings.mode &&
            ap.settings.slideMargin > 0 &&
            ap.children.css('marginRight', ap.settings.slideMargin),
          'vertical' == ap.settings.mode &&
            ap.settings.slideMargin > 0 &&
            ap.children.css('marginBottom', ap.settings.slideMargin),
          'fade' == ap.settings.mode &&
            (ap.children.css({
              position: 'absolute',
              zIndex: 0,
              display: 'none',
            }),
            ap.children
              .eq(ap.settings.startSlide)
              .css({ zIndex: 50, display: 'block' })),
          (ap.controls.el = a('<div class="mc-controls" />')),
          ap.settings.captions && J(),
          (ap.active.last = ap.settings.startSlide == ai() - 1),
          ap.settings.video && am.fitVids();
        var d = ap.children.eq(ap.settings.startSlide);
        'all' == ap.settings.preloadImages && (d = ap.children),
          ap.settings.ticker
            ? (ap.settings.pager = !1)
            : (ap.settings.pager && F(),
              ap.settings.controls && ad(),
              ap.settings.auto && ap.settings.autoControls && ab(),
              (ap.settings.controls ||
                ap.settings.autoControls ||
                ap.settings.pager) &&
                ap.viewport.after(ap.controls.el)),
          aw(d, av);
      },
      aw = function (h, f) {
        var g = h.find('img:not([src=""])').length;
        if (0 === g) {
          return void f();
        }
        var d = 0;
        h.find('img:not([src=""])').each(function () {
          $(this)
            .one('load error', function () {
              ++d === g && f();
            })
            .each(function () {
              this.complete && $(this).load();
            });
        });
      },
      av = function () {
        if (
          ap.settings.infiniteLoop &&
          'fade' != ap.settings.mode &&
          !ap.settings.ticker
        ) {
          var g =
              'vertical' == ap.settings.mode
                ? ap.settings.minSlides
                : ap.settings.maxSlides,
            d = ap.children.slice(0, g).clone().addClass('mc-clone'),
            f = ap.children.slice(-g).clone().addClass('mc-clone');
          am.append(d).prepend(f);
        }
        ap.loader.remove(),
          G(),
          'vertical' == ap.settings.mode && (ap.settings.adaptiveHeight = !0),
          ap.viewport.height(ao()),
          am.redrawSlider(),
          ap.settings.onSliderLoad(ap.active.index),
          (ap.initialized = !0),
          ap.settings.responsive && a(window).bind('resize', ae),
          ap.settings.auto && ap.settings.autoStart && aa(),
          ap.settings.ticker && U(),
          ap.settings.pager && Z(ap.settings.startSlide),
          ap.settings.controls && s(),
          ap.settings.touchEnabled && !ap.settings.ticker && K();
      },
      ao = function () {
        var f = 0,
          d = a();
        if ('vertical' == ap.settings.mode || ap.settings.adaptiveHeight) {
          if (ap.carousel) {
            var g =
              1 == ap.settings.moveSlides
                ? ap.active.index
                : ap.active.index * ar();
            for (
              d = ap.children.eq(g), i = 1;
              i <= ap.settings.maxSlides - 1;
              i++
            ) {
              d =
                g + i >= ap.children.length
                  ? d.add(ap.children.eq(i - 1))
                  : d.add(ap.children.eq(g + i));
            }
          } else {
            d = ap.children.eq(ap.active.index);
          }
        } else {
          d = ap.children;
        }
        return (
          'vertical' == ap.settings.mode
            ? (d.each(function () {
                f += a(this).outerHeight();
              }),
              ap.settings.slideMargin > 0 &&
                (f += ap.settings.slideMargin * (ap.settings.minSlides - 1)))
            : (f = Math.max.apply(
                Math,
                d
                  .map(function () {
                    return a(this).outerHeight(!1);
                  })
                  .get()
              )),
          f
        );
      },
      ak = function () {
        var d = '100%';
        return (
          ap.settings.slideWidth > 0 &&
            (d =
              'horizontal' == ap.settings.mode
                ? ap.settings.maxSlides * ap.settings.slideWidth +
                  (ap.settings.maxSlides - 1) * ap.settings.slideMargin
                : ap.settings.slideWidth),
          d
        );
      },
      al = function () {
        var d = ap.settings.slideWidth,
          f = ap.viewport.width();
        return (
          0 == ap.settings.slideWidth ||
          (ap.settings.slideWidth > f && !ap.carousel) ||
          'vertical' == ap.settings.mode
            ? (d = f / ap.settings.minSlides)
            : ap.settings.maxSlides > 1 &&
              'horizontal' == ap.settings.mode &&
              (f > ap.maxThreshold ||
                (f < ap.minThreshold &&
                  (d =
                    (f -
                      ap.settings.slideMargin * (ap.settings.minSlides - 1)) /
                    ap.settings.minSlides))),
          d
        );
      },
      ax = function () {
        var d = 1;
        if ('horizontal' == ap.settings.mode && ap.settings.slideWidth > 0) {
          if (ap.viewport.width() < ap.minThreshold) {
            d = ap.settings.minSlides;
          } else {
            if (ap.viewport.width() > ap.maxThreshold) {
              d = ap.settings.maxSlides;
            } else {
              var f = ap.children.first().width();
              d = Math.floor(ap.viewport.width() / f);
            }
          }
        } else {
          'vertical' == ap.settings.mode && (d = ap.settings.minSlides);
        }
        return d;
      },
      ai = function () {
        var f = 0;
        if (ap.settings.moveSlides > 0) {
          if (ap.settings.infiniteLoop) {
            f = ap.children.length / ar();
          } else {
            for (var g = 0, d = 0; g < ap.children.length; ) {
              ++f,
                (g = d + ax()),
                (d +=
                  ap.settings.moveSlides <= ax()
                    ? ap.settings.moveSlides
                    : ax());
            }
          }
        } else {
          f = Math.ceil(ap.children.length / ax());
        }
        return f;
      },
      ar = function () {
        return ap.settings.moveSlides > 0 && ap.settings.moveSlides <= ax()
          ? ap.settings.moveSlides
          : ax();
      },
      G = function () {
        if (
          ap.children.length > ap.settings.maxSlides &&
          ap.active.last &&
          !ap.settings.infiniteLoop
        ) {
          if ('horizontal' == ap.settings.mode) {
            var f = ap.children.last(),
              g = f.position();
            aA(-(g.left - (ap.viewport.width() - f.width())), 'reset', 0);
          } else {
            if ('vertical' == ap.settings.mode) {
              var d = ap.children.length - ap.settings.minSlides,
                g = ap.children.eq(d).position();
              aA(-g.top, 'reset', 0);
            }
          }
        } else {
          var g = ap.children.eq(ap.active.index * ar()).position();
          ap.active.index == ai() - 1 && (ap.active.last = !0),
            void 0 != g &&
              ('horizontal' == ap.settings.mode
                ? aA(-g.left, 'reset', 0)
                : 'vertical' == ap.settings.mode && aA(-g.top, 'reset', 0));
        }
      },
      aA = function (g, k, f, h) {
        if (ap.usingCSS) {
          var l =
            'vertical' == ap.settings.mode
              ? 'translate3d(0, ' + g + 'px, 0)'
              : 'translate3d(' + g + 'px, 0, 0)';
          am.css('-' + ap.cssPrefix + '-transition-duration', f / 1000 + 's'),
            'slide' == k
              ? (am.css(ap.animProp, l),
                am.bind(
                  'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',
                  function () {
                    am.unbind(
                      'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd'
                    ),
                      ac();
                  }
                ))
              : 'reset' == k
              ? am.css(ap.animProp, l)
              : 'ticker' == k &&
                (am.css(
                  '-' + ap.cssPrefix + '-transition-timing-function',
                  'linear'
                ),
                am.css(ap.animProp, l),
                am.bind(
                  'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',
                  function () {
                    am.unbind(
                      'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd'
                    ),
                      aA(h.resetValue, 'reset', 0),
                      Q();
                  }
                ));
        } else {
          var d = {};
          (d[ap.animProp] = g),
            'slide' == k
              ? am.animate(d, f, ap.settings.easing, function () {
                  ac();
                })
              : 'reset' == k
              ? am.css(ap.animProp, g)
              : 'ticker' == k &&
                am.animate(d, speed, 'linear', function () {
                  aA(h.resetValue, 'reset', 0), Q();
                });
        }
      },
      aj = function () {
        for (var g = '', d = ai(), f = 0; d > f; f++) {
          var h = '';
          ap.settings.buildPager && a.isFunction(ap.settings.buildPager)
            ? ((h = ap.settings.buildPager(f)),
              ap.pagerEl.addClass('mc-custom-pager'))
            : ((h = f + 1), ap.pagerEl.addClass('mc-default-pager')),
            (g +=
              '<div class="mc-pager-item"><a data-slide-index="' +
              f +
              '" class="mc-pager-link">' +
              h +
              '</a></div>');
        }
        ap.pagerEl.html(g);
      },
      F = function () {
        ap.settings.pagerCustom
          ? (ap.pagerEl = a(ap.settings.pagerCustom))
          : ((ap.pagerEl = a('<div class="mc-pager" />')),
            ap.settings.pagerSelector
              ? a(ap.settings.pagerSelector).html(ap.pagerEl)
              : ap.controls.el.addClass('mc-has-pager').append(ap.pagerEl),
            aj()),
          ap.pagerEl.delegate('a', 'click', an);
      },
      ad = function () {
        (ap.controls.next = a(
          '<a class="mc-next">' + ap.settings.nextText + '</a>'
        )),
          (ap.controls.prev = a(
            '<a class="mc-prev">' + ap.settings.prevText + '</a>'
          )),
          ap.controls.next.bind('click', ah),
          ap.controls.prev.bind('click', ag),
          ap.settings.nextSelector &&
            a(ap.settings.nextSelector).append(ap.controls.next),
          ap.settings.prevSelector &&
            a(ap.settings.prevSelector).append(ap.controls.prev),
          ap.settings.nextSelector ||
            ap.settings.prevSelector ||
            ((ap.controls.directionEl = a(
              '<div class="mc-controls-direction" />'
            )),
            ap.controls.directionEl
              .append(ap.controls.prev)
              .append(ap.controls.next),
            ap.controls.el
              .addClass('mc-has-controls-direction')
              .append(ap.controls.directionEl));
      },
      ab = function () {
        (ap.controls.start = a(
          '<div class="mc-controls-auto-item"><a class="mc-start">' +
            ap.settings.startText +
            '</a></div>'
        )),
          (ap.controls.stop = a(
            '<div class="mc-controls-auto-item"><a class="mc-stop">' +
              ap.settings.stopText +
              '</a></div>'
          )),
          (ap.controls.autoEl = a('<div class="mc-controls-auto" />')),
          ap.controls.autoEl.delegate('.mc-start', 'click', au),
          ap.controls.autoEl.delegate('.mc-stop', 'click', R),
          ap.settings.autoControlsCombine
            ? ap.controls.autoEl.append(ap.controls.start)
            : ap.controls.autoEl
                .append(ap.controls.start)
                .append(ap.controls.stop),
          ap.settings.autoControlsSelector
            ? a(ap.settings.autoControlsSelector).html(ap.controls.autoEl)
            : ap.controls.el
                .addClass('mc-has-controls-auto')
                .append(ap.controls.autoEl),
          af(ap.settings.autoStart ? 'stop' : 'start');
      },
      J = function () {
        ap.children.each(function () {
          var d = a(this).attr('title');
          void 0 != d &&
            ('' + d).length &&
            a(this).append(
              '<div class="mc-caption"><div>' + d + '</div></div>'
            );
        });
      },
      ah = function (d) {
        ap.settings.auto && am.stopAuto(),
          am.goToNextSlide(),
          d.preventDefault();
      },
      ag = function (d) {
        ap.settings.auto && am.stopAuto(),
          am.goToPrevSlide(),
          d.preventDefault();
      },
      au = function (d) {
        am.startAuto(), d.preventDefault();
      },
      R = function (d) {
        am.stopAuto(), d.preventDefault();
      },
      an = function (g) {
        ap.settings.auto && am.stopAuto();
        var d = a(g.currentTarget),
          f = parseInt(d.attr('data-slide-index'));
        f != ap.active.index && am.goToSlide(f), g.preventDefault();
      },
      Z = function (f) {
        var d = ap.children.length;
        return 'short' == ap.settings.pagerType
          ? (ap.settings.maxSlides > 1 &&
              (d = Math.ceil(ap.children.length / ap.settings.maxSlides)),
            ap.pagerEl.html(f + 1 + ap.settings.pagerShortSeparator + d),
            void 0)
          : (ap.pagerEl.find('a').removeClass('active'),
            ap.pagerEl.each(function (g, h) {
              a(h).find('a').eq(f).addClass('active');
            }),
            void 0);
      },
      ac = function () {
        if (ap.settings.infiniteLoop) {
          var d = '';
          0 == ap.active.index
            ? (d = ap.children.eq(0).position())
            : ap.active.index == ai() - 1 && ap.carousel
            ? (d = ap.children.eq((ai() - 1) * ar()).position())
            : ap.active.index == ap.children.length - 1 &&
              (d = ap.children.eq(ap.children.length - 1).position()),
            'horizontal' == ap.settings.mode
              ? aA(-d.left, 'reset', 0)
              : 'vertical' == ap.settings.mode && aA(-d.top, 'reset', 0);
        }
        (ap.working = !1),
          ap.settings.onSlideAfter(
            ap.children.eq(ap.active.index),
            ap.oldIndex,
            ap.active.index
          );
      },
      af = function (d) {
        ap.settings.autoControlsCombine
          ? ap.controls.autoEl.html(ap.controls[d])
          : (ap.controls.autoEl.find('a').removeClass('active'),
            ap.controls.autoEl.find('a:not(.mc-' + d + ')').addClass('active'));
      },
      s = function () {
        1 == ai()
          ? (ap.controls.prev.addClass('disabled'),
            ap.controls.next.addClass('disabled'))
          : !ap.settings.infiniteLoop &&
            ap.settings.hideControlOnEnd &&
            (0 == ap.active.index
              ? (ap.controls.prev.addClass('disabled'),
                ap.controls.next.removeClass('disabled'))
              : ap.active.index == ai() - 1
              ? (ap.controls.next.addClass('disabled'),
                ap.controls.prev.removeClass('disabled'))
              : (ap.controls.prev.removeClass('disabled'),
                ap.controls.next.removeClass('disabled')));
      },
      aa = function () {
        ap.settings.autoDelay > 0
          ? setTimeout(am.startAuto, ap.settings.autoDelay)
          : am.startAuto(),
          ap.settings.autoHover &&
            am.hover(
              function () {
                ap.interval && (am.stopAuto(!0), (ap.autoPaused = !0));
              },
              function () {
                ap.autoPaused && (am.startAuto(!0), (ap.autoPaused = null));
              }
            );
      },
      U = function () {
        var f = 0;
        if ('next' == ap.settings.autoDirection) {
          am.append(ap.children.clone().addClass('mc-clone'));
        } else {
          am.prepend(ap.children.clone().addClass('mc-clone'));
          var d = ap.children.first().position();
          f = 'horizontal' == ap.settings.mode ? -d.left : -d.top;
        }
        aA(f, 'reset', 0),
          (ap.settings.pager = !1),
          (ap.settings.controls = !1),
          (ap.settings.autoControls = !1),
          ap.settings.tickerHover &&
            !ap.usingCSS &&
            ap.viewport.hover(
              function () {
                am.stop();
              },
              function () {
                var k = 0;
                ap.children.each(function () {
                  k +=
                    'horizontal' == ap.settings.mode
                      ? a(this).outerWidth(!0)
                      : a(this).outerHeight(!0);
                });
                var g = ap.settings.speed / k,
                  h = 'horizontal' == ap.settings.mode ? 'left' : 'top',
                  l = g * (k - Math.abs(parseInt(am.css(h))));
                Q(l);
              }
            ),
          Q();
      },
      Q = function (g) {
        speed = g ? g : ap.settings.speed;
        var k = { left: 0, top: 0 },
          f = { left: 0, top: 0 };
        'next' == ap.settings.autoDirection
          ? (k = am.find('.mc-clone').first().position())
          : (f = ap.children.first().position());
        var h = 'horizontal' == ap.settings.mode ? -k.left : -k.top,
          l = 'horizontal' == ap.settings.mode ? -f.left : -f.top,
          d = { resetValue: l };
        aA(h, 'ticker', speed, d);
      },
      K = function () {
        (ap.touch = { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } }),
          ap.viewport.bind('touchstart', j);
      },
      j = function (d) {
        if (ap.working) {
          d.preventDefault();
        } else {
          ap.touch.originalPos = am.position();
          var f = d.originalEvent;
          (ap.touch.start.x = f.changedTouches[0].pageX),
            (ap.touch.start.y = f.changedTouches[0].pageY),
            ap.viewport.bind('touchmove', e),
            ap.viewport.bind('touchend', t);
        }
      },
      e = function (f) {
        var k = f.originalEvent,
          d = Math.abs(k.changedTouches[0].pageX - ap.touch.start.x),
          g = Math.abs(k.changedTouches[0].pageY - ap.touch.start.y);
        if (
          (3 * d > g && ap.settings.preventDefaultSwipeX
            ? f.preventDefault()
            : 3 * g > d &&
              ap.settings.preventDefaultSwipeY &&
              f.preventDefault(),
          'fade' != ap.settings.mode && ap.settings.oneToOneTouch)
        ) {
          var l = 0;
          if ('horizontal' == ap.settings.mode) {
            var h = k.changedTouches[0].pageX - ap.touch.start.x;
            l = ap.touch.originalPos.left + h;
          } else {
            var h = k.changedTouches[0].pageY - ap.touch.start.y;
            l = ap.touch.originalPos.top + h;
          }
          aA(l, 'reset', 0);
        }
      },
      t = function (f) {
        ap.viewport.unbind('touchmove', e);
        var h = f.originalEvent,
          d = 0;
        if (
          ((ap.touch.end.x = h.changedTouches[0].pageX),
          (ap.touch.end.y = h.changedTouches[0].pageY),
          'fade' == ap.settings.mode)
        ) {
          var g = Math.abs(ap.touch.start.x - ap.touch.end.x);
          g >= ap.settings.swipeThreshold &&
            (ap.touch.start.x > ap.touch.end.x
              ? am.goToNextSlide()
              : am.goToPrevSlide(),
            am.stopAuto());
        } else {
          var g = 0;
          'horizontal' == ap.settings.mode
            ? ((g = ap.touch.end.x - ap.touch.start.x),
              (d = ap.touch.originalPos.left))
            : ((g = ap.touch.end.y - ap.touch.start.y),
              (d = ap.touch.originalPos.top)),
            !ap.settings.infiniteLoop &&
            ((0 == ap.active.index && g > 0) || (ap.active.last && 0 > g))
              ? aA(d, 'reset', 200)
              : Math.abs(g) >= ap.settings.swipeThreshold
              ? (0 > g ? am.goToNextSlide() : am.goToPrevSlide(), am.stopAuto())
              : aA(d, 'reset', 200);
        }
        ap.viewport.unbind('touchend', t);
      },
      ae = function () {
        var f = a(window).width(),
          d = a(window).height();
        if (
          !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
        ) {
          (aB != f || at != d) && ((aB = f), (at = d), am.redrawSlider());
        }
      };
    return (
      (am.goToSlide = function (o, k) {
        if (!ap.working && ap.active.index != o) {
          if (
            ((ap.working = !0),
            (ap.oldIndex = ap.active.index),
            (ap.active.index = 0 > o ? ai() - 1 : o >= ai() ? 0 : o),
            ap.settings.onSlideBefore(
              ap.children.eq(ap.active.index),
              ap.oldIndex,
              ap.active.index
            ),
            'next' == k
              ? ap.settings.onSlideNext(
                  ap.children.eq(ap.active.index),
                  ap.oldIndex,
                  ap.active.index
                )
              : 'prev' == k &&
                ap.settings.onSlidePrev(
                  ap.children.eq(ap.active.index),
                  ap.oldIndex,
                  ap.active.index
                ),
            (ap.active.last = ap.active.index >= ai() - 1),
            ap.settings.pager && Z(ap.active.index),
            ap.settings.controls && s(),
            'fade' == ap.settings.mode)
          ) {
            ap.settings.adaptiveHeight &&
              ap.viewport.height() != ao() &&
              ap.viewport.animate(
                { height: ao() },
                ap.settings.adaptiveHeightSpeed
              ),
              ap.children
                .filter(':visible')
                .fadeOut(ap.settings.speed)
                .css({ zIndex: 0 }),
              ap.children
                .eq(ap.active.index)
                .css('zIndex', 51)
                .fadeIn(ap.settings.speed, function () {
                  a(this).css('zIndex', 50), ac();
                });
          } else {
            ap.settings.adaptiveHeight &&
              ap.viewport.height() != ao() &&
              ap.viewport.animate(
                { height: ao() },
                ap.settings.adaptiveHeightSpeed
              );
            var u = 0,
              f = { left: 0, top: 0 };
            if (!ap.settings.infiniteLoop && ap.carousel && ap.active.last) {
              if ('horizontal' == ap.settings.mode) {
                var r = ap.children.eq(ap.children.length - 1);
                (f = r.position()), (u = ap.viewport.width() - r.outerWidth());
              } else {
                var h = ap.children.length - ap.settings.minSlides;
                f = ap.children.eq(h).position();
              }
            } else {
              if (ap.carousel && ap.active.last && 'prev' == k) {
                var p =
                    1 == ap.settings.moveSlides
                      ? ap.settings.maxSlides - ar()
                      : (ai() - 1) * ar() -
                        (ap.children.length - ap.settings.maxSlides),
                  r = am.children('.mc-clone').eq(p);
                f = r.position();
              } else {
                if ('next' == k && 0 == ap.active.index) {
                  (f = am
                    .find('> .mc-clone')
                    .eq(ap.settings.maxSlides)
                    .position()),
                    (ap.active.last = !1);
                } else {
                  if (o >= 0) {
                    var q = o * ar();
                    f = ap.children.eq(q).position();
                  }
                }
              }
            }
            if ('undefined' != typeof f) {
              var m = 'horizontal' == ap.settings.mode ? -(f.left - u) : -f.top;
              aA(m, 'slide', ap.settings.speed);
            }
          }
        }
      }),
      (am.goToNextSlide = function () {
        if (ap.settings.infiniteLoop || !ap.active.last) {
          var d = parseInt(ap.active.index) + 1;
          am.goToSlide(d, 'next');
        }
      }),
      (am.goToPrevSlide = function () {
        if (ap.settings.infiniteLoop || 0 != ap.active.index) {
          var d = parseInt(ap.active.index) - 1;
          am.goToSlide(d, 'prev');
        }
      }),
      (am.startAuto = function (d) {
        ap.interval ||
          ((ap.interval = setInterval(function () {
            'next' == ap.settings.autoDirection
              ? am.goToNextSlide()
              : am.goToPrevSlide();
          }, ap.settings.pause)),
          ap.settings.autoControls && 1 != d && af('stop'));
      }),
      (am.stopAuto = function (d) {
        ap.interval &&
          (clearInterval(ap.interval),
          (ap.interval = null),
          ap.settings.autoControls && 1 != d && af('start'));
      }),
      (am.getCurrentSlide = function () {
        return ap.active.index;
      }),
      (am.getSlideCount = function () {
        return ap.children.length;
      }),
      (am.redrawSlider = function () {
        ap.children.add(am.find('.mc-clone')).outerWidth(al()),
          ap.viewport.css('height', ao()),
          ap.settings.ticker || G(),
          ap.active.last && (ap.active.index = ai() - 1),
          ap.active.index >= ai() && (ap.active.last = !0),
          ap.settings.pager &&
            !ap.settings.pagerCustom &&
            (aj(), Z(ap.active.index));
      }),
      (am.destroySlider = function () {
        ap.initialized &&
          ((ap.initialized = !1),
          a('.mc-clone', this).remove(),
          ap.children.each(function () {
            void 0 != a(this).data('origStyle')
              ? a(this).attr('style', a(this).data('origStyle'))
              : a(this).removeAttr('style');
          }),
          void 0 != a(this).data('origStyle')
            ? this.attr('style', a(this).data('origStyle'))
            : a(this).removeAttr('style'),
          a(this).unwrap().unwrap(),
          ap.controls.el && ap.controls.el.remove(),
          ap.controls.next && ap.controls.next.remove(),
          ap.controls.prev && ap.controls.prev.remove(),
          ap.pagerEl && ap.pagerEl.remove(),
          a('.mc-caption', this).remove(),
          ap.controls.autoEl && ap.controls.autoEl.remove(),
          clearInterval(ap.interval),
          ap.settings.responsive && a(window).unbind('resize', ae));
      }),
      (am.reloadSlider = function (d) {
        void 0 != d && (aq = d), am.destroySlider(), ay();
      }),
      ay(),
      this
    );
  };
})(jQuery);
(function () {
  var a = MadCap.CreateNamespace('Slideshow');
  $(function () {
    if (MadCap.Utilities != null && MadCap.Utilities.LoadHandlers != null) {
      MadCap.Utilities.LoadHandlers.MadCapSlideshow = a.Init;
      a.Init(document);
    }
  });
  a.Init = function (b) {
    var c;
    if ($('html').attr('data-mc-target-type')) {
      c = function (e, d) {
        return e.attr('data-mc-' + d);
      };
    } else {
      c = function (e, d) {
        return e.attr('madcap:' + d.replace('-', ''));
      };
    }
    $('.MCSlider', b).each(function (q, h) {
      var I = $(h);
      var l = {};
      var u = h.className;
      var f = c(I, 'random-start');
      var z = c(I, 'infinite-loop');
      var r = c(I, 'show-captions');
      var w = c(I, 'controls');
      var y = c(I, 'slide-width');
      var x = c(I, 'adaptive-height');
      var k = c(I, 'responsive');
      var j = c(I, 'navigation');
      var s = true;
      var e = false;
      l.pagerCustom = null;
      if (j) {
        if (j == 'Thumbnails') {
          e = true;
          l.pagerCustom = '#mc-pager' + (q + 1).toString();
        }
        if (j == 'None') {
          s = false;
        }
      }
      var F = c(I, 'auto-hover');
      var m = c(I, 'auto-start');
      var H = c(I, 'auto-controls');
      var d = c(I, 'combine-controls');
      var D = c(I, 'auto-direction');
      var E = +c(I, 'auto-delay');
      var t = c(I, 'mode');
      var A = +c(I, 'speed');
      var o = +c(I, 'pause');
      var C = +c(I, 'slides-displayed');
      var B = c(I, 'video');
      if (u) {
        l.slideshowClass = u;
      }
      if (f) {
        if ('true' == f.toString().toLowerCase()) {
          l.randomStart = true;
        } else {
          if ('false' == f.toString().toLowerCase()) {
            l.randomStart = false;
          }
        }
      }
      if (z) {
        if ('true' == z.toString().toLowerCase()) {
          l.infiniteLoop = true;
        } else {
          if ('false' == z.toString().toLowerCase()) {
            l.infiniteLoop = false;
            l.hideControlOnEnd = true;
          }
        }
      }
      if (r) {
        if ('true' == r.toString().toLowerCase()) {
          l.captions = true;
        } else {
          if ('false' == r.toString().toLowerCase()) {
            l.captions = false;
          }
        }
      }
      if (w) {
        if ('true' == w.toString().toLowerCase()) {
          l.controls = true;
        } else {
          if ('false' == w.toString().toLowerCase()) {
            l.controls = false;
          }
        }
      }
      l.pager = s;
      l.thumbnails = e;
      if (y) {
        l.slideWidth = y;
      }
      if (x) {
        if ('true' == x.toString().toLowerCase()) {
          l.adaptiveHeight = true;
        } else {
          if ('false' == x.toString().toLowerCase()) {
            l.adaptiveHeight = false;
          }
        }
      }
      if (k) {
        if ('true' == k.toString().toLowerCase()) {
          l.responsive = true;
        } else {
          if ('false' == k.toString().toLowerCase()) {
            l.responsive = false;
          }
        }
      }
      var p = false;
      if (F) {
        if ('true' == F.toString().toLowerCase()) {
          l.autoHover = true;
          p = true;
        } else {
          if ('false' == F.toString().toLowerCase()) {
            l.autoHover = false;
          }
        }
      }
      if (m) {
        if ('true' == m.toString().toLowerCase()) {
          l.autoStart = true;
          p = true;
        } else {
          if ('false' == m.toString().toLowerCase()) {
            l.autoStart = false;
          }
        }
      }
      if (H) {
        if ('true' == H.toString().toLowerCase()) {
          l.autoControls = true;
          l.autoControlsCombine = true;
          p = true;
        } else {
          if ('false' == H.toString().toLowerCase()) {
            l.autoControls = false;
            l.autoControlsCombine = false;
          }
        }
      }
      if (p) {
        l.auto = true;
      }
      if (D) {
        l.autoDirection = D;
      }
      if (E) {
        l.autoDelay = E;
      }
      if (t) {
        l.mode = t;
      }
      if (A) {
        l.speed = A;
      }
      if (o) {
        l.pause = o;
      }
      if (C) {
        l.minSlides = C;
        l.maxSlides = C;
        l.moveSlides = 1;
        if (y) {
          var G = y.match(/\d+/);
          var v = y.replace(/\d/g, '');
          l.slideWidth = G / C + v;
        }
      }
      if (navigator.userAgent.indexOf('MSIE') !== -1) {
        l.preloadImages = 'all';
      }
      l.video = true;
      l.useCSS = false;
      if (B) {
        l.video = false;
      }
      l.onSliderLoad = function (J) {
        $('.MCSlide').css('visibility', 'visible');
      };
      var g;
      var n;
      if (
        MadCap.Utilities != null &&
        MadCap.Utilities.HasRuntimeFileType('Topic') &&
        $('html').attr('data-mc-target-type') != 'EPUB' &&
        $('html').attr('data-mc-target-type') != 'EclipseHelp'
      ) {
        MadCap.Utilities.CrossFrame.PostMessageRequest(
          parent,
          'get-href',
          null,
          function (O) {
            if (O) {
              var K = new MadCap.Utilities.Url(decodeURIComponent(O[0]));
              var J = new MadCap.Utilities.Url(K.Fragment.substring(1));
              g = J.Fragment;
              n = K.QueryMap.GetItem('Highlight');
              if (g) {
                g = g.substring(1);
                g = g.replace('.', '\\.');
                try {
                  l.startSlide = $('[name=' + g + ']')
                    .closest('.MCSlide')
                    .index();
                  if (l.startSlide < 0) {
                    l.startSlide = 0;
                  }
                } catch (N) {
                  l.startSlide = 0;
                }
              } else {
                if (n) {
                  var M = n.replace('"', '').split(' ');
                  for (var L = 0; L < M.length; L++) {
                    if (M[L] == '') {
                      M.splice(M[L], 1);
                      L--;
                    }
                  }
                  $('.MCSlide', b).each(function (P, S) {
                    for (var R = 0; R < M.length; R++) {
                      if (M[R] != '') {
                        var Q = new RegExp('\\b' + M[R] + '\\b', 'i');
                        var U = $(S).attr('title');
                        if (U != null && U.match(Q)) {
                          l.startSlide = P;
                          return false;
                        }
                        var T = $(S).text();
                        if (T != null && T.match(Q)) {
                          l.startSlide = P;
                          return false;
                        }
                      }
                    }
                    if (l.startSlide < 0) {
                      l.startSlide = 0;
                    }
                  });
                }
              }
            }
            I.MCSlider(l);
          }
        );
      } else {
        I.MCSlider(l);
      }
    });
  };
})();
/*
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 * Unlicensed use is strictly prohibited
 *
 * v13.2.6355.27565
 */
(function () {
  MadCap.WebHelp = MadCap.CreateNamespace('WebHelp');
  MadCap.WebHelp.FeedbackController = function (g) {
    var f = this;
    var e = 0;
    this.Server = g;
    this.FeedbackServer = c(g);
    this.Version = -1;
    this.FeedbackActive = false;
    this.PulseServer = null;
    this.PulseEnabled = false;
    this.PulseActive = false;
    this.PulseUserGuid = null;
    function c(j, i) {
      if (j == null) {
        return null;
      }
      if (typeof i == 'undefined') {
        i = '';
      }
      var h = new MadCap.Utilities.Url(j);
      h = h.CombinePath(
        i + 'Service.FeedbackExplorer/FeedbackJsonService.asmx/'
      );
      return h.FullPath;
    }
    function d(w, v, o, k) {
      if (typeof MadCap.WebHelp.FeedbackController.Shared == 'undefined') {
        MadCap.WebHelp.FeedbackController.Shared = f;
      }
      var z = document.createElement('script');
      var l = document.getElementsByTagName('head')[0];
      var s = 'MCLiveHelpScript_' + e++;
      var m = f.FeedbackServer + w + '?';
      m +=
        'OnComplete=' +
        v +
        '&ScriptID=' +
        s +
        '&UniqueID=' +
        new Date().getTime();
      if (o != null) {
        for (var x = 0, j = o.length; x < j; x++) {
          var t = o[x];
          var B = t[0];
          var u = encodeURIComponent(t[1]);
          m += '&' + B + '=' + u;
        }
      }
      if (document.body.currentStyle != null) {
        var q = 2083;
        if (m.length > q) {
          var r = m.length - q;
          var A = { ExceedAmount: r };
          var y = new MadCap.FeedbackException(-1, 'URL limit exceeded.', A);
          throw y;
        }
      }
      var n = 2048;
      var p = m.indexOf('?');
      var h = m.substring(p + 1).length;
      if (h > n) {
        var r = h - n;
        var A = { ExceedAmount: r };
        var y = new MadCap.FeedbackException(
          -1,
          'Query string limit exceeded.',
          A
        );
        throw y;
      }
      z.id = s;
      z.setAttribute('type', 'text/javascript');
      z.setAttribute('src', m);
      l.appendChild(z);
      return s;
    }
    function b(h) {
      window.setTimeout(function () {
        var i = document.getElementById(h);
        i.parentNode.removeChild(i);
      }, 10);
    }
    this.Init = (function () {
      var k = false;
      var h = false;
      var i = new Array();
      var l = 3000;
      function j() {
        for (var m = 0; m < i.length; m++) {
          i[m].apply(this, arguments);
        }
        k = true;
      }
      return function (m) {
        if (k) {
          m.apply(this, arguments);
          return;
        }
        if (m != null) {
          i.push(m);
        }
        if (h) {
          return;
        }
        h = true;
        this.GetVersion(
          function () {
            if (this.PulseEnabled) {
              this.GetPulseServerActivated(
                function (n) {
                  this.PulseActive = n && n.toLowerCase() === 'true';
                  j.apply(this, arguments);
                },
                null,
                this
              );
            } else {
              j();
            }
          },
          null,
          this
        );
        window.setTimeout(function () {
          if (!k) {
            j.apply(this, arguments);
          }
        }, l);
      };
    })();
    this.GetUserGuid = function () {
      return f.PulseEnabled
        ? f.PulseUserGuid
        : MadCap.Utilities.Store.getItem('LiveHelpUserGuid');
    };
    this.LogTopic = function (i, j, h) {
      this.LogTopicOnComplete = function (k) {
        if (h != null) {
          h();
        }
        b(k);
        this.LogTopicOnComplete = null;
      };
      this.GetVersion(function (k) {
        if (k == 1) {
          d(
            'LogTopic',
            'MadCap.WebHelp.FeedbackController.Shared.LogTopicOnComplete',
            [['TopicID', i]]
          );
        } else {
          d(
            'LogTopic2',
            'MadCap.WebHelp.FeedbackController.Shared.LogTopicOnComplete',
            [
              ['TopicID', i],
              ['CSHID', j],
            ]
          );
        }
      });
    };
    this.LogSearch = function (h, k, i, l, j) {
      this.LogSearchOnComplete = function (m) {
        b(m);
        this.LogSearchOnComplete = null;
      };
      d(
        'LogSearch',
        'MadCap.WebHelp.FeedbackController.Shared.LogSearchOnComplete',
        [
          ['ProjectID', h],
          ['UserGuid', k],
          ['ResultCount', i],
          ['Language', l],
          ['Query', j],
        ]
      );
    };
    this.AddComment = function (j, l, k, i, n, m, h) {
      this.AddCommentOnComplete = function (o) {
        if (h != null) {
          h();
        }
        b(o);
        this.AddCommentOnComplete = null;
      };
      d(
        'AddComment',
        'MadCap.WebHelp.FeedbackController.Shared.AddCommentOnComplete',
        [
          ['TopicID', j],
          ['UserGuid', l],
          ['Username', k],
          ['Subject', i],
          ['Comment', n],
          ['ParentCommentID', m],
        ]
      );
    };
    this.GetAverageRating = function (j, h, i) {
      if (j == null) {
        if (h != null) {
          h(0, 0, i);
        }
        return;
      }
      this.GetAverageRatingOnComplete = function (m, l, k) {
        if (h != null) {
          h(l, k, i);
        }
        b(m);
        this.GetAverageRatingOnComplete = null;
      };
      d(
        'GetAverageRating',
        'MadCap.WebHelp.FeedbackController.Shared.GetAverageRatingOnComplete',
        [['TopicID', j]]
      );
    };
    this.SubmitRating = function (j, k, m, h, i) {
      this.SubmitRatingOnComplete = function (n) {
        if (h != null) {
          h(i);
        }
        b(n);
        this.SubmitRatingOnComplete = null;
      };
      var l = d(
        'SubmitRating',
        'MadCap.WebHelp.FeedbackController.Shared.SubmitRatingOnComplete',
        [
          ['TopicID', j],
          ['Rating', k],
          ['Comment', m],
        ]
      );
    };
    this.GetTopicComments = function (j, l, k, h, i) {
      this.GetTopicCommentsOnComplete = function (o, n) {
        if (h != null) {
          h(n, i);
        }
        b(o);
        this.GetTopicCommentsOnComplete = null;
      };
      var m = d(
        'GetTopicComments',
        'MadCap.WebHelp.FeedbackController.Shared.GetTopicCommentsOnComplete',
        [
          ['TopicID', j],
          ['UserGuid', l],
          ['Username', k],
        ]
      );
    };
    this.GetAnonymousEnabled = function (i, h, j) {
      this.GetAnonymousEnabledOnComplete = function (l, k) {
        if (h != null) {
          h(k, j);
        }
        b(l);
        this.GetAnonymousEnabledOnComplete = null;
      };
      d(
        'GetAnonymousEnabled',
        'MadCap.WebHelp.FeedbackController.Shared.GetAnonymousEnabledOnComplete',
        [['ProjectID', i]]
      );
    };
    this.StartActivateUser = function (m, r, p) {
      this.StartActivateUserOnComplete = function (A, z) {
        if (r != null) {
          r(z, p);
        }
        b(A);
        this.StartActivateUserOnComplete = null;
      };
      var y = FMCGetChildNodeByAttribute(m.documentElement, 'Name', 'Username');
      var j = FMCGetAttribute(y, 'Value');
      var n = FMCGetChildNodeByAttribute(
        m.documentElement,
        'Name',
        'EmailAddress'
      );
      var i = FMCGetAttribute(n, 'Value');
      var t = FMCGetChildNodeByAttribute(
        m.documentElement,
        'Name',
        'FirstName'
      );
      var h = FMCGetAttribute(t, 'Value');
      var x = FMCGetChildNodeByAttribute(m.documentElement, 'Name', 'LastName');
      var s = FMCGetAttribute(x, 'Value');
      var w = FMCGetChildNodeByAttribute(m.documentElement, 'Name', 'Country');
      var v = FMCGetAttribute(w, 'Value');
      var u = FMCGetChildNodeByAttribute(
        m.documentElement,
        'Name',
        'PostalCode'
      );
      var o = FMCGetAttribute(u, 'Value');
      var k = FMCGetChildNodeByAttribute(m.documentElement, 'Name', 'Gender');
      var q = FMCGetAttribute(k, 'Value');
      var l = '';
      d(
        'StartActivateUser',
        'MadCap.WebHelp.FeedbackController.Shared.StartActivateUserOnComplete',
        [
          ['Username', j],
          ['EmailAddress', i],
          ['FirstName', h],
          ['LastName', s],
          ['Country', v],
          ['Zip', o],
          ['Gender', q],
          ['UILanguageOrder', l],
        ]
      );
    };
    this.StartActivateUser2 = function (k, h, j, l) {
      var i = MadCap.Utilities.Xhr.GetOuterXml(k);
      this.StartActivateUser2OnComplete = function (n, m) {
        if (h != null) {
          if (l != null) {
            h.call(l, m, j);
          } else {
            h(m, j);
          }
        }
        b(n);
        this.StartActivateUser2OnComplete = null;
      };
      d(
        'StartActivateUser2',
        'MadCap.WebHelp.FeedbackController.Shared.StartActivateUser2OnComplete',
        [['Xml', i]]
      );
    };
    this.UpdateUserProfile = function (k, l, h, j, m) {
      var i = MadCap.Utilities.Xhr.GetOuterXml(l);
      this.UpdateUserProfileOnComplete = function (o, n) {
        if (h != null) {
          if (m != null) {
            h.call(m, n, j);
          } else {
            h(n, j);
          }
        }
        b(o);
        this.UpdateUserProfileOnComplete = null;
      };
      d(
        'UpdateUserProfile',
        'MadCap.WebHelp.FeedbackController.Shared.UpdateUserProfileOnComplete',
        [
          ['Guid', k],
          ['Xml', i],
        ]
      );
    };
    this.GetUserProfile = function (j, h, i, k) {
      this.GetUserProfileOnComplete = function (m, l) {
        if (h != null) {
          if (k != null) {
            h.call(k, l, i);
          } else {
            h(l, i);
          }
        }
        b(m);
        this.GetUserProfileOnComplete = null;
      };
      d(
        'GetUserProfile',
        'MadCap.WebHelp.FeedbackController.Shared.GetUserProfileOnComplete',
        [['Guid', j]]
      );
    };
    this.CheckUserStatus = function (j, h, i) {
      this.CheckUserStatusOnComplete = function (l, k) {
        if (h != null) {
          h(k, i);
        }
        b(l);
        this.CheckUserStatusOnComplete = null;
      };
      d(
        'CheckUserStatus',
        'MadCap.WebHelp.FeedbackController.Shared.CheckUserStatusOnComplete',
        [['PendingGuid', j]]
      );
    };
    this.GetSynonymsFile = function (i, k, h, j) {
      this.GetSynonymsFileOnComplete = function (m, l) {
        if (h != null) {
          h(l, j);
        }
        b(m);
      };
      d(
        'GetSynonymsFile',
        'MadCap.WebHelp.FeedbackController.Shared.GetSynonymsFileOnComplete',
        [
          ['ProjectID', i],
          ['UpdatedSince', k],
        ]
      );
    };
    this.GetVersion = function (h, i, j) {
      this.GetVersionOnComplete = function (l, k) {
        if (k == null) {
          f.Version = 1;
        } else {
          if (f.Version == -1 && k > 4) {
            f.FeedbackServer = c(f.Server, 'Feedback/');
            f.PulseServer = f.Server;
            f.PulseEnabled = true;
          }
          f.FeedbackActive = true;
          f.Version = k;
        }
        if (h != null) {
          if (j != null) {
            h.call(j, f.Version, i);
          } else {
            h(f.Version, i);
          }
        }
        if (l != null) {
          b(l);
        }
        this.GetVersionOnComplete = null;
      };
      if (f.Version == -1) {
        d(
          'GetVersion',
          'MadCap.WebHelp.FeedbackController.Shared.GetVersionOnComplete'
        );
      } else {
        this.GetVersionOnComplete(null, f.Version);
      }
    };
    this.GetPulseServerActivated = function (i, h, j) {
      this.GetPulseServerActivatedOnComplete = function (l, k) {
        if (i != null) {
          if (j != null) {
            i.call(j, k, h);
          } else {
            i(k, h);
          }
        }
        if (l != null) {
          b(l);
        }
        this.GetPulseServerActivatedOnComplete = null;
      };
      d(
        'GetPulseServerActivated',
        'MadCap.WebHelp.FeedbackController.Shared.GetPulseServerActivatedOnComplete'
      );
    };
    this.GetPulseStreamID = function (i, j, h, k) {
      this.GetPulseStreamIDOnComplete = function (m, l) {
        if (j != null) {
          if (k != null) {
            j.call(k, l, h);
          } else {
            j(l, h);
          }
        }
        if (m != null) {
          b(m);
        }
        this.GetPulseStreamIDOnComplete = null;
      };
      d(
        'GetPulseStreamID',
        'MadCap.WebHelp.FeedbackController.Shared.GetPulseStreamIDOnComplete',
        [['TopicID', i]]
      );
    };
    this.GetTopicPathByStreamID = function (j, i, h, k) {
      this.GetTopicPathByStreamIDOnComplete = function (l, m) {
        if (i != null) {
          if (k != null) {
            i.call(k, m, h);
          } else {
            i(m, h);
          }
        }
        if (l != null) {
          b(l);
        }
        this.GetTopicPathByStreamIDOnComplete = null;
      };
      d(
        'GetTopicPathByStreamID',
        'MadCap.WebHelp.FeedbackController.Shared.GetTopicPathByStreamIDOnComplete',
        [['StreamID', j]]
      );
    };
    this.GetTopicPathByPageID = function (h, j, i, k) {
      this.GetTopicPathByPageIDOnComplete = function (l, m) {
        if (j != null) {
          if (k != null) {
            j.call(k, m, i);
          } else {
            j(m, i);
          }
        }
        if (l != null) {
          b(l);
        }
        this.GetTopicPathByPageIDOnComplete = null;
      };
      d(
        'GetTopicPathByPageID',
        'MadCap.WebHelp.FeedbackController.Shared.GetTopicPathByPageIDOnComplete',
        [['PageID', h]]
      );
    };
    this.GetPulseSearchResults = function (j, l, i, h) {
      var k = $.Deferred();
      this.GetPulseSearchResultsOnComplete = function (n, m) {
        k.resolve(m);
        if (n != null) {
          b(n);
        }
        this.GetPulseSearchResultsOnComplete = null;
      };
      d(
        'GetPulseSearchResults',
        'MadCap.WebHelp.FeedbackController.Shared.GetPulseSearchResultsOnComplete',
        [
          ['ProjectID', j],
          ['SearchQuery', l],
          ['PageSize', i],
          ['PageIndex', h],
        ]
      );
      return k.promise();
    };
  };
  MadCap.WebHelp.LoadFeedbackController = MadCap.Utilities.Memoize(function (
    b
  ) {
    return new MadCap.WebHelp.FeedbackController(b);
  });
  MadCap.WebHelp.MockFeedbackController = function () {
    this.GetVersion = function (b, c, d) {
      this.FeedbackActive = true;
      this.Version = 3;
      if (b != null) {
        if (d != null) {
          b.call(d, this.Version, c);
        } else {
          b(this.Version, c);
        }
      }
    };
    this.GetAverageRating = function (d, b, c) {
      if (b != null) {
        b(50, 10, c);
      }
    };
    this.SubmitRating = function (d, e, f, b, c) {
      if (b != null) {
        b(c);
      }
    };
    this.GetUserGuid = function () {
      return null;
    };
  };
  MadCap.WebHelp.MockFeedbackController.prototype = new MadCap.WebHelp.FeedbackController(
    null
  );
  MadCap.CreateNamespace('Feedback');
  MadCap.Feedback.LoginDialog = function (c, b) {
    this._FeedbackController = c;
    this._TimeoutID = -1;
    this._Mode = b;
    this._UserGuid = null;
    this._El = null;
  };
  var a = MadCap.Feedback.LoginDialog;
  a.prototype._Init = function () {
    var c = this;
    this._El = $('.login-dialog');
    $('.login-dialog-buttons .submit-button').click(function (d) {
      c.Submit();
    });
    $('.login-dialog-buttons .cancel-button').click(function (d) {
      c.Hide(false);
    });
    if (this._Mode == 'edit') {
      this._UserGuid = this._FeedbackController.GetUserGuid();
      this._FeedbackController.GetUserProfile(
        this._UserGuid,
        function (f, d) {
          var e = MadCap.Utilities.Xhr.LoadXmlString(f);
          $(e.documentElement)
            .children('Item')
            .each(function (h, i) {
              var k = $(this);
              var g = k.attr('Name');
              var j = k.attr('Value');
              var m = $(".login-dialog input[name='" + g + "']");
              if (m.attr('type') == 'checkbox') {
                var l = MadCap.String.ToBool(j, false);
                m.prop('checked', l);
              } else {
                m.val(j);
              }
            });
        },
        null,
        this
      );
    } else {
      if (this._Mode == 'pulse') {
        if (c._El.length == 0) {
          $('body').append('<div class="login-dialog pulse" />');
          c._El = $('.login-dialog');
        }
        var b = $('#pulse-login-frame');
        if (b.length == 0) {
          c._El.addClass('pulse');
          c._El.empty();
          c._El.append(
            '<iframe id="pulse-login-frame" name="pulse-login-html5" style="visibility:hidden;" onload="this.style.visibility=\'visible\';"></iframe>'
          );
          c._El.append('<button class="close-dialog"></button>');
          $('.close-dialog', c._El).click(function (d) {
            c.Hide(true);
          });
          $('#pulse-login-frame').attr(
            'src',
            c._FeedbackController.PulseServer + 'Login'
          );
        }
      }
    }
  };
  a.prototype._Cleanup = function () {
    $('.login-dialog-buttons .submit-button').off('click');
    $('.login-dialog-buttons .cancel-button').off('click');
    $('.submit-button').attr('disabled', null);
    $('.status-message-box').hide();
    $('.profile-item-wrapper.error').removeClass('error');
    window.clearTimeout(this._TimeoutID);
  };
  a.prototype.Show = function () {
    this._Init();
    var b = MadCap.TextEffects.AddBackgroundTint('light');
    $(b).animate({ opacity: 0.5 }, 200);
    this._El.fadeIn(200);
    $('body').css('height', '100%');
    $('body').css('overflow', 'hidden');
  };
  a.prototype.Hide = function (b) {
    this._Cleanup();
    MadCap.TextEffects.RemoveBackgroundTint();
    if (b) {
      this._El.fadeOut();
    } else {
      this._El.hide();
    }
    $('body').css('height', '');
    $('body').css('overflow', '');
    $(this).trigger('closed');
  };
  a.prototype.Submit = function () {
    $('.status-message-box').hide();
    $('.profile-item-wrapper.error').removeClass('error');
    if (this._CheckErrors()) {
      this._SetStatusMessage('required-fields-missing-message', 'error');
      return;
    }
    var c = this._LoginItemsToXml();
    var b = this;
    if (this._Mode == 'new') {
      this._FeedbackController.StartActivateUser2(c, function (d) {
        b._CheckUserStatus(d);
      });
      this._SetStatusMessage('verification-email-sent-message');
    } else {
      if (this._Mode == 'edit') {
        this._FeedbackController.UpdateUserProfile(
          this._UserGuid,
          c,
          function (d) {
            if (d == '00000000-0000-0000-0000-000000000000') {
              b.Hide(true);
            } else {
              b._CheckUserStatus(d);
              b._SetStatusMessage('verification-email-sent-message');
            }
          }
        );
      }
    }
    $('.submit-button').attr('disabled', 'disabled');
  };
  a.prototype._CheckUserStatus = function (c) {
    var b = this;
    this._FeedbackController.CheckUserStatus(c, function (d) {
      if (d == 'Pending') {
        b._TimeoutID = setTimeout(function () {
          b._CheckUserStatus(c);
        }, 5000);
      } else {
        MadCap.Utilities.Store.setItem('LiveHelpUserGuid', d);
        b.Hide(true);
      }
    });
  };
  a.prototype._CheckErrors = function () {
    var e = false;
    var d = $(
      '.login-dialog .profile-item-wrapper input, .login-dialog .profile-item-wrapper select'
    );
    for (var c = 0, f = d.length; c < f; c++) {
      var b = d[c];
      var j = $(b);
      var g = j.val();
      var h = MadCap.String.ToBool(MadCap.Dom.Dataset(b, 'required'), false);
      if (h && MadCap.String.IsNullOrEmpty(g)) {
        j.closest('.profile-item-wrapper').addClass('error');
        e = true;
      }
    }
    return e;
  };
  a.prototype._LoginItemsToXml = function () {
    var m = MadCap.Utilities.Xhr.CreateXmlDocument('FeedbackUserProfile');
    var h = m.documentElement;
    var b = $('.login-dialog .profile-item-wrapper input');
    for (var e = 0, d = b.length; e < d; e++) {
      var j = b[e];
      var g = $(j);
      var c = g.attr('name');
      var f = g.attr('type');
      var k = f == 'checkbox' ? j.checked : g.val();
      var l = m.createElement('Item');
      l.setAttribute('Name', c);
      l.setAttribute('Value', k.toString());
      h.appendChild(l);
    }
    return m;
  };
  a.prototype._SetStatusMessage = function (b, c) {
    var d = $('.status-message-box');
    if (c == 'error') {
      d.addClass('error');
    } else {
      d.removeClass('error');
    }
    $('.message').hide();
    $('.' + b).show();
    d.fadeIn();
  };
  MadCap.FeedbackException = function (c, b, d) {
    MadCap.Exception.call(this, c, b);
    this.Data = d;
  };
  MadCap.FeedbackException.prototype = new MadCap.Exception();
  MadCap.FeedbackException.prototype.constructor = MadCap.FeedbackException;
  MadCap.FeedbackException.prototype.base = MadCap.Exception.prototype;
})();
/*
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 * Unlicensed use is strictly prohibited
 *
 * v13.2.6355.27565
 */
MadCap.WebHelp = MadCap.CreateNamespace('WebHelp');
MadCap.WebHelp.HelpSystem = function (o, s, j, e, m) {
  var h = this;
  var v = o;
  var D = new MadCap.Utilities.Url(j).ToFolder().ToFolder().FullPath;
  var a = null;
  var B = new Array();
  var w = e;
  var i = m;
  var g = null;
  var A = [];
  var p = new MadCap.Utilities.Dictionary();
  var J = null;
  var n = new MadCap.Utilities.Dictionary();
  var C = false;
  var G = new MadCap.WebHelp.AliasFile(D + 'Data/Alias.xml', this);
  var f = new MadCap.WebHelp.TocFile(this, MadCap.WebHelp.TocFile.TocType.Toc);
  var d = null;
  var E = new MadCap.WebHelp.TocFile(
    this,
    MadCap.WebHelp.TocFile.TocType.BrowseSequence
  );
  var z = new MadCap.Utilities.Dictionary();
  this.TargetType = null;
  this.DefaultStartTopic = null;
  this.InPreviewMode = null;
  this.LiveHelpOutputId = null;
  this.LiveHelpServer = null;
  this.LiveHelpEnabled = false;
  this.IsWebHelpPlus = false;
  this.ContentFolder = null;
  this.UseCustomTopicFileExtension = false;
  this.CustomTopicFileExtension = null;
  this.IsMultilingual = false;
  this.GlossaryUrl = null;
  this.SearchFilterSetUrl = null;
  this.SyncTOC = null;
  this.IndexPartialWordSearch = true;
  this.GlossaryPartialWordSearch = true;
  this.DefaultSkin = null;
  this.IsAutoMerged = false;
  this.LanguageUrl = null;
  this.BreakpointsUrl = null;
  this.PreventExternalUrls = false;
  this.IsResponsive = false;
  this.SearchUrl = null;
  this.PulsePage = null;
  this.ScriptsFolderPath = null;
  this.LanguageCode = null;
  this.LanguageName = null;
  (function () {})();
  this.Load = function (K) {
    MadCap.Utilities.Xhr.Load(
      j,
      true,
      function (Y) {
        var R = 0;
        function N() {
          R++;
          if (R == B.length) {
            K();
          }
        }
        function Z(ac, aa) {
          if (B.length > 0) {
            for (var ab = 0; ab < B.length; ab++) {
              B[ab].Load(ac);
            }
          } else {
            aa();
          }
        }
        C = Y != null;
        if (!C) {
          K();
          return;
        }
        this.LanguageCode = Y.documentElement.getAttribute('xml:lang');
        this.LanguageName = Y.documentElement.getAttribute('LanguageName');
        this.TargetType = Y.documentElement.getAttribute('TargetType');
        this.DefaultStartTopic = Y.documentElement.getAttribute('DefaultUrl');
        this.InPreviewMode = MadCap.Dom.GetAttributeBool(
          Y.documentElement,
          'InPreviewMode',
          false
        );
        this.LiveHelpOutputId = Y.documentElement.getAttribute(
          'LiveHelpOutputId'
        );
        this.LiveHelpServer = Y.documentElement.getAttribute('LiveHelpServer');
        this.LiveHelpEnabled = this.LiveHelpOutputId != null;
        this.MoveContentToRoot = MadCap.Dom.GetAttributeBool(
          Y.documentElement,
          'MoveOutputContentToRoot',
          false
        );
        this.ReplaceReservedCharacters = MadCap.Dom.GetAttributeBool(
          Y.documentElement,
          'ReplaceReservedCharacters',
          false
        );
        this.MakeFileLowerCase = MadCap.Dom.GetAttributeBool(
          Y.documentElement,
          'MakeFileLowerCase',
          false
        );
        this.PreventExternalUrls = MadCap.Dom.GetAttributeBool(
          Y.documentElement,
          'PreventExternalUrls',
          false
        );
        this.IsResponsive = MadCap.Dom.GetAttributeBool(
          Y.documentElement,
          'EnableResponsiveOutput',
          false
        );
        this.IncludeGlossarySearchResults = MadCap.Dom.GetAttributeBool(
          Y.documentElement,
          'IncludeGlossarySearchResults',
          true
        );
        this.ResultsPerPage = MadCap.Dom.GetAttributeInt(
          Y.documentElement,
          'ResultsPerPage',
          20
        );
        this.SearchEngine = MadCap.Dom.GetAttribute(
          Y.documentElement,
          'SearchEngine'
        );
        var P = MadCap.Dom.GetAttributeBool(
          Y.documentElement,
          'ServerEnabled',
          false
        );
        this.IsWebHelpPlus =
          (this.TargetType == 'WebHelpPlus' || P) &&
          MadCap.String.StartsWith(document.location.protocol, 'http', false);
        var L = '';
        if (!this.MoveContentToRoot) {
          L = 'Content/';
        }
        if (this.MakeFileLowerCase) {
          L = L.toLowerCase();
        }
        this.ContentFolder = L;
        this.UseCustomTopicFileExtension = MadCap.Dom.GetAttributeBool(
          Y.documentElement,
          'UseCustomTopicFileExtension',
          false
        );
        this.CustomTopicFileExtension = MadCap.Dom.GetAttribute(
          Y.documentElement,
          'CustomTopicFileExtension'
        );
        this.IsMultilingual = MadCap.Dom.GetAttributeBool(
          Y.documentElement,
          'Multilingual',
          false
        );
        this.GlossaryUrl = c(Y, 'Glossary');
        this.TocUrl = c(Y, 'Toc');
        this.SearchUrl = c(Y, 'SearchUrl');
        this.PulsePage = c(Y, 'PulsePage');
        this.BrowseSequencesUrl = c(Y, 'BrowseSequence');
        this.IndexUrl = c(Y, 'Index');
        this.SearchFilterSetUrl = c(Y, 'SearchFilterSet');
        this.LanguageUrl = D + 'Data/Language.js';
        this.BreakpointsUrl = D + 'Data/Breakpoints.js';
        this.ScriptsFolderPath = Y.documentElement.getAttribute(
          'PathToScriptsFolder'
        );
        this.HasBrowseSequences =
          Y.documentElement.getAttribute('BrowseSequence') != null;
        this.HasToc = Y.documentElement.getAttribute('Toc') != null;
        this.TopNavTocPath =
          Y.documentElement.getAttribute('TopNavTocPath') == 'true';
        l.call(this, Y);
        this.DefaultSkin = this.GetSkin($(Y.documentElement).attr('SkinID'));
        this.SyncTOC =
          this.DefaultSkin != null &&
          MadCap.String.ToBool(this.DefaultSkin.AutoSyncTOC, false);
        this.IndexPartialWordSearch =
          this.DefaultSkin == null ||
          MadCap.String.ToBool(this.DefaultSkin.IndexPartialWordSearch, true);
        this.GlossaryPartialWordSearch =
          this.DefaultSkin == null ||
          MadCap.String.ToBool(
            this.DefaultSkin.GlossaryPartialWordSearch,
            true
          );
        this.DisplayCommunitySearchResults =
          this.DefaultSkin == null ||
          MadCap.String.ToBool(
            this.DefaultSkin.DisplayCommunitySearchResults,
            true
          );
        this.CommunitySearchResultsCount = 3;
        if (this.DefaultSkin != null) {
          this.CommunitySearchResultsCount = MadCap.String.ToInt(
            this.DefaultSkin.CommunitySearchResultsCount,
            3
          );
        }
        var S = Y.getElementsByTagName('Subsystems');
        if (S.length > 0 && S[0].getElementsByTagName('Url').length > 0) {
          var X = Y.getElementsByTagName('Subsystems')[0].getElementsByTagName(
            'Url'
          );
          for (var Q = 0; Q < X.length; Q++) {
            var U = X[Q];
            if (!U) {
              continue;
            }
            var M = U.getAttribute('Source');
            var O = M.substring(0, M.lastIndexOf('/') + 1);
            var W = U.getAttribute('TocPath');
            var T = U.getAttribute('BrowseSequencePath');
            var V = new MadCap.WebHelp.HelpSystem(
              this,
              D + O,
              D + O + 'Data/HelpSystem.xml',
              W,
              T
            );
            B.push(V);
          }
        }
        this.LoadBreakpoints(function () {
          h.LoadLanguage(function () {
            if (!h.IsAutoMerged && h.IsWebHelpPlus) {
              MadCap.Utilities.Xhr.CallWebService(
                h.GetPath() + 'Service/Service.asmx/GetSubsystems',
                true,
                function (ab, aa) {
                  if (ab) {
                    $.each(ab.documentElement.childNodes, function (ac, ad) {
                      if (ad.nodeName == 'Subsystems') {
                        $.each(ad.childNodes, function (ah, ai) {
                          if (ai.nodeName == 'Url') {
                            var ag = ai.getAttribute('Source');
                            var ae = ag.substring(0, ag.lastIndexOf('/') + 1);
                            if (ae) {
                              var af = new MadCap.WebHelp.HelpSystem(
                                h,
                                D + ae,
                                D + ae + 'Data/HelpSystem.xml',
                                null,
                                null
                              );
                              af.IsAutoMerged = true;
                              B.push(af);
                            }
                          }
                        });
                      }
                    });
                  }
                  Z(N, K);
                }
              );
            } else {
              Z(N, K);
            }
          });
        });
      },
      null,
      this
    );
  };
  this.GetExists = function () {
    return C;
  };
  this.GetMasterHelpsystem = function () {
    var K = this;
    for (
      var L = K.GetParentSubsystem();
      L != null;
      L = L.GetParentSubsystem()
    ) {
      K = L;
    }
    return K;
  };
  this.GetParentSubsystem = function () {
    return v;
  };
  this.GetPath = function () {
    return D;
  };
  this.GetCurrentTopicPath = function () {
    return MadCap.Utilities.Url.GetDocumentUrl().ToRelative(
      MadCap.Utilities.Url.GetAbsolutePath(D)
    ).FullPath;
  };
  this.GetAbsolutePath = function () {
    if (a == null) {
      var K = new MadCap.Utilities.Url(D);
      a = K.IsAbsolute
        ? K.FullPath
        : new MadCap.Utilities.Url(document.location.href).Path;
    }
    return a;
  };
  this.GetContentPath = function () {
    return D + this.ContentFolder;
  };
  this.GetSkin = function (K) {
    return z.GetItem(K);
  };
  this.GetSkinByName = function (K) {
    var N = this.GetSkins();
    for (var L = 0; L < N.length; L++) {
      var M = N[L];
      if (M.Name == K) {
        return M;
      }
    }
    return null;
  };
  this.GetCurrentSkin = function () {
    var L = MadCap.Utilities.Url.GetDocumentUrl();
    var K = L.QueryMap.GetItem('skinName') || L.HashMap.GetItem('skinName');
    if (K) {
      var O = this.GetSkin(K);
      if (!O) {
        O = this.GetSkinByName(K);
      }
      return O;
    }
    var N = L.QueryMap.GetItem('cshid');
    if (N) {
      var M = G.LookupID(N);
      if (M.Skin) {
        var O = this.GetSkin(M.Skin);
        if (!O) {
          O = this.GetSkinByName(M.Skin);
        }
        return O;
      }
    }
    return this.DefaultSkin;
  };
  this.GetTocPath = function (K) {
    return K == 'toc' ? w : i;
  };
  this.GetFullTocPath = function (K, M) {
    var N = this.GetHelpSystem(M);
    if (N == null) {
      return null;
    }
    var L = new Object();
    L.tocPath = this.GetTocPath(K);
    N.ComputeTocPath(K, L);
    return L.tocPath;
  };
  this.GetTopicPath = function (K) {
    var Q = this.GetPath();
    var N = !this.IsRoot;
    var P = this.GetMasterHelpsystem();
    if (N && !masterHelpsystem.MoveContentToRoot) {
      Q = '../' + Q;
    }
    var O = new MadCap.Utilities.Url(document.location.href).ToPath();
    var M = O.CombinePath(Q + 'Data/').CombinePath(K);
    var L = M.ToRelative(O);
    if (
      MadCap.Utilities.HasRuntimeFileType('TriPane') &&
      !N &&
      !P.MoveContentToRoot
    ) {
      L = L.ToRelative(P.ContentFolder);
    }
    return L;
  };
  this.GetPatchedPath = function (K) {
    if (this.ReplaceReservedCharacters) {
      K = MadCap.Utilities.Url.ReplaceReservedCharacters(K, '_');
    }
    if (this.MakeFileLowerCase) {
      K = K.toLowerCase();
    }
    if (this.UseCustomTopicFileExtension) {
      K = new MadCap.Utilities.Url(K).ToExtension(this.CustomTopicFileExtension)
        .FullPath;
    }
    return K;
  };
  this.GetAbsoluteTopicPath = function (L) {
    var K = new MadCap.Utilities.Url(L);
    var M = new MadCap.Utilities.Url(document.location.href).ToPlainPath();
    return M.CombinePath(this.GetTopicPath('../' + K.FullPath).FullPath);
  };
  this.ComputeTocPath = function (K, L) {
    if (v) {
      var M = this.GetTocPath(K);
      if (!MadCap.String.IsNullOrEmpty(M)) {
        L.tocPath = L.tocPath ? M + '|' + L.tocPath : M;
      }
      v.ComputeTocPath(K, L);
    }
  };
  this.GetHelpSystem = function (L) {
    var M = null;
    for (var K = 0; K < B.length; K++) {
      M = B[K].GetHelpSystem(L);
      if (M != null) {
        return M;
      }
    }
    if (MadCap.String.StartsWith(L, D, false)) {
      return this;
    }
    return null;
  };
  this.GetSubsystem = function (K) {
    return B[K];
  };
  this.GetMergedAliasIDs = function (K) {
    G.Load(function () {
      function Q(S) {
        for (var R = 0, T = S.length; R < T; R++) {
          P[P.length] = S[R];
        }
        N++;
        if (N == O + 1) {
          K(P);
        }
      }
      var P = new Array();
      var O = B.length;
      var N = 0;
      var M = G.GetIDs();
      Q(M);
      for (var L = 0; L < O; L++) {
        B[L].GetMergedAliasIDs(Q);
      }
    });
  };
  this.GetMergedAliasNames = function (K) {
    G.Load(function () {
      function P(S) {
        for (var R = 0, T = S.length; R < T; R++) {
          L[L.length] = S[R];
        }
        N++;
        if (N == O + 1) {
          K(L);
        }
      }
      var L = new Array();
      var O = B.length;
      var N = 0;
      var Q = G.GetNames();
      P(Q);
      for (var M = 0, O = B.length; M < O; M++) {
        B[M].GetMergedAliasNames(P);
      }
    });
  };
  this.LookupCSHID = function (L, K) {
    G.Load(function () {
      function M(S) {
        if (R) {
          return;
        }
        O++;
        if (S.Found) {
          R = true;
          K(S);
          return;
        }
        if (O == P) {
          K(Q);
        }
      }
      var Q = G.LookupID(L);
      if (Q.Found) {
        Q.Topic = h.GetPath() + Q.Topic;
        K(Q);
        return;
      }
      if (B.length == 0) {
        K(Q);
        return;
      }
      var R = false;
      var O = 0;
      for (var N = 0, P = B.length; N < P; N++) {
        B[N].LookupCSHID(L, M);
      }
    });
  };
  this.GetTocFile = function () {
    return f;
  };
  this.GetBrowseSequenceFile = function () {
    return E;
  };
  this.IsMerged = function () {
    return B.length > 0;
  };
  this.IsRoot = function () {
    return v == null;
  };
  this.IsTabletLayout = function (L) {
    if (this.IsResponsive && this.Breakpoints) {
      var K = this.Breakpoints.mediums.Tablet;
      var M = this.Breakpoints.prop;
      if (M == 'max-width') {
        if (!L) {
          L = window.innerWidth;
        }
        return L <= K;
      } else {
        return window.matchMedia('(' + M + ': ' + K + 'px)').matches;
      }
    }
    return false;
  };
  this.LoadLanguage = function (M, K) {
    var L = this;
    require([this.LanguageUrl], function (N) {
      L.Language = N;
      M.call(K, N);
    });
  };
  this.LoadBreakpoints = function (M, K) {
    if (this.IsResponsive && this.IsRoot()) {
      var L = this;
      require([this.BreakpointsUrl], function (N) {
        L.Breakpoints = N;
        M.call(K, N);
      });
    } else {
      M.call(K, null);
    }
  };
  this.LoadConcepts = function () {
    var K = $.Deferred();
    require([D + 'Data/Concepts.js'], function (L) {
      J = L;
      K.resolve(J);
    });
    return K.promise();
  };
  this.LoadAllConcepts = function (K) {
    function P() {
      M++;
      if (M == N + 1) {
        K();
      }
    }
    var M = 0;
    var N = B.length;
    this.LoadConcepts().then(P);
    for (var L = 0; L < N; L++) {
      var O = B[L];
      if (!O.GetExists()) {
        P();
        continue;
      }
      O.LoadAllConcepts(P);
    }
  };
  this.GetConceptsLinks = function (L) {
    var R = $.Deferred();
    var Q = [];
    if (this.IsWebHelpPlus) {
      function K(Z, W) {
        var U = Z.documentElement.getElementsByTagName('Url');
        var T = U.length;
        for (var X = 0; X < T; X++) {
          var Y = U[X];
          var aa = Y.getAttribute('Title');
          var V = Y.getAttribute('Source');
          V = D + (V.charAt(0) == '/' ? V.substring(1, V.length) : V);
          Q[Q.length] = { Title: aa, Link: V };
        }
        R.resolve(Q);
      }
      MadCap.Utilities.Xhr.CallWebService(
        D + 'Service/Service.asmx/GetTopicsForConcepts?Concepts=' + L,
        true,
        K
      );
    } else {
      function O(T) {
        Q = Q.Union(T);
      }
      L = L.replace('\\;', '%%%%%');
      if (L == '') {
        R.resolve(Q);
      } else {
        var N = L.split(';');
        var S = [];
        S.push(this.GetConceptsLinksLocal(N).then(O));
        for (var P = 0; P < B.length; P++) {
          var M = B[P];
          if (M.GetExists()) {
            S.push(M.GetConceptsLinks(L).then(O));
          }
        }
        $.when.apply(this, S).done(function () {
          R.resolve(Q);
        });
      }
    }
    return R.promise();
  };
  this.GetConceptsLinksLocal = function (P) {
    var L = [];
    var O = [];
    for (var M = 0; M < P.length; M++) {
      var N = P[M];
      N = N.replace('%%%%%', ';');
      O.push(
        this.GetConceptLinks(N).then(function (Q) {
          L = L.concat(Q);
        })
      );
    }
    var K = $.Deferred();
    $.when.apply(this, O).done(function () {
      K.resolve(L);
    });
    return K.promise();
  };
  this.LoadTopicChunk = function (L) {
    var K = $.Deferred();
    MadCap.Utilities.Require(
      [D + 'Data/SearchTopic_Chunk' + L + '.js'],
      function (M) {
        K.resolve(M);
      }
    );
    return K.promise();
  };
  this.GetSearchChunkIds = function (L) {
    var K = $.Deferred();
    MadCap.Utilities.Require([D + 'Data/Search.js'], function (O) {
      var M = O.t;
      var P = [];
      for (var N = 0; N < L.length; N++) {
        P.push(
          MadCap.Utilities.GetChunkId(M, L[N], function (R, Q) {
            if (R < Q) {
              return -1;
            } else {
              if (R === Q) {
                return 0;
              } else {
                return 1;
              }
            }
          })
        );
      }
      K.resolve(P);
    });
    return K.promise();
  };
  this.GetConceptLinks = function (M) {
    var L = $.Deferred();
    var K = this;
    this.LoadConcepts().done(function () {
      var N = [];
      var O = J[M];
      if (!O) {
        L.resolve(N);
      } else {
        K.GetSearchChunkIds(O).then(function (S) {
          var R = [];
          for (var Q = 0; Q < S.length; Q++) {
            var P = S[Q];
            R.push(
              K.LoadTopicChunk(P).then(function (V) {
                for (var U = 0; U < O.length; U++) {
                  var T = V[O[U]];
                  if (T) {
                    T.Url = K.GetTopicPath(T.u);
                    N.push(T);
                  }
                }
              })
            );
          }
          $.when.apply(this, R).done(function () {
            L.resolve(N);
          });
        });
      }
    });
    return L.promise();
  };
  this.LoadToc = MadCap.Utilities.Memoize(function (L) {
    var K = $.Deferred();
    var N = L[0];
    var M = L[1];
    this.GetToc(N, M, function (O) {
      K.resolve(O);
    });
    return K.promise();
  });
  this.GetToc = function (O, L, K) {
    var M = this;
    var N = this[O + 'Url'];
    if (L) {
      N = I(L);
    }
    require([N], function (T) {
      if (typeof T == 'undefined' || (M[O] && T.chunks)) {
        K(T);
        return;
      }
      M[O] = T;
      T.type = O;
      T.helpSystem = M;
      T.chunks = [];
      T.entries = [];
      T.nodes = {};
      var Q = new MadCap.Utilities.Url(N).ToFolder();
      for (var W = 0; W < T.numchunks; W++) {
        T.chunks[W] = {
          path: Q.AddFile(T.prefix + W + '.js').FullPath,
          loaded: false,
        };
      }
      var S = T.tree;
      var X = {};
      T.automerge = T.tree;
      while (S != null) {
        S.toc = T;
        S.childrenLoaded = false;
        T.nodes[S.i] = S;
        if (typeof S.m !== 'undefined') {
          X[S.m] = S;
        }
        if (typeof S.a !== 'undefined') {
          T.automerge = S;
        }
        if (typeof S.n !== 'undefined') {
          for (var V = 0; V < S.n.length; V++) {
            S.n[V].parent = S;
            if (V < S.n.length - 1) {
              S.n[V].next = S.n[V + 1];
            }
            if (V > 0) {
              S.n[V].previous = S.n[V - 1];
            }
          }
        }
        S = r(S);
      }
      var R = [];
      var U = false;
      for (var V = 0; V < B.length; V++) {
        var P = B[V];
        if (P.GetExists()) {
          if (!P.IsAutoMerged) {
            P.MergeNode = X[V];
          } else {
            U = true;
          }
          if (P.IsAutoMerged || typeof P.MergeNode !== 'undefined') {
            R.push(P);
          }
        } else {
          x(X[V]);
        }
      }
      if (!U && T.automerge.a == 'replace') {
        x(T.automerge);
      }
      if (R.length == 0) {
        K(T);
        return;
      }
      MadCap.Utilities.AsyncForeach(
        R,
        function (Y, Z) {
          y(T, Y, Z);
        },
        function () {
          K(T);
        }
      );
    });
  };
  function x(O) {
    var M = O.parent;
    var N = O.previous;
    var L = O.next;
    if (N) {
      N.next = L;
      O.previous = null;
    }
    if (L) {
      L.previous = N;
      O.next = null;
    }
    if (M) {
      var K = O.parent.n.indexOf(O);
      M.n.splice(K, 1);
      O.parent = null;
    }
  }
  function r(L) {
    var K = null;
    if (typeof L.n != 'undefined') {
      K = L.n[0];
    } else {
      if (typeof L.next != 'undefined') {
        K = L.next;
      } else {
        K = L;
        while (typeof K.parent != 'undefined') {
          if (typeof K.parent.next != 'undefined') {
            K = K.parent.next;
            break;
          } else {
            K = K.parent;
          }
        }
        if (typeof K.parent == 'undefined') {
          K = null;
        }
      }
    }
    return K;
  }
  function q(L) {
    var K = null;
    if (typeof L.previous != 'undefined') {
      K = L.previous;
      while (typeof K.n !== 'undefined' && K.n.length > 0) {
        K = K.n[K.n.length - 1];
      }
    } else {
      if (typeof L.parent != 'undefined') {
        K = L.parent;
      }
    }
    return K;
  }
  function H(R, Q) {
    var O = '';
    var N = -1;
    var M = null;
    if (R.n && R.n.length > 0) {
      O = R.toc.entries[R.i].title;
      if (Q) {
        O = encodeURIComponent(O);
      }
      N = 0;
    } else {
      N = R.parent.n.indexOf(R) + 1;
    }
    if (O.length > 0) {
      O += '|';
    }
    O += '_____' + N;
    for (var K = R.parent; K && typeof K.i !== 'undefined'; K = K.parent) {
      if (O == null) {
        O = '';
      }
      if (O.length > 0) {
        O = '|' + O;
      }
      var P = K.toc.entries[K.i];
      if (P) {
        var L = P.title;
        if (Q) {
          L = encodeURIComponent(L);
        }
        O = L + O;
      }
    }
    return O;
  }
  function y(L, M, K) {
    M.GetToc(L.type, null, function (Q) {
      if (typeof Q == 'undefined') {
        K();
        return;
      }
      var P = M.IsAutoMerged ? L.automerge : M.MergeNode;
      var X = Q.tree;
      if (X.n !== undefined && P !== undefined) {
        var O = P.r == 1 || (M.IsAutoMerged && P.a == 'replace');
        var V =
          O ||
          (M.IsAutoMerged && (P.a == 'before-head' || P.a == 'after-head'));
        var R =
          O ||
          (M.IsAutoMerged && (P.a == 'before-head' || P.a == 'after-tail'));
        var W = R ? P.parent : P;
        if (typeof W.n == 'undefined') {
          W.n = [];
        }
        var S = R ? W.n.indexOf(P) + (V ? 0 : 1) : V ? 0 : W.n.length;
        var N = X.n.length;
        for (var T = 0; T < N; T++) {
          X.n[T].parent = W;
          W.n.splice(S + T, 0, X.n[T]);
        }
        if (O) {
          W.n.splice(S + N, 1);
        }
        if (S > 0) {
          W.n[S].previous = W.n[S - 1];
          W.n[S - 1].next = W.n[S];
        }
        var U = S + N - (O ? 1 : 0) - 1;
        if (U >= 0 && U + 1 < W.n.length) {
          W.n[U].next = W.n[U + 1];
          W.n[U + 1].previous = W.n[U];
        }
        if (M.IsAutoMerged) {
          L.automerge = W.n[S + N - 1];
          L.automerge.a = 'after-tail';
        }
      }
      K();
    });
  }
  this.LoadTocChunk = function (M, L) {
    var K = $.Deferred();
    require([M.chunks[L].path], function (N) {
      if (!M.chunks[L].loaded) {
        for (var P in N) {
          for (var O = 0; O < N[P].i.length; O++) {
            M.entries[N[P].i[O]] = {
              link: P,
              title: N[P].t[O],
              bookmark: N[P].b[O],
            };
          }
        }
        M.chunks[L].loaded = true;
      }
      return K.resolve(N);
    });
    return K.promise();
  };
  this.GetTocEntryHref = function (aa, S, W, R) {
    var M = null;
    var Q = aa.toc;
    var V = Q.entries[aa.i];
    if (V) {
      var Z = V.link + V.bookmark;
      if (typeof aa.m == 'undefined' && Z != '___') {
        var L = null;
        var U = new MadCap.Utilities.Url(Z);
        var K = Q.helpSystem;
        var T = K.GetPath();
        var Y = K.GetMasterHelpsystem().GetContentPath();
        var P = typeof aa.f != 'undefined';
        if (!U.IsAbsolute) {
          if (!MadCap.String.IsNullOrEmpty(T)) {
            U = new MadCap.Utilities.Url(T).CombinePath(Z);
            L = U.ToRelative(Y);
          } else {
            U = U.ToRelative('/' + Y);
            L = U;
          }
        } else {
          L = U;
        }
        if (P || !W) {
          if (L.IsAbsolute) {
            M = L.FullPath;
          } else {
            M = Y + L.FullPath;
          }
        } else {
          if (MadCap.Utilities.HasRuntimeFileType('TriPane')) {
            M = '#' + L.FullPath;
          } else {
            M = U.FullPath;
          }
        }
      }
    }
    if (M != null && S && R) {
      var O =
        window.name == 'topic' &&
        !MadCap.Utilities.HasRuntimeFileType('Default');
      var X = H(aa, true);
      if (MadCap.Utilities.HasRuntimeFileType('TriPane')) {
        M += encodeURIComponent('?' + S + 'Path=' + X);
      } else {
        var N = new MadCap.Utilities.Url(M);
        if (O) {
          M =
            N.PlainPath +
            encodeURIComponent('?' + S + 'Path=' + X) +
            N.Fragment;
        } else {
          M = N.PlainPath + '?' + (S + 'Path=' + X) + N.Fragment;
        }
      }
    }
    return M;
  };
  this.GetTocData = function (K) {
    var O = null,
      R = null,
      N = null;
    var S = MadCap.Utilities.HasRuntimeFileType('TriPane');
    if (
      (S &&
        !MadCap.String.IsNullOrEmpty(K.Fragment) &&
        K.Fragment.length > 1) ||
      !S
    ) {
      var P =
        S &&
        !(
          K.QueryMap.GetItem('TocPath') ||
          K.QueryMap.GetItem('BrowseSequencesPath')
        ) &&
        !MadCap.String.IsNullOrEmpty(K.Fragment)
          ? new MadCap.Utilities.Url(K.Fragment)
          : K;
      R = P.QueryMap.GetItem('TocPath');
      if (R != null) {
        O = 'Toc';
      } else {
        N = P.QueryMap.GetItem('BrowseSequencesPath');
        if (N != null) {
          O = 'BrowseSequences';
        }
      }
      if (K.HashMap.GetItem('cshid') == null) {
        var M = K.Query.indexOf('?');
        var L = K.Query.lastIndexOf('?');
        var Q = '';
        if (M != L) {
          Q = K.Query.substr(M, L);
        }
        if (S) {
          K = new MadCap.Utilities.Url(K.Fragment.substr(1));
        }
        if (!MadCap.String.IsNullOrEmpty(Q)) {
          K.Query = Q;
        }
      }
    } else {
      K = new MadCap.Utilities.Url(this.DefaultStartTopic).ToRelative(
        this.GetContentPath()
      );
    }
    return { TocType: O, TocPath: R, BrowseSequencesPath: N, Href: K };
  };
  this.FindTocNode = function (N, L, M, K) {
    h.FindNode('Toc', N, L, M, K);
  };
  this.FindBrowseSequenceNode = function (M, K, L) {
    h.FindNode('BrowseSequences', M, K, L);
  };
  this.FindNode = function (L, N, M, O, K) {
    h.LoadToc([L, K]).then(function (U) {
      var Q = new MadCap.Utilities.Url(
        h.GetMasterHelpsystem().GetContentPath()
      );
      var R = M;
      var T = 0;
      var P;
      if (!M.IsAbsolute) {
        var R = !MadCap.String.IsNullOrEmpty(Q.FullPath) ? Q.CombinePath(M) : M;
        R = R.ToRelative(h.GetPath());
        R = new MadCap.Utilities.Url('/' + R.FullPath);
      }
      for (var S = 1; S < U.chunkstart.length; S++) {
        if (U.chunkstart[S] <= decodeURIComponent(R.PlainPath)) {
          T++;
        }
      }
      h.LoadTocChunk(U, T).then(function (V) {
        var Y = V[decodeURIComponent(R.PlainPath)];
        if (typeof Y !== 'undefined') {
          var X = [];
          if (!P) {
            P = U.nodes[Y.i[0]];
          }
          if (N) {
            for (var W = 0; W < Y.i.length; W++) {
              if (H(U.nodes[Y.i[W]], false) == N) {
                X.push(Y.i[W]);
              }
            }
          } else {
            for (var W = 0; W < Y.i.length; W++) {
              if (
                Y.b[W].toLowerCase() ==
                decodeURIComponent(R.Fragment).toLowerCase()
              ) {
                X.push(Y.i[W]);
              }
            }
          }
          if (X.length) {
            O(U.nodes[X.pop()]);
            return;
          }
        }
        if (B.length > 0) {
          MadCap.Utilities.AsyncForeach(
            B,
            function (Z, aa) {
              Z.FindNode(L, N, M, function (ab) {
                if (typeof ab !== 'undefined') {
                  O(ab);
                  return;
                }
                aa();
              });
            },
            function () {
              O(P);
            }
          );
        } else {
          O(P);
        }
      });
    });
  };
  this.NodeDepth = function (K) {
    var L = 1;
    while (K.parent && K.c !== undefined) {
      L++;
      K = K.parent;
    }
    return L;
  };
  this.LoadGlossary = function (M, K) {
    if (typeof this.Glossary != 'undefined') {
      M.call(K, this.Glossary);
      return;
    }
    var L = this;
    this.GetGlossary(function (N) {
      if (N && N.terms) {
        N.termMap = Object.create(null);
        for (var P = 0; P < N.terms.length; P++) {
          var O = N.terms[P];
          N.termMap[O.t.toLowerCase()] = O;
        }
      }
      L.Glossary = N;
      M.call(K, N);
    });
  };
  this.GetGlossary = function (K) {
    var L = this;
    require([this.GlossaryUrl], function (M) {
      function O() {
        Q++;
        if (Q == R) {
          K(M);
        }
      }
      if (typeof M == 'undefined') {
        K(M);
        return;
      }
      var Q = 0;
      var R = 0;
      M.chunks = [];
      var P = new MadCap.Utilities.Url(h.GlossaryUrl).ToFolder();
      for (var T = 0; T < M.numchunks; T++) {
        M.chunks.push({
          helpSystem: L,
          path: P.AddFile(M.prefix + T + '.js').FullPath,
        });
      }
      for (var N = 0; N < B.length; N++) {
        var S = B[N];
        if (!S.GetExists()) {
          continue;
        }
        R++;
      }
      if (R == 0) {
        K(M);
        return;
      }
      for (var N = 0; N < B.length; N++) {
        var S = B[N];
        if (!S.GetExists()) {
          continue;
        }
        k(M, S, O);
      }
    });
  };
  this.SearchGlossary = function (M) {
    var L = $.Deferred();
    var K = this;
    this.LoadGlossary(function (N) {
      var Q = false;
      if (N && N.termMap) {
        var P = N.termMap[M.toLowerCase()];
        Q = typeof P != 'undefined';
        if (Q) {
          var O = N.chunks[P.c];
          require([O.path], function (T) {
            var S = { term: P.t, definition: T[P.t].d, link: T[P.t].l };
            if (S.link) {
              var U = O.helpSystem;
              var R = new MadCap.Utilities.Url('../').CombinePath(S.link)
                .FullPath;
              S.link = U.GetTopicPath(R).FullPath;
              U.SearchDB.LoadTopicByUrl(R).done(function (W, V) {
                if (V) {
                  S.abstractText = V.a;
                }
                L.resolve(S);
              });
            } else {
              L.resolve(S);
            }
          });
        }
      }
      if (!Q) {
        L.resolve();
      }
    }, this);
    return L.promise();
  };
  this.LoadIndex = function (M, K) {
    if (typeof this.Index !== 'undefined') {
      M.call(K, this.Index);
      return;
    }
    var L = this;
    this.GetIndex(function (N) {
      L.Index = N;
      M.call(K, N);
    });
  };
  this.GetIndex = function (K) {
    var L = this;
    require([this.IndexUrl], function (N) {
      function M() {
        Q++;
        if (Q == R) {
          K(N);
        }
      }
      if (typeof N == 'undefined') {
        K(N);
        return;
      }
      var Q = 0;
      var R = 0;
      N.chunks = [];
      var P = new MadCap.Utilities.Url(h.IndexUrl).ToFolder();
      for (var T = 0; T < N.numchunks; T++) {
        N.chunks.push({
          helpSystem: L,
          path: P.AddFile(N.prefix + T + '.js').FullPath,
        });
      }
      for (var O = 0; O < B.length; O++) {
        var S = B[O];
        if (!S.GetExists()) {
          continue;
        }
        R++;
      }
      if (R == 0) {
        K(N);
        return;
      }
      for (var O = 0; O < B.length; O++) {
        var S = B[O];
        if (!S.GetExists()) {
          continue;
        }
        b(N, S, M);
      }
    });
  };
  this.LoadRootIndexEntry = function (K, L) {
    if (K.loaded) {
      if (L) {
        L(K);
      }
      return;
    }
    this.LoadIndex(function (M) {
      var N = typeof K.c == 'number' ? [K.c] : K.c;
      MadCap.Utilities.AsyncForeach(
        N,
        function (Q, P) {
          var O = M.chunks[Q];
          require([O.path], function (S) {
            var R = S[K.t];
            h.SetIndexEntryHelpSystem(R, O.helpSystem);
            h.MergeIndexEntries(K, R);
            P();
          });
        },
        function () {
          h.LoadIndexEntry(K);
          if (L) {
            L(K);
          }
        }
      );
    });
  };
  this.SetIndexEntryHelpSystem = function (K, L) {
    if (K.l) {
      $.each(K.l, function (M, N) {
        N.helpSystem = L;
      });
    }
    if (K.e) {
      $.each(K.e, function (M, N) {
        h.SetIndexEntryHelpSystem(N, L);
      });
    }
  };
  this.LoadIndexEntry = function (L) {
    if (L.l) {
      var K = [];
      $.each(L.l, function (N, M) {
        var O = {
          Title: M.t,
          Link: M.helpSystem.GetTopicPath('..' + M.u).FullPath,
        };
        K[K.length] = O;
      });
      L.linkList = h.SortLinkList(K);
    }
    if (L.e) {
      $.each(L.e, function (M, N) {
        h.LoadIndexEntry(N);
      });
    }
    L.loaded = true;
  };
  this.MergeIndexEntries = function (L, K) {
    if (K.l) {
      if (typeof L.l == 'undefined') {
        L.l = K.l;
      } else {
        L.l = L.l.concat(K.l);
      }
    }
    if (K.r) {
      if (typeof L.r == 'undefined') {
        L.r = K.r;
      } else {
        if (L.r == 'SeeAlso' || K.r == 'SeeAlso') {
          L.r = 'SeeAlso';
        }
      }
      if (typeof L.f == 'undefined') {
        L.f = K.f;
      } else {
        var N = L.f.split(';');
        var M = K.f.split(';');
        $.each(M, function (P, O) {
          if ($.inArray(N, O)) {
            N.push(O);
          }
        });
        N.sort(function (R, P) {
          var Q = R.toLowerCase();
          var O = P.toLowerCase();
          return Q < O ? -1 : Q > O ? 1 : 0;
        });
        L.f = N.join('; ');
      }
    }
    if (K.e) {
      if (typeof L.e == 'undefined') {
        L.e = {};
      }
      $.each(K.e, function (O, P) {
        if (typeof L.e[O] !== 'undefined') {
          h.MergeIndexEntries(L.e[O], P);
        } else {
          L.e[O] = P;
        }
      });
    }
  };
  this.FindIndexEntry = function (L, K) {
    h.LoadIndex(function (M) {
      if (!M.entries) {
        M.entries = {};
        $.each(M.terms, function (Q, R) {
          M.entries[R.t] = R;
        });
      }
      var O = L.split(':');
      var P = O.length;
      var N = M.entries[O[0]];
      if (N) {
        h.LoadRootIndexEntry(N, function (R) {
          var S = R;
          for (var Q = 1; Q < P; Q++) {
            S = S.e[O[Q]];
            if (!S) {
              break;
            }
          }
          if (K) {
            K(R, S);
          }
        });
      } else {
        if (K) {
          K();
        }
      }
    });
  };
  this.SortLinkList = function (K) {
    K.sort(function (M, L) {
      var O = M.Title.toLowerCase();
      var N = L.Title.toLowerCase();
      return O < N ? -1 : O > N ? 1 : 0;
    });
    return K;
  };
  this.GetSearchDBs = function (K) {
    var M = new Array();
    var L = this;
    require([D + 'Data/Search.js'], function (R) {
      function O(T) {
        if (T != null) {
          for (var S = 0; S < T.length; S++) {
            M[M.length] = T[S];
          }
        }
        P++;
        if (P == Q) {
          K(M);
        }
      }
      var P = 0;
      var Q = B.length;
      var N = new MadCap.WebHelp.Search.SearchDB(L);
      L.SearchDB = N;
      M[M.length] = N;
      N.Load(R, function () {
        var S = R.pm;
        if (S || Q == 0) {
          K(M);
        } else {
          for (var T = 0; T < Q; T++) {
            var U = B[T];
            if (!U.GetExists()) {
              O(null);
              continue;
            }
            U.GetSearchDBs(O);
          }
        }
      });
    });
  };
  this.GetConcepts = function () {
    return J;
  };
  this.GetSearchFilters = function () {
    return g.map;
  };
  this.ParseSearchFilterDoc = function (Q) {
    filterMap = Object.create(null);
    if (Q != null) {
      var P = Q.getElementsByTagName('SearchFilter');
      for (var M = 0; M < P.length; M++) {
        var N = P[M];
        var L = N.getAttribute('Name');
        var K = N.getAttribute('Order');
        var O = N.getAttribute('Concepts');
        if (!O) {
          continue;
        }
        filterMap[L] = { c: O, o: K, group: 0 };
      }
    }
    return filterMap;
  };
  this.LoadSearchFiltersLocal = function () {
    var K = $.Deferred();
    require([this.SearchFilterSetUrl], function (M) {
      var L = null;
      if (M) {
        L = { map: M, count: 1 };
      }
      K.resolve(L);
    });
    return K.promise();
  };
  this.LoadSearchFilters = function () {
    var M = $.Deferred();
    if (!this.IsWebHelpPlus) {
      function L(W) {
        if (W) {
          if (!K) {
            K = W;
            for (var T in W.map) {
              W.map[T].group = 0;
            }
          } else {
            for (var T in W.map) {
              if (!K.map[T]) {
                K.map[T] = W.map[T];
                K.map[T].group += K.count;
              } else {
                var V = K.map[T];
                var U = W.map[T];
                var S = V.c.split(';');
                var R = U.c.split(';');
                V.c = S.Union(R).join(';');
                if (MadCap.String.IsNullOrEmpty(V.cm)) {
                  V.cm = U.cm;
                }
              }
            }
            K.count += W.count;
          }
        }
      }
      var K;
      var P = [];
      P.push(this.LoadSearchFiltersLocal().then(L));
      for (var O = 0; O < B.length; O++) {
        var Q = B[O];
        if (Q.GetExists()) {
          P.push(Q.LoadSearchFilters().then(L));
        }
      }
      $.when.apply(this, P).done(function () {
        g = K;
        M.resolve(K);
      });
    } else {
      var N = this;
      MadCap.Utilities.Xhr.CallWebService(
        D + 'Service/Service.asmx/GetSearchFilters',
        true,
        function (S, R) {
          var T = N.ParseSearchFilterDoc(S);
          M.resolve({ map: T });
        }
      );
    }
    return M.promise();
  };
  this.AdvanceTopic = function (K, P, O, Q, L, M) {
    var N = null;
    h.FindNode(K, O, L, function (S) {
      if (S) {
        function R(U, T) {
          U = T == 'next' ? r(U) : q(U);
          if (U && typeof U.i !== 'undefined') {
            h.LoadTocChunk(U.toc, U.c).then(function (V) {
              var X = U.toc.entries[U.i];
              var W = h.GetTocEntryHref(U, K, true, Q);
              if (W) {
                if (MadCap.String.StartsWith(W, '#')) {
                  W = W.substring(1);
                }
                M(W);
              } else {
                R(U, T);
              }
            });
          }
        }
        R(S, P);
      }
    });
  };
  this.SetBrowseSequencePath = function (L, K) {
    var M = $('.current-topic-index-button');
    if (L != null) {
      this.FindBrowseSequenceNode(L, K, function (N) {
        if (N && N.parent) {
          M.removeClass('disabled');
          $('.sequence-index').text(N.parent.n.indexOf(N) + 1);
          $('.sequence-total').text(N.parent.n.length);
        } else {
          M.addClass('disabled');
        }
      });
    } else {
      M.addClass('disabled');
    }
  };
  this.GetSkins = function () {
    var K = [];
    z.ForEach(function (L, M) {
      K.push(M);
    });
    return K;
  };
  function c(M, K) {
    var L = M.documentElement.getAttribute(K);
    return I(L);
  }
  function I(L) {
    if (L == null) {
      return null;
    }
    var K = new MadCap.Utilities.Url(D);
    if (!K.IsAbsolute) {
      return D + L;
    }
    return K.AddFile(L).ToRelative(document.location.href).FullPath;
  }
  function l(Z) {
    var aa = $('CatapultSkin', Z.documentElement);
    for (var V = 0, R = aa.length; V < R; V++) {
      var W = aa[V];
      var S = $(W);
      var P = S.attr('SkinID');
      var Y = {};
      for (var U = 0, O = W.attributes.length; U < O; U++) {
        var X = W.attributes[U];
        Y[X.name] = X.value;
      }
      var Q = S.children();
      for (var U = 0, O = Q.length; U < O; U++) {
        var K = Q[U];
        var M = K.nodeName;
        var N = {};
        Y[M] = N;
        for (var T = 0, L = K.attributes.length; T < L; T++) {
          var X = K.attributes[T];
          N[X.name] = X.value;
        }
      }
      z.Add(P, Y);
    }
  }
  function u(M, N) {
    if (M.nodeName.toLowerCase() == 'madcap:glossarychunkref') {
      var P = $(M);
      var K = P.attr('src');
      if (!MadCap.String.IsNullOrEmpty(K)) {
        var L = new MadCap.Utilities.Url(N)
          .CombinePath('../../Data/')
          .CombinePath(K);
        P.attr('src', '../' + L.FullPath);
      }
    } else {
      var O = M.getElementsByTagName('a')[0];
      var K = $(O).attr('href');
      if (!MadCap.String.IsNullOrEmpty(K)) {
        var L = new MadCap.Utilities.Url(N)
          .CombinePath('../../Content/')
          .CombinePath(K);
        $(O).attr('href', '../' + L.FullPath);
      }
    }
  }
  function F(O) {
    for (var M = 0; M < O.childNodes.length; M++) {
      var K = O.childNodes[M];
      if (K.nodeName == 'Entries') {
        for (var L = 0; L < K.childNodes.length; L++) {
          F(K.childNodes[L]);
        }
      } else {
        if (K.nodeName == 'Links') {
          for (var L = 0; L < K.childNodes.length; L++) {
            if (K.childNodes[L].nodeType == 1) {
              var N = MadCap.Dom.GetAttribute(K.childNodes[L], 'Link');
              N = D + (N.charAt(0) == '/' ? N.substring(1, N.length) : N);
              K.childNodes[L].setAttribute('Link', N);
            }
          }
        }
      }
    }
  }
  function t(L, K) {
    if (!K) {
      return;
    }
    for (var M = 0; M < K.length; M++) {
      L[L.length] = K[M];
    }
  }
  function k(L, M, K) {
    M.GetGlossary(function (R) {
      if (typeof R == 'undefined') {
        K();
        return;
      }
      L.chunks = L.chunks.concat(R.chunks);
      for (var Q = 0, O = 0; Q < L.terms.length && O < R.terms.length; ) {
        var P = L.terms[Q];
        var N = R.terms[O];
        var U = P.t;
        var S = N.t;
        if (U.toLowerCase() == S.toLowerCase()) {
          Q++;
          O++;
        } else {
          if (U.toLowerCase() > S.toLowerCase()) {
            N.c += L.numchunks;
            L.terms.splice(Q, 0, N);
            O++;
          } else {
            Q++;
          }
        }
      }
      for (; O < R.terms.length; O++) {
        var T = R.terms[O];
        T.c += L.numchunks;
        L.terms.push(T);
      }
      L.numchunks = L.chunks.length;
      K();
    });
  }
  function b(M, L, K) {
    L.GetIndex(function (S) {
      if (typeof S == 'undefined') {
        K();
        return;
      }
      M.chunks = M.chunks.concat(S.chunks);
      for (var Q = 0, P = 0; Q < M.terms.length && P < S.terms.length; ) {
        var U = M.terms[Q];
        var T = S.terms[P];
        var O = U.s || U.t;
        var N = T.s || T.t;
        if (O == N && U.t == T.t) {
          if (typeof U.c == 'number') {
            U.c = [U.c];
          }
          var R = T.c;
          if (typeof T.c == 'number') {
            R = [T.c];
          }
          $.each(R, function (X, W) {
            U.c.push(W + M.numchunks);
          });
          U.$ = U.$ === 1 && T.$ === 1 ? 1 : 0;
          Q++;
          P++;
        } else {
          if (
            O.toLowerCase() > N.toLowerCase() ||
            (O.toLowerCase() == N.toLowerCase() &&
              U.t.toLowerCase() > T.t.toLowerCase())
          ) {
            T.c += M.numchunks;
            M.terms.splice(Q, 0, T);
            P++;
          } else {
            Q++;
          }
        }
      }
      for (; P < S.terms.length; P++) {
        var V = S.terms[P];
        V.c += M.numchunks;
        M.terms.push(V);
      }
      M.numchunks = M.chunks.length;
      K();
    });
  }
};
(function () {
  MadCap.WebHelp.HelpSystem.LoadHelpSystem = MadCap.Utilities.Memoize(function (
    b
  ) {
    var a = $.Deferred();
    var c = new MadCap.WebHelp.HelpSystem(null, null, b, null, null);
    c.Load(function () {
      a.resolve(c);
    });
    return a.promise();
  });
})();
MadCap.WebHelp.TocFile = function (r, l) {
  var b = this;
  var h = r;
  var e = l;
  var c = false;
  var i = null;
  var n = new Array();
  var j = null;
  var o = null;
  var a = new Array();
  (function () {})();
  this.Init = function (t) {
    if (c) {
      if (t != null) {
        t();
      }
      return;
    }
    if (t != null) {
      n.push(t);
    }
    var v = null;
    if (l == MadCap.WebHelp.TocFile.TocType.Toc) {
      v = 'Toc.xml';
    } else {
      if (l == MadCap.WebHelp.TocFile.TocType.BrowseSequence) {
        v = 'BrowseSequences.xml';
      }
    }
    this.LoadToc(h.GetPath() + 'Data/' + v, u);
    function u(w) {
      c = true;
      i = w.documentElement;
      g();
    }
  };
  this.LoadToc = function (u, t) {
    if (e == MadCap.WebHelp.TocFile.TocType.Toc && h.IsWebHelpPlus) {
      MadCap.Utilities.Xhr.CallWebService(
        h.GetPath() + 'Service/Service.asmx/GetToc',
        true,
        w,
        null
      );
    } else {
      if (
        e == MadCap.WebHelp.TocFile.TocType.BrowseSequence &&
        h.IsWebHelpPlus
      ) {
        MadCap.Utilities.Xhr.CallWebService(
          h.GetPath() + 'Service/Service.asmx/GetBrowseSequences',
          true,
          w,
          null
        );
      } else {
        var v = u.indexOf('/') == -1 ? h.GetPath() + 'Data/' + u : u;
        MadCap.Utilities.Xhr.Load(v, false, w, null, null);
      }
    }
    function w(y, x) {
      if (!y || !y.documentElement) {
        if (t != null) {
          t(y);
        }
        return;
      }
      if (t != null) {
        t(y);
      }
    }
  };
  this.LoadChunk = function (u, v, t) {
    var w = v.indexOf('/') == -1 ? h.GetPath() + 'Data/' + v : v;
    MadCap.Utilities.Xhr.Load(v, true, x, null, null);
    function x(E, z) {
      if (!E || !E.documentElement) {
        if (t != null) {
          t(u);
        }
        return;
      }
      u.removeAttribute('Chunk');
      var y = E.documentElement;
      for (var B = 0, D = y.childNodes.length; B < D; B++) {
        var A = y.childNodes[B];
        if (A.nodeType != 1) {
          continue;
        }
        var C = null;
        if (typeof E.importNode == 'function') {
          C = E.importNode(A, true);
        } else {
          C = A.cloneNode(true);
        }
        u.appendChild(C);
      }
      if (t != null) {
        t(u);
      }
    }
  };
  this.LoadMerge = function (y, t) {
    var x = MadCap.Dom.GetAttributeInt(y, 'MergeHint', -1);
    if (x == -1) {
      t(y, false, null, null);
      return;
    }
    y.removeAttribute('MergeHint');
    var A = k(y);
    var u = A.GetSubsystem(x);
    var v = MadCap.Dom.GetAttributeBool(y, 'ReplaceMergeNode', false);
    if (!v) {
      y.setAttribute('ownerHelpSystemIndex', a.length);
    }
    a[a.length] = u;
    var z =
      u.GetPath() +
      'Data/' +
      (e == MadCap.WebHelp.TocFile.TocType.Toc
        ? 'Toc.xml'
        : 'BrowseSequences.xml');
    var B = MadCap.Utilities.Xhr.Load(z, true, w);
    function w(N, K) {
      if (!N || !N.documentElement) {
        if (t != null) {
          t(y, false, null, null);
        }
        return;
      }
      var G = N.documentElement;
      var J = null;
      var H = true;
      var D = null;
      var E = null;
      var L = y.ownerDocument;
      for (var I = 0, F = G.childNodes.length; I < F; I++) {
        var C = G.childNodes[I];
        if (C.nodeType != 1) {
          continue;
        }
        var M = null;
        if (typeof L.importNode == 'function') {
          M = L.importNode(C, true);
        } else {
          M = C.cloneNode(true);
        }
        if (v) {
          M.setAttribute('ownerHelpSystemIndex', a.length - 1);
          if (H) {
            H = false;
            y.parentNode.replaceChild(M, y);
            D = M;
            E = D;
          } else {
            J.parentNode.insertBefore(M, J.nextSibling);
            E = M;
          }
          J = M;
        } else {
          y.appendChild(M);
        }
      }
      if (t != null) {
        t(y, v, D, E);
      }
    }
  };
  this.AdvanceTopic = function (x, w, u, v) {
    this.GetTocNode(w, u, t);
    function t(y) {
      if (y == null) {
        v(null);
        return;
      }
      var z = null;
      q(x, y, A);
      function A(E) {
        var B = null;
        if (E != null) {
          B = MadCap.Dom.GetAttribute(E, 'Link');
          B = B.substring('/'.length);
          var H = new MadCap.Utilities.Url(B);
          var G = null;
          if (e == MadCap.WebHelp.TocFile.TocType.Toc) {
            G = 'TocPath';
          } else {
            if (e == MadCap.WebHelp.TocFile.TocType.BrowseSequence) {
              G = 'BrowseSequencePath';
            }
          }
          var D = m(E, false);
          var C = H.ToQuery(G + '=' + encodeURIComponent(D));
          B = C.FullPath;
          var F = k(E);
          B = F.GetPath() + B;
          v(B);
        } else {
          v(B);
        }
      }
    }
  };
  this.GetRootNode = function (u) {
    this.Init(t);
    function t() {
      u(i);
    }
  };
  this.GetTocNode = function (v, t, x) {
    this.Init(w);
    function w() {
      j = v;
      o = t;
      var F = v == '' ? new Array(0) : v.split('|');
      var B = -1;
      if (F.length > 0) {
        var z = F[F.length - 1];
        if (MadCap.String.StartsWith(z, '_____')) {
          B = parseInt(z.substring('_____'.length));
          F.splice(F.length - 1, 1);
        }
      }
      var H = i;
      for (var D = 0, A = F.length; D < A; D++) {
        if (y(H)) {
          return;
        }
        if (u(H)) {
          return;
        }
        H = d(H, decodeURIComponent(F[D]));
      }
      if (H == null) {
        x(null);
        return;
      }
      if (y(H)) {
        return;
      }
      if (u(H)) {
        return;
      }
      if (B >= 0) {
        if (B == 0) {
          C = H;
        } else {
          C = $(H).children('TocEntry')[B - 1];
        }
      } else {
        var E = k(H);
        var G = t.ToRelative(new MadCap.Utilities.Url(E.GetPath()));
        var C = s(H, G.FullPath.toLowerCase(), true);
        if (!C) {
          C = s(H, G.PlainPath.toLowerCase(), false);
        }
      }
      j = null;
      o = null;
      x(C);
    }
    function y(z) {
      var A = MadCap.Dom.GetAttribute(z, 'Chunk');
      if (A != null) {
        b.LoadChunk(z, A, function (B) {
          b.GetTocNode(j, o, x);
        });
        return true;
      }
      return false;
    }
    function u(z) {
      var A = $(z).attr('MergeHint') || -1;
      if (A >= 0) {
        b.LoadMerge(z, function (B) {
          b.GetTocNode(j, o, x);
        });
        return true;
      }
      return false;
    }
  };
  this.GetEntrySequenceIndex = function (u, t, w) {
    this.GetTocNode(u, t, v);
    function v(y) {
      var x = -1;
      if (y != null) {
        x = f(y);
      }
      w(x);
    }
  };
  this.GetIndexTotalForEntry = function (u, t, w) {
    this.GetTocNode(u, t, v);
    function v(y) {
      var z = -1;
      if (y != null) {
        var x = y;
        while (x.parentNode != i) {
          x = x.parentNode;
        }
        z = MadCap.Dom.GetAttributeInt(x, 'DescendantCount', -1);
      }
      w(z);
    }
  };
  function g() {
    for (var t = 0, u = n.length; t < u; t++) {
      n[t]();
    }
  }
  function d(u, w) {
    var t = null;
    for (var v = 0; v < u.childNodes.length; v++) {
      if (
        u.childNodes[v].nodeName == 'TocEntry' &&
        MadCap.Dom.GetAttribute(u.childNodes[v], 'Title') == w
      ) {
        t = u.childNodes[v];
        break;
      }
    }
    return t;
  }
  function s(v, t, x) {
    var y = null;
    var B = MadCap.Dom.GetAttribute(v, 'Link');
    if (B != null) {
      B = B.substring('/'.length);
      B = B.replace(/%20/g, ' ');
      B = B.toLowerCase();
    }
    if (B == t) {
      y = v;
    } else {
      for (var w = 0; w < v.childNodes.length; w++) {
        var z = v.childNodes[w];
        if (z.nodeType != 1) {
          continue;
        }
        var A = MadCap.Dom.GetAttribute(z, 'Link');
        if (A == null) {
          continue;
        }
        A = A.substring('/'.length);
        A = A.replace(/%20/g, ' ');
        A = A.toLowerCase();
        if (!x) {
          var C = A.indexOf('#');
          if (C != -1) {
            A = A.substring(0, C);
          }
          var u = A.indexOf('?');
          if (u != -1) {
            A = A.substring(0, u);
          }
        }
        if (A == t) {
          y = z;
          break;
        }
      }
    }
    return y;
  }
  function q(w, t, x) {
    if (w == 'previous') {
      v(t);
    } else {
      if (w == 'next') {
        z(t);
      }
    }
    function A(F) {
      var B = null;
      if (F != null) {
        var E = MadCap.Dom.GetAttribute(F, 'Link');
        if (E == null) {
          q(w, F, x);
          return;
        }
        var C = new MadCap.Utilities.Url(E);
        var D = C.Extension.toLowerCase();
        var G = h.GetMasterHelpsystem();
        if (G.UseCustomTopicFileExtension) {
          if (D != G.CustomTopicFileExtension) {
            q(w, F, x);
            return;
          }
        } else {
          if (D != 'htm' && D != 'html') {
            q(w, F, x);
            return;
          }
        }
        B = F;
      }
      x(B);
    }
    function v(E) {
      function F(H) {
        var G = p(H, 'TocEntry');
        if (G == null) {
          D = H;
        } else {
          D = G;
          if (y(G, F)) {
            return;
          }
          if (u(G, C)) {
            return;
          }
        }
        A(D);
      }
      function C(H, I, J, G) {
        if (I) {
          F(G);
        } else {
          F(H);
        }
      }
      var D = null;
      for (var B = E.previousSibling; B != null; B = B.previousSibling) {
        if (B.nodeName == 'TocEntry') {
          D = B;
          break;
        }
      }
      if (D != null) {
        if (y(D, F)) {
          return;
        }
        if (u(D, C)) {
          return;
        }
        F(D);
        return;
      } else {
        if (E.parentNode.nodeType == 1) {
          D = E.parentNode;
        }
      }
      A(D);
    }
    function z(D) {
      function E(H) {
        var G = $(H).children('TocEntry')[0];
        for (var F = H; F != null && G == null; F = F.parentNode) {
          G = $(F).next('TocEntry')[0];
        }
        A(G);
      }
      function C(G, H, I, F) {
        if (H) {
          A(I);
          return;
        }
        E(G);
      }
      var B = null;
      if (y(D, E)) {
        return;
      }
      if (u(D, C)) {
        return;
      }
      E(D);
    }
    function y(C, B) {
      var D = MadCap.Dom.GetAttribute(C, 'Chunk');
      if (D != null) {
        b.LoadChunk(C, D, B);
        return true;
      }
      return false;
    }
    function u(C, B) {
      var D = $(C).attr('MergeHint') || -1;
      if (D >= 0) {
        b.LoadMerge(C, B);
        return true;
      }
      return false;
    }
  }
  function p(t, w) {
    var v = $(t).children(w + ':last')[0];
    if (v != null) {
      var u = p(v, w);
      if (u != null) {
        return u;
      }
      return v;
    }
    return null;
  }
  function k(u) {
    var w = null;
    var t = u;
    while (true) {
      if (t == t.ownerDocument.documentElement) {
        w = h;
        break;
      }
      var v = MadCap.Dom.GetAttributeInt(t, 'ownerHelpSystemIndex', -1);
      if (v >= 0) {
        w = a[v];
        break;
      }
      t = t.parentNode;
    }
    return w;
  }
  function m(u) {
    var x = '';
    var w = -1;
    var v = $(u).children('TocEntry')[0];
    if (v != null) {
      x = encodeURIComponent(MadCap.Dom.GetAttribute(u, 'Title'));
      w = 0;
    } else {
      w = $(u).index() + 1;
    }
    if (x.length > 0) {
      x += '|';
    }
    x += '_____' + w;
    for (
      var t = u.parentNode;
      t != null && t.parentNode.nodeType == 1;
      t = t.parentNode
    ) {
      if (x == null) {
        x = '';
      }
      if (x.length > 0) {
        x = '|' + x;
      }
      x = encodeURIComponent(MadCap.Dom.GetAttribute(t, 'Title')) + x;
    }
    return x;
  }
  function f(w) {
    if (w.parentNode == w.ownerDocument.documentElement) {
      return 0;
    }
    var v = 0;
    var z = MadCap.Dom.GetAttribute(w, 'Link');
    if (z != null) {
      v++;
    }
    for (var t = w.previousSibling; t != null; t = t.previousSibling) {
      if (t.nodeType != 1) {
        continue;
      }
      var y = MadCap.Dom.GetAttributeInt(t, 'DescendantCount', 0);
      v += y;
      var z = MadCap.Dom.GetAttribute(t, 'Link');
      if (z != null) {
        var u = new MadCap.Utilities.Url(z);
        var x = u.Extension.toLowerCase();
        if (x == 'htm' || x == 'html') {
          v++;
        }
      }
    }
    return v + f(w.parentNode);
  }
};
MadCap.WebHelp.TocFile.TocType = { Toc: 0, BrowseSequence: 1 };
MadCap.WebHelp.AliasFile = function (h, a, e) {
  var d = null;
  var f = a;
  var i = null;
  var g = null;
  (function () {})();
  this.Load = function (j) {
    MadCap.Utilities.Xhr.Load(h, true, function k(l) {
      if (l) {
        d = l.documentElement;
      }
      j();
    });
  };
  this.GetIDs = function () {
    var j = new Array();
    c();
    g.ForEach(function (k, l) {
      j[j.length] = k;
      return true;
    });
    return j;
  };
  this.GetNames = function () {
    var j = new Array();
    c();
    i.ForEach(function (k, l) {
      j[j.length] = k;
      return true;
    });
    return j;
  };
  this.LookupID = function (o) {
    var l = false;
    var j = null;
    var m = null;
    if (o) {
      if (typeof o == 'string' && o.indexOf('.') != -1) {
        var k = o.indexOf('|');
        if (k != -1) {
          j = o.substring(0, k);
          m = o.substring(k + 1);
        } else {
          j = o;
        }
        l = true;
      } else {
        var n = b(o);
        if (n != null) {
          l = true;
          j = n.Topic;
          m = n.Skin;
        }
      }
    } else {
      l = true;
    }
    if (j) {
      j = f.ContentFolder + j;
    }
    return { Found: l, Topic: j, Skin: m };
  };
  function b(k) {
    var j = null;
    c();
    if (i != null) {
      if (typeof k == 'string') {
        j = i.GetItem(k);
        if (j == null) {
          j = g.GetItem(k);
        }
      } else {
        if (typeof k == 'number') {
          j = g.GetItem(k.toString());
        }
      }
    }
    return j;
  }
  function c() {
    if (i == null) {
      if (d) {
        i = new MadCap.Utilities.Dictionary(true);
        g = new MadCap.Utilities.Dictionary();
        var p = d.getElementsByTagName('Map');
        for (var m = 0; m < p.length; m++) {
          var k = p[m].getAttribute('Link');
          var o = p[m].getAttribute('Skin');
          var l = { Topic: k, Skin: o };
          var j = p[m].getAttribute('Name');
          if (j != null) {
            i.Add(j, l);
          }
          var n = p[m].getAttribute('ResolvedId');
          if (n != null) {
            g.Add(n, l);
          }
        }
      }
    }
  }
};
MadCap.WebHelp.IndexEntry = function (g, f) {
  var e = MadCap.Dom.GetChildNodeByTagName(g, 'Links', 0).childNodes;
  var d = e.length;
  var b = 0;
  this.Term = MadCap.Dom.GetAttribute(g, 'Term');
  this.IndexLinks = new Array();
  this.Level = f;
  this.GeneratedReferenceType = MadCap.Dom.GetAttribute(
    g,
    'GeneratedReferenceType'
  );
  for (var c = 0; c < d; c++) {
    var a = e[c];
    if (a.nodeType != 1) {
      continue;
    }
    this.IndexLinks[b] = new MadCap.WebHelp.IndexLink(a);
    b++;
  }
};
MadCap.WebHelp.IndexLink = function (a) {
  this.Title = MadCap.Dom.GetAttribute(a, 'Title');
  this.Link = MadCap.Dom.GetAttribute(a, 'Link');
};
/*
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 * Unlicensed use is strictly prohibited
 *
 * v13.2.6355.27565
 */
(function () {
  if (!MadCap.Utilities.HasRuntimeFileType('Default')) {
    return;
  }
  MadCap.CreateNamespace('Default');
  var T = MadCap.Utilities.HasRuntimeFileType('TriPane');
  var aG = MadCap.Utilities.HasRuntimeFileType('WebApp');
  var a = T || MadCap.Utilities.IsRuntimeFileType('Default');
  var m = MadCap.Utilities.HasRuntimeFileType('SkinPreview');
  var o = null;
  var aE = 'search-';
  var A = 'q=';
  var N = null;
  function au(a2) {
    MadCap.DEBUG.Log.AddLine(window.name + 'onload');
    MadCap.DEBUG.Log.AddLine(window.name + 'hash: ' + document.location.hash);
    MadCap.DEBUG.Log.AddLine(
      window.name + 'search: ' + document.location.search
    );
    if ($.browser.msie && $.browser.version <= 9) {
      var aZ = $('#search-field');
      if (aZ.css('direction') == 'rtl') {
        aZ.css({
          'border-top-left-radius': aZ.css('border-top-right-radius'),
          'border-top-right-radius': aZ.css('border-top-left-radius'),
          'border-bottom-left-radius': aZ.css('border-bottom-right-radius'),
          'border-bottom-right-radius': aZ.css('border-bottom-left-radius'),
        });
      }
      var a3 = $('#contentBody');
      if (a3.css('direction') == 'rtl') {
        a3.css({
          'border-top-left-radius': a3.css('border-top-right-radius'),
          'border-top-right-radius': a3.css('border-top-left-radius'),
        });
      }
    }
    $('input, textarea').placeholder();
    $('.tabs .tabs-nav li').click(y);
    $('#home').click(I);
    $(
      'nav.title-bar a, a.homeLink, a.GenConceptText, a.GlossaryPageLink'
    ).click(MadCap.Utilities.Url.OnNavigateTopic);
    $('.search-submit').click(function (a4) {
      ao(a4);
    });
    $('#search-field, #search-field-sidebar, .search-field').keypress(function (
      a4
    ) {
      if (a4.which != 13) {
        return;
      }
      ao(a4);
      a4.preventDefault();
    });
    $('.search-filter').click(function (a5) {
      var a6 = $(this);
      var a4 = $('.search-filter-content', this);
      if (a6.hasClass('open')) {
        k(0, 0, a4, a6);
      } else {
        $(this).addClass('open');
        if (window.PIE) {
          $('.search-submit-wrapper').each(function () {
            PIE.detach(this);
            PIE.attach(this);
          });
        }
        a4.fadeIn(200);
        a4.css('max-height', $(window).height() - a4.offset().top);
      }
    });
    if (!$.browser.mobile) {
      $('.search-filter').mouseenter(function (a4) {
        clearTimeout(N);
      });
      $('.search-filter').mouseleave(function (a5) {
        var a4 = $(this);
        var a6 = $('.search-filter-content', this);
        k(200, 500, a6, a4);
      });
    }
    $('#navigationResizeBar').mousedown(aw);
    $('#show-hide-navigation').click(K);
    ac(parseInt($('#navigation').css('width')));
    var a1 = $('title');
    a1.attr('data-title', document.title);
    if (T) {
      $('.print-button').click(function (a4) {
        if (!m) {
          MadCap.Utilities.CrossFrame.PostMessageRequest(frames.topic, 'print');
        }
      });
      $('.expand-all-button').click(function (a5) {
        var a4 = $(this);
        if (a4.hasClass('expand-all-button')) {
          MadCap.Utilities.CrossFrame.PostMessageRequest(
            frames.topic,
            'expand-all'
          );
        } else {
          if (a4.hasClass('collapse-all-button')) {
            MadCap.Utilities.CrossFrame.PostMessageRequest(
              frames.topic,
              'collapse-all'
            );
          }
        }
        MadCap.Utilities.ToggleButtonState(this);
      });
      $('.remove-highlight-button').click(function (a4) {
        MadCap.Utilities.CrossFrame.PostMessageRequest(
          frames.topic,
          'remove-highlight'
        );
      });
      $('#topic').load(function () {
        MadCap.Utilities.CrossFrame.PostMessageRequest(
          frames.topic,
          'get-title',
          null,
          function (a5) {
            var a4 = a1.attr('data-title');
            var a6 = a4;
            if (!MadCap.String.IsNullOrEmpty(a4)) {
              a6 += ' - ';
            }
            document.title = a6 + a5[0];
          }
        );
        aX = null;
        aK();
        aM();
      });
    }
    $('.previous-topic-button').click(function (a4) {
      ak();
    });
    $('.next-topic-button').click(function (a4) {
      F();
    });
    ai();
    o = $(document).find('.tab')[0];
    var a0 = $(document.documentElement).attr('data-mc-path-to-help-system');
    var aY = 'Data/HelpSystem.xml';
    if (a0) {
      aY = a0 + aY;
    }
    if (MadCap.WebHelp && MadCap.WebHelp.HelpSystem) {
      MadCap.WebHelp.HelpSystem.LoadHelpSystem(aY).done(function (a6) {
        aF = a6;
        n = new MadCap.WebHelp.SearchPane(aF, $('#searchPane'));
        if (aF.LiveHelpEnabled) {
          aq = MadCap.WebHelp.LoadFeedbackController(aF.LiveHelpServer);
        } else {
          if (m) {
            aq = new MadCap.WebHelp.MockFeedbackController();
          }
        }
        if (aq != null) {
          aq.Init(function () {
            if (aq.PulseActive) {
              $(document.documentElement).addClass('pulse-active');
              ac(parseInt($('#navigation').css('width')));
            }
            if (aq.FeedbackActive) {
              $(document.documentElement).addClass('feedback-active');
              u();
              var a7 = MadCap.Utilities.Url.GetDocumentUrl();
              if (!T) {
                aK();
                if (!MadCap.Utilities.HasRuntimeFileType('Search')) {
                  aM();
                }
              }
            }
          });
        }
        if (
          T &&
          aF.DefaultSkin != null &&
          !MadCap.String.IsNullOrEmpty(aF.DefaultSkin.Tabs)
        ) {
          D();
        }
        var a4 = $('ul[data-mc-toc]');
        a4.each(function () {
          if ($(this).hasClass('off-canvas-list')) {
            h(aF.GetCurrentSkin());
          }
        });
        var a5 = MadCap.Utilities.Url.GetDocumentUrl();
        if (document.location.hash.length > 1) {
          aH();
        } else {
          O(aF.DefaultStartTopic + a5.Query);
        }
        if (a5.QueryMap.GetItem('cshid') != null) {
          L();
        }
        aO();
        if (T) {
          ag(aF.DefaultSkin);
        }
        l();
        E();
        if (!aF.IsResponsive) {
          $('body').addClass('web');
        } else {
          if (aF.IsTabletLayout()) {
            I();
          }
        }
        aF.LoadSearchFilters().then(function (ba) {
          var a7 = ba ? ba.map : null;
          var bf = [];
          var bk = false;
          if (a7) {
            for (var be in a7) {
              var a8 = a7[be];
              if (!MadCap.String.IsNullOrEmpty(a8.c)) {
                bf.push(be);
                bk |= a8.o != -1;
              }
            }
          }
          if (bf.length == 0) {
            if (window.PIE) {
              $('.search-submit-wrapper').each(function () {
                PIE.attach(this);
              });
            }
            $('#SearchTab').closest('div').empty();
            return;
          }
          $('.search-filter-wrapper').show();
          if (window.PIE) {
            $('.search-filter, .search-submit-wrapper').each(function () {
              PIE.attach(this);
            });
          }
          var bb = {};
          bf.forEach(function (bl) {
            var bm = a7[bl];
            if (bm.o > -1) {
              bb[bm.o] = bl;
            }
          });
          if (bk) {
            var bj = bf.sort(function (bm, bl) {
              if (a7[bm].group != a7[bl].group) {
                return a7[bm].group - a7[bl].group;
              }
              if (a7[bm].o != a7[bl].o) {
                return a7[bm].o - a7[bl].o;
              }
              return bm < bl ? -1 : bm > bl ? 1 : 0;
            });
            bf = bj;
          } else {
            var bj = bf.sort();
            bf = bj;
          }
          if (T && $('.search-bar').css('display') == 'none') {
            $('#SearchTab').closest('.tab').remove();
            return;
          }
          var bd = $('#search ul');
          for (var bc = 0, a9 = bf.length; bc < a9; bc++) {
            $('.search-filter-content ul').append($('<li></li>').text(bf[bc]));
            var bh = $('<li/>');
            bh.addClass('SearchFilterEntry tree-node tree-node-leaf');
            var bi = $('<div class="SearchFilter" />');
            var bg = $('<span class="label" />');
            bg.text(bf[bc]);
            bi.append(bg);
            bh.append(bi);
            bd.append(bh);
          }
          G();
        });
        aP(a2);
      });
    } else {
      G();
    }
  }
  function G() {
    $('.search-filter-content li').click(function (a3) {
      var aY = $(a3.target);
      var a1 = aY.text().trim();
      var aZ = aY.closest('.search-bar').children('.search-field');
      var a2 = aZ.val();
      var a0 = aY.closest('.search-filter');
      var a4 = aY.closest('.search-filter-content');
      an(a1);
      f(a1, a0);
      k(0, 0, a4, a0);
      aJ(a2, a1);
    });
    $('.SearchFilter').click(function (a2) {
      var aY = $(a2.target).closest('.SearchFilterEntry');
      var a1 = $('#search-field-sidebar').val();
      $('.SearchFilterEntry.tree-node-selected').removeClass(
        'tree-node-selected'
      );
      if (aY.hasClass('SearchFilterEntry')) {
        aY.addClass('tree-node-selected');
        var a0 = aY.find('.SearchFilter').text().trim();
        var aZ = $('#search-field-sidebar');
        if (!aZ.attr('data-placeholder')) {
          aZ.attr('data-placeholder', aZ.attr('placeholder'));
        }
        aZ.attr('placeholder', aZ.attr('data-placeholder') + ' ' + a0);
        an(a0, this);
        aJ(a1, a0);
      }
    });
  }
  function ar(aY) {
    if (T) {
      MadCap.Utilities.CrossFrame.PostMessageRequest(
        frames.topic,
        'get-topic-id',
        null,
        function (aZ) {
          aY(aZ[0]);
        }
      );
    } else {
      aY($('html').attr('data-mc-live-help'));
    }
  }
  function k(a0, a1, aY, aZ) {
    if (N) {
      clearTimeout(N);
    }
    N = setTimeout(function () {
      $(aY).fadeOut(a0, function () {
        $(aZ).removeClass('open');
      });
    }, a1);
  }
  function U(aY) {
    $('.search-field').val(aY);
    $('#search-field-sidebar').val(aY);
  }
  function an(aZ) {
    $('.search-filter').data('filter', aZ);
    if (!T) {
      var aY = $('.search-field');
      if (!aY.attr('data-placeholder')) {
        aY.attr('data-placeholder', aY.attr('placeholder'));
      }
      aY.attr('placeholder', aY.attr('data-placeholder') + ' ' + aZ);
    } else {
      $('.search-filter > span').text(aZ);
    }
  }
  function f(a1, a0) {
    var a2 = $('.search-filter-content', a0);
    var aY = a2.children()[0];
    var aZ = $(aY).children()[0];
    a1 !== $(aZ).text()
      ? $('.search-filter').addClass('selected')
      : $('.search-filter').removeClass('selected');
  }
  function l() {
    var aY = $('.select-skin-button');
    if (
      m ||
      (aF.IsResponsive && aF.DefaultSkin != null && aF.GetSkins().length > 1)
    ) {
      aY.click(function (a0) {
        var a1 = [];
        var aZ = new MadCap.Utilities.Url(document.location.href);
        $.each(aF.GetSkins(), function (a2, a4) {
          var a3 = {
            Title: a4.Name,
            Link: aZ.PlainPath + '?skinName=' + a4.SkinID + aZ.Fragment,
          };
          a1[a1.length] = a3;
        });
        MadCap.TextEffects.CreateToolbarDropdown(
          a1,
          aY[0],
          'select-skin-drop-down'
        );
        a0.preventDefault();
        a0.stopPropagation();
      });
    } else {
      aY.hide();
    }
  }
  function E() {
    var aY = $('.select-language-button');
    if (m) {
      aY.click(function (aZ) {
        MadCap.TextEffects.CreateDummyToolbarDropdown(
          aY,
          'select-language-drop-down',
          'Language'
        );
        aZ.preventDefault();
        aZ.stopPropagation();
      });
      return;
    }
    if (!aF.IsMultilingual) {
      aY.hide();
      return;
    }
    require([aF.GetPath() + '../languages.js'], function (a0) {
      var aZ = a0.data;
      if (aZ.length > 1) {
        aY.click(function (a5) {
          var a9 = [];
          var a8 = aF.GetPath();
          var a3 = aF.GetCurrentTopicPath();
          var a1 = new MadCap.Utilities.Url(document.location.href);
          for (var a4 = 0; a4 < aZ.length; a4++) {
            var a6 = '../' + aZ[a4].code + '/';
            var a2 = a8 + a6 + a3;
            var a7 = { Title: aZ[a4].full, Link: a2 };
            a9[a9.length] = a7;
          }
          MadCap.TextEffects.CreateToolbarDropdown(
            a9,
            aY[0],
            'select-language-drop-down'
          );
          a5.preventDefault();
          a5.stopPropagation();
        });
      } else {
        aY.hide();
      }
    });
  }
  var b = window.innerWidth;
  var aP = MadCap.Utilities.Debounce(function () {
    var a0 = window.innerWidth;
    if (aF && aF.IsResponsive) {
      var a3 = aF.IsTabletLayout();
      var aZ = aF.IsTabletLayout(b);
      if (!a3) {
        $('#navigation').removeAttr('role');
        $('body').removeClass('active');
        $('body').addClass('web');
        if (aZ) {
          I();
        }
        if (o) {
          var a1 = $(o);
          if (!a1.hasClass('active')) {
            var aY = a1.find('li');
            var a2 = $(aY[0]);
            a2.removeClass('tabs-nav-inactive');
            a2.addClass('tabs-nav-active');
            a1.addClass('active');
          }
        } else {
          if (!o && $(document).find('.tab.active').length == 0) {
            o = $($(document).find('.tab')[0]);
            R('Toc', o);
          }
        }
      } else {
        if ($('#navigation').attr('role') !== 'undefined') {
          $('#navigation').attr('role', 'complementary');
        }
        if (!aZ) {
          var a1 = $('.tab.active');
          o =
            a1.length && a1.find('li').text() != 'SearchTab'
              ? $('.tab.active')
              : o;
          $('.tab .tabs-nav-active').removeClass('tabs-nav-active');
          $('.tabs-nav li').addClass('tabs-nav-inactive');
          $('.tab.active').removeClass('active');
        }
        $('body').removeClass('web');
      }
      if ((a3 && !aZ) || (!a3 && aZ)) {
        aS();
      }
    }
    ac(parseInt($('#navigation').css('width')));
    b = a0;
  }, 50);
  function aS() {
    var a0 = $(document.documentElement).hasClass('left-layout')
      ? 'left'
      : $(document.documentElement).hasClass('right-layout')
      ? 'right'
      : 'left';
    var a5 = $('#navigation');
    var a4 = $('#contentBody');
    var aZ = $('#navigationResizeBar');
    var a1 = !a5.attr('style') || !a4.attr('style');
    var a3 = !a5.attr('data-mc-last-width') || !a4.attr('data-mc-last-width');
    if (a1 && a3) {
      return;
    }
    if (!aF.IsTabletLayout()) {
      var a2 = a5.attr('data-mc-last-width');
      if (a2) {
        a5.css('width', a2);
        var aY = a4.attr('data-mc-last-width');
        if (aY) {
          a4.css(a0, aY);
        }
      }
    } else {
      var a2 = a5.css('width');
      if (a2) {
        a5.attr('data-mc-last-width', a2);
        a5.removeAttr('style');
        var aY = a4.css(a0);
        if (aY) {
          a4.attr('data-mc-last-width', aY);
        }
        a4.removeAttr('style');
      }
    }
  }
  function B(aY) {
    MadCap.DEBUG.Log.AddLine(
      window.name + 'onhashchange: ' + document.location.hash
    );
    if (document.location.hash.length > 1) {
      aH();
    } else {
      if (aF) {
        O(aF.DefaultStartTopic);
      }
    }
  }
  function u() {
    $('.star-buttons').click(ab);
    X();
    $('.buttons').on('click', '.login-button', function (aY) {
      if (m) {
        MadCap.Utilities.SetButtonState($('.login-button'), 2);
      } else {
        W = new MadCap.Feedback.LoginDialog(
          aq,
          aq.PulseEnabled ? 'pulse' : 'new'
        );
        if (!aq.PulseEnabled) {
          $(W).bind('closed', function () {
            X();
          });
        }
        W.Show();
      }
    });
    $('.buttons').on('click', '.edit-user-profile-button', function (aZ) {
      if (m) {
        MadCap.Utilities.SetButtonState($('.edit-user-profile-button'), 1);
      } else {
        if (aq.PulseEnabled) {
          var aY = '#!streams/' + (T ? aq.PulseUserGuid + '/settings' : 'my');
          ae(aY);
        } else {
          W = new MadCap.Feedback.LoginDialog(aq, 'edit');
          $(W).bind('closed', function () {
            X();
          });
          W.Show();
        }
      }
    });
  }
  function ao(a0) {
    var aZ = aN(a0);
    if (!MadCap.String.IsNullOrEmpty(aZ.Query)) {
      var aY = aE + aZ.ToString();
      if (T) {
        document.location.hash = aY;
      } else {
        aY = A + aZ.ToString();
        MadCap.Utilities.Url.NavigateTopic(
          new MadCap.Utilities.Url(aF.SearchUrl + '?' + aY)
        );
      }
    }
  }
  function aN(a4) {
    var a7 = $(a4.target).closest('.search-bar-container');
    var a5 = $('input', a7).first();
    var aZ = $('.search-filter', a7);
    var a8 = a5.val();
    if (a8) {
      a8 = MadCap.Utilities.Url.StripInvalidCharacters(a8);
      a8 = encodeURIComponent(a8);
    }
    var a6;
    var a2 = a7.attr('id');
    if (T && a2 && a2.indexOf('sidebar') != -1) {
      a6 = $('.SearchFilterEntry.tree-node-selected').text();
    } else {
      a6 = aZ.data('filter');
    }
    if (!a6) {
      var a1 = MadCap.Utilities.Url.CurrentHash();
      var a3 = a1.lastIndexOf('?f=');
      if (a3 !== -1) {
        var aY = a1.substr(a3 + 3);
        if (aY) {
          a6 = aY;
        }
      }
    }
    a6 = a6 ? a6.trim() : a6;
    var a0 = P(a6, a7);
    return new MadCap.WebHelp.Search.SearchQuery(a8, a0, null);
  }
  function P(aZ, a1) {
    var aY = $.trim($('.search-filter li', a1).first().text());
    if (aZ && aZ != aY) {
      var a0 = MadCap.Utilities.Url.StripInvalidCharacters(aZ);
      return encodeURIComponent(a0);
    }
    return null;
  }
  function aT(a1, aY) {
    var a0 = MadCap.WebHelp.Search.SearchQuery.Parse(a1);
    if (!T && !MadCap.Utilities.HasRuntimeFileType('Search')) {
      var aZ;
      if (aY) {
        aZ = new MadCap.Utilities.Url(
          aF.SearchUrl + '?skinName=' + aY + '&' + A + a0.ToString()
        );
      } else {
        aZ = new MadCap.Utilities.Url(aF.SearchUrl + '?' + A + a0.ToString());
      }
      MadCap.Utilities.Url.NavigateTopic(aZ);
    } else {
      U(a0.Query);
      if (!MadCap.String.IsNullOrEmpty(a0.Filter)) {
        an(a0.Filter);
        f(a0.Filter, document);
      }
      p(a0.Query, a0.Filter, a0.PageIndex);
    }
  }
  function aJ(aZ, aY) {
    if (!T && m) {
      return;
    }
    if ($('#searchPane').is(':visible') && !MadCap.String.IsNullOrEmpty(aZ)) {
      aL(new MadCap.WebHelp.Search.SearchQuery(aZ, P(aY), null));
    }
  }
  function p(a6, a0, a4, a1, a2, aY, a3) {
    var a5 = aF.GetCurrentSkin();
    if (typeof a1 == 'undefined') {
      a1 = true;
    }
    if (typeof a2 == 'undefined') {
      a2 =
        (!a5 && aF.DisplayCommunitySearchResults) ||
        (a5 && a5.DisplayCommunitySearchResults != 'false');
    }
    if (typeof aY == 'undefined') {
      aY = aF.CommunitySearchResultsCount;
    }
    if (typeof a3 == 'undefined') {
      a3 = 0;
    }
    if (!a4) {
      a4 = 1;
    }
    $('#resultList').remove();
    ay('search');
    var aZ = a4 === 1;
    var a7 = {};
    if (a1) {
      a7.searchContent = true;
      a7.searchGlossary = aF.IncludeGlossarySearchResults && aZ;
      a7.content = { filterName: a0 };
    }
    if (a2 && (aZ || !a1)) {
      a7.searchCommunity = true;
      a7.community = { pageSize: aY, pageIndex: a3 };
    }
    n.Search(a6, a7).then(function (a8) {
      V(a6, a8, a4);
    });
    $('body').removeClass('active');
  }
  function x(a5, a1) {
    var a8 = $('#pagination');
    a8.css('display', 'none');
    $('a.specificPage', a8).remove();
    var a2 = a1.length;
    if (a2 > 0) {
      var a4 = Math.ceil(a2 / aF.ResultsPerPage);
      var a6 = 10;
      var a7 = 5;
      var ba = Math.max(Math.min(a5 - a7, a4 - a6 + 1), 1);
      var a3 = Math.min(ba + a6 - 1, a4);
      var aY = $('a.previousPage', a8);
      if (a5 > 1) {
        aY.off('click');
        aY.on('click', { value: a5 - 1 }, J);
        aY.css('display', 'inline');
      } else {
        aY.css('display', 'none');
      }
      var a9 = $('a.nextPage', a8);
      if (a5 < a4) {
        a9.off('click');
        a9.on('click', { value: a5 + 1 }, J);
        a9.css('display', 'inline');
      } else {
        a9.css('display', 'none');
      }
      for (var a0 = ba; a0 <= a3; a0++) {
        var aZ = $("<a class='specificPage'>" + a0 + '</a>');
        if (a0 == a5) {
          aZ.attr('id', 'selected');
        }
        a9.before(aZ);
        aZ.on('click', { value: a0 }, J);
      }
      a8.css('display', 'block');
    }
  }
  function J(a2) {
    a2.preventDefault();
    var a1 = MadCap.Utilities.Url.GetDocumentUrl();
    var aZ = T ? '#' + aE : '?' + A;
    var a0 = T ? MadCap.Utilities.Url.CurrentHash() : a1.Query;
    if (a0.indexOf(aZ) == 0) {
      var aY = MadCap.WebHelp.Search.SearchQuery.Parse(a0.substring(aZ.length));
      aY.PageIndex = a2.data.value;
      aL(aY);
    }
  }
  function aL(a2, a0, aY) {
    var a1;
    if (T) {
      a1 = a2.ToString();
    } else {
      a1 = A + a2.Query;
      if (a2.Filter) {
        a1 += '&f=' + a2.Filter;
      }
      if (a2.PageIndex) {
        a1 += '&p=' + a2.PageIndex;
      }
    }
    a1 = MadCap.Utilities.Url.StripInvalidCharacters(a1);
    if (T) {
      document.location.hash = '#' + aE + a1;
    } else {
      var aZ = new MadCap.Utilities.Url(aF.SearchUrl + '?' + a1);
      MadCap.Utilities.Url.NavigateTopic(aZ);
    }
  }
  function V(bo, bk, a8) {
    var a4 = aF.GetCurrentSkin();
    var bt =
      (!a4 && aF.DisplayCommunitySearchResults) ||
      (a4 && a4.DisplayCommunitySearchResults != 'false');
    var a6 = $('#results-heading')[0];
    var bq = $('#pagination');
    var a3 = bk.content != null ? bk.content.length : 0;
    var bl = bt && bk.community != null ? bk.community.TotalRecords : 0;
    var br = bk.glossary ? 1 : 0;
    var bd = a3 + bl + br;
    var ba = T ? '#' : '';
    Z(a6, 'Search Heading');
    $('.query', a6).text('"' + decodeURIComponent(bo) + '"');
    $('.total-results', a6).text(bd);
    if (a8 < 1 || a8 > Math.ceil(a3 / aF.ResultsPerPage)) {
      bq.css('display', 'none');
    }
    if (bd > 0) {
      var bf = document.createElement('ul');
      bf.setAttribute('id', 'resultList');
      if (!bk.content) {
        bf.setAttribute('class', 'communitySearch');
      }
      if (bk.glossary) {
        var be = document.createElement('li');
        bf.appendChild(be);
        var bg = document.createElement('div');
        $(bg).addClass('glossary');
        Z(bg, 'Search Glossary Result');
        var bh = document.createElement('div');
        $(bh).addClass('term');
        Z(bh, 'Search Glossary Term');
        var bi = document.createTextNode(bk.glossary.term);
        if (bk.glossary.link) {
          var aY = document.createElement('a');
          $(aY).attr('href', ba + bk.glossary.link);
          aY.appendChild(bi);
          bh.appendChild(aY);
        } else {
          bh.appendChild(bi);
        }
        bg.appendChild(bh);
        var a5 = bk.glossary.definition || bk.glossary.abstractText;
        if (a5) {
          var bb = document.createElement('div');
          $(bb).addClass('definition');
          bb.appendChild(document.createTextNode(a5));
          Z(bb, 'Search Glossary Definition');
          bg.appendChild(bb);
        }
        be.appendChild(bg);
      }
      if (bk.community != null && bk.community.Activities.length > 0 && bt) {
        aj(bf, bo, bk.community);
      }
      var a0 = aF.ResultsPerPage;
      if (bk.content != null && a0 > 0) {
        var bj = (a8 - 1) * a0;
        var bp = Math.min(bj + a0, bk.content.length);
        for (var bn = bj; bn < bp; bn++) {
          var bc = bk.content[bn];
          var bu = bc.Title;
          var a9 = bc.Link;
          var aZ = bc.AbstractText;
          var be = document.createElement('li');
          bf.appendChild(be);
          var a7 = document.createElement('h3');
          $(a7).addClass('title');
          be.appendChild(a7);
          var bs = document.createElement('a');
          bs.setAttribute('href', ba + a9 + '?Highlight=' + bo);
          Z(bs, 'Search Result Link');
          bs.appendChild(document.createTextNode(bu));
          c(bs, bk.includedTerms);
          a7.appendChild(bs);
          if (aZ != null) {
            var bm = document.createElement('div');
            $(bm).addClass('description');
            Z(bm, 'Search Result Abstract');
            bm.appendChild(document.createTextNode(aZ));
            c(bm, bk.includedTerms);
            be.appendChild(bm);
          }
          var a1 = document.createElement('div');
          $(a1).addClass('url');
          be.appendChild(a1);
          var a2 = document.createElement('cite');
          Z(a2, 'Search Result Path');
          a2.appendChild(document.createTextNode(a9));
          a1.appendChild(a2);
        }
      }
      bq.before(bf);
    }
    if (aF.LiveHelpEnabled) {
      aq.LogSearch(aF.LiveHelpOutputId, null, a3, null, bo);
    }
    if (a3 > aF.ResultsPerPage) {
      x(a8, bk.content);
    } else {
      bq.css('display', 'none');
    }
    if (MadCap.IsIOS()) {
      $('.off-canvas-wrapper').scrollTop(1);
    }
    $('#contentBodyInner, .off-canvas-wrapper').scrollTop(0);
    $('#resultList a').first().focus();
  }
  function Z(aZ, aY) {
    if (m) {
      aZ.setAttribute('data-mc-style', aY);
    }
  }
  function c(aY, a0) {
    var a1 = $(aY);
    if (a0) {
      for (var aZ = 0; aZ < a0.length; aZ++) {
        a1.highlight(a0[aZ], null, 'b');
      }
    }
  }
  function aj(ba, bi, a2) {
    var a4 = (aF.PulsePage || '') + '#pulse-';
    var bf = T ? '#' : aF.GetTopicPath('../' + aF.ContentFolder).FullPath;
    var a9 = document.createElement('li');
    a9.setAttribute('id', 'community-results');
    ba.appendChild(a9);
    var a3 = document.createElement('h3');
    a3.setAttribute('class', 'title');
    var bd = document.createElement('a');
    bd.setAttribute('href', '#communitysearch-' + bi);
    bd.appendChild(document.createTextNode('Community Results'));
    a3.appendChild(bd);
    var a0 = document.createElement('span');
    a0.appendChild(document.createTextNode(' (' + a2.TotalRecords + ')'));
    a3.appendChild(a0);
    var a6 = document.createElement('ul');
    a6.setAttribute('id', 'communityResultList');
    a9.appendChild(a3);
    a9.appendChild(a6);
    var aY = new Date();
    var aZ = new Date(
      aY.getUTCFullYear(),
      aY.getUTCMonth(),
      aY.getUTCDate(),
      aY.getUTCHours(),
      aY.getUTCMinutes(),
      aY.getUTCSeconds()
    );
    for (var bh = 0; bh < a2.Activities.length; bh++) {
      var bl = a2.Activities[bh];
      var a5 = document.createElement('li');
      a6.appendChild(a5);
      var bb = document.createElement('a');
      bb.setAttribute('class', 'activityText');
      bb.setAttribute(
        'href',
        a4 + '#!streams/' + bl.FeedId + '/activities/' + bl.Id
      );
      bb.appendChild(document.createTextNode(bl.Text));
      var bj = document.createElement('div');
      bj.setAttribute('class', 'activityInfo');
      var a1 = document.createElement('a');
      a1.setAttribute('class', 'activityCreator');
      a1.setAttribute('href', a4 + '#!streams/' + bl.CreatedBy + '/activities');
      a1.appendChild(document.createTextNode(bl.CreatedByDisplayName));
      var bg = document.createElement('span');
      bg.appendChild(document.createTextNode(' to '));
      var a7 =
        bl.FeedUrl != null
          ? bf + bl.FeedUrl
          : a4 + '#!streams/' + bl.FeedId + '/activities';
      var a8 = document.createElement('a');
      a8.setAttribute('class', 'activityFeed');
      a8.setAttribute('href', a7);
      a8.appendChild(document.createTextNode(bl.FeedName));
      var bk = new MadCap.Utilities.DateTime(bl.PostedUtc);
      var bc = new MadCap.Utilities.TimeSpan(bk.Date, aZ);
      var be = document.createElement('span');
      be.setAttribute('class', 'activityTime');
      be.appendChild(document.createTextNode(bc.ToDurationString()));
      bj.appendChild(a1);
      bj.appendChild(bg);
      bj.appendChild(a8);
      bj.appendChild(be);
      a5.appendChild(bb);
      a5.appendChild(bj);
    }
  }
  function aw(aZ) {
    MadCap.DEBUG.Log.AddLine('nav resizeBar : mousedown');
    if ($(aZ.target).attr('id') == 'show-hide-navigation') {
      return;
    }
    if ($(this).hasClass('nav-closed')) {
      return;
    }
    var aY = document.createElement('div');
    aY.setAttribute('id', 'mousemove-sheet');
    document.body.appendChild(aY);
    $(document).mousemove(s);
    $(document).mouseup(t);
    $(document).bind('selectstart', aD);
    aZ.preventDefault();
  }
  function aD(aY) {
    return false;
  }
  function s(a0) {
    MadCap.DEBUG.Log.AddLine('nav resizeBar : mousemove : ' + a0.pageX);
    var aY = $(document.documentElement).hasClass('left-layout')
      ? 'left'
      : $(document.documentElement).hasClass('right-layout')
      ? 'right'
      : 'left';
    var aZ = a0.pageX;
    if (aY == 'right') {
      aZ = window.innerWidth - a0.pageX;
    }
    e(aZ);
  }
  function t(aZ) {
    MadCap.DEBUG.Log.AddLine('nav resizeBar : mouseup');
    $(document).off('mousemove', s);
    $(document).off('mouseup', t);
    $(document).off('selectstart', aD);
    var aY = $('#mousemove-sheet')[0];
    window.setTimeout(function () {
      aY.parentNode.removeChild(aY);
    }, 1);
  }
  function e(aZ) {
    var aY = $(document.documentElement).hasClass('left-layout')
      ? 'left'
      : $(document.documentElement).hasClass('right-layout')
      ? 'right'
      : 'left';
    if (aY == 'left') {
      if (aZ < 175 || aZ > window.innerWidth * 0.85) {
        return;
      }
    } else {
      if (aY == 'right') {
        if (aZ < window.innerWidth * 0.15 || aZ > window.innerWidth - 175) {
          return;
        }
      }
    }
    ac(aZ);
    $('#navigationResizeBar').css(aY, aZ + 'px');
    $('#navigation').css('width', aZ + 'px');
    $('#contentBody').css(aY, aZ + 5 + 'px');
  }
  function ac(a1) {
    var a0 = $('.tabs-nav li');
    if (aQ() === 0) {
      return;
    }
    $.each(a0, function (a3, a4) {
      var a2 = $(a4);
      if (a2.hasClass('tab-collapsed')) {
        a2.removeClass('tab-collapsed');
      }
    });
    if (a1 < aQ() + 4) {
      for (var aZ = a0.length - 1; aZ >= 0; aZ--) {
        var aY = $(a0[aZ]);
        aY.addClass('tab-collapsed');
        if (a1 > aQ() + 18) {
          break;
        }
      }
    }
  }
  function aQ() {
    var aZ = 0;
    var aY = $('.tabs-nav li');
    aY.each(function (a1, a0) {
      var a2 = $(a0);
      if (a2.is(':visible')) {
        aZ += parseInt(a2.css('width'));
      }
    });
    return aZ;
  }
  function I() {
    var aZ = $(document).find('.tab');
    for (var aY = 0; aY < aZ.length; aY++) {
      var a0 = $(aZ[aY]);
      a0.show();
      a0.removeClass('active');
    }
    $('#search-sidebar').removeClass('index').removeClass('glossary');
    $('.tabs-nav-active').removeClass('tabs-nav-active');
    $('.tabs-nav li').addClass('tabs-nav-inactive');
    $('.responsive-link-list').remove();
  }
  function K(aY) {
    var aZ = $('#navigation');
    if (!aZ.hasClass('nav-closed')) {
      q('hide');
    } else {
      q('show');
    }
  }
  function q(a1) {
    var aY = $(document.documentElement).hasClass('left-layout')
      ? 'left'
      : $(document.documentElement).hasClass('right-layout')
      ? 'right'
      : 'left';
    var a3 = $('#navigation');
    var aZ = $('#navigationResizeBar');
    var a2 = $('#contentBody');
    if (a1 == 'show') {
      aZ.css(aY, aZ.attr('data-mc-last-width'));
      var a0 = a2.attr('data-mc-last-width');
      if (a0 == a2.css('left')) {
        a0 = a3.innerWidth() + aZ.innerWidth() + 1;
        a2.attr('data-mc-last-width', a0 + 'px');
      } else {
        a2.css(aY, a0);
      }
      a3.removeClass('nav-closed');
      aZ.removeClass('nav-closed');
      a2.removeClass('nav-closed');
      if (aF.IsResponsive) {
        aS();
      }
    } else {
      if (a1 == 'hide') {
        a2.attr('data-mc-last-width', a2.css(aY));
        a2.removeAttr('style');
        aZ.attr('data-mc-last-width', aZ.css(aY));
        aZ.css(aY, 0);
        a3.attr('data-mc-last-width', a3.css('width'));
        a3.addClass('nav-closed');
        aZ.addClass('nav-closed');
        a2.addClass('nav-closed');
      }
    }
  }
  function aH() {
    if (document.location.hash.length == 0) {
      return;
    }
    var a3 = MadCap.Utilities.Url.GetDocumentUrl();
    var a2 = MadCap.Utilities.Url.CurrentHash();
    var a1 = MadCap.Utilities.Url.StripInvalidCharacters(a2);
    if (MadCap.String.IsNullOrEmpty(a1)) {
      document.location.hash = '';
      return;
    }
    var aZ = a1.substring(1);
    var a4 = decodeURIComponent(aZ);
    a4 = MadCap.Utilities.Url.StripInvalidCharacters(a4);
    if (
      MadCap.String.Contains(a4, 'cshid=') ||
      MadCap.String.Contains(a4, 'searchQuery=') ||
      MadCap.String.Contains(a4, 'skinName=')
    ) {
      L();
      return;
    } else {
      if (MadCap.String.StartsWith(aZ, aE)) {
        aT(aZ.substring(aE.length), null);
        return;
      } else {
        if (MadCap.String.StartsWith(a4, 'communitysearch-')) {
          var a0 = a4.substring('communitysearch-'.length);
          U(a0);
          p(a0, null, 1, false, true, -1, 0);
          return;
        } else {
          if (MadCap.String.StartsWith(a4, 'pulse-')) {
            var aY = a4.substring('pulse-'.length);
            z(aY);
            return;
          }
        }
      }
    }
    at(a4);
  }
  function at(a0) {
    var a2 = new MadCap.Utilities.Url(a0);
    if (aF) {
      if (a2.IsAbsolute) {
        if (aF.PreventExternalUrls) {
          a0 = aF.DefaultStartTopic;
        } else {
          var a1 = a2.Query.indexOf('?');
          var aZ = a2.Query.lastIndexOf('?');
          var aY = '';
          if (a1 != aZ) {
            aY = a2.Query.substr(a1, aZ);
          }
          if (a2.FullPath.indexOf('http://') != 0) {
            a0 =
              aF.ContentFolder +
              a2.ToNoQuery().FullPath +
              (MadCap.String.IsNullOrEmpty(aY) ? '' : aY);
          } else {
            a0 =
              a2.ToNoQuery().FullPath +
              (MadCap.String.IsNullOrEmpty(aY) ? '' : aY);
          }
        }
      } else {
        if (a2.QueryMap.GetItem('tocpath')) {
          a0 = aF.ContentFolder + a2.FullPath;
        } else {
          a0 = aF.ContentFolder + a2.ToNoQuery().FullPath;
        }
      }
    }
    O(a0);
  }
  function O(a3) {
    if (!a) {
      return;
    }
    var aZ = new MadCap.Utilities.Url(
      decodeURIComponent(document.location.href)
    );
    if (!T) {
      var aY = new MadCap.Utilities.Url(aZ.PlainPath);
      if (!aY.IsFolder) {
        aY = aY.ToFolder();
      }
      var a1 = aY.CombinePath(a3);
      MadCap.Utilities.Url.Navigate(a1.FullPath);
    } else {
      $(document.documentElement).addClass('has-topic');
      ay('topic');
      try {
        frames.topic.location.replace(a3);
      } catch (a2) {
        document.getElementById('topic').src = a3;
      }
      var a0 = aF.GetTocData(aZ);
      aF.SetBrowseSequencePath(a0.BrowseSequencesPath, a0.Href);
      if (aF.SyncTOC) {
        MadCap.Utilities.CrossFrame.PostMessageRequest(
          parent,
          'sync-toc',
          [
            a0.TocType,
            a0.TocType == 'Toc' ? a0.TocPath : a0.BrowseSequencesPath,
            a0.Href.FullPath,
          ],
          null
        );
      }
    }
  }
  function z(aY) {
    $(document.documentElement).removeClass('has-topic');
    ay('pulse');
    var aZ = aY.substring(aY.indexOf('#'));
    MadCap.Utilities.CrossFrame.PostMessageRequest(
      frames['community-frame-html5'],
      'pulse-hash-changed',
      [aZ]
    );
    aq.Init(function () {
      if (aq.PulseActive && aa()) {
        aa().location.replace(aq.PulseServer + aZ);
      }
    });
  }
  function ae(aY) {
    var aZ = 'pulse-' + aY;
    if (aF.PulsePage != null) {
      MadCap.Utilities.Url.Navigate(aF.PulsePage + '#' + aZ);
    } else {
      MadCap.Utilities.Url.NavigateHash(aZ);
    }
  }
  function aO() {
    w();
    ap();
  }
  function w() {
    var aY = MadCap.Utilities.Url.GetDocumentUrl();
    var aZ = aY.QueryMap.GetItem('q');
    if (aZ) {
      aT(aY.Query, null);
    }
  }
  function ap() {
    var aZ = MadCap.Utilities.Url.GetDocumentUrl();
    var aY = aZ.QueryMap.GetItem('skinName');
    aV(aY);
  }
  function d() {
    var aY = new MadCap.Utilities.Url(document.location.href);
    var aZ = new MadCap.Utilities.Dictionary(true);
    $.each([aY.QueryMap, aY.HashMap], function (a0, a1) {
      a1.ForEach(function (a2, a3) {
        aZ.Add(a2, a3);
      });
    });
    return aZ;
  }
  function L() {
    var a2 = d();
    var a1 = a2.GetItem('searchQuery'.toLowerCase());
    var aY = a2.GetItem('skinName'.toLowerCase());
    if (a1 != null) {
      U(decodeURIComponent(a1));
      var a0 = MadCap.String.ToBool(
        a2.GetItem('firstPick'.toLowerCase()),
        false
      );
      if (a0) {
        n.Search(a1, { searchContent: true }).then(function (a4) {
          var a5 = a4.content;
          if (a5.length >= 1) {
            at(a5[0].Link.replace(/^(Content)/, ''));
          }
        });
      } else {
        aT(a1, aY);
      }
    } else {
      var a3 = a2.GetItem('cshid');
      if (a3 != null) {
        aF.LookupCSHID(a3, function (a9) {
          var a8 = d();
          var ba = a8.GetItem('cshid');
          var a4 = a8.GetItem('skinName'.toLowerCase());
          if (a9.Found) {
            var bb = a9.Topic;
            var a5 = new MadCap.Utilities.Url(bb);
            var a6 = MadCap.Utilities.Url.GetDocumentUrl();
            var a7 = '?cshid=' + ba;
            a7 += a4 ? '&skinName=' + a4 : '';
            bb = new MadCap.Utilities.Url(a5.PlainPath + a7 + a5.Fragment)
              .FullPath;
            O(bb);
          } else {
            O(aF.DefaultStartTopic);
          }
          aV(a4 || a9.Skin);
        });
        return;
      } else {
        var aZ = MadCap.Utilities.Url.GetDocumentUrl();
        O(aF.DefaultStartTopic + aZ.Fragment);
      }
    }
    aV(aY);
  }
  function aB() {
    var aY = MadCap.Utilities.Url.CurrentHash();
    if (aY.indexOf('#pulse-') != 0) {
      return '';
    }
    return aY.substring('#pulse-'.length);
  }
  function aV(aY) {
    var aZ = null;
    if (aY != null) {
      var aZ = aF.GetSkin(aY);
      if (!aZ) {
        aZ = aF.GetSkinByName(aY);
      }
    }
    if (!aZ) {
      aZ = aF.DefaultSkin;
    }
    MadCap.Default.ApplySkin(aZ);
  }
  MadCap.Default.ApplySkin = function (ba) {
    if (ba == null) {
      return;
    }
    ag(ba);
    if (!MadCap.String.IsNullOrEmpty(ba.Tabs)) {
      if (
        ba.WebHelpOptions != null &&
        ba.WebHelpOptions.HideNavigationOnStartup != null &&
        MadCap.String.ToBool(ba.WebHelpOptions.HideNavigationOnStartup, false)
      ) {
        q('hide');
      }
      if (ba.HideNavOnStartup != null) {
        if (MadCap.String.ToBool(ba.HideNavOnStartup, false)) {
          q('hide');
          $('#contentBody').attr('data-mc-last-width', '');
          $('#navigation').attr('data-mc-last-width', '');
          $('#navigationResizeBar').attr('data-mc-last-width', '');
        } else {
          q('show');
        }
      }
      if (g(ba) == 'Right' && !m) {
        $(document.documentElement)
          .removeClass('left-layout')
          .addClass('right-layout');
      }
      if (ba.NavigationPaneWidth != null) {
        var a8 = MadCap.String.ToInt(ba.NavigationPaneWidth, 300);
        e(a8);
      }
      var a5 = ba.Tabs.split(',');
      var a3 = ['Toc', 'Index', 'Glossary', 'BrowseSequences', 'Community'];
      var a1 = $('.tabs');
      for (var a2 = 0, aZ = a3.length; a2 < aZ; a2++) {
        var a0 = a3[a2];
        var a7 = $('#' + a0 + 'Tab');
        if (a7.length == 0) {
          continue;
        }
        if (a0 == 'Toc') {
          a0 = 'TOC';
        }
        if ($.inArray(a0, a5) >= 0) {
          a7.css('display', '');
          continue;
        }
        a7.css('display', 'none');
        var aY = a1.children('.tabs-nav').children('li').index(a7);
        var a6 = a1.children('.tabs-panels').children(':eq(' + aY + ')');
        a7.remove();
        a6.remove();
      }
      var a4 = ba.DefaultTab;
      if (a4 == 'TOC') {
        a4 = 'Toc';
      }
      R(a4, a1);
      ah(a4);
    }
    if (ba.Toolbar != null && MadCap.String.IsNullOrEmpty(ba.Toolbar.Buttons)) {
      $('.buttons').remove();
    }
    if (!MadCap.String.IsNullOrEmpty(ba.Version) && parseInt(ba.Version) >= 2) {
      if (aF != null) {
        $.each(aF.GetSkins(), function (bc, bd) {
          $('html').removeClass(bd.SkinClass);
        });
      }
      $('html').addClass(ba.SkinClass);
      if (ba.LogoUrl) {
        var a9 = new MadCap.Utilities.Url(ba.LogoUrl);
        if (!a9.IsAbsolute & !aG) {
          var bb = aF.GetPatchedPath(a9.FullPath);
          a9 = aF.GetTopicPath('../' + aF.ContentFolder + bb);
        }
        $('a.logo').attr('href', a9.FullPath);
      }
      j(ba);
      if (m) {
        h(ba);
        r(ba);
      }
      av();
    }
  };
  function g(aY) {
    if (aY.WebHelpOptions != null) {
      return aY.WebHelpOptions.NavigationPanePosition;
    }
    return 'Left';
  }
  function h(a2) {
    if (a2) {
      var a1 = a2.WebHelpOptions.OffCanvasMenuStyle;
      var a0 = $('.off-canvas-list');
      if (a1 == 'Accordion' && a0.attr('data-drilldown')) {
        a0.removeClass('off-canvas-drilldown');
        var aZ = $('html').attr('dir') == 'rtl';
        if (aZ) {
          a0.addClass('off-canvas-accordion-rtl');
        } else {
          a0.addClass('off-canvas-accordion');
        }
        a0.attr('data-mc-expand-event', 'click.zf.accordionMenu');
        a0.attr('data-mc-include-back', 'False');
        a0.attr(
          'data-mc-css-sub-menu',
          'vertical menu is-accordion-submenu nested'
        );
        a0.attr(
          'data-mc-css-tree-node-collapsed',
          'is-accordion-submenu-parent'
        );
        a0.attr(
          'data-mc-css-tree-node-expanded',
          'is-accordion-submenu-parent'
        );
        a0.removeAttr('data-drilldown');
        a0.attr('data-accordion-menu', '');
        a0.foundation('destroy');
        new Foundation.AccordionMenu(a0);
        a0.find('.is-accordion-submenu').addClass('nested');
      } else {
        if ((a1 == 'Drilldown' || !a1) && a0.attr('data-accordion-menu')) {
          a0.removeClass('off-canvas-accordion').removeClass(
            'off-canvas-accordion-rtl'
          );
          a0.addClass('off-canvas-drilldown');
          var aY = g(a2);
          var a3 = aY ? aY.toLowerCase() : 'right';
          a0.find('.is-accordion-submenu').removeClass('nested');
          a0.attr('data-mc-expand-event', 'click.zf.drilldown');
          a0.attr('data-mc-include-back', 'True');
          a0.attr(
            'data-mc-css-sub-menu',
            'vertical menu is-drilldown-submenu slide-in-' + a3
          );
          a0.attr(
            'data-mc-css-tree-node-collapsed',
            'is-drilldown-submenu-parent'
          );
          a0.attr(
            'data-mc-css-tree-node-expanded',
            'is-drilldown-submenu-parent'
          );
          a0.removeAttr('data-accordion-menu');
          a0.attr('data-drilldown', '');
          a0.foundation('destroy');
          new Foundation.Drilldown(a0);
        }
      }
    }
  }
  function j(a2) {
    var aY = g(a2);
    if (T) {
      if (aY == 'Right') {
        $('html').removeClass('left-layout').addClass('right-layout');
      } else {
        $('html').removeClass('right-layout').addClass('left-layout');
      }
    } else {
      var a1 = $('.off-canvas');
      if (
        (aY == 'Right' && a1.attr('class') == 'off-canvas position-left') ||
        (aY == 'Left' && a1.attr('class') == 'off-canvas position-right')
      ) {
        var aZ = aY == 'Right' ? 'left' : 'right';
        var a0 = aY.toLowerCase();
        var a3 = a2.WebHelpOptions.OffCanvasMenuStyle || 'Drilldown';
        a1.removeClass('position-' + aZ).addClass('position-' + a0);
        a1.attr('data-position', a0);
        if (a3 == 'Drilldown') {
          $('.off-canvas-list').attr(
            'data-mc-css-sub-menu',
            'vertical menu is-drilldown-submenu slide-in-' + a0
          );
        }
        a1.foundation('destroy');
        new Foundation.OffCanvas(a1, { position: a0 });
        ai();
      }
    }
  }
  function r(a1) {
    if (T || !a1.WebHelpOptions.EnableSticky) {
      return;
    }
    var a3 = $('.title-bar');
    if (a1.WebHelpOptions.EnableSticky != 'None' && !a3.hasClass('sticky')) {
      a3.addClass('sticky');
      a3.attr('data-sticky', '');
      a3.css('width', '100%');
      var a0 = 'small';
      if (aF != null) {
        var aY = m ? 1024 : aF.Breakpoints.mediums.Tablet;
        var a2 = m ? 760 : aF.Breakpoints.mediums.Mobile;
        if (a1.WebHelpOptions.EnableSticky == 'Web') {
          a0 = 'only screen and (min-width: ' + (aY + 1) + 'px)';
        } else {
          if (a1.WebHelpOptions.EnableSticky == 'TabletANDMobile') {
            a0 = 'only screen and (max-width: ' + aY + 'px)';
          } else {
            if (a1.WebHelpOptions.EnableSticky == 'Mobile') {
              a0 = 'only screen and (max-width: ' + a2 + 'px)';
            }
          }
        }
      }
      a3.parent().attr('data-sticky-container', '');
      var aZ = new Foundation.Sticky(a3, { marginTop: 0, stickyOn: a0 });
      Foundation.IHearYou();
      return;
    } else {
      if (a3.hasClass('sticky')) {
        a3.foundation('destroy');
        a3.removeClass('sticky');
        a3.removeAttr('data-sticky');
        a3.removeAttr('data-sticky-on');
        a3.css('width', '');
        a3.parent().removeAttr('data-sticky-container');
      }
    }
    if (a1.WebHelpOptions.EnableSticky != 'None') {
      r(a1);
    }
  }
  function av() {
    var aY = $('.title-bar');
    if (aY.hasClass('is-stuck')) {
      M();
    }
    aY.on('sticky.zf.stuckto:top', M).on('sticky.zf.unstuckfrom:top', M);
    if (aY.hasClass('sticky')) {
      aY.foundation('_calc', true);
    }
  }
  function M() {
    var a1 = $('ul[data-magellan]');
    var a3 = $('.title-bar');
    if (a1.length) {
      a1.foundation('destroy');
      var a2 = -10;
      if (a3.hasClass('is-stuck')) {
        var aY = parseInt(a3.css('height'));
        new Foundation.Magellan(a1, { barOffset: aY + a2 });
      } else {
        new Foundation.Magellan(a1, { barOffset: a2 });
      }
      a1.foundation('calcPoints');
    }
    var a0 = $('div.is-open').length > 0;
    var aZ = $('div.sticky-menu');
    aZ.each(function (a5, a4) {
      if (!a0) {
        $(a4).foundation('destroy');
        var a6 = 1;
        if (a3.hasClass('is-stuck')) {
          a6 += a3.outerHeight() / 16;
        }
        new Foundation.Sticky($(a4), { marginTop: a6 });
        Foundation.IHearYou();
      }
    });
  }
  function ai() {
    $('aside#offCanvas').on(
      'opened.zf.offcanvas closed.zf.offcanvas',
      function (aZ) {
        var a0 = $('.title-bar.sticky');
        var aY = $('div.sticky-menu');
        if (aZ.type == 'closed') {
          setTimeout(function () {
            M();
          }, 500);
        }
      }
    );
  }
  function ay(aY) {
    $('#topic').css('display', aY == 'topic' ? 'block' : 'none');
    $('#topicContent').css('display', aY == 'topic' ? 'block' : 'none');
    $('#pulse').css('display', aY == 'pulse' ? 'block' : 'none');
    $('#searchPane').css('display', aY == 'search' ? 'block' : 'none');
  }
  function aa() {
    if (frames.pulse) {
      return frames.pulse;
    } else {
      if (frames['pulse-full']) {
        return frames['pulse-full'];
      } else {
        return null;
      }
    }
  }
  var v = null;
  function y(a4) {
    var aY = $(this).attr('id');
    var a0 = aY.substring(0, aY.length - 'Tab'.length);
    v = a0;
    R(a0, $(this).closest('.tabs'));
    if (aF.IsTabletLayout() && aF.IsResponsive) {
      var a2 = $(document).find('.tab');
      for (var a1 = 0; a1 < a2.length; a1++) {
        var a3 = $(a2[a1]);
        if (!a3.hasClass('active')) {
          a3.hide();
        } else {
          a3.show();
        }
      }
      var aZ = $('#search-sidebar');
      var a5 = a0.toLowerCase();
      aZ.removeClass('index').removeClass('glossary');
      if (a5 == 'index' || a5 == 'glossary') {
        aZ.addClass(a5);
      }
    }
    ah(a0);
  }
  function R(a0, a3) {
    var aZ = $('.tabs-nav-active', a3);
    var a1 = $('#' + a0 + 'Tab');
    var a2 = aZ.closest('.tab');
    var aY = a1.closest('.tab');
    aZ.removeClass('tabs-nav-active');
    $('.tabs-nav li').addClass('tabs-nav-inactive');
    if (a2 != null) {
      a2.removeClass('active');
    }
    a1.removeClass('tabs-nav-inactive');
    a1.addClass('tabs-nav-active');
    if (aY != null) {
      aY.addClass('active');
    }
    if (aF.IsResponsive && a0 != 'Search') {
      o = $('.tab.active');
    } else {
      o = null;
    }
  }
  function D() {
    var aY = aF.DefaultSkin.DefaultTab;
    if (aY == 'TOC') {
      ah('Toc');
    } else {
      ah(aY);
    }
  }
  function ah(aY) {
    var aZ = null;
    if (aY == 'Toc') {
      aZ = aW();
    } else {
      if (aY == 'Index') {
        aZ = am();
      } else {
        if (aY == 'Glossary') {
          aZ = Q();
        } else {
          if (aY == 'BrowseSequences') {
            aZ = i();
          } else {
            if (aY == 'Community') {
              aZ = aU();
            }
          }
        }
      }
    }
    if (aZ || (aZ && aF.IsResponsive && !aF.IsTabletLayout())) {
      R(aY, aZ);
    }
  }
  function aW() {
    if (af != null) {
      return;
    }
    var aZ = $('#toc');
    if (!aZ.length) {
      return;
    }
    aZ.addClass('loading');
    var aY = $('<ul class="tree" />');
    aZ.append(aY);
    af = new MadCap.WebHelp.TocPane('Toc', aF, aY[0], true);
    af.Init(function () {
      aZ.removeClass('loading');
    });
    return aZ.parent();
  }
  function am() {
    if (az != null) {
      return;
    }
    var aY = $('#index');
    aY.addClass('loading');
    az = new MadCap.WebHelp.IndexPane(aF);
    az.Init($('#index .index-wrapper')[0], function () {
      aY.removeClass('loading');
    });
    return aY.parent();
  }
  function Q() {
    if (Y != null) {
      return;
    }
    var aY = $('#glossary');
    aY.addClass('loading');
    Y = new MadCap.WebHelp.GlossaryPane(aF);
    Y.Init(aY[0], function () {
      aY.removeClass('loading');
    });
    return aY.parent();
  }
  function i() {
    if (aR != null) {
      return;
    }
    var aZ = $('#browseSequences');
    if (!aZ.length) {
      return;
    }
    aZ.addClass('loading');
    var aY = $('<ul class="tree" />');
    aZ.append(aY);
    aR = new MadCap.WebHelp.TocPane('BrowseSequences', aF, aY[0], true);
    aR.Init(function () {
      aZ.removeClass('loading');
    });
    return aZ.parent();
  }
  function aU() {
    if (S) {
      return;
    }
    S = true;
    var aY = $('#community-frame-html5');
    aq.Init(function () {
      if (aq.PulseActive) {
        aY.attr('src', aq.PulseServer + 'streams/my');
      }
    });
    return aY.parent();
  }
  function ag(bb) {
    if (!bb) {
      return;
    }
    var bc = MadCap.String.ToBool(bb.UseBrowserDefaultSize, true);
    if (bc) {
      return;
    }
    var a1 = MadCap.String.ToInt(bb.Top, 0);
    var a9 = MadCap.String.ToInt(bb.Left, 0);
    var ba = MadCap.String.ToInt(bb.Bottom, 0);
    var aZ = MadCap.String.ToInt(bb.Right, 0);
    var a2 = MadCap.String.ToInt(bb.Width, 800);
    var a3 = MadCap.String.ToInt(bb.Height, 600);
    var aY = bb.Anchors;
    if (aY) {
      var a5 = aY.indexOf('Top') > -1 ? true : false;
      var a0 = aY.indexOf('Left') > -1 ? true : false;
      var a8 = aY.indexOf('Bottom') > -1 ? true : false;
      var a4 = aY.indexOf('Right') > -1 ? true : false;
      var a6 = aY.indexOf('Width') > -1 ? true : false;
      var a7 = aY.indexOf('Height') > -1 ? true : false;
    }
    if (a0 && a4) {
      a2 = screen.availWidth - (a9 + aZ);
    } else {
      if (!a0 && a4) {
        a9 = screen.availWidth - (a2 + aZ);
      } else {
        if (a6) {
          a9 = screen.availWidth / 2 - a2 / 2;
        }
      }
    }
    if (a5 && a8) {
      a3 = screen.availHeight - (a1 + ba);
    } else {
      if (!a5 && a8) {
        a1 = screen.availHeight - (a3 + ba);
      } else {
        if (a7) {
          a1 = screen.availHeight / 2 - a3 / 2;
        }
      }
    }
    if (window == top) {
      window.resizeTo(a2, a3);
      window.moveTo(a9, a1);
    }
  }
  function aM() {
    var aY = aF.GetCurrentSkin();
    if (aY && aY.CommentsInTopic == 'false') {
      if (T) {
        MadCap.Utilities.CrossFrame.PostMessageRequest(
          frames.topic,
          'hide-comments'
        );
      } else {
        $('.feedback-comments-wrapper').addClass('hidden');
      }
    } else {
      if (T) {
        MadCap.Utilities.CrossFrame.PostMessageRequest(
          frames.topic,
          'show-comments'
        );
      } else {
        $('.feedback-comments-wrapper').removeClass('hidden');
      }
    }
  }
  function aK() {
    if (aq == null) {
      return;
    }
    $('.star-buttons').addClass('loading');
    function aY() {
      aq.GetAverageRating(aX, function (a0, aZ) {
        $('.star-buttons').removeClass('loading');
        aA(a0);
      });
    }
    if (aX == null) {
      ar(function (aZ) {
        aX = aZ;
        aA(0);
        aY();
      });
    } else {
      aY();
    }
  }
  function aA(a2) {
    var aY = $('.star-buttons');
    var a5 = $('.star-button', aY);
    var a4 = a5.length;
    var a3 = Math.ceil((a2 * a4) / 100);
    a5.css('opacity', 0);
    for (var a0 = 0; a0 < a4; a0++) {
      var a1 = a5[a0];
      var aZ = $(a1);
      window.setTimeout(
        (function (a7, a6) {
          return function () {
            if (a7 <= a3 - 1) {
              MadCap.Utilities.SetButtonState(a6[0], 2);
            } else {
              MadCap.Utilities.SetButtonState(a6[0], 1);
            }
            a6.animate({ opacity: 1 });
          };
        })(a0, aZ),
        a0 * 50
      );
    }
  }
  function ab(a1) {
    var aY = $(a1.target);
    if (a1.target.tagName == 'IMG') {
      aY = aY.closest('.star-button');
    }
    if (aY.hasClass('star-button')) {
      var a0 = $('.star-button', this).length;
      var aZ = ((aY.index() + 1) * 100) / a0;
      aq.SubmitRating(aX, aZ, null, function () {
        aK();
      });
    }
  }
  function C(aY) {
    ax(aY, function (aZ) {
      if (aZ) {
        if (T) {
          document.location.hash = aZ;
        } else {
          var a5 = new MadCap.Utilities.Url(document.location.href);
          var a1 = aF.GetCurrentSkin();
          var a4 = new MadCap.Utilities.Url(aZ);
          var a2 = a4.QueryMap.GetLength() > 0 ? '&' : '?';
          var a0 = aF.DefaultSkin != a1 ? a2 + 'skinName=' + a1.SkinID : '';
          var a3 = a5.ToFolder().CombinePath(aZ);
          document.location.href = a3.PlainPath + a3.Query + a0 + a3.Fragment;
        }
      }
    });
  }
  function ak() {
    C('previous');
  }
  function F() {
    C('next');
  }
  function ax(aZ, aY) {
    var a0 = T ? frames.topic : window;
    MadCap.Utilities.CrossFrame.PostMessageRequest(
      a0,
      'get-topic-url',
      null,
      function (a4) {
        var a2 = new MadCap.Utilities.Url(a4[0]);
        var ba = T
          ? new MadCap.Utilities.Url(decodeURIComponent(document.location.href))
          : new MadCap.Utilities.Url(document.location.href);
        var a3 = T || aF.TopNavTocPath;
        var a6 =
          T &&
          !(
            ba.QueryMap.GetItem('TocPath') ||
            ba.QueryMap.GetItem('BrowseSequencesPath')
          ) &&
          !MadCap.String.IsNullOrEmpty(ba.Fragment)
            ? new MadCap.Utilities.Url(ba.Fragment)
            : ba;
        var a9 = a6.QueryMap.GetItem('TocPath');
        var a5 = a6.QueryMap.GetItem('BrowseSequencesPath');
        ba = ba.ToPlainPath();
        if (!ba.IsFolder) {
          ba = ba.ToFolder();
        }
        if (T) {
          var a8 = a2.Query;
          var a7 = decodeURIComponent(a2.PlainPath);
          a2 = new MadCap.Utilities.Url(a7 + a8);
        }
        var a1 = ba.CombinePath(aF.GetMasterHelpsystem().GetContentPath());
        a2 = a2.ToRelative(a1);
        if (a5 != null) {
          aF.AdvanceTopic('BrowseSequences', aZ, a5, a3, a2, aY);
        } else {
          aF.AdvanceTopic('Toc', aZ, a9, a3, a2, aY);
        }
      }
    );
  }
  function H() {
    MadCap.Utilities.CrossFrame.PostMessageRequest(
      frames.topic,
      'get-bs-path',
      null,
      function (a5) {
        function a2(a6) {
          var a7 = $('.current-topic-index-button');
          if (a6 == -1) {
            a7.addClass('disabled');
            return;
          }
          a7.removeClass('disabled');
          $('.sequence-index').text(a6);
          aZ.GetIndexTotalForEntry(a1, aY, function (a8) {
            $('.sequence-total').text(a8);
          });
        }
        var a1 = a5[0];
        var aY = new MadCap.Utilities.Url(decodeURIComponenet(a5[1]));
        var a4 = new MadCap.Utilities.Url(
          decodeURIComponent(document.location.href)
        );
        a4 = new MadCap.Utilities.Url(a4.PlainPath);
        var a0 = MadCap.String.EndsWith(a4.FullPath, '/') ? a4 : a4.ToFolder();
        aY = aY.ToRelative(a0);
        if (a1 != null) {
          var a3 = aF.GetFullTocPath('browsesequences', aY.FullPath);
          if (a3) {
            a1 = a1 ? a3 + '|' + a1 : a3;
          }
        }
        if (
          MadCap.String.IsNullOrEmpty(a1) ||
          MadCap.String.StartsWith(a1, '_____')
        ) {
          a2(-1);
          return;
        }
        var aZ = aF.GetBrowseSequenceFile();
        aZ.GetEntrySequenceIndex(a1, aY, a2);
      }
    );
  }
  function X() {
    ad = aq.GetUserGuid();
    var aY = $('.login-button');
    if (aY.length == 0) {
      aY = $('.edit-user-profile-button');
    }
    MadCap.Utilities.SetButtonState(aY[0], ad == null ? 1 : 2);
  }
  function aI() {
    if (W != null) {
      W.Hide(true);
    }
  }
  function aC(a5) {
    var a7 = $('#topicContent');
    if (a7.length == 0) {
      var a2 = $('#topic').parent();
      a2.append("<div id='topicContent'></div>");
      a7 = $('#topicContent');
    } else {
      a7.empty();
    }
    a7.append(a5[2]);
    var a6 = $(a5[1]);
    var a3 = [],
      a8 = [],
      bc = [];
    var be = new MadCap.Utilities.Url(a5[0]);
    var a9 = new MadCap.Utilities.Url(document.location.href);
    var aZ = a9.ToFolder().ToRelative(be);
    $.each(a6, function (bg, bh) {
      if (!MadCap.String.IsNullOrEmpty(bh.localName)) {
        var bf = bh.localName.toLowerCase();
        if (bf == 'script') {
          var bi = new MadCap.Utilities.Url($(bh).attr('src'));
          if (!bi.IsAbsolute) {
            bi = bi.ToRelative(aZ);
          }
          a3.push(bi.FullPath);
        } else {
          if (bf == 'link') {
            bc.push(bh);
          }
        }
      }
    });
    var a1 = be.ToFolder().ToRelative(a9.PlainPath);
    al(bc, a1, 'href');
    $.each(bc, function (bg, bh) {
      if ($(bh).attr('mc-topic-css')) {
        var bf = $(bh).attr('href');
        bf = bf.replace('.css', '-topic.css');
        a8.push(bf);
      } else {
        a8.push($(bh).attr('href'));
      }
    });
    MadCap.Utilities.LoadStyleSheets(a8, $('link[href*="Styles.css"]')[0]);
    MadCap.Utilities.LoadScripts(
      a3,
      function () {},
      function () {},
      a7
    );
    var ba = new MadCap.Utilities.Url(document.location.href);
    aZ = be.ToFolder().ToRelative(ba.PlainPath);
    var aY = a7.find('a[href][href!="javascript:void(0);"]');
    aY = aY
      .not('[class*="MCPopupThumbnailLink"]')
      .not('[class*="MCTopicPopup"]');
    var a4 = a7.find('[class*="MCTopicPopup"]');
    var bb = a7.find('a[class="MCPopupThumbnailLink"]');
    var bd = a7.find('img[src]');
    var a0 = a7.find('area[href]');
    al(aY, aZ, 'href', '#');
    al(a4, aZ, 'href');
    al(bd, aZ, 'src');
    al(bb, aZ, 'href');
    al(a0, aZ, 'href', '#');
    $('.MCWebHelpFramesetLink', a7).hide();
  }
  function al(aY, aZ, a0, a1) {
    $.each(aY, function (a4, a5) {
      var a3 = $(a5);
      var a2 = new MadCap.Utilities.Url(a3.attr(a0));
      if (!a2.IsAbsolute) {
        var a6 = MadCap.Utilities.FixLink(a2, aZ, a1, aF.ContentFolder);
        a3.attr(a0, a6);
      }
    });
  }
  MadCap.Utilities.CrossFrame.AddMessageHandler(function (a7, a4, bk, bl, aY) {
    var bf = { Handled: false, FireResponse: true };
    if (a7 == 'get-href') {
      bk[bk.length] = document.location.href;
      bf.Handled = true;
      bf.FireResponse = true;
    }
    if (a7 == 'get-return-url') {
      var a3 = new MadCap.Utilities.Url(document.location.href);
      var bj = null;
      if (a3.Fragment.length > 1) {
        var bi = new MadCap.Utilities.Url(a3.Fragment.substring(1));
        bj = a3.QueryMap.GetItem('returnUrl');
      }
      bk[bk.length] = bj;
      bf.Handled = true;
      bf.FireResponse = true;
    } else {
      if (a7 == 'navigate') {
        var be = a4[0];
        if (be) {
          MadCap.Utilities.Url.NavigateHash(be);
        }
        bf.Handled = true;
        bf.FireResponse = true;
      } else {
        if (a7 == 'navigate-topic') {
          var be = a4[0];
          if (!T) {
            var bb = aF.GetAbsoluteTopicPath('../' + aF.ContentFolder + be);
            MadCap.Utilities.Url.Navigate(bb.FullPath);
          }
          var bi = new MadCap.Utilities.Url(be);
          if (bi.IsAbsolute) {
            var a2 = new MadCap.Utilities.Url(document.location.href);
            a2 = new MadCap.Utilities.Url(a2.PlainPath);
            var bd = MadCap.String.EndsWith(a2.FullPath, '/')
              ? a2
              : a2.ToFolder();
            var a8 = bd.CombinePath(aF.ContentFolder);
            bi = bi.ToRelative(a8);
          }
          if (bi.FullPath) {
            var a9 = MadCap.Utilities.Url.StripInvalidCharacters(bi.FullPath);
            var bc = MadCap.Utilities.Url.CurrentHash();
            if (bc.substring(1) == a9) {
              document.location.hash = null;
            }
            document.location.hash = a9;
          }
          bf.Handled = true;
        } else {
          if (a7 == 'navigate-home') {
            var bn = T
              ? new MadCap.Utilities.Url(document.location.href)
              : aF.GetAbsoluteTopicPath('../' + aF.DefaultStartTopic);
            MadCap.Utilities.Url.Navigate(bn.PlainPath);
            bf.Handled = true;
          } else {
            if (a7 == 'navigate-pulse') {
              var be = a4[0];
              var aZ = MadCap.Utilities.Url.CurrentHash();
              if (aZ.length > 1 && be) {
                var bh = be.toLowerCase();
                if (
                  bh === 'feedback/account/register' ||
                  be.toLowerCase() === 'forgotpassword'
                ) {
                  var a3 = new MadCap.Utilities.Url(aZ.substring(1));
                  var bj = a3.QueryMap.GetItem('returnUrl');
                  if (bj != null) {
                    bj = escape(bj);
                  } else {
                    bj = aZ.substring(1);
                  }
                  be += '?returnUrl=' + bj;
                }
              }
              if (be) {
                ae(be);
              }
              bf.Handled = true;
            } else {
              if (a7 == 'navigate-previous') {
                ak();
                bf.Handled = true;
              } else {
                if (a7 == 'navigate-next') {
                  F();
                  bf.Handled = true;
                } else {
                  if (a7 == 'login-user' || a7 == 'login-pulse') {
                    if (ad == null) {
                      var ba = a7 == 'login-pulse' ? 'pulse' : 'new';
                      W = new MadCap.Feedback.LoginDialog(aq, ba);
                      if (ba == 'new') {
                        $(W).bind('closed', function () {
                          X();
                          bk[bk.length] = ad;
                          MadCap.Utilities.CrossFrame._PostMessageResponse(
                            bl,
                            a7,
                            bk.length > 0 ? bk : null,
                            aY
                          );
                        });
                      }
                      W.Show();
                      bf.Handled = true;
                      bf.FireResponse = false;
                    } else {
                      bk[bk.length] = ad;
                      bf.Handled = true;
                      bf.FireResponse = true;
                    }
                  } else {
                    if (a7 == 'get-csh-id') {
                      bk[bk.length] = d().GetItem('cshid');
                      bf.Handled = true;
                      bf.FireResponse = true;
                    } else {
                      if (a7 == 'get-user-guid') {
                        bk[bk.length] = ad;
                        bf.Handled = true;
                        bf.FireResponse = true;
                      } else {
                        if (a7 == 'get-topic-path-by-stream-id') {
                          var a5 = a4[0];
                          aq.GetTopicPathByStreamID(
                            a5,
                            function (bo) {
                              bk[bk.length] = bo;
                              MadCap.Utilities.CrossFrame._PostMessageResponse(
                                bl,
                                a7,
                                bk.length > 0 ? bk : null,
                                aY
                              );
                            },
                            null,
                            null
                          );
                          bf.Handled = true;
                          bf.FireResponse = false;
                        } else {
                          if (a7 == 'get-topic-path-by-page-id') {
                            var a1 = a4[0];
                            aq.GetTopicPathByPageID(
                              a1,
                              function (bo) {
                                bk[bk.length] = bo;
                                MadCap.Utilities.CrossFrame._PostMessageResponse(
                                  bl,
                                  a7,
                                  bk.length > 0 ? bk : null,
                                  aY
                                );
                              },
                              null,
                              null
                            );
                            bf.Handled = true;
                            bf.FireResponse = false;
                          } else {
                            if (a7 == 'hash-changed') {
                              var a9 = a4[0];
                              a9 = a9.substring(1);
                              history.pushState(
                                null,
                                null,
                                document.location.pathname +
                                  document.location.hash +
                                  '$' +
                                  a9
                              );
                              bf.Handled = true;
                              bf.FireResponse = false;
                            } else {
                              if (a7 == 'forward-ajax-open-success') {
                                var bm = a4[0];
                                var bg = parseInt(a4[1]);
                                var a6 = a4[2];
                                ay('pulse');
                                MadCap.Utilities.CrossFrame.PostMessageRequest(
                                  aa(),
                                  'ajax-open-success',
                                  [bm, bg, a6]
                                );
                                bf.Handled = true;
                                bf.FireResponse = false;
                              } else {
                                if (a7 == 'get-pulse-hash') {
                                  var a0 = '';
                                  var aZ = MadCap.Utilities.Url.CurrentHash();
                                  if (aZ.indexOf('#pulse-') == 0) {
                                    a0 = aZ.substring('#pulse-'.length);
                                  }
                                  bk[bk.length] = a0;
                                  bf.Handled = true;
                                  bf.FireResponse = true;
                                } else {
                                  if (
                                    a7 == 'login-complete' ||
                                    a7 == 'logout-complete'
                                  ) {
                                    MadCap.Utilities.CrossFrame.PostMessageRequest(
                                      aa(),
                                      'reload'
                                    );
                                    MadCap.Utilities.CrossFrame.PostMessageRequest(
                                      frames['community-frame-html5'],
                                      'reload'
                                    );
                                    MadCap.Utilities.CrossFrame.PostMessageRequest(
                                      frames['topiccomments-html5'],
                                      'reload'
                                    );
                                    MadCap.Utilities.CrossFrame.PostMessageRequest(
                                      frames.topic,
                                      'reload-pulse'
                                    );
                                    aI();
                                    X();
                                    bf.Handled = true;
                                    bf.FireResponse = false;
                                  } else {
                                    if (a7 == 'close-login-dialog') {
                                      aI();
                                      bf.Handled = true;
                                      bf.FireResponse = false;
                                    } else {
                                      if (a7 == 'set-pulse-login-id') {
                                        if (aq != null) {
                                          aq.PulseUserGuid = a4[0];
                                        }
                                        X();
                                        bf.Handled = true;
                                        bf.FireResponse = false;
                                      } else {
                                        if (a7 == 'get-parent-window-width') {
                                          bk[bk.length] = window.innerWidth;
                                          bf.Handled = true;
                                          bf.FireResponse = true;
                                        } else {
                                          if (a7 == 'set-topic-content') {
                                            aC(a4);
                                            bf.Handled = true;
                                            bf.FireResponse = false;
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return bf;
  }, null);
  $(au);
  $(window).resize(aP);
  if (T || !m) {
    $(window).hashchange(B);
  }
  var af = null;
  var az = null;
  var n = null;
  var Y = null;
  var aR = null;
  var S = null;
  var aF = null;
  var aq = null;
  var aX = null;
  var ad = null;
  var W = null;
})();
/*
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 * Unlicensed use is strictly prohibited
 *
 * v13.2.6355.27565
 */
(function () {
  MadCap.WebHelp = MadCap.CreateNamespace('WebHelp');
  var b =
    window.external && window.external.attached && window.external.attached();
  var c = MadCap.Utilities.HasRuntimeFileType('TriPane');
  MadCap.WebHelp.TocPane = function (e, h, g, d) {
    var f = this;
    this._Init = false;
    this._RuntimeFileType = e;
    this._RootUl = g;
    this._CanSync = d;
    this._HelpSystem = h;
    this._TocFile =
      this._RuntimeFileType == 'Toc'
        ? this._HelpSystem.GetTocFile()
        : this._HelpSystem.GetBrowseSequenceFile();
    this._LoadedNodes = [];
    this._NodesWithChildrenLoaded = [];
    this._TocType = null;
    this._TocPath = null;
    this._TocHref = null;
    MadCap.Utilities.CrossFrame.AddMessageHandler(this.OnMessage, this);
    this._Initializing = false;
    this._InitOnCompleteFuncs = new Array();
    this.TreeNode_Expand = function (r) {
      var s = r.target;
      var w = f._IsOffCanvasMenu
        ? $('ul.menu[data-drilldown], ul.menu[data-accordion-menu]')
        : null;
      var x = $(s).closest('li')[0];
      if (x == null) {
        return;
      }
      var u = $(x);
      var n = u.hasClass(f._TreeNodeLeafClass);
      var m = f._LoadedNodes[u.attr('data-mc-id')];
      var v = f._HelpSystem.GetCurrentSkin();
      if (f._IsTopNavMenu && f._HelpSystem.NodeDepth(m) > f._MaxDepth) {
        return;
      }
      if (!n) {
        u.toggleClass(f._TreeNodeExpandedClass).toggleClass(
          f._TreeNodeCollapsedClass
        );
      }
      var j = u.find('> div img');
      var t = j.attr('data-mc-alt2');
      var q = j.attr('alt');
      if (t != '') {
        j.attr('alt', t);
        j.attr('data-mc-alt2', q);
      }
      if (f._IncludeIndicator) {
        var y = u.find('> div a');
        if (y[0] != null) {
          var i = y.attr('href');
          if (!MadCap.String.IsNullOrEmpty(i)) {
            f._SelectNode(x);
          }
          if (y[0] != s) {
            var p = y.attr('target');
            if (!MadCap.String.IsNullOrEmpty(i)) {
              if (p != null) {
                window.open(i, p);
              } else {
                document.location.href = i;
              }
            }
          }
        }
      }
      if (typeof m.n == 'undefined' || m.n.length == 0) {
        m.childrenLoaded = true;
        f._NodesWithChildrenLoaded.push(m);
      }
      if (f._NodesWithChildrenLoaded.indexOf(m) === -1) {
        var l = $('a', u).first();
        var o = $('<ul/>');
        var k = $(f._RootUl).attr('data-mc-css-sub-menu') || 'tree inner';
        o.addClass(k);
        if (b) {
          o.attr('data-mc-style', 'Navigation Panel Item');
        }
        if (
          f._IsOffCanvasMenu &&
          v.WebHelpOptions &&
          v.WebHelpOptions.OffCanvasMenuStyle == 'Accordion'
        ) {
          o.css('display', 'none');
        }
        f.LoadTocChildren(m, o, function () {
          u.append(o);
          if (f._DeferExpandEvent) {
            setTimeout(function () {
              if (
                v.WebHelpOptions &&
                v.WebHelpOptions.OffCanvasMenuStyle == 'Accordion'
              ) {
                Foundation.Nest.Feather(
                  u.children('.is-accordion-submenu'),
                  'accordion'
                );
                w.foundation('down', u.children('.is-accordion-submenu'));
              } else {
                Foundation.Nest.Feather(w, 'drilldown');
                w.foundation('_show', u);
              }
            }, 100);
          }
        });
        if (f._DeferExpandEvent) {
          r.stopImmediatePropagation();
          return false;
        }
      }
      if (n) {
        if (!c) {
          MadCap.Utilities.Url.OnNavigateTopic.call(s, r);
        }
      } else {
        if (f._IsOffCanvasMenu && v.WebHelpOptions) {
          if (
            v.WebHelpOptions.OffCanvasMenuStyle &&
            v.WebHelpOptions.OffCanvasMenuStyle == 'Accordion'
          ) {
            w.foundation('toggle', u.children('.is-accordion-submenu'));
          } else {
            w.foundation('_show', u);
          }
          return false;
        } else {
          return true;
        }
      }
    };
    this.TopNavigationMenuItem_MouseEnter = function (l) {
      var o = $(l.currentTarget).closest('li');
      var n = o.children('ul').first();
      if (n.length) {
        var k = n.width();
        var j = $('html').attr('dir') == 'rtl';
        var m = j
          ? o.offset().left
          : $(window).width() - o.offset().left - o.width();
        var i = j ? 'openRight' : 'openLeft';
        n.toggleClass(i, k > m);
      }
    };
  };
  var a = MadCap.WebHelp.TocPane;
  a.prototype.OnMessage = function (j, g, i) {
    var h = { Handled: false, FireResponse: true };
    if (j == 'sync-toc') {
      var d = g[0];
      var f = g[1];
      var e = new MadCap.Utilities.Url(g[2]);
      if (this._CanSync && (d == null || d == this._RuntimeFileType)) {
        this.SyncTOC(f, e);
        h.Handled = true;
      }
    }
    return h;
  };
  a.prototype.Init = function (d) {
    if (this._Init) {
      if (d != null) {
        d();
      }
      return;
    }
    if (d != null) {
      this._InitOnCompleteFuncs.push(d);
    }
    if (this._Initializing) {
      return;
    }
    this._Initializing = true;
    var f = $(this._RootUl);
    this._IsOffCanvasMenu = f.hasClass('off-canvas-list');
    this._IsTopNavMenu = MadCap.Dom.GetAttributeBool(
      this._RootUl,
      'data-mc-top-nav-menu',
      false
    );
    this._IsSideMenu = MadCap.Dom.GetAttributeBool(
      this._RootUl,
      'data-mc-side-menu',
      false
    );
    if (this._IsTopNavMenu) {
      this._TreeNodeHasChildrenClass =
        f.attr('data-mc-css-tree-node-has-children') || 'has-children';
    } else {
      this._TreeNodeClass = f.attr('data-mc-css-tree-node') || 'tree-node';
      this._TreeNodeCollapsedClass =
        f.attr('data-mc-css-tree-node-collapsed') || 'tree-node-collapsed';
      this._TreeNodeExpandedClass =
        f.attr('data-mc-css-tree-node-expanded') || 'tree-node-expanded';
      this._TreeNodeLeafClass =
        f.attr('data-mc-css-tree-node-leaf') || 'tree-node-leaf';
      this._TreeNodeSelectedClass =
        f.attr('data-mc-css-tree-node-leaf') || 'tree-node-selected';
    }
    this._SubMenuClass = f.attr('data-mc-css-sub-menu') || 'tree inner';
    this._IncludeBack = MadCap.Dom.GetAttributeBool(
      this._RootUl,
      'data-mc-include-back',
      false
    );
    this._IncludeParentLink = MadCap.Dom.GetAttributeBool(
      this._RootUl,
      'data-mc-include-parent-link',
      false
    );
    this._IncludeIcon = MadCap.Dom.GetAttributeBool(
      this._RootUl,
      'data-mc-include-icon',
      true
    );
    this._IncludeIndicator = MadCap.Dom.GetAttributeBool(
      this._RootUl,
      'data-mc-include-indicator',
      true
    );
    this._DeferExpandEvent = MadCap.Dom.GetAttributeBool(
      this._RootUl,
      'data-mc-defer-expand-event',
      false
    );
    this._ExpandEvent =
      f.attr('data-mc-expand-event') || (this._IsSideMenu ? null : 'click');
    this._BackLink = f.attr('data-mc-back-link') || 'Back';
    this._MaxDepth = parseInt(f.attr('data-mc-max-depth')) || 1;
    this._IncludeParent = MadCap.Dom.GetAttributeBool(
      this._RootUl,
      'data-mc-include-parent',
      false
    );
    this._IncludeSiblings = MadCap.Dom.GetAttributeBool(
      this._RootUl,
      'data-mc-include-siblings',
      false
    );
    this._IncludeChildren = MadCap.Dom.GetAttributeBool(
      this._RootUl,
      'data-mc-include-children',
      false
    );
    this._IsContextSensitive = MadCap.Dom.GetAttributeBool(
      this._RootUl,
      'data-mc-is-context-sensitive',
      false
    );
    this._LinkedToc = f.attr('data-mc-linked-toc');
    var e = this;
    f.attr('data-mc-chunk', 'Data/' + this._RuntimeFileType + '.xml');
    this.CreateToc(this._RootUl, function () {
      e._Init = true;
      for (var g = 0; g < e._InitOnCompleteFuncs.length; g++) {
        e._InitOnCompleteFuncs[g]();
      }
    });
  };
  a.prototype.CreateToc = function (f, d) {
    var g = true;
    if (this._RuntimeFileType == 'Toc') {
      g = this._HelpSystem.HasToc;
    } else {
      g = this._HelpSystem.HasBrowseSequences;
    }
    if (!g) {
      if (d != null) {
        d();
      }
      return;
    }
    var e = this;
    e._HelpSystem
      .LoadToc([this._RuntimeFileType, this._LinkedToc])
      .then(function (l) {
        var h = $(f);
        var k = [];
        for (var j = 0; j < l.chunks.length; j++) {
          if (!l.chunks[j].loaded) {
            k.push(e._HelpSystem.LoadTocChunk(l, j));
          }
        }
        if (b) {
          h.attr('data-mc-style', 'Navigation Panel Item');
        }
        $.when.apply(this, k).done(function () {
          if (e._IsTopNavMenu || e._IsOffCanvasMenu || c) {
            e.LoadTocChildren(l.tree, h, function () {
              h.children('li.placeholder').remove();
              this._Init = true;
              if (d != null) {
                d();
              }
            });
          } else {
            if (e._TocType) {
              e._HelpSystem.FindNode(
                e._TocType,
                e._TocPath,
                e._TocHref,
                function (i) {
                  e.TocNodeMenuCallback(i, h, l);
                },
                e._LinkedToc
              );
            } else {
              e._HelpSystem.FindTocNode(
                null,
                e._TocHref,
                function (i) {
                  e.TocNodeMenuCallback(i, h, l);
                },
                e._LinkedToc
              );
            }
          }
        });
      });
  };
  a.prototype.TocNodeMenuCallback = function (e, d, f) {
    if (this._IsContextSensitive) {
      if (e) {
        this.LoadTocMenu(e, d, this._MaxDepth);
      } else {
        $(d).remove();
      }
    } else {
      this.LoadTocMenuFromRoot(f.tree, e, d, this._MaxDepth);
    }
  };
  a.prototype.LoadTocChildren = function (j, g, e) {
    var f = typeof j.n !== 'undefined' ? j.n.length : 0;
    var l = 0;
    var n = this;
    if (f == 0) {
      j.childrenLoaded = true;
      this._NodesWithChildrenLoaded.push(j);
    }
    if (this._NodesWithChildrenLoaded.indexOf(j) !== -1) {
      if (e) {
        e();
      }
      return;
    }
    if (j.parent) {
      if (this._IncludeBack) {
        var m = $('<li class="js-drilldown-back"/>');
        m.addClass(this._TreeNodeClass);
        var h = $('<a href="#" />');
        h.text(this._BackLink);
        h.on(this._ExpandEvent, function (q) {
          var p = q.target;
          var o = m.parent('ul');
          var i = $('ul.menu[data-drilldown]');
          i.foundation('_back', o);
          q.preventDefault();
        });
        m.append(h);
        g.append(m);
      }
      if (
        this._IncludeParentLink &&
        this._HelpSystem.GetTocEntryHref(j) != null
      ) {
        var m = $('<li/>');
        m.addClass(this._TreeNodeClass);
        m.addClass(this._TreeNodeLeafClass);
        g.append(m);
        this.LoadTocNode(j, m, null);
      }
    }
    for (var k = 0; k < f; k++) {
      var d = j.n[k];
      var m = $('<li/>');
      m.addClass(this._TreeNodeClass);
      m.addClass(this._TreeNodeCollapsedClass);
      if (this._IsTopNavMenu && g.hasClass(this._SubMenuClass)) {
        m.mouseenter(this.TopNavigationMenuItem_MouseEnter);
      }
      g.append(m);
      this.LoadTocNode(d, m, function () {
        l++;
        if (l == f) {
          j.childrenLoaded = true;
          n._NodesWithChildrenLoaded.push(j);
          if (e != null) {
            e();
          }
        }
      });
    }
  };
  a.prototype.LoadTocMenuFromRoot = function (f, d, j, k) {
    if (f.n && k != 0) {
      k--;
      for (var h = 0; h < f.n.length; h++) {
        var g = f.n[h];
        var l = $('<li/>');
        j.append(l);
        var e = this;
        this.LoadTocNode(g, l, function (i) {
          var n = i.el;
          if (i == d) {
            e.SetTocMenuItemSelected(n);
          }
          if (i.n) {
            var m = $('<ul/>');
            m.attr('class', 'sub-menu');
            n.append(m);
            n.attr('class', 'has-children');
            e.LoadTocMenuFromRoot(i, d, m, k);
          }
        });
      }
    }
  };
  a.prototype.LoadTocMenu = function (f, e, g) {
    if (this._IncludeParent && f.parent.c !== undefined) {
      var h = $('<li/>');
      e.append(h);
      var d = this;
      this.LoadTocNode(f.parent, h, function () {
        var i = $('<ul/>');
        h.append(i);
        h.attr('class', 'has-children');
        i.attr('class', 'sub-menu');
        if (d._IncludeSiblings) {
          d.LoadTocMenuSiblings(f, i, g);
        } else {
          d.LoadTocSelectedMenu(f, i, g);
        }
      });
    } else {
      if (this._IncludeSiblings) {
        this.LoadTocMenuSiblings(f, e, g);
      } else {
        this.LoadTocSelectedMenu(f, e, g);
      }
    }
  };
  a.prototype.LoadTocSelectedMenu = function (f, e, g) {
    var h = $('<li/>');
    e.append(h);
    var d = this;
    this.LoadTocNode(f, h, function () {
      d.SetTocMenuItemSelected(h);
      d.AddTocMenuChildren(f, h, g);
    });
  };
  a.prototype.LoadTocMenuSiblings = function (h, g, j) {
    for (var f = 0; f < h.parent.n.length; f++) {
      var e = h.parent.n[f];
      var k = $('<li/>');
      g.append(k);
      var d = this;
      this.LoadTocNode(e, k, function (i) {
        if (i == h) {
          var l = h.el;
          d.SetTocMenuItemSelected(l);
          d.AddTocMenuChildren(h, l, j);
        }
      });
    }
  };
  a.prototype.SetTocMenuItemSelected = function (d) {
    var e = $(d).find('a');
    e.addClass('selected');
  };
  a.prototype.AddTocMenuChildren = function (f, e, g) {
    if (this._IncludeChildren && f.n) {
      g--;
      var d = $('<ul/>');
      e.append(d);
      e.attr('class', 'has-children');
      this.LoadTocMenuChildren(f, d, g);
      d.attr('class', 'sub-menu');
    }
  };
  a.prototype.LoadTocMenuChildren = function (h, g, j) {
    for (var f = 0; f < h.n.length; f++) {
      var e = h.n[f];
      var k = $('<li/>');
      g.append(k);
      var d = this;
      this.LoadTocNode(e, k, function (i) {
        if (j != 0) {
          var l = i.el;
          d.AddTocMenuChildren(i, l, j);
        }
      });
    }
  };
  a.prototype.LoadTocNode = function (g, f, d) {
    var e = this;
    var h = g.toc;
    this._HelpSystem.LoadTocChunk(h, g.c).then(function (t) {
      var u = h.entries[g.i];
      var m = typeof g.f != 'undefined';
      var k = typeof g.n == 'undefined' || g.n.length == 0;
      var q = g.n !== undefined && g.n.length > 0;
      var p = e._CanSync && !m ? e._RuntimeFileType : null;
      var n = e._HelpSystem.TopNavTocPath || c;
      var j = e._HelpSystem.GetTocEntryHref(g, p, e._CanSync, n);
      var l = $('<a/>');
      if (m) {
        l.attr('target', g.f);
      }
      if (j != null) {
        l.attr('href', j);
      } else {
        l.attr('href', 'javascript:void(0);');
      }
      l.text(u.title);
      if (typeof g.s != 'undefined') {
        f.addClass(g.s);
      }
      if (k) {
        f.removeClass(e._TreeNodeCollapsedClass);
        f.addClass(e._TreeNodeLeafClass);
      }
      if (q && e._IsTopNavMenu && e._HelpSystem.NodeDepth(g) <= e._MaxDepth) {
        f.addClass(e._TreeNodeHasChildrenClass);
      }
      if (e._IncludeIcon) {
        var v = 'default';
        var o = e._HelpSystem.Language;
        for (className in o) {
          if (f.hasClass(className)) {
            v = className;
            break;
          }
        }
        var i = $('<img/>');
        i.attr('src', 'Skins/Default/Stylesheets/Images/transparent.gif');
        i.addClass('toc-icon');
        if (e._IncludeIndicator && typeof g.w !== 'undefined' && g.w == 1) {
          i.attr('alt', o[v]['MarkAsNewIconAlternateText']);
        } else {
          if (f.hasClass(e._TreeNodeLeafClass)) {
            i.attr('alt', o[v]['TopicIconAlternateText']);
          } else {
            i.attr('alt', o[v]['ClosedBookIconAlternateText']);
            i.attr('data-mc-alt2', o[v]['OpenBookIconAlternateText']);
          }
        }
        if (i.prop('src') != '') {
          l.prepend(i);
        }
      }
      if (e._IncludeIndicator) {
        var s = $('<div/>');
        if (typeof g.w !== 'undefined' && g.w == 1) {
          s.append("<span class='new-indicator'></span>");
        }
        var r = $('<span class="label" />');
        r.append(l);
        s.append(r);
        l = s;
      }
      if (!e._IsContextSensitive) {
        l.on(e._ExpandEvent, e.TreeNode_Expand);
      }
      g.el = f;
      f.append(l);
      f.attr('data-mc-id', e._LoadedNodes.length);
      e._LoadedNodes.push(g);
      if (d != null) {
        d(g);
      }
    });
  };
  a.prototype.SyncTOC = function (f, e) {
    var d = this;
    var g = $('.' + this._TreeNodeSelectedClass + ' a', this._RootUl);
    if (g.length > 0) {
      var h = g[0];
      if (h.href === document.location.href) {
        return;
      }
    }
    this.Init(function () {
      function k(m) {
        if (typeof m !== 'undefined' && m != null) {
          var l = [];
          var n = m;
          while (
            typeof n !== 'undefined' &&
            d._NodesWithChildrenLoaded.indexOf(n) === -1
          ) {
            l.unshift(n);
            n = n.parent;
          }
          MadCap.Utilities.AsyncForeach(
            l,
            function (r, q) {
              var p = $(r.el);
              var o = $('<ul/>');
              o.addClass(d._SubMenuClass);
              d.LoadTocChildren(r, o, function () {
                p.append(o);
                q();
              });
            },
            function () {
              var o = m.el[0];
              d._UnhideNode(o);
              d._SelectNode(o);
            }
          );
        }
      }
      function i(l) {
        d._HelpSystem.FindNode(
          d._RuntimeFileType,
          f,
          l,
          function (n) {
            if (!n) {
              if (
                !MadCap.String.IsNullOrEmpty(l.Fragment) ||
                !MadCap.String.IsNullOrEmpty(l.Query)
              ) {
                var m = new MadCap.Utilities.Url(l.PlainPath);
                d._HelpSystem.FindNode(
                  d._RuntimeFileType,
                  f,
                  m,
                  k,
                  d._LinkedToc
                );
              }
            } else {
              k(n);
            }
          },
          d._LinkedToc
        );
      }
      var j = e.HashMap.GetItem('cshid');
      if (j != null) {
        d._HelpSystem.LookupCSHID(j, function (m) {
          var l = m.Found
            ? new MadCap.Utilities.Url(m.Topic).ToRelative(
                d._HelpSystem.GetContentPath()
              )
            : new MadCap.Utilities.Url(d._HelpSystem.DefaultStartTopic);
          i(l);
        });
      } else {
        i(e);
      }
    });
  };
  a.prototype._UnhideNode = function (d) {
    var f = MadCap.Dom.GetAncestorNodeByTagName(d, 'li', this._RootUl);
    while (f != null) {
      var e = $(f);
      e.removeClass(this._TreeNodeCollapsedClass);
      e.addClass(this._TreeNodeExpandedClass);
      f = MadCap.Dom.GetAncestorNodeByTagName(f, 'li', this._RootUl);
    }
  };
  a.prototype.NavigateTopic = function (g) {
    var h = $('.' + this._TreeNodeSelectedClass, this._RootUl)[0];
    if (h == null) {
      h = $('.' + this._TreeNodeClass, this._RootUl)[0];
    }
    if (this.NeedsCreateToc(h)) {
      var f = this;
      this.CreateToc(h, function () {
        f.NavigateTopic(g);
      });
      return;
    }
    var d = g == 'previous' ? this._GetPrevious(h) : this._GetNext(h);
    if (d == null) {
      return;
    }
    this._SelectNode(d);
    var e = $('> div a', d)[0];
    if (e != null) {
      document.location.href = $(e).attr('href');
    }
    this._UnhideNode(d);
  };
  a.prototype._SelectNode = function (e) {
    var d = $(e);
    $('.' + this._TreeNodeSelectedClass, this._RootUl).removeClass(
      this._TreeNodeSelectedClass
    );
    d.addClass(this._TreeNodeSelectedClass);
    d.scrollintoview();
  };
  a.prototype._GetNext = function (f) {
    var e = $(f);
    var g = '.' + this._TreeNodeClass;
    if (e.find(g).length > 0) {
      return e.find(g)[0];
    }
    if (e.next(g).length > 0) {
      return e.next(g)[0];
    }
    var d = e;
    while (true) {
      var h = $(d.parent().closest(g, this._RootUl));
      if (h.length == 0) {
        break;
      }
      if (h.next(g).length > 0) {
        return h.next(g)[0];
      }
      d = h;
    }
    return null;
  };
  a.prototype._GetPrevious = function (f) {
    var e = $(f);
    var g = '.' + this._TreeNodeClass;
    var d = e.prev(g);
    if (d.length == 0) {
      if (e.parent().closest(g, this._RootUl).length > 0) {
        return e.parent().closest(g, this._RootUl)[0];
      } else {
        return null;
      }
    }
    if (d.find(g).length > 0) {
      return d.find(g).last()[0];
    }
    return d[0];
  };
})();
/*
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 * Unlicensed use is strictly prohibited
 *
 * v13.2.6355.27565
 */
(function () {
  MadCap.WebHelp = MadCap.CreateNamespace('WebHelp');
  var a =
    window.external && window.external.attached && window.external.attached();
  MadCap.WebHelp.Breadcrumbs = function (e, g, d, c) {
    var f = this;
    this._Init = false;
    this._RuntimeFileType = e;
    this._Root = d;
    this._CanSync = c;
    this._HelpSystem = g;
    this._TocFile =
      this._RuntimeFileType == 'Toc'
        ? this._HelpSystem.GetTocFile()
        : this._HelpSystem.GetBrowseSequenceFile();
    this._TocType = null;
    this._TocPath = null;
    this._TocHref = null;
  };
  var b = MadCap.WebHelp.Breadcrumbs;
  b.prototype.Init = function () {
    var d = $(this._Root);
    this._MaxLevel = d.attr('data-mc-breadcrumbs-count') || '3';
    this._Divider = d.attr('data-mc-breadcrumbs-divider') || ' > ';
    this._LinkClass = 'MCBreadcrumbsLink';
    this._SelfClass = 'MCBreadcrumbsSelf';
    this._DividerClass = 'MCBreadcrumbsDivider';
    var c = this;
    d.attr('data-mc-chunk', 'Data/' + this._RuntimeFileType + '.xml');
    this.CreateToc(this._Root, function () {
      c._Init = true;
    });
  };
  b.prototype.CreateToc = function (d, c) {
    var f = true;
    if (this._RuntimeFileType == 'Toc') {
      f = this._HelpSystem.HasToc;
    } else {
      f = this._HelpSystem.HasBrowseSequences;
    }
    if (!f) {
      if (c != null) {
        c();
      }
      return;
    }
    var e = this;
    e._HelpSystem.LoadToc([this._RuntimeFileType, null]).then(function (k) {
      var j = $(d);
      var h = [];
      for (var g = 0; g < k.chunks.length; g++) {
        if (!k.chunks[g].loaded) {
          h.push(e._HelpSystem.LoadTocChunk(k, g));
        }
      }
      $.when.apply(this, h).done(function () {
        if (e._TocType) {
          e._HelpSystem.FindNode(
            e._TocType,
            e._TocPath,
            e._TocHref,
            function (i) {
              if (i) {
                e.LoadTocBreadcrumbs(i, j);
                if (c != null) {
                  c();
                }
              }
            }
          );
        } else {
          e._HelpSystem.FindTocNode(null, e._TocHref, function (i) {
            if (i) {
              e.LoadTocBreadcrumbs(i, j);
              if (c != null) {
                c();
              }
            }
          });
        }
      });
    });
  };
  b.prototype.LoadTocBreadcrumbs = function (j, f) {
    var q = [];
    var c = j.parent;
    var g = this._HelpSystem.NodeDepth(j);
    q.push(j);
    g -= 2;
    if (c) {
      for (var o = g; o >= 0; o--) {
        if (
          (this._MaxLevel < g && o <= this._MaxLevel) ||
          this._MaxLevel >= g
        ) {
          q.unshift(c);
        }
        if (!c.parent) {
          break;
        }
        c = c.parent;
      }
    }
    for (var m = 0; m < q.length; m++) {
      var s = q[m];
      if (s.i !== undefined) {
        var n = s.toc.entries[s.i];
        if (n) {
          if (s == j) {
            var e = $('<span/>');
            e.text(n.title);
            e.addClass(this._SelfClass);
            f.append(e);
          } else {
            if (s.n) {
              var h = $('<a/>');
              var p = $('<span/>');
              var l = this._HelpSystem.TopNavTocPath;
              var d = this._HelpSystem.GetTocEntryHref(s, 'Toc', false, l);
              if (d) {
                h.attr('href', d);
                h.text(n.title);
                h.addClass(this._LinkClass);
                f.append(h);
              } else {
                var r = $('<span/>');
                r.text(n.title);
                r.addClass(this._SelfClass);
                f.append(r);
              }
              p.text(this._Divider);
              p.addClass(this._DividerClass);
              f.append(p);
            }
          }
        }
      }
    }
  };
})();
/*
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 * Unlicensed use is strictly prohibited
 *
 * v13.2.6355.27565
 */
(function () {
  MadCap.WebHelp = MadCap.CreateNamespace('WebHelp');
  var b =
    window.external && window.external.attached && window.external.attached();
  MadCap.WebHelp.MiniToc = function (d, f, c) {
    var e = this;
    this._Init = false;
    this._RuntimeFileType = d;
    this._Root = c;
    this._HelpSystem = f;
    this._TocFile =
      this._RuntimeFileType == 'Toc'
        ? this._HelpSystem.GetTocFile()
        : this._HelpSystem.GetBrowseSequenceFile();
    this._TocType = null;
    this._TocPath = null;
    this._TocHref = null;
  };
  var a = MadCap.WebHelp.MiniToc;
  a.prototype.Init = function () {
    var d = $(this._Root);
    this._Depth = d.attr('data-mc-depth') || '3';
    this._LinkClass = 'MiniTOC';
    var c = this;
    d.attr('data-mc-chunk', 'Data/' + this._RuntimeFileType + '.xml');
    this.CreateToc(this._Root, function () {
      c._Init = true;
    });
  };
  a.prototype.CreateToc = function (d, c) {
    var f = true;
    if (this._RuntimeFileType == 'Toc') {
      f = this._HelpSystem.HasToc;
    } else {
      f = this._HelpSystem.HasBrowseSequences;
    }
    if (!f) {
      if (c != null) {
        c();
      }
      return;
    }
    var e = this;
    e._HelpSystem.LoadToc([this._RuntimeFileType, null]).then(function (k) {
      var j = $(d);
      var h = [];
      for (var g = 0; g < k.chunks.length; g++) {
        if (!k.chunks[g].loaded) {
          h.push(e._HelpSystem.LoadTocChunk(k, g));
        }
      }
      $.when.apply(this, h).done(function () {
        if (e._TocType) {
          e._HelpSystem.FindNode(
            e._TocType,
            e._TocPath,
            e._TocHref,
            function (i) {
              if (i) {
                e.LoadTocMiniTocChildren(i, j, 1);
                if (c != null) {
                  c();
                }
              }
            }
          );
        } else {
          e._HelpSystem.FindTocNode(null, e._TocHref, function (i) {
            if (i) {
              e.LoadTocMiniTocChildren(i, j, 1);
              if (c != null) {
                c();
              }
            }
          });
        }
      });
    });
  };
  a.prototype.LoadTocMiniTocChildren = function (f, e, g) {
    if (g <= this._Depth) {
      if (f.n) {
        for (var d = 0; d < f.n.length; d++) {
          var c = f.n[d];
          this.LoadTocMiniToc(c, e, g);
        }
      }
    }
  };
  a.prototype.LoadTocMiniToc = function (h, e, d) {
    if (h.i !== undefined) {
      var j = h.toc.entries[h.i];
      var f = this._LinkClass + d;
      var k = $('<p/>');
      var g = $('<a/>');
      var i = this._HelpSystem.TopNavTocPath;
      var c = this._HelpSystem.GetTocEntryHref(h, 'Toc', false, i);
      g.addClass(f);
      g.attr('href', c);
      g.text(j.title);
      k.append(g);
      k.addClass(f + '_0');
      e.append(k);
    }
    d++;
    this.LoadTocMiniTocChildren(h, e, d);
  };
})();
/*
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 * Unlicensed use is strictly prohibited
 *
 * v13.2.6355.27565
 */
(function () {
  if (!MadCap.Utilities.HasRuntimeFileType('TriPane')) {
    return;
  }
  MadCap.WebHelp = MadCap.CreateNamespace('WebHelp');
  MadCap.WebHelp.IndexPane = function (c) {
    var b = this;
    this._Init = false;
    this._ContainerEl = null;
    this._HelpSystem = c;
    this._EntryHeight = -1;
    this._IndexEntryCount = 0;
    this._IndexEntries = Object.create(null);
    this._IndexDivs = new Array();
    this._XmlDoc = null;
    this._Chunks = null;
    this._AlphaMap = new MadCap.Utilities.Dictionary();
    this._LiCached = null;
    this._SeePrefix = null;
    this._SeeAlsoPrefix = null;
    this.GetPath = function (d, e) {
      return MadCap.String.IsNullOrEmpty(d)
        ? new MadCap.Utilities.Url(e).ToRelative('/Content/').FullPath
        : '../' + new MadCap.Utilities.Url(d + e).FullPath;
    };
    this.LoadRootEntry = function (e, d) {
      var g = $(e);
      var f = g.data('entry');
      b._HelpSystem.LoadRootIndexEntry(f, function (i) {
        if (i.e && !i.childrenLoaded) {
          var h = $('<ul/>');
          h.addClass('tree inner');
          b.LoadEntries(h, i.e);
          g.append(h);
        }
        i.childrenLoaded = true;
        g.data('entry', i);
        if (d) {
          d(i, g);
        }
      });
    };
    this.LoadEntries = function (g, d) {
      var f = this;
      if (!$.isArray(d)) {
        var e = [];
        $.each(d, function (h, i) {
          if (!i.t) {
            i.t = h;
          }
          e.push(i);
        });
        e.sort(function (i, h) {
          var k = (i.s || i.t).toLowerCase();
          var j = (h.s || h.t).toLowerCase();
          return MadCap.String.LocaleCompare(k, j, b._HelpSystem.LanguageCode);
        });
        d = e;
      }
      $.each(d, function (q, v) {
        var r = $('<li/>');
        r.addClass('IndexEntry tree-node tree-node-collapsed');
        var l = v.t;
        var o = v.r == 'See';
        var h = v.r == 'SeeAlso';
        var j = $('<div/>');
        j.addClass('IndexTerm');
        var t = $('<span/>').addClass('label');
        j.append(t);
        var u = true;
        if (o) {
          l = f._SeePrefix + ': ' + v.f;
          j.addClass('see');
          v.seeAlsoLinks = [v.f];
        } else {
          if (h) {
            l = f._SeeAlsoPrefix + ': ';
            v.seeAlsoLinks = [];
            seeAlsoLinks = v.f.split('; ');
            if (seeAlsoLinks.length > 1) {
              var k = $('<a/>').text(l);
              t.append(k);
              for (var n = 0; n < seeAlsoLinks.length; n++) {
                var s = seeAlsoLinks[n];
                var p = $('<a/>').addClass('seeAlsoLink').text(s);
                t.append(p);
                v.seeAlsoLinks.push(s);
                if (n < seeAlsoLinks.length - 1) {
                  t.append('; ');
                }
              }
              u = false;
            } else {
              l += v.f;
              v.seeAlsoLinks.push(v.f);
            }
            j.addClass('see-also');
          }
        }
        if (u) {
          var k = $('<a/>').text(l);
          t.append(k);
        }
        r.append(j);
        v.isRoot = typeof v.$ !== 'undefined';
        if (v.e) {
          var m = $('<ul/>');
          m.addClass('tree inner');
          f.LoadEntries(m, v.e);
          r.append(m);
        } else {
          if (v.$ === 1 || !v.isRoot) {
            r.removeClass('tree-node-collapsed');
            r.addClass('tree-node-leaf');
          }
        }
        g.append(r);
        v.el = r[0];
        r.data('entry', v);
        if (!o && !h) {
          if (typeof f._IndexEntries[l] == 'undefined') {
            f._IndexEntries[l] = [v];
          } else {
            f._IndexEntries[l].push(v);
          }
        }
      });
    };
    this.FindEntry = function (e, d) {
      b._HelpSystem.FindIndexEntry(e, function (f, g) {
        if (!g) {
          return;
        }
        b.LoadRootEntry(f.el, function () {
          if (d) {
            d(g);
          }
        });
      });
    };
    this.SelectEntry = function (i, m, j, k, n) {
      $('.tree-node-selected', b._ContainerEl).removeClass(
        'tree-node-selected'
      );
      j.addClass('tree-node-selected');
      if (!m) {
        $('body').removeClass('active');
        return;
      }
      MadCap.TextEffects.RemoveLinkListTrees();
      var l = i.pageY - k.offset().top;
      var d = i.pageX - k.offset().left;
      var f =
        !this._HelpSystem.IsTabletLayout() || !this._HelpSystem.IsResponsive;
      if (m.r && !n) {
        var h = $('.seeAlsoLink', j).index(i.target);
        var g = m.seeAlsoLinks[0];
        if (h >= 0) {
          g = m.seeAlsoLinks[h];
        }
        g = g.replace(', ', ':');
        this.FindEntry(g, function (e) {
          j = $(e.el);
          $container = f ? $(b._ContainerEl).parent() : $('#navigation');
          b._UnhideNode(j[0]);
          b.SelectEntry(i, e, j, k, true);
          $container.animate({
            scrollTop:
              $container.scrollTop() + j.offset().top - $container.offset().top,
          });
        });
        return;
      } else {
        if (m.linkList && m.linkList.length > 1 && !n) {
          if (f) {
            MadCap.TextEffects.CreateLinkListPopup(
              m.linkList,
              b._ContainerEl,
              l,
              d,
              k,
              '#'
            );
          } else {
            MadCap.TextEffects.CreateLinkListTree(
              m.linkList,
              j,
              k,
              '#',
              function (o) {
                b.TreeNode_Click(o);
                MadCap.TextEffects.Item_Click.call($(o.currentTarget), [o]);
              }
            );
          }
          MadCap.Utilities.PreventDefault(i);
          i.stopPropagation();
        } else {
          if (m.linkList && m.linkList.length == 1) {
            $('body').removeClass('active');
            document.location.href = '#' + m.linkList[0].Link;
          }
        }
      }
      if (j.hasClass('tree-node-expanded') && !n) {
        j.removeClass('tree-node-expanded');
        j.addClass('tree-node-collapsed');
      } else {
        if (j.hasClass('tree-node-collapsed')) {
          j.removeClass('tree-node-collapsed');
          j.addClass('tree-node-expanded');
        }
      }
    };
    this.TreeNode_Click = function (h) {
      var d = MadCap.Dom.GetAncestorNodeByTagName(h.target, 'li');
      if (d == null) {
        return;
      }
      if ($(h.target).closest('.link-list-popup').length > 0) {
        return;
      }
      var g = $(this);
      var i = $(d);
      MadCap.Utilities.PreventDefault(h);
      var f = i.data('entry');
      if (!i.hasClass('IndexEntryLink') && (!f || f.isRoot)) {
        b.LoadRootEntry(d, function (e, j) {
          b.SelectEntry(h, e, j, g);
        });
      } else {
        b.SelectEntry(h, f, i, g);
      }
    };
    this.Search = function () {
      var d = this.value.toLowerCase();
      b._Terms.each(function () {
        var e = $(this);
        var f = e.parent().parent();
        var g = b._HelpSystem.IndexPartialWordSearch
          ? e.text().toLowerCase().indexOf(d) != -1
          : MadCap.String.StartsWith(e.text(), d, false);
        f.css('display', g ? 'block' : 'none');
        if (b._HelpSystem.IndexPartialWordSearch) {
          e.removeHighlight('highlightIndex');
          if (g) {
            e.highlight(d, 'highlightIndex');
          }
        }
      });
    };
  };
  var a = MadCap.WebHelp.IndexPane;
  a.prototype.Init = function (e, b) {
    if (this._Init) {
      if (b != null) {
        b();
      }
      return;
    }
    var d = this;
    d._ContainerEl = e;
    var c = $(this._ContainerEl.parentNode);
    this._SeePrefix = c.attr('data-see-prefix') || 'See';
    this._SeeAlsoPrefix = c.attr('data-see-also-prefix') || 'See Also';
    d._HelpSystem.LoadIndex(function (h, g) {
      var f = $('<ul/>');
      f.addClass('tree');
      d.LoadEntries(f, h.terms);
      var j = $(d._ContainerEl);
      j.click(d.TreeNode_Click);
      j.append(f);
      var i = $('#search-index');
      i.bind('keyup', d.Search);
      $('#responsive-search-index').bind('keyup', d.Search);
      d._Terms = $('.IndexEntry a', this._ContainerEl);
      d._Init = true;
      if (b != null) {
        b();
      }
    }, null);
  };
  a.prototype._UnhideNode = function (c) {
    var b = MadCap.Dom.GetAncestorNodeByTagName(c, 'li', this._ContainerEl);
    while (b != null) {
      var d = $(b);
      d.removeClass('tree-node-collapsed');
      d.addClass('tree-node-expanded');
      b = MadCap.Dom.GetAncestorNodeByTagName(b, 'li', this._ContainerEl);
    }
  };
})();
/*
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 * Unlicensed use is strictly prohibited
 *
 * v13.2.6355.27565
 */
(function () {
  if (!MadCap.Utilities.HasRuntimeFileType('TriPane')) {
    return;
  }
  MadCap.WebHelp = MadCap.CreateNamespace('WebHelp');
  MadCap.WebHelp.GlossaryPane = function (c) {
    var b = this;
    this._Init = false;
    this._ContainerEl = null;
    this._HelpSystem = c;
    MadCap.Utilities.CrossFrame.AddMessageHandler(this.OnMessage, this);
    this.TreeNode_Click = function (j) {
      var d = MadCap.Dom.GetAncestorNodeByTagName(j.target, 'li');
      if (d == null) {
        return;
      }
      var l = $(d);
      var i = $('a', l);
      var h = i.text();
      var k = l.attr('data-chunk');
      var f = b._HelpSystem.Glossary.chunks[k].path;
      var g = new MadCap.Utilities.Url(f).ToFolder().ToFolder();
      MadCap.Utilities.PreventDefault(j);
      require([f], function (n) {
        var o = n[h];
        $('.tree-node-selected', b._ContainerEl).removeClass(
          'tree-node-selected'
        );
        l.addClass('tree-node-selected');
        var e = $('.GlossaryPageTerm', d);
        if (
          !MadCap.String.IsNullOrEmpty(o.d) &&
          !e.hasClass('MCDropDownHead')
        ) {
          e.addClass('MCDropDownHead MCDropDownHotSpot');
          var s = $('<div/>');
          s.addClass('GlossaryPageDefinition MCDropDownBody');
          s.append(o.d);
          l.addClass('MCDropDown');
          l.append(e);
          l.append(s);
          var p = new MadCap.TextEffects.DropDownControl(l[0]);
          p.Init(false);
          p.Open(true);
        }
        if (!MadCap.String.IsNullOrEmpty(o.l)) {
          var m = i.attr('href');
          if (MadCap.String.IsNullOrEmpty(m)) {
            var q = g
              .CombinePath(o.l)
              .ToRelative(b._HelpSystem.GetContentPath()).FullPath;
            m = encodeURI(q);
            i.attr('href', m);
          }
          document.location.href = '#' + m;
        } else {
          if (l.hasClass('tree-node-expanded')) {
            l.removeClass('tree-node-expanded');
            l.addClass('tree-node-collapsed');
          } else {
            if (l.hasClass('tree-node-collapsed')) {
              l.removeClass('tree-node-collapsed');
              l.addClass('tree-node-expanded');
              if ($('li', l.parent()).last()[0] == l[0]) {
                var r = $(b._ContainerEl);
                r.animate({ scrollTop: r[0].scrollHeight }, 500);
              }
            }
          }
        }
      });
    };
    this.Search = function () {
      var d = this.value.toLowerCase();
      b._Terms.each(function () {
        var e = $(this);
        var f = e.parent().parent();
        var g = b._HelpSystem.GlossaryPartialWordSearch
          ? e.text().toLowerCase().indexOf(d) != -1
          : MadCap.String.StartsWith(e.text(), d, false);
        f.css('display', g ? 'block' : 'none');
        if (b._HelpSystem.GlossaryPartialWordSearch) {
          e.removeHighlight('highlightGlossary');
          if (g) {
            e.highlight(d, 'highlightGlossary');
          }
        }
      });
    };
  };
  var a = MadCap.WebHelp.GlossaryPane;
  a.prototype.OnMessage = function (e, b, d) {
    var c = { Handled: false, FireResponse: true };
    return c;
  };
  a.prototype.Init = function (d, b) {
    if (this._Init) {
      if (b != null) {
        b();
      }
      return;
    }
    var c = this;
    c._ContainerEl = d;
    c._HelpSystem.LoadGlossary(function (f, l) {
      var h = $('<ul/>');
      h.addClass('tree');
      var k = f.terms.sort(function (p, i) {
        return MadCap.String.LocaleCompare(
          p.s || p.t,
          i.s || i.t,
          c._HelpSystem.LanguageCode
        );
      });
      for (var g = 0; g < k.length; g++) {
        var n = k[g];
        var m = $('<li/>');
        m.addClass('GlossaryPageEntry tree-node tree-node-collapsed');
        m.attr('data-chunk', n.c);
        var e = $('<div/>');
        e.addClass('GlossaryPageTerm');
        e.append('<span class="label"><a>' + n.t + '</a></span>');
        m.append(e);
        h.append(m);
      }
      var o = $(c._ContainerEl);
      o.click(c.TreeNode_Click);
      o.append(h);
      var j = $('#search-glossary');
      j.bind('keyup', c.Search);
      $('#responsive-search-glossary').bind('keyup', c.Search);
      c._Terms = $('.GlossaryPageTerm a', c._ContainerEl);
      c._Init = true;
      if (b != null) {
        b();
      }
    }, null);
  };
  a.prototype._SelectNode = function (b) {
    $('.tree-node-selected', this._ContainerEl).removeClass(
      'tree-node-selected'
    );
    $(b).addClass('tree-node-selected');
  };
})();
/*
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 * Unlicensed use is strictly prohibited
 *
 * v13.2.6355.27565
 */
(function () {
  var a = MadCap.CreateNamespace('WebHelp.Search');
  a.Tokenizer = function () {
    var g = '';
    var h = -1;
    var f = new Array();
    this.Tokenize = function (l) {
      var k = null;
      g = l;
      h = -1;
      for (var j = 0; (k = i()); j++) {
        f[j] = k;
      }
      return f;
    };
    function c() {
      return g.charAt(h + 1);
    }
    function e() {
      h++;
    }
    function d() {
      var j = '';
      for (;;) {
        var k = c();
        if (!k) {
          break;
        }
        if (k == '"') {
          e();
          break;
        } else {
          e();
          j += k;
        }
      }
      return j == '' ? null : j;
    }
    function i() {
      var n = c();
      var k = null;
      var j = '';
      if (!n) {
        k = null;
      } else {
        if (a.IsWhiteSpace(n)) {
          for (n = c(); a.IsWhiteSpace(n); n = c()) {
            e();
            j += n;
          }
          k = new a.Token(j, a.Token.WhiteSpace);
        } else {
          if (n == '(') {
            e();
            k = new a.Token(n, a.Token.LeftParen);
          } else {
            if (n == ')') {
              e();
              k = new a.Token(n, a.Token.RightParen);
            } else {
              if (n == '^' || n == '!') {
                e();
                k = new a.Token(n, a.Token.Not);
              } else {
                if (n == '+' || n == '&') {
                  e();
                  k = new a.Token(n, a.Token.And);
                } else {
                  if (n == '|') {
                    e();
                    k = new a.Token(n, a.Token.Or);
                  } else {
                    if (n == '"') {
                      e();
                      var m = d();
                      k = new a.Token(
                        m,
                        m == null ? a.Token.Error : a.Token.Phrase
                      );
                    } else {
                      if (a.IsTermSeparator(n)) {
                        e();
                        k = new a.Token(n, a.Token.TermSeparator);
                      } else {
                        for (n = c(); a.IsNameChar(n); n = c()) {
                          e();
                          j += n;
                        }
                        if (j == 'and' || j == 'AND') {
                          k = new a.Token(j, a.Token.And);
                        } else {
                          if (j == 'or' || j == 'OR') {
                            k = new a.Token(j, a.Token.Or);
                          } else {
                            if (j == 'not' || j == 'NOT') {
                              k = new a.Token(j, a.Token.Not);
                            } else {
                              var l = a.Token.Word;
                              if (
                                MadCap.WebHelp.SearchPane.SearchDBs[0]
                                  .SearchType == 'NGram'
                              ) {
                                l = a.Token.Phrase;
                              }
                              k = new a.Token(j, l);
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      return k;
    }
  };
  a.Token = function (c, e) {
    var d = c;
    var f = e;
    this.GetTokenText = function () {
      return d;
    };
    this.GetType = function () {
      return f;
    };
  };
  var b = a.Token;
  b.Eof = 0;
  b.Error = 1;
  b.WhiteSpace = 2;
  b.Phrase = 3;
  b.Word = 4;
  b.RightParen = 5;
  b.LeftParen = 6;
  b.Not = 7;
  b.And = 8;
  b.Or = 9;
  b.ImplicitAnd = 10;
  b.TermSeparator = 11;
  a.Parser = function (g) {
    var i = this;
    var k = g;
    var d = -1;
    var h = new a.Tokenizer();
    var c = h.Tokenize(k);
    this.ParseExpression = function () {
      var n = j();
      f();
      if (e() == a.Token.Eof) {
        return n;
      } else {
        if (e() == a.Token.And || e() == a.Token.Or || e() == a.Token.Not) {
          l();
          var m = new a.Node(c[d], n, this.ParseExpression());
          return m;
        } else {
          if (
            e() == a.Token.Word ||
            e() == a.Token.Phrase ||
            e() == a.Token.Not ||
            e() == a.Token.LeftParen
          ) {
            var m = new a.Node(
              new a.Token(
                n.GetToken().GetTokenText() + ' ' + c[d + 1].GetTokenText(),
                a.Token.ImplicitAnd
              ),
              n,
              this.ParseExpression()
            );
            return m;
          } else {
            if (e() == a.Token.RightParen) {
              return n;
            }
          }
        }
      }
      throw gInvalidTokenLabel;
    };
    function l() {
      d++;
    }
    function j() {
      f();
      if (e() == a.Token.Word) {
        l();
        return new a.Node(c[d], null, null);
      } else {
        if (e() == a.Token.Phrase) {
          l();
          return new a.Node(c[d], null, null);
        } else {
          if (e() == a.Token.LeftParen) {
            l();
            var m = c[d];
            var n = new a.Node(m, i.ParseExpression(), null);
            if (e() != a.Token.RightParen) {
              throw "Missing right paren ')'.";
            }
            l();
            return n;
          }
        }
      }
      throw gInvalidTokenLabel;
    }
    function e() {
      if (c[d + 1] == null) {
        return a.Token.Eof;
      } else {
        return c[d + 1].GetType();
      }
    }
    function f() {
      for (; e() == a.Token.WhiteSpace || e() == a.Token.TermSeparator; ) {
        l();
      }
    }
  };
  a.Node = function (e, f, d) {
    var c = e;
    var h = f;
    var g = d;
    this.Evaluate = function (k, i) {
      var j = this;
      var l = c.GetType();
      if (l == a.Token.Word || l == a.Token.Phrase) {
        this.EvaluatePhrase(k).then(i);
      } else {
        if (
          l == a.Token.And ||
          l == a.Token.ImplicitAnd ||
          l == a.Token.Or ||
          l == a.Token.Not
        ) {
          h.Evaluate(k, function (m) {
            g.Evaluate(k, function (n) {
              if (
                c.GetType() == a.Token.And ||
                c.GetType() == a.Token.ImplicitAnd
              ) {
                i(a.IntersectResults(m, n));
              } else {
                if (c.GetType() == a.Token.Or) {
                  i(a.UnionResults(m, n));
                } else {
                  if (c.GetType() == a.Token.Not) {
                    i(a.SubtractResults(m, n));
                  }
                }
              }
            });
          });
        } else {
          if (l == a.Token.LeftParen) {
            if (h) {
              h.Evaluate(k, i);
            } else {
              i(null);
            }
          } else {
            i(null);
          }
        }
      }
    };
    this.EvaluatePhrase = function (n) {
      var q = this;
      var r = $.Deferred();
      var i = c.GetTokenText();
      var k = c.GetType() == a.Token.Phrase;
      var p = [];
      var o = Object.create(null);
      o.results = Object.create(null);
      o.terms = [];
      o.ignore = MadCap.Utilities.StopWords.indexOf(i) > -1;
      if (!o.ignore) {
        o.terms.push(i);
        for (var m = 0; m < MadCap.WebHelp.SearchPane.SearchDBs.length; m++) {
          var l = MadCap.WebHelp.SearchPane.SearchDBs[m];
          p.push(
            l.LookupPhrase(i, k, n).then(function (j, s) {
              if (s) {
                dbIndex = MadCap.WebHelp.SearchPane.SearchDBs.indexOf(j);
                o.results[dbIndex] = { data: s };
              }
            })
          );
        }
      }
      $.when.apply(this, p).done(function () {
        r.resolve(o);
      });
      return r.promise();
    };
    this.GetToken = function () {
      return c;
    };
  };
  a.LoadResultData = function (h) {
    var k = [];
    var i = 0;
    var d = h.results;
    for (var f in d) {
      var e = MadCap.WebHelp.SearchPane.SearchDBs[f];
      var g = d[f];
      k.push(
        e.LoadTopics(g).then(function (m) {
          i += m.count;
        })
      );
    }
    var l = MadCap.WebHelp.SearchPane.SearchDBs[0].RelevanceWeight;
    var j = $.Deferred();
    var c = [];
    $.when.apply(this, k).done(function () {
      for (var r in d) {
        var n = MadCap.WebHelp.SearchPane.SearchDBs[r];
        var p = d[r];
        for (var o in p.data) {
          var t = p.data[o];
          var q = n.HelpSystem.GetTopicPath(t.u).FullPath;
          var m = (t.i * p.count) / i;
          var s = MadCap.Utilities.CalculateScore(t.r, m, l);
          c.push(new a.SearchResult(s, t.t, q, t.a));
        }
      }
      j.resolve(c, h.terms);
    });
    return j.promise();
  };
  a.IsNameChar = function (d) {
    if (!d) {
      return false;
    } else {
      if (d == '"') {
        return false;
      } else {
        if (d == '+') {
          return false;
        } else {
          if (d == '^') {
            return false;
          } else {
            if (d == '|') {
              return false;
            } else {
              if (d == '&') {
                return false;
              } else {
                if (a.IsWhiteSpace(d)) {
                  return false;
                } else {
                  if (a.IsTermSeparator(d)) {
                    return false;
                  } else {
                    return true;
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  a.IsWhiteSpace = function (d) {
    if (!d) {
      return false;
    } else {
      if (d == ' ') {
        return true;
      } else {
        if (d.charCodeAt(0) == 12288) {
          return true;
        } else {
          return false;
        }
      }
    }
  };
  a.IsTermSeparator = function (d) {
    return (
      (MadCap.String.IsPunctuation(d) && d != "'" && d != '_') ||
      d == '>' ||
      d == '<' ||
      d == '='
    );
  };
  a.SplitPhrase = function (f) {
    var e = null;
    var c = MadCap.WebHelp.SearchPane.SearchDBs[0];
    if (c.SearchType == 'NGram') {
      e = new Array(Math.max(0, f.length - (c.NGramSize + 1)));
      for (var d = 0; d < f.length - c.NGramSize + 1; d++) {
        e[d] = f.substring(d, d + c.NGramSize);
      }
    } else {
      e = MadCap.String.Split(f, function (g) {
        return a.IsWhiteSpace(g) || a.IsTermSeparator(g);
      });
    }
    return e;
  };
  a.FilterResults = function (e, d, j, c) {
    if ((e.ignore && d.ignore) || d.ignore) {
      return e;
    } else {
      if (e.ignore) {
        return d;
      }
    }
    var i = Object.create(null);
    i.results = Object.create(null);
    var k = i.results;
    for (var h in e.results) {
      k[h] = Object.create(null);
      k[h].data = Object.create(null);
      var g = e.results[h].data;
      var f = d.results[h];
      if (f) {
        f = f.data;
      }
      j(g, f, k[h].data);
    }
    i.terms = c(e.terms, d.terms);
    return i;
  };
  a.UnionResults = function (d, c) {
    return a.FilterResults(
      d,
      c,
      function (f, j, e) {
        for (var h in f) {
          e[h] = f[h];
        }
        if (j) {
          for (var h in j) {
            var i = f[h];
            var g = j[h];
            if (i) {
              e[h] = { r: MadCap.Utilities.CombineRelevancy(i.r, g.r) };
            } else {
              e[h] = g;
            }
          }
        }
      },
      function (f, e) {
        return f.Union(e);
      }
    );
  };
  a.IntersectResults = function (d, c) {
    return a.FilterResults(
      d,
      c,
      function (f, i, e) {
        if (i) {
          for (var h in f) {
            var g = i[h];
            if (g) {
              e[h] = { r: MadCap.Utilities.CombineRelevancy(f[h].r, g.r) };
            }
          }
        }
      },
      function (f, e) {
        return f.Union(e);
      }
    );
  };
  a.SubtractResults = function (d, c) {
    if (d.ignore || c.ignore) {
      return d;
    }
    return a.FilterResults(
      d,
      c,
      function (f, i, e) {
        if (i) {
          for (var h in f) {
            var g = i[h];
            if (!g) {
              e[h] = f[h];
            }
          }
        }
      },
      function (f, e) {
        return f;
      }
    );
  };
})();
/*
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 * Unlicensed use is strictly prohibited
 *
 * v13.2.6355.27565
 */
(function () {
  MadCap.WebHelp = MadCap.CreateNamespace('WebHelp');
  MadCap.WebHelp.SearchPane = function (f, e) {
    this._Init = false;
    this._Container = e;
    this._HelpSystem = f;
    this._FeedbackController = null;
    this._Parser = null;
    this._Filters = null;
    this._Set = null;
    this._FilteredSet = null;
    this._Highlight = '';
    this._DownloadedSynonymXmlDocRootNode = null;
  };
  var c = MadCap.WebHelp.SearchPane;
  c.SearchDBs = new Array();
  c.prototype.Init = function (e) {
    if (this._Init) {
      if (e) {
        e.call(this);
      }
      return;
    }
    var h = this;
    if (this._HelpSystem.LiveHelpEnabled) {
      this._FeedbackController = MadCap.WebHelp.LoadFeedbackController(
        this._HelpSystem.LiveHelpServer
      );
      this._FeedbackController.Init(function () {
        if (h._FeedbackController.FeedbackActive) {
          h._FeedbackController.GetSynonymsFile(
            h._HelpSystem.LiveHelpOutputId,
            null,
            function (k, i) {
              var j = MadCap.Utilities.Xhr.LoadXmlString(k);
              if (j != null) {
                h._DownloadedSynonymXmlDocRootNode = j.documentElement;
              }
              g();
            },
            null
          );
        } else {
          g();
        }
      });
    } else {
      g();
    }
    function g() {
      if (!h._HelpSystem.IsWebHelpPlus) {
        h._HelpSystem.GetSearchDBs(f);
      } else {
        f(null);
      }
    }
    function f(i) {
      c.SearchDBs = i;
      h._Filters = new b.Filters(h._HelpSystem);
      h._Filters.Load(function () {
        h._Init = true;
        if (e) {
          e.call(h);
        }
      });
    }
  };
  c.prototype.Search = function (g, f) {
    if (MadCap.String.IsNullOrEmpty(MadCap.String.Trim(g))) {
      return;
    }
    this._Container.addClass('loading');
    var e = $.Deferred();
    this.Init(function () {
      var j = {};
      var h = [];
      if (f.searchContent) {
        var i = f.content ? f.content.filterName : null;
        var k = !this._HelpSystem.IsWebHelpPlus
          ? this.DoSearch(g, i)
          : this.DoSearchWebHelpPlus(g, i);
        h.push(
          k.then(function (m, n) {
            j.content = m;
            j.includedTerms = n;
          })
        );
      }
      if (f.searchGlossary) {
        h.push(
          this._HelpSystem.SearchGlossary(g).then(function (m) {
            j.glossary = m;
          })
        );
      }
      if (f.searchCommunity) {
        if (this._FeedbackController && this._FeedbackController.PulseActive) {
          var l = this._FeedbackController.GetPulseSearchResults(
            this._HelpSystem.LiveHelpOutputId,
            g,
            f.community.pageSize,
            f.community.pageIndex
          );
          h.push(
            l.then(function (m) {
              j.community = m;
            })
          );
        }
      }
      $.when.apply(this, h).done(
        $.proxy(function () {
          this._Container.removeClass('loading');
          e.resolve(j);
        }, this)
      );
    });
    return e.promise();
  };
  c.prototype.DoSearch = function (k, i) {
    var g = $.Deferred();
    this._Parser = new b.Parser(k);
    var f = null;
    try {
      f = this._Parser.ParseExpression();
    } catch (j) {
      alert('Ensure that the search string is properly formatted.');
      f = null;
    }
    if (!f) {
      return g.resolve();
    }
    var e = c.SearchDBs[0];
    if (
      this._DownloadedSynonymXmlDocRootNode != null &&
      e.DownloadedSynonymFile == null
    ) {
      e.DownloadedSynonymFile = new b.SynonymFile(
        this._DownloadedSynonymXmlDocRootNode,
        e.Stemmer
      );
    }
    var h = this;
    f.Evaluate(i, function (l) {
      b.LoadResultData(l).then(function (m, n) {
        h._Set = m;
        if (h._Set) {
          h._Set.sort(function (p, o) {
            return o.Score - p.Score;
          });
        }
        MadCap.Utilities.ClearRequireCache();
        g.resolve(h._Set, n);
      });
    });
    return g.promise();
  };
  c.prototype.DoSearchWebHelpPlus = function (m, k) {
    var h = this;
    var g = $.Deferred();
    function f(A, v) {
      var y = [];
      if (A) {
        var p = A.getElementsByTagName('Result');
        var s = p.length;
        var u = new MadCap.Utilities.Url(document.location.pathname);
        if (!h._HelpSystem.SearchUrl) {
          if (!MadCap.String.EndsWith(document.location.pathname, '/')) {
            u = u.ToFolder();
          }
          u = u.CombinePath(h._HelpSystem.ContentFolder);
        }
        for (var q = 0; q < s; q++) {
          var z = p[q];
          var o = MadCap.Dom.GetAttributeInt(z, 'Rank', -1);
          var x = z.getAttribute('Title');
          var w = z.getAttribute('Link');
          var t = new MadCap.Utilities.Url(w).ToRelative(u);
          var n = z.getAttribute('AbstractText');
          if (MadCap.String.IsNullOrEmpty(x)) {
            x = z.getAttribute('Filename');
          }
          var r = new b.SearchResult(o, x, t.FullPath, unescape(n));
          y.push(r);
        }
      }
      g.resolve(y);
    }
    MadCap.Utilities.Xhr.CallWebService(
      h._HelpSystem.GetPath() +
        'Service/Service.asmx/GetSearchResults?SearchString=' +
        encodeURIComponent(m) +
        '&FilterName=' +
        encodeURIComponent(k),
      true,
      f,
      null
    );
    var l = m.split(' ');
    var e = true;
    this._Highlight = '?Highlight=';
    for (var j = 0; j < l.length; j++) {
      if (!e) {
        this._Highlight += '||';
      } else {
        e = false;
      }
      this._Highlight += l[j];
    }
    return g.promise();
  };
  var b = MadCap.CreateNamespace('WebHelp.Search');
  MadCap.WebHelp.Search.SearchDB = function (e) {
    this.RelevanceWeight = 0;
    this.TopicChunkMap = null;
    this.UrlChunkMap = null;
    this.StemChunkMap = null;
    this.PhraseChunkMap = null;
    this.HelpSystem = e;
    this.SearchType = null;
    this.NGramSize = 0;
    this.Stemmer = null;
    this.SynonymFile = null;
    this.DownloadedSynonymFile = null;
    this.LoadChunkCompleteFuncs = new MadCap.Utilities.Dictionary();
  };
  var a = b.SearchDB;
  a.prototype.Load = function (g, e) {
    var f = this;
    this.LoadStemmer(this.HelpSystem.LanguageName, function () {
      MadCap.Utilities.Xhr.Load(
        f.HelpSystem.GetPath() + 'Data/Synonyms.xml',
        true,
        function (h) {
          if (h != null) {
            f.SynonymFile = new b.SynonymFile(h.documentElement, f.Stemmer);
          }
          f._LoadSearchDB(g, e);
        },
        null,
        this
      );
    });
  };
  a.prototype.LoadStemmer = function (j, e) {
    var f = [
      'danish',
      'dutch',
      'english',
      'finnish',
      'french',
      'german',
      'hungarian',
      'italian',
      'norwegian',
      'portuguese',
      'romanian',
      'russian',
      'spanish',
    ];
    var i = null;
    this.Stemmer = {
      stemWord: function (k) {
        if (k != null) {
          k = k.toLowerCase();
        }
        if (i != null) {
          k = i.stemWord(k);
        }
        return k;
      },
    };
    if (j != null && f.indexOf(j.toLowerCase()) != -1) {
      var h = 'stemmer-' + j.toLowerCase() + '.amd.min.js';
      var g = MadCap.Utilities.HasRuntimeFileType('SkinPreview')
        ? '../WebHelp2/Scripts/Stemmers/'
        : this.HelpSystem.GetPath() + this.HelpSystem.ScriptsFolderPath;
      require([g + h], function (k) {
        i = new k[j + 'Stemmer']();
        e();
      });
    } else {
      e();
    }
  };
  a.prototype.GetTermPhrases = function (h, f, i) {
    var o = this;
    var k = new MadCap.Utilities.Dictionary();
    var g = this.Stemmer.stemWord(h);
    var l = new MadCap.Utilities.Dictionary();
    k.Add(g, true);
    if (!f) {
      if (this.SynonymFile != null) {
        this.SynonymFile.AddSynonymStems(h, g, k);
      }
      if (this.DownloadedSynonymFile != null) {
        this.DownloadedSynonymFile.AddSynonymStems(h, g, k);
      }
    }
    var e = Object.create(null);
    var j = [];
    k.ForEach(function (r, s) {
      if (o.SearchType == 'NGram') {
        for (var q = 0; q < r.length - o.NGramSize + 1; q++) {
          var p = r.substring(q, q + o.NGramSize);
          j.push(p);
        }
      } else {
        j.push(r);
      }
    });
    var n = [];
    $.each(j, function (p, q) {
      n.push(
        o.LoadStem(q).then(function (s) {
          for (var r in s) {
            if (!f || r == h.toLowerCase()) {
              var t = s[r];
              if (i) {
                t = i.Intersect(t);
              }
              l.Add(r, t);
            }
          }
        })
      );
    });
    var m = $.Deferred();
    $.when.apply(this, n).done(function () {
      m.resolve(h, l);
    });
    return m.promise();
  };
  a.prototype.LookupPhrase = function (m, k, e) {
    var o = this;
    var w = $.Deferred();
    var f = b.SplitPhrase(m);
    var h = null;
    var n = [];
    var l = new MadCap.Utilities.Dictionary();
    if (m) {
      m = m.trim();
    }
    if (!m || MadCap.Utilities.StopWords.indexOf(m) > -1) {
      w.resolve(o, null);
      return w.promise();
    }
    var j;
    if (e) {
      j = [];
      var r = this.HelpSystem.GetMasterHelpsystem().GetSearchFilters();
      if (r) {
        var u = r[e];
        if (u) {
          var g = u.c;
          var v = g.split(';');
          var t = this.HelpSystem.GetConcepts();
          for (var q = 0; q < v.length; q++) {
            var s = v[q];
            j = j.Union(t[s]);
          }
        }
      }
    }
    for (var q = 0; q < f.length; q++) {
      var p = f[q];
      n.push(
        this.GetTermPhrases(p, k, j).then(function (i, x) {
          l.Add(i, x);
        })
      );
    }
    $.when.apply(o, n).done(function () {
      var A;
      l.ForEach(function (C, B) {
        var D = [];
        B.ForEach(function (E, F) {
          D = D.Union(F);
        });
        if (!A) {
          A = D;
        } else {
          A = A.Intersect(D);
        }
      });
      var x = Object.create(null);
      var z = [];
      l.ForEach(function (C, B) {
        x[C] = Object.create(null);
        B.ForEach(function (D, F) {
          var E = F.Intersect(A);
          $.each(E, function (G, H) {
            z.push(
              o.LoadPhrase(D, H).then(function (I, K) {
                var J = x[C][I];
                if (K) {
                  if (!J) {
                    x[C][I] = K;
                  } else {
                    J.r = MadCap.Utilities.CombineRelevancy(J.r, K.r);
                    $.extend(true, J.w, K.w);
                  }
                }
              })
            );
          });
        });
      });
      var y = Object.create(null);
      var i = Object.create(null);
      $.when.apply(this, z).done(function () {
        $.each(A, function (G, J) {
          var L = 0;
          if (!k) {
            L = x[f[0]][J].r;
          } else {
            var K = x[f[0]][J].w;
            for (var C in K) {
              var D = K[C];
              for (var I = 1; I < f.length; I++) {
                var H = parseInt(C);
                var F = f[I];
                var E = x[F][J].w;
                var B = E[H + I];
                if (B) {
                  D = Math.max(D, B);
                } else {
                  D = 0;
                  break;
                }
              }
              L = MadCap.Utilities.CombineRelevancy(L, D);
            }
          }
          if (L > 0) {
            i[J] = { r: L };
          }
        });
        w.resolve(o, i);
      });
    });
    return w.promise();
  };
  a.prototype.LoadTopics = function (h) {
    var e = [];
    var i = h.data;
    for (var g in i) {
      e.push(
        this.LoadTopic(g).then(function (j, k) {
          $.extend(i[j], k);
        })
      );
    }
    h.count = e.length;
    var f = $.Deferred();
    $.when.apply(this, e).done(function () {
      f.resolve(h);
    });
    return f.promise();
  };
  a.prototype._LoadSearchDB = function (f, e) {
    this.TopicChunkMap = f.t;
    this.UrlChunkMap = f.u;
    this.StemChunkMap = f.s;
    this.PhraseChunkMap = f.p;
    this.RelevanceWeight = f.r;
    this.SearchType = f.st;
    this.NGramSize = f.n;
    if (e) {
      e();
    }
  };
  a.prototype.LookupPhraseChunkId = function (e, j) {
    var f = this.PhraseChunkMap.length;
    for (var g = 0; g < f; g++) {
      var h = this.PhraseChunkMap[g][0];
      var k = MadCap.String.Compare(e, h);
      if (k == 0) {
        if (j < this.PhraseChunkMap[g][1]) {
          return g - 1;
        } else {
          if (j == this.PhraseChunkMap[g][1]) {
            return g;
          }
        }
      } else {
        if (k == -1) {
          return g - 1;
        }
      }
    }
    return f - 1;
  };
  a.prototype.LoadTopic = function (g) {
    var f = $.Deferred();
    var e = MadCap.Utilities.GetChunkId(this.TopicChunkMap, g, function (i, h) {
      if (i < h) {
        return -1;
      } else {
        if (i == h) {
          return 0;
        } else {
          return 1;
        }
      }
    });
    if (e == -1) {
      f.resolve();
    } else {
      MadCap.Utilities.Require(
        [this.HelpSystem.GetPath() + 'Data/SearchTopic_Chunk' + e + '.js'],
        function (h) {
          f.resolve(g, h[g]);
        }
      );
    }
    return f.promise();
  };
  a.prototype.LoadUrl = function (g) {
    var f = $.Deferred();
    var e = MadCap.Utilities.GetChunkId(this.UrlChunkMap, g, function (i, h) {
      return MadCap.String.Compare(i, h);
    });
    if (e == -1) {
      f.resolve();
    } else {
      MadCap.Utilities.Require(
        [this.HelpSystem.GetPath() + 'Data/SearchUrl_Chunk' + e + '.js'],
        function (h) {
          f.resolve(g, h[g]);
        }
      );
    }
    return f.promise();
  };
  a.prototype.LoadTopicByUrl = function (f) {
    var e = this;
    return this.LoadUrl(f).then(function (g, h) {
      return e.LoadTopic(h);
    });
  };
  a.prototype.LoadStem = function (j) {
    var g = this;
    var f = $.Deferred();
    var i = MadCap.Utilities.GetChunkIds(this.StemChunkMap, j, function (l, k) {
      return MadCap.String.Compare(l, k);
    });
    if (i.length === 0) {
      f.resolve();
    } else {
      var h = [];
      var e = Object.create(null);
      $.each(i, function (l, k) {
        h.push(
          g.LoadStemChunk(k).then(function (m) {
            $.extend(e, m[j]);
          })
        );
      });
      $.when.apply(this, h).done(function () {
        f.resolve(e);
      }, this);
    }
    return f.promise();
  };
  a.prototype.LoadStemChunk = function (f) {
    var e = $.Deferred();
    MadCap.Utilities.Require(
      [this.HelpSystem.GetPath() + 'Data/SearchStem_Chunk' + f + '.js'],
      function (g) {
        e.resolve(g);
      }
    );
    return e.promise();
  };
  a.prototype.LoadPhrase = function (e, h) {
    var g = $.Deferred();
    var f = this.LookupPhraseChunkId(e, h);
    MadCap.Utilities.Require(
      [this.HelpSystem.GetPath() + 'Data/SearchPhrase_Chunk' + f + '.js'],
      function (j) {
        var i;
        if (j[e]) {
          i = j[e][h];
        }
        g.resolve(h, i);
      }
    );
    return g.promise();
  };
  b.SearchQuery = function (g, f, e) {
    function h(n, p) {
      var j = MadCap.Utilities.HasRuntimeFileType('TriPane');
      var m = false;
      for (var l = 0; l < p.length; l++) {
        var k = p[l][0];
        var o = p[l][1];
        if (!MadCap.String.IsNullOrEmpty(o)) {
          n += (!m && j ? '?' : '&') + k + '=' + o;
          m = true;
        }
      }
      return n;
    }
    this.Query = g;
    this.Filter = f;
    this.PageIndex = e;
    this.ToString = function () {
      return h(this.Query, [
        [b.SearchQuery._filter, this.Filter],
        [b.SearchQuery._pageIndex, this.PageIndex],
      ]);
    };
  };
  b.SearchQuery._query = 'q';
  b.SearchQuery._filter = 'f';
  b.SearchQuery._pageIndex = 'p';
  b.SearchQuery.Parse = function (i) {
    var g = new MadCap.Utilities.Url(i);
    var h = g.PlainPath;
    if (MadCap.String.IsNullOrEmpty(h)) {
      h = g.QueryMap.GetItem(b.SearchQuery._query);
    }
    if (!MadCap.String.IsNullOrEmpty(h)) {
      h = decodeURIComponent(h);
    }
    var f = g.QueryMap.GetItem(b.SearchQuery._filter);
    if (f) {
      f = decodeURIComponent(f);
    }
    var e = g.QueryMap.GetItem(b.SearchQuery._pageIndex);
    if (e != null) {
      e = parseInt(e);
    }
    return new b.SearchQuery(h, f, e);
  };
  b.SearchResult = function (h, g, f, e) {
    this.Score = h;
    this.Title = g;
    this.Link = f;
    this.AbstractText = e;
  };
  b.Filters = function (f) {
    var e = f;
    this.Load = function (g) {
      e.LoadSearchFilters().then(
        function () {
          e.LoadAllConcepts(function () {
            g();
          });
        },
        null,
        null
      );
    };
  };
  b.SynonymFile = function (e, f) {
    this.Stemmer = f;
    this.WordToStem = new MadCap.Utilities.Dictionary(true);
    this.Directionals = new MadCap.Utilities.Dictionary(true);
    this.DirectionalStems = new MadCap.Utilities.Dictionary(true);
    this.Groups = new MadCap.Utilities.Dictionary(true);
    this.GroupStems = new MadCap.Utilities.Dictionary(true);
    this.GroupStemSources = new MadCap.Utilities.Dictionary(true);
    this.LoadSynonymFile(e);
  };
  var d = b.SynonymFile;
  d.prototype.LoadSynonymFile = function (E) {
    var D = MadCap.Dom.GetChildNodeByTagName(E, 'Groups', 0);
    var l = MadCap.Dom.GetChildNodeByTagName(E, 'Directional', 0);
    if (l != null) {
      var o = l.childNodes.length;
      for (var A = 0; A < o; A++) {
        var n = l.childNodes[A];
        if (n.nodeName == 'DirectionalSynonym') {
          var y = MadCap.Dom.GetAttribute(n, 'From');
          var m = MadCap.Dom.GetAttribute(n, 'To');
          var r = MadCap.Dom.GetAttributeBool(n, 'Stem', false);
          var g = MadCap.Dom.GetAttribute(n, 'FromStem');
          var p = MadCap.Dom.GetAttribute(n, 'ToStem');
          if (r) {
            if (g == null) {
              g = this.Stemmer.stemWord(y);
            }
          }
          if (p == null) {
            p = this.Stemmer.stemWord(m);
          }
          if (y != null && m != null) {
            if (r) {
              this.DirectionalStems.Add(g, p);
              this.WordToStem.Add(y, g);
              this.WordToStem.Add(m, p);
            } else {
              this.Directionals.Add(y, p);
              this.WordToStem.Add(m, p);
            }
          }
        }
      }
    }
    if (D != null) {
      var o = D.childNodes.length;
      for (var A = 0; A < o; A++) {
        var n = D.childNodes[A];
        if (n.nodeName == 'SynonymGroup') {
          var v = new Array();
          var w = new Array();
          var r = MadCap.Dom.GetAttributeBool(n, 'Stem', false);
          var t = n.childNodes.length;
          for (var z = 0; z < t; z++) {
            var C = n.childNodes[z];
            if (C.nodeType != 1) {
              continue;
            }
            v.push(C.firstChild.nodeValue);
          }
          for (var z = 0; z < t; z++) {
            var C = n.childNodes[z];
            if (C.nodeType != 1) {
              continue;
            }
            var F = MadCap.Dom.GetAttribute(C, 'Stem');
            if (F == null) {
              F = this.Stemmer.stemWord(C.firstChild.nodeValue);
            }
            this.WordToStem.Add(C.firstChild.nodeValue, F);
            w.push(F);
          }
          var u = v.length;
          for (var z = 0; z < u; z++) {
            var B = v[z];
            var f = w[z];
            for (var x = 0; x < u; x++) {
              var e = v[x];
              if (r) {
                var s = this.GroupStemSources.GetItem(B);
                if (s == null) {
                  s = new MadCap.Utilities.Dictionary();
                  this.GroupStemSources.Add(B, s);
                }
                s.Add(e, f);
              } else {
                var s = this.GroupStemSources.GetItem(B);
                if (s == null) {
                  s = new MadCap.Utilities.Dictionary();
                  this.Groups.Add(B, s);
                }
                s.Add(e, f);
              }
            }
          }
          var q = w.length;
          for (var z = 0; z < q; z++) {
            var f = w[z];
            for (var x = 0; x < q; x++) {
              var h = w[x];
              var s = this.GroupStems.GetItem(f);
              if (s == null) {
                s = new MadCap.Utilities.Dictionary();
                this.GroupStems.Add(f, s);
              }
              s.Add(h, f);
            }
          }
        }
      }
    }
  };
  d.prototype.AddSynonymStems = function (e, i, g) {
    var f = this.Directionals.GetItem(e);
    if (f != null) {
      g.AddUnique(f);
    }
    f = this.DirectionalStems.GetItem(i);
    if (f != null) {
      g.AddUnique(f);
    }
    var h = this.Groups.GetItem(e);
    if (h != null) {
      h.ForEach(function (j, k) {
        g.AddUnique(j);
        return true;
      });
    }
    h = this.GroupStems.GetItem(i);
    if (h != null) {
      h.ForEach(function (j, k) {
        g.AddUnique(j);
        return true;
      });
    }
  };
})();
/*
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 * Unlicensed use is strictly prohibited
 *
 * v13.2.6355.27565
 */
(function () {
  if (!MadCap.Utilities.HasRuntimeFileType('Topic')) {
    return;
  }
  MadCap.CreateNamespace('Topic');
  var j = MadCap.Topic;
  var z = MadCap.TextEffects;
  var A = MadCap.Utilities.HasRuntimeFileType('TriPane');
  j.Expand = function (O) {
    var P = new z.ExpandingControl(O.parentNode);
    P.Toggle();
  };
  j.DropDown = function (O) {
    var P = new z.DropDownControl(O.parentNode.parentNode);
    P.Toggle();
  };
  j.Toggle = function (O) {
    var P = new z.TogglerControl(O);
    P.Toggle();
  };
  j.ThumbPopup_Click = function (O) {
    var P = j.ShowThumbnailPopup(O, this, 'click');
    if (O.preventDefault) {
      O.preventDefault();
    }
  };
  j.ThumbPopup_Hover = function (O) {
    var P = j.ShowThumbnailPopup(O, this, 'mouseleave');
  };
  j.ShowThumbnailPopup = function (aq, ar, am) {
    var al = 10;
    var ag = 1;
    var ac = 10;
    var S = $(ar).children('img')[0];
    var af = parseInt(MadCap.Dom.Dataset(S, 'mcWidth'));
    var Z = parseInt(MadCap.Dom.Dataset(S, 'mcHeight'));
    var O = Z / af;
    var ao = document.documentElement.clientWidth - (al + ag + ac) * 2;
    var ak = document.documentElement.clientHeight - (al + ag + ac) * 2;
    if (Z > ak) {
      Z = ak;
      af = Z / O;
    }
    if (af > ao) {
      af = ao;
      Z = af * O;
    }
    var U = new MadCap.Utilities.Url(document.location.href);
    var ap = $(S).offset().top;
    var au = $(S).offset().left;
    var ax = MadCap.Dom.GetAttribute(ar, 'href');
    var aj = MadCap.Dom.GetAttribute(ar, 'data-mc-popup-alt');
    var ae = Z + (ag + ac) * 2;
    var ab = af + (ag + ac) * 2;
    var aa = ap + S.offsetHeight / 2 - ae / 2;
    var W = au + S.offsetWidth / 2 - ab / 2;
    var V = MadCap.Dom.GetScrollPosition();
    var ah = V.Y;
    var Q = ah + document.documentElement.clientHeight;
    var at = V.X;
    var P = at + document.documentElement.clientWidth;
    var X = ah + al;
    var ai = at + al;
    var Y = Q - al;
    var R = P - al;
    if (aa < X) {
      aa = X;
    }
    if (W < ai) {
      W = ai;
    }
    if (aa + ae > Y) {
      aa = Y - ae;
    }
    if (W + ab > R) {
      W = R - ab;
    }
    if ($('.title-bar.sticky.is-stuck')) {
      if (aa < $('.title-bar.sticky.is-stuck').innerHeight()) {
        aa += $('.title-bar.sticky.is-stuck').innerHeight() - aa + al;
      }
    }
    var T = $('<div></div>');
    T.addClass('MCPopupContainer');
    var an = document.createElement('img');
    $(an).addClass('MCPopupFullImage');
    an.setAttribute('src', ax);
    an.setAttribute('alt', aj);
    an.setAttribute('tabindex', '0');
    T.bind(am, function () {
      MadCap.DEBUG.Log.AddLine(am);
      T.animate({ top: aw, left: ad }, 200, function () {
        T.remove();
      });
      $(an).animate({ width: S.offsetWidth, height: S.offsetHeight }, 200);
      $(av).animate({ opacity: 0 }, 200, function () {
        MadCap.TextEffects.RemoveBackgroundTint();
      });
    });
    T.bind('keydown', function (ay) {
      var ay = ay || window.event;
      if (ay.keyCode != 27 && ay.keyCode != 13) {
        return;
      }
      T.remove();
      MadCap.TextEffects.RemoveBackgroundTint();
    });
    T.append(an);
    document.body.appendChild(T[0]);
    var aw = ap - (ag + ac);
    var ad = au - (ag + ac);
    if (MadCap.IsIBooks()) {
      $idealContainer = $(ar).parentsUntil('body').last();
      af = $idealContainer[0].offsetWidth * 0.9;
      Z = af * O;
      W = $idealContainer.offset().left;
      T.css({ top: aw, left: ad }).animate(
        { top: aa, left: W, width: af, height: Z },
        200
      );
    } else {
      T.css({ top: aw, left: ad, zIndex: '1' }).animate(
        { top: aa, left: W },
        200
      );
    }
    $(an)
      .css({ width: S.offsetWidth, height: S.offsetHeight })
      .animate({ width: af, height: Z }, 200);
    var av = MadCap.TextEffects.AddBackgroundTint(null, document.body);
    $(av).animate({ opacity: 0.5 }, 200);
    an.focus();
  };
  j.HelpControl_Click = function (P) {
    var O = this;
    j.GetHelpControlLinks(
      this,
      function (W) {
        var R = new MadCap.Utilities.Url(document.location.href);
        for (var S = W.length - 1; S >= 0; S--) {
          var Q = W[S];
          Q.Title = 't' in Q ? Q.t : 'Title' in Q ? Q.Title : null;
          var T = 'Url' in Q ? Q.Url : 'Link' in Q ? Q.Link : null;
          if (T != null && typeof T != 'string') {
            if (T.FullPath == R.FullPath) {
              W.Remove(S);
            }
            T = T.ToRelative(R);
            Q.Link = T.FullPath;
          }
        }
        if (!$(O).hasClass('MCHelpControl-Related')) {
          W.sort(function (Y, X) {
            return Y.Title.localeCompare(X.Title);
          });
        }
        var U = new MadCap.Utilities.Dictionary();
        for (var S = W.length - 1; S >= 0; S--) {
          var V = W[S];
          var T = V.Link;
          if (U.GetItem(T)) {
            W.Remove(S);
            continue;
          }
          U.Add(V.Link, true);
        }
        z.CreateLinkListPopup(W, document.body, P.pageY, P.pageX, O);
      },
      null
    );
    P.preventDefault();
    P.stopPropagation();
  };
  j.GetHelpControlLinks = function (U, Y) {
    var X = new Array();
    var Q = $(U);
    if (p && !p.InPreviewMode) {
      if (N()) {
        var T = Q.attr('data-mc-keywords');
        if (T != null) {
          if (T == '') {
            Y(X);
          }
          var W = T.split(';');
          MadCap.Utilities.AsyncForeach(
            W,
            function (Z, aa) {
              p.FindIndexEntry(Z, function (ab, ac) {
                if (ac != null && ac.linkList) {
                  X = X.concat(ac.linkList);
                }
                aa();
              });
            },
            function () {
              Y(p.SortLinkList(X));
            }
          );
          return;
        } else {
          var S = Q.attr('data-mc-concepts');
          if (S != null) {
            p.GetConceptsLinks(S).then(Y);
            return;
          }
        }
      }
    }
    var P = Q.attr('data-mc-topics');
    if (P != null) {
      topicPairs = P.split('||');
      if (topicPairs == '') {
        Y(X);
      }
      for (var V = 0, R = topicPairs.length; V < R; V++) {
        var O = topicPairs[V].split('|');
        X[X.length] = { Title: O[0], Link: O[1] };
      }
    }
    Y(X);
  };
  j.Hyperlink_Onclick = function (S) {
    var R = $(this);
    if (
      R.hasClass('MCTopicPopup') ||
      R.hasClass('MCPopupThumbnailLink') ||
      R.hasClass('MCHelpControl') ||
      R.hasClass('reply-comment-button')
    ) {
      return;
    }
    var O = MadCap.Dom.GetAttribute(this, 'href');
    if (
      O == null ||
      MadCap.String.StartsWith(O, 'http:') ||
      MadCap.String.StartsWith(O, 'https:')
    ) {
      return;
    }
    var Q = MadCap.Dom.GetAttribute(this, 'target');
    if (Q != null) {
      return;
    }
    if (N()) {
      var P = new MadCap.Utilities.Url(document.location.href);
      if (MadCap.String.StartsWith(O, '#')) {
        P = new MadCap.Utilities.Url(P.PlainPath + O);
      } else {
        if (MadCap.String.Contains(O, 'javascript')) {
          return;
        } else {
          P = P.ToFolder().CombinePath(O);
        }
      }
      MadCap.Utilities.CrossFrame.PostMessageRequest(
        parent,
        'navigate-topic',
        [P.FullPath],
        null
      );
      S.preventDefault();
    } else {
      MadCap.Utilities.Url.OnNavigateTopic.call(R, S);
    }
  };
  j.ScrollToBookmark = function (R) {
    R = R.replace(/([ #;?%&,.+*~\':"!^$[\]()=>|\/@])/g, '\\$1');
    var O = $('#' + R);
    if (O.length == 0) {
      O = $("[name = '" + R + "']");
    }
    if (O.length > 0) {
      q(O[0], false);
      var Q = O.offset().top;
      if ($('.title-bar.sticky').length > 0) {
        var P = $('.title-bar.sticky').innerHeight();
        $('html, body').animate({ scrollTop: Q - P }, 0);
      } else {
        $('html, body').animate({ scrollTop: Q });
      }
    }
  };
  $(function (O) {
    MadCap.Utilities.LoadHandlers.MadCapTopic = j.Init;
    s(O);
  });
  function C(O) {
    M();
  }
  function M() {
    var O = $('.feedback-comments-wrapper');
    if (p && p.IsResponsive && parent != window) {
      O.addClass('feedback-embedded');
      MadCap.Utilities.CrossFrame.PostMessageRequest(
        parent,
        'get-parent-window-width',
        null,
        function (Q) {
          var P = parseInt(Q[0]);
          if (p.IsTabletLayout(P)) {
            if (!O.hasClass('responsive')) {
              O.addClass('responsive');
            }
          } else {
            if (O.hasClass('responsive')) {
              O.removeClass('responsive');
            }
          }
        }
      );
    } else {
      if (O.hasClass('responsive')) {
        O.removeClass('responsive');
      }
    }
  }
  function s(O) {
    $(window).resize(C);
    $(window).hashchange(g);
    j.Init(document);
  }
  j.Init = function (Q) {
    $('input, textarea', Q).placeholder();
    if (N() || B()) {
      $('.MCWebHelpFramesetLink', Q).hide();
    }
    $(Q).on('click', 'a, area', MadCap.Topic.Hyperlink_Onclick);
    $('.MCPopupThumbnailPopup', Q).click(MadCap.Topic.ThumbPopup_Click);
    $('.MCPopupThumbnailHover', Q).mouseover(MadCap.Topic.ThumbPopup_Hover);
    $('a.MCHelpControl', Q).click(MadCap.Topic.HelpControl_Click);
    $('.print-button', Q).click(function (X) {
      window.print();
    });
    $('.expand-all-button', Q).click(function (Y) {
      var X = $(this);
      if (X.hasClass('expand-all-button')) {
        MadCap.TextEffects.TextEffectControl.ExpandAll('open');
      } else {
        if (X.hasClass('collapse-all-button')) {
          MadCap.TextEffects.TextEffectControl.ExpandAll('close');
        }
      }
      MadCap.Utilities.ToggleButtonState(this);
    });
    $('.remove-highlight-button', Q).click(function (X) {
      H();
    });
    $('.previous-topic-button', Q).click(function (X) {
      MadCap.Utilities.CrossFrame.PostMessageRequest(
        parent,
        'navigate-previous'
      );
    });
    $('.next-topic-button', Q).click(function (X) {
      MadCap.Utilities.CrossFrame.PostMessageRequest(parent, 'navigate-next');
    });
    if (MadCap.String.Contains(navigator.userAgent, 'iphone', false)) {
      window.scrollTo(0, 1);
    }
    if (MadCap.IsIOS() && A) {
      var P = $("<div id='ios-wrapper'></div>").appendTo(document.body);
      var U = P[0];
      for (var T = document.body.childNodes.length - 2; T >= 0; T--) {
        var R = document.body.childNodes[T];
        U.insertBefore(R, U.firstChild);
      }
    }
    d();
    var W = parent;
    if (B()) {
      W = parent.parent;
    }
    var S = $(document.documentElement).attr('data-mc-path-to-help-system');
    var V = 'Data/HelpSystem.xml';
    if (S) {
      V = S + V;
    }
    var O = new MadCap.Utilities.Url(V);
    MadCap.WebHelp.HelpSystem.LoadHelpSystem(O.FullPath).done(function (X) {
      p = X;
      x();
    });
  };
  function h() {
    var P = $('ul[data-mc-toc]');
    var O;
    if (!A) {
      O = e();
    }
    P.each(function () {
      var Q = this;
      var R = new MadCap.WebHelp.TocPane('Toc', p, this, true);
      R._TocType = O.TocType;
      R._TocPath = O.TocType == 'Toc' ? O.TocPath : O.BrowseSequencesPath;
      R._TocHref = O.Href;
      R.Init(function () {
        if (MadCap.Dom.GetAttributeBool(Q, 'data-mc-top-nav-menu', false)) {
          $(window).trigger('resize');
        }
      });
    });
  }
  function F() {
    var P = $('div.breadcrumbs[data-mc-toc]');
    var O;
    if (!A) {
      O = e();
    }
    P.each(function () {
      var Q = new MadCap.WebHelp.Breadcrumbs('Toc', p, this, true);
      Q._TocType = O.TocType;
      Q._TocPath = O.TocType == 'Toc' ? O.TocPath : O.BrowseSequencesPath;
      Q._TocHref = O.Href;
      Q.Init();
    });
  }
  function r() {
    var P = $('div.miniToc[data-mc-toc]');
    var O;
    if (!A) {
      O = e();
    }
    P.each(function () {
      var Q = new MadCap.WebHelp.MiniToc('Toc', p, this);
      Q._TocType = O.TocType;
      Q._TocPath = O.TocType == 'Toc' ? O.TocPath : O.BrowseSequencesPath;
      Q._TocHref = O.Href;
      Q.Init();
    });
  }
  function e() {
    var O = p.GetMasterHelpsystem().GetContentPath();
    var R = new MadCap.Utilities.Url(document.location.href);
    var Q = R.ToFolder().CombinePath(O);
    var P = R.ToRelative(Q);
    return p.GetTocData(new MadCap.Utilities.Url(P.FullPath));
  }
  function x() {
    var P = MadCap.Utilities.Url.CurrentHash();
    if (P.length > 0) {
      var O = new MadCap.Utilities.Url(P.substring(1));
      J(O.ToNoQuery().FullPath);
      if (!$('html').hasClass('pulseTopic')) {
        $(window).trigger('hashchange');
      }
    }
    m();
    h();
    F();
    r();
    if (p && p.LiveHelpEnabled) {
      f = MadCap.WebHelp.LoadFeedbackController(p.LiveHelpServer);
      f.Init(function () {
        if (f.FeedbackActive) {
          MadCap.Utilities.CrossFrame.PostMessageRequest(
            parent,
            'get-csh-id',
            null,
            function (Q) {
              var R = Q != null ? Q[0] : null;
              if (l != null) {
                $(document.documentElement).addClass('has-topic');
                f.LogTopic(l, R, function () {
                  var S = $('.feedback-comments-wrapper');
                  if (!B() && !b() && !c()) {
                    if (!f.PulseEnabled) {
                      S.removeClass('hidden');
                      a =
                        $('#new-comment-form').attr(
                          'data-comment-length-exceeded-message'
                        ) ||
                        'The maximum comment length was exceeded by {n} characters.';
                      f.GetAnonymousEnabled(p.LiveHelpOutputId, function (U) {
                        y = U;
                        if (U) {
                          $(document.documentElement).addClass(
                            'feedback-anonymous-enabled'
                          );
                        }
                      });
                      var T = MadCap.Utilities.Store.getItem(
                        'LiveHelpUsername'
                      );
                      $('.username').val(T);
                      $('.comment-submit').click(G);
                      $('.feedback-comments-wrapper .comments').on(
                        'click',
                        '.reply-comment-button',
                        K
                      );
                      t();
                    } else {
                      if (f.PulseActive) {
                        k(function (U) {
                          if (U) {
                            var V = f.PulseServer + U;
                            L(V);
                          } else {
                            f.GetPulseStreamID(l, function (W) {
                              if (W == '00000000-0000-0000-0000-000000000000') {
                                return;
                              }
                              var X =
                                f.PulseServer +
                                'streams/' +
                                W +
                                '/activities?frame=stream';
                              L(X);
                            });
                          }
                        });
                      }
                    }
                  }
                });
              }
            }
          );
        }
      });
      M();
    }
  }
  function g(P) {
    var O = new MadCap.Utilities.Url(document.location.href);
    if (!MadCap.String.IsNullOrEmpty(O.Fragment)) {
      var Q = O.Fragment.substring(1);
      Q = MadCap.Utilities.Url.StripInvalidCharacters(Q);
      j.ScrollToBookmark(Q);
    }
  }
  function J(O) {
    O = MadCap.Utilities.Url.StripInvalidCharacters(O);
    var P = $("[name='" + O + "']");
    if (P.length > 0) {
      q(P[0], false);
    }
  }
  function N() {
    return (
      window.name == 'topic' && !MadCap.Utilities.HasRuntimeFileType('Default')
    );
  }
  function B() {
    return (
      window.name == 'MCPopup' &&
      !MadCap.Utilities.HasRuntimeFileType('Default')
    );
  }
  function b() {
    return $('html').hasClass('templateTopic');
  }
  function c() {
    var O = $(document.documentElement).attr('data-mc-community-features');
    return O && O.toLowerCase() == 'disabled';
  }
  function m() {
    MadCap.Utilities.CrossFrame.PostMessageRequest(
      parent,
      'get-href',
      null,
      function (R) {
        if (R) {
          var P = new MadCap.Utilities.Url(R[0]);
          var O = new MadCap.Utilities.Url(P.Fragment.substring(1));
          var Q = P.QueryMap.GetItem('BrowseSequencesPath');
          p.SetBrowseSequencePath(Q, O);
        }
      }
    );
  }
  function G(R) {
    var O = $(this).closest('.comment-form-wrapper');
    var Q = null;
    var V = O.children('.username-field').val();
    var P = O.children('.subject-field').val();
    var U = O.find('.body-field').val();
    var S = null;
    var T = O.parent();
    if (T.hasClass('comment')) {
      S = T.attr('data-mc-comment-id');
    }
    o(V, P, U, S);
  }
  function o(T, P, S, R) {
    if (y) {
      MadCap.Utilities.Store.setItem('LiveHelpUsername', T);
      try {
        f.AddComment(l, null, T, P, S, R, t);
      } catch (O) {
        var Q = a.replace(/{n}/g, O.Data.ExceedAmount);
        alert(Q);
      }
    } else {
      MadCap.Utilities.CrossFrame.PostMessageRequest(
        parent,
        'login-user',
        null,
        function (X) {
          var W = X[0];
          if (W != null) {
            try {
              f.AddComment(l, W, T, P, S, R, t);
            } catch (U) {
              var V = a.replace(/{n}/g, U.Data.ExceedAmount);
              alert(V);
            }
          }
        }
      );
    }
  }
  function K(P) {
    P.preventDefault();
    var Q = $(this).closest('.comment');
    if (Q.children('.comment-form-wrapper')[0] != null) {
      return;
    }
    var O = $('#new-comment-form').clone();
    O.attr('id', null);
    O.children('.comment-submit').click(G);
    Q.children('.buttons').after(O);
    O.hide().slideDown();
  }
  function t() {
    MadCap.Utilities.CrossFrame.PostMessageRequest(
      parent,
      'get-user-guid',
      null,
      function (P) {
        var O = P[0];
        f.GetTopicComments(l, O, null, function (Q) {
          var S = MadCap.Utilities.Xhr.LoadXmlString(Q);
          var R = $('.comments');
          R.children().not('.mc-template').remove();
          D(S.documentElement, R);
        });
      }
    );
  }
  function D(Z, W) {
    var Y = $(Z).children('Comment');
    var O = $('.comments .comment.mc-template');
    for (var V = 0, R = Y.length; V < R; V++) {
      var aa = $(Y[V]);
      var U = aa.attr('User');
      var X = aa.attr('DateUTC') || aa.attr('Date');
      var S = aa.attr('Subject');
      var Q = aa.attr('CommentID');
      var P = aa.children('Body').text();
      var T = O.clone();
      T.removeClass('mc-template');
      T.attr('data-mc-comment-id', Q);
      $('.username', T).text(U);
      $('.timestamp', T).text(X);
      $('.subject', T).text(S);
      $('.body', T).text(P);
      $(W).append(T);
      D(aa.children('Comments')[0], T);
    }
  }
  function k(O) {
    MadCap.Utilities.CrossFrame.PostMessageRequest(
      parent,
      'get-href',
      null,
      function (S) {
        var P = null;
        if (S) {
          var R = new MadCap.Utilities.Url(decodeURIComponent(S[0]));
          var Q = new MadCap.Utilities.Url(R.Fragment.substring(1));
          P = R.QueryMap.GetItem('PulsePath');
        }
        O(P);
      }
    );
  }
  function L(Q) {
    var O = $('.feedback-comments-wrapper');
    O.empty();
    var P = $(
      "<iframe name='topiccomments-html5' class='pulse-frame pulse-loading' title='Topic Comments' frameborder='0'></iframe>"
    );
    P.appendTo(O);
    if (!($.browser.msie && parseInt($.browser.version, 10) === 7)) {
      P.attr('onload', "this.className='pulse-frame';");
    }
    P.attr('src', Q);
    if (!u) {
      O.removeClass('hidden');
    }
  }
  function H() {
    for (var O = 1; O <= 10; O++) {
      $('body').removeHighlight('SearchHighlight' + O);
    }
  }
  function d() {
    function O(P) {
      if (typeof P.nextElementSibling == 'undefined') {
        return P.nextSibling == null || P.nextSibling.nodeType == 1
          ? P.nextSibling
          : O(P.nextSibling);
      } else {
        return P.nextElementSibling;
      }
    }
    MadCap.Utilities.CrossFrame.PostMessageRequest(
      parent,
      'get-href',
      null,
      function (X) {
        if (X) {
          var Q = new MadCap.Utilities.Url(X[0]);
          var T = Q.QueryMap.GetItem('Highlight');
          if (MadCap.String.IsNullOrEmpty(T)) {
            return;
          }
          var U = T.match(/"[^"]*"/g);
          if (U != null) {
            for (var V = 0; V < U.length; V++) {
              T = T.replace(U[V], '');
            }
          }
          var Y = T.replace('"', '').split(' ');
          for (var W = 0; W < Y.length; W++) {
            if (Y[W] == '') {
              Y.splice(Y[W], 1);
              W--;
            }
          }
          if (U != null) {
            for (var V = 0; V < U.length; V++) {
              Y.push(U[V].replace(/"/g, ''));
            }
          }
          for (var W = 0; W < Y.length; W++) {
            if (
              $.inArray(Y[W].toLowerCase(), MadCap.Utilities.StopWords) != -1
            ) {
              Y.splice(W, 1);
              W--;
            }
          }
          for (var Z = 0; Z < Y.length; Z++) {
            var R = Array(
              "*[class*='MCExpandingBody']",
              "*[class*='MCDropDownHotSpot']",
              '*[data-mc-target-name]'
            );
            for (var ab = 0; ab < R.length; ab++) {
              var P = $(R[ab]);
              for (var S = 0; S < P.length; S++) {
                var aa = O(P[S].parentElement);
                if (
                  (P[S].textContent != null &&
                    P[S].textContent
                      .toLowerCase()
                      .indexOf(Y[Z].toLowerCase()) >= 0) ||
                  (aa != null &&
                    aa.textContent != null &&
                    aa.textContent.toLowerCase().indexOf(Y[Z].toLowerCase()) >=
                      0)
                ) {
                  q(ab != 2 ? P[S] : P[S].firstChild);
                }
              }
            }
            $('body').highlight(
              Y[Z],
              'SearchHighlight SearchHighlight' + (Z + 1)
            );
          }
        }
      }
    );
  }
  function i(R, P, O, Q) {
    if (R == '') {
      return;
    }
    I(document.body, R, P, O, Q);
    if (E && E.offsetTop > document.documentElement.clientHeight) {
      document.documentElement.scrollTop = E.offsetTop;
    }
  }
  function w(R) {
    for (var Q = R.childNodes.length - 1; Q >= 1; Q--) {
      var O = R.childNodes[Q];
      var P = O.previousSibling;
      if (O.nodeType == 3 && P.nodeType == 3) {
        P.nodeValue = P.nodeValue + O.nodeValue;
        R.removeChild(O);
      }
    }
    for (var Q = 0; Q < R.childNodes.length; Q++) {
      w(R.childNodes[Q]);
    }
  }
  function I(aa, R, S, Y, X) {
    var ad = null;
    if (X == 'NGram') {
      ad = new RegExp(R, 'g' + (Y ? '' : 'i'));
    } else {
      var P = R.replace(/([*^$+?.()[\]{}|\\])/g, '\\$1');
      ad = new RegExp(
        '(^|\\s|[.,;!#$/:?\'"()[\\]{}|=+*_\\-\\\\])' +
          P +
          '($|\\s|[.,;!#$/:?\'"()[\\]{}|=+*_\\-\\\\])',
        'g' + (Y ? '' : 'i')
      );
    }
    for (var V = aa.childNodes.length - 1; V >= 0; V--) {
      var Q = aa.childNodes[V];
      I(Q, R, S, Y, X);
      if (Q.nodeType != 3 || Q.parentNode.nodeName == 'SCRIPT') {
        continue;
      }
      var U = Q;
      var ac = U.nodeValue;
      for (var W = ad.exec(ac); W != null; W = ad.exec(ac)) {
        var Z = W.index + (X == 'NGram' ? 0 : W[1].length);
        var O = Z + R.length;
        var ab = document.createElement('span');
        ab.className = 'highlight';
        ab.style.fontWeight = 'bold';
        ab.style.backgroundColor = S.split(',')[0];
        ab.style.color = S.split(',')[1];
        var T = document.createElement('span');
        T.className = 'SearchHighlight' + (v + 1);
        T.appendChild(document.createTextNode(ac.substring(Z, O)));
        ab.appendChild(T);
        U.nodeValue = ac.substring(0, Z);
        U.parentNode.insertBefore(ab, U.nextSibling);
        U.parentNode.insertBefore(
          document.createTextNode(ac.substring(O, ac.length)),
          ab.nextSibling
        );
        U = U.nextSibling.nextSibling;
        ac = U.nodeValue;
        if (E == null || ab.offsetTop < E.offsetTop) {
          E = ab;
        }
        q(ab);
      }
    }
  }
  function q(Q, O) {
    if (typeof O == 'undefined') {
      O = true;
    }
    var W = false;
    for (var V = Q.parentNode; V.nodeName != 'BODY'; V = V.parentNode) {
      var Z = $(V);
      if (Z.hasClass('MCExpanding')) {
        var T = z.TextEffectControl.FindControl(Z[0]);
        if (T == null) {
          T = new MadCap.Topic.ExpandingControl(V);
        }
        T.Open(O);
        W = true;
      } else {
        if (Z.hasClass('MCDropDown')) {
          var T = z.TextEffectControl.FindControl(Z[0]);
          if (T == null) {
            T = new MadCap.Topic.DropDownControl(V);
          }
          T.Open(O);
          W = true;
        } else {
          var U = $(V).attr('data-mc-target-name');
          if (U != null) {
            var Y = MadCap.Dom.GetElementsByClassName(
              'MCToggler',
              null,
              document.body
            );
            for (var S = 0, P = Y.length; S < P; S++) {
              var X = $(Y[S]).attr('data-mc-targets').split(';');
              var aa = false;
              for (var R = 0; R < X.length; R++) {
                if (X[R] == U) {
                  aa = true;
                  break;
                }
              }
              if (!aa) {
                continue;
              }
              var T = z.TextEffectControl.FindControl(Y[S]);
              if (T == null) {
                T = new MadCap.Topic.TogglerControl(Y[S]);
              }
              T.Open(O);
              W = true;
              break;
            }
          }
        }
      }
    }
    return W;
  }
  MadCap.Utilities.CrossFrame.AddMessageHandler(function (U, Q, T) {
    var S = { Handled: false, FireResponse: true };
    if (U == 'print') {
      window.focus();
      window.print();
      S.Handled = true;
    } else {
      if (U == 'expand-all') {
        MadCap.TextEffects.TextEffectControl.ExpandAll('open');
        S.Handled = true;
      } else {
        if (U == 'collapse-all') {
          MadCap.TextEffects.TextEffectControl.ExpandAll('close');
          S.Handled = true;
        } else {
          if (U == 'get-topic-id') {
            T[T.length] = l;
            S.Handled = true;
          } else {
            if (U == 'get-topic-url') {
              T[T.length] = document.location.href;
              S.Handled = true;
            } else {
              if (U == 'remove-highlight') {
                H();
                S.Handled = true;
              } else {
                if (U == 'get-bs-path') {
                  var P = new MadCap.Utilities.Url(document.location.href);
                  var R = P.QueryMap.GetItem('BrowseSequencePath');
                  if (R == null) {
                    R = MadCap.Dom.Dataset(
                      document.documentElement,
                      'mcBrowseSequencePath'
                    );
                  }
                  T[T.length] = R;
                  T[T.length] = P.FullPath;
                  S.Handled = true;
                } else {
                  if (U == 'reload-pulse') {
                    MadCap.Utilities.CrossFrame.PostMessageRequest(
                      frames['topiccomments-html5'],
                      'reload'
                    );
                    S.Handled = true;
                  } else {
                    if (U == 'logout-complete') {
                      MadCap.Utilities.CrossFrame.PostMessageRequest(
                        parent,
                        'logout-complete'
                      );
                      S.Handled = true;
                    } else {
                      if (U == 'set-pulse-login-id') {
                        if (f != null) {
                          f.PulseUserGuid = Q[0];
                        }
                        MadCap.Utilities.CrossFrame.PostMessageRequest(
                          parent,
                          'set-pulse-login-id',
                          Q
                        );
                        S.Handled = true;
                      } else {
                        if (U == 'resize-pulse') {
                          var O = $('.pulse-frame');
                          O.attr('scrolling', 'no');
                          O.css('overflow', 'hidden');
                          O.height(Q[1]);
                          S.Handled = true;
                        } else {
                          if (U == 'show-comments') {
                            u = false;
                            S.Handled = true;
                          } else {
                            if (U == 'hide-comments') {
                              u = true;
                              S.Handled = true;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return S;
  }, null);
  var n = new Array(
    '#ffff66,#000000',
    '#a0ffff,#000000',
    '#99ff99,#000000',
    '#ff9999,#000000',
    '#ff66ff,#000000',
    '#880000,#ffffff',
    '#00aa00,#ffffff',
    '#886800,#ffffff',
    '#004699,#ffffff',
    '#990099,#ffffff'
  );
  var v = 0;
  var E = null;
  var p = null;
  var f = null;
  var u = true;
  var y = false;
  var l = MadCap.Dom.Dataset(document.documentElement, 'mcLiveHelp');
  var a = null;
})();

//    Syntax:
//    function MadCap.OpenHelp(id, skinName, searchQuery, firstPick)
//
//    id          - Identifier that was created in Flare. This can be either the identifier name or value. The topic and skin
//                  that is associated with the id will be used. If no skin is associated with the id, skinName will be used.
//                  Alternatively, id may contain a topic path. In this case, the specified topic will be loaded with the skin
//                  that is specified in skinName. Specify null to use the help system's default starting topic.
//    skinName    - This is a string indicating the name of the skin to use when opening the help system. Specify null to use
//                  the default skin or to use the skin that is associated with id. If a skin is associated with id AND a skin
//                  is specified in skinName, skinName will take precedence.
//    searchQuery - This is a string indicating the search query used when opening the help system. If a search query is specified,
//                  the help system will start with the search pane open and the search query executed. Specify null to open
//                  the help system without a search query.
//    firstPick   - This is a boolean indicating whether to automatically open the topic from the first search result that is
//                  returned by the search query (see searchQuery parameter). Use null if no search query was specified.
//
//    Examples:
//
//    In the following example, topic and skin associated with "FILE_NEW" will be used:
//    MadCap.OpenHelp('FILE_NEW', null, null, null);
//
//    In the following example, topic associated with "FILE_NEW" will be used. "BlueSkin" will override the skin associated with "FILE_NEW":
//    MadCap.OpenHelp('FILE_NEW', 'BlueSkin', null, null);
//
//    In the following example, topic and skin associated with identifier value 1 will be used:
//    MadCap.OpenHelp(1, null, null, null);
//
//    In the following example, topic associated with identifier value 1 will be used. "BlueSkin" will override the skin associated with identifier value 1:
//    MadCap.OpenHelp(1, 'BlueSkin', null, null);
//
//    In the following example, "Company/Employees.htm" will be used with the default skin:
//    MadCap.OpenHelp('Company/Employees.htm', null, null, null);
//
//    In the following example, both the default topic and skin will be used:
//    MadCap.OpenHelp(null, null, null, null);
//
//    In the following example, the default topic will be used with "BlueSkin":
//    MadCap.OpenHelp(null, 'BlueSkin', null, null);
//
//    In the following example, both the default topic and skin will be used. The help system will be started with the search pane
//    displaying the search results for the query 'quarterly report'. The topic from the first result will not be opened:
//    MadCap.OpenHelp(null, null, 'quarterly report', false);
//
//    In the following example, both the default topic and skin will be used. The help system will be started with the search pane
//    displaying the search results for the query 'quarterly report'. The topic from the first result will be opened:
//    MadCap.OpenHelp(null, null, 'quarterly report', true);

(function () {
  var helpSystemName = 'batch_orchs.htm';

  MadCap.OpenHelp = function (
    id,
    skinName,
    searchQuery,
    firstPick,
    pathToHelpSystem
  ) {
    var cshFileName =
      helpSystemName.substring(0, helpSystemName.lastIndexOf('.')) + '.js';
    var webHelpPath = null;
    var webHelpFile = null;
    var cshFileUrl = new MadCap.Utilities.Url(helpSystemName);

    if (pathToHelpSystem == null) {
      var scriptNodes = document.getElementsByTagName('script');
      var found = false;

      for (var i = 0; i < scriptNodes.length; i++) {
        var src = scriptNodes[i].src;
        var srcUrl = new MadCap.Utilities.Url(MadCap.String.Trim(src));

        if (
          srcUrl.NameWithExtension.toLowerCase() == cshFileName.toLowerCase()
        ) {
          var locUrl = new MadCap.Utilities.Url(
            document.location.href
          ).ToFolder();

          webHelpPath = locUrl.AddFile(srcUrl);
          webHelpPath = webHelpPath.ToFolder();

          found = true;

          break;
        }
      }

      if (!found) throw 'CSH failed: could not find MadCap CSH script in page.';
    } else {
      webHelpPath = new MadCap.Utilities.Url(pathToHelpSystem);
    }

    webHelpFile = webHelpPath.AddFile(cshFileUrl);

    var webHelpPath = webHelpFile.ToFolder().FullPath;
    var helpSystemFile = webHelpPath + 'Data/HelpSystem.xml';
    var helpSystem = new MadCap.WebHelp.HelpSystem(
      null,
      null,
      helpSystemFile,
      null,
      null
    );

    helpSystem.Load(function () {
      helpSystem.LookupCSHID(id, function (idInfo) {
        function OnGetSkinComplete() {
          var cshString = webHelpFile.FullPath;

          if (id) cshString += '#cshid=' + id;

          if (skinName) {
            if (cshString.indexOf('#') != -1) cshString += '&';
            else cshString += '#';

            cshString += 'skinName=' + skinName;
          }

          if (searchQuery) {
            if (cshString.indexOf('#') != -1) cshString += '&';
            else cshString += '#';

            cshString += 'searchQuery=' + searchQuery;

            if (firstPick) cshString += '&firstPick=true';
          }

          var win = window.open(
            cshString,
            '_MCWebHelpCSH',
            browserOptions + size
          );

          // Bug 32051: Windows 7 64-bit is returning null from the call to window.open().
          if (win != null) win.focus();
        }

        skinName = skinName || idInfo.Skin;

        // Browser setup options

        var browserOptions = '';
        var size = '';

        if (skinName) {
          var skin = helpSystem.GetSkin(skinName);

          if (skin) {
            var useDefault = MadCap.String.ToBool(
              skin.UseDefaultBrowserSetup,
              true
            );

            if (!useDefault) {
              var toolbar = 'no';
              var menu = 'no';
              var locationBar = 'no';
              var statusBar = 'no';
              var resizable = 'no';
              var setup = skin.BrowserSetup;

              if (setup) {
                toolbar = setup.indexOf('Toolbar') > -1 ? 'yes' : 'no';
                menu = setup.indexOf('Menu') > -1 ? 'yes' : 'no';
                locationBar = setup.indexOf('LocationBar') > -1 ? 'yes' : 'no';
                statusBar = setup.indexOf('StatusBar') > -1 ? 'yes' : 'no';
                resizable = setup.indexOf('Resizable') > -1 ? 'yes' : 'no';
              }

              browserOptions =
                'toolbar=' +
                toolbar +
                ', menubar=' +
                menu +
                ', location=' +
                locationBar +
                ', status=' +
                statusBar +
                ', resizable=' +
                resizable;
            }

            var windowSize = LoadSize(skin);

            if (windowSize)
              size =
                ', top=' +
                windowSize.topPx +
                ', left=' +
                windowSize.leftPx +
                ', width=' +
                windowSize.widthPx +
                ', height=' +
                windowSize.heightPx;
          }

          OnGetSkinComplete();
        } else {
          OnGetSkinComplete();
        }
      });
    });
  };

  function LoadSize(skin) {
    var useDefaultSize = MadCap.String.ToBool(skin.UseBrowserDefaultSize, true);

    if (useDefaultSize) return null;

    var topPx = MadCap.String.ToInt(skin.Top, 0);
    var leftPx = MadCap.String.ToInt(skin.Left, 0);
    var bottomPx = MadCap.String.ToInt(skin.Bottom, 0);
    var rightPx = MadCap.String.ToInt(skin.Right, 0);
    var widthPx = MadCap.String.ToInt(skin.Width, 800);
    var heightPx = MadCap.String.ToInt(skin.Height, 600);

    var anchors = skin.Anchors;

    if (anchors) {
      var aTop = anchors.indexOf('Top') > -1 ? true : false;
      var aLeft = anchors.indexOf('Left') > -1 ? true : false;
      var aBottom = anchors.indexOf('Bottom') > -1 ? true : false;
      var aRight = anchors.indexOf('Right') > -1 ? true : false;
      var aWidth = anchors.indexOf('Width') > -1 ? true : false;
      var aHeight = anchors.indexOf('Height') > -1 ? true : false;
    }

    if (aLeft && aRight) widthPx = screen.width - (leftPx + rightPx);
    else if (!aLeft && aRight) leftPx = screen.width - (widthPx + rightPx);
    else if (aWidth) leftPx = screen.width / 2 - widthPx / 2;

    if (aTop && aBottom) heightPx = screen.height - (topPx + bottomPx);
    else if (!aTop && aBottom) topPx = screen.height - (heightPx + bottomPx);
    else if (aHeight) topPx = screen.height / 2 - heightPx / 2;

    //

    var windowSize = {};
    windowSize.topPx = topPx;
    windowSize.leftPx = leftPx;
    windowSize.widthPx = widthPx;
    windowSize.heightPx = heightPx;

    return windowSize;
  }
})();
