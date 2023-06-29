$(()=>{
    _device.init();
    _layout.init();
    _front.init();
    _aside.init();

    // page
    const page_guide = $(document).find(".container.guide");
    const page_inquiry = $(document).find(".container.inquiry");
    if( page_guide.length ){
        _page_guide.init();
    }
    if( page_inquiry.length ){
        _page_inquiry.init();
    }
})


const _device = {
    init: function(){
        _device.chk();
        $(window).on("resize", function(){ _device.chk() });
    },
    /**
     * body에 pc, mobile, ios, aos 클래스 부여
     */
    chk: function(){
        const elem = $("body");
        const userAgent = navigator.userAgent;
        const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        const ios = /iPhone|iPad|iPod/i;
        const aos = /Android/i;

        elem.removeClass("mobile pc ios aos");
        
        ( mobile.test(userAgent) ) ? elem.addClass("mobile") : elem.addClass("pc");
        ( ios.test(userAgent) ) ? elem.addClass("ios") : null;
        ( aos.test(userAgent) ) ? elem.addClass("aos") : null;
    },
    /** 
     * 모바일 디바이스 일 때 true 반환
     * @returns boolean
     */
    isMobile: function(){
        const userAgent = navigator.userAgent;
        const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        if( mobile.test(userAgent) ){
            return true;
        } else {
            return false;
        }
    }
}


