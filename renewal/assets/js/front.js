$(()=>{
    _device.init();
    _layout.init();
    _front.init();
    _aside.init();
})


const _device = {
    init: function(){
        _device.chk();
        $(window).on("resize", function(){
            _device.chk();
        })
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

        $(document).on("click", "a[href='#'], a[href='#none']", function(e){ e.preventDefault() });
    },
    vh: function(){
        // const setVh = () => {
            document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
        // };
        // window.addEventListener('resize', setVh);
        // setVh();
    },
    /**
     * 
     * @param {*} type 0:no_Scroll, 1:scroll
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
            if (currentTarget.ariaSelected === "false") {
                tabRemoveEvt(targetTabListWrap, targetPanelWrap);   // 미선택된 탭 속성 false 상태로 만들기
                tabAddEvt(currentTarget, targetTabWrap);    // 선택 된 탭 속성 true 상태로 만들기
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
                ($(this).hasClass("on")) ? selectOff() : selectOn();
            });

            // change
            _this.find("input[type='radio']").on("change", function(){
                const value = $(this).next().text();
                _this.find(".btn_select").text(value).addClass("selected");
                selectOff();
            });

            const selectOn = function(){
                _this.find(".btn_select").addClass('on').attr( 'aria-expanded', 'true');
                _this.find('.select_list_box').addClass('on').attr( 'aria-expanded', 'true');
            };
            const selectOff = function(){
                _this.find(".btn_select").removeClass('on').attr("aria-expanded", "false")
                _this.find('.select_list_box').removeClass("on").attr("aria-expanded", "false");
            }
        });
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

        // const dimmed = `<div class="aside_dimmed"></div>`;
        // $("body").append(dimmed);
        // $("html, body").addClass("no_scroll");
        _front.noScroll(0);
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

        // $(document).find(".aside_dimmed").remove();
        // $("html, body").removeClass("no_scroll");
        _front.noScroll(1);
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
            const media = window.matchMedia("only screen and (max-width:425px)").matches;
            if( media ){
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
            </div>
        `;
        $(document).find("footer.footer").html(html);
    }
}


// function AccordionScript() {
//     const _$this = this;
//     let accordionGroups;

//     _$this.init = {
//         // 여러 개의 accordion 을 각각 독립적으로 이벤트 실행
//         getAccordionGroups: () => {
//             // 현재 페이지에 있는 모든 accordion 을 배열로 담음
//             accordionGroups = document.querySelectorAll('[data-role="accordion-group"]');
//             accordionGroups.forEach(function(accordionGroup) {
//                 _$this.init.getAccordionBtns(accordionGroup);
//             });
//         },
//         // accordion 버튼 클릭 이벤트를 독립적으로 실행
//         getAccordionBtns: (accordionGroup) => {
//             // 배열에 담긴 accordion 내부 버튼을 찾아서
//             const accordionBtns = accordionGroup.querySelectorAll('.accordion-btn');
//             accordionBtns.forEach(function(accordionBtn) {
//                 // 클릭 이벤트를 실행
//                 _$this.clickAction.accordionBtnClick(accordionBtn);
//                 // 초기 셋팅 : button 의 aria-expanded 값이 false 인 accordion contents 에 hidden 값 넣기
//                 if (accordionBtn.ariaExpanded === 'false' && accordionBtn.nextElementSibling !== null) accordionBtn.nextElementSibling.setAttribute('hidden', 'true');
//                 // 초기 셋팅 : button 의 aria-expanded 값이 true 인 accordion contents 에 height size 넣기
//                 if (accordionBtn.ariaExpanded === 'true' && accordionBtn.nextElementSibling !== null) {
//                     accordionBtn.nextElementSibling.style.height = accordionBtn.nextElementSibling.scrollHeight + 'px'
//                 } else {
//                     accordionBtn.nextElementSibling.style.height = 0
//                 };
//             });
//         },
//     };




//     _$this.accordionEvent = {
//         removeEvent: (target, accordionGroup) => {
//             const accordionBtns = accordionGroup.querySelectorAll('.accordion-btn');
//             for (let accordionBtn of accordionBtns) {
//                 // 기존에 선택 된 accordion 속성 false 로 만들기
//                 if (accordionBtn.ariaExpanded === 'true') {
//                     accordionBtn.setAttribute('aria-expanded', 'false');
//                     if (accordionBtn.nextElementSibling !== null) {
//                         accordionBtn.nextElementSibling.style.height = 0;
//                     };
//                 };
//             };
//         },
//     },
//     _$this.heightSizeTransiton = {
//         activeEvent: (target, targetContents) => {
//             target.setAttribute('aria-expanded', 'true');
//             targetContents.removeAttribute('hidden');
//             targetContents.style.height = targetContents.scrollHeight + 'px';
//             // targetContents.style.height = 'auto';
//         },
//         removeEvent: (target, targetContents) => {
//             target.setAttribute('aria-expanded', 'false');
//             targetContents.style.height = 0;
//         },
//     };
//     _$this.clickEvent = {
//         accordionBtnclickEvent: (e) => {
//             let target = e.target.tagName;
//             target === 'BUTTON' ? target = e.target : target = e.target.closest('button');
//             const accordionOption = target.closest('[accordion-option]').getAttribute('accordion-option');
//             const accordionGroup = target.closest('[data-role="accordion-group"]');
//             const targetContents = accordionGroup.querySelector(`[aria-labelledby="${target.id}"]`);
//             // 연결된 accordion은 무조건 하나씩 만 열리는 type
//             if (accordionOption === 'only') {
//                 if (target.ariaExpanded === 'false') {
//                     // 미선택된 accordion 속성 false 상태로 만들기
//                     _$this.accordionEvent.removeEvent(target, accordionGroup);
//                     // 선택 된 accordion 속성 true 상태로 만들기
//                     _$this.heightSizeTransiton.activeEvent(target, targetContents);
//                 } else if (target.ariaExpanded === 'true') {
//                     _$this.heightSizeTransiton.removeEvent(target, targetContents);
//                 };
//             // toggle type (default)
//             } else {
//                 if (target.ariaExpanded === 'false') {
//                     _$this.heightSizeTransiton.activeEvent(target, targetContents);
//                 } else if (target.ariaExpanded === 'true') {
//                     _$this.heightSizeTransiton.removeEvent(target, targetContents);
//                 };
//             };
//         },
//     };
//     _$this.clickAction = {
//         accordionBtnClick: (accordionBtn) => {
//             // 클릭 이벤트
//             accordionBtn.addEventListener('click', _$this.clickEvent.accordionBtnclickEvent);
//         },
//     };
//     return {
//         init: () => {
//             _$this.init.getAccordionGroups();
//         }
//     };
// };
// var accordionScript = new AccordionScript();

// window.addEventListener('load', function() {
//     accordionScript.init();
// });