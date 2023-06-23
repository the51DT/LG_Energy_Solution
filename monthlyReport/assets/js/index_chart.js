$(()=>{
    // setMyCart();
    // setMyCart2();

    // _chartGuage.init();
    // _chartBarHorizontal.init();
    // _chartBarVertical.init();
    // _chartBarVerticalDouble.init();
});


// 운전습관
const setMyCart = function(data){

    // console.log(data);   // data, data2, labels

    const ctx = document.getElementById('myChart').getContext("2d");
    var gradientStroke = ctx.createLinearGradient(0, 0, 0, 200);
    gradientStroke.addColorStop(0.5, "#C3C3C3");
    gradientStroke.addColorStop(0.9, "#fff");

    
    var gradientStroke2 = ctx.createLinearGradient(0, 0, 0, 200);
    gradientStroke2.addColorStop(0.5, "#B1A4FF");
    gradientStroke2.addColorStop(0.9, "#fff");

    Chart.register(ChartDataLabels);

    new Chart(ctx, {
        type: 'bar',
        data: {
            datasets: [
                {
                    type: 'line',
                    label: '급감속',
                    data: data.data,
                    backgroundColor: ['#9C9C9C', '#9C9C9C', '#9C9C9C', '#9C9C9C', '#9C9C9C', '#fff'],
                    borderColor: ['#9C9C9C', '#9C9C9C', '#9C9C9C', '#9C9C9C', '#9C9C9C', '#B1A4FF'],
                    borderWidth: 1,
                    pointStyle: ['circle', 'circle', 'circle', 'circle', 'circle', 'circle'],
                    pointRAdius: 10,
                    pointBorderWidth: [1, 1, 1, 1, 1, 3],
                    datalabels: {
                        align: 'top',
                        textAlign: 'start',
                        color: '#656565',
                        font: {
                            size: 10,
                        }
                    },
                },
                {
                    type: 'bar',
                    label: '급가속',
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
                        align: 'end',
                        color: '#656565',
                        font: {
                            size: 10,
                        }
                    },
                    clip: false,
                }
            ],
            labels: data.labels
        },
        datalabels: {
            color:'black',
            font:{size:24}
        },
        options: {
            // responsive: false,
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
                        },
                        color: '#bbb'
                    },
                },
                y: {
                    grid: {
                        color: "#E1E1E1",
                        tickLength: 0,
                    },
                    border: {
                        dash: [2,2],
                    },
                    ticks: {
                        stepSize: 16,
                        color: "transparent"
                    },
                },
            }
        }
    });
}




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
                    pointRAdius: 10,
                    pointBorderWidth: [1, 1, 1, 1, 1, 3],
                    datalabels: {
                        value: [1,2,3,4,5,6],
                        align: 'top',
                        textAlign: 'start',
                        color: '#CDCDCD',
                        font: {
                            size: 10,
                        },
                        formatter: function (value, context) {
                            const result = original_data[context.dataIndex];
                            const comma = result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            return comma;
                        },
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
                        color: '#656565',
                        font: {
                            size: 10,
                        }
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
                        color: '#656565',
                        font: {
                            size: 10,
                        }
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
                        },
                        color: '#bbb'
                    },
                    stacked: true,
                },
                y: {
                    grid: {
                        color: "#E1E1E1",
                        tickLength: 0,
                    },
                    border: {
                        dash: [2,2],
                    },
                    ticks: {
                        stepSize: 16,
                        color: "transparent"
                    },
                    stacked: true,
                },
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

            const minItem = item + 2500;
            const per = ((minItem * 100) / this.maxData).toFixed(0);
            const comma = item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            
            const per2 = ((this.data2[idx] * 100) / this.maxData2).toFixed(0);

            let text = ( this.data.length-1 == idx ) ? `${comma}원` : `${comma}`;
            let text2 = this.data2[idx];

            let html = `
                <li>
                    <div class="label">${_chartBarVerticalDouble.label[idx]}</div>
                    <div class="graph">
                        <span class="guage" style="height:${per}%">
                            <span class="data">${text}</span>
                        </span>
                        <span class="guage2" style="height:${per2}%">
                            <span class="data">${text2}</span>
                        </span>
                    </div>
                </li>
            `;

            data_ul.append(html);
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

// 평균 전비
let _chartBarHorizontal = {
    // data: [6.2, 6.0, 5.7, 7.0, 6.5, 6.7],
    // label: ['12월', '1월', '2월', '3월', '4월', '당월'],
    // frame: $(document).find(".chart_bar_horizontal_wrap"),

    init: function(data){
        _chartBarHorizontal.data = data.data;
        _chartBarHorizontal.label = data.label;
        _chartBarHorizontal.frame = $(document).find(".chart_bar_horizontal_wrap");
        this.setData();
    },
    setData: function(){

        _chartBarHorizontal.frame.find(".data_wrap").html('<ul class="data_ul"></ul>');
        const data_ul = _chartBarHorizontal.frame.find(".data_ul");

        this.data.map((item, idx)=>{
            const per = item * 10;
            let text = ( this.data.length-1 == idx ) ? `${item.toFixed(1)}(km/kwh)` : `${item.toFixed(1)}`;

            let html = `
                <li>
                    <div class="label">${_chartBarHorizontal.label[idx]}</div>
                    <div class="graph">
                        <span class="guage" style="width:${per}%">
                            <span class="data">${text}</span>
                        </span>
                    </div>
                </li>
            `;

            data_ul.append(html);
        })
    }
    
}


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