const _front = {
    init: function(){
        _front.vh();
        _front.tab();
        _front.accordion();
        _front.select();
        
        $(window).on("resize", function(){ _front.vh() })

        $(document).on("click", "a[href='#'], a[href='#none']", function(e){ e.preventDefault() });
    },
    vh: function(){
        const innerHeight = window.innerHeight;
        document.documentElement.style.setProperty('--vh', `${innerHeight}px`);
    },
    /**
     * html, body에 no_scroll 클래스 부여, 해제
     * @param {*} number [0, 1] 0:no_Scroll, 1:no_Scroll 해제
     */
    noScroll:function(type){
        if(type){
            $("html, body").removeClass("no_scroll");
        } else {
            $("html, body").addClass("no_scroll");
        }
    },
    tab: function(){
        const tabGroups = document.querySelectorAll('[data-role="tab"]');
        if( tabGroups.length < 1 ){ return }

        let currentTarget, targetTabWrap, targetTabListWrap, targetPanelWrap;
        // 이벤트 타겟 변수 설정
        const init = (e) => {
            currentTarget = e.target.tagName;
            currentTarget === "BUTTON" || "A"
                ? (currentTarget = e.target)
                : (currentTarget =
                    e.target.closest("button") || e.target.closest("a"));
            targetTabWrap = currentTarget.closest('[data-role="tab"]');
            targetTabListWrap = targetTabWrap.querySelector('[role="tablist"]');
            targetPanelWrap = targetTabWrap.querySelector(".wrap-tab-contents");
        };
        // 클릭 이벤트
        const tabClickEvt = (e) => {
            init(e);
            // if (currentTarget.ariaSelected === "false") {
            if(currentTarget.getAttribute("aria-selected")){
                tabRemoveEvt(targetTabListWrap, targetPanelWrap);   // 미선택된 탭 속성 false 상태로 만들기
                tabAddEvt(currentTarget, targetTabWrap);            // 선택 된 탭 속성 true 상태로 만들기
            }
        };
        // 키보드 접근 이벤트
        const tabKeyUpEvt = (e) => {
            init(e);
            const targetBtnWrap = currentTarget.parentElement;
            if (e.key == "ArrowRight") {
                // 키보드 -> 화살표를 눌렀을 때
                if (targetBtnWrap.nextElementSibling) {
                    targetBtnWrap.nextElementSibling.children[0].focus();
                    tabRemoveEvt(targetTabListWrap, targetPanelWrap);
                    tabAddEvt(
                        targetBtnWrap.nextElementSibling.children[0],
                        targetTabWrap
                    );
                } else
                    homeKeyEvt(
                        targetTabListWrap,
                        targetTabWrap,
                        targetPanelWrap
                    );
            } else if (e.key == "ArrowLeft") {
                // 키보드 <- 화살표를 눌렀을 때
                if (targetBtnWrap.previousElementSibling) {
                    targetBtnWrap.previousElementSibling.children[0].focus();
                    tabRemoveEvt(targetTabListWrap, targetPanelWrap);
                    tabAddEvt(
                        targetBtnWrap.previousElementSibling.children[0],
                        targetTabWrap
                    );
                } else
                    endKeyEvt(
                        targetTabListWrap,
                        targetTabWrap,
                        targetPanelWrap
                    );
            }
            // 키보드 End 키 눌렀을 때
            else if (e.key == "End")
                endKeyEvt(targetTabListWrap, targetTabWrap, targetPanelWrap);
            // 키보드 Home 키 눌렀을 때
            else if (e.key == "Home")
                homeKeyEvt(targetTabListWrap, targetTabWrap, targetPanelWrap);
        };
        // tab active event
        const tabAddEvt = (currentTarget, targetPanelWrap) => {
            // 선택 된 탭 속성 true 로 변경
            currentTarget.setAttribute("aria-selected", "true");
            currentTarget.removeAttribute("tabindex");
            currentTarget.parentElement.classList.add("active");
            // 연결 된 tabpanel 숨김 해제
            targetPanelWrap
                .querySelector(`[aria-labelledby="${currentTarget.id}"]`)
                .removeAttribute("hidden");
            targetPanelWrap
                .querySelector(`[aria-labelledby="${currentTarget.id}"]`)
                .setAttribute("tabindex", "0");
        };
        // tab active remove event
        const tabRemoveEvt = (tabListWrap, tabPanelWrap) => {
            targetTabListWrap.querySelectorAll("li").forEach((tabBtnWrap) => {
                // 기존에 선택 된 탭 속성 false 로 변경
                if (tabBtnWrap.classList.contains("active")) {
                    tabBtnWrap.classList.remove("active");
                    tabBtnWrap
                        .querySelector('[role="tab"]')
                        .setAttribute("aria-selected", "false");
                    tabBtnWrap
                        .querySelector('[role="tab"]')
                        .setAttribute("tabindex", "-1");
                }
            });
            // 기존에 선택 된 tabpanel 숨김
            for (let tabPanel of targetPanelWrap.children) {
                tabPanel.setAttribute("hidden", "false");
                tabPanel.setAttribute("tabindex", "-1");
            }
        };
        // 키보드 Home key Event (선택된 탭 리스트 중 첫 번째 리스트로 포커스 이동)
        const homeKeyEvt = (
            targetTabListWrap,
            targetTabWrap,
            targetPanelWrap
        ) => {
            targetTabListWrap.children[0].children[0].focus();
            tabRemoveEvt(targetTabListWrap, targetPanelWrap);
            tabAddEvt(targetTabListWrap.children[0].children[0], targetTabWrap);
        };
        // 키보드 End key Event (선택된 탭 리스트 중 마지막 리스트로 포커스 이동)
        const endKeyEvt = (
            targetTabListWrap,
            targetTabWrap,
            targetPanelWrap
        ) => {
            const targetTabLists = targetTabListWrap.querySelectorAll("li");
            targetTabLists[targetTabLists.length - 1].children[0].focus();
            tabRemoveEvt(targetTabListWrap, targetPanelWrap);
            tabAddEvt(
                targetTabLists[targetTabLists.length - 1].children[0],
                targetTabWrap
            );
        };
        // 클릭/키보드 탭 이벤트 제거/할당
        tabGroups.forEach((tabWrapper) => {
            const tabBtns = tabWrapper.querySelectorAll('[role="tab"]');
            tabBtns.forEach((tabBtn) => {
                tabBtn.removeEventListener("click", tabClickEvt);
                tabBtn.addEventListener("click", tabClickEvt);
                tabBtn.removeEventListener("keyup", tabKeyUpEvt);
                tabBtn.addEventListener("keyup", tabKeyUpEvt);
            });
        });
    },
    accordion:function(){
        const accordion = $(document).find(".wrap-accordion-group");
        if( accordion.length < 1 ) return;

        let _this;

        accordion.attr("data-role", "accordion-group");
        accordion.find("li").each((idx, item)=>{
            $(item).find(".wrap-accordion-contents").attr({"role":"region"});
            if( $(item).hasClass("on") ){
                $(item).find(".accordion-btn").attr({"aria-expanded":"true"});
            } else {
                $(item).find(".accordion-btn").attr({"aria-expanded":"false"});
            }
        })

        // click
        accordion.find(".accordion-btn").on("click", function(){
            _this = $(this).parents(".wrap-accordion-group");
            const li = $(this).parents("li");
            const liAll = li.siblings();

            const isOnly = _this.attr("accordion-option") == "only";
            console.log(isOnly);

            if(isOnly){
                liAll.removeClass("on");
                liAll.find(".accordion-btn").attr("aria-expanded", false);
                liAll.find(".wrap-accordion-contents").slideUp();
            }

            if( li.hasClass("on") ){
                li.removeClass("on");
                li.find(".accordion-btn").attr("aria-expanded", false);
                li.find(".wrap-accordion-contents").slideUp();
            } else {
                li.addClass("on");
                li.find(".accordion-btn").attr("aria-expanded", true);
                li.find(".wrap-accordion-contents").slideDown();
            }

        })
    },
    select: function(){
        const select = $(document).find(".select_box");
        if( select.length < 1){ return };

        select.each((idx, item)=>{
            const _this = $(item);

            _this.find('.btn_select').attr({'aria-owns': _this.find('.select_list_box').attr('id'), 'data-toggle' :'dropdown', 'role' : 'combobox', 'aria-haspopup' : 'listbox', 'aria-expanded': 'false'});
            _this.find('.select_list_box').attr({ 'role' : 'listbox' , 'aria-expanded' : 'false' });
            _this.find('.select_list_box .select_list').attr('role', 'presentation');
            _this.find('.select_list_box .select_list > li').attr('role', 'option');
            _this.find('.select_list input[type="radio"] + label').attr({'aria-selected' : 'false', 'tabindex' : '0'});
            _this.find('.select_list_box .select_list > li').each((idx, item)=>{
                $(item).find('label').attr( 'aria-posinset', idx+1 );
            });

            // click
            _this.find(".btn_select").on("click", function(){
                const select_box = $(this).parents(".select_box");

                $(document).find(".select_box").filter((idx, item2)=> $(item2)[0] != select_box[0] ).each((idx, item3)=>{
                    selectOff( $(item3) );
                });

                ($(this).hasClass("on")) ? selectOff(_this) : selectOn(_this);
            });

            // change
            _this.find("input[type='radio']").on("change", function(){
                const value = $(this).next().text();
                _this.find(".btn_select").text(value).addClass("selected");
                selectOff(_this);
            });

            // const selectOn = function(){
            //     _this.find(".btn_select").addClass('on').attr( 'aria-expanded', 'true');
            //     _this.find('.select_list_box').addClass('on').attr( 'aria-expanded', 'true');
            // };
            // const selectOff = function(){
            //     _this.find(".btn_select").removeClass('on').attr("aria-expanded", "false")
            //     _this.find('.select_list_box').removeClass("on").attr("aria-expanded", "false");
            // }
        });
        

        const selectOn = function(elem){
            elem.find(".btn_select").addClass('on').attr( 'aria-expanded', 'true');
            elem.find('.select_list_box').addClass('on').attr( 'aria-expanded', 'true');
        };
        const selectOff = function(elem){
            elem.find(".btn_select").removeClass('on').attr("aria-expanded", "false")
            elem.find('.select_list_box').removeClass("on").attr("aria-expanded", "false");
        }

    }
   
}


