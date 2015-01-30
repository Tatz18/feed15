var loc = window.location.href,
    index = loc.indexOf("#");
if (index > 0) {
    window.location = loc.substring(0, index)
}
$.fn.exists = function() {
    return this.length > 0 ? this : false
};
$(document).ready(function() {
    $(".tooltips").tooltip();
    var e = new TimelineLite({
        paused: true
    });
    e.to($(".social-icons, #main-nav"), .2, {
        left: 0
    }).to($("#main"), .2, {
        left: 250,
        right: "-=250"
    }, "-=0.2");
    $("a.mobilemenu").on("click", function() {
        e.play()
    });
    $(".social-icons, #main-nav, #main").on("click", function() {
        e.reverse()
    });
    var t = {
        pageContainer: $("div#main"),
        pages: $("div.page"),
        menuItems: $("ul#navigation"),
        overlay: $("div#overlay"),
        topz: "500",
        init: function() {
            self = this;
            self.menuItems.on("click", "li:not(.external)", function(e) {
                e.preventDefault();
                var t = $(this),
                    n = $(t.children("a").attr("href")),
                    r = n.attr("data-pos"),
                    i = self.pageContainer.children(".currentpage");
                switch (r) {
                    case "home":
                        self.reset();
                        break;
                    case "p1":
                        self.forward(n, i);
                        break;
                    case "p3":
                        if (parseInt(n.attr("data-order")) === self.maxz()) {
                            self.backward(n, i)
                        } else {
                            self.forward(n, i)
                        }
                        break;
                    default:
                        return false
                }
            });
            self.overlay.on("click", function() {
                var e = self.pageContainer.children(".currentpage");
                var t = self.pageContainer.children("[data-order=" + self.maxz() + "]");
                self.backward(t, e)
            })
        },
        reset: function() {
            this.overlay.hide();
            var e = this.pages.not(".home");
            e.attr("data-pos", "p1").removeAttr("data-order");
            TweenLite.to(e, .4, {
                left: "100%",
                zIndex: 0,
                onComplete: function() {
                    e.removeClass("currentpage")
                }
            });
            this.hanndelMenu()
        },
        forward: function(e, t) {
            self.hanndelMenu(e);
            self.overlay.show();
            var n = self.maxz();
            e.addClass("currentpage");
            e.attr("data-pos", "p2").removeAttr("data-order");
            t.attr("data-pos", "p3").attr("data-order", n + 1);
            (new TimelineLite).set(e, {
                left: "100%",
                zIndex: self.topz
            }).set(t, {
                zIndex: n + 1
            }).to(e, .4, {
                left: "15%"
            }).to(t, .3, {
                left: 0,
                onComplete: function() {
                    t.removeClass("currentpage")
                }
            }, "-=0.2")
        },
        backward: function(e, t) {
            this.hanndelMenu(e);
            e.exists() || this.overlay.hide();
            e.addClass("currentpage").removeAttr("data-order").attr("data-pos", "p2");
            t.attr("data-pos", "p1");
            (new TimelineLite).set(e, {
                zIndex: self.topz - 1
            }).to(e, .4, {
                left: "15%"
            }).to(t, .5, {
                left: "100%",
                onComplete: function() {
                    t.removeClass("currentpage")
                }
            }, "-=0.3").set(t, {
                zIndex: 0
            })
        },
        maxz: function() {
            var e = this.pages.map(function() {
                return $(this).attr("data-order")
            }).get();
            maxz = e.length && Math.max.apply(Math, e);
            return maxz
        },
        hanndelMenu: function() {
            var e = arguments.length ? arguments[0].length ? arguments[0].index() : 0 : 0;
            this.menuItems.children().eq(e).addClass("currentmenu").siblings().removeClass("currentmenu")
        }
    };
    t.reset();
    t.init();
    $("ul.timeline").children().eq(0).find(".text").slideDown().addClass("open");
    $("ul.timeline").on("click", "li", function() {
        $this = $(this);
        $this.find(".text").slideDown();
        $this.addClass("open");
        $this.siblings("li.open").find(".text").slideUp();
        $this.siblings("li").removeClass("open")
    }).on("mouseenter", "li", function() {
        $this = $(this);
        var e = new TweenLite($(this).find(".subject"), .4, {
            "padding-left": 20,
            paused: true
        });
        $this.hasClass("open") || e.play()
    }).on("mouseleave", "li", function() {
        var e = new TweenLite($(this).find(".subject"), .2, {
            "padding-left": 0
        })
    });
    $("ul.ul-withdetails li").find(".row").on("click", function() {
        $(this).closest("li").find(".details").stop(true, true).animate({
            height: "toggle",
            opacity: "toggle"
        }, 300)
    }).on("mouseenter", function() {
        $this = $(this);
        var e = new TweenLite($(this).closest("li").find(".imageoverlay"), .4, {
            left: 0
        })
    }).on("mouseleave", function() {
        var e = new TweenLite($(this).closest("li").find(".imageoverlay"), .2, {
            left: "-102%"
        })
    });
    $("div#pub-grid").on("click", "div.pubmain", function() {
        var e = $(this),
            t = e.closest(".item");
        t.find("div.pubdetails").slideToggle(function() {
            e.children("i").toggleClass("icon-collapse-alt icon-expand-alt")
        }, function() {
            e.children("i").toggleClass("icon-expand-alt icon-collapse-alt")
        })
    });
    $("[name=cd-dropdown]").on("change", function() {
        var e = this.value;
        $("div#pub-grid").mixitup("filter", e)
    });
    $(".grid").on("mouseenter", "li", function() {
        new TweenLite($(this).find(".over"), .4, {
            bottom: 0,
            top: 0
        })
    }).on("mouseleave", "li", function() {
        new TweenLite($(this).find(".over"), .4, {
            bottom: "-100%",
            top: "100%"
        })
    })
});
$(window).load(function() {
    var e = $("#grid")
})
