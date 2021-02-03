/* 横スクロール禁止 */
var $body = $(document);
$body.bind('scroll', function() {
    // "Disable" the horizontal scroll.
    if ($body.scrollLeft() !== 0) {
        $body.scrollLeft(0);
    }
});

$(function() {
  setHeaderBtnFromHash();

  /* Animation */
  $('body').addClass('animation');
  $(".inview").on("inview", function (event, isInView) {
    if (isInView) {
      $(this).stop().addClass("is-show");
    }
  });

  /* ハッシュアンカー スムーズスクロール */
  $('a[href^="#"]').click(function() {
    var speed = 400;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    setHeaderBtn(`[name="${href.replace('#', '')}_header_btn"]`)
    $('body,html').animate({scrollTop:position}, speed, 'swing');
  });

  /* Setting slick.js */
  $(".about-company .section-content .container .gallery .slide").slick({
    accessibility: true,
    autoplay: true,
    autoplaySpeed: 1000,
    dots: true,
    fade: true,
  });

  $('.contact-form-input').keyup(function() {
    var name_first = $('.contact form input[name="name-first"]').val();
    var name_last = $('.contact form input[name="name-last"]').val();
    var name_kana_first = $('.contact form input[name="name-kana-first"]').val();
    var name_kana_last = $('.contact form input[name="name-kana-last"]').val();
    var email = $('.contact form input[name="email"]').val();
    var message = $('.contact form textarea[name="message"]').val();
    if (name_first&&name_last&&name_kana_first&&name_kana_last&&email) {
      $('.contact form input[type=submit]').removeAttr('disabled');
    } else {
      $('.contact form input[type=submit]').attr('disabled', true);
    }
  });

  $('.contact form input[type=submit]').click(function() {
    $('.contact form div.validation-errors-notice').css('display', 'none');
    $('.contact form div.submit-errors-notice').css('display', 'none');
    $('.contact form div.submit-success-notice').css('display', 'none');
    $('.contact form span.error-email-notice').text('');
    var email = $('.contact form input[name="email"]').val();
    var reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
    if (!reg.test(email)) {
      $('.contact form div.validation-errors-notice').css('display', 'block');
      $('.contact form span.error-email-notice').text('正しい形式のアドレスを入力してください');
      return;
    }
    $.ajax({
      type: "POST",
      url: "./sys/contact.php",
      data: {
        'name-last': $('input[name="name-last"]').val(),
        'name-first': $('input[name="name-first"]').val(),
        'name-kana-last': $('input[name="name-kana-first"]').val(),
        'name-kana-first': $('input[name="name-kana-last"]').val(),
        'email': $('input[name="email"]').val(),
        'message': $('textarea[name="message"]').val()
      },
      success : function(data, dataType) {
        $('.contact form div.submit-success-notice').css('display', 'block');
        $('.contact form input[type="text"]').val('');
        $('.contact form textarea').val('');
      },
      error : function() {
        $('.contact form div.submit-errors-notice').css('display', 'block');
      }
   });
  });
});

function setHeaderBtnFromHash() {
  var urlHash = location.hash;
  if(urlHash){
    setHeaderBtn(`[name="${urlHash.replace('#', '')}_header_btn"]`)
  }
}

function setHeaderBtn(s) {
  $('.header-list li.btn').removeClass('active');
  $(s).addClass('active');
}
