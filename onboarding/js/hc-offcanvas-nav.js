/*
 * HC Off-canvas Nav
 * ===================
 * Version: 6.1.4
 * Author: Some Web Media
 * Author URL: https://github.com/somewebmedia/
 * Plugin URL: https://github.com/somewebmedia/hc-offcanvas-nav
 * Description: JavaScript library for creating off-canvas multi-level navigations
 * License: MIT
 */
"use strict";
! function (e, t) {
    if ("object" == typeof module && "object" == typeof module.exports) {
        if (!e.document) throw new Error("HC Off-canvas Nav requires a browser to run.");
        module.exports = t(e)
    } else "function" == typeof define && define.amd ? define("hcOffcanvasNav", [], t(e)) : t(e)
}("undefined" != typeof window ? window : this, function (re) {
    function i(e, t) {
        if (t = t || {}, !(e = "string" == typeof e ? "#" === e.charAt(0) && -1 === e.indexOf(" ") ? ie.querySelector(e) : ie.querySelectorAll(e) : e)) return !1;
        var ee = i.Helpers;
        void 0 !== t.maxWidth && (ee.deprecated("maxWidth", "disableAt", "option"), t.disableAt = t.maxWidth);
        var te = Object.assign({}, {
            width: 280,
            height: "auto",
            disableAt: !1,
            pushContent: null,
            swipeGestures: !0,
            expanded: !1,
            position: "left",
            levelOpen: "overlap",
            levelSpacing: 40,
            levelTitles: !0,
            closeOpenLevels: !0,
            closeActiveLevel: !1,
            navTitle: null,
            navClass: "",
            disableBody: !0,
            closeOnClick: !0,
            closeOnEsc: !0,
            customToggle: null,
            activeToggleClass: null,
            bodyInsert: "prepend",
            keepClasses: !0,
            removeOriginalNav: !1,
            rtl: !1,
            insertClose: !0,
            insertBack: !0,
            levelTitleAsBack: !0,
            labelClose: "",
            labelBack: "Back"
        }, t);

        function ne(e) {
            if (ae.length) {
                for (var t = !1, n = (e = "string" == typeof e ? [e] : e).length, a = 0; a < n; a++) - 1 !== ae.indexOf(e[a]) && (t = !0);
                return t
            }
        }

        function n(e) {
            if (e.querySelector("ul") || "UL" === e.tagName) {
                var g = "hc-nav-" + ++oe,
                    s = ee.printStyle("hc-offcanvas-" + oe + "-style"),
                    o = "keydown.hcOffcanvasNav",
                    v = te.activeToggleClass || "toggle-open",
                    u = ee.createElement("nav", {
                        id: g
                    }),
                    d = ee.createElement("div", {
                        class: "nav-container"
                    });
                u.addEventListener("click", ee.stopPropagation), u.appendChild(d);
                var n, p, a, f = null,
                    h = null,
                    m = null,
                    t = {},
                    b = !1,
                    y = !1,
                    E = null,
                    L = 0,
                    A = 0,
                    x = 0,
                    C = null,
                    O = {},
                    k = [],
                    N = !1,
                    T = [],
                    r = null,
                    i = null,
                    l = !1,
                    c = !1;
                te.customToggle ? f = ee.getElements(te.customToggle) : (f = [ee.createElement("a", {
                    href: "#"
                }, ee.createElement("span"))], e.insertAdjacentElement("afterend", f[0])), f && f.length && f.forEach(function (e) {
                    e.addEventListener("click", J(e)), e.classList.add("hc-nav-trigger", g), e.setAttribute("role", "button"), e.setAttribute("aria-label", (te.ariaLabels || {}).open), e.setAttribute("aria-controls", g), e.setAttribute("aria-expanded", !1), e.addEventListener("keydown", function (e) {
                        "Enter" !== e.key && 13 !== e.keyCode || setTimeout(function () {
                            w(0, 0)
                        }, 0)
                    })
                });
                var w = function (e, t, n) {
                        var a, r, i;
                        "number" != typeof t || "number" != typeof e && !T.length || (i = Array.prototype.filter.call(d.querySelectorAll(".nav-wrapper"), function (e) {
                            return e.getAttribute("data-level") == t && ("number" != typeof n || "number" == typeof n && e.getAttribute("data-index") == n)
                        })[0], i = ee.children(i, ".nav-content")[0], i = ee.children(i, "ul"), i = ee.children(i, "li"), i = ee.children(i, ":not(.nav-wrapper)"), i = Array.prototype.map.call(i, function (e) {
                            return Array.prototype.slice.call(e.querySelectorAll('[tabindex="0"], a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'))
                        }).flat(), (i = Array.prototype.filter.call(i, function (e) {
                            return "-1" !== e.getAttribute("tabindex")
                        })) && (u.classList.add("user-is-tabbing"), a = i[0], r = i[i.length - 1], "number" == typeof e ? i[e].focus() : (T[T.length - 1].focus(), T.pop()), ie.removeEventListener(o), ie.addEventListener(o, function (e) {
                            "Tab" !== e.key && 9 !== e.keyCode || (e.shiftKey ? ie.activeElement === a && (e.preventDefault(), r.focus()) : ie.activeElement === r && (e.preventDefault(), a.focus()))
                        })))
                    },
                    S = function () {
                        ie.removeEventListener(o), h && setTimeout(function () {
                            h.focus()
                        }, p)
                    },
                    M = function () {
                        d.style.transition = "none", u.style.display = "block";
                        var e = ee.formatSizeVal(A = d.offsetWidth),
                            t = ee.formatSizeVal(x = d.offsetHeight);
                        s.add(".hc-offcanvas-nav." + g + ".nav-position-left .nav-container", "transform: translate3d(-" + e + ", 0, 0)"), s.add(".hc-offcanvas-nav." + g + ".nav-position-right .nav-container", "transform: translate3d(" + e + ", 0, 0)"), s.add(".hc-offcanvas-nav." + g + ".nav-position-top .nav-container", "transform: translate3d(0, -" + t + ", 0)"), s.add(".hc-offcanvas-nav." + g + ".nav-position-bottom .nav-container", "transform: translate3d(0, " + t + ", 0)"), s.insert(), u.style.display = "", d.style.transition = "", n = re.getComputedStyle(d).transitionProperty, p = ee.toMs(re.getComputedStyle(d).transitionDuration), a = re.getComputedStyle(d).transitionTimingFunction, te.pushContent && m && n && s.add(ee.getElementCssTag(m), "transition: " + n + " " + p + "ms " + a), s.insert()
                    },
                    j = function (e) {
                        var t = !!f && re.getComputedStyle(f[0]).display,
                            n = !!te.disableAt && "max-width: " + (te.disableAt - 1) + "px",
                            a = ee.formatSizeVal(te.width),
                            r = ee.formatSizeVal(te.height),
                            i = ee.formatSizeVal(te.levelSpacing);
                        !ee.isNumeric(a) && -1 === a.indexOf("px") || (A = parseInt(a)), !ee.isNumeric(r) && -1 === r.indexOf("px") || (x = parseInt(r)), ne(["disableAt", "position"]) && s.reset(), s.add(".hc-offcanvas-nav." + g, "display: block", n), s.add(".hc-nav-original." + g, "display: none", n), t && s.add(".hc-nav-trigger." + g, "display: " + (t && "none" !== t ? t : "block"), n), -1 !== ["left", "right"].indexOf(te.position) ? s.add(".hc-offcanvas-nav." + g + " .nav-container", "width: " + a) : s.add(".hc-offcanvas-nav." + g + " .nav-container", "height: " + r), s.add(".hc-offcanvas-nav." + g + ".nav-position-left .nav-container", "transform: translate3d(-" + a + ", 0, 0);"), s.add(".hc-offcanvas-nav." + g + ".nav-position-right .nav-container", "transform: translate3d(" + a + ", 0, 0);"), s.add(".hc-offcanvas-nav." + g + ".nav-position-top .nav-container", "transform: translate3d(0, -" + r + ", 0);"), s.add(".hc-offcanvas-nav." + g + ".nav-position-bottom .nav-container", "transform: translate3d(0, " + r + ", 0);"), s.add(".hc-offcanvas-nav." + g + ".nav-levels-overlap.nav-position-left li.level-open > .nav-wrapper", "transform: translate3d(-" + i + ", 0, 0)", n), s.add(".hc-offcanvas-nav." + g + ".nav-levels-overlap.nav-position-right li.level-open > .nav-wrapper", "transform: translate3d(" + i + ", 0, 0)", n), s.add(".hc-offcanvas-nav." + g + ".nav-levels-overlap.nav-position-top li.level-open > .nav-wrapper", "transform: translate3d(0, -" + i + ", 0)", n), s.add(".hc-offcanvas-nav." + g + ".nav-levels-overlap.nav-position-bottom li.level-open > .nav-wrapper", "transform: translate3d(0, " + i + ", 0)", n), s.insert(), e && !ne("pushContent") || (m = te.pushContent ? ee.getElements(te.pushContent)[0] : null), d.style.transition = "none";
                        n = u.classList.contains(le), n = ["hc-offcanvas-nav", te.navClass || "", g, "nav-levels-" + (te.levelOpen || "none"), "nav-position-" + te.position, te.disableBody ? "disable-body" : "", ee.isIos ? "is-ios" : "", ee.isTouchDevice ? "touch-device" : "", n ? le : "", te.rtl ? "rtl" : "", !0 !== te.insertClose || te.labelClose ? "" : "nav-close-button-empty"].join(" ").trim().replace(/  +/g, " ");
                        u.removeEventListener("click"), u.className = n, u.setAttribute("aria-hidden", !0), ie.documentElement.style.setProperty("--nav-level-spacing", te.levelSpacing + "px"), te.disableBody && u.addEventListener("click", $), e ? M() : setTimeout(M, 0)
                    },
                    P = function () {
                        t = function l(e, t) {
                            var n = [];
                            Array.prototype.forEach.call(e, function (e) {
                                var o;
                                ("UL" === e.tagName || e instanceof HTMLHeadingElement) && (o = {
                                    tagName: e.tagName,
                                    id: t,
                                    htmlClass: e.getAttribute("class") || null,
                                    items: []
                                }, e instanceof HTMLHeadingElement ? o.content = ee.clone(e, !1, !0) : (null !== e.getAttribute("data-nav-active") && (E = t, e.removeAttribute("data-nav-active")), Array.prototype.forEach.call(e.children, function (e) {
                                    var t = null !== e.getAttribute("data-nav-custom-content"),
                                        n = t ? e.children : Array.prototype.filter.call(e.children, function (e) {
                                            return "UL" !== e.tagName && !e.querySelector("ul")
                                        }).concat(e.children.length ? [] : [e.firstChild]),
                                        a = t ? [] : Array.prototype.slice.call(e.querySelectorAll("ul")),
                                        r = a.length ? [].concat(Array.prototype.filter.call(a[0].parentNode.children, function (e) {
                                            return "UL" === e.tagName || e instanceof HTMLHeadingElement
                                        })) : [],
                                        a = null;
                                    if (!n.length) {
                                        for (var i = "", s = 0; s < e.childNodes.length; s++) e.childNodes[s].nodeType === Node.TEXT_NODE && (i += e.childNodes[s].textContent.trim());
                                        n = [ie.createTextNode(i)]
                                    }
                                    r.length && (ee.data(e, "hc-uniqid") ? a = ee.data(e, "hc-uniqid") : (a = Math.random().toString(36).substr(2), ee.data(e, "hc-uniqid", a))), null !== e.getAttribute("data-nav-active") && (E = a, e.removeAttribute("data-nav-active")), o.items.push({
                                        id: a,
                                        htmlClass: e.getAttribute("class") || "",
                                        content: n,
                                        custom: t,
                                        subnav: r.length ? l(r, a) : [],
                                        highlight: null !== e.getAttribute("data-nav-highlight")
                                    })
                                })), n.push(o))
                            });
                            return n
                        }("UL" === e.tagName ? [e] : Array.prototype.filter.call(e.children, function (e) {
                            return "UL" === e.tagName || e instanceof HTMLHeadingElement
                        }), null)
                    },
                    _ = function (e) {
                        if (e) {
                            for (; d.firstChild;) d.removeChild(d.firstChild);
                            O = {}
                        }! function p(n, e, f, h, t, a) {
                            var m = ee.createElement("div", {
                                class: "nav-wrapper nav-wrapper-" + f,
                                "data-level": f,
                                "data-index": t || 0
                            });
                            var r = ee.createElement("div", {
                                class: "nav-content"
                            });
                            m.addEventListener("click", ee.stopPropagation);
                            m.appendChild(r);
                            e.appendChild(m);
                            h && (0 === f || 0 < f && "overlap" === te.levelOpen) && (e = "string" == typeof h ? h : ee.clone(re.jQuery && h instanceof re.jQuery && h.length ? h[0] : h, !0, !0), r.insertBefore(ee.createElement("h2", {
                                id: 0 === f ? g + "-nav-title" : null,
                                class: 0 === f ? "nav-title" : "level-title"
                            }, e), r.firstChild), 0 === f && "string" == typeof h && u.setAttribute("aria-labelledby", g + "-nav-title"));
                            var i = -1;
                            n.forEach(function (e, t) {
                                var d;
                                "UL" === e.tagName ? (i++, d = ee.createElement("ul", {
                                    id: e.id ? 1 < n.length ? "menu-" + e.id + "-" + i : "menu-" + e.id : null,
                                    role: "menu",
                                    "aria-level": f + 1
                                }), r.appendChild(d), te.keepClasses && e.htmlClass && d.classList.add.apply(d.classList, e.htmlClass.split(" ")), e.items.forEach(function (t, e) {
                                    var n = t.content;
                                    if (t.custom) {
                                        var a = ee.createElement("li", {
                                            class: "nav-item nav-item-custom"
                                        }, ee.createElement("div", {
                                            class: "nav-custom-content"
                                        }, Array.prototype.map.call(n, function (e) {
                                            return ee.clone(e, !0, !0)
                                        })));
                                        return te.keepClasses && t.htmlClass && a.classList.add.apply(a.classList, t.htmlClass.split(" ")), void d.appendChild(a)
                                    }
                                    var r, i = Array.prototype.filter.call(n, function (e) {
                                        return "A" === e.tagName || e.nodeType !== Node.TEXT_NODE && e.querySelector("a")
                                    })[0];
                                    i ? (r = ee.clone(i, !1, !0)).classList.add("nav-item-link") : r = ee.createElement(t.subnav.length ? "a" : "span", {
                                        class: "nav-item-link"
                                    }, Array.prototype.map.call(n, function (e) {
                                        return ee.clone(e, !0, !0)
                                    })), "A" === r.tagName && (r.setAttribute("tabindex", "0"), r.setAttribute("role", "menuitem"), r.getAttribute("href") || r.setAttribute("href", "#")), i && r.addEventListener("click", function (e) {
                                        e.stopPropagation(), ee.hasListener(i, "click") && i.click()
                                    }), "#" === r.getAttribute("href") && r.addEventListener("click", ee.preventDefault), te.closeOnClick && (W() ? "A" !== r.tagName || "false" === r.dataset.navClose || null !== r.getAttribute("disabled") && "false" !== r.getAttribute("disabled") || t.subnav.length && (!r.getAttribute("href") || "#" === r.getAttribute("href").charAt(0)) || r.addEventListener("click", $) : "A" !== r.tagName || "false" === r.dataset.navClose || null !== r.getAttribute("disabled") && "false" !== r.getAttribute("disabled") || r.addEventListener("click", $));
                                    var s, o, l, c, v, u = ee.createElement("li", {
                                        class: "nav-item"
                                    });
                                    u.appendChild(r), d.appendChild(u), te.keepClasses && t.htmlClass && u.classList.add.apply(u.classList, t.htmlClass.split(" ")), t.highlight && u.classList.add("nav-highlight"), ee.wrap(r, ee.createElement("div", {
                                        class: "nav-item-wrapper"
                                    })), t.subnav.length && (s = f + 1, o = t.id, l = "", O[s] || (O[s] = 0), u.classList.add("nav-parent"), W() ? (c = O[s], (v = ee.createElement("input", {
                                        type: "checkbox",
                                        id: g + "-" + s + "-" + c,
                                        class: "hc-chk",
                                        tabindex: -1,
                                        "data-level": s,
                                        "data-index": c,
                                        value: o
                                    })).addEventListener("click", ee.stopPropagation), v.addEventListener("change", Q), u.insertBefore(v, u.firstChild), a = function (e) {
                                        e.addEventListener("click", function (e) {
                                            e.stopPropagation(), v.setAttribute("checked", "true" !== v.getAttribute("checked")), "createEvent" in ie && ((e = ie.createEvent("HTMLEvents")).initEvent("change", !1, !0), v.dispatchEvent(e))
                                        }), e.addEventListener("keydown", function (e) {
                                            "Enter" !== e.key && 13 !== e.keyCode || (N = !0, T.push(this))
                                        }), e.setAttribute("aria-controls", 1 < t.subnav.length ? t.subnav.filter(function (e) {
                                            return "UL" === e.tagName
                                        }).map(function (e, t) {
                                            return "menu-" + e.id + "-" + t
                                        }).join(" ") : "menu-" + o), e.setAttribute("aria-haspopup", "overlap" === te.levelOpen), e.setAttribute("aria-expanded", !1)
                                    }, -1 !== k.indexOf(o) && (m.classList.add("sub-level-open"), m.addEventListener("click", function () {
                                        return Z(s, c)
                                    }), u.classList.add("level-open"), v.setAttribute("checked", !0)), l = !0 === te.levelTitles ? n[0].textContent.trim() : "", r.getAttribute("href") && "#" !== r.getAttribute("href") ? ((n = ee.createElement("a", {
                                        href: "#",
                                        class: "nav-next",
                                        "aria-label": (te.ariaLabels || {}).submenu + ": " + l,
                                        role: "menuitem",
                                        tabindex: 0
                                    }, ee.createElement("span"))).addEventListener("click", ee.preventClick()), a(n), te.rtl ? r.parentNode.appendChild(n) : r.parentNode.insertBefore(n, r.nextSibling)) : (r.appendChild(ee.createElement("span", {
                                        class: "nav-next"
                                    }, ee.createElement("span"))), a(r))) : r.setAttribute("aria-expanded", !0), O[s]++, p(t.subnav, u, s, l, O[s] - 1, "string" == typeof h ? h : ""))
                                })) : r.appendChild(e.content)
                            });
                            f && void 0 !== t && !1 !== te.insertBack && "overlap" === te.levelOpen && (s = ee.children(r, "ul"), a = te.levelTitleAsBack && a || te.labelBack || "", l = ee.createElement("a", {
                                href: "#",
                                class: "nav-back-button",
                                role: "menuitem",
                                tabindex: 0
                            }, [a, ee.createElement("span")]), !0 === te.insertBack || 0 === te.insertBack ? (a = ee.createElement("div", {
                                class: "nav-back"
                            }, l), r.insertBefore(a, ee.children(r, ":not(.level-title)")[0])) : (o = ee.createElement("li", {
                                class: "nav-item nav-back"
                            }, l), ee.insertAt(o, !0 === te.insertBack ? 0 : te.insertBack, s)), o = function () {
                                return Z(f, t)
                            }, ee.wrap(l, ee.createElement("div", {
                                class: "nav-item-wrapper"
                            })), l.addEventListener("click", ee.preventClick(o)), l.addEventListener("keydown", function (e) {
                                "Enter" !== e.key && 13 !== e.keyCode || (N = !0)
                            })); {
                                var s, o, l;
                                0 === f && !1 !== te.insertClose && ((s = ee.createElement("a", {
                                    href: "#",
                                    class: "nav-close-button" + (te.labelClose ? " has-label" : ""),
                                    role: "menuitem",
                                    tabindex: 0,
                                    "aria-label": te.labelClose ? "" : (te.ariaLabels || {}).close
                                }, [te.labelClose || "", ee.createElement("span")])).addEventListener("click", ee.preventClick($)), s.addEventListener("keydown", function (e) {
                                    "Enter" !== e.key && 13 !== e.keyCode || S()
                                }), h && !0 === te.insertClose ? r.insertBefore(ee.createElement("div", {
                                    class: "nav-close"
                                }, s), r.children[1]) : !0 === te.insertClose ? r.insertBefore(ee.createElement("div", {
                                    class: "nav-close"
                                }, s), r.firstChild) : (o = ee.children(r, "ul"), l = ee.createElement("li", {
                                    class: "nav-item nav-close"
                                }, s), ee.wrap(s, ee.createElement("div", {
                                    class: "nav-item-wrapper"
                                })), ee.insertAt(l, te.insertClose, o)))
                            }
                        }(t, d, 0, te.navTitle)
                    },
                    B = function (t) {
                        return function (e) {
                            "left" !== te.position && "right" !== te.position || (r = e.touches[0].clientX, i = e.touches[0].clientY, "doc" === t ? c || (ie.addEventListener("touchmove", D, ee.supportsPassive), ie.addEventListener("touchend", U, ee.supportsPassive)) : (c = !0, d.addEventListener("touchmove", z, ee.supportsPassive), d.addEventListener("touchend", I, ee.supportsPassive)))
                        }
                    },
                    q = function (e, t) {
                        re.addEventListener("touchmove", ee.preventDefault, ee.supportsPassive), u.style.visibility = "visible", d.style[ee.browserPrefix("transition")] = "none", ee.setTransform(d, e, te.position), m && (m.style[ee.browserPrefix("transition")] = "none", ee.setTransform(m, t, te.position))
                    },
                    H = function (e, t, n, a) {
                        void 0 === t && (t = !0), void 0 === n && (n = !1), void 0 === a && (a = !1), re.removeEventListener("touchmove", ee.preventDefault, ee.supportsPassive), d.style[ee.browserPrefix("transition")] = "", ee.setTransform(d, n, te.position), m && (m.style[ee.browserPrefix("transition")] = "", ee.setTransform(m, a, te.position)), "open" === e ? K() : ($(), t ? setTimeout(function () {
                            u.style.visibility = ""
                        }, p) : u.style.visibility = "")
                    },
                    D = function (e) {
                        var t = 0 - (r - e.touches[0].clientX),
                            e = "overlap" === te.levelOpen ? Y() * te.levelSpacing : 0,
                            e = A + e,
                            t = "left" === te.position ? Math.min(Math.max(t, 0), e) : Math.abs(Math.min(Math.max(t, -e), 0));
                        ("left" === te.position && r < 50 || "right" === te.position && r > ie.body.clientWidth - 50) && (l = !0, q(0 - (A - t), Math.abs(t)))
                    },
                    U = function e(t) {
                        var n;
                        ie.removeEventListener("touchmove", D), ie.removeEventListener("touchend", e), l && (n = t.changedTouches[t.changedTouches.length - 1], t = 0 - (r - n.clientX), n = "overlap" === te.levelOpen ? Y() * te.levelSpacing : 0, n = A + n, (t = "left" === te.position ? Math.min(Math.max(t, 0), n) : Math.abs(Math.min(Math.max(t, -n), 0))) ? H(70 < t ? "open" : "close") : H("close", !1), i = r = null, l = !1)
                    },
                    z = function (e) {
                        var t = 0 - (r - e.touches[0].clientX),
                            n = 0 - (i - e.touches[0].clientY);
                        Math.abs(t) < Math.abs(n) || (e = "overlap" === te.levelOpen ? Y() * te.levelSpacing : 0, n = A + e, t = "left" === te.position ? Math.min(Math.max(t, -n), 0) : Math.min(Math.max(t, 0), n), ("left" === te.position && t < 0 || "right" === te.position && 0 < t) && (l = !0, q(-Math.abs(t) + e, n - Math.abs(t))))
                    },
                    I = function e(t) {
                        var n, a;
                        d.removeEventListener("touchmove", z), d.removeEventListener("touchend", e), c = !1, l && (n = t.changedTouches[t.changedTouches.length - 1], a = 0 - (r - n.clientX), t = "overlap" === te.levelOpen ? Y() * te.levelSpacing : 0, n = A + t, (a = "left" === te.position ? Math.abs(Math.min(Math.max(a, -n), 0)) : Math.abs(Math.min(Math.max(a, 0), n))) === n ? H("close", !1) : 50 < a ? H("close") : H("open", !0, t, n), i = r = null, l = !1)
                    };
                j(), P(), _(), !0 === te.removeOriginalNav ? e.parentNode.removeChild(e) : e.classList.add("hc-nav-original", g), "prepend" === te.bodyInsert ? ie.body.insertBefore(u, ie.body.firstChild) : "append" === te.bodyInsert && ie.body.appendChild(u), !0 === te.expanded && (y = !0, K()), te.swipeGestures && (d.addEventListener("touchstart", B("nav"), ee.supportsPassive), ie.addEventListener("touchstart", B("doc"), ee.supportsPassive)), te.closeOnEsc && ie.addEventListener("keydown", function (e) {
                    !b || "Escape" !== e.key && 27 !== e.keyCode || (0 === (e = Y()) ? ($(), S()) : (Z(e, G()), w(null, e - 1)))
                });
                B = ee.debounce(M, 500);
                re.addEventListener("resize", B, ee.supportsPassive);
                var X = function (e, t, n) {
                    var a, r, i = ie.querySelector("#" + g + "-" + e + "-" + t);
                    i && (a = i.value, t = (r = i.parentNode).closest(".nav-wrapper"), i.setAttribute("checked", !1), t.classList.remove("sub-level-open"), r.classList.remove("level-open"), r.querySelectorAll("[aria-controls]")[0].setAttribute("aria-expanded", !1), -1 !== k.indexOf(a) && k.splice(k.indexOf(a), 1), n && "overlap" === te.levelOpen && (t.removeEventListener("click"), t.addEventListener("click", ee.stopPropagation), ee.setTransform(d, (e - 1) * te.levelSpacing, te.position), m && (t = "x" === ee.getAxis(te.position) ? A : x, ee.setTransform(m, t + (e - 1) * te.levelSpacing, te.position))))
                };
                return u.on = function (e, t) {
                    u.addEventListener(e, t)
                }, u.off = function (e, t) {
                    u.removeEventListener(e, t)
                }, u.getSettings = function () {
                    return Object.assign({}, te)
                }, u.isOpen = F, u.open = K, u.close = $, u.toggle = J(null), u.update = function (e, t) {
                    if (ae = [], "object" == typeof e) {
                        for (var n in e) te[n] !== e[n] && ae.push(n);
                        te = Object.assign({}, te, e)
                    }!0 === e || !0 === t ? te.removeOriginalNav ? console.warn("%c! HC Offcanvas Nav:%c Can't update because original navigation has been removed. Disable `removeOriginalNav` option.", "color: #fa253b", "color: default") : (j(!0), P(), _(!0)) : (j(!0), _(!0))
                }, u
            }

            function Q() {
                var e = Number(this.dataset.level),
                    t = Number(this.dataset.index);
                ("true" === this.getAttribute("checked") ? R : Z)(e, t)
            }

            function V(e) {
                e.classList.remove(v), e.setAttribute("aria-expanded", !1)
            }

            function W() {
                return !1 !== te.levelOpen && "none" !== te.levelOpen
            }

            function F() {
                return b
            }

            function Y() {
                return k.length ? Number(Array.prototype.filter.call(d.querySelectorAll(".hc-chk"), function (e) {
                    return e.value == k[k.length - 1]
                })[0].dataset.level) : 0
            }

            function G() {
                return k.length ? Number(Array.prototype.filter.call(d.querySelectorAll(".hc-chk"), function (e) {
                    return e.value == k[k.length - 1]
                })[0].dataset.index) : 0
            }

            function K(e, t) {
                var n, a;
                if ((!b || void 0 !== t) && (b || (b = !0, u.style.visibility = "visible", u.setAttribute("aria-hidden", !1), u.classList.add(le), f && (f.forEach(V), h && (h.classList.add(v), h.setAttribute("aria-expanded", !0))), "expand" === te.levelOpen && C && clearTimeout(C), te.disableBody && (L = re.pageYOffset || se.scrollTop || ie.documentElement.scrollTop || ie.body.scrollTop, ie.documentElement.scrollHeight > ie.documentElement.clientHeight && se.classList.add("hc-nav-yscroll"), ie.body.classList.add("hc-nav-open"), L && (ie.body.style.top = -L + "px")), m && (n = "x" === ee.getAxis(te.position) ? A : x, ee.setTransform(m, n, te.position)), y ? y = !1 : (u._eventListeners.toggle && u._eventListeners.toggle.forEach(function (e) {
                        e.fn(ee.customEventObject("toggle", u, u, {
                            action: "open"
                        }), Object.assign({}, te))
                    }), setTimeout(function () {
                        u._eventListeners.open && u._eventListeners.open.forEach(function (e) {
                            e.fn(ee.customEventObject("open", u, u), Object.assign({}, te))
                        })
                    }, p))), W())) {
                    if ("number" != typeof e && !ee.isNumeric(e) || "number" != typeof t && !ee.isNumeric(t)) E ? (a = Array.prototype.filter.call(d.querySelectorAll(".hc-chk"), function (e) {
                        return e.value == E
                    })[0], !te.closeActiveLevel && te.closeOpenLevels || (E = null)) : !1 === te.closeOpenLevels && (a = (a = Array.prototype.filter.call(d.querySelectorAll(".hc-chk"), function (e) {
                        return "true" === e.getAttribute("checked")
                    }))[a.length - 1]);
                    else if (!(a = ie.querySelector("#" + g + "-" + e + "-" + t))) return void console.warn("HC Offcanvas Nav: level " + e + " doesn't have index " + t);
                    if (a) {
                        var r = [];
                        if (e = Number(a.dataset.level), t = Number(a.dataset.index), 1 < e) {
                            for (var i = []; a && a !== ie; a = a.parentNode) a.matches(".nav-wrapper") && i.push(a);
                            for (var s = 0; s < i.length; s++) {
                                var o = i[s],
                                    l = Number(o.dataset.level);
                                0 < l && r.push({
                                    level: l,
                                    index: Number(o.dataset.index)
                                })
                            }
                            r = r.reverse()
                        }
                        r.push({
                            level: e,
                            index: t
                        });
                        for (var c = 0; c < r.length; c++) R(r[c].level, r[c].index, !1)
                    }
                }
            }

            function $() {
                var e;
                b && (b = !1, m && ee.setTransform(m, !1), u.classList.remove(le), u.classList.remove("user-is-tabbing"), u.setAttribute("aria-hidden", !0), d.removeAttribute("style"), f && f.forEach(V), "expand" === te.levelOpen && -1 !== ["top", "bottom"].indexOf(te.position) ? Z(0) : W() && (C = setTimeout(function () {
                    Z(0)
                }, "expand" === te.levelOpen ? p : 0)), te.disableBody && (ie.body.classList.remove("hc-nav-open"), se.classList.remove("hc-nav-yscroll"), L && (ie.body.style.top = "", ie.body.scrollTop = L, se.scrollTop = L, "bottom" === te.position && (e = L, setTimeout(function () {
                    ie.body.scrollTop = e, se.scrollTop = e
                }, 0)), L = 0)), u._eventListeners.toggle && u._eventListeners.toggle.forEach(function (e) {
                    e.fn(ee.customEventObject("toggle", u, u, {
                        action: "close"
                    }), Object.assign({}, te))
                }), setTimeout(function () {
                    u.style.visibility = "", u._eventListeners.close && u._eventListeners.close.forEach(function (e) {
                        e.fn(ee.customEventObject("close", u, u), Object.assign({}, te))
                    }), u._eventListeners["close.once"] && u._eventListeners["close.once"].forEach(function (e) {
                        e.fn(ee.customEventObject("close.once", u, u), Object.assign({}, te))
                    }), u.removeEventListener("close.once")
                }, p))
            }

            function J(t) {
                return function (e) {
                    e && (e.preventDefault(), e.stopPropagation()), t && (h = t), (b ? $ : K)()
                }
            }

            function R(t, n, e) {
                void 0 === e && (e = !0);
                var a = ie.querySelector("#" + g + "-" + t + "-" + n),
                    r = a.value,
                    i = a.parentNode,
                    s = i.closest(".nav-wrapper"),
                    o = ee.children(i, ".nav-wrapper")[0];
                !1 === e && (o.style.transition = "none"), a.setAttribute("checked", !0), s.classList.add("sub-level-open"), i.classList.add("level-open"), i.querySelectorAll("[aria-controls]")[0].setAttribute("aria-expanded", !0), !1 === e && setTimeout(function () {
                    o.style.transition = ""
                }, p), -1 === k.indexOf(r) && k.push(r), "overlap" === te.levelOpen && (s.addEventListener("click", function () {
                    return Z(t, n)
                }), ee.setTransform(d, t * te.levelSpacing, te.position), m && (s = "x" === ee.getAxis(te.position) ? A : x, ee.setTransform(m, s + t * te.levelSpacing, te.position))), u._eventListeners["open.level"] && u._eventListeners["open.level"].forEach(function (e) {
                    e.fn(ee.customEventObject("open.level", u, o, {
                        currentLevel: t,
                        currentIndex: n
                    }), Object.assign({}, te))
                }), N && (w(0, t, n), N = !1)
            }

            function Z(t, e) {
                for (var n, a = t; a <= Object.keys(O).length; a++)
                    if (a === t && void 0 !== e) X(t, e, !0);
                    else if (0 !== t || te.closeOpenLevels)
                    for (var r = 0; r < O[a]; r++) X(a, r, a === t);
                else;
                0 < t && u._eventListeners["close.level"] && (n = ie.querySelector("#" + g + "-" + t + "-" + e).closest(".nav-wrapper"), u._eventListeners["close.level"].forEach(function (e) {
                    e.fn(ee.customEventObject("close.level", u, n, {
                        currentLevel: t - 1,
                        currentIndex: G()
                    }), Object.assign({}, te))
                })), N && (w(null, t - 1), N = !1)
            }
            console.error("%c! HC Offcanvas Nav:%c Navigation must contain <ul> element.", "color: #fa253b", "color: default")
        }
        te.ariaLabels = Object.assign({}, {
            open: "Open Menu",
            close: "Close Menu",
            submenu: "Submenu"
        }, t.ariaLabels);
        var ae = [];
        if (Array.isArray(e) || e instanceof NodeList) {
            for (var a = [], r = 0; r < e.length; r++) a.push(n(e[r]));
            return 1 < a.length ? a : a[0]
        }
        return n(e)
    }
    var n, a, ie = re.document,
        se = ie.getElementsByTagName("html")[0],
        oe = 0,
        le = "nav-open";
    return void 0 !== re.jQuery && (n = re.jQuery, a = "hcOffcanvasNav", n.fn.extend({
        hcOffcanvasNav: function (t) {
            return this.length ? this.each(function () {
                var e = n.data(this, a);
                e ? e.update(t) : (e = new i(this, t), n.data(this, a, e))
            }) : this
        }
    })), re.hcOffcanvasNav = re.hcOffcanvasNav || i, i
}),
function (n) {
    var e = n.hcOffcanvasNav,
        o = n.document;
    "function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
        value: function (e, t) {
            if (null == e) throw new TypeError("Cannot convert undefined or null to object");
            for (var n = Object(e), a = 1; a < arguments.length; a++) {
                var r = arguments[a];
                if (null != r)
                    for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (n[i] = r[i])
            }
            return n
        },
        writable: !0,
        configurable: !0
    }), Element.prototype.closest || (Element.prototype.closest = function (e) {
        var t = this;
        do {
            if (Element.prototype.matches.call(t, e)) return t
        } while (null !== (t = t.parentElement || t.parentNode) && 1 === t.nodeType);
        return null
    }), Array.prototype.flat || Object.defineProperty(Array.prototype, "flat", {
        configurable: !0,
        value: function n() {
            var a = isNaN(arguments[0]) ? 1 : Number(arguments[0]);
            return a ? Array.prototype.reduce.call(this, function (e, t) {
                return Array.isArray(t) ? e.push.apply(e, n.call(t, a - 1)) : e.push(t), e
            }, []) : Array.prototype.slice.call(this)
        },
        writable: !0
    }), Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector);
    var t = !1;
    try {
        var a = Object.defineProperty({}, "passive", {
            get: function () {
                t = {
                    passive: !1
                }
            }
        });
        n.addEventListener("testPassive", null, a), n.removeEventListener("testPassive", null, a)
    } catch (e) {}

    function r(e) {
        return !isNaN(parseFloat(e)) && isFinite(e)
    }

    function i(e) {
        return "auto" === e ? "100%" : r(e) && 0 !== e ? e + "px" : e
    }

    function s(e) {
        var t = ["Webkit", "Moz", "Ms", "O"],
            n = (o.body || o.documentElement).style,
            a = e.charAt(0).toUpperCase() + e.slice(1);
        if (void 0 !== n[e]) return e;
        for (var r = 0; r < t.length; r++)
            if (void 0 !== n[t[r] + a]) return t[r] + a;
        return !1
    }

    function l(e, t) {
        if (e instanceof Element) return t ? Array.prototype.filter.call(e.children, function (e) {
            return e.matches(t)
        }) : e.children;
        var n = [];
        return Array.prototype.forEach.call(e, function (e) {
            n = t ? n.concat(Array.prototype.filter.call(e.children, function (e) {
                return e.matches(t)
            })) : n.concat(Array.prototype.slice.call(e.children))
        }), n
    }
    var c = (/iPad|iPhone|iPod/.test(navigator.userAgent) || !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) && !n.MSStream,
        v = "ontouchstart" in n || navigator.maxTouchPoints || n.DocumentTouch && o instanceof DocumentTouch,
        u = function (o) {
            var l = Node.prototype[o + "EventListener"];
            return function (e, t, n) {
                if (this) {
                    var a = e.split(".")[0];
                    if (this._eventListeners = this._eventListeners || {}, "add" === o) {
                        this._eventListeners[e] = this._eventListeners[e] || [];
                        var r = {
                            fn: t
                        };
                        n && (r.options = n), this._eventListeners[e].push(r), l.call(this, a, t, n)
                    } else if ("function" == typeof t)
                        for (var i in l.call(this, a, t, n), this._eventListeners) this._eventListeners[i] = this._eventListeners[i].filter(function (e) {
                            return e.fn !== t
                        }), this._eventListeners[i].length || delete this._eventListeners[i];
                    else if (this._eventListeners[e]) {
                        for (var s = this._eventListeners[e].length; s--;) l.call(this, a, this._eventListeners[e][s].fn, this._eventListeners[e][s].options), this._eventListeners[e].splice(s, 1);
                        this._eventListeners[e].length || delete this._eventListeners[e]
                    }
                }
            }
        };
    Node.prototype.addEventListener = u("add"), Node.prototype.removeEventListener = u("remove");

    function d(e, t, n) {
        void 0 === t && (t = {});
        var a, r = o.createElement(e);
        for (a in t) "class" !== a ? !t[a] && 0 !== t[a] || r.setAttribute(a, t[a]) : r.className = t[a];
        if (n) {
            Array.isArray(n) || (n = [n]);
            for (var i = 0; i < n.length; i++)
                if ("object" == typeof n[i] && n[i].length && !n[i].nodeType)
                    for (var s = 0; s < n[i].length; s++) r.appendChild(n[i][s]);
                else r.appendChild("string" == typeof n[i] ? o.createTextNode(n[i]) : n[i])
        }
        return r
    }

    function p(e) {
        return -1 !== ["left", "right"].indexOf(e) ? "x" : "y"
    }
    a = function e(t) {
        return "string" == typeof t ? t : t.getAttribute("id") ? "#" + t.getAttribute("id") : t.getAttribute("class") ? t.tagName.toLowerCase() + "." + t.getAttribute("class").replace(/\s+/g, ".") : e(t.parentNode) + " > " + t.tagName.toLowerCase()
    }, u = function () {
        s("transform");
        return function (e, t, n) {
            !1 === t || "" === t ? e.style.transform = "" : "x" === p(n) ? e.style.transform = "translate3d(" + i("left" === n ? t : -t) + ",0,0)" : e.style.transform = "translate3d(0," + i("top" === n ? t : -t) + ",0)"
        }
    }();
    e.Helpers = {
        supportsPassive: t,
        isIos: c,
        isTouchDevice: v,
        isNumeric: r,
        formatSizeVal: i,
        toMs: function (e) {
            return parseFloat(e) * (/\ds$/.test(e) ? 1e3 : 1)
        },
        stopPropagation: function (e) {
            return e.stopPropagation()
        },
        preventDefault: function (e) {
            return e.preventDefault()
        },
        preventClick: function (t) {
            return function (e) {
                e.preventDefault(), e.stopPropagation(), "function" == typeof t && t()
            }
        },
        browserPrefix: s,
        children: l,
        wrap: function (e, t) {
            e.parentNode.insertBefore(t, e), t.appendChild(e)
        },
        data: function (e, t, n) {
            if (e.hcOffcanvasNav = e.hcOffcanvasNav || {}, void 0 === n) return e.hcOffcanvasNav[t];
            e.hcOffcanvasNav[t] = n
        },
        clone: function (e, t, n) {
            var a = e.cloneNode(n || !1),
                r = e instanceof Element ? [e].concat(Array.prototype.slice.call(e.getElementsByTagName("*"))) : [],
                e = a instanceof Element ? [a].concat(Array.prototype.slice.call(a.getElementsByTagName("*"))) : [];
            return t || (r.shift(), e.shift()), n && function (e, t) {
                for (var n = 0; n < e.length; n++)
                    if (e[n]._eventListeners)
                        for (var a in e[n]._eventListeners)
                            for (var r = 0; r < e[n]._eventListeners[a].length; r++) t[r].addEventListener(a, e[n]._eventListeners[a][r].fn, e[n]._eventListeners[a][r].options)
            }(r, e), a
        },
        customEventObject: function (e, n, a, r) {
            return new function (e) {
                for (var t in this.bubbles = !1, this.cancelable = !1, this.composed = !1, this.currentTarget = a, this.data = r ? {} : null, this.defaultPrevented = !1, this.eventPhase = 0, this.isTrusted = !1, this.target = n, this.timeStamp = Date.now(), this.type = e, r) this.data[t] = r[t]
            }(e)
        },
        hasListener: function (e, t) {
            return (t ? (e._eventListeners || {})[t] : e._eventListeners) || !1
        },
        debounce: function (a, r, i) {
            var s;
            return function () {
                var e = this,
                    t = arguments,
                    n = i && !s;
                clearTimeout(s), s = setTimeout(function () {
                    s = null, i || a.apply(e, t)
                }, r), n && a.apply(e, t)
            }
        },
        createElement: d,
        getElements: function (e) {
            var t = null;
            return "string" == typeof e ? t = o.querySelectorAll(e) : n.jQuery && e instanceof n.jQuery && e.length ? t = e.toArray() : e instanceof Element && (t = [e]), t
        },
        getElementCssTag: a,
        printStyle: function (e) {
            var r = d("style", {
                    id: e
                }),
                i = {},
                s = {};
            o.head.appendChild(r);

            function a(e) {
                return ";" !== e.substr(-1) && (e += ";" !== e.substr(-1) ? ";" : ""), e
            }
            return {
                reset: function () {
                    i = {}, s = {}
                },
                add: function (e, t, n) {
                    e = e.trim(), t = t.trim(), n ? (n = n.trim(), s[n] = s[n] || {}, s[n][e] = a(t)) : i[e] = a(t)
                },
                remove: function (e, t) {
                    e = e.trim(), t ? (t = t.trim(), void 0 !== s[t][e] && delete s[t][e]) : void 0 !== i[e] && delete i[e]
                },
                insert: function () {
                    var e, t, n = "";
                    for (e in s) {
                        for (var a in n += "@media screen and (" + e + ") {\n", s[e]) n += "  " + a + " { " + s[e][a] + " }\n";
                        n += "}\n"
                    }
                    for (t in i) n += t + " { " + i[t] + " }\n";
                    r.innerHTML = n
                }
            }
        },
        insertAt: function (e, t, n) {
            var a = l(n),
                r = a.length,
                r = -1 < (t = "last" === (t = "first" === t ? 0 : t) ? r : t) ? Math.max(0, Math.min(t, r)) : Math.max(0, Math.min(r + t, r));
            0 === r ? n[0].insertBefore(e, n[0].firstChild) : a[r - 1].insertAdjacentElement("afterend", e)
        },
        getAxis: p,
        setTransform: u,
        deprecated: function (e, t, n) {
            console.warn("%cHC Off-canvas Nav:%c " + n + "%c '" + e + "'%c is now deprecated and will be removed in the future. Use%c '" + t + "'%c option instead. See details about plugin usage at https://github.com/somewebmedia/hc-offcanvas-nav.", "color: #fa253b", "color: default", "color: #5595c6", "color: default", "color: #5595c6", "color: default")
        }
    }
}(window);