const _aside = {
    init: function(){
        $(document).find(".btn__aside-open").on("click", function(){
            _aside.open();
        })
        $(document).find(".btn__aside-close").on("click", function(){
            _aside.close();
        })
    },
    open: function(){
        const elem = $(document).find(".aside__wrap");
        const btn_open = $(document).find(".btn__aside-open");
        elem.addClass("open");
        elem.removeAttr("aria-hidden");
        btn_open.attr("aria-expanded", true);
        
        
        $(".container, footer.footer, .btn__aside-open").attr({"aria-hidden":true, "tabindex":-1});
        $(document).find(".aside__wrap h2").attr("tabindex", 0).focus();

        _front.noScroll(0);
        if( $(".wrap").hasClass("index") ) myFullpage.setAllowScrolling(false);
    },
    close: function(){

        $(document).find(".btn__aside-open").attr("tabindex", 0).focus();
        $(".container, footer.footer, .btn__aside-open").removeAttr("aria-hidden tabindex");

        const elem = $(document).find(".aside__wrap");
        const btn_open = $(document).find(".btn__aside-open");
        elem.removeClass("open");
        elem.attr("aria-hidden", true);
        btn_open.attr("aria-expanded", false);

        $(".wrap").removeAttr("aria-hidden tabindex");
        
        _front.noScroll(1);
        if( $(".wrap").hasClass("index") ) myFullpage.setAllowScrolling(true);
    }
}


