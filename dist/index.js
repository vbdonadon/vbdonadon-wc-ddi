/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const B = globalThis, V = B.ShadowRoot && (B.ShadyCSS === void 0 || B.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, K = Symbol(), Z = /* @__PURE__ */ new WeakMap();
let re = class {
  constructor(e, i, t) {
    if (this._$cssResult$ = !0, t !== K)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (V && e === void 0) {
      const t = i !== void 0 && i.length === 1;
      t && (e = Z.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), t && Z.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ce = (n) => new re(typeof n == "string" ? n : n + "", void 0, K), me = (n, ...e) => {
  const i = n.length === 1 ? n[0] : e.reduce((t, a, r) => t + ((o) => {
    if (o._$cssResult$ === !0)
      return o.cssText;
    if (typeof o == "number")
      return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(a) + n[r + 1], n[0]);
  return new re(i, n, K);
}, pe = (n, e) => {
  if (V)
    n.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else
    for (const i of e) {
      const t = document.createElement("style"), a = B.litNonce;
      a !== void 0 && t.setAttribute("nonce", a), t.textContent = i.cssText, n.appendChild(t);
    }
}, q = V ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const t of e.cssRules)
    i += t.cssText;
  return ce(i);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ve, defineProperty: ue, getOwnPropertyDescriptor: _e, getOwnPropertyNames: ge, getOwnPropertySymbols: $e, getPrototypeOf: fe } = Object, _ = globalThis, J = _.trustedTypes, Ae = J ? J.emptyScript : "", k = _.reactiveElementPolyfillSupport, C = (n, e) => n, O = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? Ae : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, e) {
  let i = n;
  switch (e) {
    case Boolean:
      i = n !== null;
      break;
    case Number:
      i = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(n);
      } catch {
        i = null;
      }
  }
  return i;
} }, F = (n, e) => !ve(n, e), Y = { attribute: !0, type: String, converter: O, reflect: !1, hasChanged: F };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), _.litPropertyMetadata ?? (_.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class y extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = Y) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.elementProperties.set(e, i), !i.noAccessor) {
      const t = Symbol(), a = this.getPropertyDescriptor(e, t, i);
      a !== void 0 && ue(this.prototype, e, a);
    }
  }
  static getPropertyDescriptor(e, i, t) {
    const { get: a, set: r } = _e(this.prototype, e) ?? { get() {
      return this[i];
    }, set(o) {
      this[i] = o;
    } };
    return { get() {
      return a == null ? void 0 : a.call(this);
    }, set(o) {
      const d = a == null ? void 0 : a.call(this);
      r.call(this, o), this.requestUpdate(e, d, t);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Y;
  }
  static _$Ei() {
    if (this.hasOwnProperty(C("elementProperties")))
      return;
    const e = fe(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(C("finalized")))
      return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(C("properties"))) {
      const i = this.properties, t = [...ge(i), ...$e(i)];
      for (const a of t)
        this.createProperty(a, i[a]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0)
        for (const [t, a] of i)
          this.elementProperties.set(t, a);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, t] of this.elementProperties) {
      const a = this._$Eu(i, t);
      a !== void 0 && this._$Eh.set(a, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const t = new Set(e.flat(1 / 0).reverse());
      for (const a of t)
        i.unshift(q(a));
    } else
      e !== void 0 && i.push(q(e));
    return i;
  }
  static _$Eu(e, i) {
    const t = i.attribute;
    return t === !1 ? void 0 : typeof t == "string" ? t : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$Eg = new Promise((i) => this.enableUpdating = i), this._$AL = /* @__PURE__ */ new Map(), this._$ES(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((i) => i(this));
  }
  addController(e) {
    var i;
    (this._$E_ ?? (this._$E_ = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((i = e.hostConnected) == null || i.call(e));
  }
  removeController(e) {
    var i;
    (i = this._$E_) == null || i.delete(e);
  }
  _$ES() {
    const e = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const t of i.keys())
      this.hasOwnProperty(t) && (e.set(t, this[t]), delete this[t]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return pe(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$E_) == null || e.forEach((i) => {
      var t;
      return (t = i.hostConnected) == null ? void 0 : t.call(i);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$E_) == null || e.forEach((i) => {
      var t;
      return (t = i.hostDisconnected) == null ? void 0 : t.call(i);
    });
  }
  attributeChangedCallback(e, i, t) {
    this._$AK(e, t);
  }
  _$EO(e, i) {
    var r;
    const t = this.constructor.elementProperties.get(e), a = this.constructor._$Eu(e, t);
    if (a !== void 0 && t.reflect === !0) {
      const o = (((r = t.converter) == null ? void 0 : r.toAttribute) !== void 0 ? t.converter : O).toAttribute(i, t.type);
      this._$Em = e, o == null ? this.removeAttribute(a) : this.setAttribute(a, o), this._$Em = null;
    }
  }
  _$AK(e, i) {
    var r;
    const t = this.constructor, a = t._$Eh.get(e);
    if (a !== void 0 && this._$Em !== a) {
      const o = t.getPropertyOptions(a), d = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((r = o.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? o.converter : O;
      this._$Em = a, this[a] = d.fromAttribute(i, o.type), this._$Em = null;
    }
  }
  requestUpdate(e, i, t) {
    if (e !== void 0) {
      if (t ?? (t = this.constructor.getPropertyOptions(e)), !(t.hasChanged ?? F)(this[e], i))
        return;
      this.C(e, i, t);
    }
    this.isUpdatePending === !1 && (this._$Eg = this._$EP());
  }
  C(e, i, t) {
    this._$AL.has(e) || this._$AL.set(e, i), t.reflect === !0 && this._$Em !== e && (this._$ET ?? (this._$ET = /* @__PURE__ */ new Set())).add(e);
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$Eg;
    } catch (i) {
      Promise.reject(i);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending)
      return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [r, o] of this._$Ep)
          this[r] = o;
        this._$Ep = void 0;
      }
      const a = this.constructor.elementProperties;
      if (a.size > 0)
        for (const [r, o] of a)
          o.wrapped !== !0 || this._$AL.has(r) || this[r] === void 0 || this.C(r, this[r], o);
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (t = this._$E_) == null || t.forEach((a) => {
        var r;
        return (r = a.hostUpdate) == null ? void 0 : r.call(a);
      }), this.update(i)) : this._$Ej();
    } catch (a) {
      throw e = !1, this._$Ej(), a;
    }
    e && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var i;
    (i = this._$E_) == null || i.forEach((t) => {
      var a;
      return (a = t.hostUpdated) == null ? void 0 : a.call(t);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$Ej() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Eg;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$ET && (this._$ET = this._$ET.forEach((i) => this._$EO(i, this[i]))), this._$Ej();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
}
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[C("elementProperties")] = /* @__PURE__ */ new Map(), y[C("finalized")] = /* @__PURE__ */ new Map(), k == null || k({ ReactiveElement: y }), (_.reactiveElementVersions ?? (_.reactiveElementVersions = [])).push("2.0.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w = globalThis, H = w.trustedTypes, Q = H ? H.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, se = "$lit$", u = `lit$${(Math.random() + "").slice(9)}$`, de = "?" + u, ye = `<${de}>`, f = document, P = () => f.createComment(""), T = (n) => n === null || typeof n != "object" && typeof n != "function", be = Array.isArray, Se = (n) => be(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", G = `[ 	
\f\r]`, E = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, X = /-->/g, ee = />/g, g = RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ie = /'/g, te = /"/g, le = /^(?:script|style|textarea|title)$/i, xe = (n) => (e, ...i) => ({ _$litType$: n, strings: e, values: i }), j = xe(1), S = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), ae = /* @__PURE__ */ new WeakMap(), $ = f.createTreeWalker(f, 129);
function he(n, e) {
  if (!Array.isArray(n) || !n.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return Q !== void 0 ? Q.createHTML(e) : e;
}
const Ee = (n, e) => {
  const i = n.length - 1, t = [];
  let a, r = e === 2 ? "<svg>" : "", o = E;
  for (let d = 0; d < i; d++) {
    const s = n[d];
    let l, c, b = -1, m = 0;
    for (; m < s.length && (o.lastIndex = m, c = o.exec(s), c !== null); )
      m = o.lastIndex, o === E ? c[1] === "!--" ? o = X : c[1] !== void 0 ? o = ee : c[2] !== void 0 ? (le.test(c[2]) && (a = RegExp("</" + c[2], "g")), o = g) : c[3] !== void 0 && (o = g) : o === g ? c[0] === ">" ? (o = a ?? E, b = -1) : c[1] === void 0 ? b = -2 : (b = o.lastIndex - c[2].length, l = c[1], o = c[3] === void 0 ? g : c[3] === '"' ? te : ie) : o === te || o === ie ? o = g : o === X || o === ee ? o = E : (o = g, a = void 0);
    const v = o === g && n[d + 1].startsWith("/>") ? " " : "";
    r += o === E ? s + ye : b >= 0 ? (t.push(l), s.slice(0, b) + se + s.slice(b) + u + v) : s + u + (b === -2 ? d : v);
  }
  return [he(n, r + (n[i] || "<?>") + (e === 2 ? "</svg>" : "")), t];
};
class R {
  constructor({ strings: e, _$litType$: i }, t) {
    let a;
    this.parts = [];
    let r = 0, o = 0;
    const d = e.length - 1, s = this.parts, [l, c] = Ee(e, i);
    if (this.el = R.createElement(l, t), $.currentNode = this.el.content, i === 2) {
      const b = this.el.content.firstChild;
      b.replaceWith(...b.childNodes);
    }
    for (; (a = $.nextNode()) !== null && s.length < d; ) {
      if (a.nodeType === 1) {
        if (a.hasAttributes())
          for (const b of a.getAttributeNames())
            if (b.endsWith(se)) {
              const m = c[o++], v = a.getAttribute(b).split(u), N = /([.?@])?(.*)/.exec(m);
              s.push({ type: 1, index: r, name: N[2], strings: v, ctor: N[1] === "." ? we : N[1] === "?" ? Me : N[1] === "@" ? Pe : L }), a.removeAttribute(b);
            } else
              b.startsWith(u) && (s.push({ type: 6, index: r }), a.removeAttribute(b));
        if (le.test(a.tagName)) {
          const b = a.textContent.split(u), m = b.length - 1;
          if (m > 0) {
            a.textContent = H ? H.emptyScript : "";
            for (let v = 0; v < m; v++)
              a.append(b[v], P()), $.nextNode(), s.push({ type: 2, index: ++r });
            a.append(b[m], P());
          }
        }
      } else if (a.nodeType === 8)
        if (a.data === de)
          s.push({ type: 2, index: r });
        else {
          let b = -1;
          for (; (b = a.data.indexOf(u, b + 1)) !== -1; )
            s.push({ type: 7, index: r }), b += u.length - 1;
        }
      r++;
    }
  }
  static createElement(e, i) {
    const t = f.createElement("template");
    return t.innerHTML = e, t;
  }
}
function x(n, e, i = n, t) {
  var o, d;
  if (e === S)
    return e;
  let a = t !== void 0 ? (o = i._$Co) == null ? void 0 : o[t] : i._$Cl;
  const r = T(e) ? void 0 : e._$litDirective$;
  return (a == null ? void 0 : a.constructor) !== r && ((d = a == null ? void 0 : a._$AO) == null || d.call(a, !1), r === void 0 ? a = void 0 : (a = new r(n), a._$AT(n, i, t)), t !== void 0 ? (i._$Co ?? (i._$Co = []))[t] = a : i._$Cl = a), a !== void 0 && (e = x(n, a._$AS(n, e.values), a, t)), e;
}
class Ce {
  constructor(e, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: i }, parts: t } = this._$AD, a = ((e == null ? void 0 : e.creationScope) ?? f).importNode(i, !0);
    $.currentNode = a;
    let r = $.nextNode(), o = 0, d = 0, s = t[0];
    for (; s !== void 0; ) {
      if (o === s.index) {
        let l;
        s.type === 2 ? l = new U(r, r.nextSibling, this, e) : s.type === 1 ? l = new s.ctor(r, s.name, s.strings, this, e) : s.type === 6 && (l = new Te(r, this, e)), this._$AV.push(l), s = t[++d];
      }
      o !== (s == null ? void 0 : s.index) && (r = $.nextNode(), o++);
    }
    return $.currentNode = f, a;
  }
  p(e) {
    let i = 0;
    for (const t of this._$AV)
      t !== void 0 && (t.strings !== void 0 ? (t._$AI(e, t, i), i += t.strings.length - 2) : t._$AI(e[i])), i++;
  }
}
class U {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, i, t, a) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = t, this.options = a, this._$Cv = (a == null ? void 0 : a.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = i.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, i = this) {
    e = x(this, e, i), T(e) ? e === h || e == null || e === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : e !== this._$AH && e !== S && this._(e) : e._$litType$ !== void 0 ? this.g(e) : e.nodeType !== void 0 ? this.$(e) : Se(e) ? this.T(e) : this._(e);
  }
  k(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  $(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.k(e));
  }
  _(e) {
    this._$AH !== h && T(this._$AH) ? this._$AA.nextSibling.data = e : this.$(f.createTextNode(e)), this._$AH = e;
  }
  g(e) {
    var r;
    const { values: i, _$litType$: t } = e, a = typeof t == "number" ? this._$AC(e) : (t.el === void 0 && (t.el = R.createElement(he(t.h, t.h[0]), this.options)), t);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === a)
      this._$AH.p(i);
    else {
      const o = new Ce(a, this), d = o.u(this.options);
      o.p(i), this.$(d), this._$AH = o;
    }
  }
  _$AC(e) {
    let i = ae.get(e.strings);
    return i === void 0 && ae.set(e.strings, i = new R(e)), i;
  }
  T(e) {
    be(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let t, a = 0;
    for (const r of e)
      a === i.length ? i.push(t = new U(this.k(P()), this.k(P()), this, this.options)) : t = i[a], t._$AI(r), a++;
    a < i.length && (this._$AR(t && t._$AB.nextSibling, a), i.length = a);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    var t;
    for ((t = this._$AP) == null ? void 0 : t.call(this, !1, !0, i); e && e !== this._$AB; ) {
      const a = e.nextSibling;
      e.remove(), e = a;
    }
  }
  setConnected(e) {
    var i;
    this._$AM === void 0 && (this._$Cv = e, (i = this._$AP) == null || i.call(this, e));
  }
}
class L {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, t, a, r) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = e, this.name = i, this._$AM = a, this.options = r, t.length > 2 || t[0] !== "" || t[1] !== "" ? (this._$AH = Array(t.length - 1).fill(new String()), this.strings = t) : this._$AH = h;
  }
  _$AI(e, i = this, t, a) {
    const r = this.strings;
    let o = !1;
    if (r === void 0)
      e = x(this, e, i, 0), o = !T(e) || e !== this._$AH && e !== S, o && (this._$AH = e);
    else {
      const d = e;
      let s, l;
      for (e = r[0], s = 0; s < r.length - 1; s++)
        l = x(this, d[t + s], i, s), l === S && (l = this._$AH[s]), o || (o = !T(l) || l !== this._$AH[s]), l === h ? e = h : e !== h && (e += (l ?? "") + r[s + 1]), this._$AH[s] = l;
    }
    o && !a && this.O(e);
  }
  O(e) {
    e === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class we extends L {
  constructor() {
    super(...arguments), this.type = 3;
  }
  O(e) {
    this.element[this.name] = e === h ? void 0 : e;
  }
}
class Me extends L {
  constructor() {
    super(...arguments), this.type = 4;
  }
  O(e) {
    this.element.toggleAttribute(this.name, !!e && e !== h);
  }
}
class Pe extends L {
  constructor(e, i, t, a, r) {
    super(e, i, t, a, r), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = x(this, e, i, 0) ?? h) === S)
      return;
    const t = this._$AH, a = e === h && t !== h || e.capture !== t.capture || e.once !== t.once || e.passive !== t.passive, r = e !== h && (t === h || a);
    a && this.element.removeEventListener(this.name, this, t), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Te {
  constructor(e, i, t) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = t;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    x(this, e);
  }
}
const D = w.litHtmlPolyfillSupport;
D == null || D(R, U), (w.litHtmlVersions ?? (w.litHtmlVersions = [])).push("3.1.1");
const Re = (n, e, i) => {
  const t = (i == null ? void 0 : i.renderBefore) ?? e;
  let a = t._$litPart$;
  if (a === void 0) {
    const r = (i == null ? void 0 : i.renderBefore) ?? null;
    t._$litPart$ = a = new U(e.insertBefore(P(), r), r, void 0, i ?? {});
  }
  return a._$AI(n), a;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class M extends y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var i;
    const e = super.createRenderRoot();
    return (i = this.renderOptions).renderBefore ?? (i.renderBefore = e.firstChild), e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Re(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return S;
  }
}
var oe;
M._$litElement$ = !0, M.finalized = !0, (oe = globalThis.litElementHydrateSupport) == null || oe.call(globalThis, { LitElement: M });
const z = globalThis.litElementPolyfillSupport;
z == null || z({ LitElement: M });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.0.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ue = (n) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(n, e);
  }) : customElements.define(n, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ne = { attribute: !0, type: String, converter: O, reflect: !1, hasChanged: F }, Be = (n = Ne, e, i) => {
  const { kind: t, metadata: a } = i;
  let r = globalThis.litPropertyMetadata.get(a);
  if (r === void 0 && globalThis.litPropertyMetadata.set(a, r = /* @__PURE__ */ new Map()), r.set(i.name, n), t === "accessor") {
    const { name: o } = i;
    return { set(d) {
      const s = e.get.call(this);
      e.set.call(this, d), this.requestUpdate(o, s, n);
    }, init(d) {
      return d !== void 0 && this.C(o, void 0, n), d;
    } };
  }
  if (t === "setter") {
    const { name: o } = i;
    return function(d) {
      const s = this[o];
      e.call(this, d), this.requestUpdate(o, s, n);
    };
  }
  throw Error("Unsupported decorator location: " + t);
};
function I(n) {
  return (e, i) => typeof i == "object" ? Be(n, e, i) : ((t, a, r) => {
    const o = a.hasOwnProperty(r);
    return a.constructor.createProperty(r, o ? { ...t, wrapped: !0 } : t), o ? Object.getOwnPropertyDescriptor(a, r) : void 0;
  })(n, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function W(n) {
  return I({ ...n, state: !0, attribute: !1 });
}
const ne = [
  { ddi: "+55", name: "Brasil", abbreviation: "BR" },
  { ddi: "+93", name: "Afeganistão", abbreviation: "AF" },
  { ddi: "+355", name: "Albânia", abbreviation: "AL" },
  { ddi: "+49", name: "Alemanha", abbreviation: "DE" },
  { ddi: "+376", name: "Andorra", abbreviation: "AD" },
  { ddi: "+244", name: "Angola", abbreviation: "AO" },
  { ddi: "+1264", name: "Anguilla", abbreviation: "AI" },
  { ddi: "+1268", name: "Antigua e Barbuda", abbreviation: "AG" },
  { ddi: "+54", name: "Argentina", abbreviation: "AR" },
  { ddi: "+213", name: "Argélia", abbreviation: "DZ" },
  { ddi: "+374", name: "Armênia", abbreviation: "AM" },
  { ddi: "+297", name: "Aruba", abbreviation: "AW" },
  { ddi: "+966", name: "Arábia Saudita", abbreviation: "SA" },
  { ddi: "+61", name: "Austrália", abbreviation: "AU" },
  { ddi: "+994", name: "Azerbaijão", abbreviation: "AZ" },
  { ddi: "+1242", name: "Bahamas", abbreviation: "BS" },
  { ddi: "+973", name: "Bahrain", abbreviation: "BH" },
  { ddi: "+880", name: "Bangladesh", abbreviation: "BD" },
  { ddi: "+1246", name: "Barbados", abbreviation: "BB" },
  { ddi: "+501", name: "Belize", abbreviation: "BZ" },
  { ddi: "+229", name: "Benin", abbreviation: "BJ" },
  { ddi: "+1441", name: "Bermudas", abbreviation: "BM" },
  { ddi: "+375", name: "Bielo-Rússia", abbreviation: "BY" },
  { ddi: "+591", name: "Bolívia", abbreviation: "BO" },
  { ddi: "+267", name: "Botswana", abbreviation: "BW" },
  { ddi: "+673", name: "Brunei", abbreviation: "BN" },
  { ddi: "+359", name: "Bulgária", abbreviation: "BG" },
  { ddi: "+226", name: "Burkina Faso", abbreviation: "BF" },
  { ddi: "+257", name: "Burundi", abbreviation: "BI" },
  { ddi: "+975", name: "Butão", abbreviation: "BT" },
  { ddi: "+32", name: "Bélgica", abbreviation: "BE" },
  { ddi: "+387", name: "Bósnia e Herzegovina", abbreviation: "BA" },
  { ddi: "+237", name: "Camarões", abbreviation: "CM" },
  { ddi: "+855", name: "Camboja", abbreviation: "KH" },
  { ddi: "+1", name: "Canadá", abbreviation: "CA" },
  { ddi: "+974", name: "Catar", abbreviation: "QA" },
  { ddi: "+7", name: "Cazaquistão", abbreviation: "KZ" },
  { ddi: "+235", name: "Chade", abbreviation: "TD" },
  { ddi: "+56", name: "Chile", abbreviation: "CL" },
  { ddi: "+86", name: "China", abbreviation: "CN" },
  { ddi: "+357", name: "Chipre", abbreviation: "CY" },
  { ddi: "+65", name: "Cingapura", abbreviation: "SG" },
  { ddi: "+57", name: "Colômbia", abbreviation: "CO" },
  { ddi: "+269", name: "Comores", abbreviation: "KM" },
  { ddi: "+850", name: "Coreia do Norte", abbreviation: "KP" },
  { ddi: "+82", name: "Coreia do Sul", abbreviation: "KR" },
  { ddi: "+506", name: "Costa Rica", abbreviation: "CR" },
  { ddi: "+385", name: "Croácia", abbreviation: "HR" },
  { ddi: "+53", name: "Cuba", abbreviation: "CU" },
  { ddi: "+420", name: "Czechia", abbreviation: "CZ" },
  { ddi: "+225", name: "Côte d’Ivoire", abbreviation: "CI" },
  { ddi: "+45", name: "Dinamarca", abbreviation: "DK" },
  { ddi: "+253", name: "Djibouti", abbreviation: "DJ" },
  { ddi: "+1767", name: "Dominica", abbreviation: "DM" },
  { ddi: "+20", name: "Egito", abbreviation: "EG" },
  { ddi: "+503", name: "El Salvador", abbreviation: "SV" },
  { ddi: "+971", name: "Emirados Árabes Unidos", abbreviation: "AE" },
  { ddi: "+593", name: "Equador", abbreviation: "EC" },
  { ddi: "+291", name: "Eritreia", abbreviation: "ER" },
  { ddi: "+421", name: "Eslováquia", abbreviation: "SK" },
  { ddi: "+386", name: "Eslovênia", abbreviation: "SI" },
  { ddi: "+34", name: "Espanha", abbreviation: "ES" },
  { ddi: "+1", name: "Estados Unidos", abbreviation: "US" },
  { ddi: "+372", name: "Estônia", abbreviation: "EE" },
  { ddi: "+268", name: "Eswatini", abbreviation: "SZ" },
  { ddi: "+251", name: "Etiópia", abbreviation: "ET" },
  { ddi: "+679", name: "Fiji", abbreviation: "FJ" },
  { ddi: "+63", name: "Filipinas", abbreviation: "PH" },
  { ddi: "+358", name: "Finlândia", abbreviation: "FI" },
  { ddi: "+33", name: "França", abbreviation: "FR" },
  { ddi: "+241", name: "Gabão", abbreviation: "GA" },
  { ddi: "+233", name: "Gana", abbreviation: "GH" },
  { ddi: "+995", name: "Georgia", abbreviation: "GE" },
  { ddi: "+350", name: "Gibraltar", abbreviation: "GI" },
  { ddi: "+1473", name: "Grenada", abbreviation: "GD" },
  { ddi: "+30", name: "Grécia", abbreviation: "GR" },
  { ddi: "+502", name: "Guatemala", abbreviation: "GT" },
  { ddi: "+44", name: "Guernsey", abbreviation: "GG" },
  { ddi: "+592", name: "Guiana", abbreviation: "GY" },
  { ddi: "+224", name: "Guiné", abbreviation: "GN" },
  { ddi: "+240", name: "Guiné Equatorial", abbreviation: "GQ" },
  { ddi: "+245", name: "Guiné-bissau", abbreviation: "GW" },
  { ddi: "+220", name: "Gâmbia", abbreviation: "GM" },
  { ddi: "+509", name: "Haiti", abbreviation: "HT" },
  { ddi: "+504", name: "Honduras", abbreviation: "HN" },
  { ddi: "+36", name: "Hungria", abbreviation: "HU" },
  { ddi: "+44", name: "Ilha de Man", abbreviation: "IM" },
  { ddi: "+358", name: "Ilhas Aland", abbreviation: "AX" },
  { ddi: "+1345", name: "Ilhas Cayman", abbreviation: "KY" },
  { ddi: "+500", name: "Ilhas Falkland", abbreviation: "FK" },
  { ddi: "+677", name: "Ilhas Salomão", abbreviation: "SB" },
  { ddi: "+1649", name: "Ilhas Turks e Caicos", abbreviation: "TC" },
  { ddi: "+1284", name: "Ilhas Virgens Britânicas", abbreviation: "VG" },
  { ddi: "+62", name: "Indonésia", abbreviation: "ID" },
  { ddi: "+228", name: "Ir", abbreviation: "TG" },
  { ddi: "+964", name: "Iraque", abbreviation: "IQ" },
  { ddi: "+353", name: "Irlanda", abbreviation: "IE" },
  { ddi: "+98", name: "Irã", abbreviation: "IR" },
  { ddi: "+354", name: "Islândia", abbreviation: "IS" },
  { ddi: "+972", name: "Israel", abbreviation: "IL" },
  { ddi: "+39", name: "Itália", abbreviation: "IT" },
  { ddi: "+967", name: "Iémen", abbreviation: "YE" },
  { ddi: "+1876", name: "Jamaica", abbreviation: "JM" },
  { ddi: "+81", name: "Japão", abbreviation: "JP" },
  { ddi: "+44", name: "Jersey", abbreviation: "JE" },
  { ddi: "+962", name: "Jordânia", abbreviation: "JO" },
  { ddi: "+965", name: "Kuwait", abbreviation: "KW" },
  { ddi: "+856", name: "Laos", abbreviation: "LA" },
  { ddi: "+266", name: "Lesoto", abbreviation: "LS" },
  { ddi: "+371", name: "Letônia", abbreviation: "LV" },
  { ddi: "+231", name: "Libéria", abbreviation: "LR" },
  { ddi: "+423", name: "Liechtenstein", abbreviation: "LI" },
  { ddi: "+370", name: "Lituânia", abbreviation: "LT" },
  { ddi: "+352", name: "Luxemburgo", abbreviation: "LU" },
  { ddi: "+961", name: "Líbano", abbreviation: "LB" },
  { ddi: "+218", name: "Líbia", abbreviation: "LY" },
  { ddi: "+389", name: "Macedônia do Norte", abbreviation: "MK" },
  { ddi: "+261", name: "Madagáscar", abbreviation: "MG" },
  { ddi: "+265", name: "Malawi", abbreviation: "MW" },
  { ddi: "+960", name: "Maldivas", abbreviation: "MV" },
  { ddi: "+223", name: "Mali", abbreviation: "ML" },
  { ddi: "+356", name: "Malta", abbreviation: "MT" },
  { ddi: "+60", name: "Malásia", abbreviation: "MY" },
  { ddi: "+212", name: "Marrocos", abbreviation: "MA" },
  { ddi: "+222", name: "Mauritânia", abbreviation: "MR" },
  { ddi: "+230", name: "Maurício", abbreviation: "MU" },
  { ddi: "+95", name: "Mianmar (Birmânia)", abbreviation: "MM" },
  { ddi: "+691", name: "Micronésia", abbreviation: "FM" },
  { ddi: "+373", name: "Moldova", abbreviation: "MD" },
  { ddi: "+976", name: "Mongólia", abbreviation: "MN" },
  { ddi: "+382", name: "Montenegro", abbreviation: "ME" },
  { ddi: "+1664", name: "Montserrat", abbreviation: "MS" },
  { ddi: "+258", name: "Moçambique", abbreviation: "MZ" },
  { ddi: "+52", name: "México", abbreviation: "MX" },
  { ddi: "+377", name: "Mônaco", abbreviation: "MC" },
  { ddi: "+264", name: "Namibia", abbreviation: "NA" },
  { ddi: "+977", name: "Nepal", abbreviation: "NP" },
  { ddi: "+505", name: "Nicarágua", abbreviation: "NI" },
  { ddi: "+234", name: "Nigéria", abbreviation: "NG" },
  { ddi: "+47", name: "Noruega", abbreviation: "NO" },
  { ddi: "+64", name: "Nova Zelândia", abbreviation: "NZ" },
  { ddi: "+227", name: "Níger", abbreviation: "NE" },
  { ddi: "+968", name: "Omã", abbreviation: "OM" },
  { ddi: "+680", name: "Palau", abbreviation: "PW" },
  { ddi: "+507", name: "Panamá", abbreviation: "PA" },
  { ddi: "+675", name: "Papua Nova Guiné", abbreviation: "PG" },
  { ddi: "+92", name: "Paquistão", abbreviation: "PK" },
  { ddi: "+595", name: "Paraguai", abbreviation: "PY" },
  { ddi: "+31", name: "Países Baixos", abbreviation: "NL" },
  { ddi: "+90", name: "Peru", abbreviation: "TR" },
  { ddi: "+51", name: "Peru", abbreviation: "PE" },
  { ddi: "+689", name: "Polinésia Francesa", abbreviation: "PF" },
  { ddi: "+48", name: "Polônia", abbreviation: "PL" },
  { ddi: "+1939", name: "Porto Rico", abbreviation: "PR" },
  { ddi: "+351", name: "Portugal", abbreviation: "PT" },
  { ddi: "+996", name: "Quirguistão", abbreviation: "KG" },
  { ddi: "+254", name: "Quênia", abbreviation: "KE" },
  { ddi: "+852", name: "RAE de Hong Kong China", abbreviation: "HK" },
  { ddi: "+853", name: "RAE de Macau China", abbreviation: "MO" },
  { ddi: "+44", name: "Reino Unido", abbreviation: "GB" },
  { ddi: "+236", name: "República Centro-Africana", abbreviation: "CF" },
  { ddi: "+243", name: "República Democrática do Congo", abbreviation: "CD" },
  { ddi: "+1", name: "República Dominicana", abbreviation: "DO" },
  { ddi: "+242", name: "República do Congo", abbreviation: "CG" },
  { ddi: "+40", name: "Romênia", abbreviation: "RO" },
  { ddi: "+250", name: "Ruanda", abbreviation: "RW" },
  { ddi: "+7", name: "Rússia", abbreviation: "RU" },
  { ddi: "+685", name: "Samoa", abbreviation: "WS" },
  { ddi: "+378", name: "San Marino", abbreviation: "SM" },
  { ddi: "+290", name: "Santa Helena", abbreviation: "SH" },
  { ddi: "+1758", name: "Santa Lúcia", abbreviation: "LC" },
  { ddi: "+221", name: "Senegal", abbreviation: "SN" },
  { ddi: "+232", name: "Serra Leoa", abbreviation: "SL" },
  { ddi: "+248", name: "Seychelles", abbreviation: "SC" },
  { ddi: "+252", name: "Somália", abbreviation: "SO" },
  { ddi: "+94", name: "Sri Lanka", abbreviation: "LK" },
  { ddi: "+249", name: "Sudão", abbreviation: "SD" },
  { ddi: "+597", name: "Suriname", abbreviation: "SR" },
  { ddi: "+46", name: "Suécia", abbreviation: "SE" },
  { ddi: "+41", name: "Suíça", abbreviation: "CH" },
  { ddi: "+1869", name: "São Cristóvão e Nevis", abbreviation: "KN" },
  { ddi: "+239", name: "São Tomé e Príncipe", abbreviation: "ST" },
  { ddi: "+1784", name: "São Vicente e Granadinas", abbreviation: "VC" },
  { ddi: "+381", name: "Sérvia", abbreviation: "RS" },
  { ddi: "+963", name: "Síria", abbreviation: "SY" },
  { ddi: "+66", name: "Tailândia", abbreviation: "TH" },
  { ddi: "+886", name: "Taiwan", abbreviation: "TW" },
  { ddi: "+992", name: "Tajiquistão", abbreviation: "TJ" },
  { ddi: "+255", name: "Tanzânia", abbreviation: "TZ" },
  { ddi: "+670", name: "Timor-Leste", abbreviation: "TL" },
  { ddi: "+676", name: "Tonga", abbreviation: "TO" },
  { ddi: "+1868", name: "Trinidad e Tobago", abbreviation: "TT" },
  { ddi: "+216", name: "Tunísia", abbreviation: "TN" },
  { ddi: "+993", name: "Turcomenistão", abbreviation: "TM" },
  { ddi: "+380", name: "Ucrânia", abbreviation: "UA" },
  { ddi: "+256", name: "Uganda", abbreviation: "UG" },
  { ddi: "+598", name: "Uruguai", abbreviation: "UY" },
  { ddi: "+998", name: "Uzbequistão", abbreviation: "UZ" },
  { ddi: "+678", name: "Vanuatu", abbreviation: "VU" },
  { ddi: "+58", name: "Venezuela", abbreviation: "VE" },
  { ddi: "+84", name: "Vietnã", abbreviation: "VN" },
  { ddi: "+263", name: "Zimbábue", abbreviation: "ZW" },
  { ddi: "+260", name: "Zâmbia", abbreviation: "ZM" },
  { ddi: "+238", name: "cabo Verde", abbreviation: "CV" },
  { ddi: "+27", name: "África do Sul", abbreviation: "ZA" },
  { ddi: "+43", name: "Áustria", abbreviation: "AT" },
  { ddi: "+91", name: "Índia", abbreviation: "IN" }
], Oe = j` <svg
  width="16"
  height="16"
  viewBox="0 0 16 16"
  fill="#000000"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M3 3L12.8995 12.8995"
    stroke="#000000"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M13 3L3.10051 12.8995"
    stroke="#000000"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>`;
var He = Object.defineProperty, Le = Object.getOwnPropertyDescriptor, A = (n, e, i, t) => {
  for (var a = t > 1 ? void 0 : t ? Le(e, i) : e, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (a = (t ? o(e, i, a) : o(a)) || a);
  return t && a && He(e, i, a), a;
};
let p = class extends M {
  constructor() {
    super(...arguments), this._search = "", this._countries = [...ne], this._isModalOpen = !0, this.activeCountry = {
      ddi: "+55",
      name: "Brasil",
      abbreviation: "BR"
    }, this._currentFlagActive = "https://bbtekixf-media-cms-site-production.s3.sa-east-1.amazonaws.com/flags/" + this.activeCountry.abbreviation + ".svg", this.buttonStyles = "";
  }
  openModal() {
    this._isModalOpen = !0;
  }
  closeModal() {
    this._isModalOpen = !1;
  }
  _filterCountries(n) {
    const e = ne.filter(
      (i) => i.name.toLowerCase().includes(n.toLowerCase())
    );
    this._countries = [...e];
  }
  _handleInputSearch(n) {
    this._search = n.target.value, this._filterCountries(this._search);
  }
  _setCountry(n) {
    this.activeCountry = { ...n }, this._currentFlagActive = "https://bbtekixf-media-cms-site-production.s3.sa-east-1.amazonaws.com/flags/" + n.abbreviation + ".svg", this.closeModal();
  }
  render() {
    return j`
      <button
        class="ddi-modal__trigger"
        style=${this.buttonStyles}
        @click=${this.openModal}
      >
        <img
          src=${this._currentFlagActive}
          alt=${`Bandeira ${this.activeCountry.name}`}
        />

        <span class="ddi-modal__arrow"></span>
      </button>

      <div class="ddi-overflow">
        <div class="ddi-modal ${this._isModalOpen ? "show" : ""}" ddi-modal>
          <h3 class="ddi-modal__title">
            Selecione o código de área
            <button class="ddi-modal__close-button" @click=${this.closeModal}>
              ${Oe}
            </button>
          </h3>

          <input
            class="ddi-modal__input"
            type="search"
            placeholder="Buscar"
            value=${this._search}
            @keyup=${this._handleInputSearch}
          />

          <ul class="ddi-modal__list">
            ${this._countries.map(
      (n) => j`
                  <li
                    class="ddi-modal__item"
                    @click=${() => this._setCountry(n)}
                  >
                    <img
                      class="ddi-modal__flag"
                      src=${"https://bbtekixf-media-cms-site-production.s3.sa-east-1.amazonaws.com/flags/" + n.abbreviation + ".svg"}
                      loading="lazy"
                    />
                    ${n.abbreviation} - ${n.name}

                    <span>${n.ddi}</span>
                  </li>
                `
    )}
          </ul>
        </div>
      </div>
    `;
  }
};
p.styles = me`
    button {
      cursor: pointer;
    }

    .ddi-modal {
      position: fixed;
      inset: 0;
      left: 0px;
      background: #fff;
      z-index: 2;
      margin-top: 20vh;
      border-radius: 16px 16px 0 0;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      overflow: scroll;

      display: grid;
      grid-template-rows: auto auto 1fr;
      gap: 20px;
      transform: translateY(110%) translateX(0%);
      transition: transform var(--time-animation) ease;
    }

    @media (min-width: 768px) {
      .ddi-modal {
        inset: initial;
        border-radius: 16px;
        opacity: 0;
        margin: 0;
        transition: opacity var(--time-animation) ease;
        max-height: 50vh;
        max-width: 400px;
        inset: 0;
        margin: auto;
        transform: translateY(0%);
      }
    }

    .ddi-modal.show {
      transform: translateY(0%);
    }

    @media (min-width: 768px) {
      .ddi-modal.show {
        transform: translateY(0%);
        opacity: 1;
      }
    }

    .ddi-modal__trigger {
      display: inline-block;
      height: 20px;
      padding: 0px 0px 0px 0px;
      margin: 0px 0px 0px 0px;
      background-color: transparent;
      border: none;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .ddi-modal__arrow {
      display: inline-block;
      border: 1px solid #000;
      border-top: 0px;
      border-left: 0px;
      transform: rotate(45deg);

      margin-top: -1px;
      width: 4px;
      height: 4px;
    }

    .ddi-modal__title {
      margin: 0px;
      text-align: left;
      font-family: Outfit, sans-serif, Arial, Helvetica;
      font-size: 16px;
      font-weight: bold;
      color: #000;
      padding: 24px 24px 0px;

      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .ddi-modal__close-button {
      background-color: transparent;
      padding: 0px 0px 0px 0px;
      border: 0px;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      width: 24px;
      height: 24px;
    }

    .ddi-modal__input {
      padding: 0px 10px;
      border-radius: 4px;
      height: 40px;
      background-color: transparent;
      border: 1px solid rgb(204, 204, 204);
      margin: 0px 24px;
      color: #000;
    }

    .ddi-modal__list {
      padding: 0px 0px 20px;
      margin: 0px;
      overflow: auto;
      display: flex;
      flex-direction: column;
    }

    .ddi-modal__item {
      font-size: 14px;
      font-family: Outfit, sans-serif, Arial, Helvetica;
      font-weight: 400;
      padding: 14px 24px;

      color: #000;

      display: grid;
      align-items: center;
      grid-template-columns: auto 1fr auto;
      gap: 14px;

      cursor: pointer;
    }

    .ddi-modal__item:hover {
      background: rgba(13, 29, 150, 0.11);
    }

    .ddi-modal__item div {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }

    .ddi-modal__flag {
      background: rgba(0, 0, 0, 0.4);
      border-radius: 50%;
      object-fit: cover;
      object-position: center center;

      display: inline-block;
      width: 32px;
      height: 32px;
    }
  `;
A([
  W()
], p.prototype, "_search", 2);
A([
  W()
], p.prototype, "_countries", 2);
A([
  W()
], p.prototype, "_isModalOpen", 2);
A([
  I()
], p.prototype, "activeCountry", 2);
A([
  I()
], p.prototype, "_currentFlagActive", 2);
A([
  I()
], p.prototype, "buttonStyles", 2);
p = A([
  Ue("g-ddi-modal")
], p);
export {
  p as GDdiModal
};
