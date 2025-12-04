const d = (e) => e.unsubscribe();
function l(e) {
  e.forEach(d), e.clear();
}
function m() {
  const e = /* @__PURE__ */ new Set();
  return {
    emit(s) {
      for (const t of e)
        t(s);
    },
    subscribe(s) {
      return e.add(s), {
        unsubscribe: () => e.delete(s)
      };
    }
  };
}
function S(e) {
  let s = e;
  const t = m();
  return {
    get value() {
      return s;
    },
    set value(r) {
      r !== s && (s = r, t.emit(r));
    },
    subscribe: t.subscribe
  };
}
function v(e) {
  const s = m();
  let t = e;
  const r = new Proxy(t, {
    set(u, n, o) {
      return u[n] === o || (u[n] = o, s.emit(r)), !0;
    }
  });
  return {
    get value() {
      return r;
    },
    set value(u) {
      if (u !== t) {
        for (const n of Object.keys(t))
          t[n] = u[n];
        s.emit(r);
      }
    },
    subscribe: s.subscribe
  };
}
function w(e, s) {
  const t = m();
  let r = 0;
  const u = /* @__PURE__ */ new Set(), n = (i) => t.emit(s(i)), o = () => {
    l(u), e.forEach((i) => {
      const c = i.subscribe(n);
      u.add(c);
    });
  }, a = () => l(u);
  return {
    subscribe(i) {
      r === 0 && o(), r++;
      const c = t.subscribe(i);
      return {
        unsubscribe: () => {
          d(c), r--, r === 0 && a();
        }
      };
    }
  };
}
function y(e, s) {
  const t = e.map((c) => c.value), r = S(s(...t)), u = /* @__PURE__ */ new Set(), n = (c) => {
    const b = e.map((f) => f.value);
    r.value = s(...b);
  }, o = () => {
    l(u), e.forEach((c) => {
      const b = c.subscribe(n);
      u.add(b);
    });
  }, a = () => l(u), i = new Proxy(r, {
    get: function(c, b, f) {
      if (b !== "unsubscribe")
        return Reflect.get(c, b, f);
      a();
    }
  });
  return o(), i;
}
function k(e, s) {
  return e.subscribe(s);
}
export {
  w as derivedPublisher,
  y as derivedValue,
  k as effect,
  m as makeEmitter,
  v as makeReactiveObject,
  S as makeReactiveValue,
  d as unsubscribe,
  l as unsubscribeAll
};
