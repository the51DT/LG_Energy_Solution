$(()=>{
    _layout.init();
    _front.init();
    _form.init();
})

const _front = {
    init: function(){
        _front.tab();

        $(document).on("click", "a[href='#'], a[href='#none']", function(e){ e.preventDefault() });
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
                <h1><a href="#"><span class="hidden">LG Energy Solution</span></a></h1>
                <nav class="header__nav">
                    <ul>
                        <li class="on"><a href="#">차량관제</a></li>
                        <li><a href="#">차량관리</a></li>
                    </ul>
                </nav>
            </div>
        `;
        $(document).find("header.header").html(html);
    },
    footer: function(){
        $(document).find("footer.footer").remove();
    }
}

const _form = {
    init: function(){
        // 폼 submit 방지
        document.querySelector("form").addEventListener("submit", (e)=>{
            e.preventDefault();
        })
        
        // 인풋 클리어버튼
        _form.setBtnClear();

        // 파일첨부
        _form.inputFile();

        // 약관 동의
        // _form.checkTerms();

        // 약관 더보기
        // _form.openTerms();
    },
    setBtnClear: function(){
        document.querySelectorAll(".input_wrap input:not([readonly]):not([disabled])").forEach((item)=>{
            item.addEventListener("keyup", ()=>{
                let btnClear = document.createElement("button");
                let btnClearText = document.createTextNode("삭제");
                btnClear.setAttribute("type", "button");
                btnClear.classList.add("btn_clear");
                btnClear.appendChild(btnClearText);
                
                if(item.parentNode.getElementsByClassName("btn_clear").length){
                    item.parentNode.getElementsByClassName("btn_clear")[0].style.display = "block";

                    if(item.parentNode.getElementsByClassName("msg").length){
                        item.parentNode.getElementsByClassName("msg")[0].style.right = "5.6rem";
                    }
                } else {
                    item.parentNode.appendChild(btnClear);

                    if(item.parentNode.getElementsByClassName("msg").length){
                        item.parentNode.getElementsByClassName("msg")[0].style.right = "5.6rem";
                    }
                }
                _form.clickBtnClear();
            })
        })
    },
    clickBtnClear: function(){
        document.querySelectorAll(".btn_clear").forEach((item)=>{
            item.addEventListener("click", ()=>{
                item.parentNode.querySelector("input").value = "";
                item.style.display = "none";
                if(item.parentNode.getElementsByClassName("msg").length){
                    item.parentNode.getElementsByClassName("msg")[0].style.right = "1.7rem";
                }
            })
        })
    },
    inputFile: function(){
        document.querySelectorAll(".input_file").forEach((item)=>{
            item.addEventListener("change", ()=>{
                item.parentNode.getElementsByClassName("file_name")[0].value = item.value;
            })
        })
    }
    // checkTerms: function(){
    //     document.querySelector(".terms_wrap").addEventListener("change", function(e){
    //         let chkAll = document.getElementById("check_all");
    //         let chkSub = this.querySelectorAll(".check_sub");
    //         let checkedSub = this.querySelectorAll(".check_sub:checked");
            
    //         if(e.target === document.getElementById("check_all")){
    //             let is_checked = e.target.checked;
    //             chkSub.forEach((item)=>{
    //                 item.checked = is_checked;
    //             })
    //             return;
    //         }
    //         checkedSub.length === chkSub.length ? chkAll.checked = true : chkAll.checked = false;
    //     })
    // },
    // openTerms: function(){
    //     document.querySelectorAll(".check_group .btn_more").forEach((item)=>{
    //         item.addEventListener("click",()=>{
    //             item.parentNode.classList.toggle("on");
    //             item.parentNode.classList.contains("on") ? item.setAttribute("aria-expanded", true) : item.setAttribute("aria-expanded", false);
    //         })
    //     })
    // }
}