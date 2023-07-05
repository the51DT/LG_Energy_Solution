$(()=>{
    // setMyCart();
    // setMyCart2();

    // _chartGuage.init();
    // _chartBarHorizontal.init();
    // _chartBarVertical.init();
    // _chartBarVerticalDouble.init();
});

// [S]: 07/06 수정
// 운전습관
let setChartDriving = {
    maxData: 99999,
    maxData2: 99999,
    maxData3: 99999,

    init: function(data){
        // console.log(data);
        
        setChartDriving.frame = $(document).find(".chartDriving_wrap");

        setChartDriving.data = data.data;
        setChartDriving.data2 = data.data2;
        setChartDriving.data3 = data.data3;
        setChartDriving.label = data.label;

        this.setData();
    },
    setData: function(){

        setChartDriving.frame.find(".data_wrap").html('<ul class="data_ul"></ul>');
        const data_ul = setChartDriving.frame.find(".data_ul");

        this.maxData = Math.ceil((Math.max.apply(null, this.data2)) / 10) * 10; // get max data
        this.maxData2 = Math.ceil((Math.max.apply(null, this.data2)) / 10) * 10; // get max data
        this.maxData3 = Math.ceil((Math.max.apply(null, this.data3)) / 10) * 10; // get max data

        this.data.map((item, idx)=>{
            console.log(this.maxData)

            const per = ((item / this.maxData) * 100).toFixed(0);
            const per2 = ((this.data2[idx] / this.maxData2) * 100).toFixed(0);
            const per3 = ((this.data3[idx] / this.maxData3) * 100).toFixed(0);
            const comma = item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const calc = ((this.data2[idx]) / item).toFixed(2);
            

            let text = ( this.data.length-1 == idx ) ? `${calc}%` : `${calc}`;

            let html = `
                <li>
                    <div class="label">${setChartDriving.label[idx]}</div>
                    <div class="graph">
                        <div class="bar bar1">
                            <span class="guage" style="height:${per2}%">
                                <span class="data">${text}</span>
                            </span>
                            <span class="guage2" style="height:${per}%"></span>
                        </div>
                        <div class="bar bar2">
                            <span class="guage3" style="height:${per3}%"></span>
                        </div>
                    </div>
                </li>
            `;

            data_ul.append(html);

            const data = document.querySelectorAll(".chartDriving_wrap .data_wrap .data");
            data.forEach((item)=>{
                let top = item.clientHeight + 3;
                item.style.top = `-${top}px`
            })
        })
    }
}
// [E]: 07/06 수정