const _layout = {
    init:function(){
        _layout.header();
        _layout.footer();
    },
    header: function(){
        const html = `
            <div class="header__inner">
                <h1><a href="#"><span class="hidden">B-Lifecare</span></a></h1>
                <nav class="header__nav">
                    <ul>
                        <li class="on"><a href="#">주요 서비스</a></li>
                        <li><a href="#">배터리 인증서</a></li>
                        <li><a href="#">이용안내</a></li>
                        <li><a href="#">제휴문의</a></li>
                    </ul>
                </nav>
                <div class="header__util">
                    <div class="header__app">
                        <div class="header__app-inner">
                            <a href="#" class="header__app-btn" role="button">앱 다운로드</a>
                            <div class="header__app-content" id="appDownload">
                                <ul>
                                    <li class="qrcode_appstore">
                                        <span class="hidden">AppStore QR Code</span>
                                        <a href="#" target="blank" title="새창으로 열림" class="bn_appstore"><span class="hidden">앱스토어</span></a>
                                    </li>
                                    <li class="qrcode_googleplay">
                                        <span class="hidden">AppStore QR Code</span>
                                        <a href="#" target="blank" title="새창으로 열림" class="bn_googleplay"><span class="hidden">구글플레이</span></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn__aside-open" aria-expanded="false" aria-label="메뉴"><span></span></button>
                </div>
            </div>
            <div class="aside__wrap" aria-hidden="true">
                <div class="aside__ttl"><h2><span class="hidden">메뉴</span></h2></div>
                <div class="aside__inner">
                    <div class="aside__menu">
                        <ul>
                            <li><a href="#">주요서비스</a></li>
                            <li><a href="#">배터리 인증서</a></li>
                            <li><a href="#">이용안내</a></li>
                            <li><a href="#">제휴문의</a></li>
                            <li><a href="#">공지사항</a></li>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">EV Life</a></li>
                            <li><a href="#">이벤트</a></li>
                        </ul>
                    </div>
                </div>
                <button type="button" class="btn__aside-close" aria-label="닫기"></button>
            </div>
        `;
        $(document).find("header.header").html(html);

        // 
        const setAppDownload = function(){
            // const media = window.matchMedia("only screen and (max-width:425px)").matches;
            const mobile = _device.isMobile();

            if( mobile ){
                //reset
                $(document).find(".header__app-btn").removeAttr('aria-owns data-toggle role aria-haspopup aria-expanded');
                $(document).find(".header__app-content").removeAttr("role");
                $(document).find(".header__app").removeClass("on");

                // set
                $(document).find(".header__app-btn").attr({'title': "새창으로 열림"});
                $(document).find(".header__app-content").attr("aria-hidden", true);

            } else {
                // reset
                $(document).find(".header__app-btn").removeAttr('title');
                $(document).find(".header__app-content").removeAttr("aria-hidden");

                // set
                $(document).find(".header__app-btn").attr({'aria-owns': $(document).find('.header__app-content').attr('id'), 'data-toggle' :'dropdown', 'role' : 'combobox', 'aria-haspopup' : 'listbox', 'aria-expanded': 'false'});
                $(document).find(".header__app-content").attr({"role":"listbox"})
            }
        }
        setAppDownload();
        $(window).on("resize", function(){ setAppDownload() })

        $(document).on("click", ".header__app-btn[role='combobox']", function(e){
            const parents = $(this).parents(".header__app");
            if( parents.hasClass("on") ){
                parents.removeClass("on");
                $(this).attr("aria-expanded", false);
            } else {
                parents.addClass("on");
                $(this).attr("aria-expanded", true);
            }
        })

    },
    footer: function(){
        const html = `
            <div class="footer__inner">
                <div class="footer__app">
                    <p class="footer__app-ttl">B-Lifecare 앱 다운로드</p>
                    <div class="footer_app-cont">
                        <a href="#" target="blank" title="새창으로 열림" class="bn_appstore"><span class="hidden">앱스토어</span></a>
                        <a href="#" target="blank" title="새창으로 열림" class="bn_googleplay"><span class="hidden">구글플레이</span></a>
                    </div>
                </div>
                <div class="footer__cs">
                    <p class="footer__cs-ttl">고객만족센터</p>
                    <div class="footer__cs-cont">
                        <span>1544-8773</span>
                        <a href="#" role="button" class="cs_kakao"><span class="hidden">카카오톡 채널 1:1 채팅 버튼</span></a>
                        <a href="tel:1544-8773" role="button" class="cs_tel"><span class="hidden">전화걸기</span></a>
                    </div>
                    <p class="footer__cs-txt">월~금요일 오전 9시 ~ 오후 5시 (공휴일 제외)</p>
                </div>
                <div class="footer__util">
                    <ul>
                        <li><a href="#">개인정보처리방침</a></li>
                        <li><a href="#">이용약관</a></li>
                        <li><a href="#">오픈소스 라이선스</a></li>
                        <li><a href="#">제휴문의</a></li> 
                    </ul>
                </div>
                <div class="footer_copy">
                    <dl class="ceo">
                        <dt>대표이사</dt>
                        <dd>권영수</dd>
                    </dl>
                    <dl class="num">
                        <dt>사업자등록번호</dt>
                        <dd>851-81-02050</dd>
                    </dl>
                    <dl class="add">
                        <dt>주소</dt>
                        <dd>07335 서울특별시 영등포구 여의대로 108</dd>
                    </dl>
                    <p><strong>LG Energy Solution</strong> All rights Reserved.</p>
                </div>
                <div class="footer_awards">
                    <p class="award_item">2023 국가서비스대상<br> 전기차 배터리 관리 앱 부문</p>
                </div>
            </div>
        `;
        $(document).find("footer.footer").html(html);
    }
}

