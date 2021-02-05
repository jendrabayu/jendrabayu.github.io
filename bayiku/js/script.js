/* hitung BBI */
$('#hasil').click(function () {
    let usia = $('#usia').val();
    let nama = $('#nama').val();
    let bb = 0;



    if (usia <= 24 && usia >= 0) {



        $('#fbbi').html('<p>Nama : ' + nama + ' <br> Usia : ' + usia + '</p> <p> Berat Ideal : ');
    } else {
        $('#fbbi').html('<h2>Inputan tidak sesuai :(</h2>');
    }
})

// modal BBI
$('#myBtn').click(function () {
    $('#modal').css("display", "block");
})

// modal TBI
$('#myBtn1').click(function () {
    $('#modal1').css("display", "block");
})

// modal KI
$('#myBtn2').click(function () {
    $('#modal2').css("display", "block");
})

//TUTUP MODAL
$('.close-modal').click(function () {
    $('.modalHT').css("display", "none");
})


//PENCARIAN OBAT
$.ajaxSetup({ cache: false });
$('#cariObat').keyup(function () {
    $('#hasilCari').html('');
    let inputUser = $('#cariObat').val();
    let exp = new RegExp(inputUser, "i");

    if (inputUser.length == 0) {
        $('#hasilCari').css("display", "none");
    } else {
        $('#hasilCari').css("display", "block");
    }

    $.getJSON('data-obat.json', function (data) {
        $.each(data, function (key, hasil) {

            if (hasil.nama.search(exp) != -1 || hasil.kategori.search(exp) != -1 || hasil.komposisi.search(exp) != - 1) {

                $('#hasilCari').append('<li><div class= "img-obat"><img src="' + hasil.image + '" alt=""></div><div class="info-obat"><h3>' + hasil.nama + '</h3><h4> Deskripsi :  <span>' + hasil.deskripsi + '</span> </h4><h4>Kategori : <span>' + hasil.kategori + '</span> </h4><h4>Komposisi : <span>' + hasil.komposisi + '</span> </h4><h4>Dosis : <span>' + hasil.dosis + '</span> </h4></div></li >');
            }
        });

        if (inputUser.length != 0 && $('#hasilCari li').length == 0) {
            $('#hasilCari').append('<p class="not-found">Not Found <i class="fa fa-frown-o" aria-hidden="true"></i> </p>');
        } else {
            $('.not-found').css("display", "none");
        }

    });
});


//LIHAT PASSWORD
$(".toggle-password").click(function () {
    $(this).toggleClass("fa-eye fa-eye-slash");
    let input = $($(this).attr("toggle"));
    let repass = $('#repass');
    if (input.attr("type") == "password") {
        input.attr("type", "text");
        repass.attr("type", "text")
    } else {
        input.attr("type", "password");
        repass.attr("type", "password")
    }
});


//OVERLAY PENCARIAN
$('.search-icon').click(function () {
    $('.overlay-s').css('display', 'block')
})

$('.close-s').click(function () {
    $('.overlay-s').css('display', 'none')
})

//MENU TOGGLE
$('.menu-toggle').click(function () {
    $('nav').toggleClass('active')
})

$('ul li').click(function () {
    $(this).siblings().removeClass('active')
    $(this).toggleClass('active')
})

//HALAMAN
$('.next').click(function () {
    $('.pagination').find('.page-number.active').next().
        addClass('active');
    $('.pagination').find('.page-number.active').prev().
        removeClass('active');
})

$('.prev').click(function () {
    $('.pagination').find('.page-number.active').prev().
        addClass('active');
    $('.pagination').find('.page-number.active').next().
        removeClass('active');
})


//hapus dan tambah border-bawah tema-menu
$(document).scroll(function () {
    let scroll = $(document).scrollTop();
    if (scroll >= 55) {
        $('.tema-border').css("border-bottom", "2px solid #fc4a1a");
        $('.menu-themes').css("margin-top", "62px");
    } else {
        $('.tema-border').css("border", "none");
        $('.menu-themes').css("margin-top", "60px");
    }
});


//SCROLL TOP
$('.page-scroll').on('click', function (e) {
    const tujuan = $(this).attr('href');
    let elemenTujuan = $(tujuan);
    $('html, body').animate({
        scrollTop: elemenTujuan.offset().top - 80
    }, 1111, 'easeInOutExpo')
    e.preventDefault();
});


//KOTAK SCROLL TOP
$(document).scroll(function () {
    let scroll = $(document).scrollTop();
    if (scroll >= 100) {
        $('.scrollTop').css("display", "block");
    } else {
        $('.scrollTop').css("display", "none")
    }
});

//slide dengan autoload + tombol control
let modulSlide = (function () {

    let pb = {

    };

    pb.el = $('#slider');

    pb.items = {
        panels: pb.el.find('.slider-wrapper > li'),
    }

    let SliderInterval;
    let slideSekarang = 0;
    let slideSelajutnya = 1;
    let jumlahSlide = pb.items.panels.length;

    pb.init = function (settings) {
        this.settings = settings || { duration: 8000 };
        let items = this.items,
            lengthPanels = items.panels.length,
            output = '';

        for (let i = 0; i < lengthPanels; i++) {
            if (i == 0) {
                output += '<li class="active"></li>';
            } else {
                output += '<li></li>';
            }
        }

        $('#control-buttons').html(output);

        activateSlider();

        $('#control-buttons').on('click', 'li', function (e) {
            let $this = $(this);
            if (!(slideSekarang === $this.index())) {
                changePanel($this.index());
            }
        });
    }

    let activateSlider = function () {
        SliderInterval = setInterval(pb.startSlider, pb.settings.duration);
    }


    pb.startSlider = function () {
        let items = pb.items;
        let controls = $('#control-buttons li');

        if (slideSelajutnya >= jumlahSlide) {
            slideSelajutnya = 0;
            slideSekarang = jumlahSlide - 1;
        }

        controls.removeClass('active').eq(slideSelajutnya).addClass('active');
        items.panels.eq(slideSekarang).fadeOut('slow');
        items.panels.eq(slideSelajutnya).fadeIn('slow');

        slideSekarang = slideSelajutnya;
        slideSelajutnya += 1;
    }

    let changePanel = function (id) {
        clearInterval(SliderInterval);
        let items = pb.items,
            controls = $('#control-buttons li');

        if (id >= jumlahSlide) {
            id = 0;
        } else if (id < 0) {
            id = jumlahSlide - 1;
        }

        controls.removeClass('active').eq(id).addClass('active');
        items.panels.eq(slideSekarang).fadeOut('slow');
        items.panels.eq(id).fadeIn('slow');

        slideSekarang = id;
        slideSelajutnya = id + 1;

        activateSlider();
    }

    return pb;
}());

modulSlide.init({ duration: 3000 });