// 충전정보
const setMyCart2 = function(data){

    // console.log(data);
    
    const ctx = document.getElementById('myChart2').getContext("2d");
    var gradientStroke = ctx.createLinearGradient(0, 0, 0, 200);
    gradientStroke.addColorStop(0.5, "#C3C3C3");
    gradientStroke.addColorStop(0.9, "#fff");

    
    var gradientStroke2 = ctx.createLinearGradient(0, 0, 0, 200);
    gradientStroke2.addColorStop(0.5, "#009AFE");
    gradientStroke2.addColorStop(0.9, "#fff");

    Chart.register(ChartDataLabels);

    let original_data = data.data;
    let newData = original_data.map((item, idx)=>{
        return (item * 0.1).toFixed(0);
    })

    new Chart(ctx, {
        type: 'bar',
        data: {
            datasets: [
                {
                    type: 'line',
                    label: '충전량',
                    data: newData,
                    backgroundColor: ['#9C9C9C', '#9C9C9C', '#9C9C9C', '#9C9C9C', '#9C9C9C', '#fff'],
                    borderColor: ['#9C9C9C', '#9C9C9C', '#9C9C9C', '#9C9C9C', '#9C9C9C', '#009AFE'],
                    borderWidth: 1,
                    pointStyle: ['circle', 'circle', 'circle', 'circle', 'circle', 'circle'],
                    pointRadius: [2, 2, 2, 2, 2, 4],
                    pointBorderWidth: [1, 1, 1, 1, 1, 2],
                    datalabels: {
                        value: [1,2,3,4,5,6],
                        align: 'top',
                        textAlign: 'start',
                        color: ['#CDCDCD', '#CDCDCD', '#CDCDCD', '#CDCDCD', '#CDCDCD', '#009AFE'],
                        font: {
                            size: 10,
                        },
                        // [S]: 07/06 수정
                        formatter: function (value, context) {
                            const result = original_data[context.dataIndex];
                            const comma = result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            if(context.dataIndex === 5){
                                return comma + "kwh"
                            } else {
                                return comma
                            }
                        },
                        // [E]: 07/06 수정
                    },
                },
                {
                    type: 'bar',
                    label: '급속횟수',
                    data: data.data2,
                    barThickness: 20,
                    backgroundColor: [
                        gradientStroke,
                        gradientStroke,
                        gradientStroke,
                        gradientStroke,
                        gradientStroke,
                        gradientStroke2
                    ],
                    borderRadius: 9999,
                    datalabels: {
                        anchor: 'end',
                        align: 'bottom',
                        offset: -3,
                        // [S]: 07/06 수정
                        color: ['#fff', '#fff', '#fff', '#fff', '#fff', '#000'],
                        font: {
                            size: 10,
                        },
                        formatter: function (value, context) {
                            if(context.dataIndex === 5){
                                return value + "회"
                            } else {
                                return value
                            }
                        },
                        // [E]: 07/06 수정
                    },
                    clip: false,
                },
                {
                    type: 'bar',
                    label: '총 충전횟수',
                    data: data.data3,
                    barThickness: 20,
                    backgroundColor: '#E9E9E9',
                    borderRadius: 9999,
                    datalabels: {
                        anchor: 'end',
                        align: 'end',
                        // [S]: 07/06 수정
                        color: ['#656565', '#656565', '#656565', '#656565', '#656565', '#000'],
                        font: {
                            size: 10,
                        },
                        formatter: function (value, context) {
                            if(context.dataIndex === 5){
                                return value + "회"
                            } else {
                                return value
                            }
                        },
                        // [E]: 07/06 수정
                    },
                },
            ],
            
            labels: data.labels,
        },
        datalabels: {
            color:'black',
            font:{size:24}
        },
        options: {
            maintainAspectRatio: false,
            showTooltips: false,
            plugins:{
                datalabels: {
                    color: '#656565',
                },
                legend: {
                    display: false,
                },
                
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        font:{
                            size: 10,
                            lineHeight: "4px"
                        },
                        color: '#bbb',
                    },
                    stacked: true,
                },
                // [S]: 07/06 수정
                y: {
                    max: 320,
                    grid: {
                        color: "#E1E1E1",
                        tickLength: 0,
                    },
                    border: {
                        dash: [2,2],
                    },
                    ticks: {
                        stepSize: 80,
                        color: "transparent"
                    },
                    stacked: true,
                },
                // [E]: 07/06 수정
            }
        }
    });
}



    

// 연료비 절감 추이
let _chartBarVerticalDouble = {
    maxData: 99999,
    maxData2: 99999,

    init: function(data){
        // console.log(data);
        
        _chartBarVerticalDouble.frame = $(document).find(".chart_bar_vertical_double_wrap");

        _chartBarVerticalDouble.data = data.data;
        _chartBarVerticalDouble.data2 = data.data2;
        _chartBarVerticalDouble.label = data.label;

        this.setData();
    },
    setData: function(){

        _chartBarVerticalDouble.frame.find(".data_wrap").html('<ul class="data_ul"></ul>');
        const data_ul = _chartBarVerticalDouble.frame.find(".data_ul");

        this.maxData = Math.max.apply(null, this.data) + 5000; // get max data
        this.maxData2 = Math.max.apply(null, this.data2) + 10; // get max data

        this.data.map((item, idx)=>{

            // [S]: 07/06 수정
            const minItem = item + 2500;
            const per = ((minItem * 100) / this.maxData).toFixed(0);
            const comma = item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const calc = (item * 0.0001).toFixed(1)
            
            const per2 = ((this.data2[idx] * 100) / this.maxData2).toFixed(0);

            let text = ( this.data.length-1 == idx ) ? `${calc} 만원` : `${calc}`;
            let text2 = this.data2[idx];

            let html = `
                <li>
                    <div class="label">${_chartBarVerticalDouble.label[idx]}</div>
                    <div class="graph">
                        <div class="bar bar1">
                            <span class="guage" style="height:${per}%">
                                <span class="data">${text}</span>
                            </span>
                        </div>

                        <div class="bar bar2">
                            <span class="guage2" style="height:${per2}%">
                                <span class="data">${text2}</span>
                            </span>
                        </div>
                    </div>
                </li>
            `;
            
            data_ul.append(html);
            
            const data = document.querySelectorAll(".chart_bar_vertical_double_wrap .data_wrap .data");
            data.forEach((item)=>{
                let top = item.clientHeight + 3;
                item.style.top = `-${top}px`
            })
            // [E]: 07/06 수정
        })
    }
}