const _page_guide = {
    init: function(){
        console.log("_page_guide");

        // open
        $(document).find(".container.guide .btn_list").on("click", function(e){
            console.log($(this));
            _page_guide.lastFocused = $(this);
            _page_guide.popup_open();
        });
        
        // close
        $(document).find(".pop_up .btn_close, .pop_up .dimmed").on("click", ()=>{
            _page_guide.popup_close();
        });
    },
    lastFocused: $("body"),
    popup_open: function(){
        const _this = $(".pop_up");
        _this.addClass("open").attr("aria-hidden", false);
        _this.find(".title").attr("tabindex", 0).focus();

        $(".wrap").attr({"aria-hidden":true, "tabindex":-1});

        _front.noScroll(0);
    },
    popup_close: function(){

        setTimeout(() => {
            _page_guide.lastFocused.focus();
            
            const _this = $(".pop_up");
            _this.removeClass("open").removeAttr("aria-hidden");
            _this.find(".title").removeAttr("tabindex");

            $(".wrap").removeAttr("aria-hidden tabindex");
            
            _front.noScroll(1);

        }, 130);
    }
}


const _page_inquiry = {
    init: function(){
        console.log("_page_inquiry");

        // 폼 submit 방지
        document.querySelector("form").addEventListener("submit", (e)=>{
            e.preventDefault();
        })
        
        // 인풋 클리어버튼
        _page_inquiry.setBtnClear();

        // 약관 동의
        _page_inquiry.checkTerms();

        // 약관 더보기
        _page_inquiry.openTerms();
    },
    setBtnClear: function(){
        document.querySelectorAll(".input_wrap input").forEach((item)=>{
            item.addEventListener("keyup", ()=>{
                let btnClear = document.createElement("button");
                let btnClearText = document.createTextNode("삭제");
                btnClear.setAttribute("type", "button");
                btnClear.classList.add("btn_clear");
                btnClear.appendChild(btnClearText);
                
                if(item.nextElementSibling === null){
                    item.parentNode.appendChild(btnClear);
                } else {
                    item.nextElementSibling.style.display = "block";
                }
                _page_inquiry.clickBtnClear();
            })
        })
    },
    clickBtnClear: function(){
        document.querySelectorAll(".btn_clear").forEach((item)=>{
            item.addEventListener("click", ()=>{
                item.previousElementSibling.value = "";
                item.style.display = "none";
            })
        })
    },
    checkTerms: function(){
        document.querySelector(".terms_wrap").addEventListener("change", function(e){
            let chkAll = document.getElementById("check_all");
            let chkSub = this.querySelectorAll(".check_sub");
            let checkedSub = this.querySelectorAll(".check_sub:checked");
            
            if(e.target === document.getElementById("check_all")){
                let is_checked = e.target.checked;
                chkSub.forEach((item)=>{
                    item.checked = is_checked;
                })
                return;
            }
            checkedSub.length === chkSub.length ? chkAll.checked = true : chkAll.checked = false;
        })
    },
    openTerms: function(){
        document.querySelectorAll(".check_group .btn_more").forEach((item)=>{
            item.addEventListener("click",()=>{
                item.parentNode.classList.toggle("on");
                item.parentNode.classList.contains("on") ? item.setAttribute("aria-expanded", true) : item.setAttribute("aria-expanded", false);
            })
        })
    }
}