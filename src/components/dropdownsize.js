import React, { useEffect } from 'react';

const Dropdownsize = () => {
  useEffect(() => {
    const backdrop = '.dropdown-backdrop';
    const toggleSelector = '[data-toggle="dropdown"]';

    function getParent(element) {
      var selector = element.getAttribute('data-target');

      if (!selector) {
        selector = element.getAttribute('href');
        selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
      }

      var parent = selector && document.querySelector(selector);

      return parent;
    }

    function clearMenus(e) {
      if (e && e.which === 3) return;

      var dropdowns = document.querySelectorAll('.dropdown');
      dropdowns.forEach(function(dropdown) {
        var isActive = dropdown.classList.contains('show');
        if (isActive) {
          dropdown.classList.remove('show');
          var event = new Event('hidden.bs.dropdown');
          dropdown.dispatchEvent(event);
        }
      });

      document.querySelectorAll(backdrop).forEach(function(backdrop) {
        backdrop.parentNode.removeChild(backdrop);
      });
    }

    function toggleDropdown(e) {
      var parent = getParent(e.currentTarget);
      var isActive = parent.classList.contains('show');

      clearMenus();

      if (!isActive) {
        var relatedTarget = { relatedTarget: e.currentTarget };
        var showEvent = new Event('show.bs.dropdown', relatedTarget);
        parent.dispatchEvent(showEvent);

        if (showEvent.defaultPrevented) return;

        parent.classList.add('show');
        var toggle = parent.querySelector(toggleSelector);
        if (toggle) {
          toggle.setAttribute('aria-expanded', 'true');
          toggle.focus();
        }

        parent.classList.add('open');

        var shownEvent = new Event('shown.bs.dropdown', relatedTarget);
        parent.dispatchEvent(shownEvent);
      }

      return false;
    }

    document.addEventListener('click', clearMenus);
    document.addEventListener('click', function(e) {
      if (e.target && e.target.matches('.dropdown form')) {
        e.stopPropagation();
      }
    });
    document.addEventListener('click', function(e) {
      if (e.target && e.target.matches(toggleSelector)) {
        toggleDropdown(e);
      }
    });
    document.addEventListener('keydown', function(e) {
      if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return;

      var toggle = document.querySelector(toggleSelector);
      var parent = getParent(toggle);
      var isActive = parent.classList.contains('show');

      if (!isActive && e.which !== 27 || (isActive && e.which === 27)) {
        if (e.which === 27) {
          parent.querySelector(toggleSelector).focus();
        }
        toggleDropdown(e);
      }

      var desc = ' li:not(.disabled):visible a';
      var items = parent.querySelectorAll('.dropdown-menu' + desc);
      if (!items.length) return;

      var index = Array.from(items).indexOf(e.target);
      if (e.which === 38 && index > 0) index--; // up
      if (e.which === 40 && index < items.length - 1) index++; // down
      if (!~index) index = 0;

      items[index].focus();
    });
  }, []);

  return null;
};

export default Dropdownsize;
