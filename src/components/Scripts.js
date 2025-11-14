import $ from 'jquery'
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Scripts = () => {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        $('#scripts').html("");
        const scrpt = ['assets/libs/jquery/jquery.min.js', 'assets/libs/bootstrap/js/bootstrap.bundle.min.js', 'assets/libs/metismenu/metisMenu.min.js', 'assets/libs/simplebar/simplebar.min.js', 'assets/libs/node-waves/waves.min.js', 'assets/libs/apexcharts/apexcharts.min.js', 'assets/js/pages/dashboard.init.js', 'assets/js/app.js'];

        for (let i = 0; i < scrpt.length; i++) {
            const src = scrpt[i];
            let script = document.createElement('script');
            script.src = src;
            document.getElementById("scripts").appendChild(script);
        }


        $('#sidebar-menu a').unbind().click(function () {
            $('#sidebar-menu a').removeClass('active')
            $(this).addClass('active')
        })

        setInterval(function () {
            if ($('.msg-box').hasClass('green')) {
                setTimeout(function () {
                    $('.msg-box').removeClass('green')
                }, 2000)
            }
            if (localStorage.getItem('user_data') != null) {
                setTimeout(function () {
                    localStorage.removeItem('user_data');
                    navigate('/admin/login');
                }, 3600000)
            }
            $(".keywords-container").each(function () {
                var keywordInput = $(this).find(".keyword-input");
                var keywordsList = $(this).find(".keywords-list");
            
                // adding keyword
                function addKeyword() {
                  var $newKeyword = $(
                    "<span class='keyword'><span class='keyword-remove bx'></span><span class='keyword-text'>" +
                    keywordInput.val() +
                    "</span></span>"
                  );
                  keywordsList.append($newKeyword).trigger("resizeContainer");
                  keywordInput.val("");
                }
            
                // add via enter key
                keywordInput.on("keyup", function (e) {
                  if (e.keyCode == 13 && keywordInput.val() !== "") {
                    addKeyword();
                  }
                });
            
                // add via button
                $(".keyword-input-button").on("click", function (e) {
                    e.preventDefault();
                  if (keywordInput.val() !== "") {
                    addKeyword();
                  }
                });
            
                // removing keyword
                $(document).on("click", ".keyword-remove", function () {
                  $(this).parent().addClass("keyword-removed");
            
                  function removeFromMarkup() {
                    $(".keyword-removed").remove();
                  }
                  setTimeout(removeFromMarkup, 500);
                  keywordsList.css({ height: "auto" }).height();
                });
            
                // animating container height
                keywordsList.on("resizeContainer", function () {
                  var heightnow = $(this).height();
                  var heightfull = $(this)
                    .css({ "max-height": "auto", height: "auto" })
                    .height();
            
                  $(this).css({ height: heightnow }).animate({ height: heightfull }, 200);
                });
            
                $(window).on("resize", function () {
                  keywordsList.css({ height: "auto" }).height();
                });
            
                // Auto Height for keywords that are pre-added
                $(window).on("load", function () {
                  var keywordCount = $(".keywords-list").children("span").length;
            
                  // Enables scrollbar if more than 3 items
                  if (keywordCount > 0) {
                    keywordsList.css({ height: "auto" }).height();
                  }
                });
              });
        }, 2000)
    }, [location.pathname])
}

export default Scripts