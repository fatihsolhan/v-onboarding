import { ref as tt, onMounted as le, onUnmounted as In, defineComponent as ce, inject as X, computed as H, watch as Ln, withDirectives as zn, openBlock as D, createElementBlock as k, createElementVNode as V, renderSlot as fe, toDisplayString as St, createCommentVNode as ot, vShow as Nn, provide as Y, resolveComponent as Fn, createBlock as Vn } from "vue";
import { createPopper as Mn } from "@popperjs/core";
function wt(r) {
  return typeof r == "string" ? document.querySelector(r) : typeof r == "function" ? r() : null;
}
const Ct = {
  popper: {},
  overlay: {
    enabled: !0,
    padding: 0,
    borderRadius: 0
  },
  scrollToStep: {
    enabled: !0,
    options: {
      behavior: "smooth",
      block: "center",
      inline: "center"
    }
  },
  labels: {
    previousButton: "Previous",
    nextButton: "Next",
    finishButton: "Finish"
  },
  hideButtons: {
    previous: !1,
    next: !1
  }
};
function jn() {
  var $, b, O, M;
  const r = tt(""), v = tt(null), C = tt((b = ($ = Ct.overlay) == null ? void 0 : $.padding) != null ? b : 0), y = tt((M = (O = Ct.overlay) == null ? void 0 : O.borderRadius) != null ? M : 0), c = () => {
    A(v.value, {
      padding: C.value,
      borderRadius: y.value
    });
  }, A = async (_, S = Ct.overlay) => {
    var et, i, u, T, x, B, L, G, R, K, W, q;
    if (!_)
      return;
    const { innerWidth: j, innerHeight: I } = window, { left: z, top: m, width: it, height: at } = _.getBoundingClientRect(), w = typeof S.padding == "number" ? {
      top: S.padding,
      right: S.padding,
      bottom: S.padding,
      left: S.padding
    } : S.padding, l = typeof S.borderRadius == "number" ? {
      leftTop: S.borderRadius,
      rightTop: S.borderRadius,
      rightBottom: S.borderRadius,
      leftBottom: S.borderRadius
    } : S.borderRadius, f = {
      top: m - ((et = w == null ? void 0 : w.top) != null ? et : 0),
      right: z + it + ((i = w == null ? void 0 : w.right) != null ? i : 0),
      bottom: m + at + ((u = w == null ? void 0 : w.bottom) != null ? u : 0),
      left: z - ((T = w == null ? void 0 : w.left) != null ? T : 0)
    }, U = {
      leftTop: `M${f.left + ((x = l == null ? void 0 : l.leftTop) != null ? x : 0)},${f.top} Q${f.left},${f.top} ${f.left},${f.top + ((B = l == null ? void 0 : l.leftTop) != null ? B : 0)}`,
      rightTop: `V${f.top + ((L = l == null ? void 0 : l.rightTop) != null ? L : 0)} Q${f.right},${f.top} ${f.right - ((G = l == null ? void 0 : l.rightTop) != null ? G : 0)},${f.top}`,
      rightBottom: `H${f.right - ((R = l == null ? void 0 : l.rightBottom) != null ? R : 0)} Q${f.right},${f.bottom} ${f.right},${f.bottom - ((K = l == null ? void 0 : l.rightBottom) != null ? K : 0)}`,
      leftBottom: `V${f.bottom - ((W = l == null ? void 0 : l.leftBottom) != null ? W : 0)} Q${f.left},${f.bottom} ${f.left + ((q = l == null ? void 0 : l.leftBottom) != null ? q : 0)},${f.bottom}`
    };
    r.value = `
      M${j},${I}
      H0V0
      H${j}V${I}
      Z
      ${U.leftTop}
      ${U.leftBottom}
      ${U.rightBottom}
      ${U.rightTop}
      Z
    `, v.value = _, C.value = w, y.value = l;
  };
  return le(() => {
    window.addEventListener("scroll", c), window.addEventListener("resize", c);
  }), In(() => {
    window.removeEventListener("scroll", c), window.removeEventListener("resize", c);
  }), {
    path: r,
    updatePath: A
  };
}
var $t = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Mt = { exports: {} };
(function(r, v) {
  var C = 200, y = "__lodash_hash_undefined__", c = 800, A = 16, $ = 9007199254740991, b = "[object Arguments]", O = "[object Array]", M = "[object AsyncFunction]", _ = "[object Boolean]", S = "[object Date]", j = "[object Error]", I = "[object Function]", z = "[object GeneratorFunction]", m = "[object Map]", it = "[object Number]", at = "[object Null]", w = "[object Object]", l = "[object Proxy]", f = "[object RegExp]", U = "[object Set]", et = "[object String]", i = "[object Undefined]", u = "[object WeakMap]", T = "[object ArrayBuffer]", x = "[object DataView]", B = "[object Float32Array]", L = "[object Float64Array]", G = "[object Int8Array]", R = "[object Int16Array]", K = "[object Int32Array]", W = "[object Uint8Array]", q = "[object Uint8ClampedArray]", dt = "[object Uint16Array]", pt = "[object Uint32Array]", he = /[\\^$.*+?()[\]{}|]/g, ge = /^\[object .+?Constructor\]$/, ve = /^(?:0|[1-9]\d*)$/, p = {};
  p[B] = p[L] = p[G] = p[R] = p[K] = p[W] = p[q] = p[dt] = p[pt] = !0, p[b] = p[O] = p[T] = p[_] = p[x] = p[S] = p[j] = p[I] = p[m] = p[it] = p[w] = p[f] = p[U] = p[et] = p[u] = !1;
  var jt = typeof $t == "object" && $t && $t.Object === Object && $t, be = typeof self == "object" && self && self.Object === Object && self, st = jt || be || Function("return this")(), Ut = v && !v.nodeType && v, ut = Ut && !0 && r && !r.nodeType && r, Dt = ut && ut.exports === Ut, At = Dt && jt.process, Ht = function() {
    try {
      var t = ut && ut.require && ut.require("util").types;
      return t || At && At.binding && At.binding("util");
    } catch {
    }
  }(), Gt = Ht && Ht.isTypedArray;
  function _e(t, e, n) {
    switch (n.length) {
      case 0:
        return t.call(e);
      case 1:
        return t.call(e, n[0]);
      case 2:
        return t.call(e, n[0], n[1]);
      case 3:
        return t.call(e, n[0], n[1], n[2]);
    }
    return t.apply(e, n);
  }
  function ye(t, e) {
    for (var n = -1, o = Array(t); ++n < t; )
      o[n] = e(n);
    return o;
  }
  function me(t) {
    return function(e) {
      return t(e);
    };
  }
  function Te(t, e) {
    return t == null ? void 0 : t[e];
  }
  function Se(t, e) {
    return function(n) {
      return t(e(n));
    };
  }
  var we = Array.prototype, $e = Function.prototype, ht = Object.prototype, Ot = st["__core-js_shared__"], gt = $e.toString, N = ht.hasOwnProperty, Rt = function() {
    var t = /[^.]+$/.exec(Ot && Ot.keys && Ot.keys.IE_PROTO || "");
    return t ? "Symbol(src)_1." + t : "";
  }(), Kt = ht.toString, Ce = gt.call(Object), Ae = RegExp(
    "^" + gt.call(N).replace(he, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), vt = Dt ? st.Buffer : void 0, Wt = st.Symbol, qt = st.Uint8Array, Qt = vt ? vt.allocUnsafe : void 0, Zt = Se(Object.getPrototypeOf, Object), Jt = Object.create, Oe = ht.propertyIsEnumerable, xe = we.splice, Q = Wt ? Wt.toStringTag : void 0, bt = function() {
    try {
      var t = Et(Object, "defineProperty");
      return t({}, "", {}), t;
    } catch {
    }
  }(), Be = vt ? vt.isBuffer : void 0, Xt = Math.max, Ee = Date.now, Yt = Et(st, "Map"), lt = Et(Object, "create"), Pe = function() {
    function t() {
    }
    return function(e) {
      if (!J(e))
        return {};
      if (Jt)
        return Jt(e);
      t.prototype = e;
      var n = new t();
      return t.prototype = void 0, n;
    };
  }();
  function Z(t) {
    var e = -1, n = t == null ? 0 : t.length;
    for (this.clear(); ++e < n; ) {
      var o = t[e];
      this.set(o[0], o[1]);
    }
  }
  function Ie() {
    this.__data__ = lt ? lt(null) : {}, this.size = 0;
  }
  function Le(t) {
    var e = this.has(t) && delete this.__data__[t];
    return this.size -= e ? 1 : 0, e;
  }
  function ze(t) {
    var e = this.__data__;
    if (lt) {
      var n = e[t];
      return n === y ? void 0 : n;
    }
    return N.call(e, t) ? e[t] : void 0;
  }
  function Ne(t) {
    var e = this.__data__;
    return lt ? e[t] !== void 0 : N.call(e, t);
  }
  function Fe(t, e) {
    var n = this.__data__;
    return this.size += this.has(t) ? 0 : 1, n[t] = lt && e === void 0 ? y : e, this;
  }
  Z.prototype.clear = Ie, Z.prototype.delete = Le, Z.prototype.get = ze, Z.prototype.has = Ne, Z.prototype.set = Fe;
  function F(t) {
    var e = -1, n = t == null ? 0 : t.length;
    for (this.clear(); ++e < n; ) {
      var o = t[e];
      this.set(o[0], o[1]);
    }
  }
  function Ve() {
    this.__data__ = [], this.size = 0;
  }
  function Me(t) {
    var e = this.__data__, n = _t(e, t);
    if (n < 0)
      return !1;
    var o = e.length - 1;
    return n == o ? e.pop() : xe.call(e, n, 1), --this.size, !0;
  }
  function je(t) {
    var e = this.__data__, n = _t(e, t);
    return n < 0 ? void 0 : e[n][1];
  }
  function Ue(t) {
    return _t(this.__data__, t) > -1;
  }
  function De(t, e) {
    var n = this.__data__, o = _t(n, t);
    return o < 0 ? (++this.size, n.push([t, e])) : n[o][1] = e, this;
  }
  F.prototype.clear = Ve, F.prototype.delete = Me, F.prototype.get = je, F.prototype.has = Ue, F.prototype.set = De;
  function nt(t) {
    var e = -1, n = t == null ? 0 : t.length;
    for (this.clear(); ++e < n; ) {
      var o = t[e];
      this.set(o[0], o[1]);
    }
  }
  function He() {
    this.size = 0, this.__data__ = {
      hash: new Z(),
      map: new (Yt || F)(),
      string: new Z()
    };
  }
  function Ge(t) {
    var e = mt(this, t).delete(t);
    return this.size -= e ? 1 : 0, e;
  }
  function Re(t) {
    return mt(this, t).get(t);
  }
  function Ke(t) {
    return mt(this, t).has(t);
  }
  function We(t, e) {
    var n = mt(this, t), o = n.size;
    return n.set(t, e), this.size += n.size == o ? 0 : 1, this;
  }
  nt.prototype.clear = He, nt.prototype.delete = Ge, nt.prototype.get = Re, nt.prototype.has = Ke, nt.prototype.set = We;
  function rt(t) {
    var e = this.__data__ = new F(t);
    this.size = e.size;
  }
  function qe() {
    this.__data__ = new F(), this.size = 0;
  }
  function Qe(t) {
    var e = this.__data__, n = e.delete(t);
    return this.size = e.size, n;
  }
  function Ze(t) {
    return this.__data__.get(t);
  }
  function Je(t) {
    return this.__data__.has(t);
  }
  function Xe(t, e) {
    var n = this.__data__;
    if (n instanceof F) {
      var o = n.__data__;
      if (!Yt || o.length < C - 1)
        return o.push([t, e]), this.size = ++n.size, this;
      n = this.__data__ = new nt(o);
    }
    return n.set(t, e), this.size = n.size, this;
  }
  rt.prototype.clear = qe, rt.prototype.delete = Qe, rt.prototype.get = Ze, rt.prototype.has = Je, rt.prototype.set = Xe;
  function Ye(t, e) {
    var n = Lt(t), o = !n && It(t), s = !n && !o && re(t), d = !n && !o && !s && ie(t), h = n || o || s || d, a = h ? ye(t.length, String) : [], g = a.length;
    for (var P in t)
      (e || N.call(t, P)) && !(h && (P == "length" || s && (P == "offset" || P == "parent") || d && (P == "buffer" || P == "byteLength" || P == "byteOffset") || ee(P, g))) && a.push(P);
    return a;
  }
  function xt(t, e, n) {
    (n !== void 0 && !Tt(t[e], n) || n === void 0 && !(e in t)) && Bt(t, e, n);
  }
  function ke(t, e, n) {
    var o = t[e];
    (!(N.call(t, e) && Tt(o, n)) || n === void 0 && !(e in t)) && Bt(t, e, n);
  }
  function _t(t, e) {
    for (var n = t.length; n--; )
      if (Tt(t[n][0], e))
        return n;
    return -1;
  }
  function Bt(t, e, n) {
    e == "__proto__" && bt ? bt(t, e, {
      configurable: !0,
      enumerable: !0,
      value: n,
      writable: !0
    }) : t[e] = n;
  }
  var tn = hn();
  function yt(t) {
    return t == null ? t === void 0 ? i : at : Q && Q in Object(t) ? gn(t) : Tn(t);
  }
  function kt(t) {
    return ct(t) && yt(t) == b;
  }
  function en(t) {
    if (!J(t) || yn(t))
      return !1;
    var e = Nt(t) ? Ae : ge;
    return e.test(Cn(t));
  }
  function nn(t) {
    return ct(t) && oe(t.length) && !!p[yt(t)];
  }
  function rn(t) {
    if (!J(t))
      return mn(t);
    var e = ne(t), n = [];
    for (var o in t)
      o == "constructor" && (e || !N.call(t, o)) || n.push(o);
    return n;
  }
  function te(t, e, n, o, s) {
    t !== e && tn(e, function(d, h) {
      if (s || (s = new rt()), J(d))
        on(t, e, h, n, te, o, s);
      else {
        var a = o ? o(Pt(t, h), d, h + "", t, e, s) : void 0;
        a === void 0 && (a = d), xt(t, h, a);
      }
    }, ae);
  }
  function on(t, e, n, o, s, d, h) {
    var a = Pt(t, n), g = Pt(e, n), P = h.get(g);
    if (P) {
      xt(t, n, P);
      return;
    }
    var E = d ? d(a, g, n + "", t, e, h) : void 0, ft = E === void 0;
    if (ft) {
      var Ft = Lt(g), Vt = !Ft && re(g), ue = !Ft && !Vt && ie(g);
      E = g, Ft || Vt || ue ? Lt(a) ? E = a : An(a) ? E = fn(a) : Vt ? (ft = !1, E = un(g, !0)) : ue ? (ft = !1, E = cn(g, !0)) : E = [] : On(g) || It(g) ? (E = a, It(a) ? E = xn(a) : (!J(a) || Nt(a)) && (E = vn(g))) : ft = !1;
    }
    ft && (h.set(g, E), s(E, g, o, d, h), h.delete(g)), xt(t, n, E);
  }
  function an(t, e) {
    return wn(Sn(t, e, se), t + "");
  }
  var sn = bt ? function(t, e) {
    return bt(t, "toString", {
      configurable: !0,
      enumerable: !1,
      value: En(e),
      writable: !0
    });
  } : se;
  function un(t, e) {
    if (e)
      return t.slice();
    var n = t.length, o = Qt ? Qt(n) : new t.constructor(n);
    return t.copy(o), o;
  }
  function ln(t) {
    var e = new t.constructor(t.byteLength);
    return new qt(e).set(new qt(t)), e;
  }
  function cn(t, e) {
    var n = e ? ln(t.buffer) : t.buffer;
    return new t.constructor(n, t.byteOffset, t.length);
  }
  function fn(t, e) {
    var n = -1, o = t.length;
    for (e || (e = Array(o)); ++n < o; )
      e[n] = t[n];
    return e;
  }
  function dn(t, e, n, o) {
    var s = !n;
    n || (n = {});
    for (var d = -1, h = e.length; ++d < h; ) {
      var a = e[d], g = o ? o(n[a], t[a], a, n, t) : void 0;
      g === void 0 && (g = t[a]), s ? Bt(n, a, g) : ke(n, a, g);
    }
    return n;
  }
  function pn(t) {
    return an(function(e, n) {
      var o = -1, s = n.length, d = s > 1 ? n[s - 1] : void 0, h = s > 2 ? n[2] : void 0;
      for (d = t.length > 3 && typeof d == "function" ? (s--, d) : void 0, h && bn(n[0], n[1], h) && (d = s < 3 ? void 0 : d, s = 1), e = Object(e); ++o < s; ) {
        var a = n[o];
        a && t(e, a, o, d);
      }
      return e;
    });
  }
  function hn(t) {
    return function(e, n, o) {
      for (var s = -1, d = Object(e), h = o(e), a = h.length; a--; ) {
        var g = h[t ? a : ++s];
        if (n(d[g], g, d) === !1)
          break;
      }
      return e;
    };
  }
  function mt(t, e) {
    var n = t.__data__;
    return _n(e) ? n[typeof e == "string" ? "string" : "hash"] : n.map;
  }
  function Et(t, e) {
    var n = Te(t, e);
    return en(n) ? n : void 0;
  }
  function gn(t) {
    var e = N.call(t, Q), n = t[Q];
    try {
      t[Q] = void 0;
      var o = !0;
    } catch {
    }
    var s = Kt.call(t);
    return o && (e ? t[Q] = n : delete t[Q]), s;
  }
  function vn(t) {
    return typeof t.constructor == "function" && !ne(t) ? Pe(Zt(t)) : {};
  }
  function ee(t, e) {
    var n = typeof t;
    return e = e == null ? $ : e, !!e && (n == "number" || n != "symbol" && ve.test(t)) && t > -1 && t % 1 == 0 && t < e;
  }
  function bn(t, e, n) {
    if (!J(n))
      return !1;
    var o = typeof e;
    return (o == "number" ? zt(n) && ee(e, n.length) : o == "string" && e in n) ? Tt(n[e], t) : !1;
  }
  function _n(t) {
    var e = typeof t;
    return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
  }
  function yn(t) {
    return !!Rt && Rt in t;
  }
  function ne(t) {
    var e = t && t.constructor, n = typeof e == "function" && e.prototype || ht;
    return t === n;
  }
  function mn(t) {
    var e = [];
    if (t != null)
      for (var n in Object(t))
        e.push(n);
    return e;
  }
  function Tn(t) {
    return Kt.call(t);
  }
  function Sn(t, e, n) {
    return e = Xt(e === void 0 ? t.length - 1 : e, 0), function() {
      for (var o = arguments, s = -1, d = Xt(o.length - e, 0), h = Array(d); ++s < d; )
        h[s] = o[e + s];
      s = -1;
      for (var a = Array(e + 1); ++s < e; )
        a[s] = o[s];
      return a[e] = n(h), _e(t, this, a);
    };
  }
  function Pt(t, e) {
    if (!(e === "constructor" && typeof t[e] == "function") && e != "__proto__")
      return t[e];
  }
  var wn = $n(sn);
  function $n(t) {
    var e = 0, n = 0;
    return function() {
      var o = Ee(), s = A - (o - n);
      if (n = o, s > 0) {
        if (++e >= c)
          return arguments[0];
      } else
        e = 0;
      return t.apply(void 0, arguments);
    };
  }
  function Cn(t) {
    if (t != null) {
      try {
        return gt.call(t);
      } catch {
      }
      try {
        return t + "";
      } catch {
      }
    }
    return "";
  }
  function Tt(t, e) {
    return t === e || t !== t && e !== e;
  }
  var It = kt(function() {
    return arguments;
  }()) ? kt : function(t) {
    return ct(t) && N.call(t, "callee") && !Oe.call(t, "callee");
  }, Lt = Array.isArray;
  function zt(t) {
    return t != null && oe(t.length) && !Nt(t);
  }
  function An(t) {
    return ct(t) && zt(t);
  }
  var re = Be || Pn;
  function Nt(t) {
    if (!J(t))
      return !1;
    var e = yt(t);
    return e == I || e == z || e == M || e == l;
  }
  function oe(t) {
    return typeof t == "number" && t > -1 && t % 1 == 0 && t <= $;
  }
  function J(t) {
    var e = typeof t;
    return t != null && (e == "object" || e == "function");
  }
  function ct(t) {
    return t != null && typeof t == "object";
  }
  function On(t) {
    if (!ct(t) || yt(t) != w)
      return !1;
    var e = Zt(t);
    if (e === null)
      return !0;
    var n = N.call(e, "constructor") && e.constructor;
    return typeof n == "function" && n instanceof n && gt.call(n) == Ce;
  }
  var ie = Gt ? me(Gt) : nn;
  function xn(t) {
    return dn(t, ae(t));
  }
  function ae(t) {
    return zt(t) ? Ye(t, !0) : rn(t);
  }
  var Bn = pn(function(t, e, n) {
    te(t, e, n);
  });
  function En(t) {
    return function() {
      return t;
    };
  }
  function se(t) {
    return t;
  }
  function Pn() {
    return !1;
  }
  r.exports = Bn;
})(Mt, Mt.exports);
const de = Mt.exports, Un = ce({
  name: "VOnboardingStep",
  setup(r, { slots: v }) {
    const C = tt(!1), y = X("next-step", () => {
    }), c = X("previous-step", () => {
    }), A = X("exit", () => {
    }), $ = X("options"), b = H(() => de({}, $ == null ? void 0 : $.value, _.value.options)), O = X("is-first-step"), M = X("is-last-step"), _ = X("step", {}), S = H(() => {
      var i, u;
      return {
        previous: !((i = b.value.hideButtons) != null && i.previous),
        next: !((u = b.value.hideButtons) != null && u.next)
      };
    }), j = H(() => {
      var i, u, T, x, B, L;
      return {
        previous: (u = (i = b.value) == null ? void 0 : i.labels) == null ? void 0 : u.previousButton,
        next: (x = (T = b.value) == null ? void 0 : T.labels) == null ? void 0 : x.nextButton,
        finish: (L = (B = b.value) == null ? void 0 : B.labels) == null ? void 0 : L.finishButton
      };
    }), I = () => {
      f(), y();
    }, z = () => {
      f(), c();
    };
    Ln(() => _.value, (i, u) => {
      var T;
      !((T = v.default) != null && T.call(v)) || f(u);
    });
    const m = tt(null), { updatePath: it, path: at } = jn(), w = () => {
      var u, T, x, B, L, G, R, K, W, q, dt, pt;
      const i = wt((T = (u = _ == null ? void 0 : _.value) == null ? void 0 : u.attachTo) == null ? void 0 : T.element);
      i && m.value && (C.value = !0, (B = (x = b.value) == null ? void 0 : x.scrollToStep) != null && B.enabled && i.scrollIntoView((G = (L = b.value) == null ? void 0 : L.scrollToStep) == null ? void 0 : G.options), Mn(i, m.value, b.value.popper), (K = (R = b.value) == null ? void 0 : R.overlay) != null && K.enabled && it(i, {
        padding: (q = (W = b.value) == null ? void 0 : W.overlay) == null ? void 0 : q.padding,
        borderRadius: (pt = (dt = b.value) == null ? void 0 : dt.overlay) == null ? void 0 : pt.borderRadius
      }), U(i));
    }, l = async () => {
      var i, u, T;
      await ((T = (u = (i = _ == null ? void 0 : _.value) == null ? void 0 : i.on) == null ? void 0 : u.beforeStep) == null ? void 0 : T.call(u)), w();
    }, f = (i = _.value) => {
      var u, T, x, B;
      (T = (u = i == null ? void 0 : i.on) == null ? void 0 : u.afterStep) == null || T.call(u), et(wt((x = i == null ? void 0 : i.attachTo) == null ? void 0 : x.element), (B = i == null ? void 0 : i.attachTo) == null ? void 0 : B.classList);
    }, U = (i = wt(_.value.attachTo.element)) => {
      const u = _.value.attachTo.classList;
      !u || !i || i.classList.add(...u);
    }, et = (i = wt(_.value.attachTo.element), u) => {
      !u || !i || i.classList.remove(...u);
    };
    return le(l), {
      stepElement: m,
      onNext: I,
      onPrevious: z,
      path: at,
      show: C,
      step: _,
      isFirst: O,
      isLast: M,
      exit: A,
      isButtonVisible: S,
      buttonLabels: j
    };
  }
}), pe = (r, v) => {
  const C = r.__vccOpts || r;
  for (const [y, c] of v)
    C[y] = c;
  return C;
}, Dn = { style: { width: "100%", height: "100%", position: "fixed", top: "0", left: "0", opacity: "0.5", "z-index": "var(--v-onboarding-overlay-z, 10)", "pointer-events": "none" } }, Hn = ["d"], Gn = {
  ref: "stepElement",
  style: { position: "relative", "z-index": "var(--v-onboarding-step-z, 20)" }
}, Rn = { class: "v-onboarding-item" }, Kn = { class: "v-onboarding-item__header" }, Wn = {
  key: 0,
  class: "v-onboarding-item__header-title"
}, qn = /* @__PURE__ */ V("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-4 w-4",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
}, [
  /* @__PURE__ */ V("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), Qn = [
  qn
], Zn = {
  key: 0,
  class: "v-onboarding-item__description"
}, Jn = { class: "v-onboarding-item__actions" }, Xn = /* @__PURE__ */ V("div", { "data-popper-arrow": "" }, null, -1);
function Yn(r, v, C, y, c, A) {
  return zn((D(), k("div", null, [
    (D(), k("svg", Dn, [
      V("path", { d: r.path }, null, 8, Hn)
    ])),
    V("div", Gn, [
      r.step ? fe(r.$slots, "default", { key: 0 }, () => {
        var $, b;
        return [
          V("div", Rn, [
            V("div", Kn, [
              ($ = r.step.content) != null && $.title ? (D(), k("span", Wn, St(r.step.content.title), 1)) : ot("", !0),
              V("button", {
                onClick: v[0] || (v[0] = (...O) => r.exit && r.exit(...O)),
                class: "v-onboarding-item__header-close"
              }, Qn)
            ]),
            (b = r.step.content) != null && b.description ? (D(), k("p", Zn, St(r.step.content.description), 1)) : ot("", !0),
            V("div", Jn, [
              !r.isFirst && r.isButtonVisible.previous ? (D(), k("button", {
                key: 0,
                type: "button",
                onClick: v[1] || (v[1] = (...O) => r.onPrevious && r.onPrevious(...O)),
                class: "v-onboarding-btn-secondary"
              }, St(r.buttonLabels.previous), 1)) : ot("", !0),
              r.isButtonVisible.next ? (D(), k("button", {
                key: 1,
                onClick: v[2] || (v[2] = (...O) => r.onNext && r.onNext(...O)),
                type: "button",
                class: "v-onboarding-btn-primary"
              }, St(r.isLast ? r.buttonLabels.finish : r.buttonLabels.next), 1)) : ot("", !0)
            ])
          ])
        ];
      }) : ot("", !0),
      Xn
    ], 512)
  ], 512)), [
    [Nn, r.show]
  ]);
}
const kn = /* @__PURE__ */ pe(Un, [["render", Yn]]), tr = ce({
  name: "VOnboardingWrapper",
  components: {
    VOnboardingStep: kn
  },
  props: {
    steps: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["exit"],
  setup(r, { expose: v, emit: C }) {
    const y = tt(-1), c = (m) => {
      typeof m == "function" ? y.value = m(y.value) : y.value = m;
    }, A = H(() => {
      var m;
      return ((m = r.steps) == null ? void 0 : m[y.value]) || null;
    }), $ = () => {
      c((m) => m - 1);
    }, b = () => {
      c((m) => m + 1);
    }, O = H(() => y.value >= r.steps.length || y.value < 0), M = () => {
      c(0);
    }, _ = () => {
      c(-1);
    }, S = () => {
      _(), C("exit");
    };
    v({
      start: M,
      finish: _,
      goToStep: c
    });
    const j = H(() => de({}, Ct, r.options));
    Y("options", j), Y("step", A), Y("next-step", b), Y("previous-step", $), Y("exit", S);
    const I = H(() => y.value === 0), z = H(() => y.value === r.steps.length - 1);
    return Y("is-first-step", I), Y("is-last-step", z), {
      index: y,
      activeStep: A,
      toPreviousStep: $,
      toNextStep: b,
      isFinished: O,
      setIndex: c,
      isFirstStep: I,
      isLastStep: z,
      finish: _
    };
  }
}), er = {
  key: 0,
  "data-v-onboarding-wrapper": ""
};
function nr(r, v, C, y, c, A) {
  const $ = Fn("VOnboardingStep");
  return r.isFinished ? ot("", !0) : (D(), k("div", er, [
    fe(r.$slots, "default", {
      key: r.index,
      step: r.activeStep,
      next: () => r.toNextStep(),
      previous: () => r.toPreviousStep(),
      exit: () => r.finish(),
      isFirst: r.isFirstStep,
      isLast: r.isLastStep,
      index: r.index
    }, () => [
      (D(), Vn($, { key: r.index }))
    ])
  ]));
}
const ir = /* @__PURE__ */ pe(tr, [["render", nr]]);
function ar(r) {
  return {
    start: () => {
      var c;
      return (c = r == null ? void 0 : r.value) == null ? void 0 : c.start();
    },
    finish: () => {
      var c;
      return (c = r == null ? void 0 : r.value) == null ? void 0 : c.finish();
    },
    goToStep: (c) => {
      var A;
      return (A = r == null ? void 0 : r.value) == null ? void 0 : A.goToStep(c);
    }
  };
}
export {
  kn as VOnboardingStep,
  ir as VOnboardingWrapper,
  ar as useVOnboarding
};
