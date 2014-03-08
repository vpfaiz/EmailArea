function emailArea(tao, sep) {
    // Initialize globals
    var validEmails = [],
        invalidEmails = [],
        ta, pta, eac, tc, tac, cn = 'EmailArea';

    // Seperators
    sep = sep || [',', ';', '\r', '\n', ' '];

    // Add holder DIVs
    ta = $('<input type="text" id="' + tao.attr('id') + '_' + cn + '" />');
    tc = $('<div id="eaTags" />');
    eac = $('<div id="eaContainer" />');
    tao.after(eac);
    eac.append(tc).append(ta);

    // Attach after event handlers for keyup/press, paste
    ta.on('keypress', function(e) {
        // Look for comma, space, enter, semicolon as given in sep
        var chr = String.fromCharCode(e.which);
        if ($.inArray(chr, sep) >= 0) {
            process(ta.val());
        }
    });

    ta.on('paste', function() {
        var ctl = $(this);
        setTimeout(function() {
            process(ctl.val());
        }, 100);
    });

    // attach on focus for holder to ta
    eac.on('click', function() {
        ta.focus();
    });

    function process(str) {
        // Clean str, replace separators with comma, remove space
        $(sep).each(function() {
            str = str.replace(new RegExp(this, "g"), ',').replace(/,+/g, ',')
        });
        // Split to array on comma or seperator parameter
        // For each item in array see if valid email and add tag if yes
        str.split(',').forEach(function(str) {
            if (isValidEmail(str)) { // If valid, check if already added
                if ($.inArray(str, validEmails) < 0) { // If not add a tag
                    addTag(str);
                } else { // If yes, add new and remove old
                    removeTag(str);
                    addTag(str);
                }
            } else {  // Add to invalid emails array
                if ($.inArray(str, invalidEmails) < 0) {
                    invalidEmails.push(str);
                }
            }
        });
        // Set tao with good emails
        tao.val(validEmails.join(','));
        // Format the invalid emails to a string adding spaces
        // Set invalid emails as text for ta
        ta.val(invalidEmails.join(', '));
        invalidEmails = [];
    };

    // Resize ta
    function resizeTa() {
        ta.css('width', 50);
        var cw = eac.width();
        var nw, l = ta.offset().left - eac.offset().left;
        nw = cw - l - 20; // 20 if scroll bars appear
        nw = nw < 50 ? 50 : nw; // Set minimum width
        ta.css('width', nw);
        eac.animate({
            scrollTop: eac[0].scrollHeight
        }, 1);
    };

    // Add tag
    function addTag(email) {
        validEmails.push(email);
        var i = $.inArray(email, validEmails);
        if (validEmails.length === 1) tc.css('display', 'inline');
        var btn = $('<div>x</div>').attr('class', cn + 'Btn').click(close);
        var tag = $('<div id="tag' + i + '">').
                        text(email).attr('class', cn + 'Tag').
                        data('email', email).
                        append(btn);

        // On DoubleClick bring back the email as editable
        tag.dblclick(function() {
            var email = $(this).data('email');
            removeTag(email);
            ta.val(email);
        });

        tc.append(tag);
        resizeTa();
    };

    // Remove tag
    function removeTag(email) {
        var i = $.inArray(email, validEmails);
        validEmails.pop(email);
        $('div#tag' + i).remove();
        if (validEmails.length === 0) tc.css('display', 'none');
        resizeTa();
    };

    // Close tag
    function close() {
        var tag = $(this).parent();
        removeTag(tag.text().slice(0, -1), true);
    }

    // Styles
    var cssTa = {
        cssText : 'background: transparent !important',
        display : 'inline',
        outline : 0,
        border  : 0,
        resize  : 'none',
        '-webkit-box-shadow': 'none',
        'box-shadow': 'none'
    };

    // Set styles
    // Copy styles from tao to eac
    eac.attr('class', tao.attr('class'));
    eac.attr('style', tao.attr('style'));
    eac.css('background', tao.css('background'));
    eac.css('border', tao.css('border'));
    eac.css('width', tao.css('width'));
    eac.css('height', tao.css('height'));
    //eac.css('cssText', tao.css('cssText')); << This copies more than what we needs
    eac.addClass(cn + 'Container').css('overflow', 'auto');

    // Hide original tao
    tao.hide();
    // Set class for other items
    ta.css(cssTa);
    tc.css('display', 'none');

    // isValidEmail() - Courtesy: aSeptik [http://stackoverflow.com/a/2855946/82961]
    // Feel free to implement your own
    function isValidEmail(str) {
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(str);
    };
}