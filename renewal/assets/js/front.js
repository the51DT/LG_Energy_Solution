$(()=>{
    console.log("test");
    _front.init();
    _aside.init();
})


const _front = {
    init: function(){
        _front.tab();

        $(document).on("click", "a[href='#'], a[href='#none']", function(e){ e.preventDefault() });
    },
    tab: function(){
        const tabGroups = document.querySelectorAll('[data-role="tab"]');
        if (tabGroups) {
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
        }
    },
    
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

        const dimmed = `<div class="dimmed"></div>`;
        $("body").append(dimmed);
        $("html, body").addClass("no_scroll");
    },
    close: function(){
        const elem = $(document).find(".aside__wrap");
        const btn_open = $(document).find(".btn__aside-open");
        elem.removeClass("open");
        elem.attr("aria-hidden", true);
        btn_open.attr("aria-expanded", false);

        $(document).find(".dimmed").remove();
        $("html, body").removeClass("no_scroll");
    }
}

function AccordionScript() {
    const _$this = this;
    console.log(_$this);
    let accordionGroups;
    
    _$this.init = {
        // 여러 개의 accordion 을 각각 독립적으로 이벤트 실행
        getAccordionGroups: () => {
            // 현재 페이지에 있는 모든 accordion 을 배열로 담음
            accordionGroups = document.querySelectorAll('[data-role="accordion-group"]');
            accordionGroups.forEach(function(accordionGroup) {
                _$this.init.getAccordionBtns(accordionGroup);
            });
        },
        // accordion 버튼 클릭 이벤트를 독립적으로 실행
        getAccordionBtns: (accordionGroup) => {
            // 배열에 담긴 accordion 내부 버튼을 찾아서
            const accordionBtns = accordionGroup.querySelectorAll('.accordion-btn');
            accordionBtns.forEach(function(accordionBtn) {
                // 클릭 이벤트를 실행
                _$this.clickAction.accordionBtnClick(accordionBtn);
                // 초기 셋팅 : button 의 aria-expanded 값이 false 인 accordion contents 에 hidden 값 넣기
                if (accordionBtn.ariaExpanded === 'false' && accordionBtn.nextElementSibling !== null) accordionBtn.nextElementSibling.setAttribute('hidden', 'true');
                // 초기 셋팅 : button 의 aria-expanded 값이 true 인 accordion contents 에 height size 넣기
                if (accordionBtn.ariaExpanded === 'true' && accordionBtn.nextElementSibling !== null) {
                    accordionBtn.nextElementSibling.style.height = accordionBtn.nextElementSibling.scrollHeight + 'px'
                } else {
                    accordionBtn.nextElementSibling.style.height = 0
                };
            });
        },
    };
    _$this.accordionEvent = {
        removeEvent: (target, accordionGroup) => {
            const accordionBtns = accordionGroup.querySelectorAll('.accordion-btn');
            for (let accordionBtn of accordionBtns) {
                // 기존에 선택 된 accordion 속성 false 로 만들기
                if (accordionBtn.ariaExpanded === 'true') {
                    accordionBtn.setAttribute('aria-expanded', 'false');
                    if (accordionBtn.nextElementSibling !== null) {
                        accordionBtn.nextElementSibling.style.height = 0;
                    };
                };
            };
        },
    },
    _$this.heightSizeTransiton = {
        activeEvent: (target, targetContents) => {
            target.setAttribute('aria-expanded', 'true');
            targetContents.removeAttribute('hidden');
            targetContents.style.height = targetContents.scrollHeight + 'px';
            // targetContents.style.height = 'auto';
        },
        removeEvent: (target, targetContents) => {
            target.setAttribute('aria-expanded', 'false');
            targetContents.style.height = 0;
        },
    };
    _$this.clickEvent = {
        accordionBtnclickEvent: (e) => {
            let target = e.target.tagName;
            target === 'BUTTON' ? target = e.target : target = e.target.closest('button');
            const accordionOption = target.closest('[accordion-option]').getAttribute('accordion-option');
            const accordionGroup = target.closest('[data-role="accordion-group"]');
            const targetContents = accordionGroup.querySelector(`[aria-labelledby="${target.id}"]`);
            // 연결된 accordion은 무조건 하나씩 만 열리는 type
            if (accordionOption === 'only') {
                if (target.ariaExpanded === 'false') {
                    // 미선택된 accordion 속성 false 상태로 만들기
                    _$this.accordionEvent.removeEvent(target, accordionGroup);
                    // 선택 된 accordion 속성 true 상태로 만들기
                    _$this.heightSizeTransiton.activeEvent(target, targetContents);
                } else if (target.ariaExpanded === 'true') {
                    _$this.heightSizeTransiton.removeEvent(target, targetContents);
                };
            // toggle type (default)
            } else {
                if (target.ariaExpanded === 'false') {
                    _$this.heightSizeTransiton.activeEvent(target, targetContents);
                } else if (target.ariaExpanded === 'true') {
                    _$this.heightSizeTransiton.removeEvent(target, targetContents);
                };
            };
        },
    };
    _$this.clickAction = {
        accordionBtnClick: (accordionBtn) => {
            // 클릭 이벤트
            accordionBtn.addEventListener('click', _$this.clickEvent.accordionBtnclickEvent);
        },
    };
    return {
        init: () => {
            _$this.init.getAccordionGroups();
        }
    };
};
var accordionScript = new AccordionScript();
window.addEventListener('load', function() {
    accordionScript.init();
});