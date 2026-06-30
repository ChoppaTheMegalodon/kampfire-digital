/* Kampfire Digital — shared site behaviour (all pages).
   Mobile nav toggle + scroll lock, sticky-header shadow, scroll reveal,
   smooth back-to-top. Homepage-only terminal animation stays inline. */
(function () {
    'use strict';

    // ===== Sticky header shadow on scroll =====
    var header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function () {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }

    // ===== Mobile nav toggle + body scroll lock =====
    var hamburger = document.querySelector('.hamburger');
    var mobileNav = document.querySelector('.mobile-nav');
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function () {
            var open = mobileNav.classList.toggle('open');
            hamburger.classList.toggle('active', open);
            hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
            document.body.style.overflow = open ? 'hidden' : '';
        });
        mobileNav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileNav.classList.remove('open');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // ===== Scroll reveal =====
    var reveals = document.querySelectorAll('.reveal');
    if (reveals.length) {
        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
            reveals.forEach(function (el) { observer.observe(el); });
        } else {
            reveals.forEach(function (el) { el.classList.add('visible'); });
        }
    }

    // ===== Smooth back-to-top for bare-hash links =====
    document.querySelectorAll('a[href="#"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
})();
