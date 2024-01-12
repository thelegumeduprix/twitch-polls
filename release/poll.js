function Zs(e, t) {
  const s = /* @__PURE__ */ Object.create(null), n = e.split(",");
  for (let i = 0; i < n.length; i++)
    s[n[i]] = !0;
  return t ? (i) => !!s[i.toLowerCase()] : (i) => !!s[i];
}
const z = {}, ct = [], Te = () => {
}, Uo = () => !1, ss = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Gs = (e) => e.startsWith("onUpdate:"), le = Object.assign, en = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, Ho = Object.prototype.hasOwnProperty, H = (e, t) => Ho.call(e, t), L = Array.isArray, at = (e) => ns(e) === "[object Map]", Ii = (e) => ns(e) === "[object Set]", F = (e) => typeof e == "function", te = (e) => typeof e == "string", mt = (e) => typeof e == "symbol", Y = (e) => e !== null && typeof e == "object", Ni = (e) => (Y(e) || F(e)) && F(e.then) && F(e.catch), $i = Object.prototype.toString, ns = (e) => $i.call(e), Bo = (e) => ns(e).slice(8, -1), Ai = (e) => ns(e) === "[object Object]", tn = (e) => te(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Jt = /* @__PURE__ */ Zs(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), is = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (s) => t[s] || (t[s] = e(s));
}, Vo = /-(\w)/g, Me = is((e) => e.replace(Vo, (t, s) => s ? s.toUpperCase() : "")), Wo = /\B([A-Z])/g, gt = is(
  (e) => e.replace(Wo, "-$1").toLowerCase()
), os = is((e) => e.charAt(0).toUpperCase() + e.slice(1)), bs = is((e) => e ? `on${os(e)}` : ""), ht = (e, t) => !Object.is(e, t), ws = (e, t) => {
  for (let s = 0; s < e.length; s++)
    e[s](t);
}, Xt = (e, t, s) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: s
  });
}, Ko = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let kn;
const Ms = () => kn || (kn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function rs(e) {
  if (L(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s], i = te(n) ? Qo(n) : rs(n);
      if (i)
        for (const o in i)
          t[o] = i[o];
    }
    return t;
  } else if (te(e) || Y(e))
    return e;
}
const qo = /;(?![^(]*\))/g, Jo = /:([^]+)/, zo = /\/\*[^]*?\*\//g;
function Qo(e) {
  const t = {};
  return e.replace(zo, "").split(qo).forEach((s) => {
    if (s) {
      const n = s.split(Jo);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function St(e) {
  let t = "";
  if (te(e))
    t = e;
  else if (L(e))
    for (let s = 0; s < e.length; s++) {
      const n = St(e[s]);
      n && (t += n + " ");
    }
  else if (Y(e))
    for (const s in e)
      e[s] && (t += s + " ");
  return t.trim();
}
const Yo = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Xo = /* @__PURE__ */ Zs(Yo);
function Mi(e) {
  return !!e || e === "";
}
const xt = (e) => te(e) ? e : e == null ? "" : L(e) || Y(e) && (e.toString === $i || !F(e.toString)) ? JSON.stringify(e, Ri, 2) : String(e), Ri = (e, t) => t && t.__v_isRef ? Ri(e, t.value) : at(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (s, [n, i], o) => (s[vs(n, o) + " =>"] = i, s),
    {}
  )
} : Ii(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((s) => vs(s))
} : mt(t) ? vs(t) : Y(t) && !L(t) && !Ai(t) ? String(t) : t, vs = (e, t = "") => {
  var s;
  return mt(e) ? `Symbol(${(s = e.description) != null ? s : t})` : e;
};
let we;
class Zo {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = we, !t && we && (this.index = (we.scopes || (we.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const s = we;
      try {
        return we = this, t();
      } finally {
        we = s;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    we = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    we = this.parent;
  }
  stop(t) {
    if (this._active) {
      let s, n;
      for (s = 0, n = this.effects.length; s < n; s++)
        this.effects[s].stop();
      for (s = 0, n = this.cleanups.length; s < n; s++)
        this.cleanups[s]();
      if (this.scopes)
        for (s = 0, n = this.scopes.length; s < n; s++)
          this.scopes[s].stop(!0);
      if (!this.detached && this.parent && !t) {
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function Go(e, t = we) {
  t && t.active && t.effects.push(e);
}
function er() {
  return we;
}
const sn = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, Si = (e) => (e.w & Ke) > 0, Li = (e) => (e.n & Ke) > 0, tr = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= Ke;
}, sr = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let s = 0;
    for (let n = 0; n < t.length; n++) {
      const i = t[n];
      Si(i) && !Li(i) ? i.delete(e) : t[s++] = i, i.w &= ~Ke, i.n &= ~Ke;
    }
    t.length = s;
  }
}, Rs = /* @__PURE__ */ new WeakMap();
let Ct = 0, Ke = 1;
const Ss = 30;
let ye;
const Ge = Symbol(""), Ls = Symbol("");
class nn {
  constructor(t, s = null, n) {
    this.fn = t, this.scheduler = s, this.active = !0, this.deps = [], this.parent = void 0, Go(this, n);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = ye, s = Ve;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = ye, ye = this, Ve = !0, Ke = 1 << ++Ct, Ct <= Ss ? tr(this) : Pn(this), this.fn();
    } finally {
      Ct <= Ss && sr(this), Ke = 1 << --Ct, ye = this.parent, Ve = s, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    ye === this ? this.deferStop = !0 : this.active && (Pn(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Pn(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let s = 0; s < t.length; s++)
      t[s].delete(e);
    t.length = 0;
  }
}
let Ve = !0;
const ji = [];
function _t() {
  ji.push(Ve), Ve = !1;
}
function bt() {
  const e = ji.pop();
  Ve = e === void 0 ? !0 : e;
}
function ue(e, t, s) {
  if (Ve && ye) {
    let n = Rs.get(e);
    n || Rs.set(e, n = /* @__PURE__ */ new Map());
    let i = n.get(s);
    i || n.set(s, i = sn()), Fi(i);
  }
}
function Fi(e, t) {
  let s = !1;
  Ct <= Ss ? Li(e) || (e.n |= Ke, s = !Si(e)) : s = !e.has(ye), s && (e.add(ye), ye.deps.push(e));
}
function je(e, t, s, n, i, o) {
  const r = Rs.get(e);
  if (!r)
    return;
  let l = [];
  if (t === "clear")
    l = [...r.values()];
  else if (s === "length" && L(e)) {
    const a = Number(n);
    r.forEach((p, h) => {
      (h === "length" || !mt(h) && h >= a) && l.push(p);
    });
  } else
    switch (s !== void 0 && l.push(r.get(s)), t) {
      case "add":
        L(e) ? tn(s) && l.push(r.get("length")) : (l.push(r.get(Ge)), at(e) && l.push(r.get(Ls)));
        break;
      case "delete":
        L(e) || (l.push(r.get(Ge)), at(e) && l.push(r.get(Ls)));
        break;
      case "set":
        at(e) && l.push(r.get(Ge));
        break;
    }
  if (l.length === 1)
    l[0] && js(l[0]);
  else {
    const a = [];
    for (const p of l)
      p && a.push(...p);
    js(sn(a));
  }
}
function js(e, t) {
  const s = L(e) ? e : [...e];
  for (const n of s)
    n.computed && In(n);
  for (const n of s)
    n.computed || In(n);
}
function In(e, t) {
  (e !== ye || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const nr = /* @__PURE__ */ Zs("__proto__,__v_isRef,__isVue"), Di = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(mt)
), Nn = /* @__PURE__ */ ir();
function ir() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...s) {
      const n = W(this);
      for (let o = 0, r = this.length; o < r; o++)
        ue(n, "get", o + "");
      const i = n[t](...s);
      return i === -1 || i === !1 ? n[t](...s.map(W)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...s) {
      _t();
      const n = W(this)[t].apply(this, s);
      return bt(), n;
    };
  }), e;
}
function or(e) {
  const t = W(this);
  return ue(t, "has", e), t.hasOwnProperty(e);
}
class Ui {
  constructor(t = !1, s = !1) {
    this._isReadonly = t, this._shallow = s;
  }
  get(t, s, n) {
    const i = this._isReadonly, o = this._shallow;
    if (s === "__v_isReactive")
      return !i;
    if (s === "__v_isReadonly")
      return i;
    if (s === "__v_isShallow")
      return o;
    if (s === "__v_raw")
      return n === (i ? o ? br : Wi : o ? Vi : Bi).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const r = L(t);
    if (!i) {
      if (r && H(Nn, s))
        return Reflect.get(Nn, s, n);
      if (s === "hasOwnProperty")
        return or;
    }
    const l = Reflect.get(t, s, n);
    return (mt(s) ? Di.has(s) : nr(s)) || (i || ue(t, "get", s), o) ? l : pe(l) ? r && tn(s) ? l : l.value : Y(l) ? i ? Ki(l) : cs(l) : l;
  }
}
class Hi extends Ui {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, n, i) {
    let o = t[s];
    if (!this._shallow) {
      const a = It(o);
      if (!Fs(n) && !It(n) && (o = W(o), n = W(n)), !L(t) && pe(o) && !pe(n))
        return a ? !1 : (o.value = n, !0);
    }
    const r = L(t) && tn(s) ? Number(s) < t.length : H(t, s), l = Reflect.set(t, s, n, i);
    return t === W(i) && (r ? ht(n, o) && je(t, "set", s, n) : je(t, "add", s, n)), l;
  }
  deleteProperty(t, s) {
    const n = H(t, s);
    t[s];
    const i = Reflect.deleteProperty(t, s);
    return i && n && je(t, "delete", s, void 0), i;
  }
  has(t, s) {
    const n = Reflect.has(t, s);
    return (!mt(s) || !Di.has(s)) && ue(t, "has", s), n;
  }
  ownKeys(t) {
    return ue(
      t,
      "iterate",
      L(t) ? "length" : Ge
    ), Reflect.ownKeys(t);
  }
}
class rr extends Ui {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, s) {
    return !0;
  }
  deleteProperty(t, s) {
    return !0;
  }
}
const lr = /* @__PURE__ */ new Hi(), cr = /* @__PURE__ */ new rr(), ar = /* @__PURE__ */ new Hi(
  !0
), on = (e) => e, ls = (e) => Reflect.getPrototypeOf(e);
function Dt(e, t, s = !1, n = !1) {
  e = e.__v_raw;
  const i = W(e), o = W(t);
  s || (ht(t, o) && ue(i, "get", t), ue(i, "get", o));
  const { has: r } = ls(i), l = n ? on : s ? an : cn;
  if (r.call(i, t))
    return l(e.get(t));
  if (r.call(i, o))
    return l(e.get(o));
  e !== i && e.get(t);
}
function Ut(e, t = !1) {
  const s = this.__v_raw, n = W(s), i = W(e);
  return t || (ht(e, i) && ue(n, "has", e), ue(n, "has", i)), e === i ? s.has(e) : s.has(e) || s.has(i);
}
function Ht(e, t = !1) {
  return e = e.__v_raw, !t && ue(W(e), "iterate", Ge), Reflect.get(e, "size", e);
}
function $n(e) {
  e = W(e);
  const t = W(this);
  return ls(t).has.call(t, e) || (t.add(e), je(t, "add", e, e)), this;
}
function An(e, t) {
  t = W(t);
  const s = W(this), { has: n, get: i } = ls(s);
  let o = n.call(s, e);
  o || (e = W(e), o = n.call(s, e));
  const r = i.call(s, e);
  return s.set(e, t), o ? ht(t, r) && je(s, "set", e, t) : je(s, "add", e, t), this;
}
function Mn(e) {
  const t = W(this), { has: s, get: n } = ls(t);
  let i = s.call(t, e);
  i || (e = W(e), i = s.call(t, e)), n && n.call(t, e);
  const o = t.delete(e);
  return i && je(t, "delete", e, void 0), o;
}
function Rn() {
  const e = W(this), t = e.size !== 0, s = e.clear();
  return t && je(e, "clear", void 0, void 0), s;
}
function Bt(e, t) {
  return function(n, i) {
    const o = this, r = o.__v_raw, l = W(r), a = t ? on : e ? an : cn;
    return !e && ue(l, "iterate", Ge), r.forEach((p, h) => n.call(i, a(p), a(h), o));
  };
}
function Vt(e, t, s) {
  return function(...n) {
    const i = this.__v_raw, o = W(i), r = at(o), l = e === "entries" || e === Symbol.iterator && r, a = e === "keys" && r, p = i[e](...n), h = s ? on : t ? an : cn;
    return !t && ue(
      o,
      "iterate",
      a ? Ls : Ge
    ), {
      // iterator protocol
      next() {
        const { value: O, done: x } = p.next();
        return x ? { value: O, done: x } : {
          value: l ? [h(O[0]), h(O[1])] : h(O),
          done: x
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function He(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function fr() {
  const e = {
    get(o) {
      return Dt(this, o);
    },
    get size() {
      return Ht(this);
    },
    has: Ut,
    add: $n,
    set: An,
    delete: Mn,
    clear: Rn,
    forEach: Bt(!1, !1)
  }, t = {
    get(o) {
      return Dt(this, o, !1, !0);
    },
    get size() {
      return Ht(this);
    },
    has: Ut,
    add: $n,
    set: An,
    delete: Mn,
    clear: Rn,
    forEach: Bt(!1, !0)
  }, s = {
    get(o) {
      return Dt(this, o, !0);
    },
    get size() {
      return Ht(this, !0);
    },
    has(o) {
      return Ut.call(this, o, !0);
    },
    add: He("add"),
    set: He("set"),
    delete: He("delete"),
    clear: He("clear"),
    forEach: Bt(!0, !1)
  }, n = {
    get(o) {
      return Dt(this, o, !0, !0);
    },
    get size() {
      return Ht(this, !0);
    },
    has(o) {
      return Ut.call(this, o, !0);
    },
    add: He("add"),
    set: He("set"),
    delete: He("delete"),
    clear: He("clear"),
    forEach: Bt(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    e[o] = Vt(
      o,
      !1,
      !1
    ), s[o] = Vt(
      o,
      !0,
      !1
    ), t[o] = Vt(
      o,
      !1,
      !0
    ), n[o] = Vt(
      o,
      !0,
      !0
    );
  }), [
    e,
    s,
    t,
    n
  ];
}
const [
  ur,
  hr,
  dr,
  pr
] = /* @__PURE__ */ fr();
function rn(e, t) {
  const s = t ? e ? pr : dr : e ? hr : ur;
  return (n, i, o) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? n : Reflect.get(
    H(s, i) && i in n ? s : n,
    i,
    o
  );
}
const mr = {
  get: /* @__PURE__ */ rn(!1, !1)
}, gr = {
  get: /* @__PURE__ */ rn(!1, !0)
}, _r = {
  get: /* @__PURE__ */ rn(!0, !1)
}, Bi = /* @__PURE__ */ new WeakMap(), Vi = /* @__PURE__ */ new WeakMap(), Wi = /* @__PURE__ */ new WeakMap(), br = /* @__PURE__ */ new WeakMap();
function wr(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function vr(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : wr(Bo(e));
}
function cs(e) {
  return It(e) ? e : ln(
    e,
    !1,
    lr,
    mr,
    Bi
  );
}
function yr(e) {
  return ln(
    e,
    !1,
    ar,
    gr,
    Vi
  );
}
function Ki(e) {
  return ln(
    e,
    !0,
    cr,
    _r,
    Wi
  );
}
function ln(e, t, s, n, i) {
  if (!Y(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = i.get(e);
  if (o)
    return o;
  const r = vr(e);
  if (r === 0)
    return e;
  const l = new Proxy(
    e,
    r === 2 ? n : s
  );
  return i.set(e, l), l;
}
function ft(e) {
  return It(e) ? ft(e.__v_raw) : !!(e && e.__v_isReactive);
}
function It(e) {
  return !!(e && e.__v_isReadonly);
}
function Fs(e) {
  return !!(e && e.__v_isShallow);
}
function qi(e) {
  return ft(e) || It(e);
}
function W(e) {
  const t = e && e.__v_raw;
  return t ? W(t) : e;
}
function Ji(e) {
  return Xt(e, "__v_skip", !0), e;
}
const cn = (e) => Y(e) ? cs(e) : e, an = (e) => Y(e) ? Ki(e) : e;
function xr(e) {
  Ve && ye && (e = W(e), Fi(e.dep || (e.dep = sn())));
}
function Cr(e, t) {
  e = W(e);
  const s = e.dep;
  s && js(s);
}
function pe(e) {
  return !!(e && e.__v_isRef === !0);
}
function Tr(e) {
  return pe(e) ? e.value : e;
}
const Er = {
  get: (e, t, s) => Tr(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const i = e[t];
    return pe(i) && !pe(s) ? (i.value = s, !0) : Reflect.set(e, t, s, n);
  }
};
function zi(e) {
  return ft(e) ? e : new Proxy(e, Er);
}
class Or {
  constructor(t, s, n, i) {
    this._setter = s, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new nn(t, () => {
      this._dirty || (this._dirty = !0, Cr(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !i, this.__v_isReadonly = n;
  }
  get value() {
    const t = W(this);
    return xr(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
function kr(e, t, s = !1) {
  let n, i;
  const o = F(e);
  return o ? (n = e, i = Te) : (n = e.get, i = e.set), new Or(n, i, o || !i, s);
}
function We(e, t, s, n) {
  let i;
  try {
    i = n ? e(...n) : e();
  } catch (o) {
    as(o, t, s);
  }
  return i;
}
function Ee(e, t, s, n) {
  if (F(e)) {
    const o = We(e, t, s, n);
    return o && Ni(o) && o.catch((r) => {
      as(r, t, s);
    }), o;
  }
  const i = [];
  for (let o = 0; o < e.length; o++)
    i.push(Ee(e[o], t, s, n));
  return i;
}
function as(e, t, s, n = !0) {
  const i = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const r = t.proxy, l = s;
    for (; o; ) {
      const p = o.ec;
      if (p) {
        for (let h = 0; h < p.length; h++)
          if (p[h](e, r, l) === !1)
            return;
      }
      o = o.parent;
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      We(
        a,
        null,
        10,
        [e, r, l]
      );
      return;
    }
  }
  Pr(e, s, i, n);
}
function Pr(e, t, s, n = !0) {
  console.error(e);
}
let Nt = !1, Ds = !1;
const re = [];
let $e = 0;
const ut = [];
let Le = null, Ye = 0;
const Qi = /* @__PURE__ */ Promise.resolve();
let fn = null;
function Ir(e) {
  const t = fn || Qi;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Nr(e) {
  let t = $e + 1, s = re.length;
  for (; t < s; ) {
    const n = t + s >>> 1, i = re[n], o = $t(i);
    o < e || o === e && i.pre ? t = n + 1 : s = n;
  }
  return t;
}
function un(e) {
  (!re.length || !re.includes(
    e,
    Nt && e.allowRecurse ? $e + 1 : $e
  )) && (e.id == null ? re.push(e) : re.splice(Nr(e.id), 0, e), Yi());
}
function Yi() {
  !Nt && !Ds && (Ds = !0, fn = Qi.then(Zi));
}
function $r(e) {
  const t = re.indexOf(e);
  t > $e && re.splice(t, 1);
}
function Ar(e) {
  L(e) ? ut.push(...e) : (!Le || !Le.includes(
    e,
    e.allowRecurse ? Ye + 1 : Ye
  )) && ut.push(e), Yi();
}
function Sn(e, t, s = Nt ? $e + 1 : 0) {
  for (; s < re.length; s++) {
    const n = re[s];
    if (n && n.pre) {
      if (e && n.id !== e.uid)
        continue;
      re.splice(s, 1), s--, n();
    }
  }
}
function Xi(e) {
  if (ut.length) {
    const t = [...new Set(ut)];
    if (ut.length = 0, Le) {
      Le.push(...t);
      return;
    }
    for (Le = t, Le.sort((s, n) => $t(s) - $t(n)), Ye = 0; Ye < Le.length; Ye++)
      Le[Ye]();
    Le = null, Ye = 0;
  }
}
const $t = (e) => e.id == null ? 1 / 0 : e.id, Mr = (e, t) => {
  const s = $t(e) - $t(t);
  if (s === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return s;
};
function Zi(e) {
  Ds = !1, Nt = !0, re.sort(Mr);
  const t = Te;
  try {
    for ($e = 0; $e < re.length; $e++) {
      const s = re[$e];
      s && s.active !== !1 && We(s, null, 14);
    }
  } finally {
    $e = 0, re.length = 0, Xi(), Nt = !1, fn = null, (re.length || ut.length) && Zi();
  }
}
function Rr(e, t, ...s) {
  if (e.isUnmounted)
    return;
  const n = e.vnode.props || z;
  let i = s;
  const o = t.startsWith("update:"), r = o && t.slice(7);
  if (r && r in n) {
    const h = `${r === "modelValue" ? "model" : r}Modifiers`, { number: O, trim: x } = n[h] || z;
    x && (i = s.map((k) => te(k) ? k.trim() : k)), O && (i = s.map(Ko));
  }
  let l, a = n[l = bs(t)] || // also try camelCase event handler (#2249)
  n[l = bs(Me(t))];
  !a && o && (a = n[l = bs(gt(t))]), a && Ee(
    a,
    e,
    6,
    i
  );
  const p = n[l + "Once"];
  if (p) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, Ee(
      p,
      e,
      6,
      i
    );
  }
}
function Gi(e, t, s = !1) {
  const n = t.emitsCache, i = n.get(e);
  if (i !== void 0)
    return i;
  const o = e.emits;
  let r = {}, l = !1;
  if (!F(e)) {
    const a = (p) => {
      const h = Gi(p, t, !0);
      h && (l = !0, le(r, h));
    };
    !s && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !o && !l ? (Y(e) && n.set(e, null), null) : (L(o) ? o.forEach((a) => r[a] = null) : le(r, o), Y(e) && n.set(e, r), r);
}
function fs(e, t) {
  return !e || !ss(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), H(e, t[0].toLowerCase() + t.slice(1)) || H(e, gt(t)) || H(e, t));
}
let de = null, eo = null;
function Zt(e) {
  const t = de;
  return de = e, eo = e && e.type.__scopeId || null, t;
}
function Sr(e, t = de, s) {
  if (!t || e._n)
    return e;
  const n = (...i) => {
    n._d && qn(-1);
    const o = Zt(t);
    let r;
    try {
      r = e(...i);
    } finally {
      Zt(o), n._d && qn(1);
    }
    return r;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function ys(e) {
  const {
    type: t,
    vnode: s,
    proxy: n,
    withProxy: i,
    props: o,
    propsOptions: [r],
    slots: l,
    attrs: a,
    emit: p,
    render: h,
    renderCache: O,
    data: x,
    setupState: k,
    ctx: d,
    inheritAttrs: u
  } = e;
  let g, R;
  const I = Zt(e);
  try {
    if (s.shapeFlag & 4) {
      const b = i || n, U = b;
      g = Ne(
        h.call(
          U,
          b,
          O,
          o,
          k,
          x,
          d
        )
      ), R = a;
    } else {
      const b = t;
      g = Ne(
        b.length > 1 ? b(
          o,
          { attrs: a, slots: l, emit: p }
        ) : b(
          o,
          null
          /* we know it doesn't need it */
        )
      ), R = t.props ? a : Lr(a);
    }
  } catch (b) {
    kt.length = 0, as(b, e, 1), g = Ae(st);
  }
  let _ = g;
  if (R && u !== !1) {
    const b = Object.keys(R), { shapeFlag: U } = _;
    b.length && U & 7 && (r && b.some(Gs) && (R = jr(
      R,
      r
    )), _ = dt(_, R));
  }
  return s.dirs && (_ = dt(_), _.dirs = _.dirs ? _.dirs.concat(s.dirs) : s.dirs), s.transition && (_.transition = s.transition), g = _, Zt(I), g;
}
const Lr = (e) => {
  let t;
  for (const s in e)
    (s === "class" || s === "style" || ss(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, jr = (e, t) => {
  const s = {};
  for (const n in e)
    (!Gs(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
  return s;
};
function Fr(e, t, s) {
  const { props: n, children: i, component: o } = e, { props: r, children: l, patchFlag: a } = t, p = o.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (s && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return n ? Ln(n, r, p) : !!r;
    if (a & 8) {
      const h = t.dynamicProps;
      for (let O = 0; O < h.length; O++) {
        const x = h[O];
        if (r[x] !== n[x] && !fs(p, x))
          return !0;
      }
    }
  } else
    return (i || l) && (!l || !l.$stable) ? !0 : n === r ? !1 : n ? r ? Ln(n, r, p) : !0 : !!r;
  return !1;
}
function Ln(e, t, s) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < n.length; i++) {
    const o = n[i];
    if (t[o] !== e[o] && !fs(s, o))
      return !0;
  }
  return !1;
}
function Dr({ vnode: e, parent: t }, s) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = s, t = t.parent;
}
const to = "components";
function Us(e, t) {
  return Hr(to, e, !0, t) || e;
}
const Ur = Symbol.for("v-ndc");
function Hr(e, t, s = !0, n = !1) {
  const i = de || ne;
  if (i) {
    const o = i.type;
    if (e === to) {
      const l = jl(
        o,
        !1
        /* do not include inferred name to avoid breaking existing code */
      );
      if (l && (l === t || l === Me(t) || l === os(Me(t))))
        return o;
    }
    const r = (
      // local registration
      // check instance[type] first which is resolved for options API
      jn(i[e] || o[e], t) || // global registration
      jn(i.appContext[e], t)
    );
    return !r && n ? o : r;
  }
}
function jn(e, t) {
  return e && (e[t] || e[Me(t)] || e[os(Me(t))]);
}
const Br = (e) => e.__isSuspense;
function Vr(e, t) {
  t && t.pendingBranch ? L(e) ? t.effects.push(...e) : t.effects.push(e) : Ar(e);
}
function Wr(e, t) {
  return hn(
    e,
    null,
    { flush: "post" }
  );
}
const Wt = {};
function xs(e, t, s) {
  return hn(e, t, s);
}
function hn(e, t, { immediate: s, deep: n, flush: i, onTrack: o, onTrigger: r } = z) {
  var l;
  const a = er() === ((l = ne) == null ? void 0 : l.scope) ? ne : null;
  let p, h = !1, O = !1;
  if (pe(e) ? (p = () => e.value, h = Fs(e)) : ft(e) ? (p = () => e, n = !0) : L(e) ? (O = !0, h = e.some((b) => ft(b) || Fs(b)), p = () => e.map((b) => {
    if (pe(b))
      return b.value;
    if (ft(b))
      return Ze(b);
    if (F(b))
      return We(b, a, 2);
  })) : F(e) ? t ? p = () => We(e, a, 2) : p = () => {
    if (!(a && a.isUnmounted))
      return x && x(), Ee(
        e,
        a,
        3,
        [k]
      );
  } : p = Te, t && n) {
    const b = p;
    p = () => Ze(b());
  }
  let x, k = (b) => {
    x = I.onStop = () => {
      We(b, a, 4), x = I.onStop = void 0;
    };
  }, d;
  if (Mt)
    if (k = Te, t ? s && Ee(t, a, 3, [
      p(),
      O ? [] : void 0,
      k
    ]) : p(), i === "sync") {
      const b = Hl();
      d = b.__watcherHandles || (b.__watcherHandles = []);
    } else
      return Te;
  let u = O ? new Array(e.length).fill(Wt) : Wt;
  const g = () => {
    if (I.active)
      if (t) {
        const b = I.run();
        (n || h || (O ? b.some((U, X) => ht(U, u[X])) : ht(b, u))) && (x && x(), Ee(t, a, 3, [
          b,
          // pass undefined as the old value when it's changed for the first time
          u === Wt ? void 0 : O && u[0] === Wt ? [] : u,
          k
        ]), u = b);
      } else
        I.run();
  };
  g.allowRecurse = !!t;
  let R;
  i === "sync" ? R = g : i === "post" ? R = () => fe(g, a && a.suspense) : (g.pre = !0, a && (g.id = a.uid), R = () => un(g));
  const I = new nn(p, R);
  t ? s ? g() : u = I.run() : i === "post" ? fe(
    I.run.bind(I),
    a && a.suspense
  ) : I.run();
  const _ = () => {
    I.stop(), a && a.scope && en(a.scope.effects, I);
  };
  return d && d.push(_), _;
}
function Kr(e, t, s) {
  const n = this.proxy, i = te(e) ? e.includes(".") ? so(n, e) : () => n[e] : e.bind(n, n);
  let o;
  F(t) ? o = t : (o = t.handler, s = t);
  const r = ne;
  pt(this);
  const l = hn(i, o.bind(n), s);
  return r ? pt(r) : tt(), l;
}
function so(e, t) {
  const s = t.split(".");
  return () => {
    let n = e;
    for (let i = 0; i < s.length && n; i++)
      n = n[s[i]];
    return n;
  };
}
function Ze(e, t) {
  if (!Y(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), pe(e))
    Ze(e.value, t);
  else if (L(e))
    for (let s = 0; s < e.length; s++)
      Ze(e[s], t);
  else if (Ii(e) || at(e))
    e.forEach((s) => {
      Ze(s, t);
    });
  else if (Ai(e))
    for (const s in e)
      Ze(e[s], t);
  return e;
}
function qr(e, t) {
  const s = de;
  if (s === null)
    return e;
  const n = ps(s) || s.proxy, i = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [r, l, a, p = z] = t[o];
    r && (F(r) && (r = {
      mounted: r,
      updated: r
    }), r.deep && Ze(l), i.push({
      dir: r,
      instance: n,
      value: l,
      oldValue: void 0,
      arg: a,
      modifiers: p
    }));
  }
  return e;
}
function ze(e, t, s, n) {
  const i = e.dirs, o = t && t.dirs;
  for (let r = 0; r < i.length; r++) {
    const l = i[r];
    o && (l.oldValue = o[r].value);
    let a = l.dir[n];
    a && (_t(), Ee(a, s, 8, [
      e.el,
      l,
      e,
      t
    ]), bt());
  }
}
const zt = (e) => !!e.type.__asyncLoader, no = (e) => e.type.__isKeepAlive;
function Jr(e, t) {
  io(e, "a", t);
}
function zr(e, t) {
  io(e, "da", t);
}
function io(e, t, s = ne) {
  const n = e.__wdc || (e.__wdc = () => {
    let i = s;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return e();
  });
  if (us(t, n, s), s) {
    let i = s.parent;
    for (; i && i.parent; )
      no(i.parent.vnode) && Qr(n, t, s, i), i = i.parent;
  }
}
function Qr(e, t, s, n) {
  const i = us(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  dn(() => {
    en(n[t], i);
  }, s);
}
function us(e, t, s = ne, n = !1) {
  if (s) {
    const i = s[e] || (s[e] = []), o = t.__weh || (t.__weh = (...r) => {
      if (s.isUnmounted)
        return;
      _t(), pt(s);
      const l = Ee(t, s, e, r);
      return tt(), bt(), l;
    });
    return n ? i.unshift(o) : i.push(o), o;
  }
}
const De = (e) => (t, s = ne) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!Mt || e === "sp") && us(e, (...n) => t(...n), s)
), Yr = De("bm"), oo = De("m"), Xr = De("bu"), Zr = De("u"), Gr = De("bum"), dn = De("um"), el = De("sp"), tl = De(
  "rtg"
), sl = De(
  "rtc"
);
function nl(e, t = ne) {
  us("ec", e, t);
}
function il(e, t, s, n) {
  let i;
  const o = s && s[n];
  if (L(e) || te(e)) {
    i = new Array(e.length);
    for (let r = 0, l = e.length; r < l; r++)
      i[r] = t(e[r], r, void 0, o && o[r]);
  } else if (typeof e == "number") {
    i = new Array(e);
    for (let r = 0; r < e; r++)
      i[r] = t(r + 1, r, void 0, o && o[r]);
  } else if (Y(e))
    if (e[Symbol.iterator])
      i = Array.from(
        e,
        (r, l) => t(r, l, void 0, o && o[l])
      );
    else {
      const r = Object.keys(e);
      i = new Array(r.length);
      for (let l = 0, a = r.length; l < a; l++) {
        const p = r[l];
        i[l] = t(e[p], p, l, o && o[l]);
      }
    }
  else
    i = [];
  return s && (s[n] = i), i;
}
const Hs = (e) => e ? wo(e) ? ps(e) || e.proxy : Hs(e.parent) : null, Et = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ le(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Hs(e.parent),
    $root: (e) => Hs(e.root),
    $emit: (e) => e.emit,
    $options: (e) => pn(e),
    $forceUpdate: (e) => e.f || (e.f = () => un(e.update)),
    $nextTick: (e) => e.n || (e.n = Ir.bind(e.proxy)),
    $watch: (e) => Kr.bind(e)
  })
), Cs = (e, t) => e !== z && !e.__isScriptSetup && H(e, t), ol = {
  get({ _: e }, t) {
    const { ctx: s, setupState: n, data: i, props: o, accessCache: r, type: l, appContext: a } = e;
    let p;
    if (t[0] !== "$") {
      const k = r[t];
      if (k !== void 0)
        switch (k) {
          case 1:
            return n[t];
          case 2:
            return i[t];
          case 4:
            return s[t];
          case 3:
            return o[t];
        }
      else {
        if (Cs(n, t))
          return r[t] = 1, n[t];
        if (i !== z && H(i, t))
          return r[t] = 2, i[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (p = e.propsOptions[0]) && H(p, t)
        )
          return r[t] = 3, o[t];
        if (s !== z && H(s, t))
          return r[t] = 4, s[t];
        Bs && (r[t] = 0);
      }
    }
    const h = Et[t];
    let O, x;
    if (h)
      return t === "$attrs" && ue(e, "get", t), h(e);
    if (
      // css module (injected by vue-loader)
      (O = l.__cssModules) && (O = O[t])
    )
      return O;
    if (s !== z && H(s, t))
      return r[t] = 4, s[t];
    if (
      // global properties
      x = a.config.globalProperties, H(x, t)
    )
      return x[t];
  },
  set({ _: e }, t, s) {
    const { data: n, setupState: i, ctx: o } = e;
    return Cs(i, t) ? (i[t] = s, !0) : n !== z && H(n, t) ? (n[t] = s, !0) : H(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: i, propsOptions: o }
  }, r) {
    let l;
    return !!s[r] || e !== z && H(e, r) || Cs(t, r) || (l = o[0]) && H(l, r) || H(n, r) || H(Et, r) || H(i.config.globalProperties, r);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : H(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function Fn(e) {
  return L(e) ? e.reduce(
    (t, s) => (t[s] = null, t),
    {}
  ) : e;
}
let Bs = !0;
function rl(e) {
  const t = pn(e), s = e.proxy, n = e.ctx;
  Bs = !1, t.beforeCreate && Dn(t.beforeCreate, e, "bc");
  const {
    // state
    data: i,
    computed: o,
    methods: r,
    watch: l,
    provide: a,
    inject: p,
    // lifecycle
    created: h,
    beforeMount: O,
    mounted: x,
    beforeUpdate: k,
    updated: d,
    activated: u,
    deactivated: g,
    beforeDestroy: R,
    beforeUnmount: I,
    destroyed: _,
    unmounted: b,
    render: U,
    renderTracked: X,
    renderTriggered: Q,
    errorCaptured: V,
    serverPrefetch: B,
    // public API
    expose: $,
    inheritAttrs: G,
    // assets
    components: me,
    directives: Ue,
    filters: ms
  } = t;
  if (p && ll(p, n, null), r)
    for (const Z in r) {
      const q = r[Z];
      F(q) && (n[Z] = q.bind(s));
    }
  if (i) {
    const Z = i.call(s, s);
    Y(Z) && (e.data = cs(Z));
  }
  if (Bs = !0, o)
    for (const Z in o) {
      const q = o[Z], qe = F(q) ? q.bind(s, s) : F(q.get) ? q.get.bind(s, s) : Te, jt = !F(q) && F(q.set) ? q.set.bind(s) : Te, Je = Dl({
        get: qe,
        set: jt
      });
      Object.defineProperty(n, Z, {
        enumerable: !0,
        configurable: !0,
        get: () => Je.value,
        set: (Oe) => Je.value = Oe
      });
    }
  if (l)
    for (const Z in l)
      ro(l[Z], n, s, Z);
  if (a) {
    const Z = F(a) ? a.call(s) : a;
    Reflect.ownKeys(Z).forEach((q) => {
      dl(q, Z[q]);
    });
  }
  h && Dn(h, e, "c");
  function ce(Z, q) {
    L(q) ? q.forEach((qe) => Z(qe.bind(s))) : q && Z(q.bind(s));
  }
  if (ce(Yr, O), ce(oo, x), ce(Xr, k), ce(Zr, d), ce(Jr, u), ce(zr, g), ce(nl, V), ce(sl, X), ce(tl, Q), ce(Gr, I), ce(dn, b), ce(el, B), L($))
    if ($.length) {
      const Z = e.exposed || (e.exposed = {});
      $.forEach((q) => {
        Object.defineProperty(Z, q, {
          get: () => s[q],
          set: (qe) => s[q] = qe
        });
      });
    } else
      e.exposed || (e.exposed = {});
  U && e.render === Te && (e.render = U), G != null && (e.inheritAttrs = G), me && (e.components = me), Ue && (e.directives = Ue);
}
function ll(e, t, s = Te) {
  L(e) && (e = Vs(e));
  for (const n in e) {
    const i = e[n];
    let o;
    Y(i) ? "default" in i ? o = Qt(
      i.from || n,
      i.default,
      !0
      /* treat default function as factory */
    ) : o = Qt(i.from || n) : o = Qt(i), pe(o) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (r) => o.value = r
    }) : t[n] = o;
  }
}
function Dn(e, t, s) {
  Ee(
    L(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    s
  );
}
function ro(e, t, s, n) {
  const i = n.includes(".") ? so(s, n) : () => s[n];
  if (te(e)) {
    const o = t[e];
    F(o) && xs(i, o);
  } else if (F(e))
    xs(i, e.bind(s));
  else if (Y(e))
    if (L(e))
      e.forEach((o) => ro(o, t, s, n));
    else {
      const o = F(e.handler) ? e.handler.bind(s) : t[e.handler];
      F(o) && xs(i, o, e);
    }
}
function pn(e) {
  const t = e.type, { mixins: s, extends: n } = t, {
    mixins: i,
    optionsCache: o,
    config: { optionMergeStrategies: r }
  } = e.appContext, l = o.get(t);
  let a;
  return l ? a = l : !i.length && !s && !n ? a = t : (a = {}, i.length && i.forEach(
    (p) => Gt(a, p, r, !0)
  ), Gt(a, t, r)), Y(t) && o.set(t, a), a;
}
function Gt(e, t, s, n = !1) {
  const { mixins: i, extends: o } = t;
  o && Gt(e, o, s, !0), i && i.forEach(
    (r) => Gt(e, r, s, !0)
  );
  for (const r in t)
    if (!(n && r === "expose")) {
      const l = cl[r] || s && s[r];
      e[r] = l ? l(e[r], t[r]) : t[r];
    }
  return e;
}
const cl = {
  data: Un,
  props: Hn,
  emits: Hn,
  // objects
  methods: Tt,
  computed: Tt,
  // lifecycle
  beforeCreate: ae,
  created: ae,
  beforeMount: ae,
  mounted: ae,
  beforeUpdate: ae,
  updated: ae,
  beforeDestroy: ae,
  beforeUnmount: ae,
  destroyed: ae,
  unmounted: ae,
  activated: ae,
  deactivated: ae,
  errorCaptured: ae,
  serverPrefetch: ae,
  // assets
  components: Tt,
  directives: Tt,
  // watch
  watch: fl,
  // provide / inject
  provide: Un,
  inject: al
};
function Un(e, t) {
  return t ? e ? function() {
    return le(
      F(e) ? e.call(this, this) : e,
      F(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function al(e, t) {
  return Tt(Vs(e), Vs(t));
}
function Vs(e) {
  if (L(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++)
      t[e[s]] = e[s];
    return t;
  }
  return e;
}
function ae(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Tt(e, t) {
  return e ? le(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Hn(e, t) {
  return e ? L(e) && L(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : le(
    /* @__PURE__ */ Object.create(null),
    Fn(e),
    Fn(t ?? {})
  ) : t;
}
function fl(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const s = le(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    s[n] = ae(e[n], t[n]);
  return s;
}
function lo() {
  return {
    app: null,
    config: {
      isNativeTag: Uo,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let ul = 0;
function hl(e, t) {
  return function(n, i = null) {
    F(n) || (n = le({}, n)), i != null && !Y(i) && (i = null);
    const o = lo(), r = /* @__PURE__ */ new WeakSet();
    let l = !1;
    const a = o.app = {
      _uid: ul++,
      _component: n,
      _props: i,
      _container: null,
      _context: o,
      _instance: null,
      version: Bl,
      get config() {
        return o.config;
      },
      set config(p) {
      },
      use(p, ...h) {
        return r.has(p) || (p && F(p.install) ? (r.add(p), p.install(a, ...h)) : F(p) && (r.add(p), p(a, ...h))), a;
      },
      mixin(p) {
        return o.mixins.includes(p) || o.mixins.push(p), a;
      },
      component(p, h) {
        return h ? (o.components[p] = h, a) : o.components[p];
      },
      directive(p, h) {
        return h ? (o.directives[p] = h, a) : o.directives[p];
      },
      mount(p, h, O) {
        if (!l) {
          const x = Ae(n, i);
          return x.appContext = o, h && t ? t(x, p) : e(x, p, O), l = !0, a._container = p, p.__vue_app__ = a, ps(x.component) || x.component.proxy;
        }
      },
      unmount() {
        l && (e(null, a._container), delete a._container.__vue_app__);
      },
      provide(p, h) {
        return o.provides[p] = h, a;
      },
      runWithContext(p) {
        es = a;
        try {
          return p();
        } finally {
          es = null;
        }
      }
    };
    return a;
  };
}
let es = null;
function dl(e, t) {
  if (ne) {
    let s = ne.provides;
    const n = ne.parent && ne.parent.provides;
    n === s && (s = ne.provides = Object.create(n)), s[e] = t;
  }
}
function Qt(e, t, s = !1) {
  const n = ne || de;
  if (n || es) {
    const i = n ? n.parent == null ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : es._context.provides;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return s && F(t) ? t.call(n && n.proxy) : t;
  }
}
function pl(e, t, s, n = !1) {
  const i = {}, o = {};
  Xt(o, ds, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), co(e, t, i, o);
  for (const r in e.propsOptions[0])
    r in i || (i[r] = void 0);
  s ? e.props = n ? i : yr(i) : e.type.props ? e.props = i : e.props = o, e.attrs = o;
}
function ml(e, t, s, n) {
  const {
    props: i,
    attrs: o,
    vnode: { patchFlag: r }
  } = e, l = W(i), [a] = e.propsOptions;
  let p = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || r > 0) && !(r & 16)
  ) {
    if (r & 8) {
      const h = e.vnode.dynamicProps;
      for (let O = 0; O < h.length; O++) {
        let x = h[O];
        if (fs(e.emitsOptions, x))
          continue;
        const k = t[x];
        if (a)
          if (H(o, x))
            k !== o[x] && (o[x] = k, p = !0);
          else {
            const d = Me(x);
            i[d] = Ws(
              a,
              l,
              d,
              k,
              e,
              !1
              /* isAbsent */
            );
          }
        else
          k !== o[x] && (o[x] = k, p = !0);
      }
    }
  } else {
    co(e, t, i, o) && (p = !0);
    let h;
    for (const O in l)
      (!t || // for camelCase
      !H(t, O) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((h = gt(O)) === O || !H(t, h))) && (a ? s && // for camelCase
      (s[O] !== void 0 || // for kebab-case
      s[h] !== void 0) && (i[O] = Ws(
        a,
        l,
        O,
        void 0,
        e,
        !0
        /* isAbsent */
      )) : delete i[O]);
    if (o !== l)
      for (const O in o)
        (!t || !H(t, O)) && (delete o[O], p = !0);
  }
  p && je(e, "set", "$attrs");
}
function co(e, t, s, n) {
  const [i, o] = e.propsOptions;
  let r = !1, l;
  if (t)
    for (let a in t) {
      if (Jt(a))
        continue;
      const p = t[a];
      let h;
      i && H(i, h = Me(a)) ? !o || !o.includes(h) ? s[h] = p : (l || (l = {}))[h] = p : fs(e.emitsOptions, a) || (!(a in n) || p !== n[a]) && (n[a] = p, r = !0);
    }
  if (o) {
    const a = W(s), p = l || z;
    for (let h = 0; h < o.length; h++) {
      const O = o[h];
      s[O] = Ws(
        i,
        a,
        O,
        p[O],
        e,
        !H(p, O)
      );
    }
  }
  return r;
}
function Ws(e, t, s, n, i, o) {
  const r = e[s];
  if (r != null) {
    const l = H(r, "default");
    if (l && n === void 0) {
      const a = r.default;
      if (r.type !== Function && !r.skipFactory && F(a)) {
        const { propsDefaults: p } = i;
        s in p ? n = p[s] : (pt(i), n = p[s] = a.call(
          null,
          t
        ), tt());
      } else
        n = a;
    }
    r[
      0
      /* shouldCast */
    ] && (o && !l ? n = !1 : r[
      1
      /* shouldCastTrue */
    ] && (n === "" || n === gt(s)) && (n = !0));
  }
  return n;
}
function ao(e, t, s = !1) {
  const n = t.propsCache, i = n.get(e);
  if (i)
    return i;
  const o = e.props, r = {}, l = [];
  let a = !1;
  if (!F(e)) {
    const h = (O) => {
      a = !0;
      const [x, k] = ao(O, t, !0);
      le(r, x), k && l.push(...k);
    };
    !s && t.mixins.length && t.mixins.forEach(h), e.extends && h(e.extends), e.mixins && e.mixins.forEach(h);
  }
  if (!o && !a)
    return Y(e) && n.set(e, ct), ct;
  if (L(o))
    for (let h = 0; h < o.length; h++) {
      const O = Me(o[h]);
      Bn(O) && (r[O] = z);
    }
  else if (o)
    for (const h in o) {
      const O = Me(h);
      if (Bn(O)) {
        const x = o[h], k = r[O] = L(x) || F(x) ? { type: x } : le({}, x);
        if (k) {
          const d = Kn(Boolean, k.type), u = Kn(String, k.type);
          k[
            0
            /* shouldCast */
          ] = d > -1, k[
            1
            /* shouldCastTrue */
          ] = u < 0 || d < u, (d > -1 || H(k, "default")) && l.push(O);
        }
      }
    }
  const p = [r, l];
  return Y(e) && n.set(e, p), p;
}
function Bn(e) {
  return e[0] !== "$";
}
function Vn(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function Wn(e, t) {
  return Vn(e) === Vn(t);
}
function Kn(e, t) {
  return L(t) ? t.findIndex((s) => Wn(s, e)) : F(t) && Wn(t, e) ? 0 : -1;
}
const fo = (e) => e[0] === "_" || e === "$stable", mn = (e) => L(e) ? e.map(Ne) : [Ne(e)], gl = (e, t, s) => {
  if (t._n)
    return t;
  const n = Sr((...i) => mn(t(...i)), s);
  return n._c = !1, n;
}, uo = (e, t, s) => {
  const n = e._ctx;
  for (const i in e) {
    if (fo(i))
      continue;
    const o = e[i];
    if (F(o))
      t[i] = gl(i, o, n);
    else if (o != null) {
      const r = mn(o);
      t[i] = () => r;
    }
  }
}, ho = (e, t) => {
  const s = mn(t);
  e.slots.default = () => s;
}, _l = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (e.slots = W(t), Xt(t, "_", s)) : uo(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && ho(e, t);
  Xt(e.slots, ds, 1);
}, bl = (e, t, s) => {
  const { vnode: n, slots: i } = e;
  let o = !0, r = z;
  if (n.shapeFlag & 32) {
    const l = t._;
    l ? s && l === 1 ? o = !1 : (le(i, t), !s && l === 1 && delete i._) : (o = !t.$stable, uo(t, i)), r = t;
  } else
    t && (ho(e, t), r = { default: 1 });
  if (o)
    for (const l in i)
      !fo(l) && r[l] == null && delete i[l];
};
function Ks(e, t, s, n, i = !1) {
  if (L(e)) {
    e.forEach(
      (x, k) => Ks(
        x,
        t && (L(t) ? t[k] : t),
        s,
        n,
        i
      )
    );
    return;
  }
  if (zt(n) && !i)
    return;
  const o = n.shapeFlag & 4 ? ps(n.component) || n.component.proxy : n.el, r = i ? null : o, { i: l, r: a } = e, p = t && t.r, h = l.refs === z ? l.refs = {} : l.refs, O = l.setupState;
  if (p != null && p !== a && (te(p) ? (h[p] = null, H(O, p) && (O[p] = null)) : pe(p) && (p.value = null)), F(a))
    We(a, l, 12, [r, h]);
  else {
    const x = te(a), k = pe(a);
    if (x || k) {
      const d = () => {
        if (e.f) {
          const u = x ? H(O, a) ? O[a] : h[a] : a.value;
          i ? L(u) && en(u, o) : L(u) ? u.includes(o) || u.push(o) : x ? (h[a] = [o], H(O, a) && (O[a] = h[a])) : (a.value = [o], e.k && (h[e.k] = a.value));
        } else
          x ? (h[a] = r, H(O, a) && (O[a] = r)) : k && (a.value = r, e.k && (h[e.k] = r));
      };
      r ? (d.id = -1, fe(d, s)) : d();
    }
  }
}
const fe = Vr;
function wl(e) {
  return vl(e);
}
function vl(e, t) {
  const s = Ms();
  s.__VUE__ = !0;
  const {
    insert: n,
    remove: i,
    patchProp: o,
    createElement: r,
    createText: l,
    createComment: a,
    setText: p,
    setElementText: h,
    parentNode: O,
    nextSibling: x,
    setScopeId: k = Te,
    insertStaticContent: d
  } = e, u = (c, f, m, w = null, v = null, T = null, P = !1, C = null, E = !!f.dynamicChildren) => {
    if (c === f)
      return;
    c && !vt(c, f) && (w = Ft(c), Oe(c, v, T, !0), c = null), f.patchFlag === -2 && (E = !1, f.dynamicChildren = null);
    const { type: y, ref: A, shapeFlag: N } = f;
    switch (y) {
      case hs:
        g(c, f, m, w);
        break;
      case st:
        R(c, f, m, w);
        break;
      case Ot:
        c == null && I(f, m, w, P);
        break;
      case ve:
        me(
          c,
          f,
          m,
          w,
          v,
          T,
          P,
          C,
          E
        );
        break;
      default:
        N & 1 ? U(
          c,
          f,
          m,
          w,
          v,
          T,
          P,
          C,
          E
        ) : N & 6 ? Ue(
          c,
          f,
          m,
          w,
          v,
          T,
          P,
          C,
          E
        ) : (N & 64 || N & 128) && y.process(
          c,
          f,
          m,
          w,
          v,
          T,
          P,
          C,
          E,
          nt
        );
    }
    A != null && v && Ks(A, c && c.ref, T, f || c, !f);
  }, g = (c, f, m, w) => {
    if (c == null)
      n(
        f.el = l(f.children),
        m,
        w
      );
    else {
      const v = f.el = c.el;
      f.children !== c.children && p(v, f.children);
    }
  }, R = (c, f, m, w) => {
    c == null ? n(
      f.el = a(f.children || ""),
      m,
      w
    ) : f.el = c.el;
  }, I = (c, f, m, w) => {
    [c.el, c.anchor] = d(
      c.children,
      f,
      m,
      w,
      c.el,
      c.anchor
    );
  }, _ = ({ el: c, anchor: f }, m, w) => {
    let v;
    for (; c && c !== f; )
      v = x(c), n(c, m, w), c = v;
    n(f, m, w);
  }, b = ({ el: c, anchor: f }) => {
    let m;
    for (; c && c !== f; )
      m = x(c), i(c), c = m;
    i(f);
  }, U = (c, f, m, w, v, T, P, C, E) => {
    P = P || f.type === "svg", c == null ? X(
      f,
      m,
      w,
      v,
      T,
      P,
      C,
      E
    ) : B(
      c,
      f,
      v,
      T,
      P,
      C,
      E
    );
  }, X = (c, f, m, w, v, T, P, C) => {
    let E, y;
    const { type: A, props: N, shapeFlag: M, transition: j, dirs: D } = c;
    if (E = c.el = r(
      c.type,
      T,
      N && N.is,
      N
    ), M & 8 ? h(E, c.children) : M & 16 && V(
      c.children,
      E,
      null,
      w,
      v,
      T && A !== "foreignObject",
      P,
      C
    ), D && ze(c, null, w, "created"), Q(E, c, c.scopeId, P, w), N) {
      for (const K in N)
        K !== "value" && !Jt(K) && o(
          E,
          K,
          null,
          N[K],
          T,
          c.children,
          w,
          v,
          Re
        );
      "value" in N && o(E, "value", null, N.value), (y = N.onVnodeBeforeMount) && Pe(y, w, c);
    }
    D && ze(c, null, w, "beforeMount");
    const J = yl(v, j);
    J && j.beforeEnter(E), n(E, f, m), ((y = N && N.onVnodeMounted) || J || D) && fe(() => {
      y && Pe(y, w, c), J && j.enter(E), D && ze(c, null, w, "mounted");
    }, v);
  }, Q = (c, f, m, w, v) => {
    if (m && k(c, m), w)
      for (let T = 0; T < w.length; T++)
        k(c, w[T]);
    if (v) {
      let T = v.subTree;
      if (f === T) {
        const P = v.vnode;
        Q(
          c,
          P,
          P.scopeId,
          P.slotScopeIds,
          v.parent
        );
      }
    }
  }, V = (c, f, m, w, v, T, P, C, E = 0) => {
    for (let y = E; y < c.length; y++) {
      const A = c[y] = C ? Be(c[y]) : Ne(c[y]);
      u(
        null,
        A,
        f,
        m,
        w,
        v,
        T,
        P,
        C
      );
    }
  }, B = (c, f, m, w, v, T, P) => {
    const C = f.el = c.el;
    let { patchFlag: E, dynamicChildren: y, dirs: A } = f;
    E |= c.patchFlag & 16;
    const N = c.props || z, M = f.props || z;
    let j;
    m && Qe(m, !1), (j = M.onVnodeBeforeUpdate) && Pe(j, m, f, c), A && ze(f, c, m, "beforeUpdate"), m && Qe(m, !0);
    const D = v && f.type !== "foreignObject";
    if (y ? $(
      c.dynamicChildren,
      y,
      C,
      m,
      w,
      D,
      T
    ) : P || q(
      c,
      f,
      C,
      null,
      m,
      w,
      D,
      T,
      !1
    ), E > 0) {
      if (E & 16)
        G(
          C,
          f,
          N,
          M,
          m,
          w,
          v
        );
      else if (E & 2 && N.class !== M.class && o(C, "class", null, M.class, v), E & 4 && o(C, "style", N.style, M.style, v), E & 8) {
        const J = f.dynamicProps;
        for (let K = 0; K < J.length; K++) {
          const ee = J[K], be = N[ee], it = M[ee];
          (it !== be || ee === "value") && o(
            C,
            ee,
            be,
            it,
            v,
            c.children,
            m,
            w,
            Re
          );
        }
      }
      E & 1 && c.children !== f.children && h(C, f.children);
    } else
      !P && y == null && G(
        C,
        f,
        N,
        M,
        m,
        w,
        v
      );
    ((j = M.onVnodeUpdated) || A) && fe(() => {
      j && Pe(j, m, f, c), A && ze(f, c, m, "updated");
    }, w);
  }, $ = (c, f, m, w, v, T, P) => {
    for (let C = 0; C < f.length; C++) {
      const E = c[C], y = f[C], A = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        E.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (E.type === ve || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !vt(E, y) || // - In the case of a component, it could contain anything.
        E.shapeFlag & 70) ? O(E.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          m
        )
      );
      u(
        E,
        y,
        A,
        null,
        w,
        v,
        T,
        P,
        !0
      );
    }
  }, G = (c, f, m, w, v, T, P) => {
    if (m !== w) {
      if (m !== z)
        for (const C in m)
          !Jt(C) && !(C in w) && o(
            c,
            C,
            m[C],
            null,
            P,
            f.children,
            v,
            T,
            Re
          );
      for (const C in w) {
        if (Jt(C))
          continue;
        const E = w[C], y = m[C];
        E !== y && C !== "value" && o(
          c,
          C,
          y,
          E,
          P,
          f.children,
          v,
          T,
          Re
        );
      }
      "value" in w && o(c, "value", m.value, w.value);
    }
  }, me = (c, f, m, w, v, T, P, C, E) => {
    const y = f.el = c ? c.el : l(""), A = f.anchor = c ? c.anchor : l("");
    let { patchFlag: N, dynamicChildren: M, slotScopeIds: j } = f;
    j && (C = C ? C.concat(j) : j), c == null ? (n(y, m, w), n(A, m, w), V(
      f.children,
      m,
      A,
      v,
      T,
      P,
      C,
      E
    )) : N > 0 && N & 64 && M && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    c.dynamicChildren ? ($(
      c.dynamicChildren,
      M,
      m,
      v,
      T,
      P,
      C
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (f.key != null || v && f === v.subTree) && po(
      c,
      f,
      !0
      /* shallow */
    )) : q(
      c,
      f,
      m,
      A,
      v,
      T,
      P,
      C,
      E
    );
  }, Ue = (c, f, m, w, v, T, P, C, E) => {
    f.slotScopeIds = C, c == null ? f.shapeFlag & 512 ? v.ctx.activate(
      f,
      m,
      w,
      P,
      E
    ) : ms(
      f,
      m,
      w,
      v,
      T,
      P,
      E
    ) : yn(c, f, E);
  }, ms = (c, f, m, w, v, T, P) => {
    const C = c.component = $l(
      c,
      w,
      v
    );
    if (no(c) && (C.ctx.renderer = nt), Ml(C), C.asyncDep) {
      if (v && v.registerDep(C, ce), !c.el) {
        const E = C.subTree = Ae(st);
        R(null, E, f, m);
      }
      return;
    }
    ce(
      C,
      c,
      f,
      m,
      v,
      T,
      P
    );
  }, yn = (c, f, m) => {
    const w = f.component = c.component;
    if (Fr(c, f, m))
      if (w.asyncDep && !w.asyncResolved) {
        Z(w, f, m);
        return;
      } else
        w.next = f, $r(w.update), w.update();
    else
      f.el = c.el, w.vnode = f;
  }, ce = (c, f, m, w, v, T, P) => {
    const C = () => {
      if (c.isMounted) {
        let { next: A, bu: N, u: M, parent: j, vnode: D } = c, J = A, K;
        Qe(c, !1), A ? (A.el = D.el, Z(c, A, P)) : A = D, N && ws(N), (K = A.props && A.props.onVnodeBeforeUpdate) && Pe(K, j, A, D), Qe(c, !0);
        const ee = ys(c), be = c.subTree;
        c.subTree = ee, u(
          be,
          ee,
          // parent may have changed if it's in a teleport
          O(be.el),
          // anchor may have changed if it's in a fragment
          Ft(be),
          c,
          v,
          T
        ), A.el = ee.el, J === null && Dr(c, ee.el), M && fe(M, v), (K = A.props && A.props.onVnodeUpdated) && fe(
          () => Pe(K, j, A, D),
          v
        );
      } else {
        let A;
        const { el: N, props: M } = f, { bm: j, m: D, parent: J } = c, K = zt(f);
        if (Qe(c, !1), j && ws(j), !K && (A = M && M.onVnodeBeforeMount) && Pe(A, J, f), Qe(c, !0), N && _s) {
          const ee = () => {
            c.subTree = ys(c), _s(
              N,
              c.subTree,
              c,
              v,
              null
            );
          };
          K ? f.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !c.isUnmounted && ee()
          ) : ee();
        } else {
          const ee = c.subTree = ys(c);
          u(
            null,
            ee,
            m,
            w,
            c,
            v,
            T
          ), f.el = ee.el;
        }
        if (D && fe(D, v), !K && (A = M && M.onVnodeMounted)) {
          const ee = f;
          fe(
            () => Pe(A, J, ee),
            v
          );
        }
        (f.shapeFlag & 256 || J && zt(J.vnode) && J.vnode.shapeFlag & 256) && c.a && fe(c.a, v), c.isMounted = !0, f = m = w = null;
      }
    }, E = c.effect = new nn(
      C,
      () => un(y),
      c.scope
      // track it in component's effect scope
    ), y = c.update = () => E.run();
    y.id = c.uid, Qe(c, !0), y();
  }, Z = (c, f, m) => {
    f.component = c;
    const w = c.vnode.props;
    c.vnode = f, c.next = null, ml(c, f.props, w, m), bl(c, f.children, m), _t(), Sn(c), bt();
  }, q = (c, f, m, w, v, T, P, C, E = !1) => {
    const y = c && c.children, A = c ? c.shapeFlag : 0, N = f.children, { patchFlag: M, shapeFlag: j } = f;
    if (M > 0) {
      if (M & 128) {
        jt(
          y,
          N,
          m,
          w,
          v,
          T,
          P,
          C,
          E
        );
        return;
      } else if (M & 256) {
        qe(
          y,
          N,
          m,
          w,
          v,
          T,
          P,
          C,
          E
        );
        return;
      }
    }
    j & 8 ? (A & 16 && Re(y, v, T), N !== y && h(m, N)) : A & 16 ? j & 16 ? jt(
      y,
      N,
      m,
      w,
      v,
      T,
      P,
      C,
      E
    ) : Re(y, v, T, !0) : (A & 8 && h(m, ""), j & 16 && V(
      N,
      m,
      w,
      v,
      T,
      P,
      C,
      E
    ));
  }, qe = (c, f, m, w, v, T, P, C, E) => {
    c = c || ct, f = f || ct;
    const y = c.length, A = f.length, N = Math.min(y, A);
    let M;
    for (M = 0; M < N; M++) {
      const j = f[M] = E ? Be(f[M]) : Ne(f[M]);
      u(
        c[M],
        j,
        m,
        null,
        v,
        T,
        P,
        C,
        E
      );
    }
    y > A ? Re(
      c,
      v,
      T,
      !0,
      !1,
      N
    ) : V(
      f,
      m,
      w,
      v,
      T,
      P,
      C,
      E,
      N
    );
  }, jt = (c, f, m, w, v, T, P, C, E) => {
    let y = 0;
    const A = f.length;
    let N = c.length - 1, M = A - 1;
    for (; y <= N && y <= M; ) {
      const j = c[y], D = f[y] = E ? Be(f[y]) : Ne(f[y]);
      if (vt(j, D))
        u(
          j,
          D,
          m,
          null,
          v,
          T,
          P,
          C,
          E
        );
      else
        break;
      y++;
    }
    for (; y <= N && y <= M; ) {
      const j = c[N], D = f[M] = E ? Be(f[M]) : Ne(f[M]);
      if (vt(j, D))
        u(
          j,
          D,
          m,
          null,
          v,
          T,
          P,
          C,
          E
        );
      else
        break;
      N--, M--;
    }
    if (y > N) {
      if (y <= M) {
        const j = M + 1, D = j < A ? f[j].el : w;
        for (; y <= M; )
          u(
            null,
            f[y] = E ? Be(f[y]) : Ne(f[y]),
            m,
            D,
            v,
            T,
            P,
            C,
            E
          ), y++;
      }
    } else if (y > M)
      for (; y <= N; )
        Oe(c[y], v, T, !0), y++;
    else {
      const j = y, D = y, J = /* @__PURE__ */ new Map();
      for (y = D; y <= M; y++) {
        const he = f[y] = E ? Be(f[y]) : Ne(f[y]);
        he.key != null && J.set(he.key, y);
      }
      let K, ee = 0;
      const be = M - D + 1;
      let it = !1, Tn = 0;
      const wt = new Array(be);
      for (y = 0; y < be; y++)
        wt[y] = 0;
      for (y = j; y <= N; y++) {
        const he = c[y];
        if (ee >= be) {
          Oe(he, v, T, !0);
          continue;
        }
        let ke;
        if (he.key != null)
          ke = J.get(he.key);
        else
          for (K = D; K <= M; K++)
            if (wt[K - D] === 0 && vt(he, f[K])) {
              ke = K;
              break;
            }
        ke === void 0 ? Oe(he, v, T, !0) : (wt[ke - D] = y + 1, ke >= Tn ? Tn = ke : it = !0, u(
          he,
          f[ke],
          m,
          null,
          v,
          T,
          P,
          C,
          E
        ), ee++);
      }
      const En = it ? xl(wt) : ct;
      for (K = En.length - 1, y = be - 1; y >= 0; y--) {
        const he = D + y, ke = f[he], On = he + 1 < A ? f[he + 1].el : w;
        wt[y] === 0 ? u(
          null,
          ke,
          m,
          On,
          v,
          T,
          P,
          C,
          E
        ) : it && (K < 0 || y !== En[K] ? Je(ke, m, On, 2) : K--);
      }
    }
  }, Je = (c, f, m, w, v = null) => {
    const { el: T, type: P, transition: C, children: E, shapeFlag: y } = c;
    if (y & 6) {
      Je(c.component.subTree, f, m, w);
      return;
    }
    if (y & 128) {
      c.suspense.move(f, m, w);
      return;
    }
    if (y & 64) {
      P.move(c, f, m, nt);
      return;
    }
    if (P === ve) {
      n(T, f, m);
      for (let N = 0; N < E.length; N++)
        Je(E[N], f, m, w);
      n(c.anchor, f, m);
      return;
    }
    if (P === Ot) {
      _(c, f, m);
      return;
    }
    if (w !== 2 && y & 1 && C)
      if (w === 0)
        C.beforeEnter(T), n(T, f, m), fe(() => C.enter(T), v);
      else {
        const { leave: N, delayLeave: M, afterLeave: j } = C, D = () => n(T, f, m), J = () => {
          N(T, () => {
            D(), j && j();
          });
        };
        M ? M(T, D, J) : J();
      }
    else
      n(T, f, m);
  }, Oe = (c, f, m, w = !1, v = !1) => {
    const {
      type: T,
      props: P,
      ref: C,
      children: E,
      dynamicChildren: y,
      shapeFlag: A,
      patchFlag: N,
      dirs: M
    } = c;
    if (C != null && Ks(C, null, m, c, !0), A & 256) {
      f.ctx.deactivate(c);
      return;
    }
    const j = A & 1 && M, D = !zt(c);
    let J;
    if (D && (J = P && P.onVnodeBeforeUnmount) && Pe(J, f, c), A & 6)
      Do(c.component, m, w);
    else {
      if (A & 128) {
        c.suspense.unmount(m, w);
        return;
      }
      j && ze(c, null, f, "beforeUnmount"), A & 64 ? c.type.remove(
        c,
        f,
        m,
        v,
        nt,
        w
      ) : y && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (T !== ve || N > 0 && N & 64) ? Re(
        y,
        f,
        m,
        !1,
        !0
      ) : (T === ve && N & 384 || !v && A & 16) && Re(E, f, m), w && xn(c);
    }
    (D && (J = P && P.onVnodeUnmounted) || j) && fe(() => {
      J && Pe(J, f, c), j && ze(c, null, f, "unmounted");
    }, m);
  }, xn = (c) => {
    const { type: f, el: m, anchor: w, transition: v } = c;
    if (f === ve) {
      Fo(m, w);
      return;
    }
    if (f === Ot) {
      b(c);
      return;
    }
    const T = () => {
      i(m), v && !v.persisted && v.afterLeave && v.afterLeave();
    };
    if (c.shapeFlag & 1 && v && !v.persisted) {
      const { leave: P, delayLeave: C } = v, E = () => P(m, T);
      C ? C(c.el, T, E) : E();
    } else
      T();
  }, Fo = (c, f) => {
    let m;
    for (; c !== f; )
      m = x(c), i(c), c = m;
    i(f);
  }, Do = (c, f, m) => {
    const { bum: w, scope: v, update: T, subTree: P, um: C } = c;
    w && ws(w), v.stop(), T && (T.active = !1, Oe(P, c, f, m)), C && fe(C, f), fe(() => {
      c.isUnmounted = !0;
    }, f), f && f.pendingBranch && !f.isUnmounted && c.asyncDep && !c.asyncResolved && c.suspenseId === f.pendingId && (f.deps--, f.deps === 0 && f.resolve());
  }, Re = (c, f, m, w = !1, v = !1, T = 0) => {
    for (let P = T; P < c.length; P++)
      Oe(c[P], f, m, w, v);
  }, Ft = (c) => c.shapeFlag & 6 ? Ft(c.component.subTree) : c.shapeFlag & 128 ? c.suspense.next() : x(c.anchor || c.el), Cn = (c, f, m) => {
    c == null ? f._vnode && Oe(f._vnode, null, null, !0) : u(f._vnode || null, c, f, null, null, null, m), Sn(), Xi(), f._vnode = c;
  }, nt = {
    p: u,
    um: Oe,
    m: Je,
    r: xn,
    mt: ms,
    mc: V,
    pc: q,
    pbc: $,
    n: Ft,
    o: e
  };
  let gs, _s;
  return t && ([gs, _s] = t(
    nt
  )), {
    render: Cn,
    hydrate: gs,
    createApp: hl(Cn, gs)
  };
}
function Qe({ effect: e, update: t }, s) {
  e.allowRecurse = t.allowRecurse = s;
}
function yl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function po(e, t, s = !1) {
  const n = e.children, i = t.children;
  if (L(n) && L(i))
    for (let o = 0; o < n.length; o++) {
      const r = n[o];
      let l = i[o];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = i[o] = Be(i[o]), l.el = r.el), s || po(r, l)), l.type === hs && (l.el = r.el);
    }
}
function xl(e) {
  const t = e.slice(), s = [0];
  let n, i, o, r, l;
  const a = e.length;
  for (n = 0; n < a; n++) {
    const p = e[n];
    if (p !== 0) {
      if (i = s[s.length - 1], e[i] < p) {
        t[n] = i, s.push(n);
        continue;
      }
      for (o = 0, r = s.length - 1; o < r; )
        l = o + r >> 1, e[s[l]] < p ? o = l + 1 : r = l;
      p < e[s[o]] && (o > 0 && (t[n] = s[o - 1]), s[o] = n);
    }
  }
  for (o = s.length, r = s[o - 1]; o-- > 0; )
    s[o] = r, r = t[r];
  return s;
}
const Cl = (e) => e.__isTeleport, ve = Symbol.for("v-fgt"), hs = Symbol.for("v-txt"), st = Symbol.for("v-cmt"), Ot = Symbol.for("v-stc"), kt = [];
let Ce = null;
function xe(e = !1) {
  kt.push(Ce = e ? null : []);
}
function Tl() {
  kt.pop(), Ce = kt[kt.length - 1] || null;
}
let At = 1;
function qn(e) {
  At += e;
}
function mo(e) {
  return e.dynamicChildren = At > 0 ? Ce || ct : null, Tl(), At > 0 && Ce && Ce.push(e), e;
}
function et(e, t, s, n, i, o) {
  return mo(
    Ie(
      e,
      t,
      s,
      n,
      i,
      o,
      !0
      /* isBlock */
    )
  );
}
function ts(e, t, s, n, i) {
  return mo(
    Ae(
      e,
      t,
      s,
      n,
      i,
      !0
      /* isBlock: prevent a block from tracking itself */
    )
  );
}
function El(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function vt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const ds = "__vInternal", go = ({ key: e }) => e ?? null, Yt = ({
  ref: e,
  ref_key: t,
  ref_for: s
}) => (typeof e == "number" && (e = "" + e), e != null ? te(e) || pe(e) || F(e) ? { i: de, r: e, k: t, f: !!s } : e : null);
function Ie(e, t = null, s = null, n = 0, i = null, o = e === ve ? 0 : 1, r = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && go(t),
    ref: t && Yt(t),
    scopeId: eo,
    slotScopeIds: null,
    children: s,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: n,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: de
  };
  return l ? (gn(a, s), o & 128 && e.normalize(a)) : s && (a.shapeFlag |= te(s) ? 8 : 16), At > 0 && // avoid a block node from tracking itself
  !r && // has current parent block
  Ce && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && Ce.push(a), a;
}
const Ae = Ol;
function Ol(e, t = null, s = null, n = 0, i = null, o = !1) {
  if ((!e || e === Ur) && (e = st), El(e)) {
    const l = dt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && gn(l, s), At > 0 && !o && Ce && (l.shapeFlag & 6 ? Ce[Ce.indexOf(e)] = l : Ce.push(l)), l.patchFlag |= -2, l;
  }
  if (Fl(e) && (e = e.__vccOpts), t) {
    t = kl(t);
    let { class: l, style: a } = t;
    l && !te(l) && (t.class = St(l)), Y(a) && (qi(a) && !L(a) && (a = le({}, a)), t.style = rs(a));
  }
  const r = te(e) ? 1 : Br(e) ? 128 : Cl(e) ? 64 : Y(e) ? 4 : F(e) ? 2 : 0;
  return Ie(
    e,
    t,
    s,
    n,
    i,
    r,
    o,
    !0
  );
}
function kl(e) {
  return e ? qi(e) || ds in e ? le({}, e) : e : null;
}
function dt(e, t, s = !1) {
  const { props: n, ref: i, patchFlag: o, children: r } = e, l = t ? Pl(n || {}, t) : n;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && go(l),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && i ? L(i) ? i.concat(Yt(t)) : [i, Yt(t)] : Yt(t)
    ) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: r,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== ve ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && dt(e.ssContent),
    ssFallback: e.ssFallback && dt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function _o(e = " ", t = 0) {
  return Ae(hs, null, e, t);
}
function bo(e, t) {
  const s = Ae(Ot, null, e);
  return s.staticCount = t, s;
}
function Jn(e = "", t = !1) {
  return t ? (xe(), ts(st, null, e)) : Ae(st, null, e);
}
function Ne(e) {
  return e == null || typeof e == "boolean" ? Ae(st) : L(e) ? Ae(
    ve,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? Be(e) : Ae(hs, null, String(e));
}
function Be(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : dt(e);
}
function gn(e, t) {
  let s = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (L(t))
    s = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), gn(e, i()), i._c && (i._d = !0));
      return;
    } else {
      s = 32;
      const i = t._;
      !i && !(ds in t) ? t._ctx = de : i === 3 && de && (de.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    F(t) ? (t = { default: t, _ctx: de }, s = 32) : (t = String(t), n & 64 ? (s = 16, t = [_o(t)]) : s = 8);
  e.children = t, e.shapeFlag |= s;
}
function Pl(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const i in n)
      if (i === "class")
        t.class !== n.class && (t.class = St([t.class, n.class]));
      else if (i === "style")
        t.style = rs([t.style, n.style]);
      else if (ss(i)) {
        const o = t[i], r = n[i];
        r && o !== r && !(L(o) && o.includes(r)) && (t[i] = o ? [].concat(o, r) : r);
      } else
        i !== "" && (t[i] = n[i]);
  }
  return t;
}
function Pe(e, t, s, n = null) {
  Ee(e, t, 7, [
    s,
    n
  ]);
}
const Il = lo();
let Nl = 0;
function $l(e, t, s) {
  const n = e.type, i = (t ? t.appContext : e.appContext) || Il, o = {
    uid: Nl++,
    vnode: e,
    type: n,
    parent: t,
    appContext: i,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new Zo(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(i.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: ao(n, i),
    emitsOptions: Gi(n, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: z,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: z,
    data: z,
    props: z,
    attrs: z,
    slots: z,
    refs: z,
    setupState: z,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense: s,
    suspenseId: s ? s.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = Rr.bind(null, o), e.ce && e.ce(o), o;
}
let ne = null;
const Al = () => ne || de;
let _n, ot, zn = "__VUE_INSTANCE_SETTERS__";
(ot = Ms()[zn]) || (ot = Ms()[zn] = []), ot.push((e) => ne = e), _n = (e) => {
  ot.length > 1 ? ot.forEach((t) => t(e)) : ot[0](e);
};
const pt = (e) => {
  _n(e), e.scope.on();
}, tt = () => {
  ne && ne.scope.off(), _n(null);
};
function wo(e) {
  return e.vnode.shapeFlag & 4;
}
let Mt = !1;
function Ml(e, t = !1) {
  Mt = t;
  const { props: s, children: n } = e.vnode, i = wo(e);
  pl(e, s, i, t), _l(e, n);
  const o = i ? Rl(e, t) : void 0;
  return Mt = !1, o;
}
function Rl(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = Ji(new Proxy(e.ctx, ol));
  const { setup: n } = s;
  if (n) {
    const i = e.setupContext = n.length > 1 ? Ll(e) : null;
    pt(e), _t();
    const o = We(
      n,
      e,
      0,
      [e.props, i]
    );
    if (bt(), tt(), Ni(o)) {
      if (o.then(tt, tt), t)
        return o.then((r) => {
          Qn(e, r, t);
        }).catch((r) => {
          as(r, e, 0);
        });
      e.asyncDep = o;
    } else
      Qn(e, o, t);
  } else
    vo(e, t);
}
function Qn(e, t, s) {
  F(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Y(t) && (e.setupState = zi(t)), vo(e, s);
}
let Yn;
function vo(e, t, s) {
  const n = e.type;
  if (!e.render) {
    if (!t && Yn && !n.render) {
      const i = n.template || pn(e).template;
      if (i) {
        const { isCustomElement: o, compilerOptions: r } = e.appContext.config, { delimiters: l, compilerOptions: a } = n, p = le(
          le(
            {
              isCustomElement: o,
              delimiters: l
            },
            r
          ),
          a
        );
        n.render = Yn(i, p);
      }
    }
    e.render = n.render || Te;
  }
  {
    pt(e), _t();
    try {
      rl(e);
    } finally {
      bt(), tt();
    }
  }
}
function Sl(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    {
      get(t, s) {
        return ue(e, "get", "$attrs"), t[s];
      }
    }
  ));
}
function Ll(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    get attrs() {
      return Sl(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function ps(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(zi(Ji(e.exposed)), {
      get(t, s) {
        if (s in t)
          return t[s];
        if (s in Et)
          return Et[s](e);
      },
      has(t, s) {
        return s in t || s in Et;
      }
    }));
}
function jl(e, t = !0) {
  return F(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Fl(e) {
  return F(e) && "__vccOpts" in e;
}
const Dl = (e, t) => kr(e, t, Mt), Ul = Symbol.for("v-scx"), Hl = () => Qt(Ul), Bl = "3.3.13", Vl = "http://www.w3.org/2000/svg", Xe = typeof document < "u" ? document : null, Xn = Xe && /* @__PURE__ */ Xe.createElement("template"), Wl = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, n) => {
    const i = t ? Xe.createElementNS(Vl, e) : Xe.createElement(e, s ? { is: s } : void 0);
    return e === "select" && n && n.multiple != null && i.setAttribute("multiple", n.multiple), i;
  },
  createText: (e) => Xe.createTextNode(e),
  createComment: (e) => Xe.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Xe.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, s, n, i, o) {
    const r = s ? s.previousSibling : t.lastChild;
    if (i && (i === o || i.nextSibling))
      for (; t.insertBefore(i.cloneNode(!0), s), !(i === o || !(i = i.nextSibling)); )
        ;
    else {
      Xn.innerHTML = n ? `<svg>${e}</svg>` : e;
      const l = Xn.content;
      if (n) {
        const a = l.firstChild;
        for (; a.firstChild; )
          l.appendChild(a.firstChild);
        l.removeChild(a);
      }
      t.insertBefore(l, s);
    }
    return [
      // first
      r ? r.nextSibling : t.firstChild,
      // last
      s ? s.previousSibling : t.lastChild
    ];
  }
}, Kl = Symbol("_vtc");
function ql(e, t, s) {
  const n = e[Kl];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
const bn = Symbol("_vod"), Jl = {
  beforeMount(e, { value: t }, { transition: s }) {
    e[bn] = e.style.display === "none" ? "" : e.style.display, s && t ? s.beforeEnter(e) : yt(e, t);
  },
  mounted(e, { value: t }, { transition: s }) {
    s && t && s.enter(e);
  },
  updated(e, { value: t, oldValue: s }, { transition: n }) {
    !t != !s && (n ? t ? (n.beforeEnter(e), yt(e, !0), n.enter(e)) : n.leave(e, () => {
      yt(e, !1);
    }) : yt(e, t));
  },
  beforeUnmount(e, { value: t }) {
    yt(e, t);
  }
};
function yt(e, t) {
  e.style.display = t ? e[bn] : "none";
}
const yo = Symbol("");
function zl(e) {
  const t = Al();
  if (!t)
    return;
  const s = t.ut = (i = e(t.proxy)) => {
    Array.from(
      document.querySelectorAll(`[data-v-owner="${t.uid}"]`)
    ).forEach((o) => Js(o, i));
  }, n = () => {
    const i = e(t.proxy);
    qs(t.subTree, i), s(i);
  };
  Wr(n), oo(() => {
    const i = new MutationObserver(n);
    i.observe(t.subTree.el.parentNode, { childList: !0 }), dn(() => i.disconnect());
  });
}
function qs(e, t) {
  if (e.shapeFlag & 128) {
    const s = e.suspense;
    e = s.activeBranch, s.pendingBranch && !s.isHydrating && s.effects.push(() => {
      qs(s.activeBranch, t);
    });
  }
  for (; e.component; )
    e = e.component.subTree;
  if (e.shapeFlag & 1 && e.el)
    Js(e.el, t);
  else if (e.type === ve)
    e.children.forEach((s) => qs(s, t));
  else if (e.type === Ot) {
    let { el: s, anchor: n } = e;
    for (; s && (Js(s, t), s !== n); )
      s = s.nextSibling;
  }
}
function Js(e, t) {
  if (e.nodeType === 1) {
    const s = e.style;
    let n = "";
    for (const i in t)
      s.setProperty(`--${i}`, t[i]), n += `--${i}: ${t[i]};`;
    s[yo] = n;
  }
}
function Ql(e, t, s) {
  const n = e.style, i = te(s);
  if (s && !i) {
    if (t && !te(t))
      for (const o in t)
        s[o] == null && zs(n, o, "");
    for (const o in s)
      zs(n, o, s[o]);
  } else {
    const o = n.display;
    if (i) {
      if (t !== s) {
        const r = n[yo];
        r && (s += ";" + r), n.cssText = s;
      }
    } else
      t && e.removeAttribute("style");
    bn in e && (n.display = o);
  }
}
const Zn = /\s*!important$/;
function zs(e, t, s) {
  if (L(s))
    s.forEach((n) => zs(e, t, n));
  else if (s == null && (s = ""), t.startsWith("--"))
    e.setProperty(t, s);
  else {
    const n = Yl(e, t);
    Zn.test(s) ? e.setProperty(
      gt(n),
      s.replace(Zn, ""),
      "important"
    ) : e[n] = s;
  }
}
const Gn = ["Webkit", "Moz", "ms"], Ts = {};
function Yl(e, t) {
  const s = Ts[t];
  if (s)
    return s;
  let n = Me(t);
  if (n !== "filter" && n in e)
    return Ts[t] = n;
  n = os(n);
  for (let i = 0; i < Gn.length; i++) {
    const o = Gn[i] + n;
    if (o in e)
      return Ts[t] = o;
  }
  return t;
}
const ei = "http://www.w3.org/1999/xlink";
function Xl(e, t, s, n, i) {
  if (n && t.startsWith("xlink:"))
    s == null ? e.removeAttributeNS(ei, t.slice(6, t.length)) : e.setAttributeNS(ei, t, s);
  else {
    const o = Xo(t);
    s == null || o && !Mi(s) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : s);
  }
}
function Zl(e, t, s, n, i, o, r) {
  if (t === "innerHTML" || t === "textContent") {
    n && r(n, i, o), e[t] = s ?? "";
    return;
  }
  const l = e.tagName;
  if (t === "value" && l !== "PROGRESS" && // custom elements may use _value internally
  !l.includes("-")) {
    e._value = s;
    const p = l === "OPTION" ? e.getAttribute("value") : e.value, h = s ?? "";
    p !== h && (e.value = h), s == null && e.removeAttribute(t);
    return;
  }
  let a = !1;
  if (s === "" || s == null) {
    const p = typeof e[t];
    p === "boolean" ? s = Mi(s) : s == null && p === "string" ? (s = "", a = !0) : p === "number" && (s = 0, a = !0);
  }
  try {
    e[t] = s;
  } catch {
  }
  a && e.removeAttribute(t);
}
function Gl(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function ec(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
const ti = Symbol("_vei");
function tc(e, t, s, n, i = null) {
  const o = e[ti] || (e[ti] = {}), r = o[t];
  if (n && r)
    r.value = n;
  else {
    const [l, a] = sc(t);
    if (n) {
      const p = o[t] = oc(n, i);
      Gl(e, l, p, a);
    } else
      r && (ec(e, l, r, a), o[t] = void 0);
  }
}
const si = /(?:Once|Passive|Capture)$/;
function sc(e) {
  let t;
  if (si.test(e)) {
    t = {};
    let n;
    for (; n = e.match(si); )
      e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : gt(e.slice(2)), t];
}
let Es = 0;
const nc = /* @__PURE__ */ Promise.resolve(), ic = () => Es || (nc.then(() => Es = 0), Es = Date.now());
function oc(e, t) {
  const s = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= s.attached)
      return;
    Ee(
      rc(n, s.value),
      t,
      5,
      [n]
    );
  };
  return s.value = e, s.attached = ic(), s;
}
function rc(e, t) {
  if (L(t)) {
    const s = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      s.call(e), e._stopped = !0;
    }, t.map((n) => (i) => !i._stopped && n && n(i));
  } else
    return t;
}
const ni = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, lc = (e, t, s, n, i = !1, o, r, l, a) => {
  t === "class" ? ql(e, n, i) : t === "style" ? Ql(e, s, n) : ss(t) ? Gs(t) || tc(e, t, s, n, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : cc(e, t, n, i)) ? Zl(
    e,
    t,
    n,
    o,
    r,
    l,
    a
  ) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), Xl(e, t, n, i));
};
function cc(e, t, s, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && ni(t) && F(s));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return ni(t) && te(s) ? !1 : t in e;
}
const ac = /* @__PURE__ */ le({ patchProp: lc }, Wl);
let ii;
function fc() {
  return ii || (ii = wl(ac));
}
const uc = (...e) => {
  const t = fc().createApp(...e), { mount: s } = t;
  return t.mount = (n) => {
    const i = hc(n);
    if (!i)
      return;
    const o = t._component;
    !F(o) && !o.render && !o.template && (o.template = i.innerHTML), i.innerHTML = "";
    const r = s(i, !1, i instanceof SVGElement);
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), r;
  }, t;
};
function hc(e) {
  return te(e) ? document.querySelector(e) : e;
}
function xo(e) {
  return Object.entries(e.userVotes).reduce((t, [s, n]) => (n !== "0" && (t[s] = n), t), {});
}
function wn(e) {
  if (e.active)
    return [];
  const t = Co(e);
  let s = [], n = 0;
  return Object.entries(t).forEach(([i, o]) => {
    o == n ? s.push(i) : o > n && (n = o, s = [i]);
  }), s;
}
function dc(e) {
  const t = wn(e);
  if (t.length === 1)
    return {
      [t[0]]: "win"
    };
  const s = {};
  for (const n of t)
    e.tiebreakWinner === n ? s[n] = "tiebreakwin" : s[n] = "tie";
  return s;
}
function Co(e) {
  let t = {};
  Object.keys(e.options).forEach((n) => {
    t[n] = 0;
  });
  const s = xo(e);
  return Object.values(s).forEach((n) => {
    t[n] += 1;
  }), t;
}
function pc(e) {
  const t = xo(e);
  return Object.keys(t).length;
}
var oi = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function mc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function gc(e) {
  if (e.__esModule)
    return e;
  var t = e.default;
  if (typeof t == "function") {
    var s = function n() {
      return this instanceof n ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    s.prototype = t.prototype;
  } else
    s = {};
  return Object.defineProperty(s, "__esModule", { value: !0 }), Object.keys(e).forEach(function(n) {
    var i = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(s, n, i.get ? i : {
      enumerable: !0,
      get: function() {
        return e[n];
      }
    });
  }), s;
}
var To = { exports: {} };
const _c = {}, bc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _c
}, Symbol.toStringTag, { value: "Module" })), Qs = /* @__PURE__ */ gc(bc);
var Eo = { exports: {} };
const wc = /^\u0001ACTION ([^\u0001]+)\u0001$/, vc = /^(justinfan)(\d+$)/, yc = /\\([sn:r\\])/g, xc = /([ \n;\r\\])/g, ri = { s: " ", n: "", ":": ";", r: "" }, li = { " ": "s", "\n": "n", ";": ":", "\r": "r" }, Cc = new RegExp("^(?:(?:https?|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))\\.?)(?::\\d{2,5})?(?:[/?#]\\S*)?$", "i"), Tc = /[|\\^$*+?:#]/, Kt = Eo.exports = {
  // Return the second value if the first value is undefined..
  get: (e, t) => typeof e > "u" ? t : e,
  // Indirectly use hasOwnProperty
  hasOwn: (e, t) => ({}).hasOwnProperty.call(e, t),
  // Race a promise against a delay..
  promiseDelay: (e) => new Promise((t) => setTimeout(t, e)),
  // Value is a finite number..
  isFinite: (e) => isFinite(e) && !isNaN(parseFloat(e)),
  // Parse string to number. Returns NaN if string can't be parsed to number..
  toNumber(e, t) {
    if (e === null)
      return 0;
    const s = Math.pow(10, Kt.isFinite(t) ? t : 0);
    return Math.round(e * s) / s;
  },
  // Value is an integer..
  isInteger: (e) => !isNaN(Kt.toNumber(e, 0)),
  // Value is a regex..
  isRegex: (e) => Tc.test(e),
  // Value is a valid url..
  isURL: (e) => Cc.test(e),
  // Return a random justinfan username..
  justinfan: () => `justinfan${Math.floor(Math.random() * 8e4 + 1e3)}`,
  // Username is a justinfan username..
  isJustinfan: (e) => vc.test(e),
  // Return a valid channel name..
  channel(e) {
    const t = (e || "").toLowerCase();
    return t[0] === "#" ? t : "#" + t;
  },
  // Return a valid username..
  username(e) {
    const t = (e || "").toLowerCase();
    return t[0] === "#" ? t.slice(1) : t;
  },
  // Return a valid token..
  token: (e) => e ? e.toLowerCase().replace("oauth:", "") : "",
  // Return a valid password..
  password(e) {
    const t = Kt.token(e);
    return t ? `oauth:${t}` : "";
  },
  actionMessage: (e) => e.match(wc),
  // Replace all occurences of a string using an object..
  replaceAll(e, t) {
    if (e === null || typeof e > "u")
      return null;
    for (const s in t)
      e = e.replace(new RegExp(s, "g"), t[s]);
    return e;
  },
  unescapeHtml: (e) => e.replace(/\\&amp\\;/g, "&").replace(/\\&lt\\;/g, "<").replace(/\\&gt\\;/g, ">").replace(/\\&quot\\;/g, '"').replace(/\\&#039\\;/g, "'"),
  // Escaping values:
  // http://ircv3.net/specs/core/message-tags-3.2.html#escaping-values
  unescapeIRC(e) {
    return !e || typeof e != "string" || !e.includes("\\") ? e : e.replace(
      yc,
      (t, s) => s in ri ? ri[s] : s
    );
  },
  escapeIRC(e) {
    return !e || typeof e != "string" ? e : e.replace(
      xc,
      (t, s) => s in li ? `\\${li[s]}` : s
    );
  },
  // Add word to a string..
  addWord: (e, t) => e.length ? e + " " + t : e + t,
  // Split a line but try not to cut a word in half..
  splitLine(e, t) {
    let s = e.substring(0, t).lastIndexOf(" ");
    return s === -1 && (s = t - 1), [e.substring(0, s), e.substring(s + 1)];
  },
  // Extract a number from a string..
  extractNumber(e) {
    const t = e.split(" ");
    for (let s = 0; s < t.length; s++)
      if (Kt.isInteger(t[s]))
        return ~~t[s];
    return 0;
  },
  // Format the date..
  formatDate(e) {
    let t = e.getHours(), s = e.getMinutes();
    return t = (t < 10 ? "0" : "") + t, s = (s < 10 ? "0" : "") + s, `${t}:${s}`;
  },
  // Inherit the prototype methods from one constructor into another..
  inherits(e, t) {
    e.super_ = t;
    const s = function() {
    };
    s.prototype = t.prototype, e.prototype = new s(), e.prototype.constructor = e;
  },
  // Return whether inside a Node application or not..
  isNode() {
    try {
      return typeof process == "object" && Object.prototype.toString.call(process) === "[object process]";
    } catch {
    }
    return !1;
  }
};
var Lt = Eo.exports;
const Ec = Qs, ci = Lt;
var Oc = function(t, s) {
  let n = t.url !== void 0 ? t.url : t.uri;
  if (ci.isURL(n) || (n = `https://api.twitch.tv/kraken${n[0] === "/" ? n : `/${n}`}`), ci.isNode()) {
    const i = Object.assign({ method: "GET", json: !0 }, t);
    if (i.qs) {
      const a = new URLSearchParams(i.qs);
      n += `?${a}`;
    }
    const o = {};
    "fetchAgent" in this.opts.connection && (o.agent = this.opts.connection.fetchAgent);
    const r = Ec(n, {
      ...o,
      method: i.method,
      headers: i.headers,
      body: i.body
    });
    let l = {};
    r.then((a) => (l = { statusCode: a.status, headers: a.headers }, i.json ? a.json() : a.text())).then(
      (a) => s(null, l, a),
      (a) => s(a, l, null)
    );
  } else {
    const i = Object.assign({ method: "GET", headers: {} }, t, { url: n }), o = new XMLHttpRequest();
    o.open(i.method, i.url, !0);
    for (const r in i.headers)
      o.setRequestHeader(r, i.headers[r]);
    o.responseType = "json", o.addEventListener("load", (r) => {
      o.readyState === 4 && (o.status !== 200 ? s(o.status, null, null) : s(null, null, o.response));
    }), o.send();
  }
};
const S = Lt;
function ai(e, t) {
  return e = S.channel(e), t = S.get(t, 30), this._sendCommand(null, e, `/followers ${t}`, (s, n) => {
    this.once("_promiseFollowers", (i) => {
      i ? n(i) : s([e, ~~t]);
    });
  });
}
function fi(e) {
  return e = S.channel(e), this._sendCommand(null, e, "/followersoff", (t, s) => {
    this.once("_promiseFollowersoff", (n) => {
      n ? s(n) : t([e]);
    });
  });
}
function ui(e) {
  return e = S.channel(e), this._sendCommand(null, null, `PART ${e}`, (t, s) => {
    this.once("_promisePart", (n) => {
      n ? s(n) : t([e]);
    });
  });
}
function hi(e) {
  return e = S.channel(e), this._sendCommand(null, e, "/r9kbeta", (t, s) => {
    this.once("_promiseR9kbeta", (n) => {
      n ? s(n) : t([e]);
    });
  });
}
function di(e) {
  return e = S.channel(e), this._sendCommand(null, e, "/r9kbetaoff", (t, s) => {
    this.once("_promiseR9kbetaoff", (n) => {
      n ? s(n) : t([e]);
    });
  });
}
function pi(e, t) {
  return e = S.channel(e), t = S.get(t, 300), this._sendCommand(null, e, `/slow ${t}`, (s, n) => {
    this.once("_promiseSlow", (i) => {
      i ? n(i) : s([e, ~~t]);
    });
  });
}
function mi(e) {
  return e = S.channel(e), this._sendCommand(null, e, "/slowoff", (t, s) => {
    this.once("_promiseSlowoff", (n) => {
      n ? s(n) : t([e]);
    });
  });
}
var kc = {
  // Send action message (/me <message>) on a channel..
  action(e, t) {
    return e = S.channel(e), t = `ACTION ${t}`, this._sendMessage(this._getPromiseDelay(), e, t, (s, n) => {
      s([e, t]);
    });
  },
  // Ban username on channel..
  ban(e, t, s) {
    return e = S.channel(e), t = S.username(t), s = S.get(s, ""), this._sendCommand(null, e, `/ban ${t} ${s}`, (n, i) => {
      this.once("_promiseBan", (o) => {
        o ? i(o) : n([e, t, s]);
      });
    });
  },
  // Clear all messages on a channel..
  clear(e) {
    return e = S.channel(e), this._sendCommand(null, e, "/clear", (t, s) => {
      this.once("_promiseClear", (n) => {
        n ? s(n) : t([e]);
      });
    });
  },
  // Change the color of your username..
  color(e, t) {
    return t = S.get(t, e), this._sendCommand(null, "#tmijs", `/color ${t}`, (s, n) => {
      this.once("_promiseColor", (i) => {
        i ? n(i) : s([t]);
      });
    });
  },
  // Run commercial on a channel for X seconds..
  commercial(e, t) {
    return e = S.channel(e), t = S.get(t, 30), this._sendCommand(null, e, `/commercial ${t}`, (s, n) => {
      this.once("_promiseCommercial", (i) => {
        i ? n(i) : s([e, ~~t]);
      });
    });
  },
  // Delete a specific message on a channel
  deletemessage(e, t) {
    return e = S.channel(e), this._sendCommand(null, e, `/delete ${t}`, (s, n) => {
      this.once("_promiseDeletemessage", (i) => {
        i ? n(i) : s([e]);
      });
    });
  },
  // Enable emote-only mode on a channel..
  emoteonly(e) {
    return e = S.channel(e), this._sendCommand(null, e, "/emoteonly", (t, s) => {
      this.once("_promiseEmoteonly", (n) => {
        n ? s(n) : t([e]);
      });
    });
  },
  // Disable emote-only mode on a channel..
  emoteonlyoff(e) {
    return e = S.channel(e), this._sendCommand(null, e, "/emoteonlyoff", (t, s) => {
      this.once("_promiseEmoteonlyoff", (n) => {
        n ? s(n) : t([e]);
      });
    });
  },
  // Enable followers-only mode on a channel..
  followersonly: ai,
  // Alias for followersonly()..
  followersmode: ai,
  // Disable followers-only mode on a channel..
  followersonlyoff: fi,
  // Alias for followersonlyoff()..
  followersmodeoff: fi,
  // Host a channel..
  host(e, t) {
    return e = S.channel(e), t = S.username(t), this._sendCommand(2e3, e, `/host ${t}`, (s, n) => {
      this.once("_promiseHost", (i, o) => {
        i ? n(i) : s([e, t, ~~o]);
      });
    });
  },
  // Join a channel..
  join(e) {
    return e = S.channel(e), this._sendCommand(void 0, null, `JOIN ${e}`, (t, s) => {
      const n = "_promiseJoin";
      let i = !1;
      const o = (l, a) => {
        e === S.channel(a) && (this.removeListener(n, o), i = !0, l ? s(l) : t([e]));
      };
      this.on(n, o);
      const r = this._getPromiseDelay();
      S.promiseDelay(r).then(() => {
        i || this.emit(n, "No response from Twitch.", e);
      });
    });
  },
  // Mod username on channel..
  mod(e, t) {
    return e = S.channel(e), t = S.username(t), this._sendCommand(null, e, `/mod ${t}`, (s, n) => {
      this.once("_promiseMod", (i) => {
        i ? n(i) : s([e, t]);
      });
    });
  },
  // Get list of mods on a channel..
  mods(e) {
    return e = S.channel(e), this._sendCommand(null, e, "/mods", (t, s) => {
      this.once("_promiseMods", (n, i) => {
        n ? s(n) : (i.forEach((o) => {
          this.moderators[e] || (this.moderators[e] = []), this.moderators[e].includes(o) || this.moderators[e].push(o);
        }), t(i));
      });
    });
  },
  // Leave a channel..
  part: ui,
  // Alias for part()..
  leave: ui,
  // Send a ping to the server..
  ping() {
    return this._sendCommand(null, null, "PING", (e, t) => {
      this.latency = /* @__PURE__ */ new Date(), this.pingTimeout = setTimeout(() => {
        this.ws !== null && (this.wasCloseCalled = !1, this.log.error("Ping timeout."), this.ws.close(), clearInterval(this.pingLoop), clearTimeout(this.pingTimeout));
      }, S.get(this.opts.connection.timeout, 9999)), this.once("_promisePing", (s) => e([parseFloat(s)]));
    });
  },
  // Enable R9KBeta mode on a channel..
  r9kbeta: hi,
  // Alias for r9kbeta()..
  r9kmode: hi,
  // Disable R9KBeta mode on a channel..
  r9kbetaoff: di,
  // Alias for r9kbetaoff()..
  r9kmodeoff: di,
  // Send a raw message to the server..
  raw(e) {
    return this._sendCommand(null, null, e, (t, s) => {
      t([e]);
    });
  },
  // Send a message on a channel..
  say(e, t) {
    return e = S.channel(e), t.startsWith(".") && !t.startsWith("..") || t.startsWith("/") || t.startsWith("\\") ? t.substr(1, 3) === "me " ? this.action(e, t.substr(4)) : this._sendCommand(null, e, t, (s, n) => {
      s([e, t]);
    }) : this._sendMessage(this._getPromiseDelay(), e, t, (s, n) => {
      s([e, t]);
    });
  },
  // Enable slow mode on a channel..
  slow: pi,
  // Alias for slow()..
  slowmode: pi,
  // Disable slow mode on a channel..
  slowoff: mi,
  // Alias for slowoff()..
  slowmodeoff: mi,
  // Enable subscribers mode on a channel..
  subscribers(e) {
    return e = S.channel(e), this._sendCommand(null, e, "/subscribers", (t, s) => {
      this.once("_promiseSubscribers", (n) => {
        n ? s(n) : t([e]);
      });
    });
  },
  // Disable subscribers mode on a channel..
  subscribersoff(e) {
    return e = S.channel(e), this._sendCommand(null, e, "/subscribersoff", (t, s) => {
      this.once("_promiseSubscribersoff", (n) => {
        n ? s(n) : t([e]);
      });
    });
  },
  // Timeout username on channel for X seconds..
  timeout(e, t, s, n) {
    return e = S.channel(e), t = S.username(t), s !== null && !S.isInteger(s) && (n = s, s = 300), s = S.get(s, 300), n = S.get(n, ""), this._sendCommand(null, e, `/timeout ${t} ${s} ${n}`, (i, o) => {
      this.once("_promiseTimeout", (r) => {
        r ? o(r) : i([e, t, ~~s, n]);
      });
    });
  },
  // Unban username on channel..
  unban(e, t) {
    return e = S.channel(e), t = S.username(t), this._sendCommand(null, e, `/unban ${t}`, (s, n) => {
      this.once("_promiseUnban", (i) => {
        i ? n(i) : s([e, t]);
      });
    });
  },
  // End the current hosting..
  unhost(e) {
    return e = S.channel(e), this._sendCommand(2e3, e, "/unhost", (t, s) => {
      this.once("_promiseUnhost", (n) => {
        n ? s(n) : t([e]);
      });
    });
  },
  // Unmod username on channel..
  unmod(e, t) {
    return e = S.channel(e), t = S.username(t), this._sendCommand(null, e, `/unmod ${t}`, (s, n) => {
      this.once("_promiseUnmod", (i) => {
        i ? n(i) : s([e, t]);
      });
    });
  },
  // Unvip username on channel..
  unvip(e, t) {
    return e = S.channel(e), t = S.username(t), this._sendCommand(null, e, `/unvip ${t}`, (s, n) => {
      this.once("_promiseUnvip", (i) => {
        i ? n(i) : s([e, t]);
      });
    });
  },
  // Add username to VIP list on channel..
  vip(e, t) {
    return e = S.channel(e), t = S.username(t), this._sendCommand(null, e, `/vip ${t}`, (s, n) => {
      this.once("_promiseVip", (i) => {
        i ? n(i) : s([e, t]);
      });
    });
  },
  // Get list of VIPs on a channel..
  vips(e) {
    return e = S.channel(e), this._sendCommand(null, e, "/vips", (t, s) => {
      this.once("_promiseVips", (n, i) => {
        n ? s(n) : t(i);
      });
    });
  },
  // Send an whisper message to a user..
  whisper(e, t) {
    return e = S.username(e), e === this.getUsername() ? Promise.reject("Cannot send a whisper to the same account.") : this._sendCommand(null, "#tmijs", `/w ${e} ${t}`, (s, n) => {
      this.once("_promiseWhisper", (i) => {
        i && n(i);
      });
    }).catch((s) => {
      if (s && typeof s == "string" && s.indexOf("No response from Twitch.") !== 0)
        throw s;
      const n = S.channel(e), i = Object.assign({
        "message-type": "whisper",
        "message-id": null,
        "thread-id": null,
        username: this.getUsername()
      }, this.globaluserstate);
      return this.emits(["whisper", "message"], [
        [n, i, t, !0],
        [n, i, t, !0]
      ]), [e, t];
    });
  }
};
function ie() {
  this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0;
}
var Pc = ie;
ie.EventEmitter = ie;
ie.prototype._events = void 0;
ie.prototype._maxListeners = void 0;
ie.defaultMaxListeners = 10;
ie.prototype.setMaxListeners = function(e) {
  if (!Ic(e) || e < 0 || isNaN(e))
    throw TypeError("n must be a positive number");
  return this._maxListeners = e, this;
};
ie.prototype.emit = function(e) {
  var t, s, n, i, o, r;
  if (this._events || (this._events = {}), e === "error" && (!this._events.error || Rt(this._events.error) && !this._events.error.length))
    throw t = arguments[1], t instanceof Error ? t : TypeError('Uncaught, unspecified "error" event.');
  if (s = this._events[e], Oo(s))
    return !1;
  if (Fe(s))
    switch (arguments.length) {
      case 1:
        s.call(this);
        break;
      case 2:
        s.call(this, arguments[1]);
        break;
      case 3:
        s.call(this, arguments[1], arguments[2]);
        break;
      default:
        i = Array.prototype.slice.call(arguments, 1), s.apply(this, i);
    }
  else if (Rt(s))
    for (i = Array.prototype.slice.call(arguments, 1), r = s.slice(), n = r.length, o = 0; o < n; o++)
      r[o].apply(this, i);
  return !0;
};
ie.prototype.addListener = function(e, t) {
  var s;
  if (!Fe(t))
    throw TypeError("listener must be a function");
  return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, Fe(t.listener) ? t.listener : t), this._events[e] ? Rt(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, Rt(this._events[e]) && !this._events[e].warned && (Oo(this._maxListeners) ? s = ie.defaultMaxListeners : s = this._maxListeners, s && s > 0 && this._events[e].length > s && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), typeof console.trace == "function" && console.trace())), this;
};
ie.prototype.on = ie.prototype.addListener;
ie.prototype.once = function(e, t) {
  if (!Fe(t))
    throw TypeError("listener must be a function");
  var s = !1;
  if (this._events.hasOwnProperty(e) && e.charAt(0) === "_") {
    var n = 1, i = e;
    for (var o in this._events)
      this._events.hasOwnProperty(o) && o.startsWith(i) && n++;
    e = e + n;
  }
  function r() {
    e.charAt(0) === "_" && !isNaN(e.substr(e.length - 1)) && (e = e.substring(0, e.length - 1)), this.removeListener(e, r), s || (s = !0, t.apply(this, arguments));
  }
  return r.listener = t, this.on(e, r), this;
};
ie.prototype.removeListener = function(e, t) {
  var s, n, i, o;
  if (!Fe(t))
    throw TypeError("listener must be a function");
  if (!this._events || !this._events[e])
    return this;
  if (s = this._events[e], i = s.length, n = -1, s === t || Fe(s.listener) && s.listener === t) {
    if (delete this._events[e], this._events.hasOwnProperty(e + "2") && e.charAt(0) === "_") {
      var r = e;
      for (var l in this._events)
        this._events.hasOwnProperty(l) && l.startsWith(r) && (isNaN(parseInt(l.substr(l.length - 1))) || (this._events[e + parseInt(l.substr(l.length - 1) - 1)] = this._events[l], delete this._events[l]));
      this._events[e] = this._events[e + "1"], delete this._events[e + "1"];
    }
    this._events.removeListener && this.emit("removeListener", e, t);
  } else if (Rt(s)) {
    for (o = i; o-- > 0; )
      if (s[o] === t || s[o].listener && s[o].listener === t) {
        n = o;
        break;
      }
    if (n < 0)
      return this;
    s.length === 1 ? (s.length = 0, delete this._events[e]) : s.splice(n, 1), this._events.removeListener && this.emit("removeListener", e, t);
  }
  return this;
};
ie.prototype.removeAllListeners = function(e) {
  var t, s;
  if (!this._events)
    return this;
  if (!this._events.removeListener)
    return arguments.length === 0 ? this._events = {} : this._events[e] && delete this._events[e], this;
  if (arguments.length === 0) {
    for (t in this._events)
      t !== "removeListener" && this.removeAllListeners(t);
    return this.removeAllListeners("removeListener"), this._events = {}, this;
  }
  if (s = this._events[e], Fe(s))
    this.removeListener(e, s);
  else if (s)
    for (; s.length; )
      this.removeListener(e, s[s.length - 1]);
  return delete this._events[e], this;
};
ie.prototype.listeners = function(e) {
  var t;
  return !this._events || !this._events[e] ? t = [] : Fe(this._events[e]) ? t = [this._events[e]] : t = this._events[e].slice(), t;
};
ie.prototype.listenerCount = function(e) {
  if (this._events) {
    var t = this._events[e];
    if (Fe(t))
      return 1;
    if (t)
      return t.length;
  }
  return 0;
};
ie.listenerCount = function(e, t) {
  return e.listenerCount(t);
};
function Fe(e) {
  return typeof e == "function";
}
function Ic(e) {
  return typeof e == "number";
}
function Rt(e) {
  return typeof e == "object" && e !== null;
}
function Oo(e) {
  return e === void 0;
}
const Nc = Lt;
let ko = "info";
const gi = { trace: 0, debug: 1, info: 2, warn: 3, error: 4, fatal: 5 };
function rt(e) {
  return function(t) {
    gi[e] >= gi[ko] && console.log(`[${Nc.formatDate(/* @__PURE__ */ new Date())}] ${e}: ${t}`);
  };
}
var $c = {
  // Change the current logging level..
  setLevel(e) {
    ko = e;
  },
  trace: rt("trace"),
  debug: rt("debug"),
  info: rt("info"),
  warn: rt("warn"),
  error: rt("error"),
  fatal: rt("fatal")
};
const Os = Lt, lt = /\S+/g;
function ks(e, t, s = ",", n = "/", i) {
  const o = e[t];
  if (o === void 0)
    return e;
  const r = typeof o == "string";
  if (e[t + "-raw"] = r ? o : null, o === !0)
    return e[t] = null, e;
  if (e[t] = {}, r) {
    const l = o.split(s);
    for (let a = 0; a < l.length; a++) {
      const p = l[a].split(n);
      let h = p[1];
      i !== void 0 && h && (h = h.split(i)), e[t][p[0]] = h || null;
    }
  }
  return e;
}
var Ac = {
  // Parse Twitch badges..
  badges: (e) => ks(e, "badges"),
  // Parse Twitch badge-info..
  badgeInfo: (e) => ks(e, "badge-info"),
  // Parse Twitch emotes..
  emotes: (e) => ks(e, "emotes", "/", ":", ","),
  // Parse regex emotes..
  emoteRegex(e, t, s, n) {
    lt.lastIndex = 0;
    const i = new RegExp("(\\b|^|\\s)" + Os.unescapeHtml(t) + "(\\b|$|\\s)");
    let o;
    for (; (o = lt.exec(e)) !== null; )
      i.test(o[0]) && (n[s] = n[s] || [], n[s].push([o.index, lt.lastIndex - 1]));
  },
  // Parse string emotes..
  emoteString(e, t, s, n) {
    lt.lastIndex = 0;
    let i;
    for (; (i = lt.exec(e)) !== null; )
      i[0] === Os.unescapeHtml(t) && (n[s] = n[s] || [], n[s].push([i.index, lt.lastIndex - 1]));
  },
  // Transform the emotes object to a string with the following format..
  // emote_id:first_index-last_index,another_first-another_last/another_emote_id:first_index-last_index
  transformEmotes(e) {
    let t = "";
    return Object.keys(e).forEach((s) => {
      t = `${t + s}:`, e[s].forEach(
        (n) => t = `${t + n.join("-")},`
      ), t = `${t.slice(0, -1)}/`;
    }), t.slice(0, -1);
  },
  formTags(e) {
    const t = [];
    for (const s in e) {
      const n = Os.escapeIRC(e[s]);
      t.push(`${s}=${n}`);
    }
    return `@${t.join(";")}`;
  },
  // Parse Twitch messages..
  msg(e) {
    const t = {
      raw: e,
      tags: {},
      prefix: null,
      command: null,
      params: []
    };
    let s = 0, n = 0;
    if (e.charCodeAt(0) === 64) {
      if (n = e.indexOf(" "), n === -1)
        return null;
      const i = e.slice(1, n).split(";");
      for (let o = 0; o < i.length; o++) {
        const r = i[o], l = r.split("=");
        t.tags[l[0]] = r.substring(r.indexOf("=") + 1) || !0;
      }
      s = n + 1;
    }
    for (; e.charCodeAt(s) === 32; )
      s++;
    if (e.charCodeAt(s) === 58) {
      if (n = e.indexOf(" ", s), n === -1)
        return null;
      for (t.prefix = e.slice(s + 1, n), s = n + 1; e.charCodeAt(s) === 32; )
        s++;
    }
    if (n = e.indexOf(" ", s), n === -1)
      return e.length > s ? (t.command = e.slice(s), t) : null;
    for (t.command = e.slice(s, n), s = n + 1; e.charCodeAt(s) === 32; )
      s++;
    for (; s < e.length; ) {
      if (n = e.indexOf(" ", s), e.charCodeAt(s) === 58) {
        t.params.push(e.slice(s + 1));
        break;
      }
      if (n !== -1) {
        for (t.params.push(e.slice(s, n)), s = n + 1; e.charCodeAt(s) === 32; )
          s++;
        continue;
      }
      if (n === -1) {
        t.params.push(e.slice(s));
        break;
      }
    }
    return t;
  }
};
class Mc {
  constructor(t) {
    this.queue = [], this.index = 0, this.defaultDelay = t === void 0 ? 3e3 : t;
  }
  // Add a new function to the queue..
  add(t, s) {
    this.queue.push({ fn: t, delay: s });
  }
  // Go to the next in queue..
  next() {
    const t = this.index++, s = this.queue[t];
    if (!s)
      return;
    const n = this.queue[this.index];
    if (s.fn(), n) {
      const i = n.delay === void 0 ? this.defaultDelay : n.delay;
      setTimeout(() => this.next(), i);
    }
  }
}
var Rc = Mc;
(function(e) {
  const t = typeof oi < "u" ? oi : typeof window < "u" ? window : {}, s = t.WebSocket || Qs, n = t.fetch || Qs, i = Oc, o = kc, r = Pc.EventEmitter, l = $c, a = Ac, p = Rc, h = Lt;
  let O = !1;
  const x = function k(d) {
    if (!(this instanceof k))
      return new k(d);
    this.opts = h.get(d, {}), this.opts.channels = this.opts.channels || [], this.opts.connection = this.opts.connection || {}, this.opts.identity = this.opts.identity || {}, this.opts.options = this.opts.options || {}, this.clientId = h.get(this.opts.options.clientId, null), this._globalDefaultChannel = h.channel(h.get(this.opts.options.globalDefaultChannel, "#tmijs")), this._skipMembership = h.get(this.opts.options.skipMembership, !1), this._skipUpdatingEmotesets = h.get(this.opts.options.skipUpdatingEmotesets, !1), this._updateEmotesetsTimer = null, this._updateEmotesetsTimerDelay = h.get(this.opts.options.updateEmotesetsTimer, 6e4), this.maxReconnectAttempts = h.get(this.opts.connection.maxReconnectAttempts, 1 / 0), this.maxReconnectInterval = h.get(this.opts.connection.maxReconnectInterval, 3e4), this.reconnect = h.get(this.opts.connection.reconnect, !0), this.reconnectDecay = h.get(this.opts.connection.reconnectDecay, 1.5), this.reconnectInterval = h.get(this.opts.connection.reconnectInterval, 1e3), this.reconnecting = !1, this.reconnections = 0, this.reconnectTimer = this.reconnectInterval, this.secure = h.get(
      this.opts.connection.secure,
      !this.opts.connection.server && !this.opts.connection.port
    ), this.emotes = "", this.emotesets = {}, this.channels = [], this.currentLatency = 0, this.globaluserstate = {}, this.lastJoined = "", this.latency = /* @__PURE__ */ new Date(), this.moderators = {}, this.pingLoop = null, this.pingTimeout = null, this.reason = "", this.username = "", this.userstate = {}, this.wasCloseCalled = !1, this.ws = null;
    let u = "error";
    this.opts.options.debug && (u = "info"), this.log = this.opts.logger || l;
    try {
      l.setLevel(u);
    } catch {
    }
    this.opts.channels.forEach(
      (g, R, I) => I[R] = h.channel(g)
    ), r.call(this), this.setMaxListeners(0);
  };
  h.inherits(x, r);
  for (const k in o)
    x.prototype[k] = o[k];
  x.prototype.emits = function(d, u) {
    for (let g = 0; g < d.length; g++) {
      const R = g < u.length ? u[g] : u[u.length - 1];
      this.emit.apply(this, [d[g]].concat(R));
    }
  }, x.prototype.api = function(...k) {
    O || (this.log.warn("Client.prototype.api is deprecated and will be removed for version 2.0.0"), O = !0), i(...k);
  }, x.prototype.handleMessage = function(d) {
    if (!d)
      return;
    this.listenerCount("raw_message") && this.emit("raw_message", JSON.parse(JSON.stringify(d)), d);
    const u = h.channel(h.get(d.params[0], null));
    let g = h.get(d.params[1], null);
    const R = h.get(d.tags["msg-id"], null), I = d.tags = a.badges(a.badgeInfo(a.emotes(d.tags)));
    for (const _ in I) {
      if (_ === "emote-sets" || _ === "ban-duration" || _ === "bits")
        continue;
      let b = I[_];
      typeof b == "boolean" ? b = null : b === "1" ? b = !0 : b === "0" ? b = !1 : typeof b == "string" && (b = h.unescapeIRC(b)), I[_] = b;
    }
    if (d.prefix === null)
      switch (d.command) {
        case "PING":
          this.emit("ping"), this._isConnected() && this.ws.send("PONG");
          break;
        case "PONG": {
          const _ = /* @__PURE__ */ new Date();
          this.currentLatency = (_.getTime() - this.latency.getTime()) / 1e3, this.emits(["pong", "_promisePing"], [[this.currentLatency]]), clearTimeout(this.pingTimeout);
          break;
        }
        default:
          this.log.warn(`Could not parse message with no prefix:
${JSON.stringify(d, null, 4)}`);
          break;
      }
    else if (d.prefix === "tmi.twitch.tv")
      switch (d.command) {
        case "002":
        case "003":
        case "004":
        case "372":
        case "375":
        case "CAP":
          break;
        case "001":
          this.username = d.params[0];
          break;
        case "376": {
          this.log.info("Connected to server."), this.userstate[this._globalDefaultChannel] = {}, this.emits(["connected", "_promiseConnect"], [[this.server, this.port], [null]]), this.reconnections = 0, this.reconnectTimer = this.reconnectInterval, this.pingLoop = setInterval(() => {
            this._isConnected() && this.ws.send("PING"), this.latency = /* @__PURE__ */ new Date(), this.pingTimeout = setTimeout(() => {
              this.ws !== null && (this.wasCloseCalled = !1, this.log.error("Ping timeout."), this.ws.close(), clearInterval(this.pingLoop), clearTimeout(this.pingTimeout), clearTimeout(this._updateEmotesetsTimer));
            }, h.get(this.opts.connection.timeout, 9999));
          }, 6e4);
          let _ = h.get(this.opts.options.joinInterval, 2e3);
          _ < 300 && (_ = 300);
          const b = new p(_), U = [.../* @__PURE__ */ new Set([...this.opts.channels, ...this.channels])];
          this.channels = [];
          for (let X = 0; X < U.length; X++) {
            const Q = U[X];
            b.add(() => {
              this._isConnected() && this.join(Q).catch((V) => this.log.error(V));
            });
          }
          b.next();
          break;
        }
        case "NOTICE": {
          const _ = [null], b = [u, R, g], U = [R], X = [u, !0], Q = [u, !1], V = [b, _], B = [b, U], $ = `[${u}] ${g}`;
          switch (R) {
            case "subs_on":
              this.log.info(`[${u}] This room is now in subscribers-only mode.`), this.emits(["subscriber", "subscribers", "_promiseSubscribers"], [X, X, _]);
              break;
            case "subs_off":
              this.log.info(`[${u}] This room is no longer in subscribers-only mode.`), this.emits(["subscriber", "subscribers", "_promiseSubscribersoff"], [Q, Q, _]);
              break;
            case "emote_only_on":
              this.log.info(`[${u}] This room is now in emote-only mode.`), this.emits(["emoteonly", "_promiseEmoteonly"], [X, _]);
              break;
            case "emote_only_off":
              this.log.info(`[${u}] This room is no longer in emote-only mode.`), this.emits(["emoteonly", "_promiseEmoteonlyoff"], [Q, _]);
              break;
            case "slow_on":
            case "slow_off":
              break;
            case "followers_on_zero":
            case "followers_on":
            case "followers_off":
              break;
            case "r9k_on":
              this.log.info(`[${u}] This room is now in r9k mode.`), this.emits(["r9kmode", "r9kbeta", "_promiseR9kbeta"], [X, X, _]);
              break;
            case "r9k_off":
              this.log.info(`[${u}] This room is no longer in r9k mode.`), this.emits(["r9kmode", "r9kbeta", "_promiseR9kbetaoff"], [Q, Q, _]);
              break;
            case "room_mods": {
              const G = g.split(": "), me = (G.length > 1 ? G[1] : "").toLowerCase().split(", ").filter((Ue) => Ue);
              this.emits(["_promiseMods", "mods"], [[null, me], [u, me]]);
              break;
            }
            case "no_mods":
              this.emits(["_promiseMods", "mods"], [[null, []], [u, []]]);
              break;
            case "vips_success": {
              g.endsWith(".") && (g = g.slice(0, -1));
              const G = g.split(": "), me = (G.length > 1 ? G[1] : "").toLowerCase().split(", ").filter((Ue) => Ue);
              this.emits(["_promiseVips", "vips"], [[null, me], [u, me]]);
              break;
            }
            case "no_vips":
              this.emits(["_promiseVips", "vips"], [[null, []], [u, []]]);
              break;
            case "already_banned":
            case "bad_ban_admin":
            case "bad_ban_anon":
            case "bad_ban_broadcaster":
            case "bad_ban_global_mod":
            case "bad_ban_mod":
            case "bad_ban_self":
            case "bad_ban_staff":
            case "usage_ban":
              this.log.info($), this.emits(["notice", "_promiseBan"], B);
              break;
            case "ban_success":
              this.log.info($), this.emits(["notice", "_promiseBan"], V);
              break;
            case "usage_clear":
              this.log.info($), this.emits(["notice", "_promiseClear"], B);
              break;
            case "usage_mods":
              this.log.info($), this.emits(["notice", "_promiseMods"], [b, [R, []]]);
              break;
            case "mod_success":
              this.log.info($), this.emits(["notice", "_promiseMod"], V);
              break;
            case "usage_vips":
              this.log.info($), this.emits(["notice", "_promiseVips"], [b, [R, []]]);
              break;
            case "usage_vip":
            case "bad_vip_grantee_banned":
            case "bad_vip_grantee_already_vip":
            case "bad_vip_max_vips_reached":
            case "bad_vip_achievement_incomplete":
              this.log.info($), this.emits(["notice", "_promiseVip"], [b, [R, []]]);
              break;
            case "vip_success":
              this.log.info($), this.emits(["notice", "_promiseVip"], V);
              break;
            case "usage_mod":
            case "bad_mod_banned":
            case "bad_mod_mod":
              this.log.info($), this.emits(["notice", "_promiseMod"], B);
              break;
            case "unmod_success":
              this.log.info($), this.emits(["notice", "_promiseUnmod"], V);
              break;
            case "unvip_success":
              this.log.info($), this.emits(["notice", "_promiseUnvip"], V);
              break;
            case "usage_unmod":
            case "bad_unmod_mod":
              this.log.info($), this.emits(["notice", "_promiseUnmod"], B);
              break;
            case "usage_unvip":
            case "bad_unvip_grantee_not_vip":
              this.log.info($), this.emits(["notice", "_promiseUnvip"], B);
              break;
            case "color_changed":
              this.log.info($), this.emits(["notice", "_promiseColor"], V);
              break;
            case "usage_color":
            case "turbo_only_color":
              this.log.info($), this.emits(["notice", "_promiseColor"], B);
              break;
            case "commercial_success":
              this.log.info($), this.emits(["notice", "_promiseCommercial"], V);
              break;
            case "usage_commercial":
            case "bad_commercial_error":
              this.log.info($), this.emits(["notice", "_promiseCommercial"], B);
              break;
            case "hosts_remaining": {
              this.log.info($);
              const G = isNaN(g[0]) ? 0 : parseInt(g[0]);
              this.emits(["notice", "_promiseHost"], [b, [null, ~~G]]);
              break;
            }
            case "bad_host_hosting":
            case "bad_host_rate_exceeded":
            case "bad_host_error":
            case "usage_host":
              this.log.info($), this.emits(["notice", "_promiseHost"], [b, [R, null]]);
              break;
            case "already_r9k_on":
            case "usage_r9k_on":
              this.log.info($), this.emits(["notice", "_promiseR9kbeta"], B);
              break;
            case "already_r9k_off":
            case "usage_r9k_off":
              this.log.info($), this.emits(["notice", "_promiseR9kbetaoff"], B);
              break;
            case "timeout_success":
              this.log.info($), this.emits(["notice", "_promiseTimeout"], V);
              break;
            case "delete_message_success":
              this.log.info(`[${u} ${g}]`), this.emits(["notice", "_promiseDeletemessage"], V);
              break;
            case "already_subs_off":
            case "usage_subs_off":
              this.log.info($), this.emits(["notice", "_promiseSubscribersoff"], B);
              break;
            case "already_subs_on":
            case "usage_subs_on":
              this.log.info($), this.emits(["notice", "_promiseSubscribers"], B);
              break;
            case "already_emote_only_off":
            case "usage_emote_only_off":
              this.log.info($), this.emits(["notice", "_promiseEmoteonlyoff"], B);
              break;
            case "already_emote_only_on":
            case "usage_emote_only_on":
              this.log.info($), this.emits(["notice", "_promiseEmoteonly"], B);
              break;
            case "usage_slow_on":
              this.log.info($), this.emits(["notice", "_promiseSlow"], B);
              break;
            case "usage_slow_off":
              this.log.info($), this.emits(["notice", "_promiseSlowoff"], B);
              break;
            case "usage_timeout":
            case "bad_timeout_admin":
            case "bad_timeout_anon":
            case "bad_timeout_broadcaster":
            case "bad_timeout_duration":
            case "bad_timeout_global_mod":
            case "bad_timeout_mod":
            case "bad_timeout_self":
            case "bad_timeout_staff":
              this.log.info($), this.emits(["notice", "_promiseTimeout"], B);
              break;
            case "untimeout_success":
            case "unban_success":
              this.log.info($), this.emits(["notice", "_promiseUnban"], V);
              break;
            case "usage_unban":
            case "bad_unban_no_ban":
              this.log.info($), this.emits(["notice", "_promiseUnban"], B);
              break;
            case "usage_delete":
            case "bad_delete_message_error":
            case "bad_delete_message_broadcaster":
            case "bad_delete_message_mod":
              this.log.info($), this.emits(["notice", "_promiseDeletemessage"], B);
              break;
            case "usage_unhost":
            case "not_hosting":
              this.log.info($), this.emits(["notice", "_promiseUnhost"], B);
              break;
            case "whisper_invalid_login":
            case "whisper_invalid_self":
            case "whisper_limit_per_min":
            case "whisper_limit_per_sec":
            case "whisper_restricted":
            case "whisper_restricted_recipient":
              this.log.info($), this.emits(["notice", "_promiseWhisper"], B);
              break;
            case "no_permission":
            case "msg_banned":
            case "msg_room_not_found":
            case "msg_channel_suspended":
            case "tos_ban":
            case "invalid_user":
              this.log.info($), this.emits([
                "notice",
                "_promiseBan",
                "_promiseClear",
                "_promiseUnban",
                "_promiseTimeout",
                "_promiseDeletemessage",
                "_promiseMods",
                "_promiseMod",
                "_promiseUnmod",
                "_promiseVips",
                "_promiseVip",
                "_promiseUnvip",
                "_promiseCommercial",
                "_promiseHost",
                "_promiseUnhost",
                "_promiseJoin",
                "_promisePart",
                "_promiseR9kbeta",
                "_promiseR9kbetaoff",
                "_promiseSlow",
                "_promiseSlowoff",
                "_promiseFollowers",
                "_promiseFollowersoff",
                "_promiseSubscribers",
                "_promiseSubscribersoff",
                "_promiseEmoteonly",
                "_promiseEmoteonlyoff",
                "_promiseWhisper"
              ], [b, [R, u]]);
              break;
            case "msg_rejected":
            case "msg_rejected_mandatory":
              this.log.info($), this.emit("automod", u, R, g);
              break;
            case "unrecognized_cmd":
              this.log.info($), this.emit("notice", u, R, g);
              break;
            case "cmds_available":
            case "host_target_went_offline":
            case "msg_censored_broadcaster":
            case "msg_duplicate":
            case "msg_emoteonly":
            case "msg_verified_email":
            case "msg_ratelimit":
            case "msg_subsonly":
            case "msg_timedout":
            case "msg_bad_characters":
            case "msg_channel_blocked":
            case "msg_facebook":
            case "msg_followersonly":
            case "msg_followersonly_followed":
            case "msg_followersonly_zero":
            case "msg_slowmode":
            case "msg_suspended":
            case "no_help":
            case "usage_disconnect":
            case "usage_help":
            case "usage_me":
            case "unavailable_command":
              this.log.info($), this.emit("notice", u, R, g);
              break;
            case "host_on":
            case "host_off":
              break;
            default:
              g.includes("Login unsuccessful") || g.includes("Login authentication failed") ? (this.wasCloseCalled = !1, this.reconnect = !1, this.reason = g, this.log.error(this.reason), this.ws.close()) : g.includes("Error logging in") || g.includes("Improperly formatted auth") ? (this.wasCloseCalled = !1, this.reconnect = !1, this.reason = g, this.log.error(this.reason), this.ws.close()) : g.includes("Invalid NICK") ? (this.wasCloseCalled = !1, this.reconnect = !1, this.reason = "Invalid NICK.", this.log.error(this.reason), this.ws.close()) : (this.log.warn(`Could not parse NOTICE from tmi.twitch.tv:
${JSON.stringify(d, null, 4)}`), this.emit("notice", u, R, g));
              break;
          }
          break;
        }
        case "USERNOTICE": {
          const _ = I["display-name"] || I.login, b = I["msg-param-sub-plan"] || "", U = h.unescapeIRC(h.get(I["msg-param-sub-plan-name"], "")) || null, Q = { prime: b.includes("Prime"), plan: b, planName: U }, V = ~~(I["msg-param-streak-months"] || 0), B = I["msg-param-recipient-display-name"] || I["msg-param-recipient-user-name"], $ = ~~I["msg-param-mass-gift-count"];
          switch (I["message-type"] = R, R) {
            case "resub":
              this.emits(["resub", "subanniversary"], [
                [u, _, V, g, I, Q]
              ]);
              break;
            case "sub":
              this.emits(["subscription", "sub"], [
                [u, _, Q, g, I]
              ]);
              break;
            case "subgift":
              this.emit("subgift", u, _, V, B, Q, I);
              break;
            case "anonsubgift":
              this.emit("anonsubgift", u, V, B, Q, I);
              break;
            case "submysterygift":
              this.emit("submysterygift", u, _, $, Q, I);
              break;
            case "anonsubmysterygift":
              this.emit("anonsubmysterygift", u, $, Q, I);
              break;
            case "primepaidupgrade":
              this.emit("primepaidupgrade", u, _, Q, I);
              break;
            case "giftpaidupgrade": {
              const G = I["msg-param-sender-name"] || I["msg-param-sender-login"];
              this.emit("giftpaidupgrade", u, _, G, I);
              break;
            }
            case "anongiftpaidupgrade":
              this.emit("anongiftpaidupgrade", u, _, I);
              break;
            case "raid": {
              const G = I["msg-param-displayName"] || I["msg-param-login"], me = +I["msg-param-viewerCount"];
              this.emit("raided", u, G, me, I);
              break;
            }
            case "ritual": {
              const G = I["msg-param-ritual-name"];
              switch (G) {
                case "new_chatter":
                  this.emit("newchatter", u, _, I, g);
                  break;
                default:
                  this.emit("ritual", G, u, _, I, g);
                  break;
              }
              break;
            }
            default:
              this.emit("usernotice", R, u, I, g);
              break;
          }
          break;
        }
        case "HOSTTARGET": {
          const _ = g.split(" "), b = ~~_[1] || 0;
          _[0] === "-" ? (this.log.info(`[${u}] Exited host mode.`), this.emits(["unhost", "_promiseUnhost"], [[u, b], [null]])) : (this.log.info(`[${u}] Now hosting ${_[0]} for ${b} viewer(s).`), this.emit("hosting", u, _[0], b));
          break;
        }
        case "CLEARCHAT":
          if (d.params.length > 1) {
            const _ = h.get(d.tags["ban-duration"], null);
            _ === null ? (this.log.info(`[${u}] ${g} has been banned.`), this.emit("ban", u, g, null, d.tags)) : (this.log.info(`[${u}] ${g} has been timed out for ${_} seconds.`), this.emit("timeout", u, g, null, ~~_, d.tags));
          } else
            this.log.info(`[${u}] Chat was cleared by a moderator.`), this.emits(["clearchat", "_promiseClear"], [[u], [null]]);
          break;
        case "CLEARMSG":
          if (d.params.length > 1) {
            const _ = g, b = I.login;
            I["message-type"] = "messagedeleted", this.log.info(`[${u}] ${b}'s message has been deleted.`), this.emit("messagedeleted", u, b, _, I);
          }
          break;
        case "RECONNECT":
          this.log.info("Received RECONNECT request from Twitch.."), this.log.info(`Disconnecting and reconnecting in ${Math.round(this.reconnectTimer / 1e3)} seconds..`), this.disconnect().catch((_) => this.log.error(_)), setTimeout(() => this.connect().catch((_) => this.log.error(_)), this.reconnectTimer);
          break;
        case "USERSTATE":
          d.tags.username = this.username, d.tags["user-type"] === "mod" && (this.moderators[u] || (this.moderators[u] = []), this.moderators[u].includes(this.username) || this.moderators[u].push(this.username)), !h.isJustinfan(this.getUsername()) && !this.userstate[u] && (this.userstate[u] = I, this.lastJoined = u, this.channels.push(u), this.log.info(`Joined ${u}`), this.emit("join", u, h.username(this.getUsername()), !0)), d.tags["emote-sets"] !== this.emotes && this._updateEmoteset(d.tags["emote-sets"]), this.userstate[u] = I;
          break;
        case "GLOBALUSERSTATE":
          this.globaluserstate = I, this.emit("globaluserstate", I), typeof d.tags["emote-sets"] < "u" && this._updateEmoteset(d.tags["emote-sets"]);
          break;
        case "ROOMSTATE":
          if (h.channel(this.lastJoined) === u && this.emit("_promiseJoin", null, u), d.tags.channel = u, this.emit("roomstate", u, d.tags), !h.hasOwn(d.tags, "subs-only")) {
            if (h.hasOwn(d.tags, "slow"))
              if (typeof d.tags.slow == "boolean" && !d.tags.slow) {
                const _ = [u, !1, 0];
                this.log.info(`[${u}] This room is no longer in slow mode.`), this.emits(["slow", "slowmode", "_promiseSlowoff"], [_, _, [null]]);
              } else {
                const _ = ~~d.tags.slow, b = [u, !0, _];
                this.log.info(`[${u}] This room is now in slow mode.`), this.emits(["slow", "slowmode", "_promiseSlow"], [b, b, [null]]);
              }
            if (h.hasOwn(d.tags, "followers-only"))
              if (d.tags["followers-only"] === "-1") {
                const _ = [u, !1, 0];
                this.log.info(`[${u}] This room is no longer in followers-only mode.`), this.emits(["followersonly", "followersmode", "_promiseFollowersoff"], [_, _, [null]]);
              } else {
                const _ = ~~d.tags["followers-only"], b = [u, !0, _];
                this.log.info(`[${u}] This room is now in follower-only mode.`), this.emits(["followersonly", "followersmode", "_promiseFollowers"], [b, b, [null]]);
              }
          }
          break;
        case "SERVERCHANGE":
          break;
        default:
          this.log.warn(`Could not parse message from tmi.twitch.tv:
${JSON.stringify(d, null, 4)}`);
          break;
      }
    else if (d.prefix === "jtv")
      switch (d.command) {
        case "MODE":
          g === "+o" ? (this.moderators[u] || (this.moderators[u] = []), this.moderators[u].includes(d.params[2]) || this.moderators[u].push(d.params[2]), this.emit("mod", u, d.params[2])) : g === "-o" && (this.moderators[u] || (this.moderators[u] = []), this.moderators[u].filter((_) => _ !== d.params[2]), this.emit("unmod", u, d.params[2]));
          break;
        default:
          this.log.warn(`Could not parse message from jtv:
${JSON.stringify(d, null, 4)}`);
          break;
      }
    else
      switch (d.command) {
        case "353":
          this.emit("names", d.params[2], d.params[3].split(" "));
          break;
        case "366":
          break;
        case "JOIN": {
          const _ = d.prefix.split("!")[0];
          h.isJustinfan(this.getUsername()) && this.username === _ && (this.lastJoined = u, this.channels.push(u), this.log.info(`Joined ${u}`), this.emit("join", u, _, !0)), this.username !== _ && this.emit("join", u, _, !1);
          break;
        }
        case "PART": {
          let _ = !1;
          const b = d.prefix.split("!")[0];
          if (this.username === b) {
            _ = !0, this.userstate[u] && delete this.userstate[u];
            let U = this.channels.indexOf(u);
            U !== -1 && this.channels.splice(U, 1), U = this.opts.channels.indexOf(u), U !== -1 && this.opts.channels.splice(U, 1), this.log.info(`Left ${u}`), this.emit("_promisePart", null);
          }
          this.emit("part", u, b, _);
          break;
        }
        case "WHISPER": {
          const _ = d.prefix.split("!")[0];
          this.log.info(`[WHISPER] <${_}>: ${g}`), h.hasOwn(d.tags, "username") || (d.tags.username = _), d.tags["message-type"] = "whisper";
          const b = h.channel(d.tags.username);
          this.emits(["whisper", "message"], [
            [b, d.tags, g, !1]
          ]);
          break;
        }
        case "PRIVMSG":
          if (d.tags.username = d.prefix.split("!")[0], d.tags.username === "jtv") {
            const _ = h.username(g.split(" ")[0]), b = g.includes("auto");
            if (g.includes("hosting you for")) {
              const U = h.extractNumber(g);
              this.emit("hosted", u, _, U, b);
            } else
              g.includes("hosting you") && this.emit("hosted", u, _, 0, b);
          } else {
            const _ = h.get(this.opts.options.messagesLogLevel, "info"), b = h.actionMessage(g);
            if (d.tags["message-type"] = b ? "action" : "chat", g = b ? b[1] : g, h.hasOwn(d.tags, "bits"))
              this.emit("cheer", u, d.tags, g);
            else {
              if (h.hasOwn(d.tags, "msg-id")) {
                if (d.tags["msg-id"] === "highlighted-message") {
                  const U = d.tags["msg-id"];
                  this.emit("redeem", u, d.tags.username, U, d.tags, g);
                } else if (d.tags["msg-id"] === "skip-subs-mode-message") {
                  const U = d.tags["msg-id"];
                  this.emit("redeem", u, d.tags.username, U, d.tags, g);
                }
              } else if (h.hasOwn(d.tags, "custom-reward-id")) {
                const U = d.tags["custom-reward-id"];
                this.emit("redeem", u, d.tags.username, U, d.tags, g);
              }
              b ? (this.log[_](`[${u}] *<${d.tags.username}>: ${g}`), this.emits(["action", "message"], [
                [u, d.tags, g, !1]
              ])) : (this.log[_](`[${u}] <${d.tags.username}>: ${g}`), this.emits(["chat", "message"], [
                [u, d.tags, g, !1]
              ]));
            }
          }
          break;
        default:
          this.log.warn(`Could not parse message:
${JSON.stringify(d, null, 4)}`);
          break;
      }
  }, x.prototype.connect = function() {
    return new Promise((d, u) => {
      this.server = h.get(this.opts.connection.server, "irc-ws.chat.twitch.tv"), this.port = h.get(this.opts.connection.port, 80), this.secure && (this.port = 443), this.port === 443 && (this.secure = !0), this.reconnectTimer = this.reconnectTimer * this.reconnectDecay, this.reconnectTimer >= this.maxReconnectInterval && (this.reconnectTimer = this.maxReconnectInterval), this._openConnection(), this.once("_promiseConnect", (g) => {
        g ? u(g) : d([this.server, ~~this.port]);
      });
    });
  }, x.prototype._openConnection = function() {
    const d = `${this.secure ? "wss" : "ws"}://${this.server}:${this.port}/`, u = {};
    "agent" in this.opts.connection && (u.agent = this.opts.connection.agent), this.ws = new s(d, "irc", u), this.ws.onmessage = this._onMessage.bind(this), this.ws.onerror = this._onError.bind(this), this.ws.onclose = this._onClose.bind(this), this.ws.onopen = this._onOpen.bind(this);
  }, x.prototype._onOpen = function() {
    this._isConnected() && (this.log.info(`Connecting to ${this.server} on port ${this.port}..`), this.emit("connecting", this.server, ~~this.port), this.username = h.get(this.opts.identity.username, h.justinfan()), this._getToken().then((d) => {
      const u = h.password(d);
      this.log.info("Sending authentication to server.."), this.emit("logon");
      let g = "twitch.tv/tags twitch.tv/commands";
      this._skipMembership || (g += " twitch.tv/membership"), this.ws.send("CAP REQ :" + g), u ? this.ws.send(`PASS ${u}`) : h.isJustinfan(this.username) && this.ws.send("PASS SCHMOOPIIE"), this.ws.send(`NICK ${this.username}`);
    }).catch((d) => {
      this.emits(["_promiseConnect", "disconnected"], [[d], ["Could not get a token."]]);
    }));
  }, x.prototype._getToken = function() {
    const d = this.opts.identity.password;
    let u;
    return typeof d == "function" ? (u = d(), u instanceof Promise ? u : Promise.resolve(u)) : Promise.resolve(d);
  }, x.prototype._onMessage = function(d) {
    d.data.trim().split(`\r
`).forEach((g) => {
      const R = a.msg(g);
      R && this.handleMessage(R);
    });
  }, x.prototype._onError = function() {
    this.moderators = {}, this.userstate = {}, this.globaluserstate = {}, clearInterval(this.pingLoop), clearTimeout(this.pingTimeout), clearTimeout(this._updateEmotesetsTimer), this.reason = this.ws === null ? "Connection closed." : "Unable to connect.", this.emits(["_promiseConnect", "disconnected"], [[this.reason]]), this.reconnect && this.reconnections === this.maxReconnectAttempts && (this.emit("maxreconnect"), this.log.error("Maximum reconnection attempts reached.")), this.reconnect && !this.reconnecting && this.reconnections <= this.maxReconnectAttempts - 1 && (this.reconnecting = !0, this.reconnections = this.reconnections + 1, this.log.error(`Reconnecting in ${Math.round(this.reconnectTimer / 1e3)} seconds..`), this.emit("reconnect"), setTimeout(() => {
      this.reconnecting = !1, this.connect().catch((d) => this.log.error(d));
    }, this.reconnectTimer)), this.ws = null;
  }, x.prototype._onClose = function() {
    this.moderators = {}, this.userstate = {}, this.globaluserstate = {}, clearInterval(this.pingLoop), clearTimeout(this.pingTimeout), clearTimeout(this._updateEmotesetsTimer), this.wasCloseCalled ? (this.wasCloseCalled = !1, this.reason = "Connection closed.", this.log.info(this.reason), this.emits(["_promiseConnect", "_promiseDisconnect", "disconnected"], [[this.reason], [null], [this.reason]])) : (this.emits(["_promiseConnect", "disconnected"], [[this.reason]]), this.reconnect && this.reconnections === this.maxReconnectAttempts && (this.emit("maxreconnect"), this.log.error("Maximum reconnection attempts reached.")), this.reconnect && !this.reconnecting && this.reconnections <= this.maxReconnectAttempts - 1 && (this.reconnecting = !0, this.reconnections = this.reconnections + 1, this.log.error(`Could not connect to server. Reconnecting in ${Math.round(this.reconnectTimer / 1e3)} seconds..`), this.emit("reconnect"), setTimeout(() => {
      this.reconnecting = !1, this.connect().catch((d) => this.log.error(d));
    }, this.reconnectTimer))), this.ws = null;
  }, x.prototype._getPromiseDelay = function() {
    return this.currentLatency <= 600 ? 600 : this.currentLatency + 100;
  }, x.prototype._sendCommand = function(d, u, g, R) {
    return new Promise((I, _) => {
      if (this._isConnected())
        (d === null || typeof d == "number") && (d === null && (d = this._getPromiseDelay()), h.promiseDelay(d).then(() => _("No response from Twitch.")));
      else
        return _("Not connected to server.");
      if (u !== null) {
        const b = h.channel(u);
        this.log.info(`[${b}] Executing command: ${g}`), this.ws.send(`PRIVMSG ${b} :${g}`);
      } else
        this.log.info(`Executing command: ${g}`), this.ws.send(g);
      typeof R == "function" ? R(I, _) : I();
    });
  }, x.prototype._sendMessage = function(d, u, g, R) {
    return new Promise((I, _) => {
      if (this._isConnected()) {
        if (h.isJustinfan(this.getUsername()))
          return _("Cannot send anonymous messages.");
      } else
        return _("Not connected to server.");
      const b = h.channel(u);
      if (this.userstate[b] || (this.userstate[b] = {}), g.length >= 500) {
        const B = h.splitLine(g, 500);
        g = B[0], setTimeout(() => {
          this._sendMessage(d, u, B[1], () => {
          });
        }, 350);
      }
      this.ws.send(`PRIVMSG ${b} :${g}`);
      const U = {};
      Object.keys(this.emotesets).forEach(
        (B) => this.emotesets[B].forEach(($) => (h.isRegex($.code) ? a.emoteRegex : a.emoteString)(g, $.code, $.id, U))
      );
      const X = Object.assign(
        this.userstate[b],
        a.emotes({ emotes: a.transformEmotes(U) || null })
      ), Q = h.get(this.opts.options.messagesLogLevel, "info"), V = h.actionMessage(g);
      V ? (X["message-type"] = "action", this.log[Q](`[${b}] *<${this.getUsername()}>: ${V[1]}`), this.emits(["action", "message"], [
        [b, X, V[1], !0]
      ])) : (X["message-type"] = "chat", this.log[Q](`[${b}] <${this.getUsername()}>: ${g}`), this.emits(["chat", "message"], [
        [b, X, g, !0]
      ])), typeof R == "function" ? R(I, _) : I();
    });
  }, x.prototype._updateEmoteset = function(d) {
    let u = d !== void 0;
    if (u && (d === this.emotes ? u = !1 : this.emotes = d), this._skipUpdatingEmotesets) {
      u && this.emit("emotesets", d, {});
      return;
    }
    const g = () => {
      this._updateEmotesetsTimerDelay > 0 && (clearTimeout(this._updateEmotesetsTimer), this._updateEmotesetsTimer = setTimeout(() => this._updateEmoteset(d), this._updateEmotesetsTimerDelay));
    };
    this._getToken().then((R) => {
      const I = `https://api.twitch.tv/kraken/chat/emoticon_images?emotesets=${d}`, _ = {};
      return "fetchAgent" in this.opts.connection && (_.agent = this.opts.connection.fetchAgent), n(I, {
        ..._,
        headers: {
          Accept: "application/vnd.twitchtv.v5+json",
          Authorization: `OAuth ${h.token(R)}`,
          "Client-ID": this.clientId
        }
      });
    }).then((R) => R.json()).then((R) => {
      this.emotesets = R.emoticon_sets || {}, this.emit("emotesets", d, this.emotesets), g();
    }).catch(() => g());
  }, x.prototype.getUsername = function() {
    return this.username;
  }, x.prototype.getOptions = function() {
    return this.opts;
  }, x.prototype.getChannels = function() {
    return this.channels;
  }, x.prototype.isMod = function(d, u) {
    const g = h.channel(d);
    return this.moderators[g] || (this.moderators[g] = []), this.moderators[g].includes(h.username(u));
  }, x.prototype.readyState = function() {
    return this.ws === null ? "CLOSED" : ["CONNECTING", "OPEN", "CLOSING", "CLOSED"][this.ws.readyState];
  }, x.prototype._isConnected = function() {
    return this.ws !== null && this.ws.readyState === 1;
  }, x.prototype.disconnect = function() {
    return new Promise((d, u) => {
      this.ws !== null && this.ws.readyState !== 3 ? (this.wasCloseCalled = !0, this.log.info("Disconnecting from server.."), this.ws.close(), this.once("_promiseDisconnect", () => d([this.server, ~~this.port]))) : (this.log.error("Cannot disconnect from server. Socket is not opened or connection is already closing."), u("Cannot disconnect from server. Socket is not opened or connection is already closing."));
    });
  }, x.prototype.off = x.prototype.removeListener, e.exports && (e.exports = x), typeof window < "u" && (window.tmi = {
    client: x,
    Client: x
  });
})(To);
var Sc = To.exports;
const _i = Sc;
var Lc = {
  client: _i,
  Client: _i
};
const jc = /* @__PURE__ */ mc(Lc), Po = /^!poll$/, Io = /^!poll [2-9]$/, No = /^!poll( "[^"]*")( "[^"]+"){2,}$/, bi = /"([^"]*)"/g, Fc = /^!polltitle( "[^"]+")$/, Dc = /^!poll_tl$|^!poll_tr$|^!poll_br$|^!poll_bl$/, $o = /^\s*(\d)(?: .*)?$/, Ao = (e) => Po.test(e) || Io.test(e) || No.test(e), Uc = (e) => /^!pollresume/g.test(e), Hc = (e) => /^!pollend/g.test(e), Bc = (e) => /^!pollstop/g.test(e), Vc = (e) => /^!pollreset/g.test(e), Wc = (e) => /^!polluntie|^!pollrandom|^!polltiebreak|^!pollresolve/g.test(e), Kc = (e) => Fc.test(e), qc = (e) => Dc.test(e), Jc = (e) => {
  var t;
  return !!((t = e.badges) != null && t.broadcaster || e.mod);
}, zc = (e) => $o.test(e), Qc = {
  active: !0,
  visible: !0,
  title: "which game should we play next?",
  options: { 1: "half-life 3", 2: "silk song", 3: "witcher 4", 4: "paralives", 5: "mario kart 9" },
  userVotes: { user1: "1", user2: "3", user3: "3" },
  position: "tl",
  tiebreakWinner: null
}, Yc = {
  active: !1,
  visible: !1,
  title: "Poll",
  options: {},
  userVotes: {},
  position: "tl",
  tiebreakWinner: null
}, oe = cs({
  ...Yc,
  stopPoll() {
    this.active = !1;
  },
  resumePoll() {
    this.active = !0, this.tiebreakWinner = null;
  },
  endPoll() {
    this.active = !1, this.visible = !1, this.title = "Poll", this.options = {}, this.userVotes = {}, this.tiebreakWinner = null;
  },
  resetPoll() {
    this.active = !0, this.tiebreakWinner = null, this.userVotes = {};
  },
  tiebreakPoll() {
    if (this.tiebreakWinner || this.active)
      return;
    const e = wn(this), t = Math.floor(Math.random() * e.length), s = e[t];
    this.tiebreakWinner = s;
  },
  updatePollTitle(e) {
    const s = e.match(bi).shift().replaceAll('"', "");
    this.title = s;
  },
  updatePosition(e) {
    const t = e.split("_")[1];
    this.position = t;
  },
  castVote(e, t) {
    var n;
    if (!this.visible || !this.active)
      return;
    const s = (n = e.match($o)) == null ? void 0 : n[1];
    s && (this.options[s] || s === "0") && (this.userVotes[t] = s);
  },
  setDebugMode(e) {
    this.debugMode = e, Object.assign(this, Qc);
  },
  startPoll(e) {
    var t;
    if (!(this.visible || this.active || !Ao(e))) {
      if (this.options = {}, this.userVotes = {}, this.active = !0, this.visible = !0, this.title = "Poll", this.tiebreakWinner = null, Po.test(e))
        for (let s = 1; s <= 2; s++)
          this.options[s] = " ";
      else if (Io.test(e)) {
        const s = (t = e.match(/!poll (\d)/)) == null ? void 0 : t[1];
        if (s)
          for (let n = 1; n <= s; n++)
            this.options[n] = " ";
      } else if (No.test(e)) {
        const s = [...e.matchAll(bi)].map((i) => i[1]), n = s.shift() || "Poll";
        this.title = n, s.forEach((i, o) => {
          this.options[o + 1] = i;
        });
      }
    }
  }
});
function wi(e, t) {
  zc(t) && oe.castVote(t, e.username), Jc(e) && Xc(t);
}
function Xc(e) {
  Ao(e) && oe.startPoll(e), Bc(e) && oe.stopPoll(), Uc(e) && oe.resumePoll(), Hc(e) && oe.endPoll(), Kc(e) && oe.updatePollTitle(e), qc(e) && oe.updatePosition(e), Vc(e) && oe.resetPoll(), Wc(e) && oe.tiebreakPoll();
}
const Mo = {
  tl: "top-left",
  tr: "top-right",
  br: "bottom-right",
  bl: "bottom-left"
};
function Zc() {
  const e = new URLSearchParams(window.location.search), t = e.get("position"), s = e.has("debug"), n = e.get("channel");
  t && Mo[t] && oe.updatePosition(t), s && (oe.setDebugMode(!0), window.chat = (o, r = "testuser", l = !0) => {
    wi({ mod: l, username: r }, o);
  });
  const i = jc.Client({
    channels: [n]
  });
  i.connect(), i.on("message", (o, r, l) => wi(r, l));
}
var Gc = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) }, Se = function(e) {
  return typeof e == "string" ? e.length > 0 : typeof e == "number";
}, se = function(e, t, s) {
  return t === void 0 && (t = 0), s === void 0 && (s = Math.pow(10, t)), Math.round(s * e) / s + 0;
}, _e = function(e, t, s) {
  return t === void 0 && (t = 0), s === void 0 && (s = 1), e > s ? s : e > t ? e : t;
}, Ro = function(e) {
  return (e = isFinite(e) ? e % 360 : 0) > 0 ? e : e + 360;
}, vi = function(e) {
  return { r: _e(e.r, 0, 255), g: _e(e.g, 0, 255), b: _e(e.b, 0, 255), a: _e(e.a) };
}, Ps = function(e) {
  return { r: se(e.r), g: se(e.g), b: se(e.b), a: se(e.a, 3) };
}, ea = /^#([0-9a-f]{3,8})$/i, qt = function(e) {
  var t = e.toString(16);
  return t.length < 2 ? "0" + t : t;
}, So = function(e) {
  var t = e.r, s = e.g, n = e.b, i = e.a, o = Math.max(t, s, n), r = o - Math.min(t, s, n), l = r ? o === t ? (s - n) / r : o === s ? 2 + (n - t) / r : 4 + (t - s) / r : 0;
  return { h: 60 * (l < 0 ? l + 6 : l), s: o ? r / o * 100 : 0, v: o / 255 * 100, a: i };
}, Lo = function(e) {
  var t = e.h, s = e.s, n = e.v, i = e.a;
  t = t / 360 * 6, s /= 100, n /= 100;
  var o = Math.floor(t), r = n * (1 - s), l = n * (1 - (t - o) * s), a = n * (1 - (1 - t + o) * s), p = o % 6;
  return { r: 255 * [n, l, r, r, a, n][p], g: 255 * [a, n, n, l, r, r][p], b: 255 * [r, r, a, n, n, l][p], a: i };
}, yi = function(e) {
  return { h: Ro(e.h), s: _e(e.s, 0, 100), l: _e(e.l, 0, 100), a: _e(e.a) };
}, xi = function(e) {
  return { h: se(e.h), s: se(e.s), l: se(e.l), a: se(e.a, 3) };
}, Ci = function(e) {
  return Lo((s = (t = e).s, { h: t.h, s: (s *= ((n = t.l) < 50 ? n : 100 - n) / 100) > 0 ? 2 * s / (n + s) * 100 : 0, v: n + s, a: t.a }));
  var t, s, n;
}, Pt = function(e) {
  return { h: (t = So(e)).h, s: (i = (200 - (s = t.s)) * (n = t.v) / 100) > 0 && i < 200 ? s * n / 100 / (i <= 100 ? i : 200 - i) * 100 : 0, l: i / 2, a: t.a };
  var t, s, n, i;
}, ta = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, sa = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, na = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, ia = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Ys = { string: [[function(e) {
  var t = ea.exec(e);
  return t ? (e = t[1]).length <= 4 ? { r: parseInt(e[0] + e[0], 16), g: parseInt(e[1] + e[1], 16), b: parseInt(e[2] + e[2], 16), a: e.length === 4 ? se(parseInt(e[3] + e[3], 16) / 255, 2) : 1 } : e.length === 6 || e.length === 8 ? { r: parseInt(e.substr(0, 2), 16), g: parseInt(e.substr(2, 2), 16), b: parseInt(e.substr(4, 2), 16), a: e.length === 8 ? se(parseInt(e.substr(6, 2), 16) / 255, 2) : 1 } : null : null;
}, "hex"], [function(e) {
  var t = na.exec(e) || ia.exec(e);
  return t ? t[2] !== t[4] || t[4] !== t[6] ? null : vi({ r: Number(t[1]) / (t[2] ? 100 / 255 : 1), g: Number(t[3]) / (t[4] ? 100 / 255 : 1), b: Number(t[5]) / (t[6] ? 100 / 255 : 1), a: t[7] === void 0 ? 1 : Number(t[7]) / (t[8] ? 100 : 1) }) : null;
}, "rgb"], [function(e) {
  var t = ta.exec(e) || sa.exec(e);
  if (!t)
    return null;
  var s, n, i = yi({ h: (s = t[1], n = t[2], n === void 0 && (n = "deg"), Number(s) * (Gc[n] || 1)), s: Number(t[3]), l: Number(t[4]), a: t[5] === void 0 ? 1 : Number(t[5]) / (t[6] ? 100 : 1) });
  return Ci(i);
}, "hsl"]], object: [[function(e) {
  var t = e.r, s = e.g, n = e.b, i = e.a, o = i === void 0 ? 1 : i;
  return Se(t) && Se(s) && Se(n) ? vi({ r: Number(t), g: Number(s), b: Number(n), a: Number(o) }) : null;
}, "rgb"], [function(e) {
  var t = e.h, s = e.s, n = e.l, i = e.a, o = i === void 0 ? 1 : i;
  if (!Se(t) || !Se(s) || !Se(n))
    return null;
  var r = yi({ h: Number(t), s: Number(s), l: Number(n), a: Number(o) });
  return Ci(r);
}, "hsl"], [function(e) {
  var t = e.h, s = e.s, n = e.v, i = e.a, o = i === void 0 ? 1 : i;
  if (!Se(t) || !Se(s) || !Se(n))
    return null;
  var r = function(l) {
    return { h: Ro(l.h), s: _e(l.s, 0, 100), v: _e(l.v, 0, 100), a: _e(l.a) };
  }({ h: Number(t), s: Number(s), v: Number(n), a: Number(o) });
  return Lo(r);
}, "hsv"]] }, Ti = function(e, t) {
  for (var s = 0; s < t.length; s++) {
    var n = t[s][0](e);
    if (n)
      return [n, t[s][1]];
  }
  return [null, void 0];
}, oa = function(e) {
  return typeof e == "string" ? Ti(e.trim(), Ys.string) : typeof e == "object" && e !== null ? Ti(e, Ys.object) : [null, void 0];
}, Is = function(e, t) {
  var s = Pt(e);
  return { h: s.h, s: _e(s.s + 100 * t, 0, 100), l: s.l, a: s.a };
}, Ns = function(e) {
  return (299 * e.r + 587 * e.g + 114 * e.b) / 1e3 / 255;
}, Ei = function(e, t) {
  var s = Pt(e);
  return { h: s.h, s: s.s, l: _e(s.l + 100 * t, 0, 100), a: s.a };
}, Xs = function() {
  function e(t) {
    this.parsed = oa(t)[0], this.rgba = this.parsed || { r: 0, g: 0, b: 0, a: 1 };
  }
  return e.prototype.isValid = function() {
    return this.parsed !== null;
  }, e.prototype.brightness = function() {
    return se(Ns(this.rgba), 2);
  }, e.prototype.isDark = function() {
    return Ns(this.rgba) < 0.5;
  }, e.prototype.isLight = function() {
    return Ns(this.rgba) >= 0.5;
  }, e.prototype.toHex = function() {
    return t = Ps(this.rgba), s = t.r, n = t.g, i = t.b, r = (o = t.a) < 1 ? qt(se(255 * o)) : "", "#" + qt(s) + qt(n) + qt(i) + r;
    var t, s, n, i, o, r;
  }, e.prototype.toRgb = function() {
    return Ps(this.rgba);
  }, e.prototype.toRgbString = function() {
    return t = Ps(this.rgba), s = t.r, n = t.g, i = t.b, (o = t.a) < 1 ? "rgba(" + s + ", " + n + ", " + i + ", " + o + ")" : "rgb(" + s + ", " + n + ", " + i + ")";
    var t, s, n, i, o;
  }, e.prototype.toHsl = function() {
    return xi(Pt(this.rgba));
  }, e.prototype.toHslString = function() {
    return t = xi(Pt(this.rgba)), s = t.h, n = t.s, i = t.l, (o = t.a) < 1 ? "hsla(" + s + ", " + n + "%, " + i + "%, " + o + ")" : "hsl(" + s + ", " + n + "%, " + i + "%)";
    var t, s, n, i, o;
  }, e.prototype.toHsv = function() {
    return t = So(this.rgba), { h: se(t.h), s: se(t.s), v: se(t.v), a: se(t.a, 3) };
    var t;
  }, e.prototype.invert = function() {
    return ge({ r: 255 - (t = this.rgba).r, g: 255 - t.g, b: 255 - t.b, a: t.a });
    var t;
  }, e.prototype.saturate = function(t) {
    return t === void 0 && (t = 0.1), ge(Is(this.rgba, t));
  }, e.prototype.desaturate = function(t) {
    return t === void 0 && (t = 0.1), ge(Is(this.rgba, -t));
  }, e.prototype.grayscale = function() {
    return ge(Is(this.rgba, -1));
  }, e.prototype.lighten = function(t) {
    return t === void 0 && (t = 0.1), ge(Ei(this.rgba, t));
  }, e.prototype.darken = function(t) {
    return t === void 0 && (t = 0.1), ge(Ei(this.rgba, -t));
  }, e.prototype.rotate = function(t) {
    return t === void 0 && (t = 15), this.hue(this.hue() + t);
  }, e.prototype.alpha = function(t) {
    return typeof t == "number" ? ge({ r: (s = this.rgba).r, g: s.g, b: s.b, a: t }) : se(this.rgba.a, 3);
    var s;
  }, e.prototype.hue = function(t) {
    var s = Pt(this.rgba);
    return typeof t == "number" ? ge({ h: t, s: s.s, l: s.l, a: s.a }) : se(s.h);
  }, e.prototype.isEqual = function(t) {
    return this.toHex() === ge(t).toHex();
  }, e;
}(), ge = function(e) {
  return e instanceof Xs ? e : new Xs(e);
}, Oi = [], ra = function(e) {
  e.forEach(function(t) {
    Oi.indexOf(t) < 0 && (t(Xs, Ys), Oi.push(t));
  });
}, $s = function(e) {
  var t = e / 255;
  return t < 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4);
}, As = function(e) {
  return 0.2126 * $s(e.r) + 0.7152 * $s(e.g) + 0.0722 * $s(e.b);
};
function la(e) {
  e.prototype.luminance = function() {
    return t = As(this.rgba), (s = 2) === void 0 && (s = 0), n === void 0 && (n = Math.pow(10, s)), Math.round(n * t) / n + 0;
    var t, s, n;
  }, e.prototype.contrast = function(t) {
    t === void 0 && (t = "#FFF");
    var s, n, i, o, r, l, a, p = t instanceof e ? t : new e(t);
    return o = this.rgba, r = p.toRgb(), l = As(o), a = As(r), s = l > a ? (l + 0.05) / (a + 0.05) : (a + 0.05) / (l + 0.05), (n = 2) === void 0 && (n = 0), i === void 0 && (i = Math.pow(10, n)), Math.floor(i * s) / i + 0;
  }, e.prototype.isReadable = function(t, s) {
    return t === void 0 && (t = "#FFF"), s === void 0 && (s = {}), this.contrast(t) >= (l = (r = (n = s).size) === void 0 ? "normal" : r, (o = (i = n.level) === void 0 ? "AA" : i) === "AAA" && l === "normal" ? 7 : o === "AA" && l === "large" ? 3 : 4.5);
    var n, i, o, r, l;
  };
}
function ca(e, t) {
  var s = { white: "#ffffff", bisque: "#ffe4c4", blue: "#0000ff", cadetblue: "#5f9ea0", chartreuse: "#7fff00", chocolate: "#d2691e", coral: "#ff7f50", antiquewhite: "#faebd7", aqua: "#00ffff", azure: "#f0ffff", whitesmoke: "#f5f5f5", papayawhip: "#ffefd5", plum: "#dda0dd", blanchedalmond: "#ffebcd", black: "#000000", gold: "#ffd700", goldenrod: "#daa520", gainsboro: "#dcdcdc", cornsilk: "#fff8dc", cornflowerblue: "#6495ed", burlywood: "#deb887", aquamarine: "#7fffd4", beige: "#f5f5dc", crimson: "#dc143c", cyan: "#00ffff", darkblue: "#00008b", darkcyan: "#008b8b", darkgoldenrod: "#b8860b", darkkhaki: "#bdb76b", darkgray: "#a9a9a9", darkgreen: "#006400", darkgrey: "#a9a9a9", peachpuff: "#ffdab9", darkmagenta: "#8b008b", darkred: "#8b0000", darkorchid: "#9932cc", darkorange: "#ff8c00", darkslateblue: "#483d8b", gray: "#808080", darkslategray: "#2f4f4f", darkslategrey: "#2f4f4f", deeppink: "#ff1493", deepskyblue: "#00bfff", wheat: "#f5deb3", firebrick: "#b22222", floralwhite: "#fffaf0", ghostwhite: "#f8f8ff", darkviolet: "#9400d3", magenta: "#ff00ff", green: "#008000", dodgerblue: "#1e90ff", grey: "#808080", honeydew: "#f0fff0", hotpink: "#ff69b4", blueviolet: "#8a2be2", forestgreen: "#228b22", lawngreen: "#7cfc00", indianred: "#cd5c5c", indigo: "#4b0082", fuchsia: "#ff00ff", brown: "#a52a2a", maroon: "#800000", mediumblue: "#0000cd", lightcoral: "#f08080", darkturquoise: "#00ced1", lightcyan: "#e0ffff", ivory: "#fffff0", lightyellow: "#ffffe0", lightsalmon: "#ffa07a", lightseagreen: "#20b2aa", linen: "#faf0e6", mediumaquamarine: "#66cdaa", lemonchiffon: "#fffacd", lime: "#00ff00", khaki: "#f0e68c", mediumseagreen: "#3cb371", limegreen: "#32cd32", mediumspringgreen: "#00fa9a", lightskyblue: "#87cefa", lightblue: "#add8e6", midnightblue: "#191970", lightpink: "#ffb6c1", mistyrose: "#ffe4e1", moccasin: "#ffe4b5", mintcream: "#f5fffa", lightslategray: "#778899", lightslategrey: "#778899", navajowhite: "#ffdead", navy: "#000080", mediumvioletred: "#c71585", powderblue: "#b0e0e6", palegoldenrod: "#eee8aa", oldlace: "#fdf5e6", paleturquoise: "#afeeee", mediumturquoise: "#48d1cc", mediumorchid: "#ba55d3", rebeccapurple: "#663399", lightsteelblue: "#b0c4de", mediumslateblue: "#7b68ee", thistle: "#d8bfd8", tan: "#d2b48c", orchid: "#da70d6", mediumpurple: "#9370db", purple: "#800080", pink: "#ffc0cb", skyblue: "#87ceeb", springgreen: "#00ff7f", palegreen: "#98fb98", red: "#ff0000", yellow: "#ffff00", slateblue: "#6a5acd", lavenderblush: "#fff0f5", peru: "#cd853f", palevioletred: "#db7093", violet: "#ee82ee", teal: "#008080", slategray: "#708090", slategrey: "#708090", aliceblue: "#f0f8ff", darkseagreen: "#8fbc8f", darkolivegreen: "#556b2f", greenyellow: "#adff2f", seagreen: "#2e8b57", seashell: "#fff5ee", tomato: "#ff6347", silver: "#c0c0c0", sienna: "#a0522d", lavender: "#e6e6fa", lightgreen: "#90ee90", orange: "#ffa500", orangered: "#ff4500", steelblue: "#4682b4", royalblue: "#4169e1", turquoise: "#40e0d0", yellowgreen: "#9acd32", salmon: "#fa8072", saddlebrown: "#8b4513", sandybrown: "#f4a460", rosybrown: "#bc8f8f", darksalmon: "#e9967a", lightgoldenrodyellow: "#fafad2", snow: "#fffafa", lightgrey: "#d3d3d3", lightgray: "#d3d3d3", dimgray: "#696969", dimgrey: "#696969", olivedrab: "#6b8e23", olive: "#808000" }, n = {};
  for (var i in s)
    n[s[i]] = i;
  var o = {};
  e.prototype.toName = function(r) {
    if (!(this.rgba.a || this.rgba.r || this.rgba.g || this.rgba.b))
      return "transparent";
    var l, a, p = n[this.toHex()];
    if (p)
      return p;
    if (r != null && r.closest) {
      var h = this.toRgb(), O = 1 / 0, x = "black";
      if (!o.length)
        for (var k in s)
          o[k] = new e(s[k]).toRgb();
      for (var d in s) {
        var u = (l = h, a = o[d], Math.pow(l.r - a.r, 2) + Math.pow(l.g - a.g, 2) + Math.pow(l.b - a.b, 2));
        u < O && (O = u, x = d);
      }
      return x;
    }
  }, t.string.push([function(r) {
    var l = r.toLowerCase(), a = l === "transparent" ? "#0000" : s[l];
    return a ? new e(a).toRgb() : null;
  }, "name"]);
}
const aa = {
  //defaults
  useIcons: !0,
  // actual values (optionally) set by the user
  ...window.config ?? {}
}, fa = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  "stroke-width": "2",
  stroke: "currentColor",
  fill: "none",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, ua = /* @__PURE__ */ bo('<path stroke="none" d="M0 0h24v24H0z"></path><rect x="4" y="4" width="16" height="16" rx="2"></rect><circle cx="8.5" cy="8.5" r=".5" fill="currentColor"></circle><circle cx="15.5" cy="8.5" r=".5" fill="currentColor"></circle><circle cx="15.5" cy="15.5" r=".5" fill="currentColor"></circle><circle cx="8.5" cy="15.5" r=".5" fill="currentColor"></circle>', 6), ha = [
  ua
];
function da(e, t) {
  return xe(), et("svg", fa, [...ha]);
}
const pa = { render: da }, ma = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  "stroke-width": "2",
  stroke: "currentColor",
  fill: "none",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, ga = /* @__PURE__ */ bo('<path stroke="none" d="M0 0h24v24H0z"></path><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line><line x1="7" y1="4" x2="17" y2="4"></line><path d="M17 4v8a5 5 0 0 1 -10 0v-8"></path><circle cx="5" cy="9" r="2"></circle><circle cx="19" cy="9" r="2"></circle>', 7), _a = [
  ga
];
function ba(e, t) {
  return xe(), et("svg", ma, [..._a]);
}
const wa = { render: ba };
const jo = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, i] of t)
    s[n] = i;
  return s;
};
ra([la, ca]);
const vn = {
  props: {
    optionNumber: String,
    optionName: String,
    voteCount: Number,
    totalCount: Number,
    winningOptions: Array,
    status: String
    // 'win'|'tie'|'tiebreakwin'
  },
  components: {
    Dice: pa,
    Trophy: wa
  },
  computed: {
    percentage() {
      return this.totalCount === 0 ? 0 : Math.round(this.voteCount / this.totalCount * 100);
    },
    optionClasses() {
      switch (this.status) {
        case "win":
          return "win-option animate__animated animate__bounceIn";
        case "tie":
          return "tie-option animate__animated animate__headShake";
        case "tiebreakwin":
          return "tiebreakwin-option animate__animated animate__bounceIn";
        default:
          return "";
      }
    },
    optionBackground() {
      const e = getComputedStyle(document.body);
      switch (this.status) {
        case "win":
          return e.getPropertyValue("--option-color-win");
        case "tie":
          return e.getPropertyValue("--option-color-tie");
        case "tiebreakwin":
          return e.getPropertyValue("--option-color-win");
        default:
          return e.getPropertyValue("--option-color");
      }
    },
    contrastingTextColor() {
      const e = ge(this.optionBackground).toHex(), t = ge(e).contrast("#ffffff"), s = ge(e).contrast("#000000");
      return t > s ? "#fff" : "#000";
    },
    useIcons() {
      return aa.useIcons;
    }
  }
}, ki = () => {
  zl((e) => ({
    "7cb550b0": e.contrastingTextColor
  }));
}, Pi = vn.setup;
vn.setup = Pi ? (e, t) => (ki(), Pi(e, t)) : ki;
const va = { class: "option-number" }, ya = { contentEditable: !0 }, xa = { class: "percentage" }, Ca = { class: "progress-bar-container" }, Ta = {
  key: 0,
  class: "progress-bar-extension"
}, Ea = {
  key: 1,
  class: "progress-bar-dice-icon"
};
function Oa(e, t, s, n, i, o) {
  const r = Us("Trophy"), l = Us("Dice");
  return xe(), et("div", {
    class: St(["option", o.optionClasses]),
    key: s.optionNumber
  }, [
    Ie("div", null, [
      Ie("div", va, xt(s.optionNumber), 1),
      Ie("span", ya, xt(s.optionName), 1),
      _o(": "),
      Ie("span", xa, xt(o.percentage) + "% (" + xt(s.voteCount) + ")", 1)
    ]),
    Ie("div", Ca, [
      Ie("div", {
        class: "progress-bar",
        style: rs({ width: `${o.percentage}%` })
      }, [
        s.status === "win" && o.useIcons ? (xe(), ts(r, {
          key: 0,
          class: "progress-bar-trophy-icon"
        })) : Jn("", !0)
      ], 4),
      s.status === "tiebreakwin" ? (xe(), et("div", Ta, [
        o.useIcons ? (xe(), ts(l, {
          key: 0,
          class: "progress-bar-dice-icon"
        })) : (xe(), et("svg", Ea))
      ])) : Jn("", !0)
    ])
  ], 2);
}
const ka = /* @__PURE__ */ jo(vn, [["render", Oa]]);
const Pa = {
  components: {
    PollOption: ka
  },
  computed: {
    pollState() {
      return oe;
    },
    totalVoteCount() {
      return pc(oe);
    },
    voteCountsPerOption() {
      return Co(oe);
    },
    winningOptions() {
      return wn(oe);
    },
    positionClassName() {
      return Mo[oe.position];
    },
    statuses() {
      return dc(oe);
    }
  }
}, Ia = { class: "poll" }, Na = {
  id: "poll-title",
  class: "poll-title"
};
function $a(e, t, s, n, i, o) {
  const r = Us("PollOption");
  return xe(), et("div", {
    class: St(["container", o.positionClassName])
  }, [
    qr(Ie("div", Ia, [
      Ie("h1", Na, xt(o.pollState.title), 1),
      (xe(!0), et(ve, null, il(Object.entries(o.pollState.options), ([l, a]) => (xe(), ts(r, {
        optionNumber: l,
        optionName: a,
        voteCount: o.voteCountsPerOption[l],
        totalCount: o.totalVoteCount,
        winningOptions: o.winningOptions,
        status: o.statuses[l],
        key: l
      }, null, 8, ["optionNumber", "optionName", "voteCount", "totalCount", "winningOptions", "status"]))), 128))
    ], 512), [
      [Jl, o.pollState.visible]
    ])
  ], 2);
}
const Aa = /* @__PURE__ */ jo(Pa, [["render", $a]]);
Zc();
uc(Aa).mount("#app");