// 평균 주행거리
let _chartBarVertical = {
    // data: [11211, 8910, 7899, 13540, 12002, 1563],
    // label: ['12월', '1월', '2월', '3월', '4월', '당월'],
    maxData: 99999,

    // frame: $(document).find(".chart_bar_vertical_wrap"),

    init: function(data){
        _chartBarVertical.data = data.data;
        _chartBarVertical.label = data.label;
        _chartBarVertical.frame = $(document).find(".chart_bar_vertical_wrap");

        this.setData();
    },
    setData: function(){

        _chartBarVertical.frame.find(".data_wrap").html('<ul class="data_ul"></ul>');
        const data_ul = _chartBarVertical.frame.find(".data_ul");

        this.maxData = Math.max.apply(null, this.data) + 5000; // get max data

        this.data.map((item, idx)=>{

            const minItem = item + 2500;
            const per = ((minItem * 100) / this.maxData).toFixed(0);
            const comma = item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            let text = ( this.data.length-1 == idx ) ? `${comma}Km` : `${comma}`;

            let html = `
                <li>
                    <div class="label">${_chartBarVertical.label[idx]}</div>
                    <div class="graph">
                        <span class="guage" style="height:${per}%">
                            <span class="data">${text}</span>
                        </span>
                    </div>
                </li>
            `;

            data_ul.append(html);
        })
    }
}

// [S]: 07/06 수정
// 평균 전비
const setAverageChart = function(data){

    // console.log(data);   // data, data2, labels

    const ctx = document.getElementById('averageChart').getContext("2d");
    var gradientStroke = ctx.createLinearGradient(0, 0, 200, 0);
    gradientStroke.addColorStop(0, "rgba(195,195,195,0.2)");
    gradientStroke.addColorStop(1, "#C3C3C3");

    
    var gradientStroke2 = ctx.createLinearGradient(0, 0, 200, 0);
    gradientStroke2.addColorStop(0, "rgba(248,186,114,0.2)");
    gradientStroke2.addColorStop(1, "#F8BA72");

    Chart.register(ChartDataLabels);

    const averageChart = new Chart(ctx, {
        type: 'bar',
        data: {
            datasets: [
                {
                    type: 'line',
                    label: '동종업계 평균',
                    data: data.data2,
                    backgroundColor: ['#9C9C9C', '#9C9C9C', '#9C9C9C', '#9C9C9C', '#9C9C9C', '#fff'],
                    borderColor: ['#9C9C9C', '#9C9C9C', '#9C9C9C', '#9C9C9C', '#9C9C9C', '#FF9D2C'],
                    borderWidth: 1,
                    // pointStyle: ['circle', 'circle', 'circle', 'circle', 'circle', 'circle'],
                    pointRadius: [2, 2, 2, 2, 2, 4],
                    pointBorderWidth: [1, 1, 1, 1, 1, 2],
                    datalabels: {
                        align: 'top',
                        textAlign: 'start',
                        // color: ['#656565', '#656565', '#656565', '#656565', '#656565', '#F8BA72'],
                        color: 'transparent',
                        font: {
                            size: 10,
                        },
                    },
                },
                {
                    type: 'bar',
                    label: '월별',
                    data: data.data,
                    barThickness: 18,
                    backgroundColor: [
                        gradientStroke,
                        gradientStroke,
                        gradientStroke,
                        gradientStroke,
                        gradientStroke,
                        gradientStroke2
                    ],
                    borderRadius: 999,
                    datalabels: {
                        anchor: 'end',
                        align: 'end',
                        color: ['#656565', '#656565', '#656565', '#656565', '#656565', '#FF9D2C'],
                        font: {
                            size: 10,
                        },
                        formatter: function (value, context) {
                            if(context.dataIndex === 5){
                                return value + "(km/kwh)"
                            } else {
                                return value
                            }
                        },
                    },
                    clip: false,
                },
            ],
            labels: data.labels
        },
        datalabels: {
            color:'black',
            font:{size:24}
        },
        options: {
            // responsive: false,
            indexAxis: 'y',
            maintainAspectRatio: false,
            showTooltips: false,
            plugins:{
                datalabels: {
                    color: '#656565',
                },
                legend: {
                    display: false,
                },
            },
            scales: {
                x: {
                    max: 9.6,
                    grid: {
                        color: "#E1E1E1",
                        tickLength: 0,
                    },
                    border: {
                        dash: [2,2],
                    },
                    ticks: {
                        stepSize: 1.2,
                        display: false,
                    },
                },
                y: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        font:{
                            size: 10,
                        },
                        color: '#bbb'
                    },
                },
            }
        }
    });
}
// [E]: 07/06 수정

