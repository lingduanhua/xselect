;(function () {

    var XSelect = function (selector) {
        if (typeof selector === 'string') {
            var elem = document.querySelector(selector);
        } else {
            var elem = selector;
        }

        var options = getOptions(elem);

        this.elem = elem;

        this.main = makeElement(options);

        this.elem.before(this.main);

        this.elem.style.display = 'none';

        this.main.addEventListener('click', function () {
            var optionElems = this.querySelector('.xselect-options');
            if (optionElems.className.search('open') < 0) {
                optionElems.className = 'xselect-options open';
            } else {
                optionElems.className = 'xselect-options';
            }
        });

        var that = this;
        this.main.addEventListener('click', function (e) {
            if (e.target.tagName.toLowerCase() !== 'li') {
                return;
            }
            e.target.parentNode.className = 'xselect-options';
            that.elem.value = e.target.innerText;
            that.main.querySelector('.xselect-cur').children[0].innerText = e.target.innerText;
        });
        document.addEventListener('click', function (e) {
            for (var i = 0; i < e.path.length; i++) {
                if (e.path[i].className === 'xselect-elem') {
                    return;
                }
            }
            var elems = document.querySelectorAll('.xselect-options.open');
            for (var i = 0; i < elems.length; i++) {
                elems[i].className = 'xselect-options';
            }
        });

    };

    function getOptions(elem) {
        var optionElems = elem.querySelectorAll('option');
        var options = [];

        for (var i = 0; i < optionElems.length; i++) {
            options.push(optionElems[i].innerText);
        }
        return options;
    }

    function makeElement(options) {
        var main = document.createElement('div');
        main.className = 'xselect-elem';

        main.appendChild(makeCurLabel(options[0]));
        main.appendChild(makeDropdown(options));
        return main;
    }

    function makeCurLabel(defaultValue) {
        var curLabel = document.createElement('div');
        curLabel.className = 'xselect-cur';
        curLabel.innerHTML = '<span>' + defaultValue + '</span><span class="caret">';
        return curLabel;
    }
    function makeDropdown(options) {
        var makeDropdown = document.createElement('ul');
        makeDropdown.className = 'xselect-options';
        content = '';
        for (var i = 0; i < options.length; i++) {
            content += '<li>' + options[i] + '</li>';
        }

        makeDropdown.innerHTML = content;
        return makeDropdown;
    }

    window.XSelect = XSelect;

}());