// 평균 스트레스 관리
let _chartGuage = {
    // PreviousData: 70,   // 이전 데이터
    // data: 72,   // 현재 데이터

    // frame: null,
    // bar: null,
    // value: null,
    // RADIUS: null,   // 100
    init: function(data){
        _chartGuage.PreviousData = data.PreviousData;
        _chartGuage.data = data.data;

        _chartGuage.frame = $(document).find(".chart_guage_wrap .frame");
        _chartGuage.bar = $(document).find(".chart_guage_wrap .bar");
        _chartGuage.value = $(document).find(".chart_guage_wrap .value");
        _chartGuage.RADIUS = document.querySelector(".chart_guage_wrap .frame").getAttribute("r");   // 100


        let gauge = _chartGuage.gauge(100);                           // 반원
        let dasyarray = _chartGuage.dashArray();
        let dashoffset = dasyarray * (1-gauge);
        
        // frame
        _chartGuage.frame.css({ "stroke-dashoffset" : dashoffset });
        _chartGuage.frame.css({ "stroke-dasharray" : dasyarray });

        // bar
        _chartGuage.bar.css({ "stroke-dasharray" : dasyarray });

        _chartGuage.setData(_chartGuage.data);
    },
    gauge: function(per){
        return per / 100;                   // 원 (1)
    },
    dashArray: function(){                  //  점선 (고정값)
        return 2 * Math.PI * this.RADIUS;
    },
    dashOffset: function(per){              // 시작점 (animation)
        // let progress = per / 200;
        let gauge = _chartGuage.gauge(per);
        let dashoffset = _chartGuage.dashArray() * (1-gauge);

        return dashoffset;
    },
    discription: function(per){
        let text = '';
        if( _chartGuage.PreviousData > _chartGuage.data ){
            let num = _chartGuage.PreviousData - _chartGuage.data;
            text = `전월대비 <strong class="down">${num}점 하락 ▼</strong>`;
        } else if( _chartGuage.PreviousData < _chartGuage.data ) {
            let num = _chartGuage.data - _chartGuage.PreviousData;
            text = `전월대비 <strong class="up">${num}점 상승 ▲</strong>`;
        } else {
            text ='전월과 <strong>동일</strong>';
        }

        return text;
    },
    setData: function(per){
        let gauge = _chartGuage.gauge(per);   // 반원
        let dasyarray = _chartGuage.dashArray();
        let dashoffset = dasyarray * (1-gauge);

        _chartGuage.bar.css({ "stroke-dashoffset" : dashoffset });

        // data setting
        $(document).find(".chart_guage_wrap .value strong").html(_chartGuage.data);

        // discription setting
        let text = _chartGuage.discription();
        $(document).find(".chart_guage_wrap .info .txt").html(text);
    